import { getAllProducts } from "@/db/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    const { products, totalProducts } = await getAllProducts(page, pageSize);

    return NextResponse.json(
      {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
