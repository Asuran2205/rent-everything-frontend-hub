
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, Package, User, Calendar, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface RentalRequest {
  id: string;
  customer: {
    name: string;
    image: string;
  };
  productName: string;
  productImage: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  rentalDuration: string;
  rentalDates: string;
  amount: number;
  location: string;
}

const RentalRequests = () => {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([
    {
      id: '1',
      customer: {
        name: 'John Doe',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      productName: 'DSLR Camera',
      productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop',
      status: 'pending',
      rentalDuration: '3 days',
      rentalDates: 'Apr 15 - Apr 18, 2025',
      amount: 1500,
      location: 'Mumbai, Maharashtra'
    },
    {
      id: '2',
      customer: {
        name: 'Sarah Johnson',
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      productName: 'Drone',
      productImage: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070&auto=format&fit=crop',
      status: 'accepted',
      rentalDuration: '1 week',
      rentalDates: 'Apr 20 - Apr 27, 2025',
      amount: 3500,
      location: 'Bangalore, Karnataka'
    },
    {
      id: '3',
      customer: {
        name: 'Mike Peters',
        image: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      productName: 'Mountain Bike',
      productImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop',
      status: 'completed',
      rentalDuration: '2 days',
      rentalDates: 'Apr 5 - Apr 7, 2025',
      amount: 600,
      location: 'Delhi, NCR'
    },
    {
      id: '4',
      customer: {
        name: 'Emma Wilson',
        image: 'https://randomuser.me/api/portraits/women/65.jpg'
      },
      productName: 'Projector',
      productImage: 'https://images.unsplash.com/photo-1608483572262-acc31f839b7d?q=80&w=2006&auto=format&fit=crop',
      status: 'rejected',
      rentalDuration: '1 day',
      rentalDates: 'Apr 10, 2025',
      amount: 400,
      location: 'Pune, Maharashtra'
    }
  ]);
  
  const [selectedRequest, setSelectedRequest] = useState<RentalRequest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [pickupInstructions, setPickupInstructions] = useState('');
  
  const handleViewDetails = (request: RentalRequest) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };
  
  const handleAcceptRequest = (id: string) => {
    const updatedRequests = rentalRequests.map(request => 
      request.id === id ? { ...request, status: 'accepted' as const } : request
    );
    setRentalRequests(updatedRequests);
    setPickupInstructions('');
    setIsDetailsOpen(false);
    toast.success('Rental request accepted');
  };
  
  const handleRejectRequest = (id: string) => {
    const updatedRequests = rentalRequests.map(request => 
      request.id === id ? { ...request, status: 'rejected' as const } : request
    );
    setRentalRequests(updatedRequests);
    setIsDetailsOpen(false);
    toast.success('Rental request rejected');
  };
  
  const renderRequestCard = (request: RentalRequest) => {
    return (
      <Card key={request.id} className="mb-4">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
              <div className="aspect-square rounded-md overflow-hidden">
                <img 
                  src={request.productImage} 
                  alt={request.productName} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{request.productName}</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img 
                        src={request.customer.image} 
                        alt={request.customer.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{request.customer.name}</span>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <div className="text-lg font-semibold">₹{request.amount}</div>
                  <div className="text-xs text-muted-foreground">{request.rentalDuration}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{request.rentalDates}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{request.location}</span>
                </div>
                <div className="flex items-center text-sm col-span-2 md:col-span-1">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{request.rentalDuration}</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className={`px-2 py-0.5 rounded-full text-xs ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewDetails(request)}
                >
                  View Details
                </Button>
                
                {request.status === 'pending' && (
                  <>
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleViewDetails(request)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> Accept
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Rental Requests & Orders</h2>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {rentalRequests.map(request => renderRequestCard(request))}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          {rentalRequests
            .filter(req => req.status === 'pending')
            .map(request => renderRequestCard(request))}
        </TabsContent>
        
        <TabsContent value="accepted" className="mt-0">
          {rentalRequests
            .filter(req => req.status === 'accepted')
            .map(request => renderRequestCard(request))}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          {rentalRequests
            .filter(req => req.status === 'completed')
            .map(request => renderRequestCard(request))}
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-0">
          {rentalRequests
            .filter(req => req.status === 'rejected')
            .map(request => renderRequestCard(request))}
        </TabsContent>
      </Tabs>
      
      {/* Request Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Rental Request Details</DialogTitle>
            <DialogDescription>
              Review request details and respond to the customer
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div>
              <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 rounded-md overflow-hidden">
                  <img 
                    src={selectedRequest.productImage} 
                    alt={selectedRequest.productName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedRequest.productName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRequest.rentalDuration}</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.rentalDates}</p>
                  <p className="font-medium mt-1">₹{selectedRequest.amount}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 my-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Customer</span>
                  <div className="flex items-center mt-1">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img 
                        src={selectedRequest.customer.image} 
                        alt={selectedRequest.customer.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{selectedRequest.customer.name}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span>{selectedRequest.location}</span>
                </div>
              </div>
              
              {selectedRequest.status === 'pending' && (
                <div className="my-4">
                  <Label htmlFor="pickupInstructions">Pickup Instructions</Label>
                  <Textarea
                    id="pickupInstructions"
                    placeholder="Provide instructions for item pickup (address, availability times, etc.)"
                    className="mt-1"
                    value={pickupInstructions}
                    onChange={(e) => setPickupInstructions(e.target.value)}
                  />
                </div>
              )}
              
              {selectedRequest.status === 'pending' && (
                <DialogFooter className="mt-4">
                  <Button 
                    variant="destructive" 
                    onClick={() => handleRejectRequest(selectedRequest.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" /> Reject Request
                  </Button>
                  <Button 
                    onClick={() => handleAcceptRequest(selectedRequest.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" /> Accept Request
                  </Button>
                </DialogFooter>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentalRequests;
