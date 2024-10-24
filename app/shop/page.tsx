"use client";
import ProductCardLoading from "@/components/ProductCardLoading";
import ProductList from "@/components/ProductList";
import { fetcher } from "@/components/utils";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

const Shop: NextPage = () => {
  const { data: products, isLoading } = useSWR("/api", fetcher);
  console.log("products", products);
  console.log("isLoading", isLoading);

  return (
    <>
      <div
        className="w-full pt-10 h-80 flex flex-col justify-center items-center "
        style={{
          backgroundImage: `url('/image/shop-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="card-title text-4xl">Shop</div>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Shop</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full h-28 bg-[#F9F1E7] mb-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 p-10">
        <div className=" flex gap-5 justify-start items-center">
          <div className="flex gap-2 justify-start items-center">
            <Image
              src="/icon/filter.png"
              alt="filter"
              width={15}
              height={15}
              priority
              style={{
                width: "15px",
                height: "15px",
              }}
            />
            <span>Filter</span>
          </div>
          <div className="flex gap-5 justify-start items-center">
            <Image
              src="/icon/ci_grid-big-round.png"
              alt="ci_grid-big-round"
              width={20}
              height={20}
              priority
              className="cursor-pointer"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            <Image
              src="/icon/bi_view-list.png"
              alt="bi_view-list"
              className="cursor-pointer"
              width={15}
              height={15}
              priority
              style={{
                width: "15px",
                height: "15px",
              }}
            />
          </div>
          <div className="divider lg:divider-horizontal" />
          <div>Showing 1–16 of products results</div>
        </div>
        <div className="bg-slate-950"></div>
      </div>
      {isLoading || !products ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-20 p-10 ">
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
          <ProductCardLoading />
        </div>
      ) : (
        <ProductList products={products} />
      )}

      <div className="flex justify-center items-center mt-10">
        <div className="join">
          <button className="join-item btn">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn btn-disabled">...</button>
          <button className="join-item btn">99</button>
          <button className="join-item btn">100</button>
        </div>
      </div>
    </>
  );
};

export default Shop;
