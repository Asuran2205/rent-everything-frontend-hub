
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  category: string;
  price: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  condition: string;
  status: string;
  image: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'DSLR Camera',
      category: 'Electronics',
      price: { daily: 500, weekly: 2500, monthly: 8000 },
      condition: 'Like New',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Mountain Bike',
      category: 'Sports',
      price: { daily: 300, weekly: 1500, monthly: 5000 },
      condition: 'Used',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Projector',
      category: 'Electronics',
      price: { daily: 400, weekly: 2000, monthly: 6000 },
      condition: 'New',
      status: 'Inactive',
      image: 'https://images.unsplash.com/photo-1608483572262-acc31f839b7d?q=80&w=2006&auto=format&fit=crop'
    }
  ]);
  
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priceDaily: '',
    priceWeekly: '',
    priceMonthly: '',
    condition: '',
    status: 'active',
    securityDeposit: '',
    images: [] as File[]
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData({
        ...formData,
        images: [...formData.images, ...filesArray]
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would upload the images and send the data to the server
    
    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      price: {
        daily: parseFloat(formData.priceDaily),
        weekly: parseFloat(formData.priceWeekly),
        monthly: parseFloat(formData.priceMonthly)
      },
      condition: formData.condition,
      status: formData.status,
      image: formData.images.length > 0 ? URL.createObjectURL(formData.images[0]) : 'https://placehold.co/400x300'
    };
    
    if (isEditing && currentProduct) {
      const updatedProducts = products.map(p => 
        p.id === currentProduct.id ? { ...newProduct, id: p.id } : p
      );
      setProducts(updatedProducts);
      toast.success('Product updated successfully');
    } else {
      setProducts([...products, newProduct]);
      toast.success('Product added successfully');
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      priceDaily: '',
      priceWeekly: '',
      priceMonthly: '',
      condition: '',
      status: 'active',
      securityDeposit: '',
      images: []
    });
    
    setIsAddProductOpen(false);
    setIsEditing(false);
  };
  
  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      description: '',
      category: product.category,
      priceDaily: product.price.daily.toString(),
      priceWeekly: product.price.weekly.toString(),
      priceMonthly: product.price.monthly.toString(),
      condition: product.condition,
      status: product.status.toLowerCase(),
      securityDeposit: '',
      images: []
    });
    setIsEditing(true);
    setIsAddProductOpen(true);
  };
  
  const handleView = (product: Product) => {
    setCurrentProduct(product);
    setIsViewProductOpen(true);
  };
  
  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    toast.success('Product deleted successfully');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setIsEditing(false); setCurrentProduct(null); }}>
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update your product details below.' : 'Enter your product details below to add it to your listings.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Tools">Tools</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select 
                      value={formData.condition} 
                      onValueChange={(value) => handleSelectChange('condition', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Like New">Like New</SelectItem>
                        <SelectItem value="Used">Used</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Pricing (₹)</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label htmlFor="priceDaily" className="text-xs">Daily</Label>
                      <Input
                        id="priceDaily"
                        name="priceDaily"
                        type="number"
                        value={formData.priceDaily}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="priceWeekly" className="text-xs">Weekly</Label>
                      <Input
                        id="priceWeekly"
                        name="priceWeekly"
                        type="number"
                        value={formData.priceWeekly}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="priceMonthly" className="text-xs">Monthly</Label>
                      <Input
                        id="priceMonthly"
                        name="priceMonthly"
                        type="number"
                        value={formData.priceMonthly}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                  <Input
                    id="securityDeposit"
                    name="securityDeposit"
                    type="number"
                    value={formData.securityDeposit}
                    onChange={handleInputChange}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Availability Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="images">Upload Images</Label>
                  <Input
                    id="images"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="mt-1"
                  />
                  {formData.images.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative w-24 h-24">
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
                <Button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs text-white ${
                    product.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {product.status}
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{product.title}</h3>
                    <div className="text-right">
                      <p className="font-semibold">₹{product.price.daily}/day</p>
                      <p className="text-xs text-muted-foreground">₹{product.price.weekly}/week</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mb-4">
                    <span>{product.category}</span>
                    <span className="mx-2">•</span>
                    <span>{product.condition}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(product)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter(product => product.status === 'Active')
              .map((product) => (
                // Same product card as above
                <Card key={product.id}>
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{product.title}</h3>
                      <div className="text-right">
                        <p className="font-semibold">₹{product.price.daily}/day</p>
                        <p className="text-xs text-muted-foreground">₹{product.price.weekly}/week</p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <span>{product.category}</span>
                      <span className="mx-2">•</span>
                      <span>{product.condition}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleView(product)}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter(product => product.status === 'Inactive')
              .map((product) => (
                // Same product card as above
                <Card key={product.id}>
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{product.title}</h3>
                      <div className="text-right">
                        <p className="font-semibold">₹{product.price.daily}/day</p>
                        <p className="text-xs text-muted-foreground">₹{product.price.weekly}/week</p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <span>{product.category}</span>
                      <span className="mx-2">•</span>
                      <span>{product.condition}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleView(product)}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* View Product Dialog */}
      <Dialog open={isViewProductOpen} onOpenChange={setIsViewProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <div>
              <div className="aspect-[16/10] overflow-hidden mb-4">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="object-cover w-full rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{currentProduct.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {currentProduct.category} • {currentProduct.condition}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{currentProduct.price.daily} / day</p>
                  <p>₹{currentProduct.price.weekly} / week</p>
                  <p>₹{currentProduct.price.monthly} / month</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Status: <span className={currentProduct.status === 'Active' ? 'text-green-500' : 'text-gray-500'}>
                    {currentProduct.status}
                  </span>
                </p>
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => handleEdit(currentProduct)}>
                  <Pencil className="h-4 w-4 mr-1" /> Edit Product
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
