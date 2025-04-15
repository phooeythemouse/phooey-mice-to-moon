
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Solana wallet type definitions to window object
declare global {
  interface Window {
    solana?: {
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      isPhantom?: boolean;
      publicKey?: { toString: () => string };
    };
    solflare?: {
      connect: () => Promise<void>;
      disconnect: () => Promise<void>;
      publicKey: { toString: () => string };
    };
    backpack?: {
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      publicKey?: { toString: () => string };
    };
  }
}

// Performance monitoring in production
const isProduction = import.meta.env.PROD;

// React 18's createRoot API
const root = createRoot(document.getElementById("root")!);

// Measure initial load performance
if (isProduction) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.info(`Page load time: ${pageLoadTime}ms`);
    }, 0);
  });
  
  // Log when routes change to help debug navigation
  window.addEventListener('popstate', () => {
    console.info(`Route changed to: ${window.location.pathname}`);
  });
}

// Render the app
root.render(<App />);
