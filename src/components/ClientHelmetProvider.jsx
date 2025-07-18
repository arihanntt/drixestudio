'use client';
import { HelmetProvider } from 'react-helmet-async';

export default function ClientHelmetProvider({ children }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}
