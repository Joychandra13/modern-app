import "./globals.css";

export const metadata = {
  title: "ModernApp | Simple Solutions",
  description: "Experience simple tools designed for efficiency. Browse our catalog of quality items.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
