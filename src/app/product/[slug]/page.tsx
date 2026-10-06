import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { ProductDetailView } from "@/components/product/ProductDetailView";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found — DEMONSTATION",
    };
  }

  return {
    title: `${product.name} — DEMONSTATION`,
    description: product.description,
  };
}

import { Container } from "@/components/ui/Container";

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(slug, 4);

  return (
    <main className="min-h-screen">
      <Container>
        <ProductDetailView product={product} relatedProducts={related} />
      </Container>
    </main>
  );
}
