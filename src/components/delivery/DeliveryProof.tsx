
import React, { useState } from 'react';
import { Camera, Upload, CheckCircle, Signature, Image, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const DeliveryProof = () => {
  const [activeTab, setActiveTab] = useState('photo');
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Proof of Delivery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Delivery Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="photo" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="photo">Photo</TabsTrigger>
                <TabsTrigger value="signature">Signature</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="photo" className="mt-0">
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-md">
                  <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Take Delivery Photo</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Take a clear photo of the product at the delivery location
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full bg-brand-purple">
                      <Camera className="h-4 w-4 mr-2" />
                      Open Camera
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="signature" className="mt-0">
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-md">
                  <Signature className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Collect Signature</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Ask the customer to sign on the screen to confirm delivery
                  </p>
                  <div className="bg-gray-50 h-40 mb-4 rounded-md flex items-center justify-center">
                    <p className="text-gray-400">Signature will appear here</p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-brand-purple">
                      Start Signature Capture
                    </Button>
                    <Button variant="outline" className="w-full">
                      Clear
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="qr" className="mt-0">
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-md">
                  <QrCode className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Scan Delivery QR Code</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Scan the QR code provided by the customer to verify delivery
                  </p>
                  <Button className="w-full bg-brand-purple mb-4">
                    <QrCode className="h-4 w-4 mr-2" />
                    Scan QR Code
                  </Button>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-2">Or enter verification code manually:</p>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" className="flex-1" />
                      <Button>Verify</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Order #67889</h3>
                    <p className="text-sm text-gray-500">Delivered at 11:15 AM</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mr-3">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm">Photo proof collected</p>
                    <p className="text-xs text-gray-500">Power Drill Set delivered to Sarah Wilson</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Order #67888</h3>
                    <p className="text-sm text-gray-500">Delivered at 09:30 AM</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mr-3">
                    <Signature className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm">Signature collected</p>
                    <p className="text-xs text-gray-500">DSLR Camera delivered to John Cooper</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Order #67887</h3>
                    <p className="text-sm text-gray-500">Delivered yesterday at 4:45 PM</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mr-3">
                    <QrCode className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm">QR code verified</p>
                    <p className="text-xs text-gray-500">Gaming Console delivered to Robert Taylor</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Delivery Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-brand-purple/10 p-2 rounded mr-3">
                  <Camera className="h-5 w-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-medium">Photo Proof</h3>
                  <p className="text-sm text-gray-500">
                    Always take clear photos showing the product at the delivery location. 
                    Ensure good lighting and that the item is clearly visible.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-purple/10 p-2 rounded mr-3">
                  <Signature className="h-5 w-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-medium">Signature Collection</h3>
                  <p className="text-sm text-gray-500">
                    For high-value items, always collect the recipient's signature. 
                    Make sure they sign clearly on the screen.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-purple/10 p-2 rounded mr-3">
                  <QrCode className="h-5 w-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-medium">QR Code Verification</h3>
                  <p className="text-sm text-gray-500">
                    Ask the customer to show the QR code from their order confirmation. 
                    Scan it with your app to confirm delivery.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-purple/10 p-2 rounded mr-3">
                  <CheckCircle className="h-5 w-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-medium">Completion</h3>
                  <p className="text-sm text-gray-500">
                    After collecting proof, always mark the delivery as complete in the app 
                    before leaving the customer's location.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryProof;
