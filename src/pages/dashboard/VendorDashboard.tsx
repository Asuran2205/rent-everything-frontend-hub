
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, Package, CircleDollarSign, MessageSquare, 
  Settings, ShieldCheck, Star, Inbox, Bell, UserCheck 
} from 'lucide-react';
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

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Vendor Dashboard</h1>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-48 flex-shrink-0">
            <TabsList className="h-auto flex flex-col justify-start bg-gray-100 p-2 rounded-md w-full">
              <TabsTrigger value="overview" className="w-full justify-start mb-1">
                <BarChart3 className="mr-2 h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="products" className="w-full justify-start mb-1">
                <Package className="mr-2 h-4 w-4" /> Products
              </TabsTrigger>
              <TabsTrigger value="orders" className="w-full justify-start mb-1">
                <Inbox className="mr-2 h-4 w-4" /> Rental Requests
              </TabsTrigger>
              <TabsTrigger value="earnings" className="w-full justify-start mb-1">
                <CircleDollarSign className="mr-2 h-4 w-4" /> Earnings
              </TabsTrigger>
              <TabsTrigger value="profile" className="w-full justify-start mb-1">
                <UserCheck className="mr-2 h-4 w-4" /> Profile & KYC
              </TabsTrigger>
              <TabsTrigger value="returns" className="w-full justify-start mb-1">
                <ShieldCheck className="mr-2 h-4 w-4" /> Returns & Claims
              </TabsTrigger>
              <TabsTrigger value="ratings" className="w-full justify-start mb-1">
                <Star className="mr-2 h-4 w-4" /> Ratings & Reviews
              </TabsTrigger>
              <TabsTrigger value="promotions" className="w-full justify-start mb-1">
                <Settings className="mr-2 h-4 w-4" /> Promotions
              </TabsTrigger>
              <TabsTrigger value="inventory" className="w-full justify-start mb-1">
                <Package className="mr-2 h-4 w-4" /> Inventory
              </TabsTrigger>
              <TabsTrigger value="messages" className="w-full justify-start mb-1">
                <MessageSquare className="mr-2 h-4 w-4" /> Messages
              </TabsTrigger>
              <TabsTrigger value="notifications" className="w-full justify-start mb-1">
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default VendorDashboard;
