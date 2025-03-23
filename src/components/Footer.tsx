"use client";

import Link from "next/link";
import {
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Wrench,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-12 pb-6 px-10 font-sans tracking-wide">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:flex lg:flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-xl font-bold text-white">Stark Electronics</h1>
                <p className="text-xs text-gray-300">Just Built It</p>
              </div>
            </Link>
            <p className="text-gray-300 text-sm">
              Your one-stop shop for electronic components and Arduino starter
              kits. Quality products at affordable prices.
            </p>
          </div>

          {/* Contact Information */}
          <div className="lg:flex lg:flex-col space-y-4">
            <h4 className="text-lg mb-4 text-white">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="mailto:builtit24@gmail.com"
                className="flex items-center text-gray-300 hover:text-white"
              >
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">builtit24@gmail.com</span>
              </a>
              <a
                href="tel:+918999221747"
                className="flex items-center text-gray-300 hover:text-white"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+91 8999221747</span>
              </a>
              <a
                href="tel:+919673353256"
                className="flex items-center text-gray-300 hover:text-white"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+91 9673353256</span>
              </a>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">Pune, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4 pl-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/product/arduino-kits"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Arduino Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg mb-6 text-white">Legal</h4>
            <ul className="space-y-4 pl-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Built It. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
