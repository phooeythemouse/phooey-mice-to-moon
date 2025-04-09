
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';

const PrivacyPage = () => {
  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      <section className="pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
          
          <div className="glass-card p-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">
                Last Updated: April 9, 2025
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
              <p className="text-gray-300">
                PHOOEY ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our platform.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-bold text-white mt-6 mb-2">2.1 Personal Information</h3>
              <p className="text-gray-300">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-8 text-gray-300 space-y-2 my-4">
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our website</li>
                <li>Participate in our community discussions</li>
                <li>Purchase PHOOEY tokens or NFTs</li>
              </ul>
              
              <h3 className="text-xl font-bold text-white mt-6 mb-2">2.2 Wallet Information</h3>
              <p className="text-gray-300">
                When you connect your wallet to our platform, we may collect your wallet address. We do not have access to your private keys or funds.
              </p>
              
              <h3 className="text-xl font-bold text-white mt-6 mb-2">2.3 Automatically Collected Information</h3>
              <p className="text-gray-300">
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-8 text-gray-300 space-y-2 my-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages you visit</li>
                <li>Time and date of your visit</li>
                <li>Time spent on pages</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300">
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-8 text-gray-300 space-y-2 my-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you updates and marketing communications</li>
                <li>Process your transactions</li>
                <li>Respond to your inquiries</li>
                <li>Protect against fraudulent or unauthorized transactions</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Information Sharing</h2>
              <p className="text-gray-300">
                We may share your information with:
              </p>
              <ul className="list-disc pl-8 text-gray-300 space-y-2 my-4">
                <li>Service providers who help us operate our website and services</li>
                <li>Legal and regulatory authorities when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
              
              <p className="text-gray-300">
                We do not sell your personal information to third parties.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-gray-300">
                We may use cookies and similar tracking technologies to collect information about your browsing activities and to improve your experience on our website. You can control cookies through your browser settings.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Data Security</h2>
              <p className="text-gray-300">
                We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no internet or electronic transmission is ever fully secure, and we cannot guarantee the absolute security of your information.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Your Rights</h2>
              <p className="text-gray-300">
                Depending on your location, you may have rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-8 text-gray-300 space-y-2 my-4">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-300">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Changes to this Privacy Policy</h2>
              <p className="text-gray-300">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Contact Information</h2>
              <p className="text-gray-300">
                If you have any questions or concerns about this Privacy Policy, please contact us at phooeythemouse@gmail.com.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;
