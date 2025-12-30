import { AxiosRequestConfig, AxiosResponse } from "axios";

import toast from "react-hot-toast";
import { errorHandler } from "./apiErrorHandler";
import { apiClient } from "@/lib/api/apiClient";

type ApiRequestParams<T> = {
  method: "get" | "post" | "put" | "patch" | "delete";
  url: string;
  data?: T;
  config?: AxiosRequestConfig;
  successMessage?: string;
  showSuccessToast?: boolean;
};

export const apiRequest = async <TRequest = any, TResponse = any>({
  method,
  url,
  data,
  config,
  successMessage,
  showSuccessToast = true,
}: ApiRequestParams<TRequest>): Promise<
  AxiosResponse<TResponse> | undefined
> => {
  let response: AxiosResponse<TResponse> | undefined;

  try {
    response = await apiClient({
      method,
      url,
      data,
      ...config,
    });

    if (showSuccessToast) {
      if (
        response.status === 200 &&
        ((response.data as any)?.message || successMessage)
      ) {
        toast.success(successMessage || (response.data as any)?.message);
      }
    }

    return response;
  } catch (error: any) {
    response = error?.response;

    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again."
    );

    if (response?.status) {
      errorHandler(response.status);
    }

    return response;
  }
};
