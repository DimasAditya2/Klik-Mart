"use client";

import { useEffect, useState } from "react";
import { getWishlistType } from "@/types/wishlistType";
import DeleteWishList from "@/components/RemoveWishList";

export default function WishListCard() {
  const [wishlist, setWishlist] = useState<getWishlistType[]>([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`/api/wishlist`, {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }
      setWishlist(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {wishlist.map((item) => (
        <div
          key={item._id}
          className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {item.product && item.product.images && item.product.images.length > 0 && (
            <div className="relative w-full h-48">
              <img
                className="w-full h-full object-cover"
                src={item.product.images[0]}
                alt={`${item.product.name} image`}
              />
              <span className="absolute top-2 right-2 text-sm text-white bg-secondary rounded-full px-2 py-1">
                NEW
              </span>
            </div>
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 hover:underline">
              {item.product?.name}
            </h2>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {item.product?.description}
            </p>
            <div className="flex flex-wrap mt-4 mb-2">
              {item.product?.tags &&
                item.product.tags.length > 0 &&
                item.product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm text-gray-600 bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <div className="flex justify-end">
              <DeleteWishList id={item._id} onDelete={() => handleDelete(item._id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
