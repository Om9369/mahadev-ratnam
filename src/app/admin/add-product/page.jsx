"use client";

import { useState, useEffect } from "react";
import AdminProtected from "@/components/AdminProtected";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "rings",
    subCategory: "",
    image: "",
    purity: "18K, 22K",
    weight: "",
    price18k: "",
    price22k: "",
    availability: "Available",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from name
  useEffect(() => {
    const generatedSlug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // remove non-word chars
      .replace(/[\s_-]+/g, "-") // replace spaces/underscores with single hyphen
      .replace(/^-+|-+$/g, ""); // trim hyphens
    setForm((prev) => ({ ...prev, slug: generatedSlug }));
  }, [form.name]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath = `products/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      alert(uploadError.message);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("product-images")
      .getPublicUrl(data.path);

    setForm((prev) => ({
      ...prev,
      image: publicData.publicUrl,
    }));

    alert("Image uploaded successfully!");
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Error uploading image: " + error.message);
  } finally {
    setUploading(false);
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.slug || !form.image) {
      alert("Please fill in Name, Slug and Upload an Image.");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Product added successfully!");
setMessageType("success");

setTimeout(() => {
  setMessage("");
  setMessageType("");
}, 3000);
        setForm({
          name: "",
          slug: "",
          category: "rings",
          subCategory: "",
          image: "",
          purity: "18K, 22K",
          weight: "",
          price18k: "",
          price22k: "",
          availability: "Available",
          description: "",
        });
      } else {
        setMessage(data.error || "Failed to add product");
setMessageType("error");
      }
    } catch (error) {
      console.error(error);
     setMessage("Something went wrong. Please try again.");
setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
  <AdminProtected>
    <main className="min-h-screen bg-[#fffaf3] pt-32 md:pt-40 px-4 md:px-6 pb-16">
      <section className="max-w-6xl mx-auto">
        <Link href="/admin" className="text-[#b08a32] hover:underline text-sm font-medium">
          ← Back to Admin
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 mt-6">
          {/* Form Side */}
          <div className="lg:col-span-2 bg-white border border-[#eadfcc] rounded-3xl p-5 md:p-8 shadow-sm">
            <h1 className="text-3xl md:text-4xl font-serif text-[#3D3127]">
              Add New Product
            </h1>
            <p className="mt-2 text-gray-500 text-sm">
              Fill in details to update the live jewellery catalogue.
            </p>
          {message && (
  <div
    className={`mt-5 rounded-2xl px-5 py-4 text-sm font-semibold border ${
      messageType === "success"
        ? "bg-green-50 text-green-700 border-green-200"
        : "bg-red-50 text-red-700 border-red-200"
    }`}
  >
    {message}
  </div>
)}
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5 mt-6">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Product Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Ladies Gold Ring"
                  className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none focus:border-[#b08a32] text-sm"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Slug (Auto-generated)</label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="e.g. ladies-gold-ring"
                  className="border border-[#eadfcc] bg-gray-50 rounded-xl px-4 py-3 outline-none text-sm text-gray-500"
                  required
                  readOnly
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="border border-[#eadfcc] bg-white rounded-xl px-4 py-3 outline-none focus:border-[#b08a32] text-sm"
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
                  value={form.subCategory}
                  onChange={handleChange}
                  placeholder="e.g. Ladies Rings"
                  className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none focus:border-[#b08a32] text-sm"
                  required
                />
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="text-xs font-semibold text-gray-600 mb-1">Upload Product Image</label>
                <div className="border-2 border-dashed border-[#eadfcc] rounded-2xl p-6 text-center hover:border-[#b08a32] transition relative">
                  {uploading ? (
                    <div className="py-4 text-[#b08a32] text-sm font-medium">
                      Uploading to Supabase Storage...
                    </div>
                  ) : form.image ? (
                    <div className="flex flex-col items-center">
                      <img src={form.image} alt="Uploaded" className="h-24 w-24 object-cover rounded-xl border" />
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                        className="mt-2 text-xs text-red-500 font-semibold hover:underline"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Purity (Comma separated)</label>
                <input
                  name="purity"
                  value={form.purity}
                  onChange={handleChange}
                  placeholder="e.g. 18K, 22K"
                  className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none focus:border-[#b08a32] text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Weight</label>
                <input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="e.g. 4.5 gm approx"
                  className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none focus:border-[#b08a32] text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">18K Price (₹, optional)</label>
                <input
                  type="number"
                  name="price18k"
                  value={form.price18k}
                  onChange={handleChange}
                  placeholder="e.g. 28000"
                  className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none focus:border-[#b08a32] text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">22K Price (₹, optional)</label>
                <input
                  type="number"
                  name="price22k"
                  value={form.price22k}
                  onChange={handleChange}
                  placeholder="e.g. 34000"
                  className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none focus:border-[#b08a32] text-sm"
                />
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="text-xs font-semibold text-gray-600 mb-1">Availability</label>
                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  className="border border-[#eadfcc] bg-white rounded-xl px-4 py-3 outline-none focus:border-[#b08a32] text-sm"
                >
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Elegant gold jewellery design..."
                  rows="4"
                  className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none focus:border-[#b08a32] text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={saving || uploading}
                className={`sm:col-span-2 text-white py-4 rounded-full text-sm font-semibold transition mt-3 ${
                  saving || uploading ? "bg-gray-400 cursor-not-allowed" : "bg-[#3D3127] hover:bg-[#2c221a]"
                }`}
              >
                {saving ? "Saving Product..." : "Save Product"}
              </button>
            </form>
          </div>

          {/* Live Preview Side */}
          <div className="bg-white border border-[#eadfcc] rounded-3xl p-5 md:p-6 shadow-sm self-start">
            <h2 className="text-xl font-serif text-[#3D3127] mb-4">
              Live Catalogue Preview
            </h2>
            <div className="border border-[#eadfcc] rounded-2xl overflow-hidden shadow-sm bg-[#fffaf3]">
              <div className="h-56 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                {form.image ? (
                  <img src={form.image} alt={form.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xs">No image uploaded</span>
                )}
                {form.availability === "Out of Stock" && (
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
              <div className="p-4 bg-white">
                <p className="text-[10px] uppercase tracking-wider text-[#b08a32] font-semibold">
                  {form.subCategory || "Subcategory Name"}
                </p>
                <h3 className="text-lg font-serif text-[#3D3127] mt-1 truncate">
                  {form.name || "Product Name"}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Purity: {form.purity || "18K, 22K"}
                </p>
                {form.weight && (
                  <p className="text-xs text-gray-500">
                    Weight: {form.weight}
                  </p>
                )}
                <div className="mt-3 flex justify-between items-center border-t border-gray-100 pt-3">
                  <div>
                    {form.price18k && (
                      <p className="text-[11px] text-gray-600">
                        18K: <span className="font-semibold text-gray-800">₹{Number(form.price18k).toLocaleString()}</span>
                      </p>
                    )}
                    {form.price22k && (
                      <p className="text-[11px] text-gray-600">
                        22K: <span className="font-semibold text-gray-800">₹{Number(form.price22k).toLocaleString()}</span>
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-[#b08a32] border border-[#b08a32] px-3 py-1 rounded-full">
                    View Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
     </AdminProtected>
  );
}