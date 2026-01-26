/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/common/Button";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import Image from "next/image";
import { useCartStore } from "@/hooks/store/useCartStore";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { formatPrice, getFullImageUrl } from "@/helpers/commonHelpers";
import CartQuantityActions from "../cart/CartQuantityActions";  
import { cn } from "@/lib/utils";
import { useGetAuthDetails } from "@/hooks/useGetAuthDetails";
import { routes } from "@/lib/routes";
import { ProductVariant } from "@/types";

export default function ProductDetails({
  productDetails,
}: {
  productDetails: any;
}) {
  const router = useRouter();

  const thumbRef = useRef<HTMLDivElement | null>(null);

  const { isAuthenticated } = useGetAuthDetails();
  const { getItem, addToCart } = useCartStore();

  const [activeVariant, setActiveVariant] = useState<ProductVariant | null>(
    null,
  );

  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);

  const totalStock =
    productDetails?.variants?.reduce(
      (total, variant) => total + (variant.stock || 0),
      0,
    ) || 0;

  const cartItem =
    activeVariant && productDetails?.product
      ? getItem(productDetails.product.id, activeVariant.id)
      : undefined;

  const scrollUp = () => {
    thumbRef.current?.scrollBy({ top: -120, behavior: "smooth" });
  };

  const scrollDown = () => {
    thumbRef.current?.scrollBy({ top: 120, behavior: "smooth" });
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart.");
      router.push(routes.signIn);
      return;
    }

    if (!activeVariant) {
      toast.error("Please select a color.");
      return;
    }

    if (activeVariant.stock <= 0) {
      toast.error("This color is out of stock.");
      return;
    }

    if (!productDetails?.product) return;

    addToCart({
      productId: productDetails.product.id,
      variantId: activeVariant.id,

      name: productDetails.product.name,
      code: productDetails.product.code,
      price: Number(productDetails.product.price),
      coverImageUrl: productDetails.images?.[0]?.image_url,

      variantName: activeVariant.color,
      hexCode: activeVariant.hexCode,

      quantity: 1,
      stockQuantity: activeVariant.stock,
    });

    // toast.success("Added to cart!");
  };

  useEffect(() => {
    if (productDetails?.images?.length > 0) {
      setActiveImage(productDetails.images[0].image_url);
    }
  }, [productDetails]);

  if (!productDetails) return null;

  return (
    <section className="py-20">
      <div className="cus-container">
        <div className="flex flex-col lg:flex-row gap-4.5">
          {/* LEFT : IMAGE GALLERY */}
          <div className="flex flex-col md:flex-row gap-6 max-w-207.5 w-full">
            {/* Thumbnails */}
            <div className="flex flex-col items-center gap-4">
              <button onClick={scrollUp} className="text-xl hidden md:block">
                <FiChevronUp />
              </button>

              <div
                ref={thumbRef}
                className="flex md:flex-col gap-3 md:gap-4 max-h-155 overflow-y-auto p-1"
              >
                {productDetails.images?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img.image_url)}
                    className={cn(
                      "relative w-20 sm:w-24 md:w-28 lg:w-full lg:max-w-28 aspect-square rounded-md bg-white overflow-hidden transition-all",
                      activeImage === img.image_url
                        ? "ring-2 ring-[#094745]"
                        : "ring-1 ring-gray-300",
                    )}
                  >
                    <Image
                      src={img.image_url}
                      alt={productDetails.product.name}
                      width={140}
                      height={140}
                      className="w-full h-full object-contain p-3"
                    />
                  </button>
                ))}
              </div>

              <button onClick={scrollDown} className="text-xl hidden md:block">
                <FiChevronDown />
              </button>
            </div>

            {/* Main Image */}
            <div className="w-full max-w-166.25">
              <Image
                src={activeImage}
                alt={productDetails.product.name}
                width={665}
                height={665}
                className="w-full"
              />
            </div>
          </div>

          {/* RIGHT : PRODUCT INFO */}
          <div className="max-w-155.5">
            <h1 className="text-3xl font-bold text-[#094745]">
              {productDetails.product.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {productDetails.product.code}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-[32px] font-semibold text-[#094745]">
                Rs. {formatPrice(Number(productDetails.product.price))}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              MRP (Inclusive of all taxes)
            </p>

            <hr className="my-4" />

            {/* Color Options */}
            <div>
              <p className="mb-4 font-medium">Color Options:</p>

              <div className="flex gap-4">
                {productDetails.variants?.map((variant) => {
                  const isActive = activeVariant?.id === variant.id;
                  const isOutOfStock = variant.stock === 0;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => !isOutOfStock && setActiveVariant(variant)}
                      disabled={isOutOfStock}
                      className={cn(
                        "relative w-11 h-11 rounded-full flex items-center justify-center",
                        isOutOfStock && "opacity-40 cursor-not-allowed",
                      )}
                    >
                      {isActive && (
                        <span className="absolute inset-0 rounded-full ring-2 ring-black" />
                      )}

                      <span
                        className="w-9 h-9 rounded-full border"
                        style={{ backgroundColor: variant.color }}
                        title={variant.color}
                      />
                    </button>
                  );
                })}
              </div>

              {activeVariant && (
                <p className="mt-3 text-sm">
                  {activeVariant.stock > 0 ? (
                    <span className="text-green-700">
                      {activeVariant.stock} left in stock
                      {/* for{" "}<strong>{activeVariant.color}</strong> */}
                    </span>
                  ) : (
                    <span className="text-red-600">
                      Out of stock for <strong>{activeVariant.color}</strong>
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Quantity / Add to Cart */}
            <div className="mt-8 flex gap-4">
              {!cartItem ? (
                <Button
                  bgColor="bg-[#094745]"
                  textColor="text-white"
                  px="px-10"
                  py="py-4"
                  fontSize="text-sm"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
              ) : (
                <CartQuantityActions
                  productId={cartItem.productId}
                  variantId={cartItem.variantId}
                  quantity={cartItem.quantity}
                  stockQuantity={cartItem.stockQuantity}
                />
              )}
            </div>

            {/* Delivery Info */}
            <div className="mt-8 space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <BsBoxSeam className="text-[#E7B250]" />
                Estimated Delivery: 10 Business Days
              </div>

              <div className="flex items-center gap-3">
                <AiOutlineClockCircle className="text-[#E7B250]" />
                {totalStock} left in stock. Order soon!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
