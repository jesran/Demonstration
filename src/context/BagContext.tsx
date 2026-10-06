"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductSize } from "@/types/product";

export interface BagItem {
  id: string;
  product: Product;
  size: ProductSize;
  color: string;
  quantity: number;
}

interface BagContextType {
  items: BagItem[];
  itemCount: number;
  subtotal: number;
  isBagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  addItem: (product: Product, size: ProductSize, color: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearBag: () => void;
}

const BagContext = createContext<BagContextType | undefined>(undefined);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Initialize from localStorage if client-side
  useEffect(() => {
    try {
      const saved = localStorage.getItem("demon_bag");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("demon_bag", JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const openBag = () => setIsBagOpen(true);
  const closeBag = () => setIsBagOpen(false);

  const addItem = (
    product: Product,
    size: ProductSize,
    color: string,
    quantity = 1
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.product.id === product.id && i.size === size && i.color === color
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      const newItem: BagItem = {
        id: `${product.id}-${size}-${color}-${Date.now()}`,
        product,
        size,
        color,
        quantity,
      };
      return [...prev, newItem];
    });

    setIsBagOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearBag = () => setItems([]);

  return (
    <BagContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isBagOpen,
        openBag,
        closeBag,
        addItem,
        removeItem,
        updateQuantity,
        clearBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
}
