import { ObjectId } from "mongodb";

export interface wishlist {
  _id: string;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


export interface getWishlistType {
  _id: string;
  product: {
    name: string;
    description: string;
    tags: string[];
    images: string[];
  };
}