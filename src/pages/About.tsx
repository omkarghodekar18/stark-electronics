import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-8">About Built It</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
              <p className="text-gray-600 mb-6">
                Built It is India's premier provider of electronic components and educational resources.
                We're passionate about making electronics accessible to everyone through quality products
                and comprehensive learning materials.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To empower creators and innovators by providing high-quality electronic components
                and educational resources at affordable prices.
              </p>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Why Choose Us?</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Premium Quality Products</li>
                  <li>Affordable Pricing</li>
                  <li>Expert Technical Support</li>
                  <li>Fast & Reliable Delivery</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:builtit24@gmail.com" className="text-blue-600 hover:text-blue-700">
                      builtit24@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold">Phone Numbers</h3>
                    <div className="space-y-1">
                      <p>+91 96733256</p>
                      <p>+91 8999221747</p>
                      <p>+91 8218962183</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}