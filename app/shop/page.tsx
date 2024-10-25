"use client";
import ProductCardLoading from "@/components/ProductCardLoading";
import ProductList from "@/components/ProductList";
import { fetcher } from "@/components/utils";
import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";

const shortOption: string[] = ["New", "Lowest price", "Discounted"];
const showOption: string[] = ["8", "16", "24"];

const Shop: NextPage = () => {
  const [pagination, setPagination] = useState<number>(1);
  const [show, setShow] = useState<string>("8");
  const [shortBy, setShortBy] = useState<string>("New");
  const [howDisplay, setHowDisplay] = useState<string>("group");

  const { data: products, isLoading } = useSWR(
    `/api/?page=${pagination}&show=${show}&shortBy=${shortBy}`,
    fetcher
  );

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
          <div className="flex gap-1 justify-start items-center">
            <button
              className={`btn btn-ghost ${
                howDisplay == "Group" && "btn-active"
              }`}
            >
              <Image
                onClick={() => setHowDisplay("Group")}
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
            </button>
            <button className="btn btn-ghost">
              <Image
                onClick={() => setHowDisplay("Single")}
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
            </button>
          </div>
          <div className="divider lg:divider-horizontal" />
          <div>Showing 1–16 of products results</div>
        </div>
        <div className="flex justify-center items-center gap-10">
          <div className="flex justify-start items-center gap-3 ">
            <div className="text-lg">Show</div>
            <select
              value={show}
              onChange={(e) => setShow(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              {showOption.map((item, key) => {
                return <option key={key}>{item}</option>;
              })}
            </select>
          </div>
          <div className="flex justify-start items-center gap-3">
            <div className="text-lg text-nowrap">Short by</div>
            <select
              value={shortBy}
              onChange={(e) => setShortBy(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              {shortOption.map((item, key) => {
                return <option key={key}>{item}</option>;
              })}
            </select>
          </div>
        </div>
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
          {pagination != 1 && (
            <button
              className={`join-item btn btn-warning btn-outline ${
                pagination <= 1 && "btn-disabled"
              }`}
              onClick={() => setPagination(pagination - 1)}
            >
              «
            </button>
          )}
          <button className="join-item btn btn-warning">
            Page {pagination} of {Math.round(products?.length / Number(show))}
          </button>
          {pagination != Math.round(products?.length / Number(show)) && (
            <button
              className={`join-item btn btn-warning btn-outline ${
                pagination >= Math.round(products?.length / Number(show)) &&
                "btn-disabled"
              }`}
              onClick={() => setPagination(pagination + 1)}
            >
              »
            </button>
          )}
        </div>
        {/* <div className="join">
          {pagination != 1 && (
            <button
              className={`join-item btn ${pagination <= 1 && "btn-disabled"}`}
              onClick={() => setPagination(pagination - 1)}
            >
              «
            </button>
          )}
          {pagination != Math.round(products?.length / Number(show)) && (
            <>
              <button className="join-item btn btn-active">
                Page {pagination}
              </button>
              <button className="join-item btn">...</button>
            </>
          )}
          <button
            className={`join-item btn ${
              pagination == Math.round(products?.length / Number(show)) &&
              "btn-active"
            }`}
            onClick={() =>
              setPagination(Math.round(products?.length / Number(show)))
            }
          >
            Page {Math.round(products?.length / Number(show))}
          </button>

          {pagination != Math.round(products?.length / Number(show)) && (
            <button
              className={`join-item btn ${
                pagination >= Math.round(products?.length / Number(show)) &&
                "btn-disabled"
              }`}
              onClick={() => setPagination(pagination + 1)}
            >
              »
            </button>
          )}
        </div> */}
      </div>
    </>
  );
};

export default Shop;
