
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShoppingCart,
  Heart,
  Home,
  Clock,
  Settings,
  CreditCard,
  MapPin,
  Package,
  Archive,
  Plus,
  Trash2,
  Edit,
  Star
} from 'lucide-react';
import { orders } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock wishlist data
const wishlistItems = [
  {
    id: "w1",
    name: "Professional DSLR Camera",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1000",
    price: 3500,
    vendor: "Camera World",
    available: true
  },
  {
    id: "w2",
    name: "Mountain Bike",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000",
    price: 2100,
    vendor: "Sports Center",
    available: true
  },
  {
    id: "w3",
    name: "Luxury Sofa",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
    price: 5000,
    vendor: "Home Luxuries",
    available: false
  }
];

// Mock browsing history
const browsingHistory = [
  {
    id: "p1",
    name: "Professional DSLR Camera",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1000",
    price: 3500,
    viewedOn: "2025-04-08T15:30:00"
  },
  {
    id: "p2",
    name: "Luxury Sofa",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
    price: 5000,
    viewedOn: "2025-04-08T14:45:00"
  },
  {
    id: "p3",
    name: "Power Drill Set",
    image: "https://images.unsplash.com/photo-1616345840969-855ef4b4f6b5?auto=format&fit=crop&q=80&w=1000",
    price: 1800,
    viewedOn: "2025-04-08T12:15:00"
  },
  {
    id: "p4",
    name: "Mountain Bike",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000",
    price: 2100,
    viewedOn: "2025-04-07T16:20:00"
  }
];

// Mock addresses
const addresses = [
  {
    id: "addr1",
    name: "Home",
    addressLine1: "123 Main Street",
    addressLine2: "Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    phone: "9876543210",
    isDefault: true
  },
  {
    id: "addr2",
    name: "Office",
    addressLine1: "456 Business Park",
    addressLine2: "Tower B, 5th Floor",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400099",
    phone: "9876543211",
    isDefault: false
  }
];

// Mock payment methods
const paymentMethods = [
  {
    id: "pm1",
    type: "creditCard",
    name: "HDFC Bank Credit Card",
    lastDigits: "4567",
    expiryDate: "09/28",
    isDefault: true
  },
  {
    id: "pm2",
    type: "upi",
    name: "Google Pay",
    upiId: "user@okicici",
    isDefault: false
  },
  {
    id: "pm3",
    type: "upi",
    name: "PhonePe",
    upiId: "9876543210@ybl",
    isDefault: false
  }
];

const CustomerDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('orders');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);

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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
                                    Total: <span className="text-brand-orange">₹{(order.totalPrice * 75).toFixed(2)}</span>
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
                    <Link to="/products">
                      <Button variant="default" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                        Start Shopping
                      </Button>
                    </Link>
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
                
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                          <button className="absolute top-2 right-2 bg-white rounded-full p-1">
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg truncate">{item.name}</h3>
                          <p className="text-brand-orange font-medium mb-1">₹{item.price.toFixed(2)} / day</p>
                          <p className="text-gray-500 text-sm mb-4">Vendor: {item.vendor}</p>
                          
                          <div className="flex gap-2">
                            {item.available ? (
                              <Link to={`/product/${item.id}`} className="flex-1">
                                <Button className="w-full bg-brand-orange">
                                  Rent Now
                                </Button>
                              </Link>
                            ) : (
                              <Button className="w-full" disabled>
                                Currently Unavailable
                              </Button>
                            )}
                            <Button variant="outline" className="w-12">
                              <ShoppingCart size={18} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">
                      Save items you want to rent later by clicking the heart icon on product pages
                    </p>
                    <Link to="/products">
                      <Button variant="default" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                )}
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
                  <Link to="/products">
                    <Button variant="default" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Browse Products
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Browsing History</h1>
                
                {browsingHistory.length > 0 ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-gray-500">Recently viewed products</p>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        Clear History
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {browsingHistory.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center">
                          <div className="w-16 h-16 mr-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <Link to={`/product/${item.id}`} className="font-medium hover:text-brand-orange">
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-500">
                              Viewed on {formatDate(item.viewedOn)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-brand-orange">₹{item.price.toFixed(2)} / day</p>
                            <div className="mt-1">
                              <Button size="sm" variant="outline" className="mr-2">
                                <Heart size={16} className="mr-1" />
                                Save
                              </Button>
                              <Button size="sm" className="bg-brand-orange">
                                <ShoppingCart size={16} className="mr-1" />
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-medium mb-2">No browsing history yet</h3>
                    <p className="text-gray-500 mb-6">
                      Products you view will appear here so you can easily find them again
                    </p>
                    <Link to="/products">
                      <Button variant="default" className="bg-gradient-to-r from-brand-orange to-brand-purple">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">My Addresses</h1>
                  <Button 
                    className="bg-brand-orange" 
                    onClick={() => setShowAddAddressForm(!showAddAddressForm)}
                  >
                    <Plus size={18} className="mr-1" />
                    {showAddAddressForm ? "Cancel" : "Add New Address"}
                  </Button>
                </div>
                
                {showAddAddressForm && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Add New Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Address Name
                            </label>
                            <Input placeholder="e.g. Home, Office" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <Input placeholder="Your phone number" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address Line 1
                          </label>
                          <Input placeholder="House number, street name" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address Line 2 (Optional)
                          </label>
                          <Input placeholder="Apartment, suite, unit, building, etc." />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <Input placeholder="City name" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State
                            </label>
                            <Input placeholder="State" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              PIN Code
                            </label>
                            <Input placeholder="6-digit PIN code" />
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="default-address"
                            className="mr-2"
                          />
                          <label htmlFor="default-address">
                            Set as default delivery address
                          </label>
                        </div>
                        
                        <Button className="mt-2 bg-gradient-to-r from-brand-orange to-brand-purple">
                          Save Address
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <Card key={address.id} className={`border ${address.isDefault ? 'border-brand-orange' : ''}`}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-lg">{address.name}</h3>
                                {address.isDefault && (
                                  <Badge className="bg-orange-100 text-brand-orange">
                                    Default
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-700">{address.addressLine1}</p>
                              {address.addressLine2 && <p className="text-gray-700">{address.addressLine2}</p>}
                              <p className="text-gray-700">
                                {address.city}, {address.state} {address.pincode}
                              </p>
                              <p className="text-gray-700 mt-1">Phone: {address.phone}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 size={16} className="text-red-500" />
                              </Button>
                            </div>
                          </div>
                          {!address.isDefault && (
                            <Button variant="outline" className="mt-4" size="sm">
                              Set as Default
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-medium mb-2">No addresses saved</h3>
                    <p className="text-gray-500 mb-6">
                      Save your delivery addresses for faster checkout
                    </p>
                    <Button 
                      variant="default" 
                      className="bg-gradient-to-r from-brand-orange to-brand-purple"
                      onClick={() => setShowAddAddressForm(true)}
                    >
                      Add New Address
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Payment Methods</h1>
                  <Button 
                    className="bg-brand-orange" 
                    onClick={() => setShowAddPaymentForm(!showAddPaymentForm)}
                  >
                    <Plus size={18} className="mr-1" />
                    {showAddPaymentForm ? "Cancel" : "Add Payment Method"}
                  </Button>
                </div>
                
                {showAddPaymentForm && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Add Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Payment Type
                          </label>
                          <Select defaultValue="credit">
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="credit">Credit/Debit Card</SelectItem>
                                <SelectItem value="upi">UPI</SelectItem>
                                <SelectItem value="netbanking">Net Banking</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <Input placeholder="1234 5678 9012 3456" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name on Card
                            </label>
                            <Input placeholder="Cardholder name" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <Input placeholder="123" type="password" />
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="default-payment"
                            className="mr-2"
                          />
                          <label htmlFor="default-payment">
                            Set as default payment method
                          </label>
                        </div>
                        
                        <Button className="mt-2 bg-gradient-to-r from-brand-orange to-brand-purple">
                          Save Payment Method
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {paymentMethods.length > 0 ? (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <Card key={method.id} className={`border ${method.isDefault ? 'border-brand-orange' : ''}`}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              {method.type === 'creditCard' ? (
                                <CreditCard size={24} className="mr-4" />
                              ) : method.type === 'upi' && method.name === 'Google Pay' ? (
                                <div className="w-6 h-6 mr-4 flex items-center justify-center bg-white">
                                  <span className="text-xl font-bold">G</span>
                                </div>
                              ) : method.type === 'upi' && method.name === 'PhonePe' ? (
                                <div className="w-6 h-6 mr-4 flex items-center justify-center bg-white">
                                  <span className="text-xl font-bold text-indigo-600">P</span>
                                </div>
                              ) : (
                                <CreditCard size={24} className="mr-4" />
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{method.name}</h3>
                                  {method.isDefault && (
                                    <Badge className="bg-orange-100 text-brand-orange">
                                      Default
                                    </Badge>
                                  )}
                                </div>
                                {method.type === 'creditCard' ? (
                                  <p className="text-sm text-gray-500">
                                    •••• •••• •••• {method.lastDigits} | Expires {method.expiryDate}
                                  </p>
                                ) : method.type === 'upi' && (
                                  <p className="text-sm text-gray-500">{method.upiId}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 size={16} className="text-red-500" />
                              </Button>
                            </div>
                          </div>
                          {!method.isDefault && (
                            <Button variant="outline" className="mt-4" size="sm">
                              Set as Default
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-medium mb-2">No payment methods saved</h3>
                    <p className="text-gray-500 mb-6">
                      Save your payment methods for faster checkout
                    </p>
                    <Button 
                      variant="default" 
                      className="bg-gradient-to-r from-brand-orange to-brand-purple"
                      onClick={() => setShowAddPaymentForm(true)}
                    >
                      Add Payment Method
                    </Button>
                  </div>
                )}
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
                        <Input
                          type="text"
                          value={user?.name || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={user?.email || ''}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <Input
                          type="date"
                        />
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save Changes
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
                        <Input
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <Input
                          type="password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <Input
                          type="password"
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
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="marketing-emails"
                        className="mr-2"
                      />
                      <label htmlFor="marketing-emails">
                        Receive special offers and promotions
                      </label>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save Preferences
                    </Button>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h2 className="text-lg font-semibold mb-4">Account Actions</h2>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:text-yellow-700">
                        Download My Data
                      </Button>
                      <Button variant="outline" className="border-red-500 text-red-600 hover:text-red-700">
                        Delete Account
                      </Button>
                    </div>
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

