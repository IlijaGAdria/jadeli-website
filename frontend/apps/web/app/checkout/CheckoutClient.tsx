'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnnouncementBar } from '../../components/AnnouncementBar';
import { useCart } from '../../components/CartContext';
import { useCurrency } from '../../components/CurrencyContext';
import { createOrder } from '../../lib/api';

interface Props {
  countries: { name: string; code: string }[];
}

const input = "w-full px-4 py-[13px] border border-[rgba(31,23,34,0.12)] border-[1.5px] rounded-xl text-[0.92rem] font-[inherit] text-[#1f1722] bg-white outline-none transition-colors focus:border-[#1f1722] placeholder:text-muted disabled:opacity-60 disabled:cursor-not-allowed appearance-none";
const inputError = "border-[#e0305a]";

export function CheckoutClient({ countries }: Props) {
  const { items, closeCart } = useCart();
  const { currency } = useCurrency();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailOffers, setEmailOffers] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState(countries[0]?.code ?? 'RS');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [textOffers, setTextOffers] = useState(false);
  const [discount, setDiscount] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [stockError, setStockError] = useState(false);
  const [serverError, setServerError] = useState('');

  const parsePrice = (price: string) => Number.parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  const subtotal = items.reduce((s, i) => s + parsePrice(i.price) * i.quantity, 0);
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  function touch(field: string) {
    setTouched(prev => ({ ...prev, [field]: true }));
  }

  function handleApplyDiscount() {
    if (discount.trim()) setDiscountApplied(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, firstName: true, lastName: true, address: true, city: true, zip: true });
    if (!email || !firstName || !lastName || !address || !city || !zip) return;
    if (items.length === 0) return;

    setSubmitting(true);
    setStockError(false);
    setServerError('');

    try {
      const order = await createOrder({
        email,
        currency,
        items: items.map(i => ({ variantId: i.variantId, quantity: i.quantity })),
        shippingAddress: {
          fullName: `${firstName} ${lastName}`,
          line1: address,
          line2: apt || undefined,
          city,
          postalCode: zip,
          countryCode,
          phone: phone || undefined,
        },
      });
      // clear cart and redirect to confirmation
      closeCart();
      router.push(`/orders/${order.id}`);
    } catch (err: unknown) {
      if (err instanceof Error && (err as Error & { code?: string }).code === 'INSUFFICIENT_STOCK') {
        setStockError(true);
      } else {
        setServerError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <AnnouncementBar />
      <div className="grid grid-cols-[1fr_480px] min-h-screen max-[1000px]:grid-cols-1">

        {/* Left: form */}
        <form
          className="px-[10%] pt-12 pb-20 pl-[10%] pr-16 flex flex-col gap-9 bg-[#fff7fb] max-[1000px]:px-6 max-[1000px]:py-9"
          onSubmit={handleSubmit}
          noValidate
        >
          <a href="/" className="block mb-1">
            <img src="/jadeli-logo.png" alt="JADELI" className="h-9 w-auto object-contain" />
          </a>

          <nav className="flex items-center gap-2 text-[0.82rem] text-muted flex-wrap" aria-label="Checkout steps">
            <a href="/products" className="text-[#1f1722] underline underline-offset-[3px]">Cart</a>
            <span className="opacity-40">›</span>
            <span className="text-[#1f1722] font-semibold">Information</span>
            <span className="opacity-40">›</span>
            <span>Shipping</span>
            <span className="opacity-40">›</span>
            <span>Payment</span>
          </nav>

          {stockError && (
            <div className="px-4 py-3 rounded-xl bg-[#fde8ee] border border-[#e0305a] text-[#c0182a] text-[0.88rem]">
              One or more items in your cart are out of stock. Please remove them and try again.
            </div>
          )}
          {serverError && (
            <div className="px-4 py-3 rounded-xl bg-[#fde8ee] border border-[#e0305a] text-[#c0182a] text-[0.88rem]">
              {serverError}
            </div>
          )}

          {/* Contact */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="m-0 text-[1.05rem] font-bold text-[#1f1722] tracking-[-0.01em]">Contact</h2>
              <a href="#" className="text-[0.82rem] text-[#1f1722] underline underline-offset-[3px]">Sign in</a>
            </div>
            <div className="flex flex-col gap-1">
              <input
                className={`${input} ${touched.email && !email ? inputError : ''}`}
                type="email" placeholder="Email" value={email}
                onChange={e => setEmail(e.target.value)} onBlur={() => touch('email')} autoComplete="email"
              />
              {touched.email && !email && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter an email address</p>}
            </div>
            <label className="flex items-center gap-[10px] text-[0.86rem] text-muted cursor-pointer select-none">
              <input type="checkbox" checked={emailOffers} onChange={e => setEmailOffers(e.target.checked)} className="w-4 h-4 accent-[#1f1722] cursor-pointer shrink-0" />
              Email me with news and offers
            </label>
          </section>

          {/* Delivery */}
          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-[1.05rem] font-bold text-[#1f1722] tracking-[-0.01em]">Delivery</h2>
            <div className="flex flex-col gap-1">
              <select className={input} value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
              <div className="flex flex-col gap-1">
                <input className={`${input} ${touched.firstName && !firstName ? inputError : ''}`} type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} onBlur={() => touch('firstName')} autoComplete="given-name" />
                {touched.firstName && !firstName && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter a first name</p>}
              </div>
              <div className="flex flex-col gap-1">
                <input className={`${input} ${touched.lastName && !lastName ? inputError : ''}`} type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} onBlur={() => touch('lastName')} autoComplete="family-name" />
                {touched.lastName && !lastName && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter a last name</p>}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <input className={`${input} ${touched.address && !address ? inputError : ''}`} type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} onBlur={() => touch('address')} autoComplete="street-address" />
              {touched.address && !address && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter an address</p>}
            </div>
            <input className={input} type="text" placeholder="Apartment, suite, etc. (optional)" value={apt} onChange={e => setApt(e.target.value)} autoComplete="address-line2" />
            <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
              <div className="flex flex-col gap-1">
                <input className={`${input} ${touched.city && !city ? inputError : ''}`} type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} onBlur={() => touch('city')} autoComplete="address-level2" />
                {touched.city && !city && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter a city</p>}
              </div>
              <div className="flex flex-col gap-1">
                <input className={`${input} ${touched.zip && !zip ? inputError : ''}`} type="text" placeholder="ZIP / Postal code" value={zip} onChange={e => setZip(e.target.value)} onBlur={() => touch('zip')} autoComplete="postal-code" />
                {touched.zip && !zip && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter a ZIP code</p>}
              </div>
            </div>
            <input className={input} type="tel" placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" />
            <label className="flex items-center gap-[10px] text-[0.86rem] text-muted cursor-pointer select-none">
              <input type="checkbox" checked={textOffers} onChange={e => setTextOffers(e.target.checked)} className="w-4 h-4 accent-[#1f1722] cursor-pointer shrink-0" />
              Text me with news and offers
            </label>
          </section>

          {/* Shipping method */}
          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-[1.05rem] font-bold text-[#1f1722] tracking-[-0.01em]">Shipping method</h2>
            <div className="p-5 border border-[rgba(31,23,34,0.12)] border-[1.5px] rounded-xl text-[0.86rem] text-muted text-center bg-white">
              Enter your shipping address to view available shipping methods.
            </div>
          </section>

          <div className="flex items-center justify-between gap-4 flex-wrap max-[600px]:flex-col-reverse max-[600px]:items-stretch">
            <a href="/products" className="text-[0.85rem] text-muted underline underline-offset-[3px] transition-colors hover:text-[#1f1722] max-[600px]:text-center">
              ← Return to cart
            </a>
            <button
              type="submit"
              disabled={submitting || items.length === 0}
              className="px-8 py-[14px] bg-[#1f1722] text-white border-none rounded-full text-[0.92rem] font-semibold tracking-[0.04em] cursor-pointer font-[inherit] transition-opacity hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed max-[600px]:w-full max-[600px]:text-center"
            >
              {submitting ? 'Placing order…' : 'Place order'}
            </button>
          </div>
        </form>

        {/* Right: order summary */}
        <aside className="bg-white border-l border-[rgba(31,23,34,0.12)] px-12 py-[60px] sticky top-0 h-screen overflow-y-auto max-[1000px]:static max-[1000px]:h-auto max-[1000px]:border-l-0 max-[1000px]:border-t max-[1000px]:border-[rgba(31,23,34,0.12)] max-[1000px]:order-first max-[1000px]:px-6 max-[1000px]:py-8">
          <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex items-center gap-[14px]">
                  <div className="flex-1">
                    <p className="m-0 text-[0.88rem] font-semibold text-[#1f1722]">Your cart is empty.</p>
                    <p className="mt-1 m-0 text-[0.78rem] text-muted">Add a product before checking out.</p>
                  </div>
                </div>
              ) : items.map(item => (
                <div key={item.id} className="flex items-center gap-[14px]">
                  <div className="relative shrink-0">
                    <img src={item.imageSrc} alt={item.name} className="w-16 h-20 object-cover rounded-[10px] border border-[rgba(31,23,34,0.12)]" />
                    <span className="absolute -top-2 -right-2 bg-[#1f1722] text-white w-5 h-5 rounded-full text-[0.68rem] font-bold flex items-center justify-center">{item.quantity}</span>
                  </div>
                  <div className="flex-1">
                    <p className="m-0 text-[0.88rem] font-semibold text-[#1f1722]">{item.name}</p>
                    <p className="mt-1 m-0 text-[0.78rem] text-muted">{item.size}</p>
                  </div>
                  <p className="m-0 text-[0.9rem] font-medium text-[#1f1722] whitespace-nowrap">{item.price}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-[10px]">
              <input
                className={`${input} flex-1`}
                type="text" placeholder="Discount code or gift card"
                value={discount} onChange={e => setDiscount(e.target.value)} disabled={discountApplied}
              />
              <button
                type="button"
                className={`px-5 border border-[rgba(31,23,34,0.12)] border-[1.5px] rounded-xl text-[0.85rem] font-semibold cursor-pointer font-[inherit] whitespace-nowrap transition-colors ${discountApplied ? 'bg-[#1f1722] text-white border-[#1f1722]' : 'bg-transparent text-[#1f1722] hover:border-[#1f1722]'}`}
                onClick={handleApplyDiscount} disabled={discountApplied}
              >
                {discountApplied ? '✓' : 'Apply'}
              </button>
            </div>
            {discountApplied && <p className="-mt-2 m-0 text-[0.78rem] text-[#2d9e5e]">Code &ldquo;{discount}&rdquo; applied.</p>}

            <div className="h-px bg-[rgba(31,23,34,0.12)]" />

            <div className="flex flex-col gap-[10px]">
              <div className="flex justify-between text-[0.88rem] text-[#1f1722]">
                <span>Subtotal · {totalCount} {totalCount === 1 ? 'item' : 'items'}</span>
                <span>{subtotal.toFixed(2)} {currency}</span>
              </div>
              <div className="flex justify-between text-[0.88rem] text-[#1f1722]">
                <span>Shipping</span>
                <span className="text-muted">Enter shipping address</span>
              </div>
            </div>

            <div className="h-px bg-[rgba(31,23,34,0.12)]" />

            <div className="flex justify-between items-baseline text-[1rem] font-bold text-[#1f1722]">
              <span>Total</span>
              <span className="text-[1.3rem] font-bold">
                <span className="text-[0.8rem] font-medium text-muted mr-1">{currency}</span>
                {subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </aside>

      </div>
    </>
  );
}

const input = "w-full px-4 py-[13px] border border-[rgba(31,23,34,0.12)] border-[1.5px] rounded-xl text-[0.92rem] font-[inherit] text-[#1f1722] bg-white outline-none transition-colors focus:border-[#1f1722] placeholder:text-muted disabled:opacity-60 disabled:cursor-not-allowed appearance-none";
const inputError = "border-[#e0305a]";

export function CheckoutClient({ countries }: Props) {
  const { items } = useCart();
  const [email, setEmail] = useState('');
  const [emailOffers, setEmailOffers] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState(countries[0] ?? '');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [textOffers, setTextOffers] = useState(false);
  const [discount, setDiscount] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const parsePrice = (price: string) => Number.parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  const subtotal = items.reduce((s, i) => s + parsePrice(i.price) * i.quantity, 0);
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  function touch(field: string) {
    setTouched(prev => ({ ...prev, [field]: true }));
  }

  function handleApplyDiscount() {
    if (discount.trim()) setDiscountApplied(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, firstName: true, lastName: true, address: true, city: true, zip: true });
    if (!email || !firstName || !lastName || !address || !city || !zip) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <AnnouncementBar />
        <div className="min-h-screen flex items-center justify-center p-10">
          <div className="bg-white rounded-[32px] p-14 max-w-[480px] w-full text-center [box-shadow:0_20px_50px_rgba(113,72,96,0.14)] flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-[#1f1722] text-white rounded-full flex items-center justify-center text-[1.4rem] font-bold">✓</div>
            <h1 className="m-0 text-[1.8rem] font-bold tracking-[-0.02em] text-[#1f1722]">Order Placed!</h1>
            <p className="m-0 text-muted text-[0.95rem] leading-[1.5]">
              Thank you, {firstName}. We&apos;ll send a confirmation to <strong>{email}</strong>.
            </p>
            <a href="/products" className="mt-2 px-8 py-[13px] bg-[#1f1722] text-white rounded-full text-[0.9rem] font-semibold tracking-[0.04em] transition-opacity hover:opacity-85 inline-block">
              Continue Shopping
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <div className="grid grid-cols-[1fr_480px] min-h-screen max-[1000px]:grid-cols-1">

        {/* Left: form */}
        <form
          className="px-[10%] pt-12 pb-20 pl-[10%] pr-16 flex flex-col gap-9 bg-[#fff7fb] max-[1000px]:px-6 max-[1000px]:py-9"
          onSubmit={handleSubmit}
          noValidate
        >
          <a href="/" className="block mb-1">
            <img src="/jadeli-logo.png" alt="JADELI" className="h-9 w-auto object-contain" />
          </a>

          <nav className="flex items-center gap-2 text-[0.82rem] text-muted flex-wrap" aria-label="Checkout steps">
            <a href="/products" className="text-[#1f1722] underline underline-offset-[3px]">Cart</a>
            <span className="opacity-40">›</span>
            <span className="text-[#1f1722] font-semibold">Information</span>
            <span className="opacity-40">›</span>
            <span>Shipping</span>
            <span className="opacity-40">›</span>
            <span>Payment</span>
          </nav>

          {/* Contact */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="m-0 text-[1.05rem] font-bold text-[#1f1722] tracking-[-0.01em]">Contact</h2>
              <a href="#" className="text-[0.82rem] text-[#1f1722] underline underline-offset-[3px]">Sign in</a>
            </div>
            <div className="flex flex-col gap-1">
              <input
                className={`${input} ${touched.email && !email ? inputError : ''}`}
                type="email" placeholder="Email" value={email}
                onChange={e => setEmail(e.target.value)} onBlur={() => touch('email')} autoComplete="email"
              />
              {touched.email && !email && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter an email address</p>}
            </div>
            <label className="flex items-center gap-[10px] text-[0.86rem] text-muted cursor-pointer select-none">
              <input type="checkbox" checked={emailOffers} onChange={e => setEmailOffers(e.target.checked)} className="w-4 h-4 accent-[#1f1722] cursor-pointer shrink-0" />
              Email me with news and offers
            </label>
          </section>

          {/* Delivery */}
          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-[1.05rem] font-bold text-[#1f1722] tracking-[-0.01em]">Delivery</h2>
            <div className="flex flex-col gap-1">
              <select className={input} value={country} onChange={e => setCountry(e.target.value)}>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
              <div className="flex flex-col gap-1">
                <input className={`${input} ${touched.firstName && !firstName ? inputError : ''}`} type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} onBlur={() => touch('firstName')} autoComplete="given-name" />
                {touched.firstName && !firstName && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter a first name</p>}
              </div>
              <div className="flex flex-col gap-1">
                <input className={`${input} ${touched.lastName && !lastName ? inputError : ''}`} type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} onBlur={() => touch('lastName')} autoComplete="family-name" />
                {touched.lastName && !lastName && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter a last name</p>}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <input className={`${input} ${touched.address && !address ? inputError : ''}`} type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} onBlur={() => touch('address')} autoComplete="street-address" />
              {touched.address && !address && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter an address</p>}
            </div>
            <input className={input} type="text" placeholder="Apartment, suite, etc. (optional)" value={apt} onChange={e => setApt(e.target.value)} autoComplete="address-line2" />
            <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
              <div className="flex flex-col gap-1">
                <input className={`${input} ${touched.city && !city ? inputError : ''}`} type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} onBlur={() => touch('city')} autoComplete="address-level2" />
                {touched.city && !city && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter a city</p>}
              </div>
              <div className="flex flex-col gap-1">
                <input className={`${input} ${touched.zip && !zip ? inputError : ''}`} type="text" placeholder="ZIP / Postal code" value={zip} onChange={e => setZip(e.target.value)} onBlur={() => touch('zip')} autoComplete="postal-code" />
                {touched.zip && !zip && <p className="m-0 text-[0.78rem] text-[#e0305a]">Enter a ZIP code</p>}
              </div>
            </div>
            <input className={input} type="tel" placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" />
            <label className="flex items-center gap-[10px] text-[0.86rem] text-muted cursor-pointer select-none">
              <input type="checkbox" checked={textOffers} onChange={e => setTextOffers(e.target.checked)} className="w-4 h-4 accent-[#1f1722] cursor-pointer shrink-0" />
              Text me with news and offers
            </label>
          </section>

          {/* Shipping method */}
          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-[1.05rem] font-bold text-[#1f1722] tracking-[-0.01em]">Shipping method</h2>
            <div className="p-5 border border-[rgba(31,23,34,0.12)] border-[1.5px] rounded-xl text-[0.86rem] text-muted text-center bg-white">
              Enter your shipping address to view available shipping methods.
            </div>
          </section>

          <div className="flex items-center justify-between gap-4 flex-wrap max-[600px]:flex-col-reverse max-[600px]:items-stretch">
            <a href="/products" className="text-[0.85rem] text-muted underline underline-offset-[3px] transition-colors hover:text-[#1f1722] max-[600px]:text-center">
              ← Return to cart
            </a>
            <button type="submit" className="px-8 py-[14px] bg-[#1f1722] text-white border-none rounded-full text-[0.92rem] font-semibold tracking-[0.04em] cursor-pointer font-[inherit] transition-opacity hover:opacity-85 max-[600px]:w-full max-[600px]:text-center">
              Continue to shipping
            </button>
          </div>
        </form>

        {/* Right: order summary */}
        <aside className="bg-white border-l border-[rgba(31,23,34,0.12)] px-12 py-[60px] sticky top-0 h-screen overflow-y-auto max-[1000px]:static max-[1000px]:h-auto max-[1000px]:border-l-0 max-[1000px]:border-t max-[1000px]:border-[rgba(31,23,34,0.12)] max-[1000px]:order-first max-[1000px]:px-6 max-[1000px]:py-8">
          <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex items-center gap-[14px]">
                  <div className="flex-1">
                    <p className="m-0 text-[0.88rem] font-semibold text-[#1f1722]">Your cart is empty.</p>
                    <p className="mt-1 m-0 text-[0.78rem] text-muted">Add a product before testing checkout.</p>
                  </div>
                </div>
              ) : items.map(item => (
                <div key={item.id} className="flex items-center gap-[14px]">
                  <div className="relative shrink-0">
                    <img src={item.imageSrc} alt={item.name} className="w-16 h-20 object-cover rounded-[10px] border border-[rgba(31,23,34,0.12)]" />
                    <span className="absolute -top-2 -right-2 bg-[#1f1722] text-white w-5 h-5 rounded-full text-[0.68rem] font-bold flex items-center justify-center">{item.quantity}</span>
                  </div>
                  <div className="flex-1">
                    <p className="m-0 text-[0.88rem] font-semibold text-[#1f1722]">{item.name}</p>
                    <p className="mt-1 m-0 text-[0.78rem] text-muted">{item.size}</p>
                  </div>
                  <p className="m-0 text-[0.9rem] font-medium text-[#1f1722] whitespace-nowrap">{item.price}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-[10px]">
              <input
                className={`${input} flex-1`}
                type="text" placeholder="Discount code or gift card"
                value={discount} onChange={e => setDiscount(e.target.value)} disabled={discountApplied}
              />
              <button
                type="button"
                className={`px-5 border border-[rgba(31,23,34,0.12)] border-[1.5px] rounded-xl text-[0.85rem] font-semibold cursor-pointer font-[inherit] whitespace-nowrap transition-colors ${discountApplied ? 'bg-[#1f1722] text-white border-[#1f1722]' : 'bg-transparent text-[#1f1722] hover:border-[#1f1722]'}`}
                onClick={handleApplyDiscount} disabled={discountApplied}
              >
                {discountApplied ? '✓' : 'Apply'}
              </button>
            </div>
            {discountApplied && <p className="-mt-2 m-0 text-[0.78rem] text-[#2d9e5e]">Code &ldquo;{discount}&rdquo; applied.</p>}

            <div className="h-px bg-[rgba(31,23,34,0.12)]" />

            <div className="flex flex-col gap-[10px]">
              <div className="flex justify-between text-[0.88rem] text-[#1f1722]">
                <span>Subtotal · {totalCount} {totalCount === 1 ? 'item' : 'items'}</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[0.88rem] text-[#1f1722]">
                <span>Shipping</span>
                <span className="text-muted">Enter shipping address</span>
              </div>
            </div>

            <div className="h-px bg-[rgba(31,23,34,0.12)]" />

            <div className="flex justify-between items-baseline text-[1rem] font-bold text-[#1f1722]">
              <span>Total</span>
              <span className="text-[1.3rem] font-bold">
                <span className="text-[0.8rem] font-medium text-muted mr-1">USD</span>
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </aside>

      </div>
    </>
  );
}
