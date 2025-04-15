
import React, { useEffect, useState } from 'react';

// Define the proper types for the Performance API
interface LayoutShiftAttribution {
  node?: Node;
  previousRect?: DOMRectReadOnly;
  currentRect?: DOMRectReadOnly;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  lastInputTime: number;
  sources?: LayoutShiftAttribution[];
}

interface LargestContentfulPaint extends PerformanceEntry {
  element?: Element;
  id?: string;
  url?: string;
  size: number;
  startTime: number;
  renderTime?: number;
  loadTime?: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    FCP: 0,
    LCP: 0,
    CLS: 0,
  });

  useEffect(() => {
    // Only run in production to avoid development overhead
    if (process.env.NODE_ENV !== 'production') return;

    try {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, FCP: fcpEntry.startTime }));
      });
      fcpObserver.observe({ type: 'paint', buffered: true });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lcpEntry = entries[entries.length - 1] as LargestContentfulPaint;
        setMetrics(prev => ({ ...prev, LCP: lcpEntry.startTime }));
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        for (const entry of entryList.getEntries()) {
          // Cast the entry to LayoutShift type
          const layoutShiftEntry = entry as LayoutShift;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        setMetrics(prev => ({ ...prev, CLS: clsValue }));
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    } catch (e) {
      console.error('Performance monitoring not supported', e);
    }
  }, []);

  // Don't render anything in the UI, this is just for logging
  return null;
};

export default PerformanceMonitor;
