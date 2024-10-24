import { NextPage } from "next";
import React from "react";

const Shop: NextPage = () => {
  return (
    <div
      className="w-full pt-10 h-80 flex flex-col justify-center items-center"
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
  );
};

export default Shop;
