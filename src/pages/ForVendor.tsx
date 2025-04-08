
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  BarChart,
  Package,
  Shield,
  Settings,
  ArrowRight,
} from 'lucide-react';

const ForVendor = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Turn Your Products Into <span className="text-brand-orange">Passive Income</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                List your products on RentEverything.Shop and start earning from items you don't use all the time. Easy setup, flexible control, and secure transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup/vendor">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto border-2 border-brand-orange text-brand-orange bg-white hover:bg-brand-orange hover:text-white"
                  >
                    Become a Vendor
                  </Button>
                </Link>
                <Link to="/login/vendor">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <img
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
                alt="Vendor with products"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why List Your Products With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the advantages of becoming a vendor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Extra Income</h3>
              <p className="text-gray-600">
                Turn your unused items into a steady stream of income. Set your own prices and rental terms.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Management</h3>
              <p className="text-gray-600">
                Our intuitive platform makes it simple to list, track, and manage your rental inventory.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Zero Risk</h3>
              <p className="text-gray-600">
                Your items are protected by our comprehensive insurance policy. Plus, we verify all renters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start earning in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-medium mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Create your vendor account and complete verification. It's free to join!
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange/20 rounded-full flex items-center justify-center text-brand-orange font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-medium mb-3">List Your Items</h3>
              <p className="text-gray-600">
                Add photos, descriptions, pricing, and availability for each product.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange/20 rounded-full flex items-center justify-center text-brand-orange font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-medium mb-3">Accept Bookings</h3>
              <p className="text-gray-600">
                Receive rental requests and accept bookings that work with your schedule.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-medium mb-3">Get Paid</h3>
              <p className="text-gray-600">
                Receive secure payments directly to your account for each completed rental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories for Vendors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top-Performing Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These categories have the highest rental demand
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="font-medium text-gray-900">Electronics</h3>
              <p className="text-sm text-gray-500 mt-2">+85% YoY</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">🛋️</div>
              <h3 className="font-medium text-gray-900">Furniture</h3>
              <p className="text-sm text-gray-500 mt-2">+65% YoY</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">🔨</div>
              <h3 className="font-medium text-gray-900">Tools</h3>
              <p className="text-sm text-gray-500 mt-2">+120% YoY</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="font-medium text-gray-900">Vehicles</h3>
              <p className="text-sm text-gray-500 mt-2">+45% YoY</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">👔</div>
              <h3 className="font-medium text-gray-900">Clothing</h3>
              <p className="text-sm text-gray-500 mt-2">+70% YoY</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">⚽</div>
              <h3 className="font-medium text-gray-900">Sports</h3>
              <p className="text-sm text-gray-500 mt-2">+95% YoY</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-brand-orange text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Vendor Success Stories</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of vendors already earning with us
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">$580+</div>
              <p className="text-xl opacity-90">Average Monthly Earnings</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-3">15,000+</div>
              <p className="text-xl opacity-90">Active Vendors</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-3">92%</div>
              <p className="text-xl opacity-90">Vendor Satisfaction</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-3">48hrs</div>
              <p className="text-xl opacity-90">Average Time to First Rental</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Vendors Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from people who are already earning with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex mb-4">
                <Package className="h-8 w-8 text-brand-orange" />
              </div>
              <p className="text-gray-600 italic mb-6">
                "I was skeptical at first, but now I'm earning over $700 per month renting out my photography equipment that was just sitting in my closet!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold">
                  RM
                </div>
                <div className="ml-4">
                  <p className="font-medium">Robert Miller</p>
                  <p className="text-sm text-gray-500">Photographer & Vendor</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex mb-4">
                <Package className="h-8 w-8 text-brand-orange" />
              </div>
              <p className="text-gray-600 italic mb-6">
                "The platform has been a game-changer for my small business. I can now offer rentals as well as sales, and my revenue has increased by 35%."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold">
                  LJ
                </div>
                <div className="ml-4">
                  <p className="font-medium">Lisa Johnson</p>
                  <p className="text-sm text-gray-500">Tool Shop Owner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex mb-4">
                <Package className="h-8 w-8 text-brand-orange" />
              </div>
              <p className="text-gray-600 italic mb-6">
                "I love that I can set my own rental terms and availability. The platform is so easy to use, and the customer support team is always helpful."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold">
                  DP
                </div>
                <div className="ml-4">
                  <p className="font-medium">David Patel</p>
                  <p className="text-sm text-gray-500">Electronics Vendor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Vendor Tools</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your rental business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="mt-1 mr-4 bg-brand-orange/10 p-3 rounded-full">
                <BarChart className="h-6 w-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600">
                  Track your rental performance, view earnings reports, and get insights on how to optimize your listings.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4 bg-brand-orange/10 p-3 rounded-full">
                <Shield className="h-6 w-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Insurance</h3>
                <p className="text-gray-600">
                  All rentals are covered by our protection policy, ensuring your items are safe and secure.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4 bg-brand-orange/10 p-3 rounded-full">
                <Settings className="h-6 w-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">
                  Set your own availability, block out dates, and manage rental durations based on your preferences.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4 bg-brand-orange/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fast, Secure Payments</h3>
                <p className="text-gray-600">
                  Get paid directly to your bank account with our secure payment processing system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of vendors who are already making money with their idle assets on RentEverything.Shop
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup/vendor">
              <Button size="lg" className="bg-white text-brand-orange hover:bg-gray-100">
                Become a Vendor
              </Button>
            </Link>
            <Link to="/vendor-faq">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-80">
            No subscription fees. We only take a small commission on completed rentals.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ForVendor;
