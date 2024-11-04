"use client";
import ProductList from "@/components/ProductList";
import {
  fetcher,
  getShoppingCart,
  handleShoppingCart,
} from "@/components/utils";
import { Product as ProductType, ShoppingCart } from "@/types/types";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface ProductData {
  product: ProductType;
  relatedProducts: ProductType[];
}

export default function Product({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const [productId, setProductId] = useState<string | null>(null);
  const { data: cart } = useSWR<ShoppingCart[] | undefined>("cart", () =>
    getShoppingCart()
  );

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.product);
    };

    fetchParams();
  }, [params]);

  const { data, isLoading } = useSWR<ProductData>(
    productId ? `/api/${productId}` : null,
    productId ? fetcher : null
  );

  if (!data || isLoading) {
    return (
      <>
        <div className="w-full h-16 bg-[#F9F1E7] flex justify-start items-center px-16 mb-10">
          <div className="breadcrumbs text-sm mr-3">
            <ul>
              <li className="">
                <a>Home</a>
              </li>
              <li className="">
                <a>Shop</a>
              </li>
              <li className="text-xl opacity-50">|</li>
            </ul>
          </div>
        </div>
        <div className="px-5 md:px-16  flex flex-col  md:flex-row justify-start gap-20 mb-10">
          <div className="flex flex-col md:flex-row-reverse gap-5">
            <div className="relative w-full h-96 md:h-[400px]  md:w-[400px]  rounded-lg overflow-hidden">
              <div className="skeleton h-full w-full" />
            </div>
            <div className="flex flex-row md:flex-col gap-5 flex-wrap">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <div className="skeleton h-full w-full" />
              </div>
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <div className="skeleton h-full w-full" />
              </div>
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <div className="skeleton h-full w-full" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="skeleton h-4 w-36" />
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-4 w-44" />
            <div className="skeleton h-4 w-24" />
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-4 w-56" />

            <div className="flex flex-col gap-1">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-4 w-24" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="skeleton h-4 w-36" />
              <div className="skeleton h-4 w-36" />
            </div>

            <div className="flex flex-wrap gap-5 mt-4">
              <div className="skeleton h-16 w-full" />
            </div>
            <div className="divider" />
            <div className="flex flex-col gap-2 opacity-70 text-xs">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-full" />
            </div>
          </div>
        </div>
      </>
    );
  } else if (data) {
    const formattedPrice = data.product.price.toLocaleString("en");
    return (
      <>
        <div className="w-full h-16 bg-[#F9F1E7] flex justify-start items-center px-16 mb-10">
          <div className="breadcrumbs text-sm mr-3">
            <ul>
              <li className="">
                <a>Home</a>
              </li>
              <li className="">
                <a>Shop</a>
              </li>
              <li className="text-xl opacity-50">|</li>
            </ul>
          </div>
          <div className="text-sm">{data.product.name}</div>
        </div>
        <div className="px-5 md:px-16  flex flex-col  md:flex-row justify-start gap-20 mb-10">
          <div className="flex flex-col md:flex-row-reverse gap-5">
            <div className="relative w-full h-96 md:h-[400px]  md:w-[400px]  rounded-lg overflow-hidden">
              <Image
                className="object-cover"
                src={data.product.image}
                alt={data.product.name}
                fill
              />
            </div>
            <div className="flex flex-row md:flex-col gap-5 flex-wrap">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  className="object-cover"
                  src={data.product.image}
                  alt={data.product.name}
                  fill
                />
              </div>
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  className="object-cover"
                  src={data.product.image}
                  alt={data.product.name}
                  fill
                />
              </div>
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  className="object-cover"
                  src={data.product.image}
                  alt={data.product.name}
                  fill
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-4xl">{data.product.name}</div>
            <div className="text-md opacity-70">Rs. {formattedPrice}</div>
            <div className="rating rating-xs">
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-orange-400"
                defaultChecked
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
            <div>{data.product.description}</div>

            <div className="flex flex-col gap-1">
              <span className="text-sm opacity-70">Size</span>
              <span className="flex gap-2">
                <button className="btn btn-xs btn-active btn-outline btn-warning">
                  L
                </button>
                <button className="btn btn-xs btn-outline btn-warning">
                  XL
                </button>
                <button className="btn btn-xs btn-outline btn-warning">
                  XS
                </button>
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm opacity-70">Color</span>
              <span className="flex gap-2">
                <button className="rounded-full bg-red-700 w-5 h-5 cursor-pointer" />
                <button className="rounded-full bg-green-700 w-5 h-5 cursor-pointer" />
                <button className="rounded-full bg-cyan-600 w-5 h-5 cursor-pointer" />
              </span>
            </div>

            <div className="flex flex-wrap gap-5 mt-4">
              <div className="join">
                <button
                  onClick={() => {
                    handleShoppingCart(data.product.id, "Decrease");
                  }}
                  className="btn join-item"
                >
                  -
                </button>
                <button className="btn join-item">
                  {cart
                    ? _.find(cart, (item) => item.productId == data.product.id)
                        ?.quantity || 0
                    : 0}
                </button>
                <button
                  onClick={() => {
                    handleShoppingCart(data.product.id, "Increase");
                  }}
                  className="btn join-item"
                >
                  +
                </button>
              </div>
              <button className="btn btn-outline">Add To Cart</button>
              <button className="btn btn-outline">
                <div className="badge">+</div>
                Compare
              </button>
            </div>
            <div className="divider" />
            <div className="flex flex-col gap-2 opacity-70 text-xs">
              <div className="flex ">
                <span className="w-20">SKU</span>:
                <span className="mx-2">SS001</span>
              </div>
              <div className="flex">
                <span className="w-20">Category</span>:
                <span className="mx-2">{data.product.category}</span>
              </div>
              <div className="flex">
                <span className="w-20">Tags</span>:
                <span className="mx-2">Sofa, Chair, Home, Shop</span>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" />

        <div
          role="tablist"
          className="tabs tabs-lifted tabs-bordered  grid-cols-3  px-16 mt-10"
        >
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab flex-1"
            aria-label="Description"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content min-w-fit p-10 px-10 sm:px-16 text-justify"
          >
            {data.product.moreDetails}
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-10 mt-10">
              <div className="relative h-60 md:h-[348px]   rounded-lg overflow-hidden">
                <Image
                  className="object-cover"
                  src={data.product.image}
                  alt={data.product.name}
                  fill
                />
              </div>
              <div className="relative  h-60 md:h-[348px]   rounded-lg overflow-hidden">
                <Image
                  className="object-cover"
                  src={data.product.image}
                  alt={data.product.name}
                  fill
                />
              </div>
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Additional Information"
          />
          <div
            role="tabpanel"
            className="tab-content p-10 px-10 sm:px-16 text-justify"
          >
            {data.product.moreDetails}
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Reviews [3]"
          />
          <div role="tabpanel" className="tab-content p-10 px-10 sm:px-16">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-bubble bg-transparent shadow-md text-black">
                It was said that you would, destroy the Sith, not join them.
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-bubble bg-transparent shadow-md text-black">
                It was you who would bring balance to the Force
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-bubble bg-transparent shadow-md text-black">
                Not leave it in Darkness
              </div>
            </div>
          </div>
        </div>

        <div className="divider" />

        <div className="flex justify-center items-center flex-col mb-16">
          <div className="text-3xl mb-7">Related Products</div>
          <ProductList
            products={data?.relatedProducts.slice(0, 4)}
            howDisplay="group"
          />
          <button className="btn btn-outline btn-warning mt-10">
            <Link href="/shop">Show More</Link>
          </button>
        </div>
      </>
    );
  }
}
