
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Check, 
  Star, 
  Shield, 
  ArrowRight 
} from 'lucide-react';

const ForCustomer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Everything You Need, <span className="gradient-text">On Demand</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Why buy when you can rent? Access thousands of quality products 
                from trusted vendors across multiple categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup/customer">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-brand-orange to-brand-purple hover:opacity-90"
                  >
                    Create Account
                  </Button>
                </Link>
                <Link to="/login/customer">
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
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                alt="Customer using RentEverything.shop" 
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
            <h2 className="text-3xl font-bold mb-4">Why Rent With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of renting instead of buying
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Save Money</h3>
              <p className="text-gray-600">
                Access high-quality products without the hefty price tag of ownership. 
                Pay only for the time you need the item.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Convenience</h3>
              <p className="text-gray-600">
                Doorstep delivery and pickup. No need to worry about maintenance, 
                storage, or disposal when you're done using the product.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-orange/10 to-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality & Safety</h3>
              <p className="text-gray-600">
                All items are verified for quality and safety. Rent with confidence 
                knowing that each product meets our high standards.
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
              Renting made simple in four easy steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-medium mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Create your account in just a few clicks. It's completely free to join.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-orange/20 rounded-full flex items-center justify-center text-brand-orange font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-medium mb-3">Browse & Select</h3>
              <p className="text-gray-600">
                Find what you need from thousands of products across various categories.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple/20 rounded-full flex items-center justify-center text-brand-purple font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-medium mb-3">Schedule & Pay</h3>
              <p className="text-gray-600">
                Choose your rental dates and make a secure payment online.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-medium mb-3">Receive & Enjoy</h3>
              <p className="text-gray-600">
                Get your item delivered to your doorstep and return when you're done.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what other customers are renting
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
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from people who have rented with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-600 italic mb-6">
                "Renting a camera for my vacation saved me hundreds of dollars. The quality was excellent and the delivery was right on time."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold">
                  JD
                </div>
                <div className="ml-4">
                  <p className="font-medium">Jessica Davies</p>
                  <p className="text-sm text-gray-500">Photographer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-600 italic mb-6">
                "I needed furniture for a temporary apartment while relocating. The process was seamless and the quality was amazing."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-brand-purple text-white rounded-full flex items-center justify-center font-bold">
                  MT
                </div>
                <div className="ml-4">
                  <p className="font-medium">Michael Thompson</p>
                  <p className="text-sm text-gray-500">Business Consultant</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-600 italic mb-6">
                "As a DIY enthusiast, I love being able to rent professional tools for my projects without the commitment of buying them."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-orange to-brand-purple text-white rounded-full flex items-center justify-center font-bold">
                  SE
                </div>
                <div className="ml-4">
                  <p className="font-medium">Sarah Edwards</p>
                  <p className="text-sm text-gray-500">Interior Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-orange to-brand-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Renting?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of satisfied customers who are saving money and reducing waste with RentEverything.Shop
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup/customer">
              <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
                Create Account
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForCustomer;
