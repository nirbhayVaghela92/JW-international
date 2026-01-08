import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

export type CartItem = Product & {
  cartQuantity: number;
};

type CartStore = {
  items: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const existingItem = get().items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, cartQuantity: item.cartQuantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...get().items, { ...product, cartQuantity: 1 }],
          });
        }
      },

      removeFromCart: (productId) =>
        set({
          items: get().items.filter((item) => item.id !== productId),
        }),

      increaseQty: (productId) =>
        set({
          items: get().items.map((item) =>
            item.id === productId
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          ),
        }),

      decreaseQty: (productId) =>
        set({
          items: get()
            .items.map((item) =>
              item.id === productId
                ? { ...item, cartQuantity: item.cartQuantity - 1 }
                : item
            )
            .filter((item) => item.cartQuantity > 0),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
