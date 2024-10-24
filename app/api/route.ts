import { products } from "@/components/data";

export function GET() {
  return Response.json(products, { status: 200 });
}
