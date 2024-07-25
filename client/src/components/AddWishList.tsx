'use client'
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddWishList({ productId }: { productId: string }) {
  console.log(productId, "<< product id");
  
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddWishlist = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        throw new Error('Failed to add to wishlist');
      }

      setIsWishlisted(true);
      toast.success("Product added to wishlist");
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <ToastContainer />
      <button
        className={`flex items-center justify-between py-2 px-4 w-46 text-xs font-medium focus:outline-none rounded-lg border hover:bg-gray-100 focus:z-10 focus:ring-4 dark:focus:ring-gray-700 dark:bg-gray-800 ${
          isWishlisted ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-900 border-gray-200 dark:text-gray-400 dark:border-gray-600'
        }`}
        onClick={handleAddWishlist}
        title="save to wish list"
        type="button"
      >
        <svg
          className="w-5 h-5 -ms-2 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
        {isWishlisted ? 'Wishlisted' : 'Save'}
      </button>
    </>
  );
}
