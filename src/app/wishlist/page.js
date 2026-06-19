"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const wishlist = useWishlist();
  const cart = useCart();

  const handleAddToCart = (product) => {
    cart.addToCart(product, "22K");
    cart.setIsOpen(true);
  };

  return (
    <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-[1px] bg-[#C9A84C]" />
          <h1 className="font-serif text-3xl md:text-4xl text-[#2D2219]">My Wishlist</h1>
          <span className="text-sm text-[#9A8870] font-sans">({wishlist.wishlist.length} items)</span>
        </div>

        {wishlist.wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E8D8B8]">
            <Heart className="mx-auto text-[#C9A84C] mb-6" size={48} />
            <h3 className="font-serif text-2xl text-[#2D2219] mb-4">Your wishlist is empty</h3>
            <p className="text-[#7A6650] font-sans mb-8">Save your favorite items for later</p>
            <Link
              href="/products"
              className="btn-gold px-8 py-3 rounded-full text-sm inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {wishlist.wishlist.map((product) => {
                const purityArray = Array.isArray(product.purity)
                  ? product.purity
                  : typeof product.purity === "string"
                  ? product.purity.split(",").map((p) => p.trim()).filter(Boolean)
                  : [];

                return (
                  <div
                    key={product.id || product.slug}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E8D8B8] hover:border-[#C9A84C]/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                  >
                    <div className="relative overflow-hidden">
                      <div className="relative w-full h-52">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>

                      <button
                        onClick={() => wishlist.removeFromWishlist(product.id)}
                        className="absolute top-3 right-3 bg-white/90 text-red-500 p-2 rounded-full hover:bg-white hover:shadow-md transition-all z-10"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>

                      {product.featured && (
                        <div className="absolute top-3 left-3 bg-[#C9A84C] text-[#0F0A06] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-sans">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <p className="text-[10px] uppercase tracking-[2px] text-[#C9A84C] font-sans font-semibold">
                        {product.subCategory}
                      </p>

                      <h3 className="mt-1.5 font-serif text-lg text-[#2D2219] leading-tight">
                        {product.name}
                      </h3>

                      <div className="flex gap-1.5 mt-3 flex-wrap">
                        {purityArray.map((p) => (
                          <span key={p} className="text-[10px] border border-[#C9A84C]/40 text-[#C9A84C] px-2 py-0.5 rounded-full font-sans font-semibold">
                            {p}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        {product.price22k ? (
                          <div>
                            <p className="text-[9px] text-[#9A8870] font-sans">From</p>
                            <p className="text-sm font-serif text-[#2D2219] font-semibold">
                              ₹{Number(product.price22k).toLocaleString("en-IN")}
                            </p>
                          </div>
                        ) : (
                          <div />
                        )}

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-[#0F0A06] text-[#E8C97A] px-4 py-2 rounded-full text-xs font-sans font-semibold hover:bg-[#C9A84C] hover:text-[#0F0A06] transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear Wishlist */}
            <div className="flex justify-center">
              <button
                onClick={wishlist.clearWishlist}
                className="border border-red-200 text-red-600 px-6 py-3 rounded-full text-xs font-sans font-semibold hover:bg-red-50 transition-colors"
              >
                Clear All Wishlist
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
