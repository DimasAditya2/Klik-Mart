import React from "react";
import AddWishList from "./AddWishList";
import { TypeProducts } from "@/types/ProductType";
import FormatCurrency from "@/helpers/FormatRupiah";

export function ProductCard({ product }: { product: TypeProducts }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full bg-slate-700">
        <a href={`/products/${product.slug}`}>
          <img
            className="mx-auto hidden h-full w-full dark:block object-cover rounded-md"
            src={product.thumbnail}
            alt={product.name}
          />
        </a>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
            Up to 35% off
          </span>
          <div className="flex items-center justify-end gap-1"></div>
        </div>
        <p className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
          {product.name}
        </p>
        <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {product.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-md font-bold leading-tight text-gray-900 dark:text-white">
            {FormatCurrency(product.price)}
          </p>
          <AddWishList productId={product._id} />
        </div>
      </div>
    </div>
  );
}
