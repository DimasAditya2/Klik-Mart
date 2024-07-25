"use client";

import WishListCard from "@/components/WishListCard";

export default function WishListPage() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="w-full max-w-4xl mx-auto mt-8 mb-8 px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Wishlist</h1>
        <WishListCard />
      </div>
    </div>
  );
}
