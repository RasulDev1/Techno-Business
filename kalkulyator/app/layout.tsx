import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: [
    { path: "./fonts/manrope-500.woff2", weight: "500" },
    { path: "./fonts/manrope-600.woff2", weight: "600" },
    { path: "./fonts/manrope-700.woff2", weight: "700" },
    { path: "./fonts/manrope-800.woff2", weight: "800" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Свой софт для бизнеса по цене коробки — калькулятор стоимости и окупаемости",
  description:
    "CRM, склад и аналитика в одном приложении без ежемесячных подписок. Рассчитайте стоимость разработки и срок окупаемости своего софта за 1 минуту.",
};

export const viewport: Viewport = { themeColor: "#2563eb" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-sans font-medium">{children}</body>
    </html>
  );
}
