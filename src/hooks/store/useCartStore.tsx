import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/types";

type CartStore = {
  cartItems: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number, variantId: number) => void;

  increaseQty: (productId: number, variantId: number) => void;
  decreaseQty: (productId: number, variantId: number) => void;

  getItem: (productId: number, variantId: number) => CartItem | undefined;

  getTotalCartAmount: () => number;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      /* ADD TO CART */
      addToCart: (item) => {
        const existingItem = get().cartItems.find(
          (i) =>
            i.productId === item.productId &&
            i.variantId === item.variantId
        );

        if (existingItem) {
          const newQty = existingItem.quantity + item.quantity;

          if (newQty > existingItem.stockQuantity) {
            return;
          }

          set({
            cartItems: get().cartItems.map((i) =>
              i.productId === item.productId &&
              i.variantId === item.variantId
                ? { ...i, quantity: newQty }
                : i
            ),
          });
        } else {
          if (item.quantity > item.stockQuantity) return;

          set({
            cartItems: [...get().cartItems, item],
          });
        }
      },

      /* REMOVE VARIANT */
      removeFromCart: (productId, variantId) =>
        set({
          cartItems: get().cartItems.filter(
            (i) =>
              !(i.productId === productId && i.variantId === variantId)
          ),
        }),

      /* +1 */
      increaseQty: (productId, variantId) =>
        set({
          cartItems: get().cartItems.map((i) =>
            i.productId === productId &&
            i.variantId === variantId &&
            i.quantity < i.stockQuantity
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }),

      /* -1 */
      decreaseQty: (productId, variantId) =>
        set({
          cartItems: get()
            .cartItems.map((i) =>
              i.productId === productId &&
              i.variantId === variantId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        }),

      getItem: (productId, variantId) =>
        get().cartItems.find(
          (i) =>
            i.productId === productId &&
            i.variantId === variantId
        ),

      getTotalCartAmount: () =>
        get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
