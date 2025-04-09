import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, Package, CircleDollarSign, MessageSquare, 
  Settings, ShieldCheck, Star, Inbox, Bell, UserCheck,
  Menu
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import VendorOverview from '@/components/vendor/VendorOverview';
import ProductManagement from '@/components/vendor/ProductManagement';
import RentalRequests from '@/components/vendor/RentalRequests';
import EarningsPayments from '@/components/vendor/EarningsPayments';
import ProfileKYC from '@/components/vendor/ProfileKYC';
import ReturnClaims from '@/components/vendor/ReturnClaims';
import RatingsReviews from '@/components/vendor/RatingsReviews';
import Promotions from '@/components/vendor/Promotions';
import InventoryTracker from '@/components/vendor/InventoryTracker';
import MessageCenter from '@/components/vendor/MessageCenter';
import NotificationCenter from '@/components/vendor/NotificationCenter';
import { Button } from '@/components/ui/button';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'products', label: 'Products', icon: <Package className="h-4 w-4" /> },
    { id: 'orders', label: 'Requests', icon: <Inbox className="h-4 w-4" /> },
    { id: 'earnings', label: 'Earnings', icon: <CircleDollarSign className="h-4 w-4" /> },
    { id: 'profile', label: 'Profile', icon: <UserCheck className="h-4 w-4" /> },
    { id: 'returns', label: 'Returns', icon: <ShieldCheck className="h-4 w-4" /> },
    { id: 'ratings', label: 'Ratings', icon: <Star className="h-4 w-4" /> },
    { id: 'promotions', label: 'Promos', icon: <Settings className="h-4 w-4" /> },
    { id: 'inventory', label: 'Inventory', icon: <Package className="h-4 w-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'notifications', label: 'Alerts', icon: <Bell className="h-4 w-4" /> }
  ];

  const primaryNavItems = menuItems.slice(0, 5);
  
  return (
    <div className="container mx-auto p-4 pb-20 md:pb-4">
      <h1 className="text-3xl font-bold mb-8">Vendor Dashboard</h1>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
        {isMobile ? (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">{menuItems.find(item => item.id === activeTab)?.label}</h2>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="mr-2 h-4 w-4" />
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
                <VendorOverview />
              </TabsContent>
              
              <TabsContent value="products" className="mt-0">
                <ProductManagement />
              </TabsContent>
              
              <TabsContent value="orders" className="mt-0">
                <RentalRequests />
              </TabsContent>
              
              <TabsContent value="earnings" className="mt-0">
                <EarningsPayments />
              </TabsContent>
              
              <TabsContent value="profile" className="mt-0">
                <ProfileKYC />
              </TabsContent>
              
              <TabsContent value="returns" className="mt-0">
                <ReturnClaims />
              </TabsContent>
              
              <TabsContent value="ratings" className="mt-0">
                <RatingsReviews />
              </TabsContent>
              
              <TabsContent value="promotions" className="mt-0">
                <Promotions />
              </TabsContent>
              
              <TabsContent value="inventory" className="mt-0">
                <InventoryTracker />
              </TabsContent>
              
              <TabsContent value="messages" className="mt-0">
                <MessageCenter />
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <NotificationCenter />
              </TabsContent>
            </div>
          </div>
        )}
        
        {isMobile && (
          <>
            <div className="mb-20">
              <TabsContent value="overview" className="mt-0">
                <VendorOverview />
              </TabsContent>
              
              <TabsContent value="products" className="mt-0">
                <ProductManagement />
              </TabsContent>
              
              <TabsContent value="orders" className="mt-0">
                <RentalRequests />
              </TabsContent>
              
              <TabsContent value="earnings" className="mt-0">
                <EarningsPayments />
              </TabsContent>
              
              <TabsContent value="profile" className="mt-0">
                <ProfileKYC />
              </TabsContent>
              
              <TabsContent value="returns" className="mt-0">
                <ReturnClaims />
              </TabsContent>
              
              <TabsContent value="ratings" className="mt-0">
                <RatingsReviews />
              </TabsContent>
              
              <TabsContent value="promotions" className="mt-0">
                <Promotions />
              </TabsContent>
              
              <TabsContent value="inventory" className="mt-0">
                <InventoryTracker />
              </TabsContent>
              
              <TabsContent value="messages" className="mt-0">
                <MessageCenter />
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <NotificationCenter />
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

export default VendorDashboard;
