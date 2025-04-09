
import React from 'react';
import { 
  Users, Package, ArrowUpRight, ShoppingBag, 
  DollarSign, AlertCircle, Activity, TrendingUp 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StatsCard = ({ title, value, icon, trend, change }: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode;
  trend?: "up" | "down";
  change?: string;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {trend && change && (
            <div className="flex items-center gap-1 mt-1">
              {trend === "up" ? (
                <span className="text-green-500 flex items-center text-xs font-medium">
                  <ArrowUpRight className="h-3 w-3" /> {change}
                </span>
              ) : (
                <span className="text-red-500 flex items-center text-xs font-medium">
                  <ArrowUpRight className="h-3 w-3 rotate-180" /> {change}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Total Vendors" 
          value={842} 
          icon={<Users className="h-6 w-6" />} 
          trend="up"
          change="12% this month"
        />
        <StatsCard 
          title="Total Customers" 
          value="5,423" 
          icon={<Users className="h-6 w-6" />} 
          trend="up"
          change="8% this month"
        />
        <StatsCard 
          title="Active Listings" 
          value="3,156" 
          icon={<Package className="h-6 w-6" />} 
          trend="up"
          change="5% this month"
        />
        <StatsCard 
          title="Ongoing Rentals" 
          value={472} 
          icon={<ShoppingBag className="h-6 w-6" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Earnings Summary</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Weekly</Button>
              <Button variant="outline" size="sm">Monthly</Button>
              <Button variant="default" size="sm">Yearly</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4 pb-0">
            <div className="h-[240px] flex items-center justify-center text-muted-foreground">
              <TrendingUp className="h-16 w-16 opacity-20" />
            </div>
            <div className="grid grid-cols-3 gap-4 py-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-bold">₹2,345,678</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Platform Fee</p>
                <p className="text-xl font-bold">₹468,925</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vendor Payouts</p>
                <p className="text-xl font-bold">₹1,876,753</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-secondary/30 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">New Products</p>
                    <p className="text-sm text-muted-foreground">24 awaiting review</p>
                  </div>
                </div>
                <Button size="sm">Review</Button>
              </div>
              
              <div className="flex items-center justify-between bg-secondary/30 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Vendor KYC</p>
                    <p className="text-sm text-muted-foreground">12 verifications pending</p>
                  </div>
                </div>
                <Button size="sm">Verify</Button>
              </div>
              
              <div className="flex items-center justify-between bg-secondary/30 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Disputes</p>
                    <p className="text-sm text-muted-foreground">7 disputes to resolve</p>
                  </div>
                </div>
                <Button size="sm">Resolve</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { 
                  activity: "New vendor registration: Tech Rentals", 
                  status: "Pending", 
                  time: "10 minutes ago" 
                },
                { 
                  activity: "New product listing: Sony A7III Camera", 
                  status: "Pending Review", 
                  time: "25 minutes ago" 
                },
                { 
                  activity: "Payment dispute: Order #45678", 
                  status: "Urgent", 
                  time: "1 hour ago" 
                },
                { 
                  activity: "Product returned damaged: MacBook Pro", 
                  status: "Investigation", 
                  time: "2 hours ago" 
                },
                { 
                  activity: "Vendor withdrawal request: ₹24,500", 
                  status: "Pending", 
                  time: "3 hours ago" 
                },
              ].map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.activity}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Urgent" ? "destructive" : "outline"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.time}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
