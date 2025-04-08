
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Truck,
  Clock,
  MapPin,
  DollarSign,
  Shield,
  Calendar,
  ArrowRight
} from 'lucide-react';

const ForDelivery = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Earn On Your <span className="text-brand-purple">Own Schedule</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Join our network of delivery partners and make money delivering rental items to customers. Flexible hours, competitive pay, and full control over your work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup/delivery">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto border-2 border-brand-purple text-brand-purple bg-white hover:bg-brand-purple hover:text-white"
                  >
                    Become a Delivery Partner
                  </Button>
                </Link>
                <Link to="/login/delivery">
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
                src="https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=2000"
                alt="Delivery Partner"
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
            <h2 className="text-3xl font-bold mb-4">Why Become a Delivery Partner?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the advantages of joining our network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Competitive Pay</h3>
              <p className="text-gray-600">
                Earn competitive rates per delivery plus tips. Get paid weekly with transparent earnings reports.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Flexible Hours</h3>
              <p className="text-gray-600">
                Work when you want. You set your own schedule and choose the deliveries that fit your availability.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Insurance Coverage</h3>
              <p className="text-gray-600">
                You're covered by our insurance policy while making deliveries, giving you peace of mind.
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
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-medium mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Complete your profile and verification process to join our network of delivery partners.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple/20 rounded-full flex items-center justify-center text-brand-purple font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-medium mb-3">Set Availability</h3>
              <p className="text-gray-600">
                Mark the days and times you're available for deliveries in your dashboard.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple/20 rounded-full flex items-center justify-center text-brand-purple font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-medium mb-3">Accept Deliveries</h3>
              <p className="text-gray-600">
                Receive delivery requests through the app and accept the ones that work for you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-medium mb-3">Get Paid</h3>
              <p className="text-gray-600">
                Complete deliveries and get paid weekly. Track your earnings in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Types of Deliveries</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Various delivery opportunities to fit your vehicle and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-brand-purple/10 rounded-full mr-4">
                  <Truck className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-medium">Small Items</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Perfect for bicycles, scooters, or small cars. Deliver electronics, clothing, small tools, and more.
              </p>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="text-brand-purple mr-2">✓</span>
                  Quick deliveries
                </li>
                <li className="flex items-center">
                  <span className="text-brand-purple mr-2">✓</span>
                  Higher volume
                </li>
                <li className="flex items-center">
                  <span className="text-brand-purple mr-2">✓</span>
                  Less effort required
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Average earnings: $15-25 per delivery
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-brand-purple/10 rounded-full mr-4">
                  <Truck className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-medium">Medium Items</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Suitable for sedans or small SUVs. Deliver medium-sized electronics, small furniture, and sports equipment.
              </p>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="text-brand-purple mr-2">✓</span>
                  Balanced delivery time
                </li>
                <li className="flex items-center">
                  <span className="text-brand-purple mr-2">✓</span>
                  Good earning potential
                </li>
                <li className="flex items-center">
                  <span className="text-brand-purple mr-2">✓</span>
                  Moderate effort required
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Average earnings: $25-40 per delivery
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-brand-purple/10 rounded-full mr-4">
                  <Truck className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-medium">Large Items</h3>
              </div>
              <p className="text-gray-600 mb-4">
                For trucks, vans, or large SUVs. Deliver furniture, appliances, large equipment, and more.
              </p>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="text-brand-purple mr-2">✓</span>
                  Higher pay per delivery
                </li>
                <li className="flex items-center">
                  <span className="text-brand-purple mr-2">✓</span>
                  Fewer deliveries needed
                </li>
                <li className="flex items-center">
                  <span className="text-brand-purple mr-2">✓</span>
                  May require assistance
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Average earnings: $40-80 per delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-brand-purple text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Delivery Partner Success</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join our growing network of successful delivery partners
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-3">$750+</div>
              <p className="text-xl opacity-90">Average Weekly Earnings</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-3">5,000+</div>
              <p className="text-xl opacity-90">Active Delivery Partners</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-3">95%</div>
              <p className="text-xl opacity-90">Partner Satisfaction</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-3">15+</div>
              <p className="text-xl opacity-90">Deliveries Per Week (Avg)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Delivery Partners Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from people who are already earning with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex mb-4">
                <Truck className="h-8 w-8 text-brand-purple" />
              </div>
              <p className="text-gray-600 italic mb-6">
                "I deliver packages in the evenings after my main job. It's an easy way to make an extra $500-600 a week, and I get to set my own hours."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-brand-purple text-white rounded-full flex items-center justify-center font-bold">
                  JT
                </div>
                <div className="ml-4">
                  <p className="font-medium">James Thompson</p>
                  <p className="text-sm text-gray-500">Part-time Delivery Partner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex mb-4">
                <Truck className="h-8 w-8 text-brand-purple" />
              </div>
              <p className="text-gray-600 italic mb-6">
                "After losing my job, I started delivering full-time and was surprised by how much I could make. The flexible schedule lets me be there for my kids too."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-brand-purple text-white rounded-full flex items-center justify-center font-bold">
                  AM
                </div>
                <div className="ml-4">
                  <p className="font-medium">Aisha Mohammed</p>
                  <p className="text-sm text-gray-500">Full-time Delivery Partner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex mb-4">
                <Truck className="h-8 w-8 text-brand-purple" />
              </div>
              <p className="text-gray-600 italic mb-6">
                "I'm a student and this job fits perfectly around my classes. The app is easy to use, and I can work as much or as little as I want each week."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-brand-purple text-white rounded-full flex items-center justify-center font-bold">
                  KL
                </div>
                <div className="ml-4">
                  <p className="font-medium">Kevin Lee</p>
                  <p className="text-sm text-gray-500">Student & Weekend Delivery Partner</p>
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
            <h2 className="text-3xl font-bold mb-4">Delivery Partner Tools</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed as a delivery partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="mt-1 mr-4 bg-brand-purple/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-brand-purple" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Efficient Routing</h3>
                <p className="text-gray-600">
                  Our app provides optimized routes to help you complete more deliveries in less time.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4 bg-brand-purple/10 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-brand-purple" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">
                  Set your availability by day and time, and only receive delivery requests during those periods.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4 bg-brand-purple/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-brand-purple" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Instant Earnings Tracking</h3>
                <p className="text-gray-600">
                  View your earnings in real-time, with detailed breakdowns of base pay, bonuses, and tips.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4 bg-brand-purple/10 p-3 rounded-full">
                <Shield className="h-6 w-6 text-brand-purple" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Safety Features</h3>
                <p className="text-gray-600">
                  In-app support, emergency assistance, and insurance coverage for peace of mind while delivering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Requirements</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What you need to become a delivery partner
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-brand-purple font-bold text-xl mr-3">•</span>
                  <div>
                    <p className="font-medium">Be at least 18 years old</p>
                    <p className="text-gray-600 text-sm">Valid ID required for verification</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-purple font-bold text-xl mr-3">•</span>
                  <div>
                    <p className="font-medium">Have access to a vehicle</p>
                    <p className="text-gray-600 text-sm">Car, truck, van, bicycle, or scooter depending on delivery type</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-purple font-bold text-xl mr-3">•</span>
                  <div>
                    <p className="font-medium">Valid driver's license and insurance</p>
                    <p className="text-gray-600 text-sm">For motor vehicle operators</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-purple font-bold text-xl mr-3">•</span>
                  <div>
                    <p className="font-medium">Smartphone with data plan</p>
                    <p className="text-gray-600 text-sm">To use our delivery partner app</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-purple font-bold text-xl mr-3">•</span>
                  <div>
                    <p className="font-medium">Pass a background check</p>
                    <p className="text-gray-600 text-sm">For safety and security purposes</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Join our team of delivery partners today and enjoy flexible work with competitive pay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup/delivery">
              <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
                Apply Now
              </Button>
            </Link>
            <Link to="/delivery-faq">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-80">
            Start earning within 48 hours of approval. No fees to join.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ForDelivery;
