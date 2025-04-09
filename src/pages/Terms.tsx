
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';

const TermsPage = () => {
  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      <section className="pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
          
          <div className="glass-card p-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">
                Last Updated: April 9, 2025
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-300">
                These Terms of Service constitute a legally binding agreement made between you and PHOOEY ("we," "us," or "our"), concerning your access to and use of the PHOOEY website and platform. By accessing or using the PHOOEY website, you agree to be bound by these Terms.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Intellectual Property</h2>
              <p className="text-gray-300">
                The PHOOEY website, its original content, features, functionality, and NFTs are owned by PHOOEY and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. User Accounts</h2>
              <p className="text-gray-300">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. NFTs and Digital Assets</h2>
              <p className="text-gray-300">
                PHOOEY NFTs are digital collectibles available on the Solana blockchain. By purchasing a PHOOEY NFT, you own the NFT but not the intellectual property rights to the underlying artwork. PHOOEY grants you a limited license to use, copy, and display the NFT for your personal, non-commercial use.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Prohibited Activities</h2>
              <p className="text-gray-300">
                You may not access or use the PHOOEY website for any purpose other than that for which we make it available. You agree not to:
              </p>
              <ul className="list-disc pl-8 text-gray-300 space-y-2 my-4">
                <li>Use the website in any manner that could disable, overburden, damage, or impair the site</li>
                <li>Use any robot, spider, or other automated device to access the website</li>
                <li>Introduce any viruses, trojan horses, worms, or other malicious code</li>
                <li>Attempt to circumvent any security measures</li>
                <li>Engage in any fraudulent activities</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Risk Disclosure</h2>
              <p className="text-gray-300">
                Cryptocurrencies and NFTs involve significant risk. The prices of cryptocurrencies and NFTs are highly volatile and may be affected by external factors such as financial, regulatory, or political events. You understand and agree that:
              </p>
              <ul className="list-disc pl-8 text-gray-300 space-y-2 my-4">
                <li>The value of cryptocurrencies and NFTs can change rapidly</li>
                <li>Past performance is not an indication of future performance</li>
                <li>You should only invest what you can afford to lose</li>
                <li>You are solely responsible for conducting your own research and due diligence</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-300">
                In no event shall PHOOEY, its directors, employees, partners, agents, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-8 text-gray-300 space-y-2 my-4">
                <li>Your access to or use of or inability to access or use the website</li>
                <li>Any conduct or content of any third party on the website</li>
                <li>Any content obtained from the website</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Changes to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify or replace these Terms at any time. It is your responsibility to review these Terms periodically for changes. Your continued use of the PHOOEY website following the posting of any changes to these Terms constitutes acceptance of those changes.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Governing Law</h2>
              <p className="text-gray-300">
                These Terms shall be governed by and defined following the laws of the jurisdiction in which PHOOEY operates. PHOOEY and you irrevocably consent that the courts in that jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Terms.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Contact Information</h2>
              <p className="text-gray-300">
                If you have any questions about these Terms, please contact us at phooeythemouse@gmail.com.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TermsPage;
