import {Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import Chatbot from "@/components/chatbot";


const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "SAARTHI - AI Career Coach",
  description: " AI Career Coach is your smart, personal guide for career growth. Get resume tips, interview prep, skill insights, and job advice — all powered by AI, anytime you need it.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */ }
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <Chatbot />
            
            {/* footer */}
            <footer className="bg-muted/50 py-8 sm:py-12">
              <div className="container mx-auto px-4 sm:px-6 text-center text-gray-200">
                <p className="text-sm sm:text-base">Made by Sahil Mishra</p>
              </div>
            </footer>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
