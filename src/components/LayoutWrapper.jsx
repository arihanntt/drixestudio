// components/LayoutWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScrollWrapper from './SmoothScrollWrapper';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {!isHomePage && <Navbar />}
      <main>{children}</main>
      {!isHomePage && <Footer />}
    </>
  );
}
