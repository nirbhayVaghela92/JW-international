import { apiRequest } from "@/helpers/apiRequest";
import { API } from "@/lib/api/apiUrl";
import { ProductListParams } from "@/types";

export const productList = (params: ProductListParams) => {
  return apiRequest({
    method: "post",
    url: API.productList,
    data: params,
  });
};

export const productDetails = (slug: string) => {
  return apiRequest({
    method: "get",
    url: API.productDetails(slug),
  });
};

export const toggleWishList = (productId: number) => {
  return apiRequest({
    method: "post",
    url: API.toggleWishList,
    data: { product_id: productId },
  });
};
