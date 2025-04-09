
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for zones
const zoneData = [
  { id: 1, name: 'Downtown', status: 'active', deliveries: 24, earnings: 480 },
  { id: 2, name: 'Westside', status: 'active', deliveries: 18, earnings: 360 },
  { id: 3, name: 'Northside', status: 'active', deliveries: 12, earnings: 240 },
  { id: 4, name: 'Eastside', status: 'inactive', deliveries: 0, earnings: 0 },
];

const DeliveryZones = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Delivery Zones</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Active Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-3">Zone Name</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Deliveries</th>
                  <th className="pb-3">Earnings</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {zoneData.map((zone) => (
                  <tr key={zone.id} className="border-t">
                    <td className="py-3">{zone.name}</td>
                    <td className="py-3">
                      <Badge className={zone.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {zone.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-3">{zone.deliveries}</td>
                    <td className="py-3">₹{zone.earnings}</td>
                    <td className="py-3">
                      <Button variant={zone.status === 'active' ? "outline" : "default"} size="sm" className={zone.status === 'active' ? "" : "bg-brand-purple"}>
                        {zone.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium">South District</h3>
              <p className="text-sm text-gray-500 mb-3">4.5 km from your location</p>
              <Button className="w-full bg-brand-purple">
                Join Zone
              </Button>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium">Tech Park Area</h3>
              <p className="text-sm text-gray-500 mb-3">6.2 km from your location</p>
              <Button className="w-full bg-brand-purple">
                Join Zone
              </Button>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium">University Campus</h3>
              <p className="text-sm text-gray-500 mb-3">3.8 km from your location</p>
              <Button className="w-full bg-brand-purple">
                Join Zone
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryZones;
