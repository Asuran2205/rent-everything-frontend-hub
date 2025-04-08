
import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">The RentEverything.Shop Story</h2>
              <p className="text-gray-600 mb-4">
                RentEverything.Shop was founded in 2024 with a simple yet powerful vision: to transform how people access and use everyday items without the burden of ownership.
              </p>
              <p className="text-gray-600 mb-4">
                In a world obsessed with ownership, we believe in providing access over accumulation. Why buy something you'll use only occasionally when you can rent it at a fraction of the cost?
              </p>
              <p className="text-gray-600">
                Our platform connects people who need items temporarily with those who own quality products they're willing to rent out. It's a win-win: renters save money while owners generate income from underutilized assets.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
                alt="Our Team" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Our mission is to create a sustainable sharing economy that reduces waste, promotes resource efficiency, and makes quality products accessible to all. We're committed to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Reducing environmental impact through shared use of existing resources</li>
              <li>Making high-quality products affordable through temporary access</li>
              <li>Creating additional income streams for product owners</li>
              <li>Building a trustworthy community where safety and reliability are paramount</li>
            </ul>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="p-5 border border-gray-100 rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium mb-2 text-brand-orange">Trust & Safety</h3>
                <p className="text-gray-600">We prioritize creating a secure platform where users can transact with confidence.</p>
              </div>
              <div className="p-5 border border-gray-100 rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium mb-2 text-brand-orange">Sustainability</h3>
                <p className="text-gray-600">We're committed to reducing waste and promoting reuse through our rental platform.</p>
              </div>
              <div className="p-5 border border-gray-100 rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium mb-2 text-brand-orange">Community</h3>
                <p className="text-gray-600">We believe in building connections between people through shared resources.</p>
              </div>
              <div className="p-5 border border-gray-100 rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium mb-2 text-brand-purple">Innovation</h3>
                <p className="text-gray-600">We continuously improve our platform to better serve our users' needs.</p>
              </div>
              <div className="p-5 border border-gray-100 rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium mb-2 text-brand-purple">Accessibility</h3>
                <p className="text-gray-600">We make quality products accessible to everyone, regardless of budget.</p>
              </div>
              <div className="p-5 border border-gray-100 rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium mb-2 text-brand-purple">Quality</h3>
                <p className="text-gray-600">We ensure all items on our platform meet high standards of quality.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                    <img 
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`} 
                      alt="Team Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-lg mb-1">Team Member {i}</h3>
                  <p className="text-sm text-gray-500">Co-founder & {i % 2 === 0 ? 'CEO' : 'CTO'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
