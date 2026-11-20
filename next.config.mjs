/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site 100 % statique : `npm run build` génère le dossier `out/`, que Vercel sert tel quel.
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
