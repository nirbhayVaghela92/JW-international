import { useCartStore } from "@/hooks/store/useCartStore";
import type { CartItem as CartItemType } from "@/types";
import Image from "next/image";
import { FC } from "react";
import { FiTrash2 } from "react-icons/fi";
import CartQuantityActions from "./CartQuantityActions";
import { formatPrice, getFullImageUrl } from "@/helpers/commonHelpers";

interface CartItemProps {
  cartItemDetails: CartItemType;
}

const CartItem: FC<CartItemProps> = ({ cartItemDetails }) => {
  const { removeFromCart } = useCartStore();

  const {
    productId,
    variantId,
    name,
    price,
    coverImageUrl,
    hexCode,
    variantName,
    quantity,
    stockQuantity,
  } = cartItemDetails;

  return (
    <div className="flex flex-col md:flex-row justify-between pb-6 border-b">
      <div className="flex gap-6">
        <Image
          src={getFullImageUrl(coverImageUrl)}
          width={140}
          height={140}
          alt={name}
        />

        <div>
          <h4 className="font-medium text-[18px] text-[#1B1918]">
            {name}
          </h4>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            Color:
            <span
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: hexCode }}
              title={variantName}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
        <div className="flex gap-3 items-center">
          <button
            onClick={() => removeFromCart(productId, variantId)}
            className="text-red-500 cursor-pointer"
          >
            <FiTrash2 />
          </button>

          <CartQuantityActions
            productId={productId}
            variantId={variantId}
            quantity={quantity}
            stockQuantity={stockQuantity}
          />
        </div>

        <p className="font-semibold text-lg text-[#094745]">
          Rs. {formatPrice(price * quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
