
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  ShoppingCart,
  Heart,
  Home,
  Clock,
  Settings,
  CreditCard,
  MapPin,
  Package,
} from 'lucide-react';
import { orders } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('orders');

  React.useEffect(() => {
    if (location.state?.orderPlaced) {
      // If coming from successful checkout, show the orders tab
      setActiveTab('orders');
    }
  }, [location.state]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-6 md:mb-0">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-14 w-14 mr-4">
                  <AvatarFallback className="bg-brand-purple text-white">
                    {user?.name ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold text-lg">{user?.name || 'User'}</h2>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
              <div className="border-t pt-4 mt-2">
                <p className="text-sm text-gray-500">Member since April 2025</p>
              </div>
            </div>

            <nav className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'orders' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <Package className="h-5 w-5 mr-3" />
                <span>My Orders</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'wishlist' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart className="h-5 w-5 mr-3" />
                <span>Wishlist</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'cart' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('cart')}
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                <span>Cart</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'history' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('history')}
              >
                <Clock className="h-5 w-5 mr-3" />
                <span>Browsing History</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'addresses' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('addresses')}
              >
                <MapPin className="h-5 w-5 mr-3" />
                <span>Addresses</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'payment' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('payment')}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Payment Methods</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'settings' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Account Settings</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                
                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <Card key={order.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-6">
                            <div className="flex justify-between mb-4">
                              <div className="text-sm text-gray-500">
                                Order #{order.id}
                              </div>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row">
                              <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0">
                                <img
                                  src={order.productImage}
                                  alt={order.productName}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                              <div className="flex-1 sm:ml-6">
                                <h3 className="font-medium text-lg">{order.productName}</h3>
                                <p className="text-gray-600 mb-2">
                                  Rental Period: {order.startDate} - {order.endDate} ({order.rentalPeriod})
                                </p>
                                <p className="text-gray-600">Vendor: {order.vendorName}</p>
                                <p className="text-gray-600 mb-4">Delivery Address: {order.deliveryAddress}</p>
                                
                                <div className="flex justify-between items-center">
                                  <div className="font-medium">
                                    Total: <span className="text-brand-orange">${order.totalPrice.toFixed(2)}</span>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {order.status === 'delivered' && (
                            <div className="bg-gray-50 p-4 border-t">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">How was your experience?</p>
                                  <p className="text-sm text-gray-500">Leave a review for this product</p>
                                </div>
                                <Button variant="outline" size="sm">
                                  Write a Review
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">
                      When you rent products, your orders will appear here
                    </p>
                    <Button variant="default" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Start Shopping
                    </Button>
                  </div>
                )}
                
                {location.state?.orderPlaced && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium">
                      Your order has been successfully placed! Our delivery partner will contact you soon.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-6">
                    Save items you want to rent later by clicking the heart icon on product pages
                  </p>
                  <Button variant="default" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                    Browse Products
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'cart' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">
                    Add items to your cart by clicking the "Add to Cart" button on product pages
                  </p>
                  <Button variant="default" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                    Browse Products
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Browsing History</h1>
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium mb-2">No browsing history yet</h3>
                  <p className="text-gray-500 mb-6">
                    Products you view will appear here so you can easily find them again
                  </p>
                  <Button variant="default" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                    Browse Products
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">My Addresses</h1>
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium mb-2">No addresses saved</h3>
                  <p className="text-gray-500 mb-6">
                    Save your delivery addresses for faster checkout
                  </p>
                  <Button variant="default" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                    Add New Address
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium mb-2">No payment methods saved</h3>
                  <p className="text-gray-500 mb-6">
                    Save your payment methods for faster checkout
                  </p>
                  <Button variant="default" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                    Add Payment Method
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="border rounded-md p-2 w-full"
                          value={user?.name || ''}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="border rounded-md p-2 w-full"
                          value={user?.email || ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Edit Information
                    </Button>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="border rounded-md p-2 w-full"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="border rounded-md p-2 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="border rounded-md p-2 w-full"
                        />
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Change Password
                    </Button>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="email-notifications"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="email-notifications">
                        Email notifications about orders and promotions
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sms-notifications"
                        className="mr-2"
                      />
                      <label htmlFor="sms-notifications">
                        SMS notifications about orders and deliveries
                      </label>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
