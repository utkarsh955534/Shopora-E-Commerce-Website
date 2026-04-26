import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => ({
          cart: [...state.cart, product],
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);