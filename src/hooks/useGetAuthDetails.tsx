import { LocalStorageGetItem } from "@/helpers/storageHelpers";
import Cookies from "js-cookie";

export const useGetAuthDetails = () => {
  const token = Cookies.get("token");
  const userDetails = LocalStorageGetItem("userDetails");

//   return {
//     isAuthenticated: !!token,
//     user: userDetails,
//     token,
//   };
  return {
    isAuthenticated: true,
    user: {
        id: 1,
        firstName: "Mehul",
        lastName: "patel",
        email: "mehul.patel@yop.com",
        phoneNumber: "9876543210",
    },
    token : "dummy-token",
  };
};
