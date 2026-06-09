"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    subCategory: "",
    image: "",
    purity: "",
    weight: "",
    price18k: "",
    price22k: "",
    availability: "Available",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Product added successfully!");

        setForm({
          name: "",
          slug: "",
          category: "",
          subCategory: "",
          image: "",
          purity: "",
          weight: "",
          price18k: "",
          price22k: "",
          availability: "Available",
          description: "",
        });
      } else {
        alert(data.error || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf3] pt-40 md:pt-44 px-4 md:px-6 pb-16">
      <section className="max-w-5xl mx-auto">
        <Link href="/admin" className="text-[#b08a32] text-sm">
          ← Back to Admin
        </Link>

        <div className="mt-6 bg-white border border-[#eadfcc] rounded-3xl p-5 md:p-8 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3D3127]">
            Add New Product
          </h1>

          <p className="mt-3 text-gray-600">
            Fill product details for Mahadev Ratnam catalogue.
          </p>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5 mt-8">
            {Object.keys(form).map((field) => (
              <input
                key={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={field}
                className="border border-[#eadfcc] rounded-xl px-4 py-3 outline-none focus:border-[#b08a32]"
              />
            ))}

            <button
              type="submit"
              className="md:col-span-2 bg-[#3D3127] text-white py-4 rounded-full"
            >
              Save Product
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}