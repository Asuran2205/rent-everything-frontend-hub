
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Star, Edit, Trash, CheckCircle, XCircle, Flag, Eye } from 'lucide-react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockProducts = [
  {
    id: 1,
    name: "Sony A7III Camera",
    category: "Electronics",
    vendor: "Tech Rentals",
    price: "₹1,500/day",
    status: "active",
    featured: true,
    reviews: 4.8,
    approvalStatus: "approved",
  },
  {
    id: 2,
    name: "6-Person Camping Tent",
    category: "Outdoor",
    vendor: "Adventure Gear Co",
    price: "₹800/day",
    status: "active",
    featured: false,
    reviews: 4.5,
    approvalStatus: "approved",
  },
  {
    id: 3,
    name: "Professional DJ Equipment",
    category: "Audio",
    vendor: "Sound Systems Pro",
    price: "₹3,500/day",
    status: "inactive",
    featured: false,
    reviews: 4.2,
    approvalStatus: "approved",
  },
  {
    id: 4,
    name: "Canon EOS R5 Camera",
    category: "Electronics",
    vendor: "Camera World",
    price: "₹2,200/day",
    status: "active",
    featured: true,
    reviews: 4.9,
    approvalStatus: "approved",
  },
  {
    id: 5,
    name: "Electric Bicycle",
    category: "Sports",
    vendor: "Urban Mobility",
    price: "₹950/day",
    status: "active",
    featured: false,
    reviews: 4.4,
    approvalStatus: "pending",
  },
];

const ProductManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleViewProduct = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-8" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Reviews</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.vendor}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === "active" ? "default" : "outline"}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {product.featured ? (
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ) : (
                            <Star className="h-4 w-4 text-gray-300" />
                          )}
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          {product.reviews} <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewProduct(product)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Product
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {product.featured ? (
                                  <>
                                    <Star className="mr-2 h-4 w-4" />
                                    Remove Featured
                                  </>
                                ) : (
                                  <>
                                    <Star className="mr-2 h-4 w-4" />
                                    Make Featured
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Flag className="mr-2 h-4 w-4" />
                                Flag Product
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Product
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="pending">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.filter(p => p.approvalStatus === "pending").map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.vendor}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>2 hours ago</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewProduct(product)}>
                              Review
                            </Button>
                            <Button size="icon" variant="default">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="destructive">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="featured">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Reviews</TableHead>
                      <TableHead>Featured Since</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.filter(p => p.featured).map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.vendor}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          {product.reviews} <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        </TableCell>
                        <TableCell>15 Aug 2023</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Remove Featured</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="flagged">
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                No flagged products at this time.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Product Dialog */}
      {selectedProduct && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 rounded-md aspect-square flex items-center justify-center">
                <span className="text-muted-foreground">Product Image</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{selectedProduct.category}</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      {selectedProduct.reviews} <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-lg font-semibold">{selectedProduct.price}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Vendor</p>
                  <p>{selectedProduct.vendor}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={selectedProduct.status === "active" ? "default" : "outline"}>
                    {selectedProduct.status}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed euismod, nisl vel ultricies lacinia, nunc nisl aliquam nisl, 
                    eget aliquam nunc nisl sit amet nisl.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">Product Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary/30 p-2 rounded-md">
                  <p className="text-sm text-muted-foreground">Brand</p>
                  <p className="font-medium">Sony</p>
                </div>
                <div className="bg-secondary/30 p-2 rounded-md">
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">A7III</p>
                </div>
                <div className="bg-secondary/30 p-2 rounded-md">
                  <p className="text-sm text-muted-foreground">Condition</p>
                  <p className="font-medium">Excellent</p>
                </div>
                <div className="bg-secondary/30 p-2 rounded-md">
                  <p className="text-sm text-muted-foreground">Included Items</p>
                  <p className="font-medium">Camera, Lens, Charger, Battery</p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between items-center">
              <div>
                {selectedProduct.approvalStatus === "pending" && (
                  <div className="flex gap-2">
                    <Button variant="default">Approve</Button>
                    <Button variant="destructive">Reject</Button>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
                <Button>Edit Product</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductManagement;
