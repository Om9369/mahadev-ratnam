"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const { cart, addToCart, updateQuantity, setIsOpen } = useCart();
  const [selectedPurity, setSelectedPurity] = useState("22K");

  const cartItem = cart.find((item) => item.id === product.id && item.purity === selectedPurity);

  const handleAddToCart = () => {
    addToCart(product, selectedPurity);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Purity Selection */}
      <div className="flex gap-2">
        {product.price18k && (
          <button
            onClick={() => setSelectedPurity("18K")}
            className={`flex-1 py-2 px-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
              selectedPurity === "18K"
                ? "bg-[#0F0A06] text-[#C9A84C] border-2 border-[#C9A84C]"
                : "bg-white text-[#2D2219] border-2 border-[#E8D8B8] hover:border-[#C9A84C]"
            }`}
          >
            18K
          </button>
        )}
        {product.price22k && (
          <button
            onClick={() => setSelectedPurity("22K")}
            className={`flex-1 py-2 px-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
              selectedPurity === "22K"
                ? "bg-[#C9A84C] text-[#0F0A06] border-2 border-[#C9A84C]"
                : "bg-white text-[#2D2219] border-2 border-[#E8D8B8] hover:border-[#C9A84C]"
            }`}
          >
            22K
          </button>
        )}
      </div>

      {/* Add to Cart or Quantity Control */}
      {cartItem ? (
        <div className="flex items-center justify-center gap-3 bg-[#0F0A06] text-white rounded-full px-4 py-2">
          <button
            onClick={() => updateQuantity(product.id, selectedPurity, cartItem.quantity - 1)}
            className="w-8 h-8 rounded-full bg-[#C9A84C] text-[#0F0A06] font-bold hover:bg-[#E8C97A] transition-all duration-200 flex items-center justify-center"
          >
            −
          </button>

          <span className="font-semibold text-base min-w-[24px] text-center">
            {cartItem.quantity}
          </span>

          <button
            onClick={() => updateQuantity(product.id, selectedPurity, cartItem.quantity + 1)}
            className="w-8 h-8 rounded-full bg-[#C9A84C] text-[#0F0A06] font-bold hover:bg-[#E8C97A] transition-all duration-200 flex items-center justify-center"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="btn-dark w-full py-3 rounded-full text-sm font-semibold"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}