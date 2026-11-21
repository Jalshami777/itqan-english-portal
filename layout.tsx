import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'منصة إتقان | تعلم اللغة الإنجليزية من الصفر إلى الاحتراف',
  description: 'منصة تعليمية تفاعلية مبنية بتقنية Next.js وجاهزة لبناء تطبيق أندرويد',
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 font-tajawal antialiased selection:bg-[#00A99D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
