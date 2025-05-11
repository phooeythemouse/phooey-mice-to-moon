import React, { lazy, Suspense, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import PerformanceMonitor from "./components/PerformanceMonitor";
import { WalletProvider } from "./providers/WalletProvider";

// Eagerly load the Game component to avoid dynamic import issues
import Game from "./pages/Game";

// Lazy load other pages for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Token = lazy(() => import("./pages/Token"));
const Community = lazy(() => import("./pages/Community"));
const Fun = lazy(() => import("./pages/Fun"));
const NFT = lazy(() => import("./pages/NFT"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-space-dark">
    <div className="glass-card p-8 rounded-lg shadow-glow animate-pulse">
      <img 
        src="/lovable-uploads/phooey.webp" 
        alt="PHOOEY" 
        className="h-16 w-16 mx-auto animate-bounce" 
      />
      <p className="text-white mt-4 text-center">Loading PHOOEY...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  // Add error boundary state
  const [hasError, setHasError] = useState(false);

  // Reset error state when route changes
  useEffect(() => {
    setHasError(false);
  }, [window.location.pathname]);

  // Handle error fallback
  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-space-dark flex-col p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
        <p className="text-gray-300 mb-4">We encountered an error loading this page.</p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="bg-space-blue hover:bg-space-accent text-white font-bold py-2 px-4 rounded"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WalletProvider>
          <Helmet>
            <title>PHOOEY Memecoin - First Lunar Meme</title>
            <meta name="description" content="PHOOEY Memecoin celebrates the legacy of Apollo 17 mice, the first rodents to orbit the Moon. Join our space adventure on Solana!" />
            <meta name="keywords" content="PHOOEY, memecoin, Solana, Apollo 17, space mice, crypto, blockchain, NFT, lunar memecoin, space exploration" />
            <meta property="og:title" content="PHOOEY Memecoin - First Lunar Meme" />
            <meta property="og:description" content="Celebrating the five legendary mice who orbited the Moon on Apollo 17. Join the lunar crypto adventure!" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/lovable-uploads/phooey.webp" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@phooeythemouse" />
            <meta name="twitter:title" content="PHOOEY - The Moon's First Memecoin" />
            <meta name="twitter:description" content="Celebrating the five legendary mice who orbited the Moon on Apollo 17. Join the lunar crypto adventure!" />
            <meta name="twitter:image" content="/lovable-uploads/phooey.webp" />
            
            {/* Crucial SEO tags */}
            <link rel="canonical" href="https://phooey.fun" />
            <meta name="robots" content="index, follow" />
            
            {/* Performance and security */}
            <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: https: *.youtube.com *.ytimg.com; script-src 'self' https://cdn.gpteng.co https://cdn.wowanalytics.io; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.phooey.fun; frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com;" />
            <meta name="theme-color" content="#0F172A" />
          </Helmet>
          <Toaster />
          <Sonner />
          <PerformanceMonitor />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/token" element={<Token />} />
                <Route path="/nft" element={<NFT />} />
                <Route path="/community" element={<Community />} />
                <Route path="/game" element={
                  // Wrap Game component in its own error boundary
                  <ErrorBoundaryWrapper>
                    <Game />
                  </ErrorBoundaryWrapper>
                } />
                <Route path="/fun" element={<Fun />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </WalletProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Simple error boundary wrapper component
const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Set up an error handler for the wrapped component
    const handleError = () => {
      setHasError(true);
      console.log("Error boundary caught an error in the game component");
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen space-bg flex flex-col">
        <div className="flex-grow container mx-auto px-4 py-8 md:py-24 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Game Loading Error</h2>
          <p className="text-gray-300 mb-4">We encountered an issue loading the game.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-space-blue hover:bg-space-accent text-white font-bold py-2 px-4 rounded mx-2"
          >
            Try Again
          </button>
          <a 
            href="/"
            className="bg-space-accent hover:bg-space-blue text-white font-bold py-2 px-4 rounded mx-2 inline-block mt-2 md:mt-0"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default App;
