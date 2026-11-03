import "@/legacy/styles.css";

export const metadata = {
  title: "mcourbon",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
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
