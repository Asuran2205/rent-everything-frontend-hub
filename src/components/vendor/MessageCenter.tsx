
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Send, Settings, MessageSquare, User, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Contact {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  isMine: boolean;
}

const MessageCenter = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Doe',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: 'Hi, I\'m interested in your DSLR Camera',
      time: '10:45 AM',
      unread: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: 'Is the drone still available for next weekend?',
      time: 'Yesterday',
      unread: false
    },
    {
      id: '3',
      name: 'Mike Peters',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      lastMessage: 'Thanks for the quick delivery!',
      time: '2 days ago',
      unread: false
    },
    {
      id: '4',
      name: 'Emma Wilson',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      lastMessage: 'Can I rent the projector for a week?',
      time: 'Apr 3',
      unread: true
    }
  ]);
  
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    '1': [
      {
        id: '1-1',
        senderId: '1',
        text: 'Hi, I\'m interested in your DSLR Camera',
        time: '10:45 AM',
        status: 'read',
        isMine: false
      }
    ],
    '2': [
      {
        id: '2-1',
        senderId: '2',
        text: 'Hello, I\'d like to rent your drone',
        time: 'Yesterday',
        status: 'read',
        isMine: false
      },
      {
        id: '2-2',
        senderId: 'me',
        text: 'Sure, it\'s available. When would you like to rent it?',
        time: 'Yesterday',
        status: 'read',
        isMine: true
      },
      {
        id: '2-3',
        senderId: '2',
        text: 'Is the drone still available for next weekend?',
        time: 'Yesterday',
        status: 'read',
        isMine: false
      }
    ]
  });
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoResponderEnabled, setAutoResponderEnabled] = useState(false);
  const [autoResponderMessage, setAutoResponderMessage] = useState('Thanks for your message! I\'ll get back to you as soon as possible.');
  
  // Handle selecting a contact
  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    
    // Mark messages as read
    if (contact.unread) {
      const updatedContacts = contacts.map(c => 
        c.id === contact.id ? { ...c, unread: false } : c
      );
      setContacts(updatedContacts);
    }
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!selectedContact || !newMessage.trim()) return;
    
    const newMsg: Message = {
      id: `${selectedContact.id}-${Date.now()}`,
      senderId: 'me',
      text: newMessage.trim(),
      time: 'Just now',
      status: 'sent',
      isMine: true
    };
    
    // Add message to the conversation
    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg]
    }));
    
    // Update last message in contacts
    const updatedContacts = contacts.map(c => 
      c.id === selectedContact.id 
        ? { ...c, lastMessage: newMessage.trim(), time: 'Just now' } 
        : c
    );
    setContacts(updatedContacts);
    
    // Clear input
    setNewMessage('');
  };
  
  // Handle save auto-responder settings
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
    setIsSettingsOpen(false);
  };
  
  // Handle key press in message input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Scroll to bottom of messages when a new message is added
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedContact]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Message Center</h2>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Message Settings</DialogTitle>
              <DialogDescription>
                Configure your messaging preferences
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto Responder</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically respond to new messages
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={autoResponderEnabled ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAutoResponderEnabled(true)}
                  >
                    On
                  </Button>
                  <Button
                    variant={!autoResponderEnabled ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAutoResponderEnabled(false)}
                  >
                    Off
                  </Button>
                </div>
              </div>
              
              {autoResponderEnabled && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Auto-response Message</label>
                  <Textarea
                    placeholder="Enter your automatic response"
                    value={autoResponderMessage}
                    onChange={(e) => setAutoResponderMessage(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Notification Preferences</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="emailNotif" defaultChecked />
                    <label htmlFor="emailNotif" className="text-sm">Email notifications for new messages</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="pushNotif" defaultChecked />
                    <label htmlFor="pushNotif" className="text-sm">Push notifications</label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col md:flex-row h-[600px] border rounded-lg overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-full md:w-1/3 border-r">
          <div className="p-4 border-b">
            <Input
              placeholder="Search messages..."
              className="w-full"
            />
          </div>
          <div className="h-[calc(600px-65px)] overflow-y-auto">
            {contacts.map(contact => (
              <div
                key={contact.id}
                className={`p-4 border-b flex items-start cursor-pointer hover:bg-gray-50 ${
                  selectedContact?.id === contact.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => handleSelectContact(contact)}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={contact.image} 
                      alt={contact.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {contact.unread && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <span className={`font-medium ${contact.unread ? 'text-black' : 'text-gray-800'}`}>
                      {contact.name}
                    </span>
                    <span className="text-xs text-gray-500">{contact.time}</span>
                  </div>
                  <p className={`text-sm truncate ${
                    contact.unread ? 'font-medium text-black' : 'text-gray-600'
                  }`}>
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={selectedContact.image} 
                    alt={selectedContact.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{selectedContact.name}</div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages[selectedContact.id]?.map(message => (
                  <div 
                    key={message.id} 
                    className={`mb-4 flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isMine && (
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <img 
                          src={selectedContact.image} 
                          alt={selectedContact.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div 
                        className={`px-4 py-2 rounded-lg max-w-xs ${
                          message.isMine ? 
                            'bg-brand-orange text-white rounded-br-none' : 
                            'bg-white border rounded-bl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 flex items-center ${
                        message.isMine ? 'justify-end' : ''
                      }`}>
                        <Clock className="h-3 w-3 mr-1" /> {message.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    className="ml-2"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">Your Messages</h3>
                <p className="text-gray-500">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
