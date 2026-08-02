import "./globals.css";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`bg-white ${instrumentSerif.variable}`}
    >
      <body className="bg-white min-h-screen">
        {children}
      </body>
    </html>
  );
}