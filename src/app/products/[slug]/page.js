import Link from "next/link";
import Image from "next/image";
import { allProducts } from "@/data/allProducts";
import AddToCartButton from "@/components/AddToCartButton";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function mapDbProduct(p) {
  if (!p) return null;

  return {
    ...p,
    subCategory: p.sub_category ?? p.subCategory,
    price18k: p.price_18k ?? p.price18k,
    price22k: p.price_22k ?? p.price22k,
  };
}

async function getProductOrCategory(slug, sub) {
  try {
    const { data: dbProduct, error: productError } = await supabase
      .from("products")
      .select(
        "id,name,slug,category,sub_category,image,purity,weight,price_18k,price_22k,availability,description,featured"
      )
      .eq("slug", slug)
      .maybeSingle();

    if (!productError && dbProduct) {
      return {
        singleProduct: mapDbProduct(dbProduct),
        categoryProducts: [],
      };
    }

    let query = supabase
      .from("products")
      .select(
        "id,name,slug,category,sub_category,image,purity,weight,price_18k,price_22k,availability,featured"
      )
      .eq("category", slug)
      .order("created_at", { ascending: false });

    if (sub) {
      query = query.eq("sub_category", sub);
    }

    const { data: dbProducts, error: categoryError } = await query;

    if (!categoryError && dbProducts?.length > 0) {
      return {
        singleProduct: null,
        categoryProducts: dbProducts.map(mapDbProduct),
      };
    }
  } catch (error) {
    console.error("Supabase fetch error:", error);
  }

  const fallback = allProducts.find((p) => p.slug === slug);

  if (fallback) {
    return {
      singleProduct: fallback,
      categoryProducts: [],
    };
  }

  let fallbackCat = allProducts.filter((p) => p.category === slug);

  if (sub) {
    fallbackCat = fallbackCat.filter((p) => p.subCategory === sub);
  }

  return {
    singleProduct: null,
    categoryProducts: fallbackCat,
  };
}

