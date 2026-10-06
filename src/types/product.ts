export type ProductCategory =
  | "T-Shirts"
  | "Hoodies"
  | "Trousers"
  | "Jackets"
  | "Shirts";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type ProductColorName =
  | "Black"
  | "White"
  | "Grey"
  | "Brown"
  | "Navy";

export interface ProductColor {
  name: ProductColorName;
  hex: string;
}

export type ProductFit = "Oversized" | "Relaxed" | "Regular" | "Slim";

export type ProductCollection = "New Arrivals" | "Core" | "Editorial";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  collection: ProductCollection;
  fitType?: ProductFit;
  images: {
    primary: string;
    secondary: string;
    gallery?: string[];
  };
  colors: ProductColor[];
  sizes: {
    size: ProductSize;
    inStock: boolean;
  }[];
  material: string;
  fit: string;
  shippingInfo?: string;
  returnsInfo?: string;
  featured?: boolean;
  newArrival?: boolean;
  createdAt?: string;
  stock: number;
}

export type PriceRangeKey = "under-1500" | "1500-2500" | "2500-4000" | "4000-plus";

export type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export interface CatalogFilterState {
  category?: ProductCategory;
  size?: ProductSize;
  color?: ProductColorName;
  priceRange?: PriceRangeKey;
  fit?: ProductFit;
  collection?: ProductCollection;
  sort?: SortKey;
  query?: string;
}
