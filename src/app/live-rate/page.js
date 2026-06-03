"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import LiveRateWidget from "@/components/LiveRateWidget";

export default function LiveRatePage() {
  return (
    <>
      <Navbar />

      {/* KEEP LIVE RATE PAGE DESIGN BELOW */}
      <main className="pt-[78px] min-h-screen bg-[#120b08] text-white">
        {/* Hero Section */}
        <section className="relative px-6 py-20 md:py-28 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2b1208] via-[#120b08] to-[#080504]" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <p className="text-[#c9a24d] uppercase tracking-[0.35em] text-xs md:text-sm mb-4">
              Live Market Updates
            </p>

            <h1 className="font-serif text-4xl md:text-7xl text-[#f6e7bd] leading-tight">
              Live Gold & Silver Rates
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-[#e8d8b8]/80 text-base md:text-lg leading-8">
              Stay updated with live gold and silver market movements for
              better wholesale jewellery pricing decisions.
            </p>
          </div>
        </section>

        {/* Widget Section */}
        <section className="px-5 md:px-10 pb-16">
          <div className="max-w-6xl mx-auto bg-[#1b100c] border border-[#c9a24d]/30 rounded-3xl p-5 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <LiveRateWidget />
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 pb-20 text-center">
          <div className="max-w-4xl mx-auto border border-[#c9a24d]/30 rounded-3xl p-8 md:p-12 bg-[#1b100c]">
            <h2 className="font-serif text-3xl md:text-5xl text-[#f6e7bd]">
              Need Wholesale Jewellery Pricing?
            </h2>

            <p className="mt-4 text-[#e8d8b8]/75">
              Contact Mahadev Ratnam for premium gold jewellery wholesale
              enquiries and latest pricing support.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://wa.me/918417884230"
                className="bg-[#c9a24d] text-[#120b08] px-7 py-3 rounded-full font-semibold hover:bg-[#f3d98b] transition"
              >
                Enquire on WhatsApp
              </Link>

              <Link
                href="/"
                className="border border-[#c9a24d] text-[#f6e7bd] px-7 py-3 rounded-full hover:bg-[#c9a24d] hover:text-[#120b08] transition"
              >
                Back to Home
              </Link>
            </div>

            <p className="mt-6 text-xs text-[#e8d8b8]/50">
              Disclaimer: Rates are based on live market data and may vary
              according to making charges, purity, taxes, and market conditions.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}