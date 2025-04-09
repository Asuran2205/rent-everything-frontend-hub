
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Eye, Ban, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mockCustomers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    joinDate: "2023-03-15",
    status: "active",
    rentals: 12,
    totalSpent: "₹32,450",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 8765432109",
    joinDate: "2023-04-22",
    status: "active",
    rentals: 8,
    totalSpent: "₹24,680",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 7654321098",
    joinDate: "2023-05-10",
    status: "suspended",
    rentals: 4,
    totalSpent: "₹15,200",
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha.patel@example.com",
    phone: "+91 6543210987",
    joinDate: "2023-06-08",
    status: "active",
    rentals: 15,
    totalSpent: "₹43,980",
  },
  {
    id: 5,
    name: "Rohit Verma",
    email: "rohit.verma@example.com",
    phone: "+91 5432109876",
    joinDate: "2023-07-19",
    status: "inactive",
    rentals: 2,
    totalSpent: "₹7,500",
  },
];

const CustomerManagement = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleViewCustomer = (customer: typeof mockCustomers[0]) => {
    setSelectedCustomer(customer);
    setViewDialogOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customer Management</h1>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-8" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rentals</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        customer.status === "active" ? "default" :
                        customer.status === "suspended" ? "destructive" : "outline"
                      }>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.rentals}</TableCell>
                    <TableCell>{customer.totalSpent}</TableCell>
                    <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {customer.status !== "suspended" ? (
                            <DropdownMenuItem className="text-destructive">
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Reactivate Account
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

      {/* View Customer Dialog */}
      {selectedCustomer && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Customer Profile</DialogTitle>
              <DialogDescription>
                Detailed information about the customer
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="rentals">Rental History</TabsTrigger>
                <TabsTrigger value="complaints">Complaints</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl">{selectedCustomer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedCustomer.name}</h2>
                    <p className="text-muted-foreground">
                      Customer since {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <p className="font-medium">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                    <p className="font-medium">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                    <Badge variant={
                      selectedCustomer.status === "active" ? "default" :
                      selectedCustomer.status === "suspended" ? "destructive" : "outline"
                    }>
                      {selectedCustomer.status}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Spent</h3>
                    <p className="font-medium">{selectedCustomer.totalSpent}</p>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 mt-4">
                  <h3 className="font-medium mb-2">Shipping Addresses</h3>
                  <div className="space-y-2">
                    <div className="p-2 bg-secondary/30 rounded-md">
                      <p className="font-medium">Home Address</p>
                      <p className="text-sm text-muted-foreground">
                        123 Main Street, Apartment 4B<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </p>
                    </div>
                    <div className="p-2 bg-secondary/30 rounded-md">
                      <p className="font-medium">Office Address</p>
                      <p className="text-sm text-muted-foreground">
                        Tech Park, Building 5, Floor 3<br />
                        Bengaluru, Karnataka 560001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rentals">
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Rental Period</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>#ORD-2845</TableCell>
                        <TableCell>Sony A7III Camera</TableCell>
                        <TableCell>15-18 Sep 2023</TableCell>
                        <TableCell>₹4,500</TableCell>
                        <TableCell>
                          <Badge variant="outline">Completed</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>#ORD-2788</TableCell>
                        <TableCell>Camping Tent (4-Person)</TableCell>
                        <TableCell>10-12 Sep 2023</TableCell>
                        <TableCell>₹1,200</TableCell>
                        <TableCell>
                          <Badge>Active</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>#ORD-2732</TableCell>
                        <TableCell>Mountain Bike</TableCell>
                        <TableCell>28-29 Aug 2023</TableCell>
                        <TableCell>₹1,000</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Dispute</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="complaints">
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>15 Sep 2023</TableCell>
                        <TableCell>Late delivery issue</TableCell>
                        <TableCell>#ORD-2845</TableCell>
                        <TableCell>
                          <Badge variant="outline">Resolved</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>29 Aug 2023</TableCell>
                        <TableCell>Product damage dispute</TableCell>
                        <TableCell>#ORD-2732</TableCell>
                        <TableCell>
                          <Badge>Pending</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              {selectedCustomer.status === "active" ? (
                <Button variant="destructive">Suspend Account</Button>
              ) : selectedCustomer.status === "suspended" ? (
                <Button>Reactivate Account</Button>
              ) : null}
              <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CustomerManagement;
