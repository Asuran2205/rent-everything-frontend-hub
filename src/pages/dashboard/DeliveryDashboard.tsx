
import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  UserCheck,
  Clock, 
  Settings, 
  Calendar, 
  BarChart, 
  DollarSign,
  CheckCircle,
  ArrowUpRight,
  Zap,
  MapPinned
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
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

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

// Mock data for schedule
const scheduleData = [
  { id: 1, startTime: '09:00 AM', endTime: '01:00 PM', date: '2025-04-08', status: 'active' },
  { id: 2, startTime: '02:00 PM', endTime: '06:00 PM', date: '2025-04-08', status: 'active' },
  { id: 3, startTime: '09:00 AM', endTime: '01:00 PM', date: '2025-04-09', status: 'active' },
  { id: 4, startTime: '02:00 PM', endTime: '06:00 PM', date: '2025-04-09', status: 'active' },
  { id: 5, startTime: '09:00 AM', endTime: '01:00 PM', date: '2025-04-10', status: 'inactive' },
];

// Mock data for zones
const zoneData = [
  { id: 1, name: 'Downtown', status: 'active', deliveries: 24, earnings: 480 },
  { id: 2, name: 'Westside', status: 'active', deliveries: 18, earnings: 360 },
  { id: 3, name: 'Northside', status: 'active', deliveries: 12, earnings: 240 },
  { id: 4, name: 'Eastside', status: 'inactive', deliveries: 0, earnings: 0 },
];

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

            {activeTab === 'deliveries' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">My Deliveries</h1>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search by order ID, customer name..." 
                      className="w-full"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Deliveries</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="today">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="all-time">All Time</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  {/* Active Delivery */}
                  <Card className="border-l-4 border-blue-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-lg">Order #67890</h3>
                          <p className="text-sm text-gray-500">Pickup from: Tech Store, Mall Road</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Customer</h4>
                          <p>Michael Brown</p>
                          <p className="text-sm">+91 98765 43210</p>
                          
                          <h4 className="text-sm font-medium text-gray-500 mt-4 mb-1">Delivery Address</h4>
                          <p>789 Pine Blvd, Anytown</p>
                          <p className="text-sm text-gray-500">2.5 km away</p>
                          
                          <h4 className="text-sm font-medium text-gray-500 mt-4 mb-1">Instructions</h4>
                          <p className="text-sm">Please call upon arrival, gate code: 1234</p>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Products</h4>
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded bg-gray-100 mr-3 flex items-center justify-center text-gray-400">
                              <Zap size={20} />
                            </div>
                            <div>
                              <p className="font-medium">Mountain Bike</p>
                              <p className="text-sm text-gray-500">QTY: 1</p>
                            </div>
                          </div>
                          
                          <h4 className="text-sm font-medium text-gray-500 mt-4 mb-1">Timeline</h4>
                          <div className="text-sm space-y-2">
                            <div className="flex items-center">
                              <CheckCircle size={16} className="text-green-500 mr-2" />
                              <span>Pickup completed at 01:30 PM</span>
                            </div>
                            <div className="flex items-center">
                              <ArrowUpRight size={16} className="text-blue-500 mr-2" />
                              <span>In transit since 01:35 PM</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex gap-2">
                            <Button className="flex-1 bg-brand-purple">
                              <MapPinned className="h-4 w-4 mr-2" />
                              Navigate
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Contact Customer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Completed Deliveries */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-lg">Order #67889</h3>
                          <p className="text-sm text-gray-500">Pickup from: Electronics Hub, Market Square</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Customer</h4>
                          <p>Sarah Wilson</p>
                          
                          <h4 className="text-sm font-medium text-gray-500 mt-4 mb-1">Delivery Address</h4>
                          <p>456 Oak Ave, Anytown</p>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Products</h4>
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded bg-gray-100 mr-3 flex items-center justify-center text-gray-400">
                              <Zap size={20} />
                            </div>
                            <div>
                              <p className="font-medium">Power Drill Set</p>
                              <p className="text-sm text-gray-500">QTY: 1</p>
                            </div>
                          </div>
                          
                          <h4 className="text-sm font-medium text-gray-500 mt-4 mb-1">Timeline</h4>
                          <div className="text-sm">
                            <p>Delivered at 11:15 AM</p>
                            <p className="text-green-500">Completed in 25 minutes</p>
                          </div>
                          
                          <div className="mt-6">
                            <Button variant="outline">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-lg">Order #67888</h3>
                          <p className="text-sm text-gray-500">Pickup from: Camera World, Tech Park</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Customer</h4>
                          <p>John Cooper</p>
                          
                          <h4 className="text-sm font-medium text-gray-500 mt-4 mb-1">Delivery Address</h4>
                          <p>123 Main St, Anytown</p>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Products</h4>
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded bg-gray-100 mr-3 flex items-center justify-center text-gray-400">
                              <Zap size={20} />
                            </div>
                            <div>
                              <p className="font-medium">DSLR Camera</p>
                              <p className="text-sm text-gray-500">QTY: 1</p>
                            </div>
                          </div>
                          
                          <h4 className="text-sm font-medium text-gray-500 mt-4 mb-1">Timeline</h4>
                          <div className="text-sm">
                            <p>Delivered at 09:30 AM</p>
                            <p className="text-green-500">Completed in 20 minutes</p>
                          </div>
                          
                          <div className="mt-6">
                            <Button variant="outline">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Schedule</h1>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Your Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="font-medium text-lg mb-4">Today</h3>
                        {scheduleData.filter(s => s.date === '2025-04-08').map((slot) => (
                          <div key={slot.id} className="mb-3 p-3 bg-gray-50 rounded border">
                            <div className="flex justify-between">
                              <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                              <Badge className={slot.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                {slot.status === 'active' ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-4">Tomorrow</h3>
                        {scheduleData.filter(s => s.date === '2025-04-09').map((slot) => (
                          <div key={slot.id} className="mb-3 p-3 bg-gray-50 rounded border">
                            <div className="flex justify-between">
                              <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                              <Badge className={slot.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                {slot.status === 'active' ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-4">Day After Tomorrow</h3>
                        {scheduleData.filter(s => s.date === '2025-04-10').map((slot) => (
                          <div key={slot.id} className="mb-3 p-3 bg-gray-50 rounded border">
                            <div className="flex justify-between">
                              <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                              <Badge className={slot.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                {slot.status === 'active' ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            {slot.status === 'inactive' && (
                              <Button size="sm" className="mt-2 w-full bg-brand-purple">
                                Set as Available
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <Input type="date" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                        <Input type="time" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                        <Input type="time" />
                      </div>
                    </div>
                    <Button className="mt-6 bg-brand-purple">
                      Add Availability
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'locations' && (
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
            )}

            {activeTab === 'earnings' && (
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
            )}

            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          type="text"
                          value={user?.name || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={user?.email || ''}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Vehicle Type
                        </label>
                        <Select defaultValue="motorcycle">
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="motorcycle">Motorcycle</SelectItem>
                              <SelectItem value="car">Car</SelectItem>
                              <SelectItem value="bicycle">Bicycle</SelectItem>
                              <SelectItem value="van">Delivery Van</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save Changes
                    </Button>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h2 className="text-lg font-semibold mb-4">Document Verification</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ID Proof
                        </label>
                        <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                          <p className="text-sm text-gray-500 mb-2">Upload your ID proof</p>
                          <Button variant="outline" size="sm">Upload</Button>
                          <p className="text-xs text-green-600 mt-2">Verified</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Vehicle Registration
                        </label>
                        <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                          <p className="text-sm text-gray-500 mb-2">Upload your vehicle registration</p>
                          <Button variant="outline" size="sm">Upload</Button>
                          <p className="text-xs text-green-600 mt-2">Verified</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bank Account Number
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter account number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          IFSC Code
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter IFSC code"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Holder Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter account holder name"
                      />
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save Payment Details
                    </Button>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="order-notifications"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="order-notifications">
                        New order notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="earning-notifications"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="earning-notifications">
                        Earnings updates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="schedule-notifications"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="schedule-notifications">
                        Schedule reminders
                      </label>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save Preferences
                    </Button>
                  </div>
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

