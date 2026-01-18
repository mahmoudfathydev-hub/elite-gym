import type { Metadata } from "next";
import "./globals.css";
import { montserrat, openSans } from './fonts';
import ClientWrapper from "./ClientWrapper";
import { AuthProvider } from "@/utils/AuthContext";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "ELITE GYM",
  description: "Professional Gym Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body>
        <AuthProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
