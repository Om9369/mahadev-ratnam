"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductDetailClient({ product, relatedProducts }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Generate additional images (in real app, these would come from product data)
  const productImages = [
    product.image,
    // In production, you'd have multiple actual images
    // For now, we'll use the same image with different effects
  ];

  const sizeGuideData = {
    rings: [
      { size: "12", diameter: "11.5mm" },
      { size: "13", diameter: "12.1mm" },
      { size: "14", diameter: "12.7mm" },
      { size: "15", diameter: "13.3mm" },
      { size: "16", diameter: "13.9mm" },
      { size: "17", diameter: "14.5mm" },
      { size: "18", diameter: "15.1mm" },
      { size: "19", diameter: "15.7mm" },
      { size: "20", diameter: "16.3mm" },
      { size: "21", diameter: "16.9mm" },
      { size: "22", diameter: "17.5mm" },
      { size: "23", diameter: "18.1mm" },
    ],
    bangles: [
      { size: "2.2", diameter: "56mm" },
      { size: "2.4", diameter: "60mm" },
      { size: "2.6", diameter: "64mm" },
      { size: "2.8", diameter: "68mm" },
      { size: "2.10", diameter: "72mm" },
      { size: "2.12", diameter: "76mm" },
    ],
  };

  const purityArray = Array.isArray(product.purity)
    ? product.purity
    : typeof product.purity === "string"
    ? product.purity.split(",").map((p) => p.trim()).filter(Boolean)
    : ["18K", "22K"];

  const category = product.category?.toLowerCase();
  const sizeCategory = category === "rings" ? "rings" : category === "bangles" ? "bangles" : null;

  return (
    <>
      <main className="pt-28 min-h-screen bg-[#FCF8F3] pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-8">
          <nav className="flex items-center gap-2 text-xs font-sans text-[#9A8870]">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/products" className="hover:text-[#C9A84C] transition-colors">Collections</Link>
            <span>›</span>
            <Link href={`/products/${product.category}`} className="capitalize hover:text-[#C9A84C] transition-colors">
              {product.category}
            </Link>
            <span>›</span>
            <span className="text-[#2D2219] font-medium truncate max-w-[180px]">{product.name}</span>
          </nav>
        </div>

        <section className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            {/* Image Gallery */}
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#C9A84C]/40 rounded-tl-2xl z-10" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#C9A84C]/40 rounded-br-2xl z-10" />

              <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E8D8B8] shadow-xl">
                <div className="relative w-full h-[420px] md:h-[560px]">
                  <Image
                    src={productImages[selectedImage] || product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />

                  {product.availability === "Out of Stock" && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full font-sans z-20">
                      Out of Stock
                    </div>
                  )}

                  {product.featured && (
                    <div className="absolute top-4 right-4 bg-[#C9A84C] text-[#0F0A06] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full font-sans z-20">
                      ⭐ Featured
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {productImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx
                            ? "border-[#C9A84C] scale-110"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} view ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:pt-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-[1px] bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
                  {product.subCategory}
                </span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-[#2D2219] leading-tight">
                {product.name}
              </h1>

              <p className="mt-5 text-[#7A6650] font-sans text-sm md:text-base leading-8">
                {product.description || "Premium gold jewellery design by Mahadev Ratnam — crafted with tradition, elegance and superior purity for discerning retailers and wholesale buyers."}
              </p>

              <div className="mt-8 bg-white border border-[#E8D8B8] rounded-2xl p-6 space-y-4 shadow-sm">
                <h3 className="font-serif text-lg text-[#2D2219] border-b border-[#F0E6D0] pb-3 mb-4">
                  Product Details
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">Weight</span>
                  <span className="font-sans text-sm font-semibold text-[#2D2219]">{product.weight || "As per design"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">Availability</span>
                  <span className={`text-xs font-bold font-sans px-3 py-1 rounded-full ${
                    product.availability === "Available"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-600 border border-red-200"
                  }`}>
                    {product.availability || "Available"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">Available In</span>
                  <div className="flex gap-2">
                    {purityArray.map((p) => (
                      <span key={p} className="bg-[#FCF8F3] border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-bold font-sans px-3 py-1 rounded-full">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {sizeCategory && (
                  <div className="flex items-center justify-between pt-2 border-t border-[#F0E6D0]">
                    <span className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">Size Guide</span>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-[10px] text-[#C9A84C] font-bold font-sans px-3 py-1 rounded-full border border-[#C9A84C]/40 hover:bg-[#C9A84C] hover:text-[#0F0A06] transition-colors"
                    >
                      View Chart →
                    </button>
                  </div>
                )}
              </div>

              {(product.price18k || product.price22k) && (
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {product.price18k && (
                    <div className="bg-[#0F0A06] rounded-2xl p-5 text-center border border-[#C9A84C]/20">
                      <p className="text-[10px] text-[#C9A84C] tracking-[3px] uppercase font-sans font-semibold">18K Gold</p>
                      <p className="font-serif text-2xl text-white mt-2">
                        ₹{Number(product.price18k).toLocaleString("en-IN")}
                      </p>
                    </div>
                  )}

                  {product.price22k && (
                    <div className="bg-[#C9A84C] rounded-2xl p-5 text-center">
                      <p className="text-[10px] text-[#0F0A06] tracking-[3px] uppercase font-sans font-semibold">22K Gold</p>
                      <p className="font-serif text-2xl text-[#0F0A06] mt-2">
                        ₹{Number(product.price22k).toLocaleString("en-IN")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <p className="mt-3 text-[10px] text-[#9A8870] font-sans text-center italic">
                * Prices may vary based on live gold rate, weight and making charges.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AddToCartButton product={product} />

                <a
                  href={`https://wa.me/919369895157?text=Hello%20Mahadev%20Ratnam%2C%20I%20want%20to%20enquire%20about%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-center py-3 rounded-full text-sm font-semibold flex items-center justify-center"
                >
                  Enquire on WhatsApp →
                </a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[#F0E6D0] pt-6">
                {[
                  { icon: "✦", label: "BIS Hallmarked" },
                  { icon: "◈", label: "Pan India Supply" },
                  { icon: "❋", label: "Wholesale Price" },
                ].map((badge) => (
                  <div key={badge.label} className="text-center">
                    <div className="text-[#C9A84C] text-xl mb-1">{badge.icon}</div>
                    <div className="text-[10px] text-[#9A8870] font-sans font-medium leading-4">{badge.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 lg:px-10 mt-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-[#C9A84C]" />
              <h2 className="font-serif text-2xl md:text-3xl text-[#2D2219]">Related Products</h2>
              <div className="w-12 h-[1px] bg-[#C9A84C]" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => {
                const relatedPurityArray = Array.isArray(relatedProduct.purity)
                  ? relatedProduct.purity
                  : typeof relatedProduct.purity === "string"
                  ? relatedProduct.purity.split(",").map((p) => p.trim()).filter(Boolean)
                  : [];

                return (
                  <Link
                    href={`/products/${relatedProduct.slug}`}
                    key={relatedProduct.id || relatedProduct.slug}
                    className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-[#E8D8B8] hover:border-[#C9A84C]/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        width={500}
                        height={500}
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="w-full h-52 md:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {relatedProduct.featured && (
                        <div className="absolute top-3 left-3 bg-[#C9A84C] text-[#0F0A06] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-sans">
                          Featured
                        </div>
                      )}

                      {relatedProduct.availability === "Out of Stock" && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-white/90 text-red-600 text-xs font-bold font-sans px-4 py-2 rounded-full">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 md:p-5 flex flex-col flex-grow">
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[2px] text-[#C9A84C] font-sans font-semibold">
                        {relatedProduct.subCategory}
                      </p>

                      <h3 className="mt-1.5 font-serif text-base md:text-xl text-[#2D2219] leading-tight">
                        {relatedProduct.name}
                      </h3>

                      <div className="flex gap-1.5 mt-3 flex-wrap">
                        {relatedPurityArray.map((p) => (
                          <span key={p} className="text-[9px] md:text-[10px] border border-[#C9A84C]/40 text-[#C9A84C] px-2 py-0.5 rounded-full font-sans font-semibold">
                            {p}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        {relatedProduct.price22k ? (
                          <div>
                            <p className="text-[9px] text-[#9A8870] font-sans">From</p>
                            <p className="text-sm md:text-base font-serif text-[#2D2219] font-semibold">
                              ₹{Number(relatedProduct.price22k).toLocaleString("en-IN")}
                            </p>
                          </div>
                        ) : (
                          <div />
                        )}

                        <span className="text-[10px] md:text-xs bg-[#0F0A06] text-[#E8C97A] px-3 md:px-4 py-2 rounded-full font-sans font-semibold group-hover:bg-[#C9A84C] group-hover:text-[#0F0A06] transition-colors duration-300">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-[#2D2219] capitalize">{sizeCategory} Size Guide</h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-[#9A8870] hover:text-[#2D2219] text-2xl"
              >
                ×
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#E8D8B8]">
                    <th className="text-left py-3 text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">Size</th>
                    <th className="text-left py-3 text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">Diameter</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeGuideData[sizeCategory]?.map((item) => (
                    <tr key={item.size} className="border-b border-[#F0E6D0]">
                      <td className="py-3 text-sm font-semibold text-[#2D2219]">{item.size}</td>
                      <td className="py-3 text-sm text-[#7A6650]">{item.diameter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-xs text-[#9A8870] font-sans leading-6">
              * Size chart is for reference only. For accurate sizing, we recommend visiting a local jeweller or using a ring sizer.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
