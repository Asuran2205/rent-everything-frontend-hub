
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Import the newly created components
import OrderSummary from '@/components/checkout/OrderSummary';
import PersonalInfoForm from '@/components/checkout/PersonalInfoForm';
import DeliveryAddressForm from '@/components/checkout/DeliveryAddressForm';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';

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
            <OrderSummary 
              product={product}
              rentDate={rentDate}
              duration={duration}
              timeSlot={timeSlot}
              totalPrice={totalPrice}
            />
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <PersonalInfoForm
                formData={formData}
                handleInputChange={handleInputChange}
              />
              
              {/* Delivery Address */}
              <DeliveryAddressForm
                formData={formData}
                handleInputChange={handleInputChange}
              />
              
              {/* Payment Method */}
              <PaymentMethodSelector />
              
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
