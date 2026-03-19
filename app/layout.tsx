import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'email-sequence-builder',
  description: 'Email marketing automation with pre-built templates',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
