
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

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
}

root.render(<App />);
