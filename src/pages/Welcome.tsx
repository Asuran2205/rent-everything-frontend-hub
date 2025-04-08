
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Rent Everything You Need
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Your one-stop destination for renting products across categories. 
              Save money, reduce waste, and access quality products on demand.
            </p>
            <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/for-vendor">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                >
                  For Vendors
                </Button>
              </Link>
              <Link to="/for-delivery">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                >
                  For Delivery Partners
                </Button>
              </Link>
              <Link to="/for-customer">
                <Button 
                  size="lg" 
                  className="text-lg bg-gradient-to-r from-brand-orange to-brand-purple text-white hover:opacity-90"
                >
                  For Customers
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-orange/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Rent Anything</h3>
              <p className="text-gray-600">
                From electronics to furniture, tools to vehicles, 
                find everything you need without the commitment of buying.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-purple/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Delivery</h3>
              <p className="text-gray-600">
                Get your rented items delivered right to your doorstep and 
                collected when your rental period is over.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-brand-orange/10 to-brand-purple/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Money</h3>
              <p className="text-gray-600">
                Why buy when you can rent? Save money on items you only need temporarily
                or try before you buy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of rental categories to find exactly what you need
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link to="/categories/electronics" className="group">
              <div className="bg-gray-50 p-6 rounded-lg text-center transition-all group-hover:shadow-md group-hover:-translate-y-1">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="font-medium text-gray-900">Electronics</h3>
              </div>
            </Link>
            
            <Link to="/categories/furniture" className="group">
              <div className="bg-gray-50 p-6 rounded-lg text-center transition-all group-hover:shadow-md group-hover:-translate-y-1">
                <div className="text-4xl mb-3">🛋️</div>
                <h3 className="font-medium text-gray-900">Furniture</h3>
              </div>
            </Link>
            
            <Link to="/categories/tools" className="group">
              <div className="bg-gray-50 p-6 rounded-lg text-center transition-all group-hover:shadow-md group-hover:-translate-y-1">
                <div className="text-4xl mb-3">🔨</div>
                <h3 className="font-medium text-gray-900">Tools</h3>
              </div>
            </Link>
            
            <Link to="/categories/vehicles" className="group">
              <div className="bg-gray-50 p-6 rounded-lg text-center transition-all group-hover:shadow-md group-hover:-translate-y-1">
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="font-medium text-gray-900">Vehicles</h3>
              </div>
            </Link>
            
            <Link to="/categories/clothing" className="group">
              <div className="bg-gray-50 p-6 rounded-lg text-center transition-all group-hover:shadow-md group-hover:-translate-y-1">
                <div className="text-4xl mb-3">👔</div>
                <h3 className="font-medium text-gray-900">Clothing</h3>
              </div>
            </Link>
            
            <Link to="/categories/sports" className="group">
              <div className="bg-gray-50 p-6 rounded-lg text-center transition-all group-hover:shadow-md group-hover:-translate-y-1">
                <div className="text-4xl mb-3">⚽</div>
                <h3 className="font-medium text-gray-900">Sports</h3>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/categories">
              <Button variant="link" className="text-brand-purple hover:text-brand-orange flex items-center gap-1 mx-auto">
                View All Categories <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Renting with us is simple, secure, and hassle-free
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-medium mb-3">Browse</h3>
              <p className="text-gray-600">
                Find the perfect item from our extensive collection across categories.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-orange/20 rounded-full flex items-center justify-center text-brand-orange font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-medium mb-3">Book</h3>
              <p className="text-gray-600">
                Select your rental dates and add the item to your cart.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-purple/20 rounded-full flex items-center justify-center text-brand-purple font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-medium mb-3">Receive</h3>
              <p className="text-gray-600">
                Get your item delivered to your doorstep by our delivery partners.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-medium mb-3">Return</h3>
              <p className="text-gray-600">
                Schedule a pickup when your rental period ends.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/for-customer">
              <Button className="bg-gradient-to-r from-brand-orange to-brand-purple text-white hover:opacity-90">
                Start Renting Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Join As Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Ecosystem</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Be a part of the sharing economy revolution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-brand-orange/5 to-brand-orange/20 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-semibold mb-4 text-brand-orange">For Vendors</h3>
              <p className="text-gray-600 mb-6">
                List your products and earn passive income from your unused or underutilized items.
              </p>
              <Link to="/for-vendor">
                <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-brand-purple/5 to-brand-purple/20 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-semibold mb-4 text-brand-purple">For Delivery Partners</h3>
              <p className="text-gray-600 mb-6">
                Join our network of delivery partners and earn money delivering and collecting rental items.
              </p>
              <Link to="/for-delivery">
                <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-brand-orange/5 to-brand-purple/20 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">For Customers</h3>
              <p className="text-gray-600 mb-6">
                Rent what you need, when you need it, and save money while reducing environmental impact.
              </p>
              <Link to="/for-customer">
                <Button className="bg-gradient-to-r from-brand-orange to-brand-purple text-white hover:opacity-90">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
