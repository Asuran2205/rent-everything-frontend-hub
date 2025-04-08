
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/mockData';
import { useToast } from "@/components/ui/use-toast";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Simulate loading wishlist from storage
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);
  
  // Save wishlist to storage when it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  
  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(id => id !== productId));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    });
  };
  
  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };
  
  const wishlistProducts = products.filter(product => wishlistItems.includes(product.id));
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          {wishlistProducts.length > 0 && (
            <Button 
              variant="outline" 
              className="text-red-500 border-red-500 hover:bg-red-50"
              onClick={clearWishlist}
            >
              <Trash2 size={18} className="mr-2" />
              Clear Wishlist
            </Button>
          )}
        </div>
        
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
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
                        ₹{(product.price * 83.5).toFixed(0)}/{product.priceUnit}
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
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                >
                  <Heart size={18} className="fill-red-500 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Add items you like to your wishlist and come back to them later</p>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-brand-orange to-brand-purple">
                Explore Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
