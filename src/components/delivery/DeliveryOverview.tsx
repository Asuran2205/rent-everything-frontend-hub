
import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  Zap, 
  Truck 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';

// Mock data
const deliveriesData = [
  { day: 'Mon', deliveries: 5 },
  { day: 'Tue', deliveries: 8 },
  { day: 'Wed', deliveries: 4 },
  { day: 'Thu', deliveries: 6 },
  { day: 'Fri', deliveries: 9 },
  { day: 'Sat', deliveries: 12 },
  { day: 'Sun', deliveries: 3 },
];

const DeliveryOverview = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Delivery Overview</h1>
        <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
          <Truck className="h-4 w-4 mr-2" />
          Start Delivery Mode
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Today's Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-green-500 mt-1">
              3 completed, 5 pending
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Weekly Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
            <p className="text-xs text-green-500 mt-1">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Weekly Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹48,000</div>
            <p className="text-xs text-green-500 mt-1">
              +₹6,000 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.9</div>
            <p className="text-xs text-green-500 mt-1">
              Based on 126 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Deliveries Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Weekly Delivery Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deliveries" fill="#9D00FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Delivery Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Address</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3">09:30 AM</td>
                  <td className="py-3">John Cooper</td>
                  <td className="py-3">123 Main St, Anytown</td>
                  <td className="py-3">DSLR Camera</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Completed
                    </span>
                  </td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">Details</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3">11:15 AM</td>
                  <td className="py-3">Sarah Wilson</td>
                  <td className="py-3">456 Oak Ave, Anytown</td>
                  <td className="py-3">Power Drill Set</td>
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Completed
                    </span>
                  </td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">Details</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3">01:45 PM</td>
                  <td className="py-3">Michael Brown</td>
                  <td className="py-3">789 Pine Blvd, Anytown</td>
                  <td className="py-3">Mountain Bike</td>
                  <td className="py-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      In Progress
                    </span>
                  </td>
                  <td className="py-3">
                    <Button className="bg-brand-purple text-white" size="sm">Navigate</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3">03:30 PM</td>
                  <td className="py-3">Emily Davis</td>
                  <td className="py-3">101 Cedar St, Anytown</td>
                  <td className="py-3">Luxury Sofa</td>
                  <td className="py-3">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Scheduled
                    </span>
                  </td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">Prepare</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <Button variant="link" className="text-brand-purple">
              View Full Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryOverview;
