import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: '빵빵이조 투두메이트',
  description:
    '빵빵이즈 '
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
