
import React from 'react';
import { Link } from 'react-router-dom';
import { categories, products } from '@/data/mockData';
import { ChevronRight } from 'lucide-react';

const Categories = () => {
  // Get count of products in each category
  const categoryProductCounts = categories.map(category => {
    const count = products.filter(product => product.category === category.id).length;
    return { ...category, count };
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Browse Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProductCounts.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gradient-to-r from-brand-orange to-brand-purple relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <span className="text-gray-600">{category.count} Products</span>
                <div className="flex items-center text-brand-orange">
                  <span className="mr-1">Explore</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
