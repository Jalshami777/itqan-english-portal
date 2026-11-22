import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'منصة إتقان | بوابة الطالب والتعليم والسداد الإلكتروني',
  description:
    'منصة تعليمية وأكاديمية متكاملة مبنية بـ Next.js ومجهزة لـ GitHub وبناء تطبيق أندرويد',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-100 text-slate-900 font-tajawal antialiased selection:bg-[#00A99D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
