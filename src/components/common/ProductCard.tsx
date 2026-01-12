"use client";

import { useState } from "react";
import Image from "next/image";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { useToggleWishList } from "@/hooks/queries/useProduct";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(product.isWished !== 0);
  const router = useRouter();
  const { mutate: toggleWishList } = useToggleWishList();

  const handleToggleWishList = async () => {
    await toggleWishList(product.id);
    setLiked(!liked);
  };

  return (
    <div className=" text-white p-2.5">
      {/* Image */}
      <div className="relative bg-gray-100">
        <button
          onClick={() => handleToggleWishList()}
          className="absolute right-4 top-4"
        >
          {liked ? (
            <PiHeartFill className="text-xl text-[#0f4a45] transition-transform duration-200 group-hover:scale-110" />
          ) : (
            <PiHeart className="text-xl text-gray-400 transition-colors duration-200 group-hover:text-[#0f4a45]" />
          )}
        </button>

        <Image
          src={product?.main_image}
          alt={product?.name}
          width={375}
          height={375}
          className="mx-auto h-93.75 w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="py-4 text-left">
        <h3 className="text-[20px] text-black font-medium leading-snug sm:min-h-20.5 xl:min-h-14">
          {product?.name}
        </h3>

        <p className="mt-1 text-xs text-gray-400">{product?.code}</p>

        {/* Price */}
        <div className="mt-3 flex items-center gap-3">
          <span className="font-semibold text-[#0f4a45]">
            ₹{product?.price}
          </span>
          {/* <span className="text-sm text-gray-400 line-through">
            ₹{product.oldPrice}
          </span> */}
        </div>
      </div>

      {/* Button */}
      <Button
        bgColor="bg-[#0f4a45]"
        textColor="text-white"
        fontSize="text-sm"
        className="w-full rounded-none font-medium cursor-pointer"
        onClick={() => router.push(routes.productDetails(product.slug))}
      >
        SHOP NOW
      </Button>
    </div>
  );
}
