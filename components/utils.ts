/* eslint-disable @typescript-eslint/no-explicit-any */

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
