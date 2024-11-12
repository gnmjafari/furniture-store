import { type NextRequest } from "next/server";
import { products } from "@/components/data";
import _ from "lodash";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const getReqParams = searchParams.get("comparisonList");
  const reqParamsSplit = getReqParams?.split(",") || [];

  const product = _.filter(products, (item) =>
    _.includes(reqParamsSplit, `${item.id}`)
  );

  return Response.json({ comparisonList: product || [] }, { status: 200 });
}
