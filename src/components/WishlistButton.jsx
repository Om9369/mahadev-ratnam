"use client";

import { useWishlist } from "@/contexts/WishlistContext";
import { Heart, HeartOff } from "lucide-react";

export default function WishlistButton({ product }) {
  const wishlist = useWishlist();
  const inWishlist = wishlist.isInWishlist(product.id);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      wishlist.removeFromWishlist(product.id);
    } else {
      wishlist.addToWishlist(product);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 ${
        inWishlist
          ? "bg-red-500 text-white shadow-lg"
          : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 shadow-md"
      }`}
      title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      {inWishlist ? <HeartOff size={18} /> : <Heart size={18} />}
    </button>
  );
}
