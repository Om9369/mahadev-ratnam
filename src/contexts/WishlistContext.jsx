"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { rawUser, isLoading: authLoading } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // ─── Load wishlist ────────────────────────────────────────────────────────
  const loadWishlist = useCallback(async () => {
    if (rawUser) {
      const { data, error } = await supabase
        .from("wishlist_items")
        .select("*")
        .eq("user_id", rawUser.id);
      if (!error && data) {
        setWishlist(data.map((row) => ({
          id: row.product_id,
          name: row.name,
          image: row.image,
          price22k: row.price22k,
          price18k: row.price18k,
          category: row.category,
          slug: row.slug,
          dbId: row.id,
        })));
      }
    } else {
      try {
        const saved = localStorage.getItem("wishlist_guest");
        if (saved) setWishlist(JSON.parse(saved));
      } catch (_) {}
    }
  }, [rawUser]);

  useEffect(() => {
    if (!authLoading) loadWishlist();
  }, [authLoading, loadWishlist]);

  // Save guest wishlist to localStorage
  useEffect(() => {
    if (!rawUser) {
      localStorage.setItem("wishlist_guest", JSON.stringify(wishlist));
    }
  }, [wishlist, rawUser]);

  // ─── Sync guest wishlist on login ─────────────────────────────────────────
  useEffect(() => {
    const mergeGuestWishlist = async () => {
      if (!rawUser) return;
      const guestRaw = localStorage.getItem("wishlist_guest");
      if (!guestRaw) return;
      const guestItems = JSON.parse(guestRaw);
      if (!guestItems.length) return;

      for (const item of guestItems) {
        await supabase.from("wishlist_items").upsert({
          user_id: rawUser.id,
          product_id: item.id,
          name: item.name,
          image: item.image,
          price22k: item.price22k,
          price18k: item.price18k,
          category: item.category,
          slug: item.slug,
        }, { onConflict: "user_id,product_id" });
      }
      localStorage.removeItem("wishlist_guest");
      await loadWishlist();
    };
    if (rawUser && !authLoading) mergeGuestWishlist();
  }, [rawUser, authLoading]);

  // ─── Add to wishlist ──────────────────────────────────────────────────────
  const addToWishlist = async (product) => {
    if (rawUser) {
      const { data: existing } = await supabase
        .from("wishlist_items")
        .select("id")
        .eq("user_id", rawUser.id)
        .eq("product_id", product.id)
        .single();
      if (!existing) {
        await supabase.from("wishlist_items").insert({
          user_id: rawUser.id,
          product_id: product.id,
          name: product.name,
          image: product.image,
          price22k: product.price22k,
          price18k: product.price18k,
          category: product.category,
          slug: product.slug,
        });
        await loadWishlist();
      }
    } else {
      setWishlist((prev) => {
        if (prev.some((i) => i.id === product.id)) return prev;
        return [...prev, product];
      });
    }
  };

  // ─── Remove from wishlist ─────────────────────────────────────────────────
  const removeFromWishlist = async (productId) => {
    if (rawUser) {
      await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", rawUser.id)
        .eq("product_id", productId);
      await loadWishlist();
    } else {
      setWishlist((prev) => prev.filter((i) => i.id !== productId));
    }
  };

  // ─── Clear wishlist ───────────────────────────────────────────────────────
  const clearWishlist = async () => {
    if (rawUser) {
      await supabase.from("wishlist_items").delete().eq("user_id", rawUser.id);
    }
    setWishlist([]);
  };

  const isInWishlist = (productId) => wishlist.some((i) => i.id === productId);
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, wishlistCount, isOpen, setIsOpen }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
