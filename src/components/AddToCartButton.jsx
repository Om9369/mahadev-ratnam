"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);

  if (cartItem) {
    return (
      <div className="flex items-center gap-4 bg-[#120B08] text-white rounded-full px-4 py-3">
        <button
          onClick={() => decreaseQty(product.id)}
          className="w-8 h-8 rounded-full bg-[#B88A44] text-[#120B08] font-bold"
        >
          -
        </button>

        <span className="font-semibold min-w-[20px] text-center">
          {cartItem.quantity}
        </span>

        <button
          onClick={() => increaseQty(product.id)}
          className="w-8 h-8 rounded-full bg-[#B88A44] text-[#120B08] font-bold"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-[#3C2A20] text-white px-7 py-3 rounded-full hover:bg-[#B88A44] transition"
    >
      Add To Cart
    </button>
  );
}