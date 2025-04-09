
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Eye, Ban, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockVendors = [
  {
    id: 1,
    name: "Tech Rentals",
    email: "contact@techrentals.com",
    phone: "+91 9876543210",
    joinDate: "2023-05-12",
    status: "active",
    kycStatus: "verified",
    products: 45,
    earnings: "₹245,680",
  },
  {
    id: 2,
    name: "Home Appliance Hub",
    email: "info@homeappliance.com",
    phone: "+91 8765432109",
    joinDate: "2023-06-24",
    status: "active",
    kycStatus: "pending",
    products: 32,
    earnings: "₹178,450",
  },
  {
    id: 3,
    name: "Party Equipment Co",
    email: "hello@partyequipment.com",
    phone: "+91 7654321098",
    joinDate: "2023-07-15",
    status: "suspended",
    kycStatus: "rejected",
    products: 18,
    earnings: "₹98,670",
  },
  {
    id: 4,
    name: "Outdoor Adventure Gear",
    email: "support@adventuregear.com",
    phone: "+91 6543210987",
    joinDate: "2023-08-03",
    status: "active",
    kycStatus: "verified",
    products: 67,
    earnings: "₹352,900",
  },
  {
    id: 5,
    name: "Camera & Video Pro",
    email: "rental@camerapro.com",
    phone: "+91 5432109876",
    joinDate: "2023-09-21",
    status: "inactive",
    kycStatus: "verified",
    products: 24,
    earnings: "₹125,780",
  },
];

const VendorManagement = () => {
  const [selectedVendor, setSelectedVendor] = useState<typeof mockVendors[0] | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const handleViewVendor = (vendor: typeof mockVendors[0]) => {
    setSelectedVendor(vendor);
    setViewDialogOpen(true);
  };

  const handleMessageVendor = (vendor: typeof mockVendors[0]) => {
    setSelectedVendor(vendor);
    setMessageDialogOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vendor Management</h1>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vendors..." className="pl-8" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button>Add New Vendor</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>
                      <Badge variant={
                        vendor.status === "active" ? "default" :
                        vendor.status === "suspended" ? "destructive" : "outline"
                      }>
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        vendor.kycStatus === "verified" ? "default" :
                        vendor.kycStatus === "pending" ? "outline" : "destructive"
                      }>
                        {vendor.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{vendor.products}</TableCell>
                    <TableCell>{vendor.earnings}</TableCell>
                    <TableCell>{new Date(vendor.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewVendor(vendor)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMessageVendor(vendor)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {vendor.status !== "suspended" ? (
                            <DropdownMenuItem className="text-destructive">
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend Vendor
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Reactivate Vendor
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Vendor Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Vendor Details</DialogTitle>
            <DialogDescription>
              Detailed information about the vendor
            </DialogDescription>
          </DialogHeader>
          
          {selectedVendor && (
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Basic Info</TabsTrigger>
                <TabsTrigger value="kyc">KYC Documents</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="finance">Financial</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Vendor Name</h3>
                    <p className="font-medium">{selectedVendor.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <p className="font-medium">{selectedVendor.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                    <p className="font-medium">{selectedVendor.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                    <Badge variant={
                      selectedVendor.status === "active" ? "default" :
                      selectedVendor.status === "suspended" ? "destructive" : "outline"
                    }>
                      {selectedVendor.status}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Join Date</h3>
                    <p className="font-medium">{new Date(selectedVendor.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="kyc">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-4">KYC Documents</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Aadhaar Card</p>
                        <p className="text-sm text-muted-foreground">Uploaded on: 25 Jul 2023</p>
                      </div>
                      <Button size="sm">View</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">PAN Card</p>
                        <p className="text-sm text-muted-foreground">Uploaded on: 25 Jul 2023</p>
                      </div>
                      <Button size="sm">View</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">GST Certificate</p>
                        <p className="text-sm text-muted-foreground">Uploaded on: 26 Jul 2023</p>
                      </div>
                      <Button size="sm">View</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="products">
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price (Daily)</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Sony A7III Camera</TableCell>
                        <TableCell>Electronics</TableCell>
                        <TableCell>₹1,500/day</TableCell>
                        <TableCell>
                          <Badge>Active</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>DJI Mavic Air 2</TableCell>
                        <TableCell>Electronics</TableCell>
                        <TableCell>₹2,000/day</TableCell>
                        <TableCell>
                          <Badge>Active</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Canon EF 24-70mm Lens</TableCell>
                        <TableCell>Electronics</TableCell>
                        <TableCell>₹800/day</TableCell>
                        <TableCell>
                          <Badge variant="outline">Out of Stock</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="finance">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-sm text-muted-foreground">Total Earnings</h3>
                        <p className="text-2xl font-bold mt-1">{selectedVendor.earnings}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-sm text-muted-foreground">Pending Payout</h3>
                        <p className="text-2xl font-bold mt-1">₹24,500</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-sm text-muted-foreground">Commission Rate</h3>
                        <p className="text-2xl font-bold mt-1">15%</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Transaction</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>12 Sep 2023</TableCell>
                          <TableCell>Payout</TableCell>
                          <TableCell>₹18,500</TableCell>
                          <TableCell>
                            <Badge variant="outline">Completed</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>28 Aug 2023</TableCell>
                          <TableCell>Payout</TableCell>
                          <TableCell>₹22,750</TableCell>
                          <TableCell>
                            <Badge variant="outline">Completed</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>15 Aug 2023</TableCell>
                          <TableCell>Payout</TableCell>
                          <TableCell>₹15,300</TableCell>
                          <TableCell>
                            <Badge variant="outline">Completed</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            {selectedVendor?.status === "active" ? (
              <Button variant="destructive">Suspend Vendor</Button>
            ) : selectedVendor?.status === "suspended" ? (
              <Button variant="default">Reactivate Vendor</Button>
            ) : null}
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Message Vendor Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              {selectedVendor ? `Send a message to ${selectedVendor.name}` : 'Send a message to vendor'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Enter message subject" />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea 
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[120px]"
                placeholder="Type your message here..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
            <Button>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorManagement;
