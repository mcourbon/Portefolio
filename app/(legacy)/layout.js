import "@/legacy/styles.css";

// V1 et V2 : archives de l'ancien portfolio, gardées telles quelles et non indexées.
export const metadata = {
  title: "mcourbon",
  robots: { index: false, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function LegacyLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Lato&family=Raleway&family=Roboto&family=Bebas+Neue&family=Poppins&family=Oswald&family=Muli&family=Montserrat&family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
