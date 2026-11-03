// Все цены и коэффициенты калькулятора собраны здесь.
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
  { id: "crm", label: "CRM / Продажи", hint: "Сделки, воронка, задачи менеджеров", price: [80_000, 140_000] },
  { id: "stock", label: "Склад / Учёт остатков", hint: "Приход, расход, остатки, инвентаризация", price: [70_000, 120_000] },
  { id: "finance", label: "Управленческие финансы", hint: "ДДС, P&L, прибыль по направлениям", price: [60_000, 110_000] },
  { id: "production", label: "Производство", hint: "Техкарты, заказы в работу, себестоимость", price: [100_000, 180_000] },
  { id: "cabinet", label: "Личный кабинет клиента / курьера", hint: "Статусы заказов, маршруты, оплата", price: [70_000, 130_000] },
];

export const PLATFORM_OPTIONS: {
  id: PlatformId;
  label: string;
  hint: string;
  /** Надбавка к стоимости модулей, доля */
  extra: number;
}[] = [
  { id: "web", label: "Браузер (Web)", hint: "Работает на любом компьютере", extra: 0 },
  { id: "mobile", label: "Смартфоны (iOS / Android)", hint: "Приложение для сотрудников в поле", extra: 0.45 },
  { id: "desktop", label: "Windows / Mac", hint: "Отдельная программа на компьютер", extra: 0.25 },
];

/** Каркас системы: авторизация, роли и права, админка, деплой */
export const BASE_PRICE: [number, number] = [40_000, 70_000];

/** Чем больше пользователей, тем больше ролей, прав и нагрузки */
export const TEAM_FACTOR: Record<TeamSize, number> = { s: 1, m: 1.15, l: 1.3, xl: 1.5 };

/** Хостинг в РФ-облаке + техподдержка своего софта, ₽/мес */
export const OWN_MONTHLY: Record<TeamSize, number> = { s: 3_000, m: 5_000, l: 8_000, xl: 12_000 };

/** Средний тариф коробочной CRM за одного пользователя, ₽/мес (если человек не указал свою сумму) */
export const BOX_PER_USER = 1_200;
/** Платные приложения/интеграции из маркетплейса на каждый модуль, ₽/мес */
export const BOX_PER_MODULE = 2_500;
/** Ежегодное повышение тарифов у вендоров */
export const BOX_YEARLY_INDEX = 0.1;

/** Разработка оплачивается по этапам — столько месяцев занимает проект */
export const DEV_MONTHS = 3;

export const SLIDER_MAX = 100_000;

export type QuizAnswers = {
  team: TeamSize | null;
  modules: ModuleId[];
  platforms: PlatformId[];
  boxMonthly: number;
};

export type Estimate = {
  devMin: number;
  devMax: number;
  devMid: number;
  boxMonthly: number;
  boxMonthlyIsEstimate: boolean;
  box3y: number;
  ownMonthly: number;
  own3y: number;
  savings3y: number;
  /** Месяц, когда своя система становится дешевле коробки (null — не окупается за 5 лет) */
  breakEvenMonth: number | null;
  series: { month: number; box: number; own: number }[];
};

const roundK = (n: number) => Math.round(n / 1000) * 1000;

export function estimateBoxMonthly(a: QuizAnswers): number {
  const users = TEAM_OPTIONS.find((t) => t.id === a.team)?.users ?? 10;
  return roundK(users * BOX_PER_USER + a.modules.length * BOX_PER_MODULE);
}

export function boxCostForMonth(monthly: number, month: number) {
  const year = Math.floor((month - 1) / 12);
  return monthly * Math.pow(1 + BOX_YEARLY_INDEX, year);
}

export function calculate(a: QuizAnswers, horizon = 36): Estimate {
  const team = a.team ?? "s";
  const modulesMin = a.modules.reduce((s, id) => s + (MODULE_OPTIONS.find((m) => m.id === id)?.price[0] ?? 0), 0);
  const modulesMax = a.modules.reduce((s, id) => s + (MODULE_OPTIONS.find((m) => m.id === id)?.price[1] ?? 0), 0);
  const platformExtra = a.platforms.reduce((s, id) => s + (PLATFORM_OPTIONS.find((p) => p.id === id)?.extra ?? 0), 0);
  const k = TEAM_FACTOR[team] * (1 + platformExtra);

  const devMin = roundK((BASE_PRICE[0] + modulesMin) * k);
  const devMax = roundK((BASE_PRICE[1] + modulesMax) * k);
  const devMid = roundK((devMin + devMax) / 2);

  const boxMonthlyIsEstimate = a.boxMonthly <= 0;
  const boxMonthly = boxMonthlyIsEstimate ? estimateBoxMonthly(a) : a.boxMonthly;
  const ownMonthly = OWN_MONTHLY[team];

  // Накопленные затраты по месяцам. Разработка — равными этапами за DEV_MONTHS,
  // поддержка начинается после запуска. Коробка — подписка с ежегодной индексацией.
  const series: Estimate["series"] = [{ month: 0, box: 0, own: 0 }];
  let box = 0;
  let own = 0;
  let breakEvenMonth: number | null = null;
  const maxMonth = Math.max(horizon, 60);
  for (let m = 1; m <= maxMonth; m++) {
    box += boxCostForMonth(boxMonthly, m);
    own += m <= DEV_MONTHS ? devMid / DEV_MONTHS : ownMonthly;
    if (breakEvenMonth === null && m > DEV_MONTHS && box >= own) breakEvenMonth = m;
    if (m <= horizon) series.push({ month: m, box: Math.round(box), own: Math.round(own) });
  }

  const box3y = series[Math.min(36, horizon)]?.box ?? 0;
  const own3y = series[Math.min(36, horizon)]?.own ?? 0;

  return {
    devMin,
    devMax,
    devMid,
    boxMonthly,
    boxMonthlyIsEstimate,
    box3y,
    ownMonthly,
    own3y,
    savings3y: box3y - own3y,
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
