// layout.tsx
import { Inter } from 'next/font/google';
import Topbar from "../components/Topbar";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Contract Demos",
  description: "Demos for contract processing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
