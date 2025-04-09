
import React, { useState } from 'react';
import { MapPin, Navigation, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const DeliveryNavigation = () => {
  const [mapApiKey, setMapApiKey] = useState('');
  const [showMapInput, setShowMapInput] = useState(true);
  
  const handleMapKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMapInput(false);
    // In a real implementation, this would store the key and load the map
  };

  // Mock delivery tasks for the route
  const deliveryTasks = [
    {
      id: '67890',
      customer: 'Michael Brown',
      address: '789 Pine Blvd, Anytown',
      product: 'Mountain Bike',
      status: 'in-progress',
      time: '01:45 PM',
      distance: '2.5 km',
      eta: '10 mins'
    },
    {
      id: '67891',
      customer: 'Jennifer Lee',
      address: '123 West Avenue, Anytown',
      product: 'Professional Tripod',
      status: 'scheduled',
      time: '02:30 PM',
      distance: '3.7 km',
      eta: '25 mins'
    },
    {
      id: '67892',
      customer: 'David Smith',
      address: '456 East Road, Anytown',
      product: 'Camping Tent',
      status: 'scheduled',
      time: '03:15 PM',
      distance: '1.8 km',
      eta: '15 mins'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Delivery Navigation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Live Map</CardTitle>
            </CardHeader>
            <CardContent>
              {showMapInput ? (
                <div className="text-center py-8">
                  <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Map Integration</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    To enable live mapping features, please enter your Google Maps API key.
                  </p>
                  
                  <form onSubmit={handleMapKeySubmit} className="max-w-md mx-auto">
                    <div className="flex gap-2">
                      <Input 
                        type="text" 
                        placeholder="Enter Google Maps API key"
                        value={mapApiKey}
                        onChange={(e) => setMapApiKey(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit">Activate</Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Note: In a production app, this would be handled securely on the server-side.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="h-[400px] bg-gray-100 flex items-center justify-center rounded-md">
                  <div className="text-center">
                    <Navigation className="mx-auto h-12 w-12 text-brand-purple mb-4" />
                    <p className="text-gray-500">
                      Map would be displayed here in a production environment
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Optimized Route</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="absolute top-8 left-4 h-[calc(100%-16px)] w-0.5 bg-gray-300"></div>
                  </div>
                  <div>
                    <p className="font-medium">Current Location</p>
                    <p className="text-sm text-gray-500">Tech Store, Mall Road</p>
                  </div>
                  <div className="ml-auto">
                    <Badge className="bg-green-100 text-green-800">Starting Point</Badge>
                  </div>
                </div>
                
                {deliveryTasks.map((task, index) => (
                  <div key={task.id} className="flex items-center">
                    <div className="relative mr-4">
                      <div className={`w-8 h-8 rounded-full ${
                        task.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                      } flex items-center justify-center`}>
                        <span className="text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                      {index < deliveryTasks.length - 1 && (
                        <div className="absolute top-8 left-4 h-[calc(100%-16px)] w-0.5 bg-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{task.customer}</p>
                        <p className="text-sm text-gray-500">{task.time}</p>
                      </div>
                      <p className="text-sm text-gray-700">{task.address}</p>
                      <p className="text-xs text-gray-500">Order #{task.id} • {task.product}</p>
                    </div>
                    <div className="ml-4 text-right">
                      {task.status === 'in-progress' ? (
                        <Badge className="bg-blue-100 text-blue-800 mb-1">Next Stop</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 mb-1">Upcoming</Badge>
                      )}
                      <p className="text-xs">{task.distance} • {task.eta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Current Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Order #67890</h3>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">ETA: 10 minutes</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer</p>
                  <p className="font-medium">Michael Brown</p>
                  <p className="text-sm">+91 98765 43210</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p>789 Pine Blvd, Anytown</p>
                  <p className="text-sm text-gray-500">2.5 km away</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Product</p>
                  <p>Mountain Bike (1)</p>
                </div>
                
                <div className="pt-2 flex gap-2">
                  <Button className="flex-1 bg-brand-purple">
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Call Customer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Delivery Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full bg-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Delivered
                </Button>
                <Button variant="outline" className="w-full">
                  Take Photo of Product
                </Button>
                <Button variant="outline" className="w-full">
                  Scan QR Code
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200">
                  Report Delivery Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNavigation;
