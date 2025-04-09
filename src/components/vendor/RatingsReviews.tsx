import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Star, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  product: {
    name: string;
    image: string;
  };
  customer: {
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  date: string;
  response?: string;
}

const RatingsReviews = () => {
  const [reviews, setReviews] = React.useState<Review[]>([
    {
      id: '1',
      product: {
        name: 'DSLR Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop'
      },
      customer: {
        name: 'John Doe',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      rating: 5,
      comment: 'Excellent camera! It was in perfect condition and worked flawlessly. Would definitely rent again.',
      date: 'Apr 18, 2025',
      response: "Thank you for your kind words! We're glad you enjoyed using our camera."
    },
    {
      id: '2',
      product: {
        name: 'Drone',
        image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2070&auto=format&fit=crop'
      },
      customer: {
        name: 'Sarah Johnson',
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      rating: 3,
      comment: "The drone was good but had some scratches that weren't shown in the photos. Battery life was less than advertised.",
      date: 'Apr 15, 2025'
    },
    {
      id: '3',
      product: {
        name: 'Mountain Bike',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop'
      },
      customer: {
        name: 'Mike Peters',
        image: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      rating: 4,
      comment: 'Great bike! The gears were smooth and it handled well on trails. Would have given 5 stars but it needed a bit more cleaning.',
      date: 'Apr 10, 2025'
    },
    {
      id: '4',
      product: {
        name: 'Projector',
        image: 'https://images.unsplash.com/photo-1608483572262-acc31f839b7d?q=80&w=2006&auto=format&fit=crop'
      },
      customer: {
        name: 'Emma Wilson',
        image: 'https://randomuser.me/api/portraits/women/65.jpg'
      },
      rating: 5,
      comment: 'Perfect for our movie night! Great picture quality and easy setup. The owner was very helpful with instructions.',
      date: 'Apr 5, 2025'
    }
  ]);
  
  const [responses, setResponses] = React.useState<{[key: string]: string}>({});
  
  const handleResponseChange = (id: string, value: string) => {
    setResponses({
      ...responses,
      [id]: value
    });
  };
  
  const handleSubmitResponse = (id: string) => {
    if (!responses[id]?.trim()) {
      toast.error('Please enter a response');
      return;
    }
    
    const updatedReviews = reviews.map(review => 
      review.id === id ? { ...review, response: responses[id] } : review
    );
    
    setReviews(updatedReviews);
    toast.success('Response submitted successfully');
    
    const newResponses = { ...responses };
    delete newResponses[id];
    setResponses(newResponses);
  };
  
  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as {[key: number]: number});
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Ratings & Reviews</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Rating</CardTitle>
            <CardDescription>Overall customer feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold mb-2">{averageRating}</div>
              <div className="flex mb-3">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
              <div className="text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
            </div>
            
            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = ratingCounts[rating] || 0;
                const percentage = Math.round((count / reviews.length) * 100) || 0;
                
                return (
                  <div key={rating} className="flex items-center">
                    <div className="w-10 text-sm">{rating} star</div>
                    <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-sm text-right">{count}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-3">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="responded">Responded</TabsTrigger>
              <TabsTrigger value="unresponded">Unresponded</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-4">
                {reviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src={review.customer.image} 
                            alt={review.customer.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium">{review.customer.name}</div>
                              <div className="text-sm text-muted-foreground">{review.date}</div>
                            </div>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <div className="mt-2">{review.comment}</div>
                          
                          <div className="mt-4 flex items-center gap-2">
                            <div className="w-10 h-10 rounded overflow-hidden">
                              <img 
                                src={review.product.image} 
                                alt={review.product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              For: {review.product.name}
                            </span>
                          </div>
                          
                          {review.response ? (
                            <div className="mt-4 pl-4 border-l-2 border-gray-200">
                              <div className="text-sm font-medium">Your Response:</div>
                              <div className="text-sm mt-1">{review.response}</div>
                            </div>
                          ) : (
                            <div className="mt-4">
                              <Textarea
                                placeholder="Write a response to this review..."
                                value={responses[review.id] || ''}
                                onChange={(e) => handleResponseChange(review.id, e.target.value)}
                              />
                              <Button 
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => handleSubmitResponse(review.id)}
                              >
                                <MessageSquare className="h-4 w-4 mr-1" /> Submit Response
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="responded" className="mt-0">
              <div className="space-y-4">
                {reviews
                  .filter(review => review.response)
                  .map(review => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img 
                              src={review.customer.image} 
                              alt={review.customer.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">{review.customer.name}</div>
                                <div className="text-sm text-muted-foreground">{review.date}</div>
                              </div>
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <div className="mt-2">{review.comment}</div>
                            
                            <div className="mt-4 flex items-center gap-2">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img 
                                  src={review.product.image} 
                                  alt={review.product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">
                                For: {review.product.name}
                              </span>
                            </div>
                            
                            <div className="mt-4 pl-4 border-l-2 border-gray-200">
                              <div className="text-sm font-medium">Your Response:</div>
                              <div className="text-sm mt-1">{review.response}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                
                {reviews.filter(review => review.response).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No responded reviews yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="unresponded" className="mt-0">
              <div className="space-y-4">
                {reviews
                  .filter(review => !review.response)
                  .map(review => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img 
                              src={review.customer.image} 
                              alt={review.customer.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">{review.customer.name}</div>
                                <div className="text-sm text-muted-foreground">{review.date}</div>
                              </div>
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <div className="mt-2">{review.comment}</div>
                            
                            <div className="mt-4 flex items-center gap-2">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img 
                                  src={review.product.image} 
                                  alt={review.product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">
                                For: {review.product.name}
                              </span>
                            </div>
                            
                            <div className="mt-4">
                              <Textarea
                                placeholder="Write a response to this review..."
                                value={responses[review.id] || ''}
                                onChange={(e) => handleResponseChange(review.id, e.target.value)}
                              />
                              <Button 
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => handleSubmitResponse(review.id)}
                              >
                                <MessageSquare className="h-4 w-4 mr-1" /> Submit Response
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                
                {reviews.filter(review => !review.response).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No unresponded reviews. Good job!</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
