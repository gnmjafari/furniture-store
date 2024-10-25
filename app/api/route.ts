import { products } from "@/components/data";
import { type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const show = searchParams.get("show");
  const shortBy = searchParams.get("shortBy");
  console.log("page", page);
  console.log("show", show);
  console.log("shortBy", shortBy);

  return Response.json(products, { status: 200 });
}
