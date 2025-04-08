
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

const PaymentMethodSelector: React.FC = () => {
  return (
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
  );
};

export default PaymentMethodSelector;
