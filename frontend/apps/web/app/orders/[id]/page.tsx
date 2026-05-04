import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AnnouncementBar } from '../../../components/AnnouncementBar';
import { getOrder } from '../../../lib/api';
import { formatAmount } from '../../../lib/currency';

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata = {
  title: 'Order Confirmation — JADELI',
};

const card = 'bg-[rgba(255,255,255,0.86)] border border-[rgba(31,23,34,0.12)] rounded-[32px] [box-shadow:0_20px_50px_rgba(113,72,96,0.14)] p-6';
const eyebrow = 'uppercase tracking-[0.14em] text-[0.76rem] text-muted';

export default async function OrderConfirmationPage({ params }: Props) {
  const { id } = await params;

  let order: Awaited<ReturnType<typeof getOrder>> = null;
  try {
    order = await getOrder(id);
  } catch {
    return (
      <main className="min-h-screen flex items-center justify-center px-5">
        <p className="text-muted text-[1rem]">Unable to load order — please try again later.</p>
      </main>
    );
  }

  if (!order) {
    notFound();
  }

  const currency = order.currency;

  return (
    <main className="min-h-screen px-5 pb-[72px]">
      <AnnouncementBar />

      <div className="max-w-[720px] mx-auto pt-16 flex flex-col gap-8">
        {/* Confirmation header */}
        <div className={card}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#1f1722] text-white rounded-full flex items-center justify-center text-[1.2rem] font-bold shrink-0">
              ✓
            </div>
            <div>
              <span className={eyebrow}>Order confirmed</span>
              <h1 className="m-0 text-[1.6rem] font-bold tracking-[-0.02em] text-[#1f1722]">
                Thank you for your order!
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[0.9rem] max-[500px]:grid-cols-1">
            <div>
              <span className={eyebrow}>Order number</span>
              <p className="m-0 mt-1 font-semibold text-[#1f1722]">#{order.orderNumber}</p>
            </div>
            <div>
              <span className={eyebrow}>Email</span>
              <p className="m-0 mt-1 text-[#1f1722]">{order.customerEmail}</p>
            </div>
            <div>
              <span className={eyebrow}>Status</span>
              <p className="m-0 mt-1 text-[#1f1722] capitalize">{order.status.toLowerCase()}</p>
            </div>
            <div>
              <span className={eyebrow}>Date</span>
              <p className="m-0 mt-1 text-[#1f1722]">
                {new Date(order.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className={card}>
          <span className={eyebrow}>Items ordered</span>
          <div className="mt-4 flex flex-col divide-y divide-[rgba(31,23,34,0.08)]">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 flex justify-between gap-4 text-[0.9rem]">
                <div>
                  <p className="m-0 font-semibold text-[#1f1722]">{item.productName}</p>
                  <p className="m-0 text-muted">{item.variantName} · {item.deviceModel}</p>
                  {item.quantity > 1 && (
                    <p className="m-0 text-muted text-[0.8rem]">Qty {item.quantity}</p>
                  )}
                </div>
                <p className="m-0 font-medium text-[#1f1722] whitespace-nowrap">
                  {formatAmount(item.lineTotalInCents, item.currency)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-4 border-t border-[rgba(31,23,34,0.08)] flex flex-col gap-2 text-[0.9rem]">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatAmount(order.subtotalInCents, currency)}</span>
            </div>
            {order.shippingInCents > 0 && (
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>{formatAmount(order.shippingInCents, currency)}</span>
              </div>
            )}
            {order.taxInCents > 0 && (
              <div className="flex justify-between text-muted">
                <span>Tax</span>
                <span>{formatAmount(order.taxInCents, currency)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-[1rem] text-[#1f1722] pt-2 border-t border-[rgba(31,23,34,0.08)]">
              <span>Total</span>
              <span>{formatAmount(order.totalInCents, currency)}</span>
            </div>
          </div>
        </div>

        {/* Shipping address */}
        <div className={card}>
          <span className={eyebrow}>Shipping to</span>
          <address className="mt-3 not-italic text-[0.9rem] text-[#1f1722] leading-[1.7]">
            <p className="m-0 font-semibold">{order.shippingAddress.fullName}</p>
            <p className="m-0">{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 && <p className="m-0">{order.shippingAddress.line2}</p>}
            <p className="m-0">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p className="m-0">{order.shippingAddress.countryCode}</p>
          </address>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="/products"
            className="px-8 py-[13px] bg-[#1f1722] text-white rounded-full text-[0.9rem] font-semibold tracking-[0.04em] transition-opacity hover:opacity-85 no-underline"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="px-8 py-[13px] border border-[rgba(31,23,34,0.16)] rounded-full text-[0.9rem] font-medium text-[#1f1722] no-underline hover:border-[#1f1722]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
