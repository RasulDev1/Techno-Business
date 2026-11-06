import type { NextConfig } from "next";

// Статическая сборка: `npm run build` кладёт готовый сайт в папку out/.
// Страницы выходят теми же файлами, что и раньше: index.html, odnostranichnyj-sajt.html и т. д.,
// поэтому все ссылки и адреса в поиске остаются прежними.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  // В режиме разработки (next dev) открываем те же адреса с .html, что и на живом сайте
  ...(process.env.NODE_ENV === "development"
    ? {
        async rewrites() {
          return [
            { source: "/index.html", destination: "/" },
            { source: "/:page.html", destination: "/:page" },
          ];
        },
      }
    : {}),
};

export default nextConfig;
