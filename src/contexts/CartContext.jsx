"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { rawUser, isLoading: authLoading } = useAuth();
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // ─── Load cart ────────────────────────────────────────────────────────────
  // If user is logged in → fetch from Supabase, else use localStorage
  const loadCart = useCallback(async () => {
    if (rawUser) {
      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", rawUser.id);
      if (!error && data) {
        setCart(data.map((row) => ({
          id: row.product_id,
          name: row.name,
          image: row.image,
          price: row.price,
          purity: row.purity,
          quantity: row.quantity,
          category: row.category,
          slug: row.slug,
          dbId: row.id,
        })));
      }
    } else {
      // Guest → localStorage
      try {
        const saved = localStorage.getItem("cart_guest");
        if (saved) setCart(JSON.parse(saved));
      } catch (_) {}
    }
  }, [rawUser]);

  // Load whenever auth state resolves
  useEffect(() => {
    if (!authLoading) loadCart();
  }, [authLoading, loadCart]);

  // Save guest cart to localStorage
  useEffect(() => {
    if (!rawUser) {
      localStorage.setItem("cart_guest", JSON.stringify(cart));
    }
  }, [cart, rawUser]);

  // ─── Sync guest cart to Supabase on login ────────────────────────────────
  useEffect(() => {
    const mergeGuestCart = async () => {
      if (!rawUser) return;
      const guestRaw = localStorage.getItem("cart_guest");
      if (!guestRaw) return;
      const guestItems = JSON.parse(guestRaw);
      if (!guestItems.length) return;

      setIsSyncing(true);
      for (const item of guestItems) {
        await supabase.from("cart_items").upsert({
          user_id: rawUser.id,
          product_id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          purity: item.purity,
          quantity: item.quantity,
          category: item.category,
          slug: item.slug,
        }, { onConflict: "user_id,product_id,purity" });
      }
      localStorage.removeItem("cart_guest");
      await loadCart();
      setIsSyncing(false);
    };
    if (rawUser && !authLoading) mergeGuestCart();
  }, [rawUser, authLoading]);

  // ─── Add to cart ─────────────────────────────────────────────────────────
  const addToCart = async (product, purity, quantity = 1) => {
    const price = purity === "18K" ? product.price18k : product.price22k;

    if (rawUser) {
      const { data: existing } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", rawUser.id)
        .eq("product_id", product.id)
        .eq("purity", purity)
        .single();

      if (existing) {
        await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + quantity })
          .eq("id", existing.id);
      } else {
        await supabase.from("cart_items").insert({
          user_id: rawUser.id,
          product_id: product.id,
          name: product.name,
          image: product.image,
          price,
          purity,
          quantity,
          category: product.category,
          slug: product.slug,
        });
      }
      await loadCart();
    } else {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id && i.purity === purity);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id && i.purity === purity
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { id: product.id, name: product.name, image: product.image, price, purity, quantity, category: product.category, slug: product.slug }];
      });
    }
  };

  // ─── Remove from cart ─────────────────────────────────────────────────────
  const removeFromCart = async (id, purity) => {
    if (rawUser) {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", rawUser.id)
        .eq("product_id", id)
        .eq("purity", purity);
      await loadCart();
    } else {
      setCart((prev) => prev.filter((i) => !(i.id === id && i.purity === purity)));
    }
  };

  // ─── Update quantity ──────────────────────────────────────────────────────
  const updateQuantity = async (id, purity, quantity) => {
    if (quantity <= 0) { removeFromCart(id, purity); return; }

    if (rawUser) {
      await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("user_id", rawUser.id)
        .eq("product_id", id)
        .eq("purity", purity);
      await loadCart();
    } else {
      setCart((prev) =>
        prev.map((i) => i.id === id && i.purity === purity ? { ...i, quantity } : i)
      );
    }
  };

  // ─── Clear cart ───────────────────────────────────────────────────────────
  const clearCart = async () => {
    if (rawUser) {
      await supabase.from("cart_items").delete().eq("user_id", rawUser.id);
    }
    setCart([]);
  };

  const cartTotal = cart.reduce((t, i) => t + (i.price || 0) * i.quantity, 0);
  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, isOpen, setIsOpen, isSyncing }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
