"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCartStore();

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1"
              aria-label="Stark Electronics Home"
            >
              <Image 
                src="/logo.png" 
                alt="Stark Electronics Logo" 
                width={40} 
                height={40} 
                className="h-10 w-10 rounded-full object-cover" 
                priority
              />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Stark Electronics</h1>
                <p className="text-xs text-gray-600">Innovation in Electronics</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-current="page"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              About Us
            </Link>
            <Link href="/cart" className="relative" aria-label={`Shopping cart with ${cartItemsCount} items`}>
              <Button 
                variant="ghost" 
                size="icon"
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-describedby="cart-count"
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                {cartItemsCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    id="cart-count"
                    aria-label={`${cartItemsCount} items in cart`}
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
              aria-current="page"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
