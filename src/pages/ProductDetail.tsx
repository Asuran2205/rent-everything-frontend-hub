
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { products } from '@/data/mockData';
import { Star, Clock, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [date, setDate] = useState<Date>();
  const [duration, setDuration] = useState('1');
  const [timeSlot, setTimeSlot] = useState('10:00');
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleRentNow = () => {
    navigate('/checkout', {
      state: {
        product,
        rentDate: date,
        duration: parseInt(duration),
        timeSlot,
        totalPrice: product.price * parseInt(duration)
      }
    });
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < Math.floor(rating) 
          ? 'text-yellow-400 fill-yellow-400' 
          : 'text-gray-300'}`}
      />
    ));
  };
  
  // Generate time slots
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const hourFormatted = hour.toString().padStart(2, '0');
    timeSlots.push(`${hourFormatted}:00`);
    timeSlots.push(`${hourFormatted}:30`);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="relative mb-4 rounded-lg overflow-hidden h-[400px]">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, idx) => (
                  <div
                    key={idx}
                    className={`cursor-pointer h-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-brand-orange' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img
                      src={image}
                      alt={`${product.title} - Image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-brand-orange mb-1">
                  ${product.price} <span className="text-gray-500 text-lg font-normal">/ {product.priceUnit}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  Available for delivery in your area
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                {product.description}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Vendor Information</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-brand-purple text-white rounded-full flex items-center justify-center font-bold">
                    {product.vendor.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{product.vendor.name}</p>
                    <div className="flex items-center text-sm">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{product.vendor.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="booking" className="mb-6">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="booking">Booking Details</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="booking" className="p-4 border rounded-md mt-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Date</label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded border"
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Time Slot</label>
                        <Select value={timeSlot} onValueChange={setTimeSlot}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Duration ({product.priceUnit}s)
                        </label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 5, 7, 14, 30].map(num => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? product.priceUnit : `${product.priceUnit}s`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {date && (
                      <div className="bg-gray-100 p-3 rounded-md">
                        <div className="flex items-center mb-2">
                          <CalendarIcon className="h-4 w-4 mr-2 text-brand-purple" />
                          <span className="font-medium">
                            {format(date, 'PPPP')}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-brand-orange" />
                          <span className="font-medium">{timeSlot}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Price per {product.priceUnit}</span>
                        <span>${product.price}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Duration</span>
                        <span>{duration} {parseInt(duration) === 1 ? product.priceUnit : `${product.priceUnit}s`}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${product.price * parseInt(duration)}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="delivery" className="p-4 border rounded-md mt-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Delivery Options</h4>
                      <p className="text-sm text-gray-600">
                        We deliver and collect the item from your location. Delivery cost is included in the rental price.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Delivery Time</h4>
                      <p className="text-sm text-gray-600">
                        We'll deliver your item within a 2-hour window from your selected time slot.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Service Area</h4>
                      <p className="text-sm text-gray-600">
                        We currently deliver to all major cities and surrounding areas. Enter your address during checkout to confirm availability.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Button
                onClick={handleRentNow}
                disabled={!date}
                className="w-full bg-gradient-to-r from-brand-orange to-brand-purple hover:opacity-90"
              >
                Rent Now
              </Button>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="border-t">
            <Tabs defaultValue="description" className="p-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="p-4 mt-4">
                <p className="text-gray-700">
                  {product.description}
                </p>
                <p className="text-gray-700 mt-4">
                  This product is available for rent and comes with all the accessories shown in the images.
                  It's perfect for temporary use or trying before buying. The vendor ensures
                  all items are thoroughly cleaned and inspected before delivery.
                </p>
              </TabsContent>
              
              <TabsContent value="specifications" className="p-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-b pb-2">
                    <span className="font-medium">Category:</span>{' '}
                    <span className="text-gray-700">
                      {categories.find(c => c.id === product.category)?.name}
                    </span>
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Condition:</span>{' '}
                    <span className="text-gray-700">Excellent</span>
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Minimum Rental:</span>{' '}
                    <span className="text-gray-700">1 {product.priceUnit}</span>
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Maximum Rental:</span>{' '}
                    <span className="text-gray-700">30 {product.priceUnit}s</span>
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Delivery Available:</span>{' '}
                    <span className="text-gray-700">Yes</span>
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Deposit Required:</span>{' '}
                    <span className="text-gray-700">No</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-4 mt-4">
                <div className="flex items-center mb-6">
                  <div className="flex mr-4">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-3xl font-bold">{product.rating}</span>
                  <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
                </div>
                
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">John D.</span>
                      <span className="text-gray-500 text-sm">2 days ago</span>
                    </div>
                    <div className="flex mb-2">
                      {renderStars(5)}
                    </div>
                    <p className="text-gray-700">
                      Great product! Was delivered on time and in perfect condition. Would rent again.
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Sarah M.</span>
                      <span className="text-gray-500 text-sm">1 week ago</span>
                    </div>
                    <div className="flex mb-2">
                      {renderStars(4)}
                    </div>
                    <p className="text-gray-700">
                      Very satisfied with the rental. The product worked well for my needs.
                      Delivery was a bit delayed but otherwise excellent service.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Mark P.</span>
                      <span className="text-gray-500 text-sm">2 weeks ago</span>
                    </div>
                    <div className="flex mb-2">
                      {renderStars(5)}
                    </div>
                    <p className="text-gray-700">
                      This rental saved me a lot of money compared to buying the product outright.
                      The vendor was professional and the product was exactly as described.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          
          <Carousel className="w-full">
            <CarouselContent>
              {products
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <CarouselItem key={relatedProduct.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="p-1">
                      <div 
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate(`/product/${relatedProduct.id}`)}
                      >
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={relatedProduct.images[0]} 
                            alt={relatedProduct.title}
                            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium">{relatedProduct.title}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm ml-1">{relatedProduct.rating}</span>
                            </div>
                            <span className="font-medium text-brand-orange">
                              ${relatedProduct.price}/{relatedProduct.priceUnit}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
