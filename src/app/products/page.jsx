import Link from "next/link";

export const metadata = {
  title: "Jewellery Collections | Mahadev Ratnam",
  description: "Explore premium wholesale gold jewellery categories by Mahadev Ratnam — rings, earrings, necklaces, bangles, bridal and more.",
};

const categories = [
  {
    name: "Rings",
    slug: "rings",
    desc: "Ladies, Men's, Engagement & Religious designs",
    image: "/rings/ladies-ring-1.jpeg",
    count: "50+ designs",
  },
  {
    name: "Earrings",
    slug: "earrings",
    desc: "Jhumka, Hoop, Stud & Temple styles",
    image: "/earrings/designer-earring-1.jpeg",
    count: "40+ designs",
  },
  {
    name: "Chains",
    slug: "chains",
    desc: "Herringbone, Snake, Designer & Traditional",
    image: "/images/hero-main.jpg",
    count: "20+ designs",
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    desc: "Floral, Diamond, Temple & Light Weight",
    image: "/necklaces/butterfly-necklace-1.jpeg",
    count: "30+ designs",
  },
  {
    name: "Pendants",
    slug: "pendants",
    desc: "Designer & Floral gold pendant designs",
    image: "/images/hero-main.jpg",
    count: "15+ designs",
  },
  {
    name: "Bangles",
    slug: "bangles",
    desc: "Diamond Cut, Traditional & Designer",
    image: "/bangles/designer-bangle-1.jpeg",
    count: "25+ designs",
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    desc: "Designer, Rope, Openable & Lightweight",
    image: "/images/hero-main.jpg",
    count: "20+ designs",
  },
  {
    name: "Bridal",
    slug: "bridal",
    desc: "Complete bridal sets & necklace collections",
    image: "/bridal/bridal-necklace-1.jpeg",
    count: "30+ designs",
  },
];

export default function ProductsPage() {
  return (
    <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">

      {/* Hero Banner */}
      <section className="relative bg-[#0F0A06] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_#C9A84C_0%,_transparent_70%)]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-[1px] bg-[#C9A84C]/50" />
            <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Premium Wholesale Catalogue</span>
            <div className="w-12 h-[1px] bg-[#C9A84C]/50" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
            Jewellery<br />
            <span className="gold-shimmer">Collections</span>
          </h1>
          <p className="mt-6 text-[#8A7560] font-sans text-sm md:text-base max-w-2xl mx-auto leading-8">
            Explore our complete premium wholesale jewellery catalogue — rings, earrings, necklaces, bangles, bridal sets and more. All categories available in 18K and 22K gold.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919369895157"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-4 rounded-full text-sm inline-block"
            >
              Wholesale Enquiry →
            </a>
            <Link
              href="/live-rate"
              className="border border-[#C9A84C]/40 text-[#E8C97A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 px-8 py-4 rounded-full text-sm font-sans font-semibold transition-all duration-300"
            >
              Live Gold Rate
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-white border-b border-[#E8D8B8]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-5 grid grid-cols-4 gap-4 text-center">
          {[
            { num: "8", label: "Categories" },
            { num: "200+", label: "Designs" },
            { num: "18K & 22K", label: "Gold Purity" },
            { num: "Pan India", label: "Delivery" },
          ].map((s) => (
            <div key={s.num}>
              <p className="font-serif text-lg md:text-2xl text-[#C9A84C]">{s.num}</p>
              <p className="text-[9px] md:text-[10px] text-[#9A8870] font-sans uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-5 lg:px-10 mt-14">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-[1px] bg-[#C9A84C]" />
          <h2 className="font-serif text-2xl md:text-3xl text-[#2D2219]">Browse By Category</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-[#E8D8B8] hover:border-[#C9A84C]/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 md:h-64 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A06]/70 via-transparent to-transparent" />

                {/* Count badge */}
                <div className="absolute top-3 right-3 bg-[#C9A84C] text-[#0F0A06] text-[9px] font-bold font-sans px-3 py-1 rounded-full uppercase tracking-wider">
                  {cat.count}
                </div>

                {/* Category name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-2xl md:text-3xl text-white">{cat.name}</h3>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex items-center justify-between flex-grow">
                <p className="text-xs text-[#7A6650] font-sans leading-5 flex-1">{cat.desc}</p>
                <span className="ml-3 shrink-0 w-9 h-9 rounded-full border border-[#E8D8B8] flex items-center justify-center text-[#C9A84C] text-sm group-hover:bg-[#C9A84C] group-hover:text-[#0F0A06] group-hover:border-[#C9A84C] transition-all duration-300">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Enquiry Banner */}
      <section className="max-w-7xl mx-auto px-5 lg:px-10 mt-16">
        <div className="bg-[#0F0A06] rounded-3xl p-10 md:p-14 text-center border border-[#C9A84C]/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_#C9A84C_0%,_transparent_65%)]" />
          <div className="relative">
            <p className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold mb-4">
              Wholesale Partnership
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-5">
              Looking for Bulk Orders?
            </h2>
            <p className="text-[#8A7560] font-sans text-sm md:text-base leading-7 mb-8 max-w-xl mx-auto">
              Mahadev Ratnam offers exclusive wholesale pricing, custom catalogues and reliable Pan India delivery for jewellery retailers.
            </p>
            <a
              href="https://wa.me/919369895157?text=Hello%20Mahadev%20Ratnam%2C%20I%20want%20to%20enquire%20about%20wholesale%20jewellery%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-10 py-4 rounded-full text-sm inline-block"
            >
              Start Wholesale Enquiry →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}