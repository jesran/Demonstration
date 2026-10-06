import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "prod-1",
    slug: "heavyweight-tee",
    name: "Heavyweight Tee",
    description:
      "A heavyweight everyday uniform essential engineered with an architectural oversized silhouette. Crafted with dense 450 GSM combed cotton for structured drape and lasting presence.",
    price: 1499,
    currency: "₹",
    category: "T-Shirts",
    collection: "Core",
    fitType: "Oversized",
    createdAt: "2026-03-01T00:00:00Z",
    images: {
      primary: "/images/products/heavyweight-tee-black.jpg",
      secondary: "/images/editorial/editorial-standing.jpg",
      gallery: [
        "/images/products/heavyweight-tee-black.jpg",
        "/images/editorial/detail-stitching.jpg",
        "/images/editorial/editorial-standing.jpg",
      ],
    },
    colors: [
      { name: "Black", hex: "#121110" },
      { name: "Grey", hex: "#4A4744" },
      { name: "White", hex: "#F8F6F0" },
    ],
    sizes: [
      { size: "XS", inStock: true },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
      { size: "XXL", inStock: false },
    ],
    material: "450 GSM Combed Cotton. Dense single-jersey structure with soft matte finish.",
    fit: "Architectural Oversized. Dropped shoulders, wide chest, slightly cropped hem.",
    shippingInfo: "Complimentary express delivery across India. Dispatched within 24 hours.",
    returnsInfo: "14-day return and exchange window. Garment must be unworn with original tags attached.",
    featured: true,
    newArrival: true,
    stock: 45,
  },
  {
    id: "prod-2",
    slug: "core-zip-hoodie",
    name: "Core Zip Hoodie",
    description:
      "Double-layered hood with two-way heavy steel zip closure. Sculpted from 520 GSM loopback French terry, offering insulation and refined tactile weight.",
    price: 2499,
    currency: "₹",
    category: "Hoodies",
    collection: "Core",
    fitType: "Relaxed",
    createdAt: "2026-03-02T00:00:00Z",
    images: {
      primary: "/images/products/core-zip-hoodie-charcoal.jpg",
      secondary: "/images/products/core-zip-hoodie-charcoal.jpg",
      gallery: [
        "/images/products/core-zip-hoodie-charcoal.jpg",
      ],
    },
    colors: [
      { name: "Black", hex: "#121110" },
      { name: "Brown", hex: "#3B2F2F" },
      { name: "Grey", hex: "#4A4744" },
    ],
    sizes: [
      { size: "XS", inStock: false },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
      { size: "XXL", inStock: true },
    ],
    material: "520 GSM 100% Cotton Loopback French Terry. Nickel hardware finish.",
    fit: "Relaxed Sculpted. Generous body volume with structured ribbed cuffs and waistband.",
    shippingInfo: "Complimentary express delivery across India. Dispatched within 24 hours.",
    returnsInfo: "14-day return and exchange window.",
    featured: true,
    newArrival: true,
    stock: 28,
  },
  {
    id: "prod-3",
    slug: "check-overshirt",
    name: "Check Overshirt",
    description:
      "Structured heavyweight flannel cut with clean architectural symmetry, hidden snap fastenings, and twin chest patch pockets.",
    price: 2899,
    currency: "₹",
    category: "Shirts",
    collection: "Editorial",
    fitType: "Regular",
    createdAt: "2026-02-15T00:00:00Z",
    images: {
      primary: "/images/products/check-overshirt-plaid.jpg",
      secondary: "/images/products/check-overshirt-plaid.jpg",
      gallery: [
        "/images/products/check-overshirt-plaid.jpg",
      ],
    },
    colors: [
      { name: "Brown", hex: "#3B2F2F" },
      { name: "Grey", hex: "#4A4744" },
      { name: "Navy", hex: "#1E2A38" },
    ],
    sizes: [
      { size: "XS", inStock: true },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: false },
      { size: "XL", inStock: false },
      { size: "XXL", inStock: false },
    ],
    material: "380 GSM Brushed Wool-Cotton Blend with clean twill lining.",
    fit: "Boxy Straight. Designed for mid-layer volume over tees or lightweight knitwear.",
    shippingInfo: "Complimentary express delivery across India.",
    returnsInfo: "14-day return and exchange window.",
    featured: true,
    newArrival: false,
    stock: 15,
  },
  {
    id: "prod-4",
    slug: "relaxed-trouser",
    name: "Relaxed Trouser",
    description:
      "Fluid tailored trousers featuring front pleats, hidden elastic waistband inserts, and an elegant gentle taper toward the ankle break.",
    price: 2299,
    currency: "₹",
    category: "Trousers",
    collection: "Core",
    fitType: "Relaxed",
    createdAt: "2026-02-20T00:00:00Z",
    images: {
      primary: "/images/products/relaxed-trouser-charcoal.jpg",
      secondary: "/images/products/relaxed-trouser-charcoal.jpg",
      gallery: [
        "/images/products/relaxed-trouser-charcoal.jpg",
      ],
    },
    colors: [
      { name: "Black", hex: "#121110" },
      { name: "Grey", hex: "#4A4744" },
      { name: "Navy", hex: "#1E2A38" },
    ],
    sizes: [
      { size: "XS", inStock: true },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
      { size: "XXL", inStock: false },
    ],
    material: "Dense Polyester-Viscose Twill with subtle mechanical stretch.",
    fit: "Relaxed Tapered. Mid-rise with single pleat detailing.",
    shippingInfo: "Complimentary express delivery across India.",
    returnsInfo: "14-day return and exchange window.",
    featured: true,
    newArrival: false,
    stock: 35,
  },
  {
    id: "prod-5",
    slug: "essential-oversized-tee",
    name: "Essential Oversized Tee",
    description:
      "Lightweight counterpart to our Heavyweight Tee. 260 GSM organic cotton with an exceptionally soft hand-feel and draped shoulder seams.",
    price: 1299,
    currency: "₹",
    category: "T-Shirts",
    collection: "New Arrivals",
    fitType: "Oversized",
    createdAt: "2026-03-05T00:00:00Z",
    images: {
      primary: "/images/products/essential-tee-white.jpg",
      secondary: "/images/products/essential-tee-white.jpg",
      gallery: [
        "/images/products/essential-tee-white.jpg",
      ],
    },
    colors: [
      { name: "White", hex: "#F8F6F0" },
      { name: "Black", hex: "#121110" },
      { name: "Grey", hex: "#4A4744" },
    ],
    sizes: [
      { size: "XS", inStock: true },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
      { size: "XXL", inStock: true },
    ],
    material: "260 GSM 100% Organic Cotton. Pre-shrunk garment wash.",
    fit: "Flowing Oversized. Clean drop shoulder profile.",
    shippingInfo: "Complimentary express delivery across India.",
    returnsInfo: "14-day return and exchange window.",
    featured: false,
    newArrival: true,
    stock: 60,
  },
  {
    id: "prod-6",
    slug: "structured-zip-jacket",
    name: "Structured Zip Jacket",
    description:
      "Minimalist architectural blouson jacket with standing funnel collar, clean welt pockets, and concealed two-way matte zipper.",
    price: 4499,
    currency: "₹",
    category: "Jackets",
    collection: "New Arrivals",
    fitType: "Regular",
    createdAt: "2026-03-04T00:00:00Z",
    images: {
      primary: "/images/products/structured-jacket-grey.jpg",
      secondary: "/images/editorial/editorial-walking.jpg",
      gallery: [
        "/images/products/structured-jacket-grey.jpg",
        "/images/editorial/editorial-walking.jpg",
      ],
    },
    colors: [
      { name: "Black", hex: "#121110" },
      { name: "Brown", hex: "#3B2F2F" },
      { name: "Navy", hex: "#1E2A38" },
    ],
    sizes: [
      { size: "XS", inStock: false },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: false },
      { size: "XXL", inStock: false },
    ],
    material: "Heavyweight Cotton-Nylon faille with weather-repellent finish.",
    fit: "Sculpted Boxy Silhouette. Adjustable waist tabs.",
    shippingInfo: "Complimentary express delivery across India.",
    returnsInfo: "14-day return and exchange window.",
    featured: true,
    newArrival: true,
    stock: 18,
  },
  {
    id: "prod-7",
    slug: "wide-leg-trouser",
    name: "Wide Leg Trouser",
    description:
      "Dramatic wide-leg silhouette with deep front inverted pleats and floor-grazing length. Crafted for deliberate architectural presence.",
    price: 2499,
    currency: "₹",
    category: "Trousers",
    collection: "Editorial",
    fitType: "Relaxed",
    createdAt: "2026-01-28T00:00:00Z",
    images: {
      primary: "/images/products/wide-leg-trouser-grey.jpg",
      secondary: "/images/products/wide-leg-trouser-grey.jpg",
      gallery: [
        "/images/products/wide-leg-trouser-grey.jpg",
      ],
    },
    colors: [
      { name: "Black", hex: "#121110" },
      { name: "Grey", hex: "#4A4744" },
    ],
    sizes: [
      { size: "XS", inStock: false },
      { size: "S", inStock: false },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
      { size: "XXL", inStock: false },
    ],
    material: "High-twist tropical wool blend with clean crease retention.",
    fit: "Wide Column Leg. High-rise waist with tailored waistband.",
    shippingInfo: "Complimentary express delivery across India.",
    returnsInfo: "14-day return and exchange window.",
    featured: false,
    newArrival: false,
    stock: 24,
  },
  {
    id: "prod-8",
    slug: "heavyweight-crewneck",
    name: "Heavyweight Crewneck",
    description:
      "Minimalist crewneck sweater constructed from 500 GSM loopback fleece with double-needle flatlock stitching and thick rib finishings.",
    price: 2199,
    currency: "₹",
    category: "Hoodies",
    collection: "Core",
    fitType: "Regular",
    createdAt: "2026-02-10T00:00:00Z",
    images: {
      primary: "/images/products/heavyweight-crewneck-oatmeal.jpg",
      secondary: "/images/editorial/editorial-portrait.jpg",
      gallery: [
        "/images/products/heavyweight-crewneck-oatmeal.jpg",
        "/images/editorial/editorial-portrait.jpg",
      ],
    },
    colors: [
      { name: "Grey", hex: "#4A4744" },
      { name: "Black", hex: "#121110" },
      { name: "White", hex: "#F8F6F0" },
    ],
    sizes: [
      { size: "XS", inStock: true },
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
      { size: "XXL", inStock: true },
    ],
    material: "500 GSM Loopback Fleece. Heavy compact-yarn construction.",
    fit: "Classic Architectural Regular. Boxy chest with high armhole taper.",
    shippingInfo: "Complimentary express delivery across India.",
    returnsInfo: "14-day return and exchange window.",
    featured: false,
    newArrival: false,
    stock: 30,
  },
];

export const featuredProduct = products[0];
export const newArrivals = products.filter((p) => p.newArrival);

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, count = 3): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, count);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
  );
}
