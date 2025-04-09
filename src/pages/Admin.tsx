
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSubscribers } from '../services/newsletterService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarryBackground from '../components/StarryBackground';
import SectionHeading from '../components/SectionHeading';
import SubscribersTable from '../components/SubscribersTable';

const Admin = () => {
  const { data: subscribers = [], isLoading } = useQuery({
    queryKey: ['subscribers'],
    queryFn: fetchSubscribers,
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-space-black">
      <StarryBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 relative z-10">
        <SectionHeading 
          title="Admin Dashboard" 
          subtitle="Manage your PHOOEY community data" 
          className="mb-12"
        />
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gradient mb-6">Newsletter Subscribers</h2>
          <SubscribersTable subscribers={subscribers} isLoading={isLoading} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
