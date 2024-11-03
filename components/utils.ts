/* eslint-disable @typescript-eslint/no-explicit-any */

import { ShoppingCart } from "@/types/types";
import { mutate } from "swr";

export const fetcher = async (
  ...args: [RequestInfo, RequestInit?]
): Promise<any> => {
  const res = await fetch(...args);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  return res.json();
};

export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
) => {
  const discountAmount = (price * discountPercentage) / 100;
  const finalPrice = price - discountAmount;
  return finalPrice.toLocaleString("en");
};

export const handleShoppingCart = (
  productId: number,
  quantityType: "Increase" | "Decrease"
): void => {
  const cartString = localStorage.getItem("cart");
  let cart: ShoppingCart[] = [];

  if (cartString) {
    cart = JSON.parse(cartString);
  }

  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    if (quantityType == "Increase") {
      existingItem.quantity += 1;
    } else if (quantityType == "Decrease") {
      existingItem.quantity -= 1;
    }
  } else {
    cart.push({ productId: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  mutate("cart", cart);
};

export const getShoppingCart = (): ShoppingCart[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};
