import { El_Messiri, Poppins, Amiri } from "next/font/google";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Animations from "@/components/site/Animations";
import RendezVous from "@/components/site/RendezVous";
import { SITE } from "@/lib/site";

const messiri = El_Messiri({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-messiri", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins", display: "swap" });
const amiri = Amiri({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-amiri", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · ${SITE.role}`, template: `%s · ${SITE.shortName}` },
  description: SITE.description,
  openGraph: { type: "website", locale: "fr_FR", siteName: SITE.name },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6ebd7",
};

export default function SiteLayout({ children }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" suppressHydrationWarning className={`${messiri.variable} ${poppins.variable} ${amiri.variable}`}>
      <body className="font-sans antialiased">
        {/* Cache le haut de page avant l'arrivée des animations, pour éviter qu'il clignote (voir globals.css). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('anim')",
          }}
        />
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brun focus:px-4 focus:py-2 focus:text-creme">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <Animations />
        <RendezVous />
      </body>
    </html>
  );
}
