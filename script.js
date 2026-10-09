// Журнал заявок в hero: новые заявки появляются в таблице, менеджер Султан ведёт каждую до своего статуса.
(function () {
  const body = document.querySelector(".ledger-body");
  if (!body) return;
  const counter = document.getElementById("ledger-count");
  const word = document.getElementById("ledger-word");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const VISIBLE = window.matchMedia("(max-width: 620px)").matches ? 3 : 6;

  // Примеры заявок: подписаны на странице как «Пример заполнения». Клиент, запрос, менеджер и статус собираются случайно
  const MEN = ["Магомед А.", "Игорь", "Аслан Т.", "Хасан", "Дмитрий", "Рустам", "Ахмед", "Тамерлан", "Сергей П.", "Заур", "Мурат К."];
  const WOMEN = ["Анна К.", "Залина", "Марина", "Мадина", "Амина Б.", "Ольга", "Фатима", "Елена В.", "Лейла", "Диана Т.", "Наталья"];
  // Заявка: текст и для кого она; "м" — мужские товары и услуги, "ж" — женские, "" — подходит всем
  const NEEDS = [
    ["Перфоратор на 2 суток", "м"], ["Футболка Airline, размер M", "м"], ["Смета на ремонт офиса", ""], ["Запись на консультацию", ""],
    ["Ветровка Tempo Shell, 2 шт.", "м"], ["Бетономешалка на выходные", "м"], ["Курс по маникюру, оплата", "ж"], ["Шуруповёрт с доставкой", "м"],
    ["Беговые кроссовки, возврат", "м"], ["Лендинг под акцию", ""], ["Плиткорез на 3 суток", "м"], ["Худи, 3 размера на выбор", "м"],
    ["Запись на окрашивание волос", "ж"], ["Курс по макияжу, оплата", "ж"], ["Запись на ламинирование ресниц", "ж"],
  ];
  // Чаще заявки доходят до вручения, реже отменяются
  const STATUSES = ["done", "done", "done", "done", "new", "new", "new", "pay", "pay", "cancel"];

  // Случайный выбор без повторов подряд: перемешанная «колода», которая пополняется, когда кончается
  function deck(list) {
    let pile = [], last;
    return function () {
      if (!pile.length) {
        pile = list.slice();
        for (let i = pile.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pile[i], pile[j]] = [pile[j], pile[i]]; }
        if (pile[pile.length - 1] === last && pile.length > 1) pile.unshift(pile.pop());
      }
      return (last = pile.pop());
    };
  }
  const nextMan = deck(MEN), nextWoman = deck(WOMEN), nextAny = deck(MEN.concat(WOMEN)), nextNeed = deck(NEEDS), nextStatus = deck(STATUSES);

  // Статусы заявки: подпись и значок
  const STATUS = {
    new: ["Принято", '<path d="M5 12.5l4.5 4.5L19 7.5"/>'],
    pay: ["Ждёт оплаты", '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'],
    done: ["Вручено", '<path d="M2.5 12.5l4.5 4.5 9-9.5M11 16.5l.5.5 9-9.5"/>'],
    cancel: ["Отменено", '<path d="M7 7l10 10M17 7L7 17"/>'],
  };

  let n = 0, done = 0, minutes = 9 * 60 + 4;
  // Номера заявок идут не подряд: часть заявок ушла в другие статусы раньше
  let id = Math.floor(Math.random() * 600);
  function nextId() {
    id += 1 + Math.floor(Math.random() * 6);
    if (id > 1000) id = 1 + Math.floor(Math.random() * 6);
    return String(id).padStart(4, "0");
  }
  const byStatus = { new: 0, pay: 0, done: 0, cancel: 0 };
  const statOut = {};
  document.querySelectorAll("[data-st]").forEach((el) => { statOut[el.dataset.st] = el; });

  function time() {
    minutes += 7 + Math.floor(Math.random() * 19);
    const h = Math.floor(minutes / 60) % 24, m = minutes % 60;
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }

  function makeRow() {
    const [need, who] = nextNeed(), st = nextStatus();
    const client = who === "м" ? nextMan() : who === "ж" ? nextWoman() : nextAny();
    const [label, icon] = STATUS[st];
    n++;
    const row = document.createElement("div");
    row.className = "ledger-row";
    row.dataset.st = st;
    row.innerHTML =
      '<span class="num"></span><span class="hand c-time"></span><span class="hand c-client"></span>' +
      '<span class="hand c-need"></span><span class="hand c-man">Менеджер Султан</span>' +
      '<span class="mark"><span class="stamp st-' + st + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icon + "</svg>" + label + "</span></span>";
    const cells = row.children;
    cells[0].textContent = nextId();
    cells[1].textContent = time();
    cells[2].textContent = client;
    cells[3].textContent = need;
    return row;
  }

  function count(st) {
    done++;
    if (counter) counter.textContent = done.toLocaleString("ru-RU");
    if (word) {
      const m10 = done % 10, m100 = done % 100;
      word.textContent = m10 === 1 && m100 !== 11 ? "заявку" : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? "заявки" : "заявок";
    }
    byStatus[st]++;
    if (statOut[st]) statOut[st].textContent = byStatus[st];
  }

  // Сразу показываем уже заполненную часть страницы, без анимации остаются все строки
  for (let i = 0; i < (reduce ? VISIBLE : VISIBLE - 2); i++) {
    const row = makeRow();
    row.querySelectorAll(".hand").forEach((c) => c.classList.add("is-written"));
    row.querySelector(".stamp").classList.add("is-down");
    body.appendChild(row);
    count(row.dataset.st);
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
    count(row.dataset.st);
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
  // Заглушку показываем только при ошибке: картинки грузятся лениво, и до загрузки её видно быть не должно
  if (empty) empty.hidden = true;
  const fail = () => { img.hidden = true; if (empty) empty.hidden = false; };
  const ok = () => { if (empty) empty.hidden = true; };
  if (img.complete) (img.naturalWidth ? ok : fail)();
  img.addEventListener("error", fail);
  img.addEventListener("load", ok);
});


