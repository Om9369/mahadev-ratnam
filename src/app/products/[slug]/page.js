import Link from "next/link";
import Image from "next/image";
import { allProducts } from "@/data/allProducts";
import AddToCartButton from "@/components/AddToCartButton";
import { supabase } from "@/lib/supabase";
import ProductDetailClient from "@/components/ProductDetailClient";

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
    // Fetch related products from the same category (excluding current product)
    const relatedProducts = allProducts
      .filter(p => p.category === singleProduct.category && p.slug !== singleProduct.slug)
      .slice(0, 4);

    return <ProductDetailClient product={singleProduct} relatedProducts={relatedProducts} />;
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