"use client";

import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const customerName = searchParams.get("customerName") || "valued customer";

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you {customerName} for your order! We&apos;ll process it right
          away.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default function ThankYou() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6" />
              <div className="h-8 bg-gray-200 rounded mb-4" />
              <div className="h-6 bg-gray-200 rounded mb-8" />
              <div className="h-12 w-40 bg-gray-200 rounded-lg mx-auto" />
            </div>
          </div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
