import { LocalStorageGetItem } from "@/helpers/storageHelpers";
import Cookies from "js-cookie";
import { useCartStore } from "./store/useCartStore";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { use } from "react";

export const useGetAuthDetails = () => {
  const token = Cookies.get("token");
  const userDetails = JSON.parse(LocalStorageGetItem("userDetails"));
  const router = useRouter();
  const { clearCart } = useCartStore();

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("userDetails");
    clearCart();
    router.push(routes.home);
  };

  return {
    isAuthenticated: !!token,
    user: {
      name: `${userDetails?.first_name || ""} ${userDetails?.last_name || ""}`.trim(),
      firstName: userDetails?.first_name,
      lastName: userDetails?.last_name,
      email: userDetails?.email,
      phone: userDetails?.phone,
    },
    token,
    handleLogout,
  };
};
