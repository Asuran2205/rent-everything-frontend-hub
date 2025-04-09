
import React, { useState } from 'react';
import { MessageSquare, Send, Phone, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock support tickets
const supportTickets = [
  {
    id: 'TICK-001',
    subject: 'Customer not available for delivery',
    status: 'open',
    priority: 'high',
    created: '2 hours ago',
    lastUpdate: '45 minutes ago'
  },
  {
    id: 'TICK-002',
    subject: 'Issue with payment processing',
    status: 'closed',
    priority: 'medium',
    created: '1 day ago',
    lastUpdate: '5 hours ago'
  },
  {
    id: 'TICK-003',
    subject: 'App navigation error',
    status: 'closed',
    priority: 'low',
    created: '3 days ago',
    lastUpdate: '2 days ago'
  }
];

// Mock chat messages
const chatMessages = [
  {
    id: 1,
    sender: 'support',
    message: 'Hello! How can I help you today?',
    time: '10:30 AM',
    name: 'Support Team'
  },
  {
    id: 2,
    sender: 'user',
    message: 'I have an issue with my current delivery. The customer is not available at the location.',
    time: '10:32 AM',
    name: 'Me'
  },
  {
    id: 3,
    sender: 'support',
    message: 'I understand. Can you provide the order number so I can look into it?',
    time: '10:33 AM',
    name: 'Support Team'
  },
  {
    id: 4,
    sender: 'user',
    message: 'The order number is #67890',
    time: '10:34 AM',
    name: 'Me'
  },
  {
    id: 5,
    sender: 'support',
    message: "Thank you. I've checked the order and contacted the customer. They will be available in 15 minutes. Could you please wait or attempt redelivery after that time?",
    time: '10:38 AM',
    name: 'Support Team'
  },
  {
    id: 6,
    sender: 'user',
    message: "Okay, I'll wait for 15 minutes and try again. Thank you!",
    time: '10:39 AM',
    name: 'Me'
  }
];

const DeliverySupport = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      setMessage('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Support & Chat</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Live Support Chat</CardTitle>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="text-sm text-gray-500">
                Support team typically replies within 5 minutes
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow flex flex-col overflow-hidden p-0">
              <div className="flex-grow overflow-y-auto px-4">
                <div className="py-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          msg.sender === 'user' 
                            ? 'bg-brand-purple text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium">
                            {msg.name}
                          </span>
                          <span className="text-xs opacity-70">
                            {msg.time}
                          </span>
                        </div>
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-brand-purple">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start New Chat
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support (24/7)
                </Button>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Report an Issue</h3>
                  <Select defaultValue="delivery">
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delivery">Delivery Problem</SelectItem>
                      <SelectItem value="technical">App Technical Issue</SelectItem>
                      <SelectItem value="payment">Payment Issue</SelectItem>
                      <SelectItem value="customer">Customer Dispute</SelectItem>
                      <SelectItem value="other">Other Issue</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Textarea 
                    placeholder="Describe your issue..." 
                    className="mt-3 resize-none"
                    rows={3}
                  />
                  
                  <Button className="w-full mt-3 bg-brand-purple">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Submit Issue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-xs font-mono">{ticket.id}</span>
                      <Badge className={
                        ticket.status === 'open' ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                      }>
                        {ticket.status}
                      </Badge>
                    </div>
                    <h3 className="font-medium mt-1">{ticket.subject}</h3>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Created {ticket.created}
                      </div>
                      <Badge className={
                        ticket.priority === 'high' ? "bg-red-100 text-red-800" :
                        ticket.priority === 'medium' ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {ticket.priority} priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeliverySupport;
