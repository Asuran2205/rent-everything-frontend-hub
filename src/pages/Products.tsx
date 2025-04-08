
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { products, categories } from '@/data/mockData';
import { useToast } from "@/components/ui/use-toast";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { toast } = useToast();

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist",
        });
        return prev.filter(id => id !== productId);
      } else {
        toast({
          title: "Added to wishlist",
          description: "Item has been added to your wishlist",
        });
        return [...prev, productId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Explore Products</h1>
        
        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product.id} className="group relative">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium text-gray-800">
                        ₹{product.price}/{product.priceUnit}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium text-lg group-hover:text-brand-orange transition-colors">
                        {product.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm ml-1">{product.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                        </div>
                        
                        <span className="text-xs text-gray-500">
                          {categories.find(c => c.id === product.category)?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                >
                  <Heart 
                    size={18} 
                    className={wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                  />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-xl text-gray-500">No products found</p>
              <Button 
                variant="link" 
                className="text-brand-orange mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
