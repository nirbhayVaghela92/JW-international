import { register, signIn } from "@/services";
import { registerSchemaType, SignInSchemaType } from "@/types/schemas";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  const response = useMutation({
    mutationKey: ["useSignIn"],
    mutationFn: async (body: SignInSchemaType) => {
      const res = await signIn(body);
      return res;
    },
  });
  return response;
};

export const useRegister = () => {
  const response = useMutation({
    mutationKey: ["useRegister"],
    mutationFn: async (body: registerSchemaType) => {
      const res = await register(body);
      return res;
    },
  });
  return response;
};