export default async function ProductPage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const sub = resolvedSearchParams?.sub;

  const { singleProduct, categoryProducts } = await getProductOrCategory(slug, sub);

  /* ── SINGLE PRODUCT PAGE ─────────────────────────────── */
  if (singleProduct) {
    const purityArray = Array.isArray(singleProduct.purity)
      ? singleProduct.purity
      : typeof singleProduct.purity === "string"
      ? singleProduct.purity.split(",").map((p) => p.trim()).filter(Boolean)
      : ["18K", "22K"];

    return (
      <main className="pt-28 min-h-screen bg-[#FCF8F3] pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-8">
          <nav className="flex items-center gap-2 text-xs font-sans text-[#9A8870]">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/products" className="hover:text-[#C9A84C] transition-colors">Collections</Link>
            <span>›</span>
            <Link href={`/products/${singleProduct.category}`} className="capitalize hover:text-[#C9A84C] transition-colors">
              {singleProduct.category}
            </Link>
            <span>›</span>
            <span className="text-[#2D2219] font-medium truncate max-w-[180px]">{singleProduct.name}</span>
          </nav>
        </div>

        <section className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#C9A84C]/40 rounded-tl-2xl z-10" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#C9A84C]/40 rounded-br-2xl z-10" />

              <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E8D8B8] shadow-xl">
                <Image
                  src={singleProduct.image}
                  alt={singleProduct.name}
                  width={800}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-[420px] md:h-[560px] object-cover"
                  priority
                />

                {singleProduct.availability === "Out of Stock" && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full font-sans">
                    Out of Stock
                  </div>
                )}

                {singleProduct.featured && (
                  <div className="absolute top-4 right-4 bg-[#C9A84C] text-[#0F0A06] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full font-sans">
                    ⭐ Featured
                  </div>
                )}
              </div>
            </div>

            <div className="lg:pt-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-[1px] bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
                  {singleProduct.subCategory}
                </span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-[#2D2219] leading-tight">
                {singleProduct.name}
              </h1>

              <p className="mt-5 text-[#7A6650] font-sans text-sm md:text-base leading-8">
                {singleProduct.description || "Premium gold jewellery design by Mahadev Ratnam — crafted with tradition, elegance and superior purity for discerning retailers and wholesale buyers."}
              </p>

              <div className="mt-8 bg-white border border-[#E8D8B8] rounded-2xl p-6 space-y-4 shadow-sm">
                <h3 className="font-serif text-lg text-[#2D2219] border-b border-[#F0E6D0] pb-3 mb-4">
                  Product Details
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">Weight</span>
                  <span className="font-sans text-sm font-semibold text-[#2D2219]">{singleProduct.weight || "As per design"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">Availability</span>
                  <span className={`text-xs font-bold font-sans px-3 py-1 rounded-full ${
                    singleProduct.availability === "Available"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-600 border border-red-200"
                  }`}>
                    {singleProduct.availability || "Available"}
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
              </div>

              {(singleProduct.price18k || singleProduct.price22k) && (
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {singleProduct.price18k && (
                    <div className="bg-[#0F0A06] rounded-2xl p-5 text-center border border-[#C9A84C]/20">
                      <p className="text-[10px] text-[#C9A84C] tracking-[3px] uppercase font-sans font-semibold">18K Gold</p>
                      <p className="font-serif text-2xl text-white mt-2">
                        ₹{Number(singleProduct.price18k).toLocaleString("en-IN")}
                      </p>
                    </div>
                  )}

                  {singleProduct.price22k && (
                    <div className="bg-[#C9A84C] rounded-2xl p-5 text-center">
                      <p className="text-[10px] text-[#0F0A06] tracking-[3px] uppercase font-sans font-semibold">22K Gold</p>
                      <p className="font-serif text-2xl text-[#0F0A06] mt-2">
                        ₹{Number(singleProduct.price22k).toLocaleString("en-IN")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <p className="mt-3 text-[10px] text-[#9A8870] font-sans text-center italic">
                * Prices may vary based on live gold rate, weight and making charges.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <AddToCartButton product={singleProduct} />

                <a
                  href={`https://wa.me/919369895157?text=Hello%20Mahadev%20Ratnam%2C%20I%20want%20to%20enquire%20about%20${encodeURIComponent(singleProduct.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-gold text-center py-4 rounded-full text-sm"
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
      </main>
    );
  }

  /* ── CATEGORY PAGE ───────────────────────────────────── */
  if (categoryProducts.length > 0) {
    return (
      <main className="pt-28 min-h-screen bg-[#FCF8F3] pb-20">
        <section className="relative bg-[#0F0A06] py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_#C9A84C_0%,_transparent_70%)]" />

          <div className="relative max-w-7xl mx-auto px-5 lg:px-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-[#C9A84C]/50" />
              <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold">Premium Collection</span>
              <div className="w-10 h-[1px] bg-[#C9A84C]/50" />
            </div>

            <h1 className="font-serif text-4xl md:text-6xl text-white capitalize">
              {sub || `${slug} Collection`}
            </h1>

            <p className="mt-5 text-[#8A7560] font-sans text-sm md:text-base max-w-xl mx-auto leading-7">
              Explore premium wholesale {sub || slug} jewellery designs crafted exclusively by Mahadev Ratnam.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 text-xs text-[#C9A84C] font-sans">
              <Link href="/" className="hover:underline">Home</Link>
              <span>›</span>
              <Link href="/products" className="hover:underline">Collections</Link>
              <span>›</span>
              <span className="text-[#E8C97A] capitalize">{sub || slug}</span>
            </div>
          </div>
        </section>

        <div className="border-b border-[#E8D8B8] bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex items-center justify-between">
            <p className="text-sm font-sans text-[#7A6650]">
              <span className="font-bold text-[#2D2219]">{categoryProducts.length}</span> designs found
            </p>

            <Link
              href="https://wa.me/919369895157"
              target="_blank"
              className="text-[10px] bg-[#C9A84C] text-[#0F0A06] font-bold font-sans px-4 py-2 rounded-full hover:bg-[#E8C97A] transition-colors uppercase tracking-wider"
            >
              Bulk Enquiry
            </Link>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-5 lg:px-10 mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categoryProducts.map((product) => {
              const purityArray = Array.isArray(product.purity)
                ? product.purity
                : typeof product.purity === "string"
                ? product.purity.split(",").map((p) => p.trim()).filter(Boolean)
                : [];

              return (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.id || product.slug}
                  prefetch={false}
                  className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-[#E8D8B8] hover:border-[#C9A84C]/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={500}
                      sizes="(max-width: 768px) 50vw, 25vw"
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
        </section>

        <section className="max-w-4xl mx-auto mt-20 px-5 lg:px-10">
          <div className="bg-[#0F0A06] rounded-3xl p-8 md:p-12 text-center border border-[#C9A84C]/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_#C9A84C_0%,_transparent_70%)]" />

            <div className="relative">
              <p className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-sans font-semibold mb-4">Wholesale Enquiry</p>

              <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Interested in Bulk Orders?
              </h3>

              <p className="text-[#8A7560] font-sans text-sm mb-8 max-w-md mx-auto leading-7">
                Connect directly on WhatsApp for custom catalogues, bulk pricing and exclusive wholesale deals.
              </p>

              <a
                href={`https://wa.me/919369895157?text=Hello%2C%20I%20want%20to%20enquire%20about%20${encodeURIComponent(slug)}%20jewellery%20collection.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-10 py-4 rounded-full text-sm inline-block"
              >
                WhatsApp Enquiry →
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 bg-[#FCF8F3] flex items-center justify-center">
      <div className="text-center px-5">
        <div className="text-6xl mb-6 text-[#C9A84C]">✦</div>

        <h1 className="font-serif text-4xl md:text-5xl text-[#2D2219] mb-4">
          Product Not Found
        </h1>

        <p className="text-[#7A6650] font-sans text-sm mb-8 max-w-md mx-auto leading-7">
          The product or collection you are looking for is not available. Explore our full catalogue.
        </p>

        <Link
          href="/products"
          className="btn-gold px-8 py-4 rounded-full text-sm inline-block"
        >
          Back to Collections
        </Link>
      </div>
    </main>
  );
}