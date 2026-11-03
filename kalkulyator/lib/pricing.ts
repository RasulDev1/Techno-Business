// Все цены и коэффициенты калькулятора собраны здесь.
// Уровень цен — средний по СНГ для небольшой студии / сильного фрилансера (2026).
// Меняйте цифры в этом файле — лендинг пересчитается сам.

export type TeamSize = "s" | "m" | "l" | "xl";
export type ModuleId = "crm" | "stock" | "finance" | "production" | "cabinet";
export type PlatformId = "web" | "mobile" | "desktop";

export const TEAM_OPTIONS: { id: TeamSize; label: string; users: number }[] = [
  { id: "s", label: "до 10", users: 7 },
  { id: "m", label: "10–25", users: 18 },
  { id: "l", label: "25–50", users: 38 },
  { id: "xl", label: "50+", users: 65 },
];

export const MODULE_OPTIONS: {
  id: ModuleId;
  label: string;
  hint: string;
  price: [number, number];
}[] = [
  { id: "crm", label: "CRM / Продажи", hint: "Сделки, воронка, задачи менеджеров", price: [45_000, 80_000] },
  { id: "stock", label: "Склад / Учёт остатков", hint: "Приход, расход, остатки, инвентаризация", price: [40_000, 70_000] },
  { id: "finance", label: "Управленческие финансы", hint: "ДДС, P&L, прибыль по направлениям", price: [35_000, 60_000] },
  { id: "production", label: "Производство", hint: "Техкарты, заказы в работу, себестоимость", price: [60_000, 110_000] },
  { id: "cabinet", label: "Личный кабинет клиента / курьера", hint: "Статусы заказов, маршруты, оплата", price: [40_000, 75_000] },
];

export const PLATFORM_OPTIONS: {
  id: PlatformId;
  label: string;
  hint: string;
  /** Надбавка к стоимости модулей, доля */
  extra: number;
}[] = [
  { id: "web", label: "Браузер (Web)", hint: "Работает на любом компьютере", extra: 0 },
  { id: "mobile", label: "Смартфоны (iOS / Android)", hint: "Приложение для сотрудников в поле", extra: 0.35 },
  { id: "desktop", label: "Windows / Mac", hint: "Отдельная программа на компьютер", extra: 0.2 },
];

/** Каркас системы: авторизация, роли и права, админка, деплой */
export const BASE_PRICE: [number, number] = [25_000, 40_000];

/** Чем больше пользователей, тем больше ролей, прав и нагрузки */
export const TEAM_FACTOR: Record<TeamSize, number> = { s: 1, m: 1.1, l: 1.2, xl: 1.35 };

/** Хостинг в РФ-облаке + техподдержка своего софта, ₽/мес */
export const OWN_MONTHLY: Record<TeamSize, number> = { s: 2_000, m: 3_000, l: 5_000, xl: 8_000 };

/** Средний тариф коробочной CRM (amoCRM, Битрикс24 и т.п.) за одного пользователя, ₽/мес */
export const BOX_PER_USER = 1_000;
/** Платные виджеты и интеграции из маркетплейса (Telegram, Авито, телефония…) на каждый модуль, ₽/мес */
export const BOX_INTEGRATIONS_PER_MODULE = 1_500;
/** Разовое внедрение коробки у интегратора: настройка воронок, полей, прав, обучение, ₽ */
export const BOX_SETUP_BASE = 30_000;
export const BOX_SETUP_PER_MODULE = 20_000;
/** Ежегодное повышение тарифов у вендоров */
export const BOX_YEARLY_INDEX = 0.1;

/** Разработка оплачивается по этапам — столько месяцев занимает проект */
export const DEV_MONTHS = 2;

export const SLIDER_MAX = 100_000;

export type QuizAnswers = {
  team: TeamSize | null;
  modules: ModuleId[];
  platforms: PlatformId[];
  /** Своими словами: что ещё должна уметь система */
  wishes: string;
};

/** Затраты на готовую коробку — вводятся после расчёта стоимости. null — «не знаю», подставляем средние */
export type BoxCosts = {
  subscription: number | null;
  integrations: number | null;
  setup: number | null;
};

