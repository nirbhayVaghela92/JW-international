import { LocalStorageGetItem } from "@/helpers/storageHelpers";
import Cookies from "js-cookie";
import { useCartStore } from "./store/useCartStore";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

export const useGetAuthDetails = () => {
  const token = Cookies.get("token");
  const userDetails = LocalStorageGetItem("userDetails");
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
    user: userDetails,
    token,
    handleLogout,
  };
};
