"use client";

import { useSearchParams } from "next/navigation";
import { getAllProducts } from "@/lib/data";
import { CatalogView } from "@/components/catalog/CatalogView";
import { CatalogFilterState, ProductCategory, ProductSize, ProductCollection } from "@/types/product";

export function ShopClientWrapper() {
  const searchParams = useSearchParams();

  // Read URL params if present
  const categoryParam = searchParams.get("category") as ProductCategory | null;
  const sizeParam = searchParams.get("size") as ProductSize | null;
  const collectionParam = searchParams.get("collection") as ProductCollection | null;
  const sortParam = searchParams.get("sort") as CatalogFilterState["sort"] | null;

  const initialFilters: CatalogFilterState = {
    category: categoryParam || undefined,
    size: sizeParam || undefined,
    collection: collectionParam || undefined,
    sort: sortParam || "featured",
  };

  const allProducts = getAllProducts();

  return (
    <CatalogView initialProducts={allProducts} initialFilters={initialFilters} />
  );
}
