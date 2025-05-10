
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/Index';
import AboutPage from './pages/About';
import NFTPage from './pages/NFT';
import TokenPage from './pages/Token';
import CommunityPage from './pages/Community';
import NotFoundPage from './pages/NotFound';
import TermsPage from './pages/Terms';
import PrivacyPage from './pages/Privacy';
import ContactPage from './pages/Contact';
import AdminPage from './pages/Admin';
import FunPage from './pages/Fun';
import GamePage from './pages/Game';

// Components
import PerformanceMonitor from './components/PerformanceMonitor';
import { Toaster as ShadcnToaster } from './components/ui/toaster';
import { Toaster } from './components/ui/sonner';

// Providers
import { WalletProvider } from './providers/WalletProvider';

function App() {
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);
  
  // Load analytics script
  useEffect(() => {
    if (!analyticsLoaded && import.meta.env.PROD) {
      const script = document.createElement('script');
      script.src = 'https://cdn.wowanalytics.io/wow.js';
      script.async = true;
      script.onload = () => {
        setAnalyticsLoaded(true);
        console.info('Analytics loaded');
        
        // Initialize analytics
        if ((window as any).wow) {
          (window as any).wow('init', {
            projectId: 'phooey-to-the-moon'
          });
        }
      };
      
      document.head.appendChild(script);
    }
    
    // Update CSP to allow YouTube iframe embedding
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; img-src 'self' data: https: *.youtube.com *.ytimg.com; script-src 'self' https://cdn.gpteng.co https://cdn.wowanalytics.io; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.phooey.fun; frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com";
    document.head.appendChild(meta);
    
    return () => {
      // Clean up
      if (analyticsLoaded) {
        console.info('Analytics cleaned up');
      }
    };
  }, [analyticsLoaded]);

  return (
    <BrowserRouter>
      <WalletProvider>
        <PerformanceMonitor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/nft" element={<NFTPage />} />
          <Route path="/token" element={<TokenPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/fun" element={<FunPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster position="top-right" richColors />
        <ShadcnToaster />
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
