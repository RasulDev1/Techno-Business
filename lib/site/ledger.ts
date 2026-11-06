// Журнал заявок в hero: новые заявки появляются в таблице, менеджер Султан ведёт каждую до своего статуса.
import { PHONE, closest, isPremium, media, prefersReducedMotion } from "./dom";

type Status = "new" | "pay" | "done" | "cancel";
/** Для кого заявка: "м" — мужские товары и услуги, "ж" — женские, "" — подходит всем */
type Audience = "м" | "ж" | "";

// Примеры заявок: подписаны на странице как «Пример заполнения». Клиент, запрос, менеджер и статус собираются случайно
const MEN = ["Магомед А.", "Игорь", "Аслан Т.", "Хасан", "Дмитрий", "Рустам", "Ахмед", "Тамерлан", "Сергей П.", "Заур", "Мурат К."];
const WOMEN = ["Анна К.", "Залина", "Марина", "Мадина", "Амина Б.", "Ольга", "Фатима", "Елена В.", "Лейла", "Диана Т.", "Наталья"];
const NEEDS: [string, Audience][] = [
  ["Перфоратор на 2 суток", "м"], ["Футболка Airline, размер M", "м"], ["Смета на ремонт офиса", ""], ["Запись на консультацию", ""],
  ["Ветровка Storm Shell, 2 шт.", "м"], ["Бетономешалка на выходные", "м"], ["Шуруповёрт с доставкой", "м"],
  ["Беговые кроссовки, возврат", "м"], ["Лендинг под акцию", ""], ["Плиткорез на 3 суток", "м"], ["Худи, 3 размера на выбор", "м"],
];
// Чаще заявки доходят до вручения, реже отменяются
const STATUSES: Status[] = ["done", "done", "done", "done", "new", "new", "new", "pay", "pay", "cancel"];

// Статусы заявки: подпись и значок
const STATUS: Record<Status, [label: string, icon: string]> = {
  new: ["Принято", '<path d="M5 12.5l4.5 4.5L19 7.5"/>'],
  pay: ["Ждёт оплаты", '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'],
  done: ["Вручено", '<path d="M2.5 12.5l4.5 4.5 9-9.5M11 16.5l.5.5 9-9.5"/>'],
  cancel: ["Отменено", '<path d="M7 7l10 10M17 7L7 17"/>'],
};
// Премиум-режим: нажатие на статус «перетекает» в следующий
const NEXT: Record<Status, Status> = { new: "pay", pay: "done", done: "new", cancel: "new" };

const stampIcon = (icon: string) =>
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icon + "</svg>";

const SPEED = 2.55 * 1.3; // лента быстрее: сначала в 1,5 раза, затем ещё на 70% и на 30%
const BELT_MS = 1300; // (было 1700, ускорено на 30%) одна строка проезжает за столько мс: лента едет вниз постоянно, без остановок

/** Случайный выбор без повторов подряд: перемешанная «колода», которая пополняется, когда кончается */
function deck<T>(list: T[]): () => T {
  let pile: T[] = [];
  let last: T | undefined;
  return () => {
    if (!pile.length) {
      pile = list.slice();
      for (let i = pile.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pile[i], pile[j]] = [pile[j], pile[i]];
      }
      if (pile[pile.length - 1] === last && pile.length > 1) pile.unshift(pile.pop()!);
    }
    return (last = pile.pop()!);
  };
}

