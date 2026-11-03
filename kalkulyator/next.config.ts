import type { NextConfig } from "next";

// Статическая сборка: `npm run build` кладёт готовый сайт в папку out/.
// Если сайт будет жить в подпапке домена (например sultech.site/kalkulyator),
// соберите с переменной: NEXT_PUBLIC_BASE_PATH=/kalkulyator npm run build
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
