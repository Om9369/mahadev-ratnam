"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CartProvider } from "@/contexts/CartContext";
import { GoldPriceProvider } from "@/contexts/GoldPriceContext";

export function CombinedProvider({ children }) {
  return (
    <AuthProvider>
      <GoldPriceProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </WishlistProvider>
      </GoldPriceProvider>
    </AuthProvider>
  );
}
