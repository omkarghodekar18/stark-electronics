"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.images[0],
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative w-full h-48">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ₹{product.price}
          </span>
          <div className="flex gap-2">
            <Button onClick={handleAddToCart} variant="outline" size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Link
              href={`/product/${product.id}`}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              View Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
