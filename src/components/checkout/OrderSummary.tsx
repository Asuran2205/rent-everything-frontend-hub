
import React from 'react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';

interface OrderSummaryProps {
  product: {
    title: string;
    images: string[];
    price: number;
    priceUnit: string;
  };
  rentDate: Date;
  duration: string;
  timeSlot: string;
  totalPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  product, 
  rentDate, 
  duration, 
  timeSlot, 
  totalPrice 
}) => {
  const priceInRupees = totalPrice * 83.5; // Rough conversion rate
  
  return (
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
  );
};

export default OrderSummary;
