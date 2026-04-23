'use client';

import { useCart } from './CartContext';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem } = useCart();
  const parsePrice = (price: string) => Number.parseFloat(price.replace(/[^0-9.]/g, '')) || 0;

  const total = items.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + price * item.quantity;
  }, 0);

  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[rgba(31,23,34,0.45)] z-[99] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-[420px] max-w-full h-full bg-white z-[100] flex flex-col transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] [box-shadow:-8px_0_48px_rgba(113,72,96,0.2)] ${isOpen ? 'translate-x-0' : 'translate-x-[110%]'}`}
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-[rgba(31,23,34,0.12)] shrink-0">
          <div className="flex items-center gap-[10px]">
            <h2 className="m-0 text-[1.15rem] font-bold tracking-[-0.01em] text-[#1f1722]">Your Cart</h2>
            {totalCount > 0 && (
              <span className="bg-[#1f1722] text-white text-[0.7rem] font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-[5px]">
                {totalCount}
              </span>
            )}
          </div>
          <button
            className="bg-transparent border-none cursor-pointer text-[1rem] text-muted px-[10px] py-[6px] rounded-lg transition-colors hover:bg-[#fff1f8] hover:text-[#1f1722] font-[inherit]"
            onClick={closeCart}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted text-[0.95rem]">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-[18px]">
              {items.map(item => (
                <div key={item.id} className="flex gap-[14px] items-start">
                  <img src={item.imageSrc} alt={item.name} className="w-[70px] h-[88px] object-cover rounded-xl shrink-0" />
                  <div className="flex-1 flex flex-col gap-1">
                    <p className="m-0 text-[0.9rem] font-semibold text-[#1f1722]">{item.name}</p>
                    <p className="m-0 text-[0.79rem] text-muted">{item.size}</p>
                    <p className="m-0 text-[0.88rem] font-medium text-[#1f1722]">
                      {item.price}
                      {item.quantity > 1 && <span className="font-normal text-muted"> × {item.quantity}</span>}
                    </p>
                  </div>
                  <button
                    className="bg-transparent border-none cursor-pointer text-[0.8rem] text-muted px-[6px] py-1 rounded-md transition-colors hover:bg-[#fbe2ef] hover:text-[#1f1722] font-[inherit] shrink-0 mt-[2px]"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 pt-5 pb-9 border-t border-[rgba(31,23,34,0.12)] flex flex-col gap-[14px] shrink-0">
              <div className="flex justify-between text-[1rem] font-bold text-[#1f1722]">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <a
                href="/checkout"
                className="w-full py-[14px] bg-[#1f1722] text-white border-none rounded-full text-[0.95rem] font-semibold tracking-[0.04em] text-center block transition-opacity hover:opacity-85"
              >
                Checkout
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}


