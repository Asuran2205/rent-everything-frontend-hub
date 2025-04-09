
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PromotionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  recommended?: boolean;
}

interface ActivePromotion {
  id: string;
  productName: string;
  productImage: string;
  plan: string;
  startDate: string;
  endDate: string;
  stats: {
    views: number;
    clicks: number;
    inquiries: number;
  };
}

const Promotions = () => {
  const [promotionPlans, setPromotionPlans] = useState<PromotionPlan[]>([
    {
      id: 'basic',
      name: 'Basic Boost',
      price: 299,
      duration: '3 days',
      features: [
        'Featured in category listings',
        'Higher search rankings',
        'Basic analytics report'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Promotion',
      price: 799,
      duration: '7 days',
      features: [
        'Homepage featured carousel',
        'Category top position',
        'Advanced analytics dashboard',
        'Featured label on product'
      ],
      recommended: true
    },
    {
      id: 'ultimate',
      name: 'Ultimate Spotlight',
      price: 1499,
      duration: '14 days',
      features: [
        'Homepage hero banner (shared)',
        'Search results priority',
        'Featured in newsletter',
        'Social media promotion',
        'Detailed performance reports'
      ]
    }
  ]);
  
  const [activePromotions, setActivePromotions] = useState<ActivePromotion[]>([
    {
      id: '1',
      productName: 'DSLR Camera',
      productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop',
      plan: 'Premium Promotion',
      startDate: 'Apr 7, 2025',
      endDate: 'Apr 14, 2025',
      stats: {
        views: 245,
        clicks: 38,
        inquiries: 7
      }
    }
  ]);
  
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  
  const products = [
    { id: '1', name: 'DSLR Camera', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop' },
    { id: '2', name: 'Drone', image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070&auto=format&fit=crop' },
    { id: '3', name: 'Mountain Bike', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop' },
    { id: '4', name: 'Projector', image: 'https://images.unsplash.com/photo-1608483572262-acc31f839b7d?q=80&w=2006&auto=format&fit=crop' }
  ];
  
  const handlePromotePlan = (planId: string) => {
    setSelectedPlan(planId);
    setIsPromotionDialogOpen(true);
  };
  
  const handleCreatePromotion = () => {
    if (!selectedProduct || !selectedPlan) {
      toast.error('Please select both a product and a promotion plan');
      return;
    }
    
    const product = products.find(p => p.id === selectedProduct);
    const plan = promotionPlans.find(p => p.id === selectedPlan);
    
    if (!product || !plan) return;
    
    const currentDate = new Date();
    
    // Parse duration from string like "7 days" to number of days
    const durationDays = parseInt(plan.duration.split(' ')[0]);
    
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + durationDays);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    
    const newPromotion: ActivePromotion = {
      id: Date.now().toString(),
      productName: product.name,
      productImage: product.image,
      plan: plan.name,
      startDate: formatDate(currentDate),
      endDate: formatDate(endDate),
      stats: {
        views: 0,
        clicks: 0,
        inquiries: 0
      }
    };
    
    setActivePromotions([...activePromotions, newPromotion]);
    setIsPromotionDialogOpen(false);
    setSelectedPlan('');
    setSelectedProduct('');
    
    toast.success('Promotion created successfully');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Promotions & Featured Listings</h2>
      
      <Tabs defaultValue="plans">
        <TabsList className="mb-6">
          <TabsTrigger value="plans">Promotion Plans</TabsTrigger>
          <TabsTrigger value="active">Active Promotions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotionPlans.map(plan => (
              <Card key={plan.id} className={plan.recommended ? 'border-brand-orange' : ''}>
                {plan.recommended && (
                  <div className="bg-brand-orange text-white text-xs font-medium px-3 py-1 rounded-t-lg text-center">
                    Recommended
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-6">₹{plan.price}</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={plan.recommended ? 'bg-brand-orange hover:bg-brand-orange/90 w-full' : 'w-full'} 
                    onClick={() => handlePromotePlan(plan.id)}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" /> Promote Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">Your Active Promotions</h3>
            <Button onClick={() => setIsPromotionDialogOpen(true)}>
              <TrendingUp className="h-4 w-4 mr-2" /> New Promotion
            </Button>
          </div>
          
          {activePromotions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activePromotions.map(promotion => (
                <Card key={promotion.id}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-40 h-40 relative">
                        <img
                          src={promotion.productImage}
                          alt={promotion.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{promotion.productName}</h3>
                            <p className="text-sm text-muted-foreground">{promotion.plan}</p>
                          </div>
                          <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> Active
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <span>{promotion.startDate}</span>
                          <span>→</span>
                          <span>{promotion.endDate}</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center">
                            <div className="text-xl font-bold">{promotion.stats.views}</div>
                            <div className="text-xs text-muted-foreground">Views</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold">{promotion.stats.clicks}</div>
                            <div className="text-xs text-muted-foreground">Clicks</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold">{promotion.stats.inquiries}</div>
                            <div className="text-xs text-muted-foreground">Inquiries</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">You don't have any active promotions</p>
              <Button className="mt-4" onClick={() => setIsPromotionDialogOpen(true)}>Create Your First Promotion</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Create Promotion Dialog */}
      <Dialog open={isPromotionDialogOpen} onOpenChange={setIsPromotionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Promotion</DialogTitle>
            <DialogDescription>
              Select a product and promotional plan to boost visibility
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="product">Select Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose product to promote" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="plan">Select Promotion Plan</Label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose promotion plan" />
                </SelectTrigger>
                <SelectContent>
                  {promotionPlans.map(plan => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} - ₹{plan.price} ({plan.duration})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedPlan && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Plan Details</h4>
                <p className="text-sm mb-2">
                  {promotionPlans.find(p => p.id === selectedPlan)?.duration} promotion
                </p>
                <ul className="space-y-1">
                  {promotionPlans
                    .find(p => p.id === selectedPlan)
                    ?.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">₹{promotionPlans.find(p => p.id === selectedPlan)?.price}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleCreatePromotion}>Create Promotion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Promotions;
