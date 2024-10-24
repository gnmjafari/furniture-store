import React, { FunctionComponent } from "react";
import { Product } from "../types/types";
import Image from "next/image";

type ProductCardProps = {
  item: Product;
};

const ProductCard: FunctionComponent<ProductCardProps> = ({ item }) => {
  const formattedPrice = item.price.toLocaleString("en");

  const calculateDiscountedPrice = (
    price: number,
    discountPercentage: number
  ) => {
    const discountAmount = (price * discountPercentage) / 100;
    const finalPrice = price - discountAmount;
    return finalPrice.toLocaleString("en");
  };

  return (
    <div className="indicator ">
      {item.discount ? (
        <span className="indicator-item badge badge-error">
          {item.discountPercentage}%
        </span>
      ) : (
        item.new && (
          <span className="indicator-item badge badge-accent">New</span>
        )
      )}
      <div className="card relative cursor-pointer card-compact w-64 shadow-xl group/product overflow-hidden">
        <figure>
          <div className="max-w-[285px] max-h-[301px]">
            <Image src={item.image} alt={item.name} width={285} height={301} />
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.name}</h2>
          <p>{item.description}</p>
          <div className="flex justify-between items-center">
            <p className="font-bold text-md">
              Rp {calculateDiscountedPrice(item.price, item.discountPercentage)}
            </p>
            {item.discount && (
              <p className="font-bold text-md line-through text-gray-500">
                Rp {formattedPrice}
              </p>
            )}
          </div>
        </div>
        <div className="absolute invisible p-2 flex-col gap-3  group-hover/product:visible left-0 top-0 bottom-0 right-0  bg-[#3a3a3ab2] flex justify-center items-center">
          <button className="btn  btn-outline btn-warning">Add to cart</button>
          <div className="flex items-center justify-between gap-1">
            <div className="badge badge-sm badge-ghost gap-1">
              <Image src="/icon/share.png" alt="share" width={10} height={10} />
              Share
            </div>
            <div className="badge badge-sm badge-ghost gap-1">
              <Image
                src="/icon/Compare.png"
                alt="Compare"
                width={12}
                height={12}
              />
              Compare
            </div>
            <div className="badge badge-sm badge-ghost gap-1">
              <Image src="/icon/Heart.png" alt="Heart" width={12} height={12} />
              Like
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
