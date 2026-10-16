import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Bookkeeping Assistant',
  description: 'Nigeria-focused AI bookkeeping and invoice assistant for small businesses.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
