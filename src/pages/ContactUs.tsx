
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 h-full">
              <h2 className="text-xl font-semibold mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium">Phone</h3>
                    <p className="mt-1 text-gray-600">+91 98765 43210</p>
                    <p className="mt-1 text-gray-600">Mon-Fri, 9am-6pm IST</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium">Email</h3>
                    <p className="mt-1 text-gray-600">support@renteverything.shop</p>
                    <p className="mt-1 text-gray-600">info@renteverything.shop</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium">Office</h3>
                    <p className="mt-1 text-gray-600">
                      123 Tech Park, Whitefield
                      <br />
                      Bangalore, Karnataka 560066
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-base font-medium mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-brand-orange">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-brand-orange">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.176.585 1.709 1.118.533.533.868 1.041 1.118 1.709.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.118 1.709c-.533.533-1.041.868-1.709 1.118-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.709-1.118 4.902 4.902 0 01-1.118-1.709c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.25-.668.585-1.176 1.118-1.709.533-.533 1.041-.868 1.709-1.118.636-.247 1.363-.416 2.427-.465C9.576 2.013 9.93 2 12.315 2zm0 1.8h-.63c-2.306 0-2.647.011-3.649.057-.879.04-1.354.187-1.67.31a3.103 3.103 0 00-1.082.703c-.333.333-.538.645-.704 1.082-.123.317-.27.792-.31 1.67-.047 1.006-.058 1.34-.058 3.649v.63c0 2.306.011 2.647.057 3.649.04.879.187 1.354.31 1.67.163.421.369.749.702 1.082.333.333.645.538 1.082.704.317.123.792.27 1.67.31 1.006.047 1.34.058 3.649.058h.63c2.306 0 2.647-.011 3.649-.057.879-.04 1.354-.187 1.67-.31a3.103 3.103 0 001.082-.703c.333-.333.538-.645.704-1.082.123-.317.27-.792.31-1.67.047-1.006.058-1.34.058-3.649v-.63c0-2.306-.011-2.647-.057-3.649-.04-.879-.187-1.354-.31-1.67a3.103 3.103 0 00-.703-1.082 3.103 3.103 0 00-1.082-.704c-.317-.123-.792-.27-1.67-.31-1.006-.047-1.34-.058-3.649-.058zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-7.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-brand-orange">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Send Us A Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-brand-orange to-brand-purple w-full"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Our Location</h2>
          <div className="h-96 rounded overflow-hidden">
            <iframe 
              title="RentEverything.Shop Office Location"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.6309395!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1649939289446!5m2!1sen!2sin" 
              style={{border: 0}}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
