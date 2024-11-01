import React, { FunctionComponent } from "react";
import { Product } from "../types/types";
import Image from "next/image";
import { calculateDiscountedPrice } from "./utils";

type ProductCardProps = {
  item: Product;
  howDisplay: "group" | "single";
};

const ProductCard: FunctionComponent<ProductCardProps> = ({
  item,
  howDisplay,
}) => {
  const formattedPrice = item.price.toLocaleString("en");

  if (howDisplay == "single") {
    return (
      <div className="indicator w-3/4 md:w-3/4 lg:w-3/4">
        {item.discount ? (
          <span className="indicator-item badge badge-error">
            {item.discountPercentage}%
          </span>
        ) : (
          item.new && (
            <span className="indicator-item badge badge-accent">New</span>
          )
        )}
        <div className="card sm:card-side  bg-base-100 w-full shadow-xl group/product overflow-hidden">
          <figure>
            <div className="relative max-w-[285px] max-h-[301px] min-w-[285px] min-h-[301px] ">
              <Image
                className="object-cover"
                src={item.image}
                alt={item.name}
                layout="fill"
              />
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.description}</p>

            <div className="card-actions justify-end">
              <p className="font-bold text-md">
                Rp{" "}
                {calculateDiscountedPrice(item.price, item.discountPercentage)}
              </p>
            </div>
          </div>
          <div className="absolute invisible p-2 flex-col gap-3  group-hover/product:visible left-0 top-0 bottom-0 right-0  bg-[#3a3a3ab2] flex justify-center items-center">
            <button className="btn  btn-outline btn-warning">
              Add to cart
            </button>
            <div className="flex items-center justify-between gap-1">
              <button className="btn btn-xs text-white btn-ghost gap-1">
                <Image
                  src="/icon/share.png"
                  alt="share"
                  width={10}
                  height={10}
                />
                Share
              </button>
              <button className="btn btn-xs text-white btn-ghost gap-1">
                <Image
                  src="/icon/Compare.png"
                  alt="Compare"
                  width={12}
                  height={12}
                />
                Compare
              </button>{" "}
              <button className="btn btn-xs text-white btn-ghost gap-1">
                <Image
                  src="/icon/Heart.png"
                  alt="Heart"
                  width={12}
                  height={12}
                />
                Like
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (howDisplay == "group") {
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
            <div className="relative max-w-[285px] max-h-[301px] min-w-[285px] min-h-[301px] ">
              <Image
                className="object-cover"
                src={item.image}
                alt={item.name}
                layout="fill"
                // width={285}
                // height={301}
              />
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.description}</p>
            <div className="flex justify-between items-center">
              <p className="font-bold text-md">
                Rp{" "}
                {calculateDiscountedPrice(item.price, item.discountPercentage)}
              </p>
              {item.discount && (
                <p className="font-bold text-md line-through text-gray-500">
                  Rp {formattedPrice}
                </p>
              )}
            </div>
          </div>
          <div className="absolute invisible p-2 flex-col gap-3  group-hover/product:visible left-0 top-0 bottom-0 right-0  bg-[#3a3a3ab2] flex justify-center items-center">
            <button className="btn  btn-outline btn-warning">
              Add to cart
            </button>
            <div className="flex items-center justify-between gap-1">
              <button className="btn btn-xs text-white btn-ghost gap-1">
                <Image
                  src="/icon/share.png"
                  alt="share"
                  width={10}
                  height={10}
                />
                Share
              </button>
              <button className="btn btn-xs text-white btn-ghost gap-1">
                <Image
                  src="/icon/Compare.png"
                  alt="Compare"
                  width={12}
                  height={12}
                />
                Compare
              </button>{" "}
              <button className="btn btn-xs text-white btn-ghost gap-1">
                <Image
                  src="/icon/Heart.png"
                  alt="Heart"
                  width={12}
                  height={12}
                />
                Like
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductCard;
