# Лендинг-калькулятор стоимости своего софта

Next.js + Tailwind + TypeScript. Отдельное приложение, основной сайт в корне репозитория не трогает.

## Запуск

```bash
cd kalkulyator
npm install
npm run dev        # http://localhost:3000
npm run build      # готовый статический сайт в папке out/
```

Если лендинг будет жить в подпапке домена (например `sultech.site/kalkulyator/`):

```bash
NEXT_PUBLIC_BASE_PATH=/kalkulyator npm run build
```

Папку `out/` можно залить на любой хостинг (Vercel, Netlify, GitHub Pages, обычный сервер).

## Где что менять

- `lib/pricing.ts` — все цены модулей, коэффициенты за размер команды и платформы, хостинг, средний тариф коробки.
- `lib/contacts.ts` — телефон, WhatsApp и Telegram для кнопок и формы.
- `components/` — экраны: `Hero`, `Quiz`, `Result` (+ `PaybackChart`), `Trap`, `Trust`, `LeadForm`, `Footer`.

## Как работает форма

Бэкенда нет: кнопка «Получить смету» открывает WhatsApp с готовым сообщением (имя, телефон и весь расчёт квиза).
Кнопка «Удобнее в Telegram» копирует то же сообщение в буфер и открывает чат в Telegram.
