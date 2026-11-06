import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import CtaBand from "@/components/CtaBand";
import SiteFooter from "@/components/SiteFooter";
import MobileContact from "@/components/MobileContact";
import PremiumLayers from "@/components/PremiumLayers";
import SiteScripts from "@/components/SiteScripts";
import "./globals.css";
import "./legacy.css";
import "./boot.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sultech.site"),
  title: { default: "Автоматизация Бизнеса", template: "%s — Автоматизация Бизнеса" },
  icons: { icon: { url: "/favicon.svg?v=3", type: "image/svg+xml" } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

// Все начертания Manrope грузим сразу вместе со стилями: текст не перерисовывается после загрузки шрифта
const FONT_WEIGHTS = [400, 500, 600, 700, 800];

// До первой отрисовки: сохранённая тёмная тема (без вспышки светлой), выключенный звук на кнопке
// и «ожидание» цифр под заголовком до запуска скриптов (app/boot.css). Ожидание снимается само через 4 секунды
const BOOT_SCRIPT = `(function(){var c=document.documentElement.classList;c.add("pm-wait");setTimeout(function(){c.remove("pm-wait")},4000);try{if(localStorage.getItem("premium-theme")==="dark")c.add("pm-dark");if(localStorage.getItem("premium-sound")==="0")c.add("pm-mute")}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  for (const w of FONT_WEIGHTS) preload(`/fonts/manrope-${w}.woff2?v=2`, { as: "font", type: "font/woff2", crossOrigin: "" });
  return (
    <html lang="ru" className="premium" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        {children}
        <CtaBand />
        <SiteFooter />
        <MobileContact />
        <PremiumLayers />
        <SiteScripts />
      </body>
    </html>
  );
}
