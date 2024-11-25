import { create } from "zustand";
import { IProductCount } from "./catalog/Product";

export interface ICartState {
  cart: IProductCount[];
  cartCount: number;
  addToCart: (id: number, stok?: number) => void;
  reduceItemsCount: (id: number) => void;
  removeFromCart: (id: number) => void;
  resetCart: () => void;
}
export interface IUserBalance {
  coins: number;
  topUpCoins: (cost: number) => void;
  debitCoins: (cost: number) => void;
}

export const useCartStore = create<ICartState>()((set) => ({
  cart: [],
  cartCount: 0,
  addToCart: (id, stok) =>
    set((state) => {
      const index = state.cart.findIndex((i) => i.id == id);
      if (index !== -1) {
        const item = state.cart[index];
        if (item.stok !== undefined && item.count < item.stok) {
          const updatedCart = [...state.cart];
          updatedCart[index] = { ...item, count: item.count + 1 };

          return {
            cart: updatedCart,
            cartCount: state.cartCount + 1,
          };
        } else return state;
      } else {
        return {
          cart: [...state.cart, { id: id, count: 1, stok: stok }],
          cartCount: state.cartCount + 1,
        };
      }
    }),
  reduceItemsCount: (id) =>
    set((state) => {
      const index = state.cart.findIndex((i) => i.id === id);
      if (index === -1) return state;

      const item = state.cart[index];

      if (item.count > 1) {
        const updatedCart = [...state.cart];
        updatedCart[index] = { ...item, count: item.count - 1 };

        return {
          cart: updatedCart,
          cartCount: state.cartCount - 1,
        };
      } else {
        return {
          cart: state.cart.filter((i) => i.id !== id),
          cartCount: state.cartCount - 1,
        };
      }
    }),

  removeFromCart: (id) =>
    set((state) => {
      return {
        cart: state.cart.filter((i) => i.id !== id),
        cartCount:
          state.cartCount - Number(state.cart.find((i) => i.id === id)?.count),
      };
    }),
  resetCart: () => set(() => ({ cart: [], cartCount: 0 })),
}));

export const useUserBalanceStore = create<IUserBalance>()((set) => ({
  coins: 24,
  topUpCoins: (cost) => set((state) => ({ coins: state.coins + cost })),
  debitCoins: (cost) =>
    set((state) => ({
      coins:
        state.coins > cost
          ? Number((state.coins - cost).toFixed(2))
          : state.coins,
    })),
}));
