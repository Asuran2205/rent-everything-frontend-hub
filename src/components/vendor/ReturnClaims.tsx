
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { AlertTriangle, CheckCircle, Clock, FileText, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Return {
  id: string;
  productName: string;
  productImage: string;
  customerName: string;
  returnDate: string;
  condition: 'good' | 'damaged' | 'missing';
  securityDeposit: number;
  status: 'pending' | 'approved' | 'disputed';
}

interface Claim {
  id: string;
  productName: string;
  productImage: string;
  customerName: string;
  claimDate: string;
  claimAmount: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

const ReturnClaims = () => {
  const [returns, setReturns] = useState<Return[]>([
    {
      id: '1',
      productName: 'DSLR Camera',
      productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop',
      customerName: 'John Doe',
      returnDate: 'Apr 18, 2025',
      condition: 'good',
      securityDeposit: 2000,
      status: 'approved'
    },
    {
      id: '2',
      productName: 'Drone',
      productImage: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070&auto=format&fit=crop',
      customerName: 'Sarah Johnson',
      returnDate: 'Apr 27, 2025',
      condition: 'damaged',
      securityDeposit: 5000,
      status: 'pending'
    },
    {
      id: '3',
      productName: 'Power Tools Set',
      productImage: 'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?q=80&w=2080&auto=format&fit=crop',
      customerName: 'Alex Roberts',
      returnDate: 'Apr 22, 2025',
      condition: 'good',
      securityDeposit: 1500,
      status: 'approved'
    }
  ]);
  
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: '1',
      productName: 'Drone',
      productImage: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070&auto=format&fit=crop',
      customerName: 'Sarah Johnson',
      claimDate: 'Apr 27, 2025',
      claimAmount: 3000,
      description: 'Damaged propeller and scratched body during rental period',
      status: 'pending'
    },
    {
      id: '2',
      productName: 'Mountain Bike',
      productImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop',
      customerName: 'Mike Peters',
      claimDate: 'Apr 8, 2025',
      claimAmount: 800,
      description: 'Chain broken and front tire damaged',
      status: 'approved'
    }
  ]);
  
  const [selectedReturn, setSelectedReturn] = useState<Return | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isReturnDetailsOpen, setIsReturnDetailsOpen] = useState(false);
  const [isClaimDetailsOpen, setIsClaimDetailsOpen] = useState(false);
  const [isNewClaimOpen, setIsNewClaimOpen] = useState(false);
  
  const [newClaimData, setNewClaimData] = useState({
    product: '',
    customer: '',
    amount: '',
    description: '',
    images: [] as File[]
  });
  
  const handleReturnDetails = (returnItem: Return) => {
    setSelectedReturn(returnItem);
    setIsReturnDetailsOpen(true);
  };
  
  const handleClaimDetails = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsClaimDetailsOpen(true);
  };
  
  const handleApproveReturn = (id: string) => {
    const updatedReturns = returns.map(returnItem => 
      returnItem.id === id ? { ...returnItem, status: 'approved' as const } : returnItem
    );
    setReturns(updatedReturns);
    toast.success('Return approved successfully');
    setIsReturnDetailsOpen(false);
  };
  
  const handleDisputeReturn = (id: string) => {
    const updatedReturns = returns.map(returnItem => 
      returnItem.id === id ? { ...returnItem, status: 'disputed' as const } : returnItem
    );
    setReturns(updatedReturns);
    toast.success('Return disputed successfully');
    setIsReturnDetailsOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewClaimData({
      ...newClaimData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewClaimData({
      ...newClaimData,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewClaimData({
        ...newClaimData,
        images: Array.from(e.target.files)
      });
    }
  };
  
  const handleSubmitClaim = () => {
    // Here you would submit the claim to the server
    const newClaim: Claim = {
      id: Date.now().toString(),
      productName: newClaimData.product,
      productImage: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070&auto=format&fit=crop',
      customerName: newClaimData.customer,
      claimDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      claimAmount: parseFloat(newClaimData.amount),
      description: newClaimData.description,
      status: 'pending'
    };
    
    setClaims([newClaim, ...claims]);
    setNewClaimData({
      product: '',
      customer: '',
      amount: '',
      description: '',
      images: []
    });
    setIsNewClaimOpen(false);
    toast.success('Claim submitted successfully');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Returns & Damage Claims</h2>
      
      <Tabs defaultValue="returns">
        <TabsList className="mb-6">
          <TabsTrigger value="returns">Product Returns</TabsTrigger>
          <TabsTrigger value="claims">Damage Claims</TabsTrigger>
        </TabsList>
        
        <TabsContent value="returns" className="mt-0">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Review and manage product returns from customers
            </p>
          </div>
          
          <div className="space-y-4">
            {returns.map(returnItem => (
              <Card key={returnItem.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 relative">
                      <img
                        src={returnItem.productImage}
                        alt={returnItem.productName}
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white ${
                          returnItem.condition === 'good' ? 'bg-green-500' :
                          returnItem.condition === 'damaged' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}
                      >
                        {returnItem.condition.charAt(0).toUpperCase() + returnItem.condition.slice(1)}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{returnItem.productName}</h3>
                        <p className="text-sm text-muted-foreground">Customer: {returnItem.customerName}</p>
                        <p className="text-sm text-muted-foreground">Return Date: {returnItem.returnDate}</p>
                        {returnItem.condition === 'damaged' && (
                          <div className="mt-2">
                            <span className="text-red-500 text-sm">Item reported as damaged</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                        <div className="mb-2">
                          <p className="text-sm text-muted-foreground">Security Deposit</p>
                          <p className="font-semibold">₹{returnItem.securityDeposit}</p>
                        </div>
                        <div 
                          className={`px-2 py-1 rounded-full text-xs mb-3 ${
                            returnItem.status === 'approved' ? 'bg-green-100 text-green-800' :
                            returnItem.status === 'disputed' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleReturnDetails(returnItem)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="claims" className="mt-0">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Manage damage claims for your products
            </p>
            <Dialog open={isNewClaimOpen} onOpenChange={setIsNewClaimOpen}>
              <DialogTrigger asChild>
                <Button>
                  <FileText className="h-4 w-4 mr-2" /> Create New Claim
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create Damage Claim</DialogTitle>
                  <DialogDescription>
                    Submit a claim for damaged or missing items
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="product">Product</Label>
                    <Select onValueChange={(value) => handleSelectChange('product', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DSLR Camera">DSLR Camera</SelectItem>
                        <SelectItem value="Drone">Drone</SelectItem>
                        <SelectItem value="Mountain Bike">Mountain Bike</SelectItem>
                        <SelectItem value="Power Tools Set">Power Tools Set</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="customer">Customer</Label>
                    <Select onValueChange={(value) => handleSelectChange('customer', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Mike Peters">Mike Peters</SelectItem>
                        <SelectItem value="Alex Roberts">Alex Roberts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="amount">Claim Amount (₹)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={newClaimData.amount}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="description">Description of Damage</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newClaimData.description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="images">Upload Images</Label>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                    {newClaimData.images.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {newClaimData.images.map((image, index) => (
                          <div key={index} className="relative w-16 h-16">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmitClaim}>Submit Claim</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map(claim => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.productName}</TableCell>
                  <TableCell>{claim.customerName}</TableCell>
                  <TableCell>{claim.claimDate}</TableCell>
                  <TableCell>₹{claim.claimAmount}</TableCell>
                  <TableCell>
                    <div 
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                        claim.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleClaimDetails(claim)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
      
      {/* Return Details Dialog */}
      <Dialog open={isReturnDetailsOpen} onOpenChange={setIsReturnDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Return Details</DialogTitle>
          </DialogHeader>
          {selectedReturn && (
            <div>
              <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 rounded-md overflow-hidden">
                  <img 
                    src={selectedReturn.productImage} 
                    alt={selectedReturn.productName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedReturn.productName}</h3>
                  <p className="text-sm text-muted-foreground">Return Date: {selectedReturn.returnDate}</p>
                  <div className="mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedReturn.condition === 'good' ? 'bg-green-100 text-green-800' :
                      selectedReturn.condition === 'damaged' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      Condition: {selectedReturn.condition}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="font-medium">{selectedReturn.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security Deposit</span>
                  <span className="font-medium">₹{selectedReturn.securityDeposit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`${
                    selectedReturn.status === 'approved' ? 'text-green-600' :
                    selectedReturn.status === 'disputed' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {selectedReturn.status.charAt(0).toUpperCase() + selectedReturn.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {selectedReturn.status === 'pending' && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Actions</h4>
                  <div className="space-y-2">
                    {selectedReturn.condition === 'good' ? (
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <p className="text-sm">Item is in good condition. Approve to refund security deposit.</p>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-sm">Item reported as {selectedReturn.condition}. Review before approving.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleDisputeReturn(selectedReturn.id)}
                    >
                      Dispute Return
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveReturn(selectedReturn.id)}
                    >
                      Approve Return
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Claim Details Dialog */}
      <Dialog open={isClaimDetailsOpen} onOpenChange={setIsClaimDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Claim Details</DialogTitle>
          </DialogHeader>
          {selectedClaim && (
            <div>
              <div className="flex gap-4 mb-4">
                <div className="w-24 h-24 rounded-md overflow-hidden">
                  <img 
                    src={selectedClaim.productImage} 
                    alt={selectedClaim.productName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedClaim.productName}</h3>
                  <p className="text-sm text-muted-foreground">Claim Date: {selectedClaim.claimDate}</p>
                  <p className="font-medium mt-1">₹{selectedClaim.claimAmount}</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">Description</h4>
                  <p>{selectedClaim.description}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="font-medium">{selectedClaim.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`${
                    selectedClaim.status === 'approved' ? 'text-green-600' :
                    selectedClaim.status === 'rejected' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {selectedClaim.status.charAt(0).toUpperCase() + selectedClaim.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="text-sm text-muted-foreground mb-1">Images</h4>
                <div className="grid grid-cols-4 gap-2">
                  <div className="aspect-square bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    No images
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReturnClaims;
