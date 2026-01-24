import { submitContactQuery } from "@/services/support.service";
import { contactSupportSchemaType } from "@/types/schemas";
import { useMutation } from "@tanstack/react-query";

export const useSubmitContactQuery = () => {
  const response = useMutation({
    mutationKey: ["useSubmitContactQuery"],
    mutationFn: async (body:contactSupportSchemaType) => {
      const res = await submitContactQuery(body);
      return res;
    },
  });
  return response;
};
