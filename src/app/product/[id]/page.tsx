import { Metadata } from "next";
import ProductDetailClient from "@/components/ProductDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Product Detail",
};

export default async function Page(props: Props) {
  const params = await props.params;

  return <ProductDetailClient params={params} />;
}
