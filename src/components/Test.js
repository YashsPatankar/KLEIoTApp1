import React from 'react';
import { Bell, Building2, ChevronRight, MessageSquare, Shield, Users } from 'lucide-react';

const EnhancedLandingPage = () => {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-cyan-400" />,
      title: 'Tenant Portal',
      description: 'Easily manage maintenance requests, rent payments, and communication through our self-service portal.'
    },
    {
      icon: <Shield className="h-10 w-10 text-cyan-400" />,
      title: 'Secure Payments',
      description: 'Make payments with confidence using our bank-grade security and automated processing.'
    },
    {
      icon: <Bell className="h-10 w-10 text-cyan-400" />,
      title: 'Smart Notifications',
      description: 'Stay informed with automated alerts for maintenance, rent collection, and updates.'
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-cyan-400" />,
      title: 'Communication Hub',
      description: 'Connect effortlessly with tenants, owners, and staff through our centralized messaging system.'
    },
    {
      icon: <Building2 className="h-10 w-10 text-cyan-400" />,
      title: 'Property Analytics',
      description: 'Gain actionable insights into property performance with real-time analytics and reports.'
    },
    {
      icon: <Shield className="h-10 w-10 text-cyan-400" />,
      title: 'Document Management',
      description: 'Organize leases, contracts, and important documents with secure digital storage.'
    }
  ];

  const testimonials = [
    {
      quote: 'The automation features have saved us countless hours in property management tasks.',
      author: 'Sarah Chen',
      role: 'Property Manager'
    },
    {
      quote: 'Excellent platform that has streamlined our entire operation. The tenant portal is a game-changer.',
      author: 'Michael Roberts',
      role: 'Building Owner'
    },
    {
      quote: 'The best property management solution we have used. Support team is incredibly responsive.',
      author: 'Jessica Martinez',
      role: 'Real Estate Director'
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-8xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-5xl font-extrabold mb-6 text-white tracking-wide">
              Griha Mitra Housekeeping
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Manage your properties effortlessly with cutting-edge tools and intuitive design.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <button className="bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-cyan-700 hover:scale-105 transition-all duration-300 ease-in-out transform">
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-cyan-600 hover:text-white hover:border-cyan-600 active:scale-95 transition-all duration-300 ease-in-out transform">
                Schedule Demo
              </button>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:w-1/2">
            <img
              src="/Amar.jpg"
              alt="Showcase"
              className="rounded-lg shadow-2xl transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold mb-6 text-center text-cyan-400 tracking-wide">
            Explore Our Powerful Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-700 p-8 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
              >
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What Our Customers Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-700 p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl"
              >
                <blockquote className="italic text-gray-400 mb-6">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-full animate-pulse mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-lg font-bold mb-4">jFork Technology Services</h4>
              <p>
                Delivering innovative solutions to make property management simple and efficient.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="home" className="hover:underline">Features</a></li>
                <li><a href="home" className="hover:underline">Pricing</a></li>
                <li><a href="home" className="hover:underline">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="home" className="hover:underline">About Us</a></li>
                <li><a href="home" className="hover:underline">Careers</a></li>
                <li><a href="home" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="home" className="hover:underline">Privacy Policy</a></li>
                <li><a href="home" className="hover:underline">Terms of Service</a></li>
                <li><a href="home" className="hover:underline">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} jFork Technology Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedLandingPage;
