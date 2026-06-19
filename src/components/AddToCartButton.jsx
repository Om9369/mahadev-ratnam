"use client";

import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";

export default function AddToCartButton({ product }) {
  const cart = useCart();
  const [selectedPurity, setSelectedPurity] = useState("22K");

  // Get purity array from product
  const purityArray = Array.isArray(product.purity)
    ? product.purity
    : typeof product.purity === "string"
    ? product.purity.split(",").map((p) => p.trim()).filter(Boolean)
    : product.purity ? [product.purity] : ["18K", "22K"]; // Default to both if not specified

  // Set default purity based on available options
  useEffect(() => {
    if (purityArray.length > 0 && !purityArray.includes(selectedPurity)) {
      setSelectedPurity(purityArray[0]);
    }
  }, [purityArray, selectedPurity]);

  const cartItem = cart.cart.find((item) => item.id === product.id && item.purity === selectedPurity);

  const handleAddToCart = () => {
    console.log("Add to cart clicked", { product, selectedPurity });
    cart.addToCart(product, selectedPurity);
    cart.setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Purity Selection */}
      <div className="flex gap-2">
        {purityArray.includes("18K") && (
          <button
            onClick={() => {
              console.log("18K clicked");
              setSelectedPurity("18K");
            }}
            className={`flex-1 py-2 px-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
              selectedPurity === "18K"
                ? "bg-[#0F0A06] text-[#C9A84C] border-2 border-[#C9A84C]"
                : "bg-white text-[#2D2219] border-2 border-[#E8D8B8] hover:border-[#C9A84C]"
            }`}
          >
            18K
          </button>
        )}
        {purityArray.includes("22K") && (
          <button
            onClick={() => {
              console.log("22K clicked");
              setSelectedPurity("22K");
            }}
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
            onClick={() => cart.updateQuantity(product.id, selectedPurity, cartItem.quantity - 1)}
            className="w-8 h-8 rounded-full bg-[#C9A84C] text-[#0F0A06] font-bold hover:bg-[#E8C97A] transition-all duration-200 flex items-center justify-center"
          >
            −
          </button>

          <span className="font-semibold text-base min-w-[24px] text-center">
            {cartItem.quantity}
          </span>

          <button
            onClick={() => cart.updateQuantity(product.id, selectedPurity, cartItem.quantity + 1)}
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