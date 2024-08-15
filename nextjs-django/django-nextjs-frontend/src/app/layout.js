import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Django with NextJS",
  description: "Django with NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
