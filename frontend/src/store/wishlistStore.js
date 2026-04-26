import { create } from "zustand";

export const useWishlist = create((set) => ({
  wishlist: [],

  toggleWishlist: (product) =>
    set((state) => {
      const exists = state.wishlist.find((p) => p._id === product._id);

      return {
        wishlist: exists
          ? state.wishlist.filter((p) => p._id !== product._id)
          : [...state.wishlist, product],
      };
    }),
}));