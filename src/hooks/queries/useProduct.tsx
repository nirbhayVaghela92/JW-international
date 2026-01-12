import {
  productDetails,
  productList,
  toggleWishList,
} from "@/services/product.service";
import { ProductListParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProductList = (params: ProductListParams) => {
  const {
    category,
    arrival_sort,
    bestSeller,
    price_sort,
    limit,
    page,
    newArrival,
    search,
    wishList,
  } = params;
  const response = useQuery({
    queryKey: [
      "useProductList",
      category,
      arrival_sort,
      bestSeller,
      price_sort,
      limit,
      page,
      newArrival,
      search,
      wishList,
    ],
    queryFn: async () => {
      const res = await productList({
        ...params,
        ...(price_sort && { price_sort }),
        ...(arrival_sort && { arrival_sort }),
        ...(newArrival && { newArrival }),
        ...(bestSeller && { bestSeller }),
        ...(wishList && { wishList }),
        ...(search != "" && { search }),
      });
      return res;
    },
  });
  return {
    data: response.data?.data?.products,
    isLoading: response.isLoading,
    pagination: response.data?.data?.pagination,
  };
};

export const useProductDetails = (slug: string) => {
  const response = useQuery({
    queryKey: ["useProductDetails", slug],
    queryFn: async () => {
      const res = await productDetails(slug);
      return res;
    },
  });
  return {
    data: response.data?.data?.product,
    isLoading: response.isLoading,
  };
};

export const useToggleWishList = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useToggleWishList"],
    mutationFn: async (productId: number) => {
      const res = await toggleWishList(productId);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useProductList"],
      });
    },
  });
  return response;
};
