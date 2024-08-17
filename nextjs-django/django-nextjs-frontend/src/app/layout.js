import "./globals.css";
import { AuthProvider } from "@/components/authProvider";

import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/themeProvider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
