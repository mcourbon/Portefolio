/** @type {import('next').NextConfig} */
const nextConfig = {
  // L'ancienne page « Pour qui » doublonnait la section de l'accueil : les métiers sont dans le menu.
  async redirects() {
    return [{ source: "/pour-qui", destination: "/#pour-qui", permanent: true }];
  },
};

export default nextConfig;
