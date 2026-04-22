'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { AnnouncementBar } from '../../components/AnnouncementBar';
import { useCart } from '../../components/CartContext';

interface Props {
  countries: string[];
}

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
        <div className={styles.successWrap}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h1 className={styles.successTitle}>Order Placed!</h1>
            <p className={styles.successSub}>
              Thank you, {firstName}. We&apos;ll send a confirmation to <strong>{email}</strong>.
            </p>
            <a href="/products" className={styles.successBtn}>Continue Shopping</a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <div className={styles.page}>

        {/* ── Left: form ── */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <a href="/" className={styles.brandLink}>
            <img src="/jadeli-logo.png" alt="JADELI" className={styles.brandLogo} />
          </a>

          <nav className={styles.breadcrumb} aria-label="Checkout steps">
            <a href="/products">Cart</a>
            <span className={styles.breadSep}>›</span>
            <span className={styles.breadActive}>Information</span>
            <span className={styles.breadSep}>›</span>
            <span>Shipping</span>
            <span className={styles.breadSep}>›</span>
            <span>Payment</span>
          </nav>

          {/* Contact */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Contact</h2>
              <a href="#" className={styles.sectionLink}>Sign in</a>
            </div>
            <div className={styles.field}>
              <input
                className={`${styles.input} ${touched.email && !email ? styles.inputError : ''}`}
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => touch('email')}
                autoComplete="email"
              />
              {touched.email && !email && <p className={styles.fieldError}>Enter an email address</p>}
            </div>
            <label className={styles.checkLabel}>
              <input type="checkbox" checked={emailOffers} onChange={e => setEmailOffers(e.target.checked)} className={styles.checkbox} />
              Email me with news and offers
            </label>
          </section>

          {/* Delivery */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Delivery</h2>

            <div className={styles.field}>
              <select className={styles.input} value={country} onChange={e => setCountry(e.target.value)}>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <input
                  className={`${styles.input} ${touched.firstName && !firstName ? styles.inputError : ''}`}
                  type="text" placeholder="First name" value={firstName}
                  onChange={e => setFirstName(e.target.value)} onBlur={() => touch('firstName')}
                  autoComplete="given-name"
                />
                {touched.firstName && !firstName && <p className={styles.fieldError}>Enter a first name</p>}
              </div>
              <div className={styles.field}>
                <input
                  className={`${styles.input} ${touched.lastName && !lastName ? styles.inputError : ''}`}
                  type="text" placeholder="Last name" value={lastName}
                  onChange={e => setLastName(e.target.value)} onBlur={() => touch('lastName')}
                  autoComplete="family-name"
                />
                {touched.lastName && !lastName && <p className={styles.fieldError}>Enter a last name</p>}
              </div>
            </div>

            <div className={styles.field}>
              <input
                className={`${styles.input} ${touched.address && !address ? styles.inputError : ''}`}
                type="text" placeholder="Address" value={address}
                onChange={e => setAddress(e.target.value)} onBlur={() => touch('address')}
                autoComplete="street-address"
              />
              {touched.address && !address && <p className={styles.fieldError}>Enter an address</p>}
            </div>

            <div className={styles.field}>
              <input
                className={styles.input} type="text"
                placeholder="Apartment, suite, etc. (optional)" value={apt}
                onChange={e => setApt(e.target.value)} autoComplete="address-line2"
              />
            </div>

            <div className={styles.rowThree}>
              <div className={styles.field}>
                <input
                  className={`${styles.input} ${touched.city && !city ? styles.inputError : ''}`}
                  type="text" placeholder="City" value={city}
                  onChange={e => setCity(e.target.value)} onBlur={() => touch('city')}
                  autoComplete="address-level2"
                />
                {touched.city && !city && <p className={styles.fieldError}>Enter a city</p>}
              </div>
              <div className={styles.field}>
                <input
                  className={`${styles.input} ${touched.zip && !zip ? styles.inputError : ''}`}
                  type="text" placeholder="ZIP / Postal code" value={zip}
                  onChange={e => setZip(e.target.value)} onBlur={() => touch('zip')}
                  autoComplete="postal-code"
                />
                {touched.zip && !zip && <p className={styles.fieldError}>Enter a ZIP code</p>}
              </div>
            </div>

            <div className={styles.field}>
              <input
                className={styles.input} type="tel" placeholder="Phone (optional)"
                value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel"
              />
            </div>

            <label className={styles.checkLabel}>
              <input type="checkbox" checked={textOffers} onChange={e => setTextOffers(e.target.checked)} className={styles.checkbox} />
              Text me with news and offers
            </label>
          </section>

          {/* Shipping method placeholder */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Shipping method</h2>
            <div className={styles.shippingPlaceholder}>
              Enter your shipping address to view available shipping methods.
            </div>
          </section>

          <div className={styles.formFooter}>
            <a href="/products" className={styles.backLink}>← Return to cart</a>
            <button type="submit" className={styles.submitBtn}>
              Continue to shipping
            </button>
          </div>
        </form>

        {/* ── Right: order summary ── */}
        <aside className={styles.summary}>
          <div className={styles.summaryInner}>
            <div className={styles.summaryItems}>
              {items.length === 0 ? (
                <div className={styles.summaryItem}>
                  <div className={styles.summaryItemInfo}>
                    <p className={styles.summaryItemName}>Your cart is empty.</p>
                    <p className={styles.summaryItemSize}>Add a product before testing checkout.</p>
                  </div>
                </div>
              ) : items.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <div className={styles.summaryImageWrap}>
                    <img src={item.imageSrc} alt={item.name} className={styles.summaryImage} />
                    <span className={styles.summaryQtyBadge}>{item.quantity}</span>
                  </div>
                  <div className={styles.summaryItemInfo}>
                    <p className={styles.summaryItemName}>{item.name}</p>
                    <p className={styles.summaryItemSize}>{item.size}</p>
                  </div>
                  <p className={styles.summaryItemPrice}>{item.price}</p>
                </div>
              ))}
            </div>

            <div className={styles.discountRow}>
              <input
                className={`${styles.input} ${styles.discountInput}`}
                type="text" placeholder="Discount code or gift card"
                value={discount} onChange={e => setDiscount(e.target.value)}
                disabled={discountApplied}
              />
              <button
                type="button"
                className={`${styles.discountBtn} ${discountApplied ? styles.discountBtnApplied : ''}`}
                onClick={handleApplyDiscount} disabled={discountApplied}
              >
                {discountApplied ? '✓' : 'Apply'}
              </button>
            </div>
            {discountApplied && <p className={styles.discountSuccess}>Code &ldquo;{discount}&rdquo; applied.</p>}

            <div className={styles.divider} />

            <div className={styles.totalsBlock}>
              <div className={styles.totalRow}>
                <span>Subtotal · {totalCount} {totalCount === 1 ? 'item' : 'items'}</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Shipping</span>
                <span className={styles.muted}>Enter shipping address</span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.grandTotal}>
              <span>Total</span>
              <span className={styles.grandTotalAmt}>
                <span className={styles.currency}>USD</span>
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </aside>

      </div>
    </>
  );
}
