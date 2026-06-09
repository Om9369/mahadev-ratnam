"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (
      cleanEmail === "admin@mahadevratnam.com" &&
      cleanPassword === "admin123"
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin");
      return;
    }

    alert("Wrong email or password");
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] pt-44 md:pt-48 px-4 md:px-6 pb-16">
      <section className="max-w-md mx-auto bg-white border border-[#eadfcc] rounded-3xl p-6 md:p-8 shadow-sm">
        <h1 className="text-4xl font-serif text-[#3D3127] text-center">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#eadfcc] rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#eadfcc] rounded-xl px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#3D3127] text-white py-4 rounded-full"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Email: admin@mahadevratnam.com <br />
          Password: admin123
        </p>
      </section>
    </main>
  );
}