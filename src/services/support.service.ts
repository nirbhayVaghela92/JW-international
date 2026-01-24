import { apiRequest } from "@/helpers/apiRequest";
import { API } from "@/lib/api/apiUrl";
import { contactSupportSchemaType } from "@/types/schemas";

export const submitContactQuery = (body: contactSupportSchemaType) => {
  return apiRequest({
    method: "post",
    url: API.submitContactQuery,
    data: body,
    successMessage: "Your query has been submitted successfully.",
  });
};