
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, AlertTriangle, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const ProfileKYC = () => {
  const { user } = useAuth();
  
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '9876543210',
    address: '123 Green Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
  });
  
  const [kycInfo, setKycInfo] = useState({
    aadhaarNumber: '1234-5678-9012',
    panNumber: 'ABCDE1234F',
    gstNumber: '29ABCDE1234F1Z5',
    aadhaarFile: null as File | null,
    panFile: null as File | null,
    gstFile: null as File | null,
    kycStatus: 'verified', // pending, verified, rejected
    rejectReason: '',
  });
  
  const [bankInfo, setBankInfo] = useState({
    accountName: 'John Vendor',
    accountNumber: '1234567890',
    ifscCode: 'HDFC0001234',
    bankName: 'HDFC Bank',
    upiId: 'johnvendor@okbank',
  });
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value
    });
  };
  
  const handleKycChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setKycInfo({
      ...kycInfo,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setKycInfo({
        ...kycInfo,
        [fieldName]: e.target.files[0]
      });
    }
  };
  
  const handleBankInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankInfo({
      ...bankInfo,
      [name]: value
    });
  };
  
  const savePersonalInfo = () => {
    // Here you would send the data to the server
    toast.success('Personal information updated successfully');
  };
  
  const submitKYC = () => {
    // Here you would send the KYC data to the server
    setKycInfo({
      ...kycInfo,
      kycStatus: 'pending'
    });
    toast.success('KYC documents submitted for verification');
  };
  
  const saveBankInfo = () => {
    // Here you would send the bank data to the server
    toast.success('Bank information updated successfully');
  };
  
  const renderKycStatus = () => {
    switch (kycInfo.kycStatus) {
      case 'verified':
        return (
          <div className="flex items-center text-green-600 mb-4">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Your KYC is verified</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-yellow-600 mb-4">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-medium">Your KYC is pending verification</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-red-600 mb-4">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="font-medium">Your KYC was rejected</span>
            <p className="text-sm mt-1">{kycInfo.rejectReason}</p>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-blue-600 mb-4">
            <Upload className="h-5 w-5 mr-2" />
            <span className="font-medium">Please submit your KYC documents</span>
          </div>
        );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Profile & KYC</h2>
      
      <Tabs defaultValue="personal-info">
        <TabsList className="mb-6">
          <TabsTrigger value="personal-info">Personal Information</TabsTrigger>
          <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
          <TabsTrigger value="bank-details">Bank Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal-info" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={personalInfo.city}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={personalInfo.state}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={personalInfo.pincode}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={savePersonalInfo}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="kyc" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>KYC Verification</CardTitle>
              <CardDescription>
                Verify your identity to enable listing and receiving payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderKycStatus()}
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                    <Input
                      id="aadhaarNumber"
                      name="aadhaarNumber"
                      value={kycInfo.aadhaarNumber}
                      onChange={handleKycChange}
                      disabled={kycInfo.kycStatus === 'verified' || kycInfo.kycStatus === 'pending'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhaarFile">Upload Aadhaar Card</Label>
                    <Input
                      id="aadhaarFile"
                      type="file"
                      onChange={(e) => handleFileChange(e, 'aadhaarFile')}
                      disabled={kycInfo.kycStatus === 'verified' || kycInfo.kycStatus === 'pending'}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number</Label>
                    <Input
                      id="panNumber"
                      name="panNumber"
                      value={kycInfo.panNumber}
                      onChange={handleKycChange}
                      disabled={kycInfo.kycStatus === 'verified' || kycInfo.kycStatus === 'pending'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panFile">Upload PAN Card</Label>
                    <Input
                      id="panFile"
                      type="file"
                      onChange={(e) => handleFileChange(e, 'panFile')}
                      disabled={kycInfo.kycStatus === 'verified' || kycInfo.kycStatus === 'pending'}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                    <Input
                      id="gstNumber"
                      name="gstNumber"
                      value={kycInfo.gstNumber}
                      onChange={handleKycChange}
                      disabled={kycInfo.kycStatus === 'verified' || kycInfo.kycStatus === 'pending'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gstFile">Upload GST Certificate</Label>
                    <Input
                      id="gstFile"
                      type="file"
                      onChange={(e) => handleFileChange(e, 'gstFile')}
                      disabled={kycInfo.kycStatus === 'verified' || kycInfo.kycStatus === 'pending'}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={submitKYC} 
                disabled={kycInfo.kycStatus === 'verified' || kycInfo.kycStatus === 'pending'}
              >
                {kycInfo.kycStatus === 'rejected' ? 'Resubmit KYC' : 'Submit KYC'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="bank-details" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
              <CardDescription>
                Add your bank account for payouts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input
                    id="accountName"
                    name="accountName"
                    value={bankInfo.accountName}
                    onChange={handleBankInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    value={bankInfo.accountNumber}
                    onChange={handleBankInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    name="ifscCode"
                    value={bankInfo.ifscCode}
                    onChange={handleBankInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    value={bankInfo.bankName}
                    onChange={handleBankInfoChange}
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID (Optional)</Label>
                  <Input
                    id="upiId"
                    name="upiId"
                    value={bankInfo.upiId}
                    onChange={handleBankInfoChange}
                    placeholder="yourname@bank"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveBankInfo}>Save Bank Details</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileKYC;
