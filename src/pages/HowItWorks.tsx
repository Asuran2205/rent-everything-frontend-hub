
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">How It Works</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Renting Made Simple
            </h2>
            <p className="text-gray-600 mb-6">
              RentEverything.Shop makes it easy to rent anything you need, when you need it.
              Our straightforward process ensures a smooth experience from browsing to delivery.
            </p>
          </div>
          
          {/* Steps */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-brand-orange bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-orange">1</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Browse & Choose</h3>
                <p className="text-gray-600">
                  Explore thousands of items across multiple categories and find exactly what you need.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-brand-orange bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-orange">2</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Select Dates</h3>
                <p className="text-gray-600">
                  Choose your rental duration - whether it's hours, days, weeks, or months.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-brand-orange bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-orange">3</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Complete Payment</h3>
                <p className="text-gray-600">
                  Securely pay online with numerous payment options including UPI, cards, and more.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-brand-orange bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-orange">4</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Receive & Return</h3>
                <p className="text-gray-600">
                  Get your item delivered on time and return it when your rental period ends.
                </p>
              </div>
            </div>
          </div>
          
          {/* Process Detail */}
          <div className="mb-16 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Calendar className="mr-3 text-brand-orange" size={24} />
                  <h3 className="text-xl font-semibold">Choose Your Rental Period</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our flexible rental options allow you to rent items for as short as a few hours or as long as several months. Simply select your desired dates and time slots using our intuitive calendar.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Hourly rentals for urgent, short-term needs</li>
                  <li>Daily rentals for weekend projects</li>
                  <li>Weekly rentals for vacations or special events</li>
                  <li>Monthly rentals for longer-term requirements</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe" 
                  alt="Calendar" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1573648857308-a8977836caa3" 
                  alt="Delivery" 
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center mb-4">
                  <Truck className="mr-3 text-brand-purple" size={24} />
                  <h3 className="text-xl font-semibold">Fast, Reliable Delivery</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We offer convenient delivery and pickup for all rental items. Our professional delivery partners ensure your rented items arrive on time and in perfect condition.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Same-day delivery available for many items</li>
                  <li>Scheduled delivery windows to fit your availability</li>
                  <li>Real-time tracking of your delivery</li>
                  <li>Contactless delivery options</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <CreditCard className="mr-3 text-brand-orange" size={24} />
                  <h3 className="text-xl font-semibold">Flexible Payment Options</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We offer a variety of secure payment methods to make your rental experience as convenient as possible.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Credit and debit cards</li>
                  <li>UPI payments</li>
                  <li>Google Pay</li>
                  <li>PhonePe</li>
                  <li>Cash on delivery for select items</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3" 
                  alt="Payment" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c" 
                  alt="Return Process" 
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center mb-4">
                  <CheckCircle className="mr-3 text-brand-purple" size={24} />
                  <h3 className="text-xl font-semibold">Easy Return Process</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  When your rental period ends, returning the item is simple and hassle-free.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Scheduled pickup from your location</li>
                  <li>Flexible return windows</li>
                  <li>Option to extend your rental if needed</li>
                  <li>Quick inspection process</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center py-8 bg-gradient-to-r from-brand-orange/10 to-brand-purple/10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to start renting?</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Browse thousands of items available for rent near you and experience the convenience of RentEverything.Shop.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                  Explore Products
                </Button>
              </Link>
              <Link to="/for-vendor">
                <Button size="lg" variant="outline" className="border-brand-orange text-brand-orange">
                  Become a Vendor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
