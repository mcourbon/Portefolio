import { preconnect } from "react-dom";
import { El_Messiri, Poppins, Amiri } from "next/font/google";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { SITE } from "@/lib/site";

const messiri = El_Messiri({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-messiri", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins", display: "swap" });
const amiri = Amiri({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-amiri", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · ${SITE.role}`, template: `%s · ${SITE.shortName}` },
  description: SITE.description,
  openGraph: { type: "website", locale: "fr_FR", siteName: SITE.name },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6ebd7",
};

export default function SiteLayout({ children }) {
  // La prise de rendez-vous (Cal.com) s'ouvre dans le site : on prépare la connexion pour qu'elle s'affiche plus vite.
  preconnect("https://app.cal.com");
  preconnect("https://cal.com");
  return (
    <html lang="fr" className={`${messiri.variable} ${poppins.variable} ${amiri.variable}`}>
      <body className="font-sans antialiased">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brun focus:px-4 focus:py-2 focus:text-creme">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
