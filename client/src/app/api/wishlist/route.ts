import { NextRequest, NextResponse } from 'next/server';
import { addWishList, getWishlistByUserId } from '@/db/models/wishlist';
import { ObjectId } from 'mongodb';
import { getDb } from '@/db/config';
import { NextApiResponse } from 'next';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    console.log(request.headers.get('x-user-id'), '<---');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    const wishlists = await getWishlistByUserId(userId);

    return NextResponse.json(wishlists);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
  }
}



export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body;
    const userId = request.headers.get('x-user-id');
    console.log(userId, '<=== user id');
    
    

    if (typeof userId !== 'string' || typeof productId !== 'string') {
      return NextResponse.json({ message: 'Invalid userId or productId' }, { status: 400 });
    }

    const db = await getDb();

    const existingWishlist = await db.collection('wishlist').findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (existingWishlist) {
      return NextResponse.json({ message: "Product is already in the wishlist" }, { status: 400 });
    }

    const newWishlist = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('wishlist').insertOne(newWishlist);

    return NextResponse.json({ message: 'Product added to wishlist' }, { status: 201 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Wishlist ID is required" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("wishlist").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Wishlist item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Wishlist item deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};