"use client";

import { useState } from "react";
import { useGoldPrice } from "@/contexts/GoldPriceContext";

export default function GoldCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [purity, setPurity] = useState("22K");
  const [makingCharges, setMakingCharges] = useState("");
  const [result, setResult] = useState(null);
  const { goldRate, getPricePerGram, isLoading, lastUpdated, fetchGoldPrice } = useGoldPrice();

  const calculatePrice = () => {
    const weightNum = parseFloat(weight);
    const rateNum = getPricePerGram(purity);
    const makingNum = parseFloat(makingCharges) || 15;

    if (!weightNum || weightNum <= 0) {
      alert("Please enter a valid weight");
      return;
    }

    // Calculate gold price
    const goldPrice = weightNum * rateNum;
    const makingPrice = goldPrice * (makingNum / 100);
    const totalPrice = goldPrice + makingPrice;

    setResult({
      goldPrice,
      makingPrice,
      totalPrice,
      ratePerGram: rateNum,
    });
  };

  const resetCalculator = () => {
    setWeight("");
    setPurity("22K");
    setMakingCharges("");
    setResult(null);
  };

  return (
    <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-[1px] bg-[#C9A84C]" />
          <h1 className="font-serif text-3xl md:text-4xl text-[#2D2219]">Gold Rate Calculator</h1>
        </div>

        <p className="text-[#7A6650] font-sans mb-8 leading-7">
          Calculate the estimated price of gold jewellery based on weight, purity, and current market rates. Perfect for planning your wholesale purchases.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8D8B8]">
            <h3 className="font-serif text-xl text-[#2D2219] mb-6 pb-3 border-b border-[#F0E6D0]">
              Enter Details
            </h3>

            <div className="space-y-5">
              {/* Weight */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  Weight (grams) *
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Enter weight in grams"
                />
              </div>

              {/* Purity */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  Gold Purity *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["24K", "22K", "18K"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPurity(p)}
                      className={`py-3 rounded-full text-sm font-semibold transition-all ${
                        purity === p
                          ? "bg-[#C9A84C] text-[#0F0A06] border-2 border-[#C9A84C]"
                          : "bg-white text-[#2D2219] border-2 border-[#E8D8B8] hover:border-[#C9A84C]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Rate Display */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  Current Gold Rate (₹/gram)
                </label>
                <div className="bg-[#FCF8F3] rounded-xl p-4 border border-[#E8D8B8]">
                  {isLoading ? (
                    <p className="text-sm text-[#9A8870] font-sans">Loading live rates...</p>
                  ) : (
                    <div>
                      <p className="font-serif text-2xl text-[#2D2219]">
                        ₹{getPricePerGram(purity).toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] text-[#9A8870] font-sans mt-1">
                        {purity} Gold • Updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Just now'}
                      </p>
                      <button
                        onClick={fetchGoldPrice}
                        className="text-[10px] text-[#C9A84C] font-sans mt-2 hover:underline"
                      >
                        Refresh rates
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Making Charges */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">
                  Making Charges (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  value={makingCharges}
                  onChange={(e) => setMakingCharges(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] placeholder-[#9A8870] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="e.g., 10"
                />
                <p className="text-[10px] text-[#9A8870] font-sans mt-1">
                  Typical range: 8-15% for wholesale orders
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={calculatePrice}
                  className="flex-1 btn-dark py-3 rounded-full text-sm font-semibold"
                >
                  Calculate Price
                </button>
                <button
                  onClick={resetCalculator}
                  className="flex-1 border border-[#E8D8B8] text-[#2D2219] py-3 rounded-full text-sm font-semibold hover:border-[#C9A84C] transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Result Display */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8D8B8]">
            <h3 className="font-serif text-xl text-[#2D2219] mb-6 pb-3 border-b border-[#F0E6D0]">
              Price Breakdown
            </h3>

            {result ? (
              <div className="space-y-6">
                {/* Gold Price */}
                <div className="flex justify-between items-center pb-4 border-b border-[#F0E6D0]">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">
                      Gold Price
                    </p>
                    <p className="text-[10px] text-[#9A8870] font-sans mt-1">
                      {weight}g × ₹{result.ratePerGram}/gram
                    </p>
                  </div>
                  <p className="font-serif text-2xl text-[#2D2219]">
                    ₹{result.goldPrice.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Making Charges */}
                <div className="flex justify-between items-center pb-4 border-b border-[#F0E6D0]">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">
                      Making Charges
                    </p>
                    <p className="text-[10px] text-[#9A8870] font-sans mt-1">
                      {makingCharges || 0}% of gold price
                    </p>
                  </div>
                  <p className="font-serif text-2xl text-[#2D2219]">
                    ₹{result.makingPrice.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Total Price */}
                <div className="bg-[#0F0A06] rounded-2xl p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#C9A84C] font-sans font-semibold">
                        Total Estimated Price
                      </p>
                      <p className="text-[10px] text-[#8A7560] font-sans mt-1">
                        {purity} Gold • {weight} grams
                      </p>
                    </div>
                    <p className="font-serif text-3xl text-[#E8C97A]">
                      ₹{result.totalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-[#FCF8F3] rounded-xl p-4">
                  <p className="text-[10px] text-[#7A6650] font-sans leading-5">
                    <strong>Note:</strong> This is an estimated price. Final price may vary based on actual gold rate at time of purchase, design complexity, and additional charges. For accurate wholesale pricing, please contact our sales team.
                  </p>
                </div>

                {/* WhatsApp Enquiry */}
                <a
                  href={`https://wa.me/919369895157?text=Hello%20Mahadev%20Ratnam%2C%20I%20want%20to%20enquire%20about%20${purity}%20gold%20jewellery%20of%20${weight}%20grams.%20Estimated%20price%3A%20₹${result.totalPrice.toLocaleString("en-IN")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full btn-gold text-center py-3 rounded-full text-sm font-semibold"
                >
                  Enquire on WhatsApp →
                </a>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 text-[#C9A84C]">✦</div>
                <p className="text-[#7A6650] font-sans text-sm">
                  Enter the details and click "Calculate Price" to see the estimated cost
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Current Rates Info */}
        <div className="mt-12 bg-[#0F0A06] rounded-3xl p-8 border border-[#C9A84C]/20">
          <h3 className="font-serif text-xl text-[#E8C97A] mb-6">Current Gold Rates (per gram)</h3>
          <div className="grid grid-cols-3 gap-4">
            {["24K", "22K", "18K"].map((p) => (
              <div key={p} className="bg-[#1A1008] rounded-2xl p-4 text-center">
                <p className="text-[#C9A84C] text-sm font-semibold font-sans">{p}</p>
                <p className="font-serif text-2xl text-white mt-2">
                  {isLoading ? (
                    <span className="text-[#8A7560]">Loading...</span>
                  ) : (
                    `₹${getPricePerGram(p).toLocaleString("en-IN")}`
                  )}
                </p>
                <p className="text-[10px] text-[#8A7560] font-sans mt-1">per gram</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#8A7560] font-sans text-center mt-6">
            * Live rates updated every 10 minutes. Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Just now'}
          </p>
        </div>
      </div>
    </main>
  );
}
