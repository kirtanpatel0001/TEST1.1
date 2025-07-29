import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  images: { url: string; alt: string; color?: string }[];
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
        return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i._id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCart(prev => prev.map(i => i._id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decreaseQuantity = (id: string) => {
    setCart(prev => prev.map(i => i._id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
