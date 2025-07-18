// components/LayoutWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

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
