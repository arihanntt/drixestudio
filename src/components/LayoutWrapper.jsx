'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScrollWrapper from './SmoothScrollWrapper';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isAdminPage = pathname === '/admin';
  const isCampusPage = pathname.startsWith('/campus'); // 🔥 add this
  const isClanzoPage = pathname.startsWith('/clanzo'); // 🔥 add this
    const isdaztaoPage = pathname.startsWith('/daztao'); // 🔥 add this

  const hideLayout = isHomePage || isAdminPage || isCampusPage || isClanzoPage || isdaztaoPage ;

  return (
    <>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
