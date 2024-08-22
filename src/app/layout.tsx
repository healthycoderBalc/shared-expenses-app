import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation/Navigation";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gastos Compartidos",
  description: "Cuentas claras chocolate espeso",
  icons: {
    icon: "/favicon.ico",
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <meta name="csrf-token" content="{{ csrf_token() }}"/> */}
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <br />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
