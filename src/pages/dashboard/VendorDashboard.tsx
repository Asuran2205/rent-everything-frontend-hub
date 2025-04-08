
import React, { useState } from 'react';
import { 
  Package, 
  Box, 
  Settings, 
  PlusCircle, 
  Inbox, 
  BarChart, 
  DollarSign,
  MessageSquare,
  Star,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Upload,
  Info,
  Truck,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for vendor dashboard
const revenueData = [
  { name: 'Jan', revenue: 90000 },
  { name: 'Feb', revenue: 142500 },
  { name: 'Mar', revenue: 112500 },
  { name: 'Apr', revenue: 180000 },
  { name: 'May', revenue: 135000 },
  { name: 'Jun', revenue: 210000 },
];

// Mock products data
const productsData = [
  { 
    id: 1, 
    name: "High-End DSLR Camera", 
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1000", 
    price: 2625, 
    category: "Electronics", 
    status: "active",
    stock: 3,
    rentedOut: 2
  },
  { 
    id: 2, 
    name: "Professional Power Drill Set", 
    image: "https://images.unsplash.com/photo-1616345840969-855ef4b4f6b5?auto=format&fit=crop&q=80&w=1000", 
    price: 1875, 
    category: "Tools & Equipment", 
    status: "active",
    stock: 5,
    rentedOut: 1
  },
  { 
    id: 3, 
    name: "Mountain Bike", 
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000", 
    price: 2250, 
    category: "Sports & Outdoors", 
    status: "maintenance",
    stock: 2,
    rentedOut: 0
  },
  { 
    id: 4, 
    name: "Luxury Sofa", 
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000", 
    price: 3750, 
    category: "Furniture", 
    status: "active",
    stock: 1,
    rentedOut: 1
  },
  { 
    id: 5, 
    name: "Virtual Reality Headset", 
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=1000", 
    price: 2250, 
    category: "Electronics", 
    status: "inactive",
    stock: 2,
    rentedOut: 0
  }
];

// Mock orders data
const ordersData = [
  { 
    id: "ORD-7861", 
    product: "High-End DSLR Camera", 
    customer: "John Cooper", 
    customerEmail: "john@example.com",
    customerPhone: "9876543210",
    date: "Apr 8, 2025", 
    startDate: "Apr 10, 2025",
    endDate: "Apr 15, 2025",
    status: "delivered", 
    amount: 13125,
    address: "123 Main St, Anytown"
  },
  { 
    id: "ORD-7860", 
    product: "Professional Power Drill Set", 
    customer: "Sarah Wilson", 
    customerEmail: "sarah@example.com",
    customerPhone: "9876543211",
    date: "Apr 7, 2025", 
    startDate: "Apr 9, 2025",
    endDate: "Apr 11, 2025",
    status: "confirmed", 
    amount: 3750,
    address: "456 Oak Ave, Anytown" 
  },
  { 
    id: "ORD-7859", 
    product: "Mountain Bike", 
    customer: "Michael Brown", 
    customerEmail: "michael@example.com",
    customerPhone: "9876543212",
    date: "Apr 6, 2025", 
    startDate: "Apr 15, 2025",
    endDate: "Apr 22, 2025",
    status: "pending", 
    amount: 6750,
    address: "789 Pine Blvd, Anytown"
  },
  { 
    id: "ORD-7858", 
    product: "Luxury Sofa", 
    customer: "Emily Davis", 
    customerEmail: "emily@example.com",
    customerPhone: "9876543213",
    date: "Apr 5, 2025", 
    startDate: "Apr 20, 2025",
    endDate: "Apr 27, 2025",
    status: "confirmed", 
    amount: 26250,
    address: "101 Cedar St, Anytown"
  }
];

// Mock messages data
const messagesData = [
  {
    id: "msg-001",
    customer: "John Cooper",
    avatar: null,
    messages: [
      { sender: "customer", text: "Hi, I'm interested in renting your DSLR camera. Does it come with a tripod?", time: "2025-04-08T14:30:00" },
      { sender: "vendor", text: "Hello John! Yes, it comes with a professional tripod and an extra battery pack.", time: "2025-04-08T14:45:00" },
      { sender: "customer", text: "Great, thanks! One more question - what's your policy if I need to extend the rental period?", time: "2025-04-08T15:00:00" },
    ],
    unread: 1
  },
  {
    id: "msg-002",
    customer: "Sarah Wilson",
    avatar: null,
    messages: [
      { sender: "customer", text: "Is your power drill set available for next weekend?", time: "2025-04-07T10:15:00" },
      { sender: "vendor", text: "Hi Sarah, yes it is available. Would you like to make a reservation?", time: "2025-04-07T10:30:00" },
    ],
    unread: 0
  },
  {
    id: "msg-003",
    customer: "Michael Brown",
    avatar: null,
    messages: [
      { sender: "customer", text: "I'd like to rent your mountain bike for a week starting April 15th.", time: "2025-04-06T16:20:00" },
    ],
    unread: 1
  }
];

// Mock earnings data
const earningsData = [
  { month: "January", amount: 90000 },
  { month: "February", amount: 142500 },
  { month: "March", amount: 112500 },
  { month: "April", amount: 45000 },  // Current month in progress
];

const productCategoryData = [
  { name: 'Electronics', value: 40 },
  { name: 'Furniture', value: 20 },
  { name: 'Tools', value: 25 },
  { name: 'Sports', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const categoriesList = [
  "Electronics",
  "Tools & Equipment",
  "Sports & Outdoors",
  "Furniture",
  "Home Appliances",
  "Photography",
  "Party & Events",
  "Clothing",
  "Books",
  "Musical Instruments"
];

const VendorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const sendMessage = () => {
    if (messageText.trim() === '') return;
    
    // In a real app, this would send the message to an API
    console.log("Sending message:", messageText);
    
    // Clear the input field
    setMessageText('');
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
                <div className="flex justify-between w-full">
                  <span>Messages</span>
                  {messagesData.filter(m => m.unread > 0).length > 0 && (
                    <Badge className="bg-brand-orange text-white ml-2">
                      {messagesData.filter(m => m.unread > 0).length}
                    </Badge>
                  )}
                </div>
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
                  <Button 
                    className="bg-gradient-to-r from-brand-orange to-brand-purple"
                    onClick={() => {
                      setActiveTab('products');
                      setShowAddProductForm(true);
                    }}
                  >
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
                      <div className="text-3xl font-bold">₹631,500</div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {/* Revenue Chart */}
                  <Card className="md:col-span-2">
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
                            <ReTooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
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

                  {/* Product Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={productCategoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {productCategoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <ReTooltip formatter={(value, name) => [`${value}%`, name]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

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
                            <th className="pb-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordersData.slice(0, 3).map((order) => (
                            <tr key={order.id} className="border-t">
                              <td className="py-3">{order.id}</td>
                              <td className="py-3">{order.product}</td>
                              <td className="py-3">{order.customer}</td>
                              <td className="py-3">{order.date}</td>
                              <td className="py-3">
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="py-3">₹{order.amount.toFixed(2)}</td>
                              <td className="py-3">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setActiveTab('orders');
                                    setSelectedOrder(order.id);
                                  }}
                                >
                                  Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 text-center">
                      <Button 
                        variant="link" 
                        className="text-brand-orange"
                        onClick={() => setActiveTab('orders')}
                      >
                        View All Orders
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity and Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-brand-orange" onClick={() => setActiveTab('products')}>
                          <Box className="h-4 w-4 mr-2" />
                          Manage Products
                        </Button>
                        <Button className="flex-1" onClick={() => setActiveTab('messages')}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Messages 
                          {messagesData.filter(m => m.unread > 0).length > 0 && (
                            <Badge className="ml-2 bg-white text-brand-orange">
                              {messagesData.filter(m => m.unread > 0).length}
                            </Badge>
                          )}
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="flex-1" variant="outline" onClick={() => setActiveTab('earnings')}>
                          <DollarSign className="h-4 w-4 mr-2" />
                          View Earnings
                        </Button>
                        <Button className="flex-1" variant="outline" onClick={() => setActiveTab('settings')}>
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="px-6 py-2 border-b hover:bg-gray-50">
                        <div className="flex items-center">
                          <Badge className="bg-green-100 text-green-800 mr-3">New Order</Badge>
                          <p className="text-sm">Order #ORD-7861 received from John Cooper</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                      <div className="px-6 py-2 border-b hover:bg-gray-50">
                        <div className="flex items-center">
                          <Badge className="bg-orange-100 text-orange-800 mr-3">Message</Badge>
                          <p className="text-sm">New message from Sarah Wilson</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                      </div>
                      <div className="px-6 py-2 border-b hover:bg-gray-50">
                        <div className="flex items-center">
                          <Badge className="bg-blue-100 text-blue-800 mr-3">Return</Badge>
                          <p className="text-sm">Product "Power Drill Set" returned</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                      </div>
                      <div className="px-6 py-2 hover:bg-gray-50">
                        <div className="flex items-center">
                          <Badge className="bg-yellow-100 text-yellow-800 mr-3">Review</Badge>
                          <p className="text-sm">New 5-star review for "DSLR Camera"</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">My Products</h1>
                  <Button 
                    className="bg-gradient-to-r from-brand-orange to-brand-purple"
                    onClick={() => setShowAddProductForm(!showAddProductForm)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    {showAddProductForm ? "Cancel" : "Add New Product"}
                  </Button>
                </div>

                {showAddProductForm && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Add New Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                          </label>
                          <Input placeholder="Enter product name" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category
                            </label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {categoriesList.map((category) => (
                                    <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Rental Price (₹ per day)
                            </label>
                            <Input type="number" placeholder="Enter price" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Stock Quantity
                            </label>
                            <Input type="number" placeholder="Number of items available" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Condition
                            </label>
                            <Select defaultValue="new">
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="like-new">Like New</SelectItem>
                                  <SelectItem value="excellent">Excellent</SelectItem>
                                  <SelectItem value="good">Good</SelectItem>
                                  <SelectItem value="fair">Fair</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <Textarea placeholder="Describe your product in detail" rows={4} />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Images
                          </label>
                          <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">
                              Drag and drop image files here, or click to select files
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG, GIF up to 5MB
                            </p>
                            <Button variant="outline" size="sm" className="mt-4">
                              Upload Images
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="featured-product"
                            className="mr-2"
                          />
                          <label htmlFor="featured-product">
                            Feature this product on the homepage
                          </label>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowAddProductForm(false)}>
                            Cancel
                          </Button>
                          <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                            Add Product
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <Input placeholder="Search products..." className="md:w-64" />
                    
                    <div className="flex gap-2 ml-auto">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="tools">Tools & Equipment</SelectItem>
                            <SelectItem value="sports">Sports & Outdoors</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-500 text-sm">
                          <th className="pb-4">Product</th>
                          <th className="pb-4">Price</th>
                          <th className="pb-4">Category</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4">Stock</th>
                          <th className="pb-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsData.map((product) => (
                          <tr key={product.id} className="border-t">
                            <td className="py-4">
                              <div className="flex items-center">
                                <div className="w-12 h-12 mr-3">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-500">ID: P-{1000 + product.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">₹{product.price}/day</td>
                            <td className="py-4">{product.category}</td>
                            <td className="py-4">
                              <Badge className={getStatusColor(product.status)}>
                                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-4">
                              <div>
                                <span className="font-medium">{product.stock - product.rentedOut}/{product.stock}</span>
                                <p className="text-xs text-gray-500">Available</p>
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Rental Orders</h1>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search by order ID, customer name..."
                      className="w-full"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[150px]">
                      <SelectValue placeholder="Status filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="returned">Returned</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-full md:w-[150px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="amount-high">Amount (High-Low)</SelectItem>
                        <SelectItem value="amount-low">Amount (Low-High)</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedOrder ? (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Order Details: {selectedOrder}</CardTitle>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                        Back to Orders
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {ordersData.filter(order => order.id === selectedOrder).map(order => (
                        <div key={order.id}>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                  Order Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <dl className="space-y-2">
                                  <div>
                                    <dt className="text-sm text-gray-500">Status</dt>
                                    <dd>
                                      <Badge className={getStatusColor(order.status)}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                      </Badge>
                                    </dd>
                                  </div>
                                  <div>
                                    <dt className="text-sm text-gray-500">Order Date</dt>
                                    <dd>{order.date}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-sm text-gray-500">Rental Period</dt>
                                    <dd>{order.startDate} - {order.endDate}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-sm text-gray-500">Amount</dt>
                                    <dd className="font-medium">₹{order.amount.toFixed(2)}</dd>
                                  </div>
                                </dl>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                  Customer Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <dl className="space-y-2">
                                  <div>
                                    <dt className="text-sm text-gray-500">Name</dt>
                                    <dd>{order.customer}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-sm text-gray-500">Email</dt>
                                    <dd>{order.customerEmail}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-sm text-gray-500">Phone</dt>
                                    <dd>{order.customerPhone}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-sm text-gray-500">Delivery Address</dt>
                                    <dd>{order.address}</dd>
                                  </div>
                                </dl>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                  Product Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <dl className="space-y-2">
                                  <div>
                                    <dt className="text-sm text-gray-500">Product</dt>
                                    <dd>{order.product}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-sm text-gray-500">Quantity</dt>
                                    <dd>1</dd>
                                  </div>
                                </dl>
                              </CardContent>
                            </Card>
                          </div>
                          
                          {/* Order Actions */}
                          <Card>
                            <CardHeader>
                              <CardTitle>Order Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {order.status === 'pending' && (
                                <div className="flex gap-2">
                                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Confirm Order
                                  </Button>
                                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Reject Order
                                  </Button>
                                </div>
                              )}
                              
                              {order.status === 'confirmed' && (
                                <div className="flex gap-2">
                                  <Button className="flex-1 bg-brand-purple">
                                    <Truck className="h-4 w-4 mr-2" />
                                    Mark as Shipped
                                  </Button>
                                </div>
                              )}
                              
                              <div className="mt-4">
                                <Button variant="outline" className="w-full">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Contact Customer
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {ordersData.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                              <h3 className="font-medium text-lg">{order.id}</h3>
                              <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Product</h4>
                              <p>{order.product}</p>
                              <p className="text-sm">Rental Period: {order.startDate} - {order.endDate}</p>
                              
                              <h4 className="text-sm font-medium text-gray-500 mt-3 mb-1">Customer</h4>
                              <p>{order.customer}</p>
                              <p className="text-sm">{order.address}</p>
                            </div>
                            
                            <div className="flex flex-col justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Amount</h4>
                                <p className="text-xl font-semibold text-brand-orange">₹{order.amount.toFixed(2)}</p>
                              </div>
                              
                              <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order.id)}>
                                  View Details
                                </Button>
                                {order.status === 'pending' && (
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    Confirm
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Messages</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>Conversations</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        {messagesData.map((chat) => (
                          <button
                            key={chat.id}
                            className={`w-full text-left px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 ${
                              activeChat === chat.id ? 'bg-orange-50' : ''
                            }`}
                            onClick={() => setActiveChat(chat.id)}
                          >
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback className="bg-brand-purple text-white">
                                  {getInitials(chat.customer)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                  <p className="font-medium truncate">{chat.customer}</p>
                                  {chat.unread > 0 && (
                                    <Badge className="bg-brand-orange text-white">{chat.unread}</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                  {chat.messages[chat.messages.length - 1].text}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="md:col-span-2">
                    {activeChat ? (
                      messagesData.filter((chat) => chat.id === activeChat).map((chat) => (
                        <Card key={chat.id} className="flex flex-col h-full">
                          <CardHeader className="border-b">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarFallback className="bg-brand-purple text-white">
                                    {getInitials(chat.customer)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle>{chat.customer}</CardTitle>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-4">
                              {chat.messages.map((message, idx) => (
                                <div
                                  key={idx}
                                  className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
                                >
                                  <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                      message.sender === 'vendor'
                                        ? 'bg-brand-orange text-white rounded-tr-none'
                                        : 'bg-gray-100 rounded-tl-none'
                                    }`}
                                  >
                                    <p>{message.text}</p>
                                    <p className={`text-xs mt-1 ${message.sender === 'vendor' ? 'text-orange-100' : 'text-gray-500'}`}>
                                      {formatDate(message.time)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <div className="p-4 border-t">
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Type your message..."
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                              />
                              <Button className="bg-brand-orange" onClick={sendMessage}>
                                Send
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <Card className="h-full flex items-center justify-center p-8 text-center">
                        <div>
                          <MessageSquare className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                          <p className="text-gray-500">
                            Choose a customer conversation from the left to view messages
                          </p>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Earnings</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        This Month
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">₹45,000</div>
                      <p className="text-xs text-green-500 mt-1">
                        +15% from last month
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
                      <div className="text-3xl font-bold">₹631,500</div>
                      <p className="text-xs text-gray-500 mt-1">
                        All time revenue
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Pending Payout
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">₹36,000</div>
                      <Button className="mt-2 w-full text-sm h-8" variant="outline">
                        Request Payout
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>Earnings Overview</CardTitle>
                      <Select defaultValue="6months">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="30days">Last 30 Days</SelectItem>
                            <SelectItem value="6months">Last 6 Months</SelectItem>
                            <SelectItem value="1year">Last Year</SelectItem>
                            <SelectItem value="all">All Time</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={earningsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ReTooltip formatter={(value) => [`₹${value}`, 'Earnings']} />
                          <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#FF5E00"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Earnings History</CardTitle>
                      <Button variant="outline" size="sm">
                        Download Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-500 text-sm">
                            <th className="pb-3">Month</th>
                            <th className="pb-3">Order Count</th>
                            <th className="pb-3">Earnings</th>
                            <th className="pb-3">Platform Fee</th>
                            <th className="pb-3">Net Amount</th>
                            <th className="pb-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="py-3">April 2025</td>
                            <td className="py-3">12</td>
                            <td className="py-3">₹45,000</td>
                            <td className="py-3">₹4,500</td>
                            <td className="py-3 font-medium">₹40,500</td>
                            <td className="py-3">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                Pending
                              </Badge>
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="py-3">March 2025</td>
                            <td className="py-3">18</td>
                            <td className="py-3">₹62,500</td>
                            <td className="py-3">₹6,250</td>
                            <td className="py-3 font-medium">₹56,250</td>
                            <td className="py-3">
                              <Badge className="bg-blue-100 text-blue-800">
                                Processing
                              </Badge>
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="py-3">February 2025</td>
                            <td className="py-3">22</td>
                            <td className="py-3">₹78,750</td>
                            <td className="py-3">₹7,875</td>
                            <td className="py-3 font-medium">₹70,875</td>
                            <td className="py-3">
                              <Badge className="bg-green-100 text-green-800">
                                Paid
                              </Badge>
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="py-3">January 2025</td>
                            <td className="py-3">19</td>
                            <td className="py-3">₹67,500</td>
                            <td className="py-3">₹6,750</td>
                            <td className="py-3 font-medium">₹60,750</td>
                            <td className="py-3">
                              <Badge className="bg-green-100 text-green-800">
                                Paid
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
                <h1 className="text-2xl font-bold mb-6">Settings</h1>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Account Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Business Name
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
                          Business Type
                        </label>
                        <Select defaultValue="retail">
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="individual">Individual</SelectItem>
                              <SelectItem value="corporate">Corporate</SelectItem>
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
                  
                  <h2 className="text-lg font-semibold mb-4">Business Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <Input placeholder="Enter your street address" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <Input placeholder="City" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <Input placeholder="State" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PIN Code
                        </label>
                        <Input placeholder="PIN Code" />
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save Address
                    </Button>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bank Name
                        </label>
                        <Input placeholder="Enter bank name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account Number
                        </label>
                        <Input placeholder="Enter account number" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          IFSC Code
                        </label>
                        <Input placeholder="Enter IFSC code" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account Holder Name
                        </label>
                        <Input placeholder="Enter account holder's name" />
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save Payment Details
                    </Button>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h2 className="text-lg font-semibold mb-4">GST Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          GST Number
                        </label>
                        <Input placeholder="Enter GST Number" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Business PAN
                        </label>
                        <Input placeholder="Enter PAN" />
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 p-6 rounded-md">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Upload GST Certificate
                      </label>
                      <div className="flex items-center">
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                        <span className="ml-4 text-sm text-gray-500">
                          No file chosen
                        </span>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save GST Details
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
                        id="message-notifications"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="message-notifications">
                        Customer message notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="payment-notifications"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="payment-notifications">
                        Payment notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="marketing-updates"
                        className="mr-2"
                      />
                      <label htmlFor="marketing-updates">
                        Marketing and promotional emails
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

export default VendorDashboard;

