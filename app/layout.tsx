import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
import BackgroundGlow from "@/components/BackgroundGlow";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguagePopup from "@/components/LanguagePopup";

export const metadata: Metadata = {
  title: "Wifi Money by CapitalRise",
  description: "Step-by-Step Plan für Wifi Money",
  robots: "noindex, nofollow",
  icons: {
    icon: "/assets/images/Favicon_wifimoney_capitalrise.webp",
  },
  openGraph: {
    title: "Step-by-Step Plan für Wifi Money",
    description: "Folge diesen 4 einfachen Schritten um loszulegen.",
    images: ["/assets/images/OImage.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/images/OImage.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={dmSans.className}>
      <body>
        <LanguageProvider>
          <BackgroundGlow />
          <LanguagePopup />
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
