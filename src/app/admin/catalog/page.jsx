import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#fffaf3] pt-40 md:pt-44 px-4 md:px-6 pb-16">
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <Link href="/admin" className="text-[#b08a32] text-sm">
              ← Back to Admin
            </Link>

            <h1 className="mt-5 text-4xl md:text-5xl font-serif text-[#3D3127]">
              Product Catalog
            </h1>

            <p className="mt-3 text-gray-600">
              Products stored in MySQL database.
            </p>
          </div>

          <Link
            href="/admin/add-product"
            className="self-start bg-[#3D3127] text-white px-6 py-3 rounded-full"
          >
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="mt-10 bg-white border border-[#eadfcc] rounded-2xl p-8 text-center text-gray-500">
            No products found in database.
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#eadfcc] rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <p className="text-xs uppercase tracking-[2px] text-[#b08a32]">
                    {product.category}
                  </p>

                  <h2 className="mt-2 text-xl font-serif text-[#3D3127]">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.subCategory}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {product.availability}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button className="flex-1 border border-[#b08a32] text-[#b08a32] py-2 rounded-full text-sm">
                      Edit
                    </button>

                    <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-full text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}