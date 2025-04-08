
import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  UserCheck,
  Clock, 
  Settings, 
  Calendar, 
  BarChart, 
  DollarSign 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Mock data for delivery partner dashboard
const deliveriesData = [
  { day: 'Mon', deliveries: 5 },
  { day: 'Tue', deliveries: 8 },
  { day: 'Wed', deliveries: 4 },
  { day: 'Thu', deliveries: 6 },
  { day: 'Fri', deliveries: 9 },
  { day: 'Sat', deliveries: 12 },
  { day: 'Sun', deliveries: 3 },
];

const DeliveryDashboard = () => {
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
                  <AvatarFallback className="bg-brand-purple text-white">
                    {user?.name ? getInitials(user.name) : 'D'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold text-lg">{user?.name || 'Delivery Partner'}</h2>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
              <div className="border-t pt-4 mt-2">
                <p className="text-sm text-gray-500">Partner since April 2025</p>
                <div className="mt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Online</Badge>
                </div>
              </div>
            </div>

            <nav className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'overview' ? 'bg-brand-purple/10 border-l-4 border-brand-purple' : ''
                }`}
                onClick={() => setActiveTab('overview')}
              >
                <BarChart className="h-5 w-5 mr-3" />
                <span>Overview</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'deliveries' ? 'bg-brand-purple/10 border-l-4 border-brand-purple' : ''
                }`}
                onClick={() => setActiveTab('deliveries')}
              >
                <Truck className="h-5 w-5 mr-3" />
                <span>My Deliveries</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'schedule' ? 'bg-brand-purple/10 border-l-4 border-brand-purple' : ''
                }`}
                onClick={() => setActiveTab('schedule')}
              >
                <Calendar className="h-5 w-5 mr-3" />
                <span>Schedule</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'locations' ? 'bg-brand-purple/10 border-l-4 border-brand-purple' : ''
                }`}
                onClick={() => setActiveTab('locations')}
              >
                <MapPin className="h-5 w-5 mr-3" />
                <span>Delivery Zones</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'earnings' ? 'bg-brand-purple/10 border-l-4 border-brand-purple' : ''
                }`}
                onClick={() => setActiveTab('earnings')}
              >
                <DollarSign className="h-5 w-5 mr-3" />
                <span>Earnings</span>
              </button>

              <button
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === 'settings' ? 'bg-brand-purple/10 border-l-4 border-brand-purple' : ''
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Account Settings</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
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
                      <div className="text-3xl font-bold">$685</div>
                      <p className="text-xs text-green-500 mt-1">
                        +$85 from last week
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
                        <ReBarChart data={deliveriesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="deliveries" fill="#9D00FF" />
                        </ReBarChart>
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
            )}

            {/* Add other tab contents here (deliveries, schedule, zones, earnings, settings) */}
            {/* Show a simple placeholder for other tabs */}
            {activeTab !== 'overview' && (
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

export default DeliveryDashboard;
