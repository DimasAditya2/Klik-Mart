// src/pages/products/index.tsx
"use client";
import NavLink from "@/components/NavLink";
import SearchProducts from "@/components/search";
import { ProductCard } from "@/components/ProductCard";
import { TypeProducts } from "@/types/ProductType";
import { useEffect, useState, useRef, useCallback } from "react";
import Loading from "@/app/products/loading";

const pageSize = 3;

export default function Products() {
  const [products, setProducts] = useState<TypeProducts[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TypeProducts[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  async function getProducts(page: number): Promise<void> {
    try {
      setLoading(true);
      const res = await fetch(`/api/products?page=${page}&pageSize=${pageSize}`, {
        cache: 'no-cache'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await res.json();

      if (data && Array.isArray(data.products)) {
        setProducts(prevProducts => [...prevProducts, ...data.products]);
        setFilteredProducts(prevProducts => [...prevProducts, ...data.products]);
        setHasMore(data.products.length === pageSize); 
      } else {
        console.error('error fetch:', data);
        throw new Error('Invalid data format');
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts(page);
  }, [page]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  const lastProductElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setTimeout(() => {
          setPage(prevPage => prevPage + 1);
        }, 500); 
      }
    });
    if (node && hasMore) observer.current.observe(node);
  }, [hasMore, loading]);

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 min-h-screen md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <NavLink />
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Products
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <SearchProducts onSearch={setSearchQuery} />
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <div
              ref={filteredProducts.length === index + 1 ? lastProductElementRef : null}
              key={`${product._id}-${index}`}
            >
              <ProductCard product={product}  />
            </div>
          ))}
        </div>
        {loading && (
          <div className="text-center">
            <Loading />
          </div>
        )}
        {!hasMore && !loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            No more products to load.
          </p>
        )}
      </div>
    </section>
  );
}
