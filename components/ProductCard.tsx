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
    <div className="indicator">
      {item.discount ? (
        <span className="indicator-item badge badge-error">
          {item.discountPercentage}%
        </span>
      ) : (
        item.new && (
          <span className="indicator-item badge badge-accent">New</span>
        )
      )}
      <div className="card card-compact w-64 shadow-xl">
        <figure>
          <div className="max-w-[285] max-h-[301]">
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
      </div>
    </div>
  );
};

export default ProductCard;
