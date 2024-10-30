"use client";
import Image from "next/image";
import React from "react";
import { menuItem } from "./data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <div className="navbar  fixed z-50 bg-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {menuItem.map((item, key) => {
              return (
                <li key={key}>
                  <Link
                    className={`${
                      `/${item}` === pathname ||
                      (item == "home" && pathname == "/")
                        ? "active"
                        : ""
                    }`}
                    href={`/${item !== "home" ? item.toString() : ""}`}
                  >
                    {item.toUpperCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold">
          <Image
            src="/image/Logo.png"
            alt="Next.js logo"
            width={50}
            height={32}
            priority
          />
          Furniro
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5">
          {menuItem.map((item, key) => {
            return (
              <li key={key} className="font-bold">
                <Link
                  className={`${
                    `/${item}` === pathname ||
                    (item == "home" && pathname == "/")
                      ? "active"
                      : ""
                  }`}
                  href={`/${item !== "home" ? item.toString() : ""}`}
                >
                  {item.toUpperCase()}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end mr-10 gap-10 hidden lg:flex">
        <a className="cursor-pointer">
          <Image
            src="/icon/account.png"
            alt="Next.js account"
            width={20}
            height={20}
            style={{ width: "20px", height: "20px" }}
            priority
          />
        </a>
        <a className="cursor-pointer">
          <Image
            src="/icon/search.png"
            alt="Next.js search"
            width={20}
            height={20}
            style={{ width: "20px", height: "20px" }}
            priority
          />
        </a>
        <a className="cursor-pointer">
          <Image
            src="/icon/favorite.png"
            alt="Next.js favorite"
            width={20}
            height={20}
            style={{ width: "20px", height: "20px" }}
            priority
          />
        </a>
        <a className="cursor-pointer">
          <Image
            src="/icon/Vector.png"
            alt="Next.js Vector"
            width={20}
            height={20}
            style={{ width: "20px", height: "20px" }}
            priority
          />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
