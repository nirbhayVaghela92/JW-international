import { useCartStore } from "@/hooks/store/useCartStore";
import { FC } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface CartQuantityActionsProps {
  productId: number;
  variantId: number;
  quantity: number;
  stockQuantity: number;
}

const CartQuantityActions: FC<CartQuantityActionsProps> = ({
  productId,
  variantId,
  quantity,
  stockQuantity,
}) => {
  const { decreaseQty, increaseQty } = useCartStore();

  return (
    <div className="flex items-center gap-6 border px-6 py-4 flex-1 justify-between text-black">
      <button
        onClick={() => decreaseQty(productId, variantId)}
        className="text-lg cursor-pointer"
      >
        <FiMinus />
      </button>

      <span className="font-medium">{quantity}</span>

      <button
        onClick={() => increaseQty(productId, variantId)}
        className="text-lg cursor-pointer"
        disabled={quantity >= stockQuantity}
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default CartQuantityActions;
