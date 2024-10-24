"use client";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { Product } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeSlide, setActiveSlide] = useState<Product>();

  const getProducts = async () => {
    try {
      const productsRes = await fetch("/api");
      const data = await productsRes.json();
      if (data) {
        const firstSlide = data.filter(
          (item: Product) => item.category == "room"
        )[0];
        setProducts(data);

        setActiveSlide(firstSlide);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log("activeSlide", activeSlide);
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
        <ProductList products={products} />
        <button className="btn btn-outline btn-warning mt-5">Show More</button>
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
        <Slider images={products.filter((item) => item.category == "room")} />
      </div>
    </div>
  );
}
