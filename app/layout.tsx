import { QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "./globals.css";
import queryClient from "./queryprovider";
import { DrawerProvider } from "@/lib/context/navcontext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <DrawerProvider>
            {children}
          </DrawerProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
