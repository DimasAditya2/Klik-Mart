import { ObjectId } from "mongodb";
import { getDb } from "@/db/config";

const COLLECTION_NAME = 'wishlist';

export const addWishList = async (userId: string, productId: string ) => {
  const db = await getDb();

  const existingWishlist = await db.collection(COLLECTION_NAME).findOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId)
  });

  if (existingWishlist) {
    return { message: "Product is already in the wishlist" };
  }

  const newWishlist = {
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    createdAt: new Date(),
    updatedAt: new Date()
  };

 const data = await db.collection(COLLECTION_NAME).insertOne(newWishlist);

  return data;
}

export const getWishlistByUserId = async (userId: string) => {
  const db = await getDb();

  const wishlists = await db.collection(COLLECTION_NAME).aggregate([
    { $match: { userId: new ObjectId(userId) } },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product_wishlists"
      }
    },
    { $unwind: "$product_wishlists" },
    {
      $project: {
        _id: 1,
        userId: 1,
        product: {
          _id: "$product_wishlists._id",
          name: "$product_wishlists.name",
          slug: "$product_wishlists.slug",
          description: "$product_wishlists.description",
          excerpt: "$product_wishlists.excerpt",
          price: "$product_wishlists.price",
          tags: "$product_wishlists.tags",
          thumbnail: "$product_wishlists.thumbnail",
          images: "$product_wishlists.images",
          createdAt: "$product_wishlists.createdAt",
          updatedAt: "$product_wishlists.updatedAt",
        },
        createdAt: 1,
        updatedAt: 1
      }
    }
  ]).toArray();

  return wishlists;
}
