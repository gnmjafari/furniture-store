"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/types";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const productsRes = await fetch("/api");
      const data = await productsRes.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex justify-center items-center flex-wrap gap-20 ">
      {products.map((item, key) => {
        return <ProductCard key={key} item={item} />;
      })}
    </div>
  );
};

export default ProductList;
