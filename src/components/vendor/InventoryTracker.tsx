
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Plus, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface InventoryItem {
  id: string;
  productName: string;
  productImage: string;
  totalQuantity: number;
  availableQuantity: number;
  rentedQuantity: number;
  lowStockThreshold: number;
}

const InventoryTracker = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      productName: 'DSLR Camera',
      productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop',
      totalQuantity: 3,
      availableQuantity: 1,
      rentedQuantity: 2,
      lowStockThreshold: 1
    },
    {
      id: '2',
      productName: 'Drone',
      productImage: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070&auto=format&fit=crop',
      totalQuantity: 2,
      availableQuantity: 0,
      rentedQuantity: 2,
      lowStockThreshold: 1
    },
    {
      id: '3',
      productName: 'Power Tools Set',
      productImage: 'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?q=80&w=2080&auto=format&fit=crop',
      totalQuantity: 5,
      availableQuantity: 3,
      rentedQuantity: 2,
      lowStockThreshold: 2
    },
    {
      id: '4',
      productName: 'Mountain Bike',
      productImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop',
      totalQuantity: 4,
      availableQuantity: 2,
      rentedQuantity: 2,
      lowStockThreshold: 1
    }
  ]);
  
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [addQuantity, setAddQuantity] = useState('');
  
  const handleAddStock = () => {
    if (!selectedItem) return;
    
    const quantity = parseInt(addQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    
    const updatedInventory = inventory.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          totalQuantity: item.totalQuantity + quantity,
          availableQuantity: item.availableQuantity + quantity
        };
      }
      return item;
    });
    
    setInventory(updatedInventory);
    setIsAddStockOpen(false);
    setSelectedItem(null);
    setAddQuantity('');
    
    toast.success(`Added ${quantity} units to ${selectedItem.productName}`);
  };
  
  const openAddStockDialog = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsAddStockOpen(true);
  };
  
  const lowStockItems = inventory.filter(item => item.availableQuantity <= item.lowStockThreshold);
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Inventory Tracker</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{inventory.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {inventory.reduce((sum, item) => sum + item.totalQuantity, 0)} units
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Rented Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">
              {inventory.reduce((sum, item) => sum + item.rentedQuantity, 0)} units
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{lowStockItems.length}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead className="text-right">Rented</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden">
                        <img 
                          src={item.productImage} 
                          alt={item.productName} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{item.productName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{item.totalQuantity}</TableCell>
                  <TableCell className="text-right">{item.availableQuantity}</TableCell>
                  <TableCell className="text-right">{item.rentedQuantity}</TableCell>
                  <TableCell className="text-right">
                    {item.availableQuantity === 0 ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Out of Stock
                      </span>
                    ) : item.availableQuantity <= item.lowStockThreshold ? (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        In Stock
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openAddStockDialog(item)}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Stock
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="low-stock" className="mt-0">
          {lowStockItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                  <TableHead className="text-right">Threshold</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded overflow-hidden">
                          <img 
                            src={item.productImage} 
                            alt={item.productName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{item.productName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.totalQuantity}</TableCell>
                    <TableCell className="text-right">
                      <span className="text-yellow-600 font-medium">{item.availableQuantity}</span>
                    </TableCell>
                    <TableCell className="text-right">{item.lowStockThreshold}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openAddStockDialog(item)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Stock
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No low stock items</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="out-of-stock" className="mt-0">
          {inventory.filter(item => item.availableQuantity === 0).length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Rented</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory
                  .filter(item => item.availableQuantity === 0)
                  .map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded overflow-hidden">
                            <img 
                              src={item.productImage} 
                              alt={item.productName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{item.productName}</div>
                            <div className="text-xs text-red-600 flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" /> Out of stock
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{item.totalQuantity}</TableCell>
                      <TableCell className="text-right">{item.rentedQuantity}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openAddStockDialog(item)}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Stock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No out-of-stock items</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Add Stock Dialog */}
      <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add Stock</DialogTitle>
            <DialogDescription>
              Add more units to your inventory
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded overflow-hidden">
                  <img 
                    src={selectedItem.productImage} 
                    alt={selectedItem.productName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{selectedItem.productName}</div>
                  <div className="text-sm text-muted-foreground">
                    Current Available: {selectedItem.availableQuantity} units
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity to Add</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={addQuantity}
                  onChange={(e) => setAddQuantity(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleAddStock}>Add Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryTracker;
