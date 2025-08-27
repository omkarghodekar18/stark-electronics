import { ArrowRight, Users, Package, Truck, Award, Star, Shield, Zap, Headphones } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Stark Electronics',
  description: 'Premium Arduino starter kits, electronic components, and educational resources',
  url: 'https://starkelectronics.in',
  logo: 'https://starkelectronics.in/logo.png',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressLocality: 'India'
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '99',
    highPrice: '5999',
    offerCount: '50+'
  }
};

const featuredProduct = {
  id: "arduino-kits",
  name: "Arduino Starter Kit",
  price: 1099,
  description:
    "Complete Arduino starter kit with everything you need to begin your electronics journey.",
  images: [
    "https://i.postimg.cc/Xv0y7C5r/1.jpg",
  ],
  specifications: [],
  components: [],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 bg-blue-600/20 border border-blue-400/30 rounded-full text-sm font-medium text-blue-300">
                <Zap className="h-4 w-4 mr-2" />
                New Arduino Starter Kit
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Power Your 
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Innovation</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Complete Arduino starter kit with everything you need to begin your electronics journey. Perfect for beginners and students.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-white">₹1,099</div>
                <div className="text-sm text-gray-400 line-through">₹1,499</div>
                <div className="px-2 py-1 bg-green-600 rounded-md text-xs font-semibold">27% OFF</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/product/arduino-kits">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
                <button className="border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
                  View Components
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-3xl transform rotate-6"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={featuredProduct.images[0]}
                    alt="Arduino Starter Kit - Complete electronics learning kit with Arduino UNO"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-full">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Package className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Products Available</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <Truck className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24hrs</div>
              <div className="text-gray-600">Fast Delivery</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Stark Electronics?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide premium electronic components and comprehensive learning resources to help you build amazing projects.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Guaranteed</h3>
              <p className="text-gray-600 leading-relaxed">
                All our products undergo rigorous quality testing to ensure they meet the highest standards for your projects.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast Shipping</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your components delivered quickly with our reliable shipping network across India.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our technical team is here to help you with any questions about components or project guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our most popular electronic components and starter kits</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard product={featuredProduct} />
            <div className="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">More products coming soon!</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Browse our catalog</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by thousands of makers and students across India</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Excellent quality components and super fast delivery! The Arduino kit helped me get started with electronics. Highly recommended for beginners."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-semibold text-blue-600">A</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Arjun Patel</p>
                  <p className="text-sm text-gray-600">Engineering Student</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Great customer support and authentic products. I've built multiple projects with components from Stark Electronics. Keep up the good work!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-semibold text-green-600">P</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Priya Sharma</p>
                  <p className="text-sm text-gray-600">IoT Developer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Perfect for our college electronics lab. Bulk orders are processed efficiently and all components work as expected. Reliable supplier!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-semibold text-purple-600">R</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Prof. Rajesh Kumar</p>
                  <p className="text-sm text-gray-600">IIT Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Building?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of makers, students, and engineers who trust Stark Electronics for their projects. Get started with our comprehensive Arduino kits today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/product/arduino-kits">
              <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center">
                <Package className="mr-3 h-6 w-6" />
                Shop Arduino Kits
              </button>
            </Link>
            <Link href="/about">
              <button className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 inline-flex items-center">
                <Users className="mr-3 h-6 w-6" />
                Learn More
              </button>
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-sm text-blue-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24hrs</div>
              <div className="text-sm text-blue-200">Fast Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-blue-200">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Institutions</h2>
            <p className="text-gray-600">Serving educational institutions and makers across India</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
            <div className="flex justify-center">
              <div className="bg-gray-100 px-6 py-4 rounded-lg">
                <span className="font-bold text-gray-800">IIT Delhi</span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-100 px-6 py-4 rounded-lg">
                <span className="font-bold text-gray-800">NIT Pune</span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-100 px-6 py-4 rounded-lg">
                <span className="font-bold text-gray-800">VIT</span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-100 px-6 py-4 rounded-lg">
                <span className="font-bold text-gray-800">BITS</span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-100 px-6 py-4 rounded-lg">
                <span className="font-bold text-gray-800">SRM</span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-100 px-6 py-4 rounded-lg">
                <span className="font-bold text-gray-800">MIT</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
