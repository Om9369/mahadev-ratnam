import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3]">
      <section className="max-w-6xl mx-auto pt-44 md:pt-48 px-4 md:px-6 pb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[#3D3127]">
          Mahadev Ratnam Admin Panel
        </h1>

        <p className="mt-4 text-gray-600">
          Manage jewellery products, categories and enquiries.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          
          {/* Add Product */}
          <Link
            href="/admin/add-product"
            className="bg-white border border-[#eadfcc] rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-serif text-[#b08a32]">
              Add Product
            </h2>

            <p className="mt-3 text-gray-600 text-sm">
              Add new jewellery designs.
            </p>
          </Link>

          {/* Product Catalog */}
          <Link
            href="/admin/catalog"
            className="bg-white border border-[#eadfcc] rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-serif text-[#b08a32]">
              Product Catalog
            </h2>

            <p className="mt-3 text-gray-600 text-sm">
              View, edit and manage jewellery products.
            </p>
          </Link>

          {/* Categories */}
          <Link
            href="/admin/categories"
            className="bg-white border border-[#eadfcc] rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-serif text-[#b08a32]">
              Manage Categories
            </h2>

            <p className="mt-3 text-gray-600 text-sm">
              View and manage product categories.
            </p>
          </Link>

          {/* Enquiries */}
          <Link
            href="/admin/enquiries"
            className="bg-white border border-[#eadfcc] rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-serif text-[#b08a32]">
              Customer Enquiries
            </h2>

            <p className="mt-3 text-gray-600 text-sm">
              Manage WhatsApp and customer enquiries.
            </p>
          </Link>

          {/* Settings */}
          <Link
            href="/admin/settings"
            className="bg-white border border-[#eadfcc] rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-serif text-[#b08a32]">
              Website Settings
            </h2>

            <p className="mt-3 text-gray-600 text-sm">
              Manage banners, rates and website content.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}