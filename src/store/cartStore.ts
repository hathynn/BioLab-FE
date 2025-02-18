import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: string;
  name: string;
  img: string;
  price: number;
  quantity: number;
  discount?: number;
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
