"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";

const bestSellers = Object.entries(products);

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-[#fffaf3] text-[#3D3127]">
        {/* HERO */}
<section className="pt-32 pb-20 px-6 bg-[#fffaf3]">
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