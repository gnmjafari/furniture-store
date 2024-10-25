import { products } from "@/components/data";
import { type NextRequest } from "next/server";
import _ from "lodash";

export function GET(request: NextRequest) {
  let productsCopy = [...products];

  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get("page");
  const show = searchParams.get("show");
  const shortBy = searchParams.get("shortBy");

  console.log("page", page);
  console.log("show", show);
  console.log("shortBy", shortBy);

  if (shortBy == "Lowest price") {
    productsCopy = _.sortBy(productsCopy, (item) =>
      item.discount
        ? item.price - item.price * (item.discountPercentage / 100)
        : item.price
    );
  } else if (shortBy == "New") {
    productsCopy = _.sortBy(productsCopy, ["new"]).reverse();
  } else if (shortBy == "Discounted") {
    productsCopy = _.sortBy(productsCopy, ["discount"]).reverse();
  }

  productsCopy = productsCopy.slice(
    Number(show) * (Number(page) - 1),
    Number(show) * (Number(page) - 1) + Number(show)
  );

  return Response.json(
    { products: productsCopy, productsNumber: products.length },
    { status: 200 }
  );
}
