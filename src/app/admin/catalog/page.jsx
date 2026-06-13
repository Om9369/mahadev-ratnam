"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import AdminProtected from "@/components/AdminProtected";

const CATEGORIES = [
  { value: "rings", label: "Rings" },
  { value: "earrings", label: "Earrings" },
  { value: "chains", label: "Chains" },
  { value: "necklaces", label: "Necklaces" },
  { value: "pendants", label: "Pendants" },
  { value: "bangles", label: "Bangles" },
  { value: "bracelets", label: "Bracelets" },
  { value: "bridal", label: "Bridal Collection" },
];

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

const showToast = (type, text) => {
  setToast({ type, text });

  setTimeout(() => {
    setToast(null);
  }, 3000);
};

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/inventory");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      } else {
        console.error("Failed to fetch products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    try {
      const res = await fetch(`/api/inventory?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast("success", "Product deleted successfully!");
      } else {
        showToast("error", "Failed to delete product: " + data.error);
      }
    } catch (error) {
      console.error("Delete error:", error);
      showToast("error", "Something went wrong");
    }
  };

  const toggleFeatured = async (product) => {
    const newFeatured = !product.featured;
    try {
      // Optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, featured: newFeatured } : p))
      );

      const res = await fetch("/api/inventory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, featured: newFeatured }),
      });
      const data = await res.json();

      if (!data.success) {
        // Revert on failure
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, featured: product.featured } : p))
        );
        showToast("error", "Failed to update featured status: " + data.error);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Something went wrong while updating featured status.");
      // Revert on failure
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, featured: product.featured } : p))
      );
    }
  };

  const handleAvailabilityChange = async (product, newAvailability) => {
    try {
      // Optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, availability: newAvailability } : p))
      );

      const res = await fetch("/api/inventory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, availability: newAvailability }),
      });
      const data = await res.json();

      if (!data.success) {
        // Revert on failure
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, availability: product.availability } : p))
        );
        showToast("error", "Failed to update availability: " + data.error);
      }
    } catch (error) {
      console.error(error);
      // Revert on failure
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, availability: product.availability } : p))
      );
    }
  };

  const handleEditClick = (product) => {
    // Format purity back to string representation for input form
    const purityString = Array.isArray(product.purity)
      ? product.purity.join(", ")
      : product.purity || "";

    setEditingProduct({
      ...product,
      purity: purityString,
    });
  };

  const handleEditChange = (e) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  const handleEditImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      setEditingProduct((prev) => ({ ...prev, image: publicUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast("error", "Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editingProduct.name || !editingProduct.slug || !editingProduct.image) {
      showToast("error", "Please fill in Name, Slug and ensure image is uploaded.");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/inventory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });

      const data = await res.json();

      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === data.product.id ? data.product : p))
        );
        setEditingProduct(null);
        showToast("success", "Product updated successfully!");
      } else {
        showToast("error", data.error || "Failed to update product");
      }
    } catch (error) {
      console.error("Update error:", error);
      showToast("error", "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
  <AdminProtected>
    <main className="min-h-screen bg-[#fffaf3] pt-32 md:pt-40 px-4 md:px-6 pb-16">
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <Link href="/admin" className="text-[#b08a32] hover:underline text-sm font-medium">
              ← Back to Admin
            </Link>

            <h1 className="mt-3 text-4xl md:text-5xl font-serif text-[#3D3127]">
              Product Catalog
            </h1>

            <p className="mt-2 text-gray-600 text-sm">
              Live Jewellery catalog powered by Supabase.
            </p>
          </div>

          <Link
            href="/admin/add-product"
            className="self-start bg-[#3D3127] hover:bg-[#2c221a] text-white px-6 py-3.5 rounded-full text-sm font-semibold transition"
          >
            Add Product
          </Link>
        </div>

        {loading ? (
          <div className="mt-20 text-center py-10 text-gray-500">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-[#b08a32] border-t-transparent rounded-full mb-3"></div>
            <p className="text-sm">Loading product catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="mt-10 bg-white border border-[#eadfcc] rounded-2xl p-12 text-center text-gray-500">
            No products found in the Supabase database. Use "Add Product" or seed the database.
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#eadfcc] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                  />

                  {/* Featured Star Toggle */}
                  <button
                    onClick={() => toggleFeatured(product)}
                    className="absolute top-3 right-3 bg-white/95 text-xl p-1.5 rounded-full shadow hover:scale-105 transition"
                    title={product.featured ? "Unmark Featured" : "Mark Featured"}
                  >
                    {product.featured ? "⭐" : "☆"}
                  </button>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="text-xs uppercase tracking-[2px] text-[#b08a32] font-semibold">
                        {product.category}
                      </p>
                      <select
                        value={product.availability}
                        onChange={(e) => handleAvailabilityChange(product, e.target.value)}
                        className={`text-[10px] uppercase font-bold border rounded-full px-2 py-0.5 outline-none bg-white ${
                          product.availability === "Available"
                            ? "text-green-600 border-green-200"
                            : "text-red-600 border-red-200"
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>

                    <h2 className="mt-2 text-xl font-serif text-[#3D3127] line-clamp-1">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500 font-medium">
                      Sub: {product.subCategory || "None"}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Purity: {Array.isArray(product.purity) ? product.purity.join(", ") : product.purity}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="flex-1 border border-[#b08a32] text-[#b08a32] hover:bg-[#b08a32]/5 py-2.5 rounded-full text-xs font-semibold transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteProductId(product.id)}
                      className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2.5 rounded-full text-xs font-semibold transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Edit Modal overlay */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#eadfcc] rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl md:text-3xl font-serif text-[#3D3127] mb-5">
              Edit Product
            </h2>

            <form onSubmit={handleEditSubmit} className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Product Name</label>
                <input
                  name="name"
                  value={editingProduct.name}
                  onChange={handleEditChange}
                  className="border border-[#eadfcc] rounded-xl px-4 py-2 text-sm outline-none"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Slug</label>
                <input
                  name="slug"
                  value={editingProduct.slug}
                  onChange={handleEditChange}
                  className="border border-[#eadfcc] rounded-xl px-4 py-2 text-sm outline-none"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Category</label>
                <select
                  name="category"
                  value={editingProduct.category}
                  onChange={handleEditChange}
                  className="border border-[#eadfcc] bg-white rounded-xl px-4 py-2 text-sm outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Sub Category</label>
                <input
                  name="subCategory"
                  value={editingProduct.subCategory}
                  onChange={handleEditChange}
                  className="border border-[#eadfcc] rounded-xl px-4 py-2 text-sm outline-none"
                  required
                />
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="text-xs font-semibold text-gray-600 mb-1">Product Image</label>
                <div className="flex gap-4 items-center">
                  <img src={editingProduct.image} className="w-16 h-16 object-cover rounded-lg border border-[#eadfcc]" alt="Preview" />
                  <div className="flex-grow border border-dashed border-[#eadfcc] rounded-xl p-3 text-center relative hover:border-[#b08a32] transition">
                    {uploading ? (
                      <span className="text-xs text-[#b08a32]">Uploading...</span>
                    ) : (
                      <>
                        <span className="text-xs text-gray-500">Change image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Purity (Comma separated)</label>
                <input
                  name="purity"
                  value={editingProduct.purity}
                  onChange={handleEditChange}
                  className="border border-[#eadfcc] rounded-xl px-4 py-2 text-sm outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Weight</label>
                <input
                  name="weight"
                  value={editingProduct.weight}
                  onChange={handleEditChange}
                  className="border border-[#eadfcc] rounded-xl px-4 py-2 text-sm outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">18K Price (₹, optional)</label>
                <input
                  type="number"
                  name="price18k"
                  value={editingProduct.price18k || ""}
                  onChange={handleEditChange}
                  className="border border-[#eadfcc] rounded-xl px-4 py-2 text-sm outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">22K Price (₹, optional)</label>
                <input
                  type="number"
                  name="price22k"
                  value={editingProduct.price22k || ""}
                  onChange={handleEditChange}
                  className="border border-[#eadfcc] rounded-xl px-4 py-2 text-sm outline-none"
                />
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editingProduct.description || ""}
                  onChange={handleEditChange}
                  rows="3"
                  className="border border-[#eadfcc] rounded-xl px-4 py-2 text-sm outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 bg-[#3D3127] text-white py-3 rounded-full text-sm font-semibold hover:bg-[#2c221a] transition"
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteProductId && (
  <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4">
    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#eadfcc]">
      <h2 className="text-2xl font-serif text-[#3D3127]">Delete Product?</h2>
      <p className="mt-3 text-sm text-gray-600">
        Are you sure you want to delete this product? This action cannot be undone.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setDeleteProductId(null)}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full text-sm font-semibold"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            handleDelete(deleteProductId);
            setDeleteProductId(null);
          }}
          className="flex-1 bg-red-600 text-white py-3 rounded-full text-sm font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

{toast && (
  <div className="fixed top-24 right-5 z-[9999]">
    <div
      className={`rounded-2xl px-5 py-4 shadow-2xl border text-sm font-semibold ${
        toast.type === "success"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }`}
    >
      {toast.text}
    </div>
  </div>
)}
        </main>
  </AdminProtected>
  );
}