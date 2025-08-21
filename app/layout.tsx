"use client"

import { QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "./globals.css";
import queryClient from "./queryprovider";
import { DrawerProvider } from "@/lib/context/navcontext";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            <DrawerProvider>
              <div className="flex flex-grow">
                {children}
              </div>
            </DrawerProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
