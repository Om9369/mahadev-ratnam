import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, products });
}

export async function POST(req) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name.trim(),
        slug: body.slug.trim(),
        category: body.category.trim(),
        subCategory: body.subCategory.trim(),
        image: body.image.trim(),
        purity: body.purity?.trim() || null,
        weight: body.weight?.trim() || null,
        price18k: body.price18k ? Number(body.price18k) : null,
        price22k: body.price22k ? Number(body.price22k) : null,
        availability: body.availability || "Available",
        description: body.description?.trim() || null,
        featured: false,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}