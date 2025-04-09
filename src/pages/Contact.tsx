
import React, { useState } from 'react';
import { Mail, Twitter, Send } from 'lucide-react';
import { toast } from 'sonner';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import SocialIcon from '@/components/SocialIcon';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message Sent!", {
      description: "We'll get back to you as soon as possible.",
      duration: 3000,
    });
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions about PHOOEY? We're here to help! Get in touch with our team.
            </p>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-space-purple/30 border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:border-space-blue"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-space-purple/30 border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:border-space-blue"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-space-purple/30 border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:border-space-blue"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="text-space-blue h-6 w-6 mt-1 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">Email</h3>
                      <a href="mailto:phooeythemouse@gmail.com" className="text-gray-300 hover:text-space-accent transition-colors">
                        phooeythemouse@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <SocialIcon type="twitter" className="text-space-blue h-6 w-6 mt-1 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">Twitter</h3>
                      <a href="https://twitter.com/phooeythemouse" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-space-accent transition-colors">
                        @phooeythemouse
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <SocialIcon type="telegram" className="text-space-blue h-6 w-6 mt-1 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">Telegram</h3>
                      <a href="https://t.me/phooeythemouse" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-space-accent transition-colors">
                        t.me/phooeythemouse
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">When is the token launching?</h3>
                    <p className="text-gray-300">
                      We're currently in the final stages of preparation. Follow our social media channels for the official launch date announcement.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white">How can I buy PHOOEY tokens?</h3>
                    <p className="text-gray-300">
                      After launch, PHOOEY tokens will be available on selected Solana DEXes. We'll provide detailed purchase instructions closer to launch.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white">How do I join the community?</h3>
                    <p className="text-gray-300">
                      Join our growing community by following us on Twitter or joining our Telegram group. Links are available in the footer of the website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
