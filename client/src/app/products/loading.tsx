"use client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useEffect, useState } from "react";

export default function Loading() {
  const [showLoading, setShowLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 2000); // Menetapkan timeout 2000 ms (2 detik)

    return () => clearTimeout(timeout);
  }, []);
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <Skeleton height={200} width={200} style={{ borderRadius: "8px" }} />
        <Skeleton height={200} width={200} style={{ borderRadius: "8px" }} />
        <Skeleton height={200} width={200} style={{ borderRadius: "8px" }} />
      </div>
    </SkeletonTheme>
  );
}
