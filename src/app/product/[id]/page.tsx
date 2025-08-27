import { Metadata } from "next";
import ProductDetailClient from "@/components/ProductDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;
  
  // In a real app, fetch product data here
  const productName = id === 'arduino-kits' ? 'Arduino Starter Kit' : 'Electronic Component';
  const price = '₹1,099';
  
  return {
    title: `${productName} - ${price}`,
    description: `Buy ${productName} online. Complete electronics kit with Arduino UNO, sensors, components and more. Perfect for beginners and students. Free shipping across India.`,
    keywords: ['arduino starter kit', 'electronics kit', 'arduino uno', 'sensors', 'components', 'buy online india'],
    openGraph: {
      title: `${productName} - ${price} | Stark Electronics`,
      description: `Premium ${productName} with all components included. Perfect for learning electronics and programming.`,
      images: [{
        url: '/product-images/arduino-kit-og.jpg',
        width: 1200,
        height: 630,
        alt: productName
      }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${productName} - ${price}`,
      description: `Premium ${productName} with all components included.`
    }
  };
}

export default async function Page(props: Props) {
  const params = await props.params;

  return <ProductDetailClient params={params} />;
}
