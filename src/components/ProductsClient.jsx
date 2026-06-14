"use client";

import { useState, useMemo } from "react";
import ProductSearchFilter from "@/components/ProductSearchFilter";
import { allProducts } from "@/data/allProducts";
import Link from "next/link";

export default function ProductsClient() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "all",
    purity: "all",
    priceRange: "all",
  });

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.subCategory?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      // Purity filter
      if (filters.purity !== "all") {
        const productPurity = Array.isArray(product.purity)
          ? product.purity
          : typeof product.purity === "string"
          ? product.purity.split(",").map((p) => p.trim())
          : [];
        if (!productPurity.includes(filters.purity)) return false;
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        const price = product.price22k || product.price18k || 0;
        if (filters.priceRange === "0-10000" && price >= 10000) return false;
        if (filters.priceRange === "10000-25000" && (price < 10000 || price >= 25000)) return false;
        if (filters.priceRange === "25000-50000" && (price < 25000 || price >= 50000)) return false;
        if (filters.priceRange === "50000+" && price < 50000) return false;
      }

      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-10 mt-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-[1px] bg-[#C9A84C]" />
        <h2 className="font-serif text-2xl md:text-3xl text-[#2D2219]">All Products</h2>
        <span className="text-sm text-[#9A8870] font-sans">({filteredProducts.length} found)</span>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <ProductSearchFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E8D8B8]">
              <div className="text-6xl mb-6 text-[#C9A84C]">✦</div>
              <h3 className="font-serif text-2xl text-[#2D2219] mb-4">No products found</h3>
              <p className="text-[#7A6650] font-sans mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={() => handleFilterChange({ searchTerm: "", category: "all", purity: "all", priceRange: "all" })}
                className="btn-gold px-8 py-3 rounded-full text-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => {
                const purityArray = Array.isArray(product.purity)
                  ? product.purity
                  : typeof product.purity === "string"
                  ? product.purity.split(",").map((p) => p.trim()).filter(Boolean)
                  : [];

                return (
                  <Link
                    href={`/products/${product.slug}`}
                    key={product.id || product.slug}
                    className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-[#E8D8B8] hover:border-[#C9A84C]/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-52 md:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {product.featured && (
                        <div className="absolute top-3 left-3 bg-[#C9A84C] text-[#0F0A06] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-sans">
                          Featured
                        </div>
                      )}

                      {product.availability === "Out of Stock" && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-white/90 text-red-600 text-xs font-bold font-sans px-4 py-2 rounded-full">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 md:p-5 flex flex-col flex-grow">
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[2px] text-[#C9A84C] font-sans font-semibold">
                        {product.subCategory}
                      </p>

                      <h3 className="mt-1.5 font-serif text-base md:text-xl text-[#2D2219] leading-tight">
                        {product.name}
                      </h3>

                      <div className="flex gap-1.5 mt-3 flex-wrap">
                        {purityArray.map((p) => (
                          <span key={p} className="text-[9px] md:text-[10px] border border-[#C9A84C]/40 text-[#C9A84C] px-2 py-0.5 rounded-full font-sans font-semibold">
                            {p}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        {product.price22k ? (
                          <div>
                            <p className="text-[9px] text-[#9A8870] font-sans">From</p>
                            <p className="text-sm md:text-base font-serif text-[#2D2219] font-semibold">
                              ₹{Number(product.price22k).toLocaleString("en-IN")}
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
          )}
        </div>
      </div>
    </section>
  );
}
