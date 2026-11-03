import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/playfair-display";
import "./globals.css";

export const metadata: Metadata = {
  title: "Свой софт для бизнеса — калькулятор стоимости",
  description:
    "Соберите функционал своей CRM, склада и аналитики и сразу узнайте ориентировочную стоимость разработки. Сравните с подпиской на готовую коробку.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="min-h-screen font-sans text-[17px] leading-relaxed text-ink antialiased">{children}</body>
    </html>
  );
}
