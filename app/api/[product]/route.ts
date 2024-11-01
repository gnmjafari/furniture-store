import { products } from "@/components/data";
import _ from "lodash";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ product: string }> }
) {
  const productId = (await params).product;
  const product = _.find(products, { id: Number(productId) });

  if (product) {
    return Response.json({ product }, { status: 200 });
  } else {
    return Response.json(
      { message: "There is no such product" },
      { status: 404 }
    );
  }
}
