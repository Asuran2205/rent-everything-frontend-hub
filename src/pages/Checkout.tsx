import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { format } from 'date-fns';

const Checkout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { product, rentDate, duration, timeSlot, totalPrice } = location.state || {};
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  if (!product || !rentDate) {
    navigate('/products');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      toast.success('Order placed successfully!');
      navigate('/dashboard/customer', {
        state: { orderPlaced: true }
      });
    }, 2000);
  };
  
  const priceInRupees = totalPrice * 83.5; // Rough conversion rate
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="flex items-center mb-6 border-b pb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {duration} {parseInt(duration) === 1 ? product.priceUnit : `${product.priceUnit}s`}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental Start</span>
                  <span>{format(rentDate, 'PPP')} at {timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span>{duration} {parseInt(duration) === 1 ? product.priceUnit : `${product.priceUnit}s`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per {product.priceUnit}</span>
                  <span>₹{(product.price * 83.5).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>Free</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span className="text-brand-orange">₹{priceInRupees.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Please provide your contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                  <CardDescription>Where should we deliver your rental?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Special instructions for delivery"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select how you'd like to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card">
                    <TabsList className="grid grid-cols-5">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="upi">UPI</TabsTrigger>
                      <TabsTrigger value="gpay">Google Pay</TabsTrigger>
                      <TabsTrigger value="phonepe">PhonePe</TabsTrigger>
                      <TabsTrigger value="cash">Cash</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="upi" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Pay using any UPI app by entering your UPI ID
                        </p>
                        <div>
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input id="upiId" placeholder="yourname@bank" />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="gpay" className="mt-4">
                      <div className="text-center py-4">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
                          alt="Google Pay" 
                          className="h-12 mx-auto mb-4"
                        />
                        <p className="text-gray-600">
                          You'll be redirected to Google Pay to complete your payment after placing the order.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="phonepe" className="mt-4">
                      <div className="text-center py-4">
                        <img 
                          src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png" 
                          alt="PhonePe" 
                          className="h-12 mx-auto mb-4"
                        />
                        <p className="text-gray-600">
                          You'll be redirected to PhonePe to complete your payment after placing the order.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="cash" className="mt-4">
                      <p className="text-gray-600">
                        Pay with cash when your rental is delivered. Please have the exact amount ready.
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-orange to-brand-purple hover:opacity-90 text-lg py-6"
                  disabled={processing}
                >
                  {processing ? 'Processing...' : `Complete Order • ₹${priceInRupees.toFixed(0)}`}
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  By placing this order, you agree to our{' '}
                  <Link to="/terms" className="text-brand-orange hover:text-brand-purple">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-brand-orange hover:text-brand-purple">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
