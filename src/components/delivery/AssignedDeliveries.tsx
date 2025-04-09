
import React, { useState } from 'react';
import { 
  MapPinned, 
  CheckCircle, 
  ArrowUpRight, 
  Zap, 
  Phone, 
  Package, 
  X 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock delivery tasks
const deliveryTasks = [
  {
    id: '67890',
    type: 'delivery',
    customer: {
      name: 'Michael Brown',
      phone: '+91 98765 43210'
    },
    address: '789 Pine Blvd, Anytown',
    distance: '2.5 km',
    vendor: 'Tech Store, Mall Road',
    product: {
      name: 'Mountain Bike',
      quantity: 1
    },
    status: 'in-progress',
    instructions: 'Please call upon arrival, gate code: 1234',
    timeline: [
      {
        action: 'pickup_completed',
        time: '01:30 PM'
      },
      {
        action: 'in_transit',
        time: '01:35 PM'
      }
    ],
    otp: '4321'
  },
  {
    id: '67891',
    type: 'pickup',
    customer: {
      name: 'Jennifer Lee',
      phone: '+91 98765 43211'
    },
    address: '123 West Avenue, Anytown',
    distance: '3.7 km',
    vendor: 'Camera Store, Market Square',
    product: {
      name: 'Professional Tripod',
      quantity: 1
    },
    status: 'scheduled',
    instructions: 'Ring doorbell twice',
    timeline: [],
    otp: '5678'
  },
  {
    id: '67892',
    type: 'return',
    customer: {
      name: 'David Smith',
      phone: '+91 98765 43212'
    },
    address: '456 East Road, Anytown',
    distance: '1.8 km',
    vendor: 'Sports Rental, Stadium Road',
    product: {
      name: 'Camping Tent',
      quantity: 1
    },
    status: 'scheduled',
    instructions: 'Customer will meet outside the building',
    timeline: [],
    otp: '9012'
  }
];

const AssignedDeliveries = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter tasks based on status and search query
  const filteredTasks = deliveryTasks.filter(task => {
    const matchesStatus = filter === 'all' || task.status === filter;
    const matchesSearch = task.id.includes(searchQuery) || 
                         task.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Assigned Deliveries</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input 
            placeholder="Search by order ID, customer name, product..." 
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Card key={task.id} className={task.status === 'in-progress' ? "border-l-4 border-blue-500" : ""}>
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">Order #{task.id}</h3>
                    <p className="text-sm text-gray-500">
                      {task.type === 'delivery' && `Pickup from: ${task.vendor}`}
                      {task.type === 'pickup' && `Return to: ${task.vendor}`}
                      {task.type === 'return' && `Return pickup from customer`}
                    </p>
                  </div>
                  <Badge className={
                    task.status === 'completed' ? "bg-green-100 text-green-800" :
                    task.status === 'in-progress' ? "bg-blue-100 text-blue-800" :
                    task.status === 'failed' ? "bg-red-100 text-red-800" :
                    "bg-yellow-100 text-yellow-800"
                  }>
                    {task.status === 'in-progress' ? "In Progress" :
                     task.status === 'completed' ? "Completed" :
                     task.status === 'failed' ? "Failed" : "Scheduled"}
                  </Badge>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Customer</h4>
                    <p>{task.customer.name}</p>
                    <p className="text-sm">{task.customer.phone}</p>
                    
                    <h4 className="text-sm font-medium text-gray-500 mt-4 mb-1">
                      {task.type === 'pickup' ? 'Pickup Address' : 'Delivery Address'}
                    </h4>
                    <p>{task.address}</p>
                    <p className="text-sm text-gray-500">{task.distance} away</p>
                    
                    <h4 className="text-sm font-medium text-gray-500 mt-4 mb-1">Instructions</h4>
                    <p className="text-sm">{task.instructions}</p>
                    
                    {task.otp && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Verification OTP</h4>
                        <div className="bg-gray-100 p-2 rounded text-center font-mono font-bold">
                          {task.otp}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Products</h4>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded bg-gray-100 mr-3 flex items-center justify-center text-gray-400">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{task.product.name}</p>
                        <p className="text-sm text-gray-500">QTY: {task.product.quantity}</p>
                      </div>
                    </div>
                    
                    {task.timeline.length > 0 && (
                      <>
                        <h4 className="text-sm font-medium text-gray-500 mt-4 mb-1">Timeline</h4>
                        <div className="text-sm space-y-2">
                          {task.timeline.map((event, index) => (
                            <div key={index} className="flex items-center">
                              {event.action === 'pickup_completed' ? (
                                <CheckCircle size={16} className="text-green-500 mr-2" />
                              ) : (
                                <ArrowUpRight size={16} className="text-blue-500 mr-2" />
                              )}
                              <span>
                                {event.action === 'pickup_completed' && `Pickup completed at ${event.time}`}
                                {event.action === 'in_transit' && `In transit since ${event.time}`}
                                {event.action === 'delivered' && `Delivered at ${event.time}`}
                                {event.action === 'failed' && `Delivery failed at ${event.time}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    
                    <div className="mt-6 flex gap-2 flex-wrap">
                      {task.status === 'scheduled' && (
                        <>
                          <Button className="flex-1 bg-brand-purple">
                            Accept Task
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                      
                      {task.status === 'in-progress' && (
                        <>
                          <Button className="bg-brand-purple">
                            <MapPinned className="h-4 w-4 mr-2" />
                            Navigate
                          </Button>
                          <Button variant="outline">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button className="bg-green-600 w-full mt-2">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Delivered
                          </Button>
                          <Button variant="outline" className="w-full mt-2 text-red-500 border-red-200">
                            Report Issue
                          </Button>
                        </>
                      )}
                      
                      {task.status === 'completed' && (
                        <Button variant="outline" className="w-full">View Details</Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedDeliveries;
