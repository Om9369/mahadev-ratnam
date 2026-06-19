"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { User, ShoppingBag, Heart, LogOut, Edit, Phone, Mail, Building, MapPin, Package, Clock, ChevronDown, ChevronUp } from "lucide-react";

const STATUS_STYLES = {
  pending:    { bg: "bg-yellow-50",  text: "text-yellow-700",  border: "border-yellow-200",  label: "Pending" },
  confirmed:  { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    label: "Confirmed" },
  processing: { bg: "bg-purple-50",  text: "text-purple-700",  border: "border-purple-200",  label: "Processing" },
  shipped:    { bg: "bg-indigo-50",  text: "text-indigo-700",  border: "border-indigo-200",  label: "Shipped" },
  delivered:  { bg: "bg-green-50",   text: "text-green-700",   border: "border-green-200",   label: "Delivered" },
  cancelled:  { bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200",     label: "Cancelled" },
};

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const style = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
  const date = new Date(order.created_at).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });

  return (
    <div className="bg-white rounded-2xl border border-[#E8D8B8] overflow-hidden">
      {/* Order Header */}
      <div className="p-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-1">Order</p>
          <p className="font-serif text-lg text-[#C9A84C]">{order.order_number}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#9A8870] font-sans flex items-center gap-1 justify-end mb-1">
            <Clock size={11} /> {date}
          </p>
          <p className="font-serif text-xl text-[#2D2219]">₹{Number(order.total_amount).toLocaleString("en-IN")}</p>
        </div>
        <span className={`text-[10px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
          {style.label}
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#9A8870] hover:text-[#2D2219] transition-colors"
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Order Items (collapsible) */}
      {expanded && (
        <div className="border-t border-[#F0E6D0] p-5 space-y-4 bg-[#FCF8F3]">
          {order.order_items?.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              {item.image && (
                <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#E8D8B8] flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-sans text-[#2D2219] font-medium truncate">{item.name}</p>
                <p className="text-[10px] text-[#C9A84C] uppercase tracking-wider font-sans font-semibold">{item.purity} Gold · Qty {item.quantity}</p>
              </div>
              <p className="font-serif text-sm text-[#2D2219] flex-shrink-0">₹{Number(item.total_price).toLocaleString("en-IN")}</p>
            </div>
          ))}
          {order.notes && (
            <p className="text-xs text-[#9A8870] font-sans pt-2 border-t border-[#E8D8B8]">Note: {order.notes}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const auth = useAuth();
  const cart = useCart();
  const wishlist = useWishlist();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState("details");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch orders when tab is selected or user changes
  useEffect(() => {
    if (activeTab === "orders" && auth.rawUser) {
      setOrdersLoading(true);
      fetch(`/api/orders?userId=${auth.rawUser.id}`)
        .then((r) => r.json())
        .then((d) => { setOrders(d.orders || []); })
        .catch(console.error)
        .finally(() => setOrdersLoading(false));
    }
  }, [activeTab, auth.rawUser]);

  if (auth.isLoading) {
    return (
      <main className="pt-36 min-h-screen bg-[#FCF8F3] flex items-center justify-center">
        <div className="text-[#C9A84C] text-2xl font-serif animate-pulse">Loading…</div>
      </main>
    );
  }

  if (!auth.user) {
    return (
      <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">
        <div className="max-w-md mx-auto px-5 lg:px-10">
          <div className="bg-white rounded-3xl p-8 border border-[#E8D8B8] text-center">
            <User className="mx-auto text-[#C9A84C] mb-6" size={48} />
            <h2 className="font-serif text-2xl text-[#2D2219] mb-4">Please Sign In</h2>
            <p className="text-[#7A6650] font-sans mb-8">Sign in to view your profile and manage your account</p>
            <Link href="/login" className="btn-gold px-8 py-3 rounded-full text-sm inline-block">Sign In</Link>
          </div>
        </div>
      </main>
    );
  }

  const handleEdit = () => {
    setEditData({
      name: auth.user.name, phone: auth.user.phone,
      company: auth.user.company || "", city: auth.user.city || "", state: auth.user.state || "",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await auth.updateProfile(editData);
    setIsSaving(false);
    setIsEditing(false);
  };

  const tabs = [
    { id: "details", label: "Account", icon: User },
    { id: "orders",  label: "My Orders", icon: Package },
    { id: "cart",    label: "Cart",      icon: ShoppingBag },
    { id: "wishlist",label: "Wishlist",  icon: Heart },
  ];

  return (
    <main className="pt-36 min-h-screen bg-[#FCF8F3] pb-20">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#C9A84C]" />
            <h1 className="font-serif text-3xl md:text-4xl text-[#2D2219]">My Account</h1>
          </div>
          <button
            onClick={auth.logout}
            className="flex items-center gap-2 text-red-500 text-sm font-semibold hover:text-red-700 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Profile Hero */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8D8B8] mb-6 flex items-center gap-5">
          <div className="w-16 h-16 bg-[#C9A84C]/20 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="text-[#C9A84C]" size={28} />
          </div>
          <div>
            <h2 className="font-serif text-xl text-[#2D2219]">{auth.user.name}</h2>
            <p className="text-sm text-[#9A8870] font-sans">{auth.user.email}</p>
            {auth.user.isWholesale && (
              <span className="inline-block mt-1 text-[10px] bg-[#C9A84C] text-[#0F0A06] px-3 py-0.5 rounded-full font-sans font-semibold">
                Wholesale Account
              </span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-[#E8D8B8] rounded-2xl p-1 mb-6 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-sans font-semibold transition-all whitespace-nowrap flex-1 justify-center ${
                activeTab === id
                  ? "bg-[#C9A84C] text-white shadow-sm"
                  : "text-[#7A6650] hover:text-[#2D2219] hover:bg-[#FCF8F3]"
              }`}
            >
              <Icon size={15} />
              {label}
              {id === "orders" && orders.length > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === id ? "bg-white/30 text-white" : "bg-[#C9A84C]/20 text-[#C9A84C]"}`}>
                  {orders.length}
                </span>
              )}
              {id === "cart" && cart.cartCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === id ? "bg-white/30 text-white" : "bg-[#C9A84C]/20 text-[#C9A84C]"}`}>
                  {cart.cartCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── TAB: Account Details ── */}
        {activeTab === "details" && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8D8B8]">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F0E6D0]">
              <h3 className="font-serif text-xl text-[#2D2219]">Account Details</h3>
              {!isEditing && (
                <button onClick={handleEdit} className="flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:text-[#2D2219] transition-colors">
                  <Edit size={14} /> Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                {[
                  { label: "Full Name", key: "name", type: "text" },
                  { label: "Phone", key: "phone", type: "tel" },
                  { label: "Company", key: "company", type: "text" },
                  { label: "City", key: "city", type: "text" },
                  { label: "State", key: "state", type: "text" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold mb-2">{label}</label>
                    <input
                      type={type}
                      value={editData[key] || ""}
                      onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E8D8B8] rounded-xl text-sm font-sans text-[#2D2219] focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} disabled={isSaving} className="flex-1 btn-gold py-3 rounded-full text-sm font-semibold disabled:opacity-60">
                    {isSaving ? "Saving…" : "Save Changes"}
                  </button>
                  <button onClick={() => setIsEditing(false)} className="flex-1 border border-[#E8D8B8] text-[#2D2219] py-3 rounded-full text-sm font-semibold hover:border-[#C9A84C] transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {[
                  { icon: User,     label: "Full Name", value: auth.user.name },
                  { icon: Mail,     label: "Email",     value: auth.user.email },
                  { icon: Phone,    label: "Phone",     value: auth.user.phone },
                  { icon: Building, label: "Company",   value: auth.user.company },
                  { icon: MapPin,   label: "Location",  value: [auth.user.city, auth.user.state].filter(Boolean).join(", ") },
                ].filter(({ value }) => value).map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FCF8F3] flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#9A8870] font-sans font-semibold">{label}</p>
                      <p className="text-sm text-[#2D2219] mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wholesale Benefits */}
            {auth.user.isWholesale && (
              <div className="bg-[#0F0A06] rounded-3xl p-6 mt-8">
                <h3 className="font-serif text-lg text-[#E8C97A] mb-4">Wholesale Benefits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Exclusive Pricing", desc: "Special wholesale rates" },
                    { label: "Bulk Discounts", desc: "Volume-based discounts" },
                    { label: "Priority Support", desc: "Dedicated account manager" },
                    { label: "Fast Delivery", desc: "Priority shipping" },
                  ].map((b) => (
                    <div key={b.label} className="bg-[#1A1008] rounded-xl p-4">
                      <p className="text-[#C9A84C] text-sm font-semibold font-sans">{b.label}</p>
                      <p className="text-[10px] text-[#8A7560] font-sans mt-1">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: Orders ── */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {ordersLoading ? (
              <div className="text-center py-16 text-[#C9A84C] font-serif text-lg animate-pulse">Loading orders…</div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-[#E8D8B8] text-center">
                <Package className="mx-auto text-[#C9A84C] mb-5" size={48} strokeWidth={1} />
                <h3 className="font-serif text-xl text-[#2D2219] mb-3">No orders yet</h3>
                <p className="text-[#7A6650] font-sans text-sm mb-6">Start shopping to see your orders here</p>
                <Link href="/products" className="btn-gold px-8 py-3 rounded-full text-sm inline-block">Browse Collections</Link>
              </div>
            ) : (
              orders.map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        )}

        {/* ── TAB: Cart ── */}
        {activeTab === "cart" && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8D8B8]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl text-[#2D2219]">Cart ({cart.cartCount} items)</h3>
              <Link href="/cart" className="text-sm text-[#C9A84C] font-semibold hover:underline">View Full Cart →</Link>
            </div>
            {cart.cart.length === 0 ? (
              <p className="text-[#7A6650] font-sans text-sm text-center py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.cart.map((item) => (
                  <div key={`${item.id}-${item.purity}`} className="flex items-center gap-4 p-4 bg-[#FCF8F3] rounded-xl">
                    {item.image && (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#E8D8B8] flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-sans text-[#2D2219] font-medium truncate">{item.name}</p>
                      <p className="text-[10px] text-[#C9A84C] uppercase tracking-wider font-sans font-semibold">{item.purity} · Qty {item.quantity}</p>
                    </div>
                    <p className="font-serif text-sm text-[#2D2219]">₹{Number(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
                <div className="border-t border-[#F0E6D0] pt-4 flex items-center justify-between">
                  <span className="font-sans font-semibold text-[#2D2219]">Total</span>
                  <span className="font-serif text-xl text-[#2D2219]">₹{cart.cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <Link href="/cart" className="block w-full btn-gold py-3 rounded-full text-sm font-semibold text-center">
                  Proceed to Checkout →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: Wishlist ── */}
        {activeTab === "wishlist" && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8D8B8]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl text-[#2D2219]">Wishlist ({wishlist.wishlistCount} items)</h3>
              <Link href="/wishlist" className="text-sm text-[#C9A84C] font-semibold hover:underline">View All →</Link>
            </div>
            {wishlist.wishlist.length === 0 ? (
              <p className="text-[#7A6650] font-sans text-sm text-center py-8">Your wishlist is empty</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {wishlist.wishlist.map((item) => (
                  <Link key={item.id} href={`/products/${item.slug}`} className="flex items-center gap-4 p-4 bg-[#FCF8F3] rounded-xl hover:border-[#C9A84C] border border-transparent transition-colors">
                    {item.image && (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#E8D8B8] flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-sans text-[#2D2219] font-medium truncate">{item.name}</p>
                      <p className="text-[10px] text-[#9A8870] font-sans uppercase tracking-wider">{item.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