// Счётчики метрик под заголовком
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll(".hero-metrics b[data-to]").forEach(function (el) {
    const to = +el.dataset.to, sign = el.dataset.sign, t0 = performance.now() + 350, dur = 1600;
    function tick(now) {
      const p = Math.min(1, Math.max(0, (now - t0) / dur));
      const e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      el.textContent = sign + Math.round(to * e) + "%";
      if (p < 1) requestAnimationFrame(tick);
    }
    el.textContent = sign + "0%";
    requestAnimationFrame(tick);
  });
})();

// Макет одностраничника: курсор ходит по полям формы и нажимает «Отправить»
(function () {
  const mock = document.querySelector(".mock");
  if (!mock) return;
  const start = mock.querySelector(".mk-hero em");
  if (!start) return; // на странице CRM другой макет, без формы
  const targets = mock.querySelectorAll(".mk-form span, .mk-form em");
  function at(el, i) {
    let x = el.offsetWidth * .45, y = el.offsetHeight * .45;
    for (let n = el; n && n !== mock; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; }
    mock.style.setProperty("--cx" + i, Math.round(x) + "px");
    if (i < 2) mock.style.setProperty("--cy" + i, Math.round(y) + "px");
  }
  function place() {
    at(start, 0);
    targets.forEach(function (el, i) { at(el, i + 1); });
  }
  place();
  window.addEventListener("resize", place);
  window.addEventListener("load", place);
  if (document.fonts) document.fonts.ready.then(place);
  mock.querySelector(".mock-cursor").addEventListener("animationiteration", place);
})();

/* CRM в демо: рисуем её как на экране ноутбука и уменьшаем под ширину колонки, чтобы меню слева не пропадало */
(() => {
  const box = document.querySelector(".live-zoom"); if (!box) return;
  const f = box.querySelector("iframe"), W = +box.dataset.w, wide = matchMedia("(min-width: 961px)"), phone = matchMedia("(max-width: 620px)");
  const fit = () => {
    if (!wide.matches) { if (!phone.matches) f.style.cssText = ""; return; }
    f.style.cssText = "";
    const w = box.clientWidth, h = f.offsetHeight, k = Math.min(1, w / W);
    if (k === 1) return;
    f.style.cssText = `width:${W}px;height:${h / k}px;transform:scale(${k});margin-bottom:${h - h / k}px`;
  };
  new ResizeObserver(fit).observe(box); wide.addEventListener("change", fit); fit();
})();

// Телефон: демо не перехватывает прокрутку, пока его не включили касанием
(function () {
  var frames = document.querySelectorAll('.live-frame');
  if (!frames.length) return;
  frames.forEach(function (f) {
    if (!f.querySelector('iframe[src^="demo/"]')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'demo-guard';
    b.innerHTML = '<span>Нажмите, чтобы попробовать</span>';
    b.addEventListener('click', function () { f._t = Date.now(); f.classList.add('is-live'); f.dispatchEvent(new CustomEvent('demo-open')); });
    f.appendChild(b);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (!e.isIntersecting && Date.now() - (f._t || 0) > 1500) f.classList.remove('is-live'); });
      }).observe(f);
    }
  });
})();

// Телефон: «Подробнее» раскрывает карточку, а не открывает страницу
(function () {
  var mq = window.matchMedia('(max-width: 620px)');
  document.querySelectorAll('.grid .card').forEach(function (card) {
    var more = card.querySelector('.more'), label = card.querySelector('.more-text');
    if (!more) return;
    if (mq.matches) more.setAttribute('role', 'button');
    var setLabel = function () {
      if (label && !card.classList.contains('is-open')) label.textContent = mq.matches ? 'Раскрыть' : 'Подробнее';
    };
    setLabel();
    if (mq.addEventListener) mq.addEventListener('change', setLabel);
    var toggle = function (e) {
      if (!mq.matches) return;
      e.preventDefault();
      var open = card.classList.toggle('is-open');
      if (label) label.textContent = open ? 'Свернуть' : 'Раскрыть';
      more.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };
    more.addEventListener('click', function (e) { e.stopPropagation(); toggle(e); });
  });
})();

