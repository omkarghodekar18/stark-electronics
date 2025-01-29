import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const featuredProduct = {
  id: '1',
  name: 'Arduino Starter Kit',
  price: 1200,
  description: 'Complete Arduino starter kit with everything you need to begin your electronics journey.',
  images: ['https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800'],
  specifications: [],
  components: [],
};

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Arduino Starter Kit</h1>
              <p className="text-lg mb-6">Start your electronics journey with our comprehensive starter kit.</p>
              <div className="mb-8">
                <span className="text-3xl font-bold">₹1,200</span>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div>
              <img
                src={featuredProduct.images[0]}
                alt="Arduino Starter Kit"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard product={featuredProduct} />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Vision & Mission</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Empowering creators and innovators with quality electronic components and educational resources.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Vision</h3>
              <p className="text-gray-600">To be the leading provider of electronic components and educational resources in India.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Mission</h3>
              <p className="text-gray-600">To provide high-quality, affordable electronic components and comprehensive learning resources.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Values</h3>
              <p className="text-gray-600">Quality, Innovation, Education, Customer Success</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}