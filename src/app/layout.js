import "./globals.css";

export default function RootLayout({ children }) {
  return (
   <html lang="en" className="bg-white">
     <body className="bg-white min-h-screen">
        {children}
      </body>
    </html>
  );
}