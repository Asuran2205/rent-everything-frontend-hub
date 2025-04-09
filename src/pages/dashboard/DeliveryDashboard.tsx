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
  Bell,
  MessageSquare,
  Package,
  CheckCircle,
  Camera
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

// Import the delivery partner components
import DeliveryOverview from '@/components/delivery/DeliveryOverview';
import AssignedDeliveries from '@/components/delivery/AssignedDeliveries';
import DeliverySchedule from '@/components/delivery/DeliverySchedule';
import DeliveryZones from '@/components/delivery/DeliveryZones';
import DeliveryEarnings from '@/components/delivery/DeliveryEarnings';
import DeliveryProfile from '@/components/delivery/DeliveryProfile';
import DeliveryNotifications from '@/components/delivery/DeliveryNotifications';
import DeliveryNavigation from '@/components/delivery/DeliveryNavigation';
import DeliveryProof from '@/components/delivery/DeliveryProof';
import DeliverySupport from '@/components/delivery/DeliverySupport';

const DeliveryDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart className="h-4 w-4" /> },
    { id: 'deliveries', label: 'Tasks', icon: <Package className="h-4 w-4" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="h-4 w-4" /> },
    { id: 'locations', label: 'Zones', icon: <MapPin className="h-4 w-4" /> },
    { id: 'earnings', label: 'Earnings', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'profile', label: 'Profile', icon: <UserCheck className="h-4 w-4" /> },
    { id: 'notifications', label: 'Alerts', icon: <Bell className="h-4 w-4" /> },
    { id: 'navigation', label: 'Map', icon: <MapPin className="h-4 w-4" /> },
    { id: 'proof', label: 'Proof', icon: <Camera className="h-4 w-4" /> },
    { id: 'support', label: 'Support', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> }
  ];

  const primaryNavItems = menuItems.slice(0, 5);
  
  return (
    <div className="container mx-auto p-4 pb-20 md:pb-4">
      <h1 className="text-3xl font-bold mb-8">Delivery Partner Dashboard</h1>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
        {isMobile ? (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">{menuItems.find(item => item.id === activeTab)?.label}</h2>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm">
                    All Sections
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">Dashboard Sections</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {menuItems.map((item) => (
                        <Button
                          key={item.id}
                          variant={activeTab === item.id ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => {
                            handleTabChange(item.id);
                          }}
                        >
                          {item.icon}
                          <span className="ml-2">{item.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-48 flex-shrink-0">
              <TabsList className="h-auto flex flex-col justify-start bg-gray-100 p-2 rounded-md w-full">
                {menuItems.map((item) => (
                  <TabsTrigger 
                    key={item.id}
                    value={item.id} 
                    className="w-full justify-start mb-1"
                  >
                    {item.icon} <span className="ml-2">{item.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="overview" className="mt-0">
                <DeliveryOverview />
              </TabsContent>
              
              <TabsContent value="deliveries" className="mt-0">
                <AssignedDeliveries />
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-0">
                <DeliverySchedule />
              </TabsContent>
              
              <TabsContent value="locations" className="mt-0">
                <DeliveryZones />
              </TabsContent>
              
              <TabsContent value="earnings" className="mt-0">
                <DeliveryEarnings />
              </TabsContent>
              
              <TabsContent value="profile" className="mt-0">
                <DeliveryProfile />
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <DeliveryNotifications />
              </TabsContent>
              
              <TabsContent value="navigation" className="mt-0">
                <DeliveryNavigation />
              </TabsContent>
              
              <TabsContent value="proof" className="mt-0">
                <DeliveryProof />
              </TabsContent>
              
              <TabsContent value="support" className="mt-0">
                <DeliverySupport />
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                  
                  <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={useAuth().user?.name || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={useAuth().user?.email || ''}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Vehicle Type
                        </label>
                        
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
                        <input
                          type="text"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter account number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter IFSC code"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        id="order-notifications"
                        defaultChecked
                      />
                      <label htmlFor="order-notifications" className="ml-2 block text-sm text-gray-900">
                        New order notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        id="earning-notifications"
                        defaultChecked
                      />
                      <label htmlFor="earning-notifications" className="ml-2 block text-sm text-gray-900">
                        Earnings updates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        id="schedule-notifications"
                        defaultChecked
                      />
                      <label htmlFor="schedule-notifications" className="ml-2 block text-sm text-gray-900">
                        Schedule reminders
                      </label>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        )}
        
        {isMobile && (
          <>
            <div className="mb-20">
              <TabsContent value="overview" className="mt-0">
                <DeliveryOverview />
              </TabsContent>
              
              <TabsContent value="deliveries" className="mt-0">
                <AssignedDeliveries />
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-0">
                <DeliverySchedule />
              </TabsContent>
              
              <TabsContent value="locations" className="mt-0">
                <DeliveryZones />
              </TabsContent>
              
              <TabsContent value="earnings" className="mt-0">
                <DeliveryEarnings />
              </TabsContent>
              
              <TabsContent value="profile" className="mt-0">
                <DeliveryProfile />
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <DeliveryNotifications />
              </TabsContent>
              
              <TabsContent value="navigation" className="mt-0">
                <DeliveryNavigation />
              </TabsContent>
              
              <TabsContent value="proof" className="mt-0">
                <DeliveryProof />
              </TabsContent>
              
              <TabsContent value="support" className="mt-0">
                <DeliverySupport />
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                  
                  <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={useAuth().user?.name || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={useAuth().user?.email || ''}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Vehicle Type
                        </label>
                        
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
                        <input
                          type="text"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter account number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter IFSC code"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        id="order-notifications"
                        defaultChecked
                      />
                      <label htmlFor="order-notifications" className="ml-2 block text-sm text-gray-900">
                        New order notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        id="earning-notifications"
                        defaultChecked
                      />
                      <label htmlFor="earning-notifications" className="ml-2 block text-sm text-gray-900">
                        Earnings updates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        id="schedule-notifications"
                        defaultChecked
                      />
                      <label htmlFor="schedule-notifications" className="ml-2 block text-sm text-gray-900">
                        Schedule reminders
                      </label>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
              <div className="flex justify-around">
                {primaryNavItems.map((item) => (
                  <button 
                    key={item.id}
                    className={`flex flex-col items-center py-2 px-1 ${activeTab === item.id ? 'text-primary' : 'text-gray-500'}`}
                    onClick={() => handleTabChange(item.id)}
                  >
                    {item.icon}
                    <span className="text-xs mt-1">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default DeliveryDashboard;
