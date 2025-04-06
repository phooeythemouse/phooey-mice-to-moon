
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Index from "./pages/Index";
import About from "./pages/About";
import Token from "./pages/Token";
import Community from "./pages/Community";
import Fun from "./pages/Fun";
import NFT from "./pages/NFT";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Helmet>
        <title>PHOOEY Memecoin - First Lunar Meme</title>
        <meta name="description" content="PHOOEY Memecoin celebrates the legacy of Apollo 17 mice, the first rodents to orbit the Moon. Join our space adventure on Solana!" />
        <meta name="keywords" content="PHOOEY Memecoin, Apollo 17 Mice, Space Crypto Project, Solana, NFT, Lunar Memecoin" />
        <meta property="og:title" content="PHOOEY Memecoin - First Lunar Meme" />
        <meta property="og:description" content="Celebrating the five legendary mice who orbited the Moon on Apollo 17. Join the lunar crypto adventure!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/lovable-uploads/857b6350-e6b9-4a05-918e-c9e653305ab2.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PHOOEY Memecoin - First Lunar Meme" />
        <meta name="twitter:description" content="Celebrating the five legendary mice who orbited the Moon on Apollo 17. Join the lunar crypto adventure!" />
        <meta name="twitter:image" content="/lovable-uploads/857b6350-e6b9-4a05-918e-c9e653305ab2.png" />
      </Helmet>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/token" element={<Token />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/community" element={<Community />} />
          <Route path="/fun" element={<Fun />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
