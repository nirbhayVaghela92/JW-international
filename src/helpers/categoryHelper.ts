import {
  ProductFilterCategory,
  ProductFilters,
  ProductSections,
} from "@/types";

export const getSectionLabel = (category: ProductSections) => {
  if (category === "menWatches") {
    return "Men's Watches";
  } else if (category === "womenWatches") {
    return "Women's Watches";
  } else if (category === "purses") {
    return "Purses";
  } else if (category === "jewellery") {
    return "Jewellery";
  } else if (category === "WishList") {
    return "Wish List";
  } else if (category === "watches") {
    return "Watches";
  } else if (category === "all") {
    return "All Products";
  }
};

interface filterKeys {
  category?: ProductFilterCategory;
  wishList?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
}

export const getKeysByProductSection = (
  category: ProductFilters
): filterKeys => {
  if (category === "menWatches") {
    return {
      category: "watches-men",
    };
  } else if (category === "womenWatches") {
    return {
      category: "watches-women",
    };
  } else if (category === "purses") {
    return {
      category: "purse",
    };
  } else if (category === "jewellery") {
    return {
      category: "jewellery",
    };
  } else if (category === "WishList") {
    return {
      wishList: true,
    };
  } else if (category === "bestSeller") {
    return {
      bestSeller: true,
    };
  } else if (category === "newArrival") {
    return {
      newArrival: true,
    };
  } else {
    return {};
  }
};
