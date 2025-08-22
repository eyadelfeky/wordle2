import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



export const metadata = {
  title: "Wordle",
  description: "daily puzzles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-teal-700">
        {children}
      </body>
    </html>
  );
}
