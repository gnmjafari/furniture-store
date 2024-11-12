"use client";
import {
  calculateDiscountedPrice,
  fetcher,
  getComparison,
  handleComparison,
  handleShoppingCart,
} from "@/components/utils";
import { Product } from "@/types/types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

type comparisonProductList = {
  comparisonList: Product[];
};

type allProducts = {
  products: Product[];
};

const Comparison: NextPage = () => {
  const { data: comparison } = useSWR<string[]>("comparison", () =>
    getComparison()
  );

  const { data: comparisonProductList } = useSWR<comparisonProductList>(
    comparison ? `/api/comparison/?comparisonList=${comparison}` : null,
    comparison ? fetcher : null
  );

  const { data: allProducts } = useSWR<allProducts>("/api", fetcher);

  console.log("comparisonProductList", comparisonProductList);
  return (
    <React.Fragment>
      <div
        className="w-full pt-10 h-80 flex flex-col justify-center items-center "
        style={{
          backgroundImage: `url('/image/shop-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="card-title text-4xl">Product Comparison</div>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Comparison</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="overflow-x-auto m-10">
        <table className="table">
          <thead>
            <tr>
              <th className="text-3xl flex flex-col justify-start items-start">
                <span className="text-black">Go to Product </span>
                <span className="text-black">page for more</span>
                <span className="text-black">Products</span>
                <Link href="/shop" className="mt-2 text-sm underline">
                  View More
                </Link>
                <label className="form-control w-full max-w-xs my-5">
                  <div className="label">
                    <span className="label-text text-lg">Add Product</span>
                  </div>
                  <select
                    className="select select-warning w-full max-w-xs "
                    value="Choose a Product"
                    onChange={(e) => handleComparison(Number(e.target.value))}
                  >
                    <option disabled value="Choose a Product">
                      Choose a Product
                    </option>
                    {allProducts?.products.map((item, key) => {
                      return (
                        <option value={item.id} key={key}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </th>
              {comparisonProductList?.comparisonList.map((item, key) => {
                const formattedPrice = item.price.toLocaleString("en");

                return (
                  <td key={key}>
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <div className="relative w-44 h-32  rounded-lg overflow-hidden">
                        <Image
                          className="object-cover"
                          src={item.image}
                          alt={item.name}
                          fill
                        />
                      </div>
                      <div className="text-xl">{item.name}</div>
                      <div className="flex gap-1">
                        {item.discount ? (
                          <>
                            <span>Rs.</span>
                            <span className="mx-1 line-through">
                              {formattedPrice}
                            </span>
                            <span className="mx-1">
                              {calculateDiscountedPrice(
                                item.price,
                                item.discountPercentage
                              )}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>Rs.</span>
                            <span className="mx-1">{formattedPrice}</span>
                          </>
                        )}
                      </div>
                      <div className="rating rating-xs">
                        <span className="mr-1">4.7</span>
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
                    </div>
                  </td>
                );
              })}
            </tr>
          </thead>
          {comparisonProductList &&
            comparisonProductList.comparisonList.length > 0 && (
              <tbody>
                <tr>
                  <th className="text-2xl">General</th>
                </tr>
                <tr className="hover">
                  <th>Sales Package</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.general.sales_package}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Model Number</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.general.model_number}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Secondary Material</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.general.secondary_material}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Configuration</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.general.configuration}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Upholstery Material</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return (
                      <td key={key}>{item.general.upholstery_material}</td>
                    );
                  })}
                </tr>
                <tr className="hover">
                  <th>Upholstery Color</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.general.upholstery_color}</td>;
                  })}
                </tr>
                <tr>
                  <th className="text-2xl">Product</th>
                </tr>
                <tr className="hover">
                  <th>Upholstery Color</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.product.filling_material}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Finish Type</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.product.finish_type}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Adjustable Headrest</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return (
                      <td key={key}>{item.product.adjustable_headrest}</td>
                    );
                  })}
                </tr>
                <tr className="hover">
                  <th>Maximum Load Capacity</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return (
                      <td key={key}>{item.product.maximum_load_capacity}</td>
                    );
                  })}
                </tr>
                <tr className="hover">
                  <th>Origin of Manufacture</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return (
                      <td key={key}>{item.product.origin_of_manufacture}</td>
                    );
                  })}
                </tr>
                <tr>
                  <th className="text-2xl">Dimensions</th>
                </tr>
                <tr className="hover">
                  <th>Width</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.dimensions.width}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Height</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.dimensions.height}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Depth</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.dimensions.depth}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Weight</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.dimensions.weight}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Seat Height</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.dimensions.seat_height}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Leg Height</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.dimensions.leg_height}</td>;
                  })}
                </tr>
                <tr>
                  <th className="text-2xl">Warranty</th>
                </tr>
                <tr className="hover">
                  <th>Warranty Summary</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.warranty.warranty_summary}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th>Warranty Service Type</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return (
                      <td key={key}>{item.warranty.warranty_service_type}</td>
                    );
                  })}
                </tr>
                <tr className="hover">
                  <th>Covered in Warranty</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return (
                      <td key={key}>{item.warranty.covered_in_warranty}</td>
                    );
                  })}
                </tr>
                <tr className="hover">
                  <th>Not Covered in Warranty</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return (
                      <td key={key}>{item.warranty.not_covered_in_warranty}</td>
                    );
                  })}
                </tr>
                <tr className="hover">
                  <th>Domestic Warranty</th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return <td key={key}>{item.warranty.domestic_warranty}</td>;
                  })}
                </tr>
                <tr className="hover">
                  <th> </th>
                  {comparisonProductList.comparisonList.map((item, key) => {
                    return (
                      <td key={key}>
                        <button
                          onClick={() => {
                            handleShoppingCart(item.id, "Increase");
                          }}
                          className="btn   btn-warning"
                        >
                          Add to cart
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            )}
        </table>
      </div>

      <div className="flex flex-wrap justify-between bg-[#F9F1E7] w-full p-10 gap-10 mt-16">
        <div className="flex flex-1 justify-center items-center gap-5 min-w-60">
          <Image
            src="/icon/trophy 1.png"
            alt="trophy 1"
            width={60}
            height={60}
            priority
          />
          <div>
            <div className="text-2xl mb-1">High Quality</div>
            <div className="opacity-50">crafted from top materials</div>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center gap-5 min-w-60">
          <Image
            src="/icon/guarantee.png"
            alt="guarantee"
            width={60}
            height={60}
            priority
          />
          <div>
            <div className="text-2xl">High Quality</div>
            <div className="opacity-50">crafted from top materials</div>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center gap-5 min-w-60">
          <Image
            src="/icon/shipping.png"
            alt="shipping"
            width={60}
            height={60}
            priority
          />
          <div>
            <div className="text-2xl">High Quality</div>
            <div className="opacity-50">crafted from top materials</div>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center gap-5 min-w-60">
          <Image
            src="/icon/customer-support.png"
            alt="customer-support"
            width={60}
            height={60}
            priority
          />
          <div>
            <div className="text-2xl">High Quality</div>
            <div className="opacity-50">crafted from top materials</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Comparison;
