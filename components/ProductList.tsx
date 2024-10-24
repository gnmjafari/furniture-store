import React, { FunctionComponent } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/types";

type ProductListProps = {
  products: Product[];
};

const ProductList: FunctionComponent<ProductListProps> = ({ products }) => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-20 ">
      {products.map((item, key) => {
        return <ProductCard key={key} item={item} />;
      })}
    </div>
  );
};

export default ProductList;
