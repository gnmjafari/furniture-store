import React, { FunctionComponent } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/types";

type ProductListProps = {
  products: Product[];
  howDisplay: "group" | "single";
};

const ProductList: FunctionComponent<ProductListProps> = ({
  products,
  howDisplay = "group",
}) => {
  return (
    <div
      className={`flex ${
        howDisplay === "single" ? "flex-col" : "flex-row"
      } justify-center items-center flex-wrap gap-20`}
    >
      {products.map((item, key) => {
        return <ProductCard key={key} item={item} howDisplay={howDisplay} />;
      })}
    </div>
  );
};

export default ProductList;
