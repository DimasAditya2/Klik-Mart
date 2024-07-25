import { getProductBySlug } from "@/db/models/products";
import { NextRequest, NextResponse } from "next/server";
type ParamsSlug = {params: {slug: string}}

export async function GET(request: NextRequest, {params}: ParamsSlug) {
    const { searchParams } = new URL(request.url);
    
    // if (!slug) {
    //   return NextResponse.json(
    //     { message: "Slug parameter is required" },
    //     { status: 400 }
    //   );
    // }
  
    try {
      const product = await getProductBySlug(params.slug);
  
      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { product },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
  