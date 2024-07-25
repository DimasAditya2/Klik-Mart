import { getDb } from "../config";
import { TypeProducts } from "@/types/ProductType";
const COLLECTION_USER = "products";

export const getAllProducts = async (page = 1, pageSize = 10): Promise<{ products: TypeProducts[], totalProducts: number }> => {
  try {
    const db = await getDb();
    const skip = (page - 1) * pageSize;
    const productsCursor = await db.collection(COLLECTION_USER).find().skip(skip).limit(pageSize);
    const totalProducts = await db.collection(COLLECTION_USER).countDocuments();
    
    const productsArray = await productsCursor.toArray();
    const mappedProducts: TypeProducts[] = productsArray.map((product) => ({
      _id: product._id.toString(),
      name: product.name,
      slug: product.slug,
      description: product.description,
      excerpt: product.excerpt,
      price: product.price,
      tags: product.tags,
      thumbnail: product.thumbnail,
      images: product.images,
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt),
    }));

    return { products: mappedProducts, totalProducts };
  } catch (error) {
    console.log(error);
    return { products: [], totalProducts: 0 };
  }
};

export const getProductBySlug = async (
  slug: string
): Promise<TypeProducts | null> => {
  try {
    const db = await getDb();
    const product = await db.collection(COLLECTION_USER).findOne({ slug });

    if (product) {
      const formattedProduct: TypeProducts = {
        _id: product._id.toString(),
        name: product.name,
        slug: product.slug,
        description: product.description,
        excerpt: product.excerpt,
        price: product.price,
        tags: product.tags,
        thumbnail: product.thumbnail,
        images: product.images,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
      return formattedProduct;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
