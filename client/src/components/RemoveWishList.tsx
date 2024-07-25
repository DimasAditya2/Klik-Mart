import { useState } from "react";

export default function DeleteWishList({ id, onDelete }: { id: string; onDelete: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/wishlist?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete wishlist item");
      }

      onDelete();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 hover:text-gray-200 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
