
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Package, ShoppingCart, Clock, TrendingUp } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const VendorOverview = () => {
  // Mock data for demo purposes
  const stats = [
    { title: 'Total Listings', value: 24, icon: <Package className="h-8 w-8 text-blue-500" />, change: '+2 this week' },
    { title: 'Active Listings', value: 18, icon: <ShoppingCart className="h-8 w-8 text-green-500" />, change: '75% of total' },
    { title: 'Total Earnings', value: '₹15,680', icon: <TrendingUp className="h-8 w-8 text-orange-500" />, change: '+₹1,245 this month' },
    { title: 'Pending Orders', value: 5, icon: <Clock className="h-8 w-8 text-purple-500" />, change: '2 new today' },
  ];

  const recentActivity = [
    { id: 1, action: 'New rental request', item: 'DSLR Camera', customer: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'Payment received', item: 'Drone', customer: 'Sarah Johnson', time: '5 hours ago' },
    { id: 3, action: 'Item returned', item: 'Mountain Bike', customer: 'Mike Peters', time: '1 day ago' },
    { id: 4, action: 'New review', item: 'Projector', customer: 'Lisa Wong', time: '2 days ago' },
  ];

  const upcomingReturns = [
    { id: 1, item: 'DSLR Camera', customer: 'John Doe', returnDate: 'Tomorrow' },
    { id: 2, item: 'Drone', customer: 'Sarah Johnson', returnDate: 'In 3 days' },
    { id: 3, item: 'Power Tools Set', customer: 'Alex Roberts', returnDate: 'Next week' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events on your listings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.action}</TableCell>
                    <TableCell>{activity.item}</TableCell>
                    <TableCell>{activity.customer}</TableCell>
                    <TableCell>{activity.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Upcoming Returns */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Returns</CardTitle>
            <CardDescription>Items scheduled to be returned soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Return Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingReturns.map((returnItem) => (
                  <TableRow key={returnItem.id}>
                    <TableCell className="font-medium">{returnItem.item}</TableCell>
                    <TableCell>{returnItem.customer}</TableCell>
                    <TableCell>{returnItem.returnDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorOverview;
