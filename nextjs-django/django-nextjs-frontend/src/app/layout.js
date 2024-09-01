import "./globals.css";
import { AuthProvider } from "@/components/authProvider";

import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/themeProvider";
import BaseLayout from "@/components/layout/BaseLayout";
import { Suspense } from "react";
import { Divide } from "lucide-react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata = {
  title: "Django with NextJS",
  description: "Django with NextJS",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )} >
        <Suspense fallback={<div>Loading....</div>}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
          >
            <AuthProvider>
              <BaseLayout
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col bg-muted/40"
              >
                {children}
              </BaseLayout>
            </AuthProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
