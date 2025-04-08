
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      id: "general-1",
      question: "How does RentEverything.Shop work?",
      answer: "RentEverything.Shop is a platform that connects people who want to rent items with those who have items to rent out. You can browse through categories, select an item, choose your rental duration, make a secure payment, and have the item delivered to you. When your rental period is over, the item will be picked up from your location."
    },
    {
      id: "general-2",
      question: "What can I rent on RentEverything.Shop?",
      answer: "You can rent almost anything on our platform! From electronics and appliances to party supplies, tools, furniture, cameras, sports equipment, and much more. Our categories are constantly expanding based on user demand."
    },
    {
      id: "general-3",
      question: "Is there a minimum or maximum rental period?",
      answer: "Rental periods vary by item. Some items can be rented for as little as a few hours, while others may have a minimum rental period of one day. The maximum rental period also varies, but most items can be rented for up to several months. You'll see the available rental options for each specific item on its product page."
    },
    {
      id: "customer-1",
      question: "How do I make a payment?",
      answer: "We offer multiple payment options including credit/debit cards, UPI, Google Pay, PhonePe, and cash on delivery for select items. All online payments are processed through secure payment gateways to ensure your financial information remains safe."
    },
    {
      id: "customer-2",
      question: "What if the item gets damaged during my rental period?",
      answer: "When you rent an item, you're responsible for taking reasonable care of it. Minor wear and tear is expected and accepted, but significant damage may result in additional charges. We offer optional damage protection plans for most items to give you peace of mind during your rental period."
    },
    {
      id: "customer-3",
      question: "Can I extend my rental period?",
      answer: "Yes, in most cases you can extend your rental period if the item is available. Log into your account, go to your active rentals, and select the 'Extend Rental' option. If the item is already booked by someone else after your rental period, you may not be able to extend."
    },
    {
      id: "vendor-1",
      question: "How do I list my items for rent?",
      answer: "To become a vendor, create an account, verify your identity, and then you can start listing your items. You'll need to provide detailed descriptions, high-quality images, set rental rates, and specify availability. Our team will review your listings before they go live."
    },
    {
      id: "vendor-2",
      question: "How much can I earn as a vendor?",
      answer: "Your earnings depend on the items you rent out, their demand, and your pricing strategy. Many vendors earn substantial supplementary income by renting out items they don't use regularly. RentEverything.Shop charges a small commission on each successful rental transaction."
    },
    {
      id: "vendor-3",
      question: "How am I protected as a vendor?",
      answer: "We verify all renters' identities and collect security deposits for high-value items. We also offer vendor protection policies and insurance options. If an item is damaged beyond normal wear and tear, you'll be compensated accordingly."
    },
    {
      id: "delivery-1",
      question: "How does delivery and pickup work?",
      answer: "Our network of delivery partners handles the logistics of getting items from vendors to renters and back. Delivery times and fees vary based on the item size, distance, and urgency. You can track your delivery in real-time through our app or website."
    },
    {
      id: "delivery-2",
      question: "Can I become a delivery partner?",
      answer: "Yes! If you have a vehicle and want to earn money delivering rental items, you can sign up to be a delivery partner. You'll need to pass a background check and meet our vehicle requirements. Delivery partners enjoy flexible hours and competitive pay."
    },
    {
      id: "delivery-3",
      question: "Is there a delivery guarantee?",
      answer: "We strive to deliver all items on time as scheduled. If your delivery is significantly delayed due to circumstances within our control, you may be eligible for compensation such as rental credits or a partial refund."
    }
  ];
  
  const categories = ["General Questions", "For Customers", "For Vendors", "Delivery & Logistics"];
  const [activeCategory, setActiveCategory] = useState("General Questions");
  
  const filteredFaqs = faqs.filter(faq => {
    if (activeCategory === "General Questions") return faq.id.startsWith("general");
    if (activeCategory === "For Customers") return faq.id.startsWith("customer");
    if (activeCategory === "For Vendors") return faq.id.startsWith("vendor");
    if (activeCategory === "Delivery & Logistics") return faq.id.startsWith("delivery");
    return true;
  });
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-brand-orange text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Didn't find an answer to your question?</h2>
            <p className="text-gray-600 mb-4">
              Contact our customer support team and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-orange hover:bg-brand-orange/90">
                Contact Support
              </a>
              <a href="mailto:support@renteverything.shop" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