export function initLedger() {
  const body = document.querySelector<HTMLElement>(".ledger-body");
  if (!body) return;
  const counter = document.getElementById("ledger-count");
  const word = document.getElementById("ledger-word");
  const reduce = prefersReducedMotion();
  const VISIBLE = media(PHONE).matches ? 3 : 6;

  const nextMan = deck(MEN), nextWoman = deck(WOMEN), nextAny = deck(MEN.concat(WOMEN)), nextNeed = deck(NEEDS), nextStatus = deck(STATUSES);

  let done = 0, minutes = 9 * 60 + 4;
  // Номера заявок идут не подряд: часть заявок ушла в другие статусы раньше
  let id = Math.floor(Math.random() * 600);
  function nextId() {
    id += 1 + Math.floor(Math.random() * 6);
    if (id > 1000) id = 1 + Math.floor(Math.random() * 6);
    return String(id).padStart(4, "0");
  }
  const byStatus: Record<Status, number> = { new: 0, pay: 0, done: 0, cancel: 0 };
  const statOut: Partial<Record<Status, HTMLElement>> = {};
  document.querySelectorAll<HTMLElement>("[data-st]").forEach((el) => { statOut[el.dataset.st as Status] = el; });

  function time() {
    minutes += 7 + Math.floor(Math.random() * 19);
    const h = Math.floor(minutes / 60) % 24, m = minutes % 60;
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }

  function makeRow() {
    const [need, who] = nextNeed(), st = nextStatus();
    const client = who === "м" ? nextMan() : who === "ж" ? nextWoman() : nextAny();
    const [label, icon] = STATUS[st];
    const row = document.createElement("div");
    row.className = "ledger-row";
    row.dataset.st = st;
    row.innerHTML =
      '<span class="num"></span><span class="hand c-time"></span><span class="hand c-client"></span>' +
      '<span class="hand c-need"></span><span class="hand c-man">Менеджер Султан</span>' +
      '<span class="mark"><span class="stamp st-' + st + '">' + stampIcon(icon) + label + "</span></span>";
    const cells = row.children;
    cells[0].textContent = nextId();
    cells[1].textContent = time();
    cells[2].textContent = client;
    cells[3].textContent = need;
    return row;
  }

  function count(st: Status) {
    done++;
    if (counter) counter.textContent = done.toLocaleString("ru-RU");
    if (word) {
      const m10 = done % 10, m100 = done % 100;
      word.textContent = m10 === 1 && m100 !== 11 ? "заявку" : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? "заявки" : "заявок";
    }
    byStatus[st]++;
    const out = statOut[st];
    if (out) out.textContent = String(byStatus[st]);
  }

  // Премиум-режим: нажатие на статус «перетекает» в следующий, плашка плавно меняет ширину и форму
  body.addEventListener("click", (e) => {
    const stamp = closest(e.target, ".stamp");
    if (!stamp || !isPremium() || reduce) return;
    const row = stamp.closest<HTMLElement>(".ledger-row")!, from = row.dataset.st as Status, to = NEXT[from] || "new";
    const w0 = stamp.getBoundingClientRect().width;
    stamp.style.transition = "none"; stamp.style.width = w0 + "px"; stamp.style.overflow = "hidden";
    stamp.className = "stamp is-down st-" + to;
    const [label, icon] = STATUS[to];
    stamp.innerHTML = stampIcon(icon) + label;
    stamp.style.width = "auto"; const w1 = stamp.getBoundingClientRect().width; stamp.style.width = w0 + "px";
    void stamp.offsetWidth;
    stamp.style.transition = "width .6s cubic-bezier(.16,1,.3,1), background-color .6s, color .6s, border-radius .6s";
    stamp.style.width = w1 + "px"; stamp.style.borderRadius = "999px";
    window.setTimeout(() => { stamp.style.width = ""; stamp.style.overflow = ""; stamp.style.borderRadius = ""; stamp.style.transition = ""; }, 650);
    row.dataset.st = to;
    if (byStatus[from] > 0) byStatus[from]--;
    byStatus[to]++;
    if (statOut[from]) statOut[from].textContent = String(byStatus[from]);
    if (statOut[to]) statOut[to].textContent = String(byStatus[to]);
  });

  // Сразу показываем уже заполненную часть страницы, без анимации остаются все строки
  for (let i = 0; i < Math.max(1, reduce ? VISIBLE : VISIBLE - 2); i++) {
    const row = makeRow();
    row.querySelectorAll(".hand").forEach((c) => c.classList.add("is-written"));
    row.querySelector(".stamp")!.classList.add("is-down");
    body.appendChild(row);
    count(row.dataset.st as Status);
  }
  if (reduce) return;

  const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms / SPEED));
  const sleep = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

  // Пишем, только пока журнал виден на экране
  let running = false, visible = true;

  // Запасной вариант (телефон: одна карточка): старая строка гаснет, новая появляется
  async function writeRow() {
    if (body!.children.length >= VISIBLE) {
      const first = body!.firstElementChild!;
      first.classList.add("is-leaving");
      await sleep(350);
      first.remove();
    }
    const row = makeRow();
    body!.appendChild(row);
    for (const cell of row.querySelectorAll(".hand")) {
      cell.classList.add("is-written");
      await wait(140);
    }
    await wait(700);
    row.querySelector(".stamp")!.classList.add("is-down");
    count(row.dataset.st as Status);
  }

  // Постоянное листание: таблица едет вниз с одной скоростью, сверху непрерывно въезжают новые заявки (плавно проявляются),
  // снизу старые уходят. Каждый кадр обновляется только одна переменная --belt.
  let rowH = 53, p = 1, last = 0, beltOn = false;
  function spawn() {
    while (body!.children.length > VISIBLE) body!.firstElementChild!.remove(); // ушла за нижний край
    const row = makeRow();
    body!.appendChild(row);
    rowH = row.offsetHeight || rowH;
    row.querySelectorAll(".hand").forEach((c, i) => window.setTimeout(() => c.classList.add("is-written"), i * 40));
    window.setTimeout(() => { row.querySelector(".stamp")!.classList.add("is-down"); count(row.dataset.st as Status); }, BELT_MS * 0.6);
  }
  function runBelt() {
    if (beltOn) return;
    beltOn = true; body!.classList.add("is-belt"); last = performance.now();
    const frame = (now: number) => {
      if (!visible) { beltOn = false; return; }
      p += Math.min(now - last, 80) / BELT_MS; last = now;
      if (p >= 1) { p -= 1; spawn(); }
      body!.style.setProperty("--belt", (p - 1) * rowH + "px");
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  async function loop() {
    if (VISIBLE > 1 && isPremium()) return runBelt();
    if (running) return;
    running = true;
    while (visible) {
      await writeRow();
      await wait(isPremium() ? 3200 + Math.random() * 1800 : 900);
    }
    running = false;
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); }).observe(body);
  } else {
    loop();
  }
}
