// components/LayoutWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScrollWrapper from './SmoothScrollWrapper';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAdminPage = pathname === '/admin'; // Adjust if admin route is different

  return (
    <>
      {!isHomePage && !isAdminPage && <Navbar />}
      <main>{children}</main>
      {!isHomePage && !isAdminPage && <Footer />}
    </>
  );
}