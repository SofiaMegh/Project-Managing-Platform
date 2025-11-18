import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Luvarum",
  description: "Project Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="luvarum">
      <body className={`${inter.className} dotted-background`}>
        <ClerkProvider 
          appearance={{
            baseTheme: shadesOfPurple,
            variables: {
              colorPrimary: "#faf5ff",       // Light purple
              colorBackground: "#702459",    // Maroon background
              colorInputBackground: "#faf5ff", 
              colorInputText: "#2e1065",     // Dark violet text (better contrast)
            },
            elements: {
              formButtonPrimary: {
                backgroundColor: "white",
              },
              card: {
                backgroundColor: "#702459",
                boxShadow: "0 5px 6px rgba(0, 0, 0, 0.1)"
              },
            }
          }}
        >
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem={false}
            forcedTheme="dark"
          >
            <Header/>
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-[#ab4a6a] py-12">
              <div className="container mx-auto px-4 text-center text-[#faf5ff]">
                <p>Made with Love by Us</p>
              </div>
            </footer>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

