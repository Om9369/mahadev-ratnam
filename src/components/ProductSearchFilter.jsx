"use client";

import { useState } from "react";
import { Search, X, Filter } from "lucide-react";

export default function ProductSearchFilter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPurity, setSelectedPurity] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["all", "rings", "earrings", "necklaces", "bangles", "bridal", "chains", "pendants", "bracelets"];
  const purities = ["all", "18K", "22K"];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-10000", label: "Under ₹10,000" },
    { value: "10000-25000", label: "₹10,000 - ₹25,000" },
    { value: "25000-50000", label: "₹25,000 - ₹50,000" },
    { value: "50000+", label: "₹50,000+" },
  ];

  const handleFilterChange = () => {
    onFilterChange({
      searchTerm,
      category: selectedCategory,
      purity: selectedPurity,
      priceRange,
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedPurity("all");
    setPriceRange("all");
    onFilterChange({
      searchTerm: "",
      category: "all",
      purity: "all",
      priceRange: "all",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8D8B8] p-6 shadow-sm">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8870]" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange();
          }}
          className="w-full pl-12 pr-10 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              handleFilterChange();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8870] hover:text-[#2D2219]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Toggle Button (Mobile) */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden w-full flex items-center justify-center gap-2 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] hover:border-[#C9A84C] transition-colors mb-4"
      >
        <Filter size={16} />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters */}
      <div className={`${showFilters ? "block" : "hidden"} lg:block space-y-4`}>
        {/* Category Filter */}
        <div>
          <label className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2 block">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  handleFilterChange();
                }}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#C9A84C] text-[#0F0A06]"
                    : "bg-[#FCF8F3] text-[#2D2219] border border-[#E8D8B8] hover:border-[#C9A84C]"
                }`}
              >
                {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Purity Filter */}
        <div>
          <label className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2 block">
            Gold Purity
          </label>
          <div className="flex gap-2">
            {purities.map((purity) => (
              <button
                key={purity}
                onClick={() => {
                  setSelectedPurity(purity);
                  handleFilterChange();
                }}
                className={`flex-1 py-2 rounded-full text-xs font-sans font-semibold transition-all ${
                  selectedPurity === purity
                    ? "bg-[#C9A84C] text-[#0F0A06]"
                    : "bg-[#FCF8F3] text-[#2D2219] border border-[#E8D8B8] hover:border-[#C9A84C]"
                }`}
              >
                {purity === "all" ? "All" : purity}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2 block">
            Price Range
          </label>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => {
                  setPriceRange(range.value);
                  handleFilterChange();
                }}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all ${
                  priceRange === range.value
                    ? "bg-[#C9A84C] text-[#0F0A06]"
                    : "bg-[#FCF8F3] text-[#2D2219] border border-[#E8D8B8] hover:border-[#C9A84C]"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="w-full py-3 border border-red-200 text-red-600 rounded-xl text-xs font-sans font-semibold hover:bg-red-50 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
