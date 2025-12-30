
import { apiRequest } from "@/helpers/apiRequest";
import { API } from "@/lib/api/apiUrl";
import { registerSchemaType, SignInSchemaType } from "@/types/schemas";

export const signIn = (body: SignInSchemaType) => {
  return apiRequest({
    method: "post",
    url: API.signin,
    data: body,
    successMessage: "Login successfully.",
  });
};

export const register = (body: registerSchemaType) => {
  return apiRequest({
    method: "post",
    url: API.register,
    data: body,
    successMessage: "Register successfully. Please login to continue.",
  });
};
