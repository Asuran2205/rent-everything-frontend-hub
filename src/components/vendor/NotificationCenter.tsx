
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bell, Settings, Trash2, AlertCircle, CheckCircle, Clock, Package, User, DollarSign } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'request' | 'payment' | 'return' | 'system' | 'approval';
  title: string;
  message: string;
  time: string;
  read: boolean;
  action?: string;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'request',
      title: 'New Rental Request',
      message: 'John Doe has requested to rent your DSLR Camera',
      time: '10 minutes ago',
      read: false,
      action: 'View Request'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'You received a payment of ₹3,500 for Drone rental',
      time: '2 hours ago',
      read: false,
      action: 'View Details'
    },
    {
      id: '3',
      type: 'return',
      title: 'Upcoming Return',
      message: 'Mountain Bike is due to be returned tomorrow',
      time: '5 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'approval',
      title: 'Product Approved',
      message: 'Your listing "Power Tools Set" has been approved',
      time: 'Yesterday',
      read: true,
      action: 'View Product'
    },
    {
      id: '5',
      type: 'system',
      title: 'Profile Incomplete',
      message: 'Please complete your KYC verification to continue receiving payments',
      time: '2 days ago',
      read: true,
      action: 'Complete Now'
    }
  ]);
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      rentalRequests: true,
      payments: true,
      returns: true,
      productApprovals: true,
      systemAlerts: true
    },
    push: {
      rentalRequests: true,
      payments: true,
      returns: true,
      productApprovals: false,
      systemAlerts: false
    },
    sms: {
      rentalRequests: false,
      payments: true,
      returns: false,
      productApprovals: false,
      systemAlerts: false
    }
  });
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    toast.success('All notifications marked as read');
  };
  
  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };
  
  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };
  
  const handleSettingChange = (category: keyof typeof notificationSettings, setting: keyof typeof notificationSettings.email, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };
  
  const handleSaveSettings = () => {
    toast.success('Notification settings saved successfully');
    setIsSettingsOpen(false);
  };
  
  const handleActionClick = (notification: Notification) => {
    markAsRead(notification.id);
    toast.info(`Action triggered: ${notification.action}`);
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'request':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'return':
        return <Package className="h-5 w-5 text-orange-500" />;
      case 'system':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'approval':
        return <CheckCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <div className="ml-3 px-2 py-1 bg-brand-orange text-white text-xs font-medium rounded-full">
              {unreadCount} new
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCircle className="h-4 w-4 mr-1" /> Mark All Read
          </Button>
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-1" /> Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Notification Settings</DialogTitle>
                <DialogDescription>
                  Choose how and when you want to be notified
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-6">
                  <div className="grid grid-cols-4 gap-4 mb-2 font-medium">
                    <div>Notification Type</div>
                    <div className="text-center">Email</div>
                    <div className="text-center">Push</div>
                    <div className="text-center">SMS</div>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-4 items-center py-2 border-b">
                      <div>Rental Requests</div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.email.rentalRequests} 
                          onCheckedChange={(value) => handleSettingChange('email', 'rentalRequests', value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.push.rentalRequests} 
                          onCheckedChange={(value) => handleSettingChange('push', 'rentalRequests', value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.sms.rentalRequests} 
                          onCheckedChange={(value) => handleSettingChange('sms', 'rentalRequests', value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 items-center py-2 border-b">
                      <div>Payments</div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.email.payments} 
                          onCheckedChange={(value) => handleSettingChange('email', 'payments', value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.push.payments} 
                          onCheckedChange={(value) => handleSettingChange('push', 'payments', value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.sms.payments} 
                          onCheckedChange={(value) => handleSettingChange('sms', 'payments', value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 items-center py-2 border-b">
                      <div>Returns</div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.email.returns} 
                          onCheckedChange={(value) => handleSettingChange('email', 'returns', value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.push.returns} 
                          onCheckedChange={(value) => handleSettingChange('push', 'returns', value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.sms.returns} 
                          onCheckedChange={(value) => handleSettingChange('sms', 'returns', value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 items-center py-2 border-b">
                      <div>Product Approvals</div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.email.productApprovals} 
                          onCheckedChange={(value) => handleSettingChange('email', 'productApprovals', value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.push.productApprovals} 
                          onCheckedChange={(value) => handleSettingChange('push', 'productApprovals', value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.sms.productApprovals} 
                          onCheckedChange={(value) => handleSettingChange('sms', 'productApprovals', value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 items-center py-2">
                      <div>System Alerts</div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.email.systemAlerts} 
                          onCheckedChange={(value) => handleSettingChange('email', 'systemAlerts', value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.push.systemAlerts} 
                          onCheckedChange={(value) => handleSettingChange('push', 'systemAlerts', value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch 
                          checked={notificationSettings.sms.systemAlerts} 
                          onCheckedChange={(value) => handleSettingChange('sms', 'systemAlerts', value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Frequency</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="realTime" name="frequency" defaultChecked />
                      <label htmlFor="realTime">Real-time</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="daily" name="frequency" />
                      <label htmlFor="daily">Daily digest</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="weekly" name="frequency" />
                      <label htmlFor="weekly">Weekly summary</label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map(notification => (
                <Card 
                  key={notification.id}
                  className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-brand-orange' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex">
                      <div className="mt-1 mr-3">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-800'}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                        <div className="flex justify-between items-center">
                          {notification.action && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleActionClick(notification)}
                            >
                              {notification.action}
                            </Button>
                          )}
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {notifications.length > 0 && (
                <div className="text-center mt-6">
                  <Button variant="outline" onClick={handleClearAll}>
                    <Trash2 className="h-4 w-4 mr-1" /> Clear All Notifications
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No Notifications</h3>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="unread" className="mt-0">
          {notifications.filter(n => !n.read).length > 0 ? (
            <div className="space-y-4">
              {notifications
                .filter(notification => !notification.read)
                .map(notification => (
                  <Card 
                    key={notification.id}
                    className="border-l-4 border-l-brand-orange overflow-hidden"
                  >
                    <CardContent className="p-4">
                      <div className="flex">
                        <div className="mt-1 mr-3">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-black">
                              {notification.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{notification.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                          <div className="flex justify-between items-center">
                            {notification.action && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleActionClick(notification)}
                              >
                                {notification.action}
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">All Caught Up</h3>
              <p className="text-gray-500">You have no unread notifications</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="requests" className="mt-0">
          {notifications.filter(n => n.type === 'request').length > 0 ? (
            <div className="space-y-4">
              {notifications
                .filter(notification => notification.type === 'request')
                .map(notification => (
                  <Card 
                    key={notification.id}
                    className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-brand-orange' : ''}`}
                  >
                    <CardContent className="p-4">
                      {/* Same notification card structure as above */}
                      <div className="flex">
                        <div className="mt-1 mr-3">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-800'}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{notification.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                          <div className="flex justify-between items-center">
                            {notification.action && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleActionClick(notification)}
                              >
                                {notification.action}
                              </Button>
                            )}
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No Requests</h3>
              <p className="text-gray-500">You have no rental requests notifications</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="payments" className="mt-0">
          {notifications.filter(n => n.type === 'payment').length > 0 ? (
            <div className="space-y-4">
              {notifications
                .filter(notification => notification.type === 'payment')
                .map(notification => (
                  <Card 
                    key={notification.id}
                    className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-brand-orange' : ''}`}
                  >
                    <CardContent className="p-4">
                      {/* Same notification card structure as above */}
                      <div className="flex">
                        <div className="mt-1 mr-3">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-800'}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{notification.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                          <div className="flex justify-between items-center">
                            {notification.action && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleActionClick(notification)}
                              >
                                {notification.action}
                              </Button>
                            )}
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No Payments</h3>
              <p className="text-gray-500">You have no payment notifications</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="returns" className="mt-0">
          {notifications.filter(n => n.type === 'return').length > 0 ? (
            <div className="space-y-4">
              {notifications
                .filter(notification => notification.type === 'return')
                .map(notification => (
                  <Card 
                    key={notification.id}
                    className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-brand-orange' : ''}`}
                  >
                    <CardContent className="p-4">
                      {/* Same notification card structure as above */}
                      <div className="flex">
                        <div className="mt-1 mr-3">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-800'}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{notification.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                          <div className="flex justify-between items-center">
                            {notification.action && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleActionClick(notification)}
                              >
                                {notification.action}
                              </Button>
                            )}
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No Returns</h3>
              <p className="text-gray-500">You have no return notifications</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
