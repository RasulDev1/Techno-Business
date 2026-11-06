// Общие помощники для скриптов сайта

export const PHONE = "(max-width: 620px)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export const media = (query: string) => window.matchMedia(query);
export const prefersReducedMotion = () => media("(prefers-reduced-motion: reduce)").matches;
export const isPremium = () => document.documentElement.classList.contains("premium");

/** Ближайший к цели события элемент по селектору (цель может быть не элементом) */
export function closest<T extends Element = HTMLElement>(target: EventTarget | null, selector: string): T | null {
  return target instanceof Element ? target.closest<T>(selector) : null;
}

/** querySelectorAll сразу массивом */
export function all<T extends Element = HTMLElement>(selector: string, scope: ParentNode = document): T[] {
  return Array.from(scope.querySelectorAll<T>(selector));
}

/** Перезапуск CSS-анимации: снять класс, дать браузеру пересчитать стиль, вернуть класс */
export function replay(el: Element, cls: string) {
  el.classList.remove(cls);
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
}

/** localStorage без ошибок в приватном режиме и при запрещённом хранилище */
export function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}
export function load(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
