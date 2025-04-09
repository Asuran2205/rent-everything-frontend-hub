
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';

const DeliveryProfile = () => {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold mb-6">Profile & KYC</h1>

      <div className="flex items-center justify-center mb-8">
        <div className="text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4">
            <AvatarFallback className="bg-brand-purple text-white text-xl">
              {user?.name ? getInitials(user.name) : 'D'}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">Change Photo</Button>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                defaultValue={user?.name || ''}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                defaultValue={user?.email || ''}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alternative Phone
              </label>
              <Input
                type="tel"
                placeholder="Enter alternative number (optional)"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <Input
                type="date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <Select defaultValue="male">
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Address Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <Input
                type="text"
                placeholder="Enter your street address"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Input
                type="text"
                placeholder="Enter your city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <Input
                type="text"
                placeholder="Enter your state"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <Input
                type="text"
                placeholder="Enter your postal code"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Vehicle Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>
              <Select defaultValue="motorcycle">
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                    <SelectItem value="van">Delivery Van</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Model
              </label>
              <Input
                type="text"
                placeholder="e.g., Honda Activa"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <Input
                type="text"
                placeholder="e.g., MH01AB1234"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Color
              </label>
              <Input
                type="text"
                placeholder="e.g., Black"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Document Verification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Proof (Aadhar/PAN/Voter ID)
              </label>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                <p className="text-sm text-gray-500 mb-2">Upload your ID proof</p>
                <Button variant="outline" size="sm">Upload Document</Button>
                <p className="text-xs text-green-600 mt-2">Document verified</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driving License
              </label>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                <p className="text-sm text-gray-500 mb-2">Upload your driving license</p>
                <Button variant="outline" size="sm">Upload Document</Button>
                <p className="text-xs text-blue-600 mt-2">Verification pending</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Registration Certificate
              </label>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                <p className="text-sm text-gray-500 mb-2">Upload your RC</p>
                <Button variant="outline" size="sm">Upload Document</Button>
                <p className="text-xs text-green-600 mt-2">Document verified</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Certificate
              </label>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                <p className="text-sm text-gray-500 mb-2">Upload your insurance</p>
                <Button variant="outline" size="sm">Upload Document</Button>
                <p className="text-xs text-red-600 mt-2">Please upload document</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Bank Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Holder Name
              </label>
              <Input
                type="text"
                placeholder="Enter account holder name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <Input
                type="text"
                placeholder="Enter bank name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <Input
                type="text"
                placeholder="Enter account number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                IFSC Code
              </label>
              <Input
                type="text"
                placeholder="Enter IFSC code"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button className="bg-gradient-to-r from-brand-orange to-brand-purple w-full md:w-auto">
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProfile;
