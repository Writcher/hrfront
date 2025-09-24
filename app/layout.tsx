"use client"

import { QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "./globals.css";
import queryClient from "./queryprovider";
import { DrawerProvider } from "@/lib/context/navcontext";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider } from "@/lib/context/snackbarcontext";
import { SessionProvider } from "next-auth/react";

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
                <SnackbarProvider>
                  <div className="flex flex-grow h-screen w-screen">
                    {children}
                  </div>
                </SnackbarProvider>
              </DrawerProvider>
            </QueryClientProvider>
          </LocalizationProvider>
      </body>
    </html>
  );
};
