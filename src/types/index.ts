import { filterOptions } from "@/lib/data";

export type Categories = "menWatches" | "womenWatches" | "purses" | "jewellery";

export type ProductSections = Categories | "WishList" | "watches" | "all";

export type ProductFilters = ProductSections | "bestSeller" | "newArrival"
export interface Product {
  id: number;
  // productId?: string;
  code?: string;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  category: Categories;
  quantity?: number; // For cart items
  stockQuantity?: number;
  colorOptions?: string[];
  coverImageUrl?: string;
  images?: string[];
}

export interface CartItem extends Product {
  selectedColorOptions: string;
}

// Product API Filters
export type SortOrder = "ASC" | "DESC";

export type ProductFilterCategory =
  | "watches-men"
  | "watches-women"
  | "purse"
  | "jewellery";
  
export interface ProductListParams {
  category?: ProductFilterCategory;
  bestSeller?: boolean;
  newArrival?: boolean;
  wishList?: boolean;
  search?: string;

  price_sort?: SortOrder;
  arrival_sort?: SortOrder;

  page?: number;
  limit?: number;
}

export type FilterOptionKey = typeof filterOptions[number]["key"];
