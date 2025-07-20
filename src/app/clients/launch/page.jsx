'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEATURES } from '../../../data/featuresData';

// Loading spinner component for the Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-gray-50">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-700">Loading your launch guide...</h2>
    </div>
  </div>
);

// Main component
const ClientLaunchSubPageContent = () => {
  const searchParams = useSearchParams();
  const sectionRef = useRef(null);
  const [html2pdf, setHtml2pdf] = useState(null);
  const [inputPassword, setInputPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const pageId = searchParams.get('pageId');

  useEffect(() => {
    if (!html2pdf) {
      loadPdf();
    }
    fetchPageData();
  }, []);

  const loadPdf = async () => {
    try {
      const mod = await import('html2pdf.js');
      setHtml2pdf(() => mod.default);
    } catch (err) {
      console.error('Failed to load html2pdf.js:', err);
      alert('Failed to load PDF generation library. Please try again later.');
    }
  };

  const fetchPageData = async () => {
    setIsLoading(true);
    if (!pageId) {
      setError('Missing page ID. Please generate the page properly.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/launch-pages/${pageId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch page data');
      }

      setPageData(data);
      if (!data.password) {
        setIsUnlocked(true);
        sessionStorage.removeItem('launchPagePassword');
      }
    } catch (err) {
      console.error('Error fetching page data:', err);
      setError('Failed to load page data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const stripOklchColors = (element) => {
    const colorMap = {
      'text-purple-700': '#6b21a8',
      'bg-purple-600': '#7e22ce',
      'bg-purple-700': '#6b21a8',
      'text-gray-600': '#4b5563',
      'text-gray-800': '#1f2937',
      'bg-white': '#ffffff',
      'text-white': '#ffffff',
      'text-red-500': '#ef4444',
      'text-xl': '#1f2937',
      'text-3xl': '#1f2937',
      'font-bold': '#1f2937',
      'font-semibold': '#1f2937',
      'shadow-lg': '#000000',
      'rounded': '#000000',
      'border-gray-200': '#e5e7eb',
      'border-gray-300': '#d1d5db',
      'bg-gray-50': '#f9fafb',
      'bg-purple-50': '#faf5ff',
      'bg-purple-100': '#f3e8ff',
      'text-purple-100': '#ede9fe',
      'border-white': '#ffffff',
      'bg-white/10': 'rgba(255, 255, 255, 0.1)',
      'text-white/80': 'rgba(255, 255, 255, 0.8)',
      'placeholder-white/50': 'rgba(255, 255, 255, 0.5)',
      'border-white/20': 'rgba(255, 255, 255, 0.2)',
      'border-white/30': 'rgba(255, 255, 255, 0.3)',
      'focus:ring-white/50': 'rgba(255, 255, 255, 0.5)',
      'bg-gray-800': '#1f2937',
      'hover:bg-gray-100': '#f3f4f6',
      'hover:bg-purple-700': '#6b21a8',
      'hover:border-purple-300': '#d8b4fe',
      'bg-indigo-600': '#4f46e5',
      'text-indigo-100': '#e0e7ff',
      'border-purple-100': '#f3e8ff',
    };

    const processElement = (el) => {
      if (el.nodeType !== Node.ELEMENT_NODE) return;
      const computedStyle = window.getComputedStyle(el);
      el.className = '';
      if (computedStyle.color && computedStyle.color.includes('oklch')) {
        el.style.color = colorMap['text-gray-800'] || '#000000';
      } else {
        el.style.color = computedStyle.color || '#000000';
      }
      if (computedStyle.backgroundColor && computedStyle.backgroundColor.includes('oklch')) {
        el.style.backgroundColor = colorMap['bg-white'] || '#ffffff';
      } else {
        el.style.backgroundColor = computedStyle.backgroundColor || 'transparent';
      }
      if (computedStyle.borderColor && computedStyle.borderColor.includes('oklch')) {
        el.style.borderColor = colorMap['border-gray-200'] || '#e5e7eb';
      }
      if (computedStyle.fill && computedStyle.fill.includes('oklch')) {
        el.style.fill = '#000000';
      }
      if (computedStyle.stroke && computedStyle.stroke.includes('oklch')) {
        el.style.stroke = '#000000';
      }
      const styleKeys = Object.keys(computedStyle);
      styleKeys.forEach((key) => {
        if (key.startsWith('--')) {
          el.style.removeProperty(key);
        }
      });
      if (el.tagName === 'H1') {
        el.style.fontSize = '2rem';
        el.style.fontWeight = '700';
        el.style.color = colorMap['text-purple-700'] || '#6b21a8';
        el.style.fontFamily = 'Roboto, sans-serif';
      } else if (el.tagName === 'H2') {
        el.style.fontSize = '1.5rem';
        el.style.fontWeight = '600';
        el.style.color = colorMap['text-gray-800'] || '#1f2937';
        el.style.fontFamily = 'Roboto, sans-serif';
      } else if (el.tagName === 'P') {
        el.style.fontSize = '1rem';
        el.style.color = colorMap['text-gray-600'] || '#4b5563';
        el.style.fontFamily = 'Open Sans, sans-serif';
      } else if (el.tagName === 'BUTTON') {
        el.style.backgroundColor = colorMap['bg-purple-600'] || '#7e22ce';
        el.style.color = colorMap['text-white'] || '#ffffff';
        el.style.padding = '0.5rem 1.5rem';
        el.style.borderRadius = '0.25rem';
      } else if (el.tagName === 'LI') {
        el.style.fontSize = '1rem';
        el.style.color = colorMap['text-gray-600'] || '#4b5563';
        el.style.fontFamily = 'Open Sans, sans-serif';
        el.style.marginBottom = '0.5rem';
      }
      Array.from(el.children).forEach(processElement);
    };

    element.style.color = '#000000';
    element.style.backgroundColor = '#ffffff';
    element.style.border = 'none';
    element.style.fontFamily = 'Open Sans, sans-serif';
    processElement(element);

    const checkOklch = (el) => {
      if (el.nodeType !== Node.ELEMENT_NODE) return;
      const style = window.getComputedStyle(el);
      if (style.color.includes('oklch') || style.backgroundColor.includes('oklch')) {
        console.warn('Found oklch in:', el, style.color, style.backgroundColor);
      }
      Array.from(el.children).forEach(checkOklch);
    };
    checkOklch(element);
  };

  const handleDownload = async () => {
    if (!html2pdf || !sectionRef.current) {
      console.error('html2pdf or sectionRef not ready');
      alert('PDF generation is not ready. Please try again.');
      return;
    }

    setIsDownloading(true);
    try {
      const pdfContainer = document.createElement('div');
      pdfContainer.style.width = '800px';
      pdfContainer.style.backgroundColor = '#ffffff';
      pdfContainer.style.fontFamily = 'Open Sans, sans-serif';
      pdfContainer.style.color = '#1f2937';
      pdfContainer.style.padding = '40px';
      pdfContainer.style.boxSizing = 'border-box';

      // Cover Page
      const coverPage = document.createElement('div');
      coverPage.style.textAlign = 'center';
      coverPage.style.padding = '100px 20px';
      coverPage.style.background = 'linear-gradient(180deg, #7e22ce 0%, #4f46e5 100%)';
      coverPage.style.color = '#ffffff';
      coverPage.style.height = '100%';
      coverPage.style.display = 'flex';
      coverPage.style.flexDirection = 'column';
      coverPage.style.justifyContent = 'center';
      coverPage.innerHTML = `
        <h1 style="font-family: Roboto, sans-serif; font-size: 36px; font-weight: 700; margin-bottom: 20px;">
          ${pageData?.owner}'s Server Launch Guide
        </h1>
        <p style="font-family: Open Sans, sans-serif; font-size: 18px; opacity: 0.9;">
          Prepared for ${pageData?.discord} | Generated on ${new Date().toLocaleDateString()}
        </p>
        <div style="margin-top: 40px; font-size: 24px;">🚀</div>
      `;
      pdfContainer.appendChild(coverPage);

      // Clone main content
      const contentClone = sectionRef.current.cloneNode(true);
      contentClone.style.padding = '20px';
      contentClone.style.backgroundColor = '#ffffff';

      // Header
      const header = document.createElement('div');
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.left = '0';
      header.style.width = '100%';
      header.style.backgroundColor = '#7e22ce';
      header.style.color = '#ffffff';
      header.style.padding = '10px 20px';
      header.style.fontFamily = 'Roboto, sans-serif';
      header.style.fontSize = '12px';
      header.style.borderBottom = '2px solid #f3e8ff';
      header.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Server Launch Guide</span>
          <span>${pageData?.owner}</span>
        </div>
      `;
      pdfContainer.appendChild(header);

      // Footer with page numbers
      const footer = document.createElement('div');
      footer.style.position = 'fixed';
      footer.style.bottom = '0';
      footer.style.left = '0';
      footer.style.width = '100%';
      footer.style.backgroundColor = '#f9fafb';
      footer.style.padding = '10px 20px';
      footer.style.fontFamily = 'Open Sans, sans-serif';
      footer.style.fontSize = '10px';
      footer.style.color = '#4b5563';
      footer.style.borderTop = '1px solid #e5e7eb';
      footer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Contact: @${pageData?.discord} on Discord</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `;
      pdfContainer.appendChild(footer);

      // Add content
      pdfContainer.appendChild(contentClone);

      stripOklchColors(pdfContainer);
      document.body.appendChild(pdfContainer);

      const opt = {
        margin: [0.5, 0.5, 1, 0.5], // Extra bottom margin for footer
        filename: `${pageData?.owner}_Launch_Guide.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], after: '.break-after' },
      };

      await html2pdf()
        .set(opt)
        .from(pdfContainer)
        .save();

      document.body.removeChild(pdfContainer);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUnlock = async () => {
    if (!pageData) {
      alert('Page data not loaded.');
      return;
    }

    if (!pageData.password) {
      setIsUnlocked(true);
      return;
    }

    const storedPassword = sessionStorage.getItem('launchPagePassword');
    if (storedPassword && inputPassword === storedPassword) {
      setIsUnlocked(true);
      return;
    }

    try {
      const response = await fetch('/api/validate-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, password: inputPassword }),
      });
      const { isValid, error } = await response.json();
      if (!response.ok) {
        throw new Error(error || 'Failed to validate password');
      }

      if (isValid) {
        setIsUnlocked(true);
        sessionStorage.setItem('launchPagePassword', inputPassword);
      } else {
        alert('Wrong password!');
        setInputPassword('');
      }
    } catch (err) {
      console.error('Error validating password:', err);
      alert('Failed to validate password. Please try again.');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Page</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-gray-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-700">Loading your launch guide...</h2>
          <p className="text-gray-500 mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20"
        >
          <div className="text-white text-5xl mb-6">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-2">Protected Content</h1>
          <p className="text-white/80 mb-8">
            Enter the password to access {pageData?.owner}'s launch guide
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <input
              type="password"
              placeholder="Enter password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
            />
          </motion.div>
          <motion.button
            onClick={handleUnlock}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Unlock Content
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  🚀 {pageData.owner}'s Server Launch Guide
                </h1>
                <p className="text-indigo-100">Discord: @{pageData.discord}</p>
              </div>
              <motion.button
                onClick={handleDownload}
                disabled={isDownloading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-purple-700 rounded-lg font-medium shadow-md hover:bg-gray-50 transition-all"
              >
                {isDownloading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download PDF
                  </>
                )}
              </motion.button>
            </div>
          </div>
          <div ref={sectionRef} className="p-8">
            <AnimatePresence>
              {pageData.features.map((featureKey) => {
                const feature = FEATURES.find((f) => f.key === featureKey);
                if (!feature) return null;

                return (
                  <motion.section
                    key={feature.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-10 last:mb-0 break-after"
                    style={{ pageBreakAfter: 'always' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <div className="text-purple-600 text-2xl">
                          {feature.icon}
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {feature.label}
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4 pl-14">{feature.description}</p>
                    <div className="space-y-4 pl-14">
                      {feature.details.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ translateX: 5 }}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-all"
                        >
                          <div className="font-mono text-sm bg-gray-800 text-white px-3 py-2 rounded mb-2 overflow-x-auto">
                            {item.command || item.tip || item.duty || item.task}
                          </div>
                          <p className="text-gray-600">{item.purpose}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                );
              })}
            </AnimatePresence>
          </div>
          <div className="border-t border-gray-200 px-8 py-6 bg-gray-50 rounded-b-2xl">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Need help? Contact @{pageData.discord} on Discord
              </p>
              <motion.button
                onClick={handleDownload}
                disabled={isDownloading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg font-medium shadow-md hover:bg-purple-700 transition-all"
              >
                {isDownloading ? 'Generating...' : 'Download Full Guide'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Wrapper component with Suspense boundary
const ClientLaunchSubPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ClientLaunchSubPageContent />
    </Suspense>
  );
};

export default ClientLaunchSubPage;