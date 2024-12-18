/* eslint-disable @typescript-eslint/no-explicit-any */

import { ShoppingCart } from "@/types/types";
import _ from "lodash";
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

  cart = _.filter(cart, (item) => item.quantity !== 0);

  localStorage.setItem("cart", JSON.stringify(cart));
  mutate("cart", cart);
};

export const removeProductFromCart = (productId: number) => {
  const cartString = localStorage.getItem("cart");
  let cart: ShoppingCart[] = [];

  if (cartString) {
    cart = JSON.parse(cartString);
  }

  cart = _.filter(cart, (item) => item.productId !== productId);

  localStorage.setItem("cart", JSON.stringify(cart));
  mutate("cart", cart);
};

export const getShoppingCart = (): ShoppingCart[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const handleComparison = (productId: number) => {
  const getComparison = localStorage.getItem("comparison");
  let comparison: number[] = [];

  if (getComparison) {
    comparison = JSON.parse(getComparison);
  }

  comparison.push(productId);
  const comparisonUniq = _.uniq(comparison);
  localStorage.setItem("comparison", JSON.stringify(comparisonUniq));
  mutate("comparison", comparisonUniq);
};

export const handleComparisonRemove = (productId: number) => {
  const getComparison = localStorage.getItem("comparison");
  let comparison: number[] = [];

  if (getComparison) {
    comparison = JSON.parse(getComparison);
  }

  comparison = _.filter(comparison, (item) => item !== productId);

  localStorage.setItem("comparison", JSON.stringify(comparison));
  mutate("comparison", comparison);
};

export const getComparison = (): string[] => {
  const comparison = localStorage.getItem("comparison");
  return comparison ? JSON.parse(comparison) : [];
};
