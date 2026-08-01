import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}