import Link from "next/link";
import LiveRateWidget from "@/components/LiveRateWidget";

export const metadata = {
  title: "Live Gold & Silver Rate | Mahadev Ratnam",
  description: "Check today's live gold and silver market rates. Real-time prices for 18K and 22K gold jewellery by Mahadev Ratnam.",
};

export default function LiveRatePage() {
  return (
    <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">

      {/* Page Header */}
      <section className="relative bg-[#0F0A06] py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_#C9A84C_0%,_transparent_70%)]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-[#C9A84C]/50" />
            <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Real-Time Prices</span>
            <div className="w-10 h-[1px] bg-[#C9A84C]/50" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-white">Live Gold Rate</h1>
          <p className="mt-5 text-[#8A7560] font-sans text-sm md:text-base max-w-xl mx-auto leading-7">
            Track live international gold and silver market prices updated in real-time for our wholesale buyers.
          </p>

          {/* Breadcrumb */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#6A5A4A] font-sans">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-[#C9A84C]">Live Rate</span>
          </div>
        </div>
      </section>

      {/* Rate cards strip */}
      <section className="max-w-7xl mx-auto px-5 lg:px-10 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "22K Gold Today", unit: "per gram", color: "bg-[#0F0A06]", textColor: "text-[#E8C97A]" },
            { label: "18K Gold Today", unit: "per gram", color: "bg-[#C9A84C]", textColor: "text-[#0F0A06]" },
            { label: "Silver Today", unit: "per gram", color: "bg-white", textColor: "text-[#2D2219]" },
            { label: "Making Charges", unit: "varies by design", color: "bg-white", textColor: "text-[#2D2219]" },
          ].map((card) => (
            <div key={card.label} className={`${card.color} rounded-2xl p-5 md:p-6 border border-[#C9A84C]/20 shadow-md text-center`}>
              <p className={`text-[9px] md:text-[10px] uppercase tracking-[3px] font-sans font-semibold ${card.color === "bg-[#C9A84C]" ? "text-[#0F0A06]/70" : "text-[#C9A84C]"}`}>
                {card.label}
              </p>
              <p className={`font-serif text-2xl md:text-3xl mt-2 ${card.textColor}`}>Live</p>
              <p className={`text-[10px] font-sans mt-1 ${card.color === "bg-[#C9A84C]" ? "text-[#0F0A06]/60" : "text-[#7A6650]"}`}>
                {card.unit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Widget Content */}
      <section className="max-w-7xl mx-auto px-5 lg:px-10 mt-10">
        <LiveRateWidget />
      </section>

      {/* Disclaimer + CTA */}
      <section className="max-w-7xl mx-auto px-5 lg:px-10 mt-12">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Disclaimer */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8D8B8]">
            <h3 className="font-serif text-xl text-[#2D2219] mb-3">Important Note</h3>
            <p className="text-[#7A6650] font-sans text-sm leading-7">
              The gold and silver prices shown are international spot prices in USD. Actual jewellery pricing by Mahadev Ratnam is calculated based on:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Live Indian gold rate (₹ per gram)",
                "Jewellery weight and purity (18K / 22K)",
                "Making charges by design complexity",
                "GST as applicable by government norms",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-[#5A4A38] font-sans">
                  <span className="text-[#C9A84C] mt-0.5">✦</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Enquiry CTA */}
          <div className="bg-[#0F0A06] rounded-2xl p-6 border border-[#C9A84C]/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_right,_#C9A84C_0%,_transparent_70%)]" />
            <div className="relative">
              <p className="text-[#C9A84C] text-[10px] tracking-[4px] uppercase font-sans font-semibold mb-3">Get Exact Pricing</p>
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
                Want Today's<br />Jewellery Price?
              </h3>
              <p className="text-[#8A7560] font-sans text-sm leading-7 mb-6">
                Contact us directly on WhatsApp for today's accurate jewellery price including weight, purity and making charges.
              </p>
              <a
                href="https://wa.me/919369895157?text=Hello%20Mahadev%20Ratnam%2C%20I%20want%20to%20know%20today%27s%20jewellery%20price."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-7 py-3.5 rounded-full text-sm inline-block"
              >
                Ask on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}