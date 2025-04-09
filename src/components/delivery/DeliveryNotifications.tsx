
import React from 'react';
import { Bell, Package, CheckCircle, AlertTriangle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'new_task',
    title: 'New Delivery Assignment',
    message: 'You have been assigned a new delivery order #67890',
    time: '5 minutes ago',
    read: false
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Delivery Reminder',
    message: 'Your scheduled pickup for order #67891 is in 30 minutes',
    time: '15 minutes ago',
    read: false
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Received',
    message: 'Your payment of ₹580 for 3 deliveries has been processed',
    time: '2 hours ago',
    read: true
  },
  {
    id: 4,
    type: 'alert',
    title: 'Customer Unreachable',
    message: 'Customer for order #67885 was not available. Task marked as failed.',
    time: '5 hours ago',
    read: true
  },
  {
    id: 5,
    type: 'system',
    title: 'System Maintenance',
    message: 'The app will be under maintenance on April 15 from 2 AM to 4 AM',
    time: '1 day ago',
    read: true
  }
];

const DeliveryNotifications = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Task Assignment</p>
                <p className="text-sm text-gray-500">Get notified when a new delivery task is assigned</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Task Reminders</p>
                <p className="text-sm text-gray-500">Receive reminder 30 minutes before pickup/delivery</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payment Notifications</p>
                <p className="text-sm text-gray-500">Get notified when payment is processed</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Customer Updates</p>
                <p className="text-sm text-gray-500">Receive updates when customer changes order details</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Announcements</p>
                <p className="text-sm text-gray-500">Get notified about system maintenance or updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Button className="bg-brand-purple mt-2">
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Notifications</h2>
          <Button variant="outline" size="sm">
            Mark All as Read
          </Button>
        </div>
        
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className={!notification.read ? "border-l-4 border-brand-purple" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {notification.type === 'new_task' && (
                      <Package className="h-5 w-5 text-brand-purple" />
                    )}
                    {notification.type === 'reminder' && (
                      <Bell className="h-5 w-5 text-amber-500" />
                    )}
                    {notification.type === 'payment' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {notification.type === 'alert' && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    {notification.type === 'system' && (
                      <Bell className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className={`font-medium ${!notification.read ? "text-brand-purple" : ""}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotifications;
