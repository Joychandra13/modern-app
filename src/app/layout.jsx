import "./globals.css";

export const metadata = {
  title: "ModernApp | Math Solutions",
  description: "Comprehensive mathematics learning platform with expert solutions. Master algebra, calculus, geometry, and more with step-by-step guidance.",
  keywords: "mathematics, math, algebra, calculus, geometry, statistics, learning, education, solutions",
  authors: [{ name: "ModernApp Team" }],
  creator: "ModernApp",
  publisher: "ModernApp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
        sizes: '32x32',
      }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