export type DevEstimate = {
  devMin: number;
  devMax: number;
  devMid: number;
  ownMonthly: number;
  breakdown: { label: string; min: number; max: number }[];
};

export type Comparison = {
  subscription: number;
  integrations: number;
  setup: number;
  /** Какие суммы подставлены средними, а не введены человеком */
  estimated: (keyof BoxCosts)[];
  box3y: number;
  own3y: number;
  savings3y: number;
  /** Месяц, когда своя система становится дешевле коробки (null — не окупается за 5 лет) */
  breakEvenMonth: number | null;
  series: { month: number; box: number; own: number }[];
};

const roundK = (n: number) => Math.round(n / 1000) * 1000;
const usersOf = (a: QuizAnswers) => TEAM_OPTIONS.find((t) => t.id === a.team)?.users ?? 10;

export function averageBox(a: QuizAnswers): Required<{ [K in keyof BoxCosts]: number }> {
  const n = Math.max(1, a.modules.length);
  return {
    subscription: roundK(usersOf(a) * BOX_PER_USER),
    integrations: roundK(n * BOX_INTEGRATIONS_PER_MODULE),
    setup: roundK(BOX_SETUP_BASE + n * BOX_SETUP_PER_MODULE),
  };
}

export function estimateDev(a: QuizAnswers): DevEstimate {
  const team = a.team ?? "s";
  const platformExtra = a.platforms.reduce((s, id) => s + (PLATFORM_OPTIONS.find((p) => p.id === id)?.extra ?? 0), 0);
  const k = TEAM_FACTOR[team] * (1 + platformExtra);
  const breakdown = [
    { label: "Каркас: вход, роли и права, админка, запуск на сервере", min: BASE_PRICE[0] * k, max: BASE_PRICE[1] * k },
    ...a.modules.map((id) => {
      const m = MODULE_OPTIONS.find((x) => x.id === id)!;
      return { label: m.label, min: m.price[0] * k, max: m.price[1] * k };
    }),
  ].map((b) => ({ ...b, min: roundK(b.min), max: roundK(b.max) }));
  const devMin = breakdown.reduce((s, b) => s + b.min, 0);
  const devMax = breakdown.reduce((s, b) => s + b.max, 0);
  return { devMin, devMax, devMid: roundK((devMin + devMax) / 2), ownMonthly: OWN_MONTHLY[team], breakdown };
}

export function compare(a: QuizAnswers, dev: DevEstimate, costs: BoxCosts, horizon = 36): Comparison {
  const avg = averageBox(a);
  const estimated = (Object.keys(costs) as (keyof BoxCosts)[]).filter((k) => costs[k] === null);
  const subscription = costs.subscription ?? avg.subscription;
  const integrations = costs.integrations ?? avg.integrations;
  const setup = costs.setup ?? avg.setup;
  const monthly = subscription + integrations;

  // Накопленные затраты. Коробка: разовое внедрение + подписка и интеграции с ежегодной индексацией.
  // Свой софт: разработка равными этапами за DEV_MONTHS, дальше только хостинг и поддержка.
  const series: Comparison["series"] = [{ month: 0, box: setup, own: 0 }];
  let box = setup;
  let own = 0;
  let breakEvenMonth: number | null = null;
  for (let m = 1; m <= Math.max(horizon, 60); m++) {
    box += monthly * Math.pow(1 + BOX_YEARLY_INDEX, Math.floor((m - 1) / 12));
    own += m <= DEV_MONTHS ? dev.devMid / DEV_MONTHS : dev.ownMonthly;
    if (breakEvenMonth === null && m >= DEV_MONTHS && box >= own) breakEvenMonth = m;
    if (m <= horizon) series.push({ month: m, box: Math.round(box), own: Math.round(own) });
  }
  const at36 = series[Math.min(36, horizon)];
  return {
    subscription,
    integrations,
    setup,
    estimated,
    box3y: roundK(at36.box),
    own3y: roundK(at36.own),
    savings3y: roundK(at36.box - at36.own),
    breakEvenMonth,
    series,
  };
}

export const rub = (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n)).replace(/ /g, " ") + " ₽";

export function monthsWord(n: number) {
  const a = n % 10;
  const b = n % 100;
  if (a === 1 && b !== 11) return "месяц";
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return "месяца";
  return "месяцев";
}
