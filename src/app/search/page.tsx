import type { Metadata } from "next";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search Catalog — DEMONSTATION",
  description: "Search contemporary garments, silhouettes, and collections by DEMONSTATION.",
};

export default function SearchPage() {
  return (
    <main className="min-h-screen">
      <SearchClient />
    </main>
  );
}
