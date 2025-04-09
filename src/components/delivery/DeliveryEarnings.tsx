
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

// Mock data for earnings
const earningsData = [
  { date: '2025-04-01', amount: 65 },
  { date: '2025-04-02', amount: 85 },
  { date: '2025-04-03', amount: 95 },
  { date: '2025-04-04', amount: 75 },
  { date: '2025-04-05', amount: 120 },
  { date: '2025-04-06', amount: 110 },
  { date: '2025-04-07', amount: 90 },
  { date: '2025-04-08', amount: 45 },
];

const DeliveryEarnings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Earnings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Today's Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹685</div>
            <p className="text-xs text-green-500 mt-1">
              From 3 deliveries
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹4,850</div>
            <p className="text-xs text-green-500 mt-1">
              +₹780 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹18,420</div>
            <p className="text-xs text-green-500 mt-1">
              +₹2,100 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Available for Withdrawal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹14,200</div>
            <Button className="mt-2 w-full text-sm h-8" variant="outline">
              Withdraw
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Earnings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#9D00FF"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3">Apr 8, 2025</td>
                  <td className="py-3">Order #67890 - Delivery Fee</td>
                  <td className="py-3 text-green-600">+₹220</td>
                  <td className="py-3">
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3">Apr 8, 2025</td>
                  <td className="py-3">Order #67889 - Delivery Fee</td>
                  <td className="py-3 text-green-600">+₹180</td>
                  <td className="py-3">
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3">Apr 8, 2025</td>
                  <td className="py-3">Order #67888 - Delivery Fee</td>
                  <td className="py-3 text-green-600">+₹285</td>
                  <td className="py-3">
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3">Apr 7, 2025</td>
                  <td className="py-3">Withdrawal to XXXX-1234</td>
                  <td className="py-3 text-red-600">-₹5,000</td>
                  <td className="py-3">
                    <Badge className="bg-blue-100 text-blue-800">
                      Processing
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryEarnings;
