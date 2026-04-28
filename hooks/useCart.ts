"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export interface CartCourse {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  category: string;
}

const STORAGE_KEY = "student_cart";

function readCart(): CartCourse[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartCourse[]) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartCourse[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useCart() {
  const [cart, setCart] = useState<CartCourse[]>(readCart);

  useEffect(() => {
    writeCart(cart);
  }, [cart]);

  const addToCart = useCallback((course: CartCourse) => {
    setCart((prev) => {
      if (prev.find((c) => c.id === course.id)) return prev;
      return [...prev, course];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = useMemo(
    () => cart.reduce((sum, c) => sum + c.price, 0),
    [cart]
  );

  const itemCount = cart.length;

  return { cart, addToCart, removeFromCart, clearCart, cartTotal, itemCount };
}
