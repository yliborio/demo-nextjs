"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CartItems } from "../types/cartItem";
import currency from "currency.js";

interface LocalContextProps {
  cart: CartItems;
  updateCart: (cart: CartItems) => void;
}

export const LocalContext = createContext<LocalContextProps>({
  cart: { items: [], total: currency(0) },
  updateCart: () => {},
});

interface LocalContextProviderProps {
  children: ReactNode;
}

export const LocalContextProvider = ({
  children,
}: LocalContextProviderProps) => {
  const [cart, setCart] = useState<CartItems>({
    items: [],
    total: currency(0),
  });

  useEffect(() => {
    if (window === undefined) return;
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCart = (cart: CartItems) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  };

  return (
    <LocalContext.Provider value={{ cart, updateCart }}>
      {children}
    </LocalContext.Provider>
  );
};
