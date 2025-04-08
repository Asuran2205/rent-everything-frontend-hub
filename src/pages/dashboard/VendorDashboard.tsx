
import React, { useState } from 'react';
import { 
  Package, 
  Box, 
  Settings, 
  PlusCircle, 
  Inbox, 
  BarChart, 
  DollarSign 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for vendor dashboard
const revenueData = [
  { name: 'Jan', revenue: 1200 },
  { name: 'Feb', revenue: 1900 },
  { name: 'Mar', revenue: 1500 },
  { name: 'Apr', revenue: 2400 },
  { name: 'May', revenue: 1800 },
  { name: 'Jun', revenue: 2800 },
];

const VendorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-6 md:mb-0">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-14 w-14 mr-4">
                  <AvatarFallback className="bg-brand-orange text-white">
                    {user?.name ? getInitials(user.name) : 'V'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold text-lg">{user?.name || 'Vendor'}</h2>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
              <div className="border-t pt-4 mt-2">
                <p className="text-sm text-gray-500">Vendor since April 2025</p>
              </div>
            </div>

            <nav className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'overview' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('overview')}
              >
                <BarChart className="h-5 w-5 mr-3" />
                <span>Overview</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'products' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('products')}
              >
                <Box className="h-5 w-5 mr-3" />
                <span>My Products</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'orders' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <Package className="h-5 w-5 mr-3" />
                <span>Rental Orders</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'messages' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('messages')}
              >
                <Inbox className="h-5 w-5 mr-3" />
                <span>Messages</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'earnings' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('earnings')}
              >
                <DollarSign className="h-5 w-5 mr-3" />
                <span>Earnings</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'settings' ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : ''
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
                  <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Active Rentals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">12</div>
                      <p className="text-xs text-green-500 mt-1">
                        +3 from last week
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Listed Products
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">24</div>
                      <p className="text-xs text-green-500 mt-1">
                        +2 new this month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Total Earnings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$8,420</div>
                      <p className="text-xs text-green-500 mt-1">
                        +15% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Average Rating
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">4.8</div>
                      <p className="text-xs text-green-500 mt-1">
                        Based on 156 reviews
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Revenue Chart */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#FF5E00"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Rental Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-500 text-sm">
                            <th className="pb-3">Order ID</th>
                            <th className="pb-3">Product</th>
                            <th className="pb-3">Customer</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="py-3">ORD-7861</td>
                            <td className="py-3">High-End DSLR Camera</td>
                            <td className="py-3">John Cooper</td>
                            <td className="py-3">Apr 8, 2025</td>
                            <td className="py-3">
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                Delivered
                              </span>
                            </td>
                            <td className="py-3">$175.00</td>
                          </tr>
                          <tr className="border-t">
                            <td className="py-3">ORD-7860</td>
                            <td className="py-3">Professional Power Drill Set</td>
                            <td className="py-3">Sarah Wilson</td>
                            <td className="py-3">Apr 7, 2025</td>
                            <td className="py-3">
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                Confirmed
                              </span>
                            </td>
                            <td className="py-3">$50.00</td>
                          </tr>
                          <tr className="border-t">
                            <td className="py-3">ORD-7859</td>
                            <td className="py-3">Mountain Bike</td>
                            <td className="py-3">Michael Brown</td>
                            <td className="py-3">Apr 6, 2025</td>
                            <td className="py-3">
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                Pending
                              </span>
                            </td>
                            <td className="py-3">$90.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="link" className="text-brand-orange">
                        View All Orders
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">My Products</h1>
                  <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-500 text-sm">
                          <th className="pb-4">Product</th>
                          <th className="pb-4">Price</th>
                          <th className="pb-4">Category</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 mr-3">
                                <img
                                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1000"
                                  alt="Camera"
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                              <div>
                                <p className="font-medium">High-End DSLR Camera</p>
                                <p className="text-sm text-gray-500">ID: P-1001</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">$35/day</td>
                          <td className="py-4">Electronics</td>
                          <td className="py-4">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Active
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 mr-3">
                                <img
                                  src="https://images.unsplash.com/photo-1616345840969-855ef4b4f6b5?auto=format&fit=crop&q=80&w=1000"
                                  alt="Drill"
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                              <div>
                                <p className="font-medium">Professional Power Drill Set</p>
                                <p className="text-sm text-gray-500">ID: P-1002</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">$25/day</td>
                          <td className="py-4">Tools & Equipment</td>
                          <td className="py-4">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Active
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 mr-3">
                                <img
                                  src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000"
                                  alt="Bike"
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                              <div>
                                <p className="font-medium">Mountain Bike</p>
                                <p className="text-sm text-gray-500">ID: P-1003</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">$30/day</td>
                          <td className="py-4">Sports & Outdoors</td>
                          <td className="py-4">
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                              Maintenance
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Add other tab contents here (orders, messages, earnings, settings) */}
            {/* Show a simple placeholder for other tabs */}
            {(activeTab !== 'overview' && activeTab !== 'products') && (
              <div>
                <h1 className="text-2xl font-bold mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                  <p className="text-gray-500 mb-6">
                    This section is under development. Check back soon for updates!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
