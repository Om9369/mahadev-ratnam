"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/categories";
import { allProducts } from "@/data/allProducts";

const newArrivals = allProducts.slice(0, 8);

const bestSellers = Object.entries(products);

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-[#fffaf3] text-[#3D3127]">
        {/* HERO */}
<section className="pt-42 pb-20 px-6 bg-[#fffaf3]">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div>
      <p className="uppercase tracking-[5px] text-xs text-[#b08a32] mb-5">
        Mahadev Ratnam Jewellery
      </p>

      <h1 className="text-5xl md:text-7xl font-serif leading-tight text-[#3D3127]">
        Crafted For Generations. Designed For Royalty.
      </h1>

      <p className="mt-6 text-gray-600 text-lg leading-8">
        Discover premium gold jewellery collections crafted with tradition,
        luxury and trust for retailers and wholesale buyers.
      </p>

      <div className="mt-10 flex gap-4 flex-wrap">
        <a
          href="#collections"
          className="bg-[#3D3127] text-white px-8 py-4 rounded-full"
        >
          Explore Collection
        </a>

        <a
          href="https://wa.me/919369895157"
          target="_blank"
          className="border border-[#3D3127] px-8 py-4 rounded-full"
        >
          WhatsApp Enquiry
        </a>
      </div>
    </div>

    <div className="border border-[#c9a24d] rounded-t-full overflow-hidden">
      <img
        src="/images/hero-main.jpg"
        alt="Mahadev Ratnam Jewellery"
        className="w-full h-[600px] object-cover block"
      />
    </div>
  </div>
</section>
       {/* FEATURED COLLECTIONS */}
<section className="relative py-24 px-6 bg-[#120b08] overflow-hidden">
  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,#d4af37,transparent_35%)]"></div>

  <div className="relative max-w-7xl mx-auto">
    <div className="text-center mb-14">
      <p className="uppercase tracking-[5px] text-xs text-[#d4af37] mb-4">
        Premium Jewellery Categories
      </p>

      <h2 className="text-4xl md:text-6xl font-serif text-white">
        Featured Collections
      </h2>

      <p className="mt-5 text-[#c9b8a2] max-w-2xl mx-auto">
        Explore our most elegant jewellery categories crafted for premium wholesale buyers.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
      {[
        {
          title: "Rings",
          image: "/rings/ladies-ring-1.jpeg",
          link: "/products/rings",
        },
        {
          title: "Bridal",
          image: "/bridal/bridal-necklace-1.jpeg",
          link: "/products/bridal",
        },
        {
          title: "Necklaces",
          image: "/necklaces/butterfly-necklace-1.jpeg",
          link: "/products/necklaces",
        },
        {
          title: "Bangles",
          image: "/bangles/designer-bangle-1.jpeg",
          link: "/products/bangles",
        },
      ].map((item) => (
        <Link
          key={item.title}
          href={item.link}
          className="group relative block rounded-[2rem] border border-[#d4af37]/40 bg-[#1d120d] p-3 shadow-2xl overflow-hidden"
        >
          <div className="relative h-[390px] overflow-hidden rounded-[1.5rem]">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="absolute top-4 right-4 h-10 w-10 rounded-full border border-[#d4af37]/70 flex items-center justify-center text-[#d4af37] bg-black/30">
              ✦
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-xs uppercase tracking-[3px] text-[#d4af37] mb-2">
                Explore Collection
              </p>

              <h3 className="text-3xl font-serif text-white">
                {item.title}
              </h3>

              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-5 py-2 text-sm text-[#120b08] font-medium">
                View Designs →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>
{/* NEW ARRIVALS CAROUSEL */}
<section className="py-16 md:py-24 px-4 md:px-6 bg-[#fffaf3] overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-10 md:mb-14">
      <p className="uppercase tracking-[4px] text-[10px] md:text-xs text-[#b08a32] mb-4">
        Latest Jewellery Designs
      </p>

      <h2 className="text-4xl md:text-6xl font-serif text-[#3D3127]">
        New Arrivals
      </h2>

      <p className="mt-4 md:mt-5 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
        Freshly added premium jewellery designs for retailers and wholesale buyers.
      </p>
    </div>

    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 md:w-24 bg-gradient-to-r from-[#fffaf3] to-transparent"></div>
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 md:w-24 bg-gradient-to-l from-[#fffaf3] to-transparent"></div>

      <motion.div
        className="flex gap-4 md:gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 75,
          ease: "linear",
        }}
      >
        {[...newArrivals, ...newArrivals].map((product, index) => (
          <Link
            key={`${product.id}-${index}`}
            href={`/products/${product.slug}`}
            className="group min-w-[220px] sm:min-w-[260px] md:min-w-[320px] bg-white rounded-3xl overflow-hidden border border-[#eadfcc] shadow-sm hover:shadow-2xl transition"
          >
            <div className="relative h-[260px] sm:h-[310px] md:h-[360px] overflow-hidden bg-[#f5ead9]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#120b08]/80 text-[#d4af37] text-[10px] md:text-xs px-3 md:px-4 py-2 rounded-full">
                New Arrival
              </div>
            </div>

            <div className="p-4 md:p-6">
              <p className="text-[10px] md:text-xs uppercase tracking-[2px] text-[#b08a32] line-clamp-1">
                {product.subCategory}
              </p>

              <h3 className="mt-2 text-xl md:text-2xl font-serif text-[#3D3127] line-clamp-1">
                {product.name}
              </h3>

              <span className="inline-block mt-4 md:mt-5 text-sm md:text-base text-[#b08a32] font-medium">
                View Details →
              </span>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  </div>
</section>
        {/* BEST SELLER */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-[#b08a32]">
                  Best Seller
                </h2>

                <p className="mt-4 text-gray-600 max-w-2xl">
                  Explore our most loved jewellery designs crafted for elegance,
                  trust and wholesale excellence.
                </p>
              </div>

              <a
                href="#collections"
                className="self-start border border-[#3D3127] px-6 py-3 rounded-full text-sm"
              >
                Discover Full Collection →
              </a>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {bestSellers.map(([slug, item], index) => (
                <div
  key={slug}
  className="bg-white border border-[#eadfcc] p-3 group"
>
                  <Link href={`/products/${slug}`}>
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                      />
                    </div>

                    <h3 className="mt-4 text-xl font-serif">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </Link>

                  <a
                    href="https://wa.me/919369895157"
                    target="_blank"
                    className="inline-block mt-4 text-sm text-[#b08a32]"
                  >
                    Enquire →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN SECTION */}
        <section id="about" className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
            <img
              src="/images/bridal-collection.jpg"
              alt="Design"
              className="w-full h-[520px] object-cover"
            />

            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#b08a32]">
                Designs Beyond Imagination
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                At Mahadev Ratnam, we redefine elegance with jewellery that
                blends Indian tradition with modern artistry.
              </p>

              <ul className="mt-8 space-y-4 text-gray-700">
                <li>1. Unique craftsmanship for premium jewellery retailers.</li>
                <li>2. Modern and traditional collections for every occasion.</li>
                <li>3. Wholesale-focused designs with direct enquiry support.</li>
              </ul>

              <a
                href="https://wa.me/919369895157"
                target="_blank"
                className="inline-block mt-8 border-b border-[#3D3127]"
              >
                Discover Extraordinary Designs →
              </a>
            </div>
          </div>
        </section>

        {/* SHOP BY CATEGORY */}
        <section id="collections" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-[#b08a32] mb-12">
              Shop by Category
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {Object.entries(products).map(([slug, product]) => (
                <Link
                  key={slug}
                  href={`/products/${slug}`}
                  className="group bg-white border border-[#d8c5a3] overflow-hidden rounded-t-full text-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-80 w-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="p-8">
                    <h3 className="text-3xl font-serif text-[#b08a32]">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-gray-600">{product.category}</p>

                    <span className="inline-block mt-6 border border-[#b08a32] px-6 py-2 rounded-full text-sm">
                      Explore →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
<section className="py-24 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <p className="uppercase tracking-[4px] text-xs text-[#b08a32] text-center mb-4">
      Our Promise
    </p>

    <h2 className="text-4xl md:text-5xl font-serif text-[#3D3127] text-center">
      Why Choose Us?
    </h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
      {[
        {
          title: "BIS Hallmarked Jewellery",
          desc: "Purity-focused jewellery crafted for trusted wholesale business.",
        },
        {
          title: "Pan India Wholesale Supply",
          desc: "Reliable jewellery supply support for retailers across India.",
        },
        {
          title: "Premium Craftsmanship",
          desc: "Elegant designs made with traditional and modern artistry.",
        },
        {
          title: "Trusted by Retailers",
          desc: "Built for long-term wholesale relationships and repeat buyers.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="group bg-[#fffaf3] border border-[#eadfcc] p-8 min-h-[230px] rounded-2xl text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-500"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white border border-[#d8c5a3] text-[#b08a32] text-3xl group-hover:bg-[#3D3127] group-hover:text-white transition duration-500">
            ✦
          </div>

          <h3 className="font-serif text-2xl text-[#3D3127]">
            {item.title}
          </h3>

          <p className="mt-4 text-gray-600 leading-7 text-sm">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

                {/* SEO CONTENT */}
<section className="py-20 px-6 bg-[#fffaf3]">
  <div className="max-w-5xl mx-auto text-center">
    <p className="uppercase tracking-[4px] text-xs text-[#b08a32] mb-5">
      Wholesale Jewellery Excellence
    </p>

    <h2 className="text-4xl md:text-5xl font-serif text-[#3D3127] mb-6">
      Premium Gold Jewellery Wholesaler in India
    </h2>

    <p className="text-gray-600 leading-8 text-lg">
      Mahadev Ratnam is a trusted gold jewellery wholesaler based in India,
      offering premium rings, earrings, necklaces and bridal jewellery
      collections for retailers and jewellery businesses. Our designs combine
      traditional craftsmanship with modern elegance, ensuring exceptional
      quality, purity and customer satisfaction.
    </p>
  </div>
</section>
        {/* CTA */}
<section className="py-24 px-6 bg-[#fff7ea] text-center border-y border-[#e5c98a]">
  <h2 className="text-4xl md:text-5xl font-serif text-[#3D3127]">
    Never Miss A Moment Of Luxury
  </h2>

  <p className="mt-5 text-[#6b5b4a]">
    Connect with us for latest catalogues, pricing and designs.
  </p>

  <a
    href="https://wa.me/919369895157"
    target="_blank"
    className="inline-block mt-8 bg-gradient-to-r from-[#b08a32] to-[#d4af37] text-white px-9 py-4 rounded-full shadow-lg"
  >
    WhatsApp Enquiry
  </a>
</section>

{/* FOOTER */}
<footer id="contact" className="bg-[#fffaf3] text-[#3D3127] px-6">
  <div className="max-w-7xl mx-auto py-16 grid md:grid-cols-4 gap-10">

    <div>
      <h2 className="text-3xl font-serif text-[#b08a32]">
        Mahadev Ratnam
      </h2>
      <div className="w-10 h-[1px] bg-[#b08a32] mt-3 mb-5"></div>
      <p className="text-gray-600 leading-7">
        Premium Gold Jewellery Wholesaler offering elegant, traditional and
        modern jewellery collections for retailers.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-serif text-[#b08a32] mb-4">
        Quick Links
      </h3>
      <ul className="space-y-3 text-gray-600">
        <li><a href="#" className="hover:text-[#b08a32]">Home</a></li>
        <li><a href="#collections" className="hover:text-[#b08a32]">Collections</a></li>
        <li><a href="#about" className="hover:text-[#b08a32]">About</a></li>
        <li><a href="/live-rate" className="hover:text-[#b08a32]">Live Gold Rate</a></li>
        <li><a href="#contact" className="hover:text-[#b08a32]">Contact</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-serif text-[#b08a32] mb-4">
        Contact
      </h3>
      <div className="space-y-3 text-gray-600">
        <p>Phone: +91 9369895157</p>
        <p>WhatsApp: +91 9369895157</p>
        <p>Email: your-email@gmail.com</p>
        <p>Lucknow, Uttar Pradesh, India</p>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-serif text-[#b08a32] mb-4">
        Business Info
      </h3>
      <div className="space-y-3 text-gray-600">
        <p>Gold Jewellery Wholesaler</p>
        <p>Pan India Wholesale Supply</p>
        <p>Custom Orders Available</p>
        <p>Mon - Sat: 10 AM - 7 PM</p>
      </div>
    </div>

  </div>

  <div className="border-t border-[#e5c98a] py-6 text-center text-gray-600 text-sm">
    © 2026 Mahadev Ratnam. All Rights Reserved.
  </div>
</footer>
      </main>
    </>
  );
}