import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function mapDbProduct(p) {
  if (!p) return null;
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    subCategory: p.sub_category,
    image: p.image,
    purity: p.purity || [],
    weight: p.weight,
    price18k: p.price_18k,
    price22k: p.price_22k,
    availability: p.availability,
    description: p.description,
    featured: p.featured,
    createdAt: p.created_at,
  };
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const products = (data || []).map(mapDbProduct);
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("FETCH INVENTORY ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    let purityArray = [];
    if (body.purity) {
      if (Array.isArray(body.purity)) {
        purityArray = body.purity;
      } else if (typeof body.purity === "string") {
        purityArray = body.purity
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p.length > 0);
      }
    }

    const insertData = {
      name: body.name.trim(),
      slug: body.slug.trim(),
      category: body.category.trim(),
      sub_category: body.subCategory.trim(),
      image: body.image.trim(),
      purity: purityArray,
      weight: body.weight?.trim() || null,
      price_18k: body.price18k ? Number(body.price18k) : null,
      price_22k: body.price22k ? Number(body.price22k) : null,
      availability: body.availability || "Available",
      description: body.description?.trim() || null,
      featured: false,
    };

    const { data, error } = await supabase
      .from("products")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: mapDbProduct(data) });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    let purityArray = undefined;
    if (body.purity !== undefined) {
      if (Array.isArray(body.purity)) {
        purityArray = body.purity;
      } else if (typeof body.purity === "string") {
        purityArray = body.purity
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p.length > 0);
      }
    }

    const updateData = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.slug !== undefined) updateData.slug = body.slug.trim();
    if (body.category !== undefined) updateData.category = body.category.trim();
    if (body.subCategory !== undefined) updateData.sub_category = body.subCategory.trim();
    if (body.image !== undefined) updateData.image = body.image.trim();
    if (purityArray !== undefined) updateData.purity = purityArray;
    if (body.weight !== undefined) updateData.weight = body.weight?.trim() || null;
    if (body.price18k !== undefined) updateData.price_18k = body.price18k ? Number(body.price18k) : null;
    if (body.price22k !== undefined) updateData.price_22k = body.price22k ? Number(body.price22k) : null;
    if (body.availability !== undefined) updateData.availability = body.availability;
    if (body.description !== undefined) updateData.description = body.description?.trim() || null;
    if (body.featured !== undefined) updateData.featured = !!body.featured;

    const { data, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: mapDbProduct(data) });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}