// Журнал заявок в hero: новые заявки появляются в таблице, один менеджер закрывает каждую.
(function () {
  const body = document.querySelector(".ledger-body");
  if (!body) return;
  const counter = document.getElementById("ledger-count");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const VISIBLE = 6;

  // Примеры заявок: подписаны на странице как «Пример заполнения»
  const ENTRIES = [
    ["Анна К.", "Перфоратор на 2 суток"],
    ["Игорь", "Футболка Airline, размер M"],
    ["ООО «Ремстрой»", "Смета на ремонт офиса"],
    ["Марина", "Запись на консультацию"],
    ["Дмитрий", "Ветровка Tempo Shell, 2 шт."],
    ["Сергей П.", "Бетономешалка на выходные"],
    ["Ольга", "Курс по маникюру, оплата"],
    ["Тимур", "Шуруповёрт с доставкой"],
    ["Елена В.", "Беговые кроссовки, возврат"],
    ["Студия «Лайм»", "Лендинг под акцию"],
    ["Павел", "Плиткорез на 3 суток"],
    ["Наталья", "Худи, 3 размера на выбор"],
  ];

  let n = 0, done = 0, minutes = 9 * 60 + 4;

  function time() {
    minutes += 7 + Math.floor(Math.random() * 19);
    const h = Math.floor(minutes / 60) % 24, m = minutes % 60;
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }

  function makeRow() {
    const [client, need] = ENTRIES[n % ENTRIES.length];
    n++;
    const row = document.createElement("div");
    row.className = "ledger-row";
    row.innerHTML =
      '<span class="num"></span><span class="hand c-time"></span><span class="hand c-client"></span>' +
      '<span class="hand c-need"></span><span class="hand c-man">Менеджер 1</span>' +
      '<span class="mark"><span class="stamp"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Выполнено</span></span>';
    const cells = row.children;
    cells[0].textContent = n;
    cells[1].textContent = time();
    cells[2].textContent = client;
    cells[3].textContent = need;
    return row;
  }

  function count() {
    done++;
    if (counter) counter.textContent = done.toLocaleString("ru-RU");
  }

  // Сразу показываем уже заполненную часть страницы, без анимации остаются все строки
  for (let i = 0; i < (reduce ? VISIBLE : VISIBLE - 2); i++) {
    const row = makeRow();
    row.querySelectorAll(".hand").forEach((c) => c.classList.add("is-written"));
    row.querySelector(".stamp").classList.add("is-down");
    body.appendChild(row);
    count();
  }
  if (reduce) return;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function writeRow() {
    if (body.children.length >= VISIBLE) {
      const first = body.firstElementChild;
      first.classList.add("is-leaving");
      await wait(450);
      first.remove();
    }
    const row = makeRow();
    body.appendChild(row);
    const hands = row.querySelectorAll(".hand");
    for (const cell of hands) {
      cell.classList.add("is-written");
      await wait(140);
    }
    await wait(700);
    row.querySelector(".stamp").classList.add("is-down");
    count();
  }

  // Пишем, только пока журнал виден на экране
  let running = false, visible = true;
  async function loop() {
    if (running) return;
    running = true;
    while (visible) {
      await writeRow();
      await wait(900);
    }
    running = false;
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); }).observe(body);
  } else {
    loop();
  }
})();

// Если скриншот шаблона ещё не загружен, показываем заглушку
document.querySelectorAll(".shot img").forEach((img) => {
  const empty = img.parentElement.querySelector(".shot-empty");
  const fail = () => { img.hidden = true; };
  const ok = () => { if (empty) empty.hidden = true; };
  if (img.complete) (img.naturalWidth ? ok : fail)();
  img.addEventListener("error", fail);
  img.addEventListener("load", ok);
});
