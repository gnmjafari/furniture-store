"use client";
import ProductCardLoading from "@/components/ProductCardLoading";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { fetcher } from "@/components/utils";
import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data, isLoading } = useSWR("/api", fetcher);

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div
        className="min-w-full h-svh"
        style={{
          backgroundImage: `url('/image/cover.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex flex-col gap-1 justify-center items-center">
        <div className="font-extrabold text-xl">Browse The Range</div>
        <div className="font-normal text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="flex justify-center items-center mt-10 gap-5 flex-wrap">
          <div className="flex flex-col gap-5 justify-center items-center flex-1 overflow-hidden rounded-md text-xl">
            <Image
              src="/image/dining.png"
              alt="Next.js dining"
              width={381}
              height={490}
              priority
            />
            Dining
          </div>
          <div className="flex flex-col gap-5 justify-center items-center flex-1 overflow-hidden rounded-md text-xl">
            <Image
              src="/image/living.png"
              alt="Next.js living"
              width={381}
              height={490}
              priority
            />
            Living
          </div>
          <div className="flex flex-col gap-5 justify-center items-center flex-1 overflow-hidden rounded-md text-xl">
            <Image
              src="/image/bedroom.png"
              alt="Next.js bedroom"
              width={381}
              height={490}
              priority
            />
            Bedroom
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-10 justify-center items-center gap-10">
        <div className="font-extrabold text-2xl">Our Products</div>
        {isLoading || !data?.products ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-20">
            <ProductCardLoading />
            <ProductCardLoading />
            <ProductCardLoading />
            <ProductCardLoading />
          </div>
        ) : (
          <ProductList
            products={data?.products.slice(0, 8)}
            howDisplay="group"
          />
        )}
        <button className="btn btn-outline btn-warning mt-5">
          <Link href="/shop">Show More</Link>
        </button>
      </div>

      <div className="card p-5 bg-[#FCF8F3] w-full shadow-xl items-center justify-center flex-row flex-wrap">
        <div className="card-body w-1/3">
          <h2 className="card-title">50+ Beautiful rooms inspiration</h2>
          <p>
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
          <div className="card-actions justify-start">
            <button className="btn btn-warning">Explore More</button>
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1  gap-20 relative">
            <ProductCardLoading />
          </div>
        ) : (
          <Slider
            images={data?.products.filter(
              (item: Product) => item.category == "room"
            )}
          />
        )}
      </div>

      <div className="flex flex-col mt-10 justify-center items-center gap-10 mb-10">
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="font-medium text-lg">Share your setup with</div>
          <div className="font-extrabold text-2xl">#FuniroFurniture</div>
        </div>

        <div className="w-full hidden lg:flex">
          <div className="grid lg:grid-cols-5 gap-5">
            <div className="col-span-2 flex justify-center items-center overflow-hidden">
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-2">
                  <Image
                    src="/products/Rectangle 36.png"
                    alt="Rectangle 36"
                    width={100}
                    height={382}
                    priority
                    style={{
                      width: "100px",
                      height: "382px",
                    }}
                  />

                  <Image
                    src="/products/Rectangle 38.png"
                    alt="Rectangle 38"
                    width={451}
                    height={312}
                    style={{
                      width: "451px",
                      height: "312px",
                    }}
                    priority
                  />
                </div>
                <div className="flex items-start gap-2">
                  <Image
                    src="/products/Rectangle 37.png"
                    alt="Rectangle 37"
                    width={200}
                    height={323}
                    priority
                    style={{
                      width: "200px",
                      height: "323px",
                    }}
                  />

                  <Image
                    src="/products/Rectangle 39.png"
                    alt="Rectangle 39"
                    width={351}
                    height={242}
                    style={{
                      width: "351px",
                      height: "242px",
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 flex justify-center items-center overflow-hidden">
              <Image
                src="/products/Rectangle 40.png"
                alt="Rectangle 40"
                width={295}
                height={392}
                style={{
                  width: "100%",
                  height: "392px",
                }}
                priority
              />
            </div>
            <div className="col-span-2 flex justify-center items-center overflow-hidden">
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-2">
                  <Image
                    src="/products/Rectangle 43.png"
                    alt="Rectangle 43"
                    width={290}
                    height={348}
                    style={{
                      width: "290px",
                      height: "348px",
                    }}
                    priority
                  />
                  <Image
                    src="/products/Rectangle 45.png"
                    alt="Rectangle 45"
                    width={200}
                    height={433}
                    style={{
                      width: "220px",
                      height: "433px",
                    }}
                    priority
                  />
                </div>
                <div className="flex items-start gap-2">
                  <Image
                    src="/products/Rectangle 41.png"
                    alt="Rectangle 41"
                    width={178}
                    height={242}
                    style={{
                      width: "178px",
                      height: "242px",
                    }}
                    priority
                  />
                  <Image
                    src="/products/Rectangle 44.png"
                    alt="Rectangle 44"
                    width={262}
                    height={196}
                    style={{
                      width: "262px",
                      height: "196px",
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
