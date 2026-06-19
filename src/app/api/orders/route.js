import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server-side supabase with service role to bypass RLS for admin reads
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET /api/orders?userId=xxx  — fetch all orders for a user
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ orders: data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/orders  — place a new order
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, cartItems, cartTotal, shippingAddress, notes } = body;

    if (!userId || !cartItems?.length) {
      return NextResponse.json({ error: "userId and cartItems required" }, { status: 400 });
    }

    // Generate a readable order number: MR-YYYYMMDD-XXXX
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randPart = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `MR-${datePart}-${randPart}`;

    // 1. Insert the order header
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        order_number: orderNumber,
        total_amount: cartTotal,
        status: "pending",
        shipping_address: shippingAddress || null,
        notes: notes || null,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert all order line items
    const lineItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      name: item.name,
      image: item.image,
      purity: item.purity,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
      slug: item.slug,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(lineItems);

    if (itemsError) throw itemsError;

    // 3. Clear the user's cart in Supabase after order is placed
    await supabase.from("cart_items").delete().eq("user_id", userId);

    return NextResponse.json({ success: true, order });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// PATCH /api/orders  — update order status (admin use)
export async function PATCH(request) {
  try {
    const { orderId, status } = await request.json();
    const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", orderId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, order: data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