// Телефон, страница CRM: магазин и CRM рядом уменьшенными; по нажатию демо раскрывается на всю ширину
(function () {
  var grid = document.querySelector('.live-duo-grid'); if (!grid) return;
  var phone = window.matchMedia('(max-width: 620px)');
  var W = 390, H = 780;
  var cols = grid.querySelectorAll('.live-col');
  function fit(col) {
    var frame = col.querySelector('.live-frame'), ifr = frame.querySelector('iframe'), g = frame.querySelector('.demo-guard span');
    var reset = function () { frame.style.height = ''; if (ifr.dataset.duo) { ifr.style.transform = ''; delete ifr.dataset.duo; } };
    if (!phone.matches) { reset(); return; }
    if (col.classList.contains('is-open')) { reset(); if (g) g.textContent = 'Нажмите, чтобы попробовать'; return; }
    var k = frame.clientWidth / W;
    ifr.style.cssText = ''; ifr.style.transform = 'scale(' + k + ')'; ifr.dataset.duo = '1';
    frame.style.height = Math.round(H * k) + 'px';
    if (g) g.textContent = 'Попробовать';
  }
  function fitAll() { cols.forEach(fit); }
  cols.forEach(function (col) {
    var frame = col.querySelector('.live-frame');
    var close = document.createElement('button');
    close.type = 'button'; close.className = 'duo-close'; close.textContent = 'Свернуть ↑';
    close.addEventListener('click', function () {
      col.classList.remove('is-open'); frame.classList.remove('is-live'); fitAll();
      grid.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
    col.appendChild(close);
    frame.addEventListener('demo-open', function () {
      if (!phone.matches || col.classList.contains('is-open')) return;
      col.classList.add('is-open'); fitAll();
      col.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  });
  if ('ResizeObserver' in window) new ResizeObserver(fitAll).observe(grid);
  phone.addEventListener('change', fitAll); fitAll();
})();

// Телефон, одностраничник: макет сайта рисуется в ширину настоящего телефона и уменьшается под колонку
(function () {
  var box = document.querySelector('.live-frame[data-phone-w]'); if (!box) return;
  var f = box.querySelector('iframe'), W = +box.dataset.phoneW, mq = window.matchMedia('(max-width: 620px)');
  function fit() {
    f.style.cssText = '';
    if (!mq.matches) return;
    var w = box.clientWidth, h = f.offsetHeight, k = Math.min(1, w / W);
    if (k === 1) return;
    f.style.cssText = 'width:' + W + 'px;height:' + (h / k) + 'px;transform:scale(' + k + ');transform-origin:0 0;margin-bottom:' + (h - h / k) + 'px';
  }
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(box);
  mq.addEventListener('change', fit); fit();
})();

// Телефон, одностраничник: два видео рядом, нажатие раскрывает видео до удобного размера
(function () {
  var items = document.querySelectorAll('.features .feature');
  if (items.length < 2) return;
  items.forEach(function (it) {
    var media = it.querySelector('.feature-media'), title = it.querySelector('h2');
    if (!media) return;
    var cover = document.createElement('button');
    cover.type = 'button'; cover.className = 'feature-cover';
    cover.setAttribute('aria-label', 'Раскрыть видео: ' + (title ? title.textContent : ''));
    cover.innerHTML = '<span><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>';
    media.appendChild(cover);
    var close = document.createElement('button');
    close.type = 'button'; close.className = 'feature-close'; close.textContent = 'Свернуть ↑';
    it.appendChild(close);
    cover.addEventListener('click', function () {
      it.classList.add('is-open');
      it.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
    close.addEventListener('click', function () {
      it.classList.remove('is-open');
      it.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  });
})();

// Телефон: журнал заявок рисуется в ширину компьютерной версии и уменьшается под экран


// Телефон: нижняя панель связи прячется на первом экране и при прокрутке вниз, возвращается при прокрутке вверх
(function () {
  var bar = document.querySelector('.m-contact'); if (!bar) return;
  var mq = window.matchMedia('(max-width: 620px)'), last = window.pageYOffset, ticking = false;
  function upd() {
    ticking = false;
    var y = window.pageYOffset, nearEnd = y + innerHeight >= document.documentElement.scrollHeight - 80;
    if (!mq.matches) { bar.classList.remove('is-hidden'); last = y; return; }
    if (y < innerHeight * 0.8) bar.classList.add('is-hidden');
    else if (y < last - 4 || nearEnd) bar.classList.remove('is-hidden');
    else if (y > last + 4) bar.classList.add('is-hidden');
    last = y;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  mq.addEventListener('change', upd); upd();
})();
