import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id?: string;
  name?: string;
  img?: string;
  price?: number;
  unit?: string;
  quantity: number;
}
interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id);
          if (existingProduct) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          } else {
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== productId),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;


interface CheckoutState {
  checkoutItems: Product[];
  toggleCheckoutItem: (product: Product) => void;
  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      checkoutItems: [],
      toggleCheckoutItem: (product) =>
        set((state) => {
          const isSelected = state.checkoutItems.find((p) => p.id === product.id);
          if (isSelected) {
            return {
              checkoutItems: state.checkoutItems.filter((p) => p.id !== product.id),
            };
          } else {
            return { checkoutItems: [...state.checkoutItems, product] };
          }
        }),
      clearCheckout: () => set({ checkoutItems: [] }),
    }),
    {
      name: "checkout-storage",
    }
  )
);