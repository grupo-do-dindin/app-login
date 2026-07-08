import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@dindin/design-system";

import "./globals.css";

export const metadata: Metadata = {
  title: "DinDin | Entrar",
  description: "Acesse sua conta DinDin",
  icons: {
    icon: "/icon.svg",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={roboto.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white text-black dark:bg-[#202024] dark:text-white">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
