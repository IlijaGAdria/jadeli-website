'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItemPrice {
  currency: string;
  amount: number;
}

export interface CartItem {
  id: string;
  variantId: string;
  name: string;
  price: string;
  prices: CartItemPrice[];
  size: string;
  imageSrc: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>, options?: { silent?: boolean }) => void;
  removeItem: (id: string) => void;
  decrementItem: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CART_STORAGE_KEY = 'jadeli_cart';

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  function addItem(item: Omit<CartItem, 'id' | 'quantity'>, options?: { silent?: boolean }) {
    const id = `${item.variantId}`;
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, id, quantity: 1 }];
    });
    if (!options?.silent) setIsOpen(true);
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function decrementItem(id: string) {
    setItems(prev =>
      prev.flatMap(i => {
        if (i.id !== id) return [i];
        if (i.quantity <= 1) return [];
        return [{ ...i, quantity: i.quantity - 1 }];
      })
    );
  }

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      addItem,
      removeItem,
      decrementItem,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
