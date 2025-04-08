
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface DeliveryAddressFormProps {
  formData: {
    address: string;
    city: string;
    zipCode: string;
    notes: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({ formData, handleInputChange }) => {
  return (
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
  );
};

export default DeliveryAddressForm;
