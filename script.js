// Журнал заявок в hero: новые заявки появляются в таблице, менеджер Султан ведёт каждую до своего статуса.
(function () {
  const body = document.querySelector(".ledger-body");
  if (!body) return;
  const counter = document.getElementById("ledger-count");
  const word = document.getElementById("ledger-word");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isPremium = () => document.documentElement.classList.contains("premium");
  const VISIBLE = window.matchMedia("(max-width: 620px)").matches ? 1 : 6;

  // Примеры заявок: подписаны на странице как «Пример заполнения». Клиент, запрос, менеджер и статус собираются случайно
  const MEN = ["Магомед А.", "Игорь", "Аслан Т.", "Хасан", "Дмитрий", "Рустам", "Ахмед", "Тамерлан", "Сергей П.", "Заур", "Мурат К."];
  const WOMEN = ["Анна К.", "Залина", "Марина", "Мадина", "Амина Б.", "Ольга", "Фатима", "Елена В.", "Лейла", "Диана Т.", "Наталья"];
  // Заявка: текст и для кого она; "м" — мужские товары и услуги, "ж" — женские, "" — подходит всем
  const NEEDS = [
    ["Перфоратор на 2 суток", "м"], ["Футболка Airline, размер M", "м"], ["Смета на ремонт офиса", ""], ["Запись на консультацию", ""],
    ["Ветровка Storm Shell, 2 шт.", "м"], ["Бетономешалка на выходные", "м"], ["Курс по маникюру, оплата", "ж"], ["Шуруповёрт с доставкой", "м"],
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

  // Премиум-режим: нажатие на статус «перетекает» в следующий, плашка плавно меняет ширину и форму
  const NEXT = { new: "pay", pay: "done", done: "new", cancel: "new" };
  body.addEventListener("click", (e) => {
    const stamp = e.target.closest && e.target.closest(".stamp");
    if (!stamp || !isPremium() || reduce) return;
    const row = stamp.closest(".ledger-row"), from = row.dataset.st, to = NEXT[from] || "new";
    const w0 = stamp.getBoundingClientRect().width;
    stamp.style.transition = "none"; stamp.style.width = w0 + "px"; stamp.style.overflow = "hidden";
    stamp.className = "stamp is-down st-" + to;
    const [label, icon] = STATUS[to];
    stamp.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icon + "</svg>" + label;
    stamp.style.width = "auto"; const w1 = stamp.getBoundingClientRect().width; stamp.style.width = w0 + "px";
    void stamp.offsetWidth;
    stamp.style.transition = "width .6s cubic-bezier(.16,1,.3,1), background-color .6s, color .6s, border-radius .6s";
    stamp.style.width = w1 + "px"; stamp.style.borderRadius = "999px";
    setTimeout(() => { stamp.style.width = ""; stamp.style.overflow = ""; stamp.style.borderRadius = ""; stamp.style.transition = ""; }, 650);
    row.dataset.st = to;
    if (byStatus[from] > 0) byStatus[from]--;
    byStatus[to]++;
    if (statOut[from]) statOut[from].textContent = byStatus[from];
    if (statOut[to]) statOut[to].textContent = byStatus[to];
  });

  // Сразу показываем уже заполненную часть страницы, без анимации остаются все строки
  for (let i = 0; i < Math.max(1, reduce ? VISIBLE : VISIBLE - 2); i++) {
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
      await wait(isPremium() ? 3200 + Math.random() * 1800 : 900);
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
  if (window.matchMedia("(max-width: 620px)").matches) return; // на телефоне числа сразу итоговые
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
      if (label && !card.classList.contains('is-open')) label.textContent = mq.matches ? 'Раскрыть решение' : 'Подробнее';
    };
    setLabel();
    if (mq.addEventListener) mq.addEventListener('change', setLabel);
    var toggle = function (e) {
      if (!mq.matches) return;
      e.preventDefault();
      var open = card.classList.toggle('is-open');
      if (label) label.textContent = open ? 'Свернуть' : 'Раскрыть решение';
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
  if (items.length < 1) return;
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
      var v = it.querySelector('video'); if (v) v.pause();
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

// Видео: одновременно играет только одно
document.addEventListener('play', function (e) {
  if (!(e.target instanceof HTMLVideoElement)) return;
  document.querySelectorAll('.feature-media video').forEach(function (v) { if (v !== e.target) v.pause(); });
}, true);

// Телефон: «умные табы» — показана одна карточка, смена с плавным сдвигом
(function () {
  var tabs = document.querySelector('.type-tabs'), grid = document.querySelector('.grid');
  if (!tabs || !grid) return;
  var btns = tabs.querySelectorAll('button'), cards = grid.querySelectorAll('.card'), cur = 0;
  var mq = window.matchMedia('(max-width: 620px)');
  function apply() {
    grid.classList.toggle('has-tabs', mq.matches);
    cards.forEach(function (c, i) {
      c.classList.toggle('tab-on', mq.matches && i === cur);
      c.classList.toggle('tab-off', mq.matches && i !== cur);
      c.classList.toggle('from-right', i > cur);
    });
    btns.forEach(function (b, i) { b.classList.toggle('is-active', i === cur); b.setAttribute('aria-selected', i === cur ? 'true' : 'false'); });
  }
  btns.forEach(function (b, i) {
    b.addEventListener('click', function () {
      if (i === cur) return;
      cards.forEach(function (c) {
        if (!c.classList.contains('is-open')) return;
        c.classList.remove('is-open');
        var t = c.querySelector('.more-text'), m = c.querySelector('.more');
        if (t) t.textContent = 'Раскрыть решение';
        if (m) m.setAttribute('aria-expanded', 'false');
      });
      cur = i; apply();
    });
  });
  if (mq.addEventListener) mq.addEventListener('change', apply);
  apply();
})();


// Премиум-режим: включается кнопкой, обычный сайт остаётся как есть
(function () {
  var root = document.documentElement, KEY = "premium-mode";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var EASE = "cubic-bezier(.16, 1, .3, 1)";
  var raf = {}, title = document.querySelector(".hero h1"), titleHTML = title ? title.innerHTML : "";

  // Кнопка-переключатель
  var btn = document.createElement("button");
  btn.type = "button"; btn.className = "premium-toggle"; btn.setAttribute("aria-pressed", "false");
  btn.innerHTML = '<span class="pt-dot" aria-hidden="true"></span><span class="pt-text">Премиум-версия</span>';
  var dock = document.createElement("div"); dock.className = "pm-dock";
  var soundBtn = document.createElement("button"); soundBtn.type = "button"; soundBtn.className = "pm-opt pm-sound"; soundBtn.setAttribute("aria-pressed", "false"); soundBtn.setAttribute("aria-label", "Звуки интерфейса");
  soundBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path class="snd-on" d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.6 7.6 0 0 1 0 11"/><path class="snd-off" d="M16 9.5l5 5M21 9.5l-5 5"/></svg>';
  var themeBtn = document.createElement("button"); themeBtn.type = "button"; themeBtn.className = "pm-opt pm-theme"; themeBtn.setAttribute("aria-pressed", "false"); themeBtn.setAttribute("aria-label", "Тёмная тема");
  themeBtn.innerHTML = '<svg class="ic-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></svg><svg class="ic-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';
  dock.appendChild(btn); dock.appendChild(soundBtn); dock.appendChild(themeBtn); document.body.appendChild(dock);

  function ease(p) { return 1 - Math.pow(2, -10 * p); } // быстрый старт, очень мягкое замедление

  // Заголовок: слова вырастают снизу вверх с размытием
  function revealTitle() {
    if (!title || reduce) return;
    var words = title.textContent.trim().split(/\s+/);
    title.setAttribute("aria-label", title.textContent.trim());
    title.innerHTML = words.map(function (w, i) {
      return '<span class="tw" aria-hidden="true"><span class="twi" style="--i:' + i + '">' + w + "</span></span>";
    }).join(" ");
  }
  function restoreTitle() { if (title) { title.innerHTML = titleHTML; title.removeAttribute("aria-label"); } }

  // Проценты и полоски растут строго вместе
  function syncMetrics() {
    document.querySelectorAll(".hero-metrics .metric").forEach(function (m, idx) {
      var b = m.querySelector("b[data-to]"), bar = m.querySelector(".metric-bar i"); if (!b || !bar) return;
      var to = +b.dataset.to, sign = b.dataset.sign, cs = getComputedStyle(bar);
      var from = parseFloat(cs.getPropertyValue("--from")), target = parseFloat(cs.getPropertyValue("--to"));
      cancelAnimationFrame(raf["m" + idx]);
      if (reduce) return;
      bar.style.animation = "none"; bar.style.width = from + "%"; b.textContent = sign + "0%";
      var t0 = performance.now() + idx * 160, dur = 2000;
      (function tick(now) {
        var p = Math.min(1, Math.max(0, (now - t0) / dur)), e = ease(p);
        b.textContent = sign + Math.round(to * e) + "%";
        bar.style.width = (from + (target - from) * e) + "%";
        if (p < 1) raf["m" + idx] = requestAnimationFrame(tick);
      })(t0);
    });
    // «До 70%» в преимуществах: цифра и тонкая шкала под ней растут вместе
    document.querySelectorAll(".results-list li").forEach(function (li, idx) {
      var fig = li.querySelector(".fig"); if (!fig || !/^До\s*\d+%/.test(fig.textContent.trim())) return;
      var h = fig.parentElement, to = parseInt(fig.textContent.replace(/\D/g, ""), 10);
      var track = li.querySelector(".pm-track");
      if (!track) { track = document.createElement("div"); track.className = "pm-track"; track.innerHTML = "<i></i>"; h.insertAdjacentElement("afterend", track); }
      var fill = track.firstChild, orig = fig.dataset.orig || (fig.dataset.orig = fig.textContent);
      cancelAnimationFrame(raf.fig);
      if (reduce) { fill.style.width = to + "%"; return; }
      fill.style.width = "0%"; fig.textContent = "До 0%";
      function run() {
        var t0 = performance.now(), dur = 2000;
        (function tick(now) {
          var p = Math.min(1, (now - t0) / dur), e = ease(p);
          fig.textContent = "До " + Math.round(to * e) + "%"; fill.style.width = (to * e) + "%";
          if (p < 1) raf.fig = requestAnimationFrame(tick);
        })(t0);
      }
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); run(); } }, { threshold: 0.5 });
        io.observe(li);
      } else run();
    });
  }
  function resetMetrics() {
    document.querySelectorAll(".metric-bar i").forEach(function (bar) { bar.style.animation = ""; bar.style.width = ""; });
    document.querySelectorAll(".hero-metrics b[data-to]").forEach(function (b) { b.textContent = b.dataset.sign + b.dataset.to + "%"; });
    document.querySelectorAll(".results-list .pm-track").forEach(function (t) { t.remove(); });
    document.querySelectorAll(".results-list .fig[data-orig]").forEach(function (f) { f.textContent = f.dataset.orig; });
  }

  // Магнитные кнопки
  var magnets = [];
  function magnetTargets() { return Array.prototype.slice.call(document.querySelectorAll(".hero-down, .top-link, .hero .btn")); }
  function onMove(e) {
    if (!root.classList.contains("premium") || reduce || !fine) return;
    magnets.forEach(function (el) {
      var r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var dx = e.clientX - cx, dy = e.clientY - cy, near = Math.max(r.width, r.height) / 2 + 70;
      if (Math.hypot(dx, dy) < near) { var cl = function (v, m) { return Math.max(-m, Math.min(m, v)); };
        el.style.transform = "translate(" + cl(dx * 0.18, 9).toFixed(1) + "px," + cl(dy * 0.25, 7).toFixed(1) + "px)"; el.classList.add("is-magnet"); }
      else if (el.classList.contains("is-magnet")) { el.style.transform = ""; el.classList.remove("is-magnet"); }
    });
  }
  window.addEventListener("pointermove", onMove, { passive: true });

  // Параллакс скриншотов в карточках
  var ticking = false;
  function parallax() {
    ticking = false;
    var on = root.classList.contains("premium") && !reduce;
    document.querySelectorAll(".shot img").forEach(function (img) {
      if (!on) { img.style.removeProperty("--py"); return; }
      var r = img.parentElement.getBoundingClientRect(), k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.setProperty("--py", Math.max(-1, Math.min(1, k)) * -6 + "px");
    });
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });

  // Фон премиум-режима: световые сферы (CSS), тонкая сетка с узлами и сеть частиц (Canvas)
  var orbs = null, cv = null, ctx2 = null, bgRaf = 0, lastT = 0, pts = [], W = 0, H = 0, mx = -9999, my = -9999, DPR = 1;
  var GRID = 56, NODE_R = 100;
  function bgSize() {
    DPR = Math.min(1.5, window.devicePixelRatio || 1); W = innerWidth; H = innerHeight;
    cv.width = W * DPR; cv.height = H * DPR; ctx2.setTransform(DPR, 0, 0, DPR, 0, 0);
    var n = Math.round(Math.min(46, Math.max(16, W * H / 32000)));
    while (pts.length < n) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22 });
    pts.length = n;
  }
  function bgDraw(t) {
    bgRaf = 0;
    if (!cv) return;
    if (!reduce && !document.hidden) bgRaf = requestAnimationFrame(bgDraw);
    if (t - lastT < 32) return; // примерно 30 кадров в секунду
    lastT = t;
    ctx2.clearRect(0, 0, W, H);
    // Сетка 4% и узлы, которые у курсора подсвечиваются и чуть притягиваются
    ctx2.lineWidth = 1; ctx2.strokeStyle = "rgba(37,99,235,.045)"; ctx2.beginPath();
    for (var x = 0; x <= W; x += GRID) { ctx2.moveTo(x + .5, 0); ctx2.lineTo(x + .5, H); }
    for (var y = 0; y <= H; y += GRID) { ctx2.moveTo(0, y + .5); ctx2.lineTo(W, y + .5); }
    ctx2.stroke();
    for (x = 0; x <= W; x += GRID) {
      for (y = 0; y <= H; y += GRID) {
        var dx = mx - x, dy = my - y, d = Math.sqrt(dx * dx + dy * dy), k = d < NODE_R ? 1 - d / NODE_R : 0, e = k * k * (3 - 2 * k);
        var px = x + dx * e * .16, py = y + dy * e * .16;
        ctx2.beginPath(); ctx2.arc(px, py, 1.2 + e * 2.2, 0, 6.2832);
        ctx2.fillStyle = e > 0 ? "rgba(37,99,235," + (.12 + e * .7).toFixed(2) + ")" : "rgba(37,99,235,.12)";
        ctx2.fill();
      }
    }
    // Частицы: редкие точки, которые сближаясь соединяются тонкими линиями, курсор мягко их отталкивает и тоже связывается
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i];
      if (!reduce) {
        a.x += a.vx; a.y += a.vy;
        if (a.x < -20 || a.x > W + 20) a.vx *= -1;
        if (a.y < -20 || a.y > H + 20) a.vy *= -1;
        var mdx = a.x - mx, mdy = a.y - my, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 120 && md > 1) { a.x += mdx / md * .5; a.y += mdy / md * .5; }
      }
      for (var q = i + 1; q < pts.length; q++) {
        var b = pts[q], ddx = a.x - b.x, ddy = a.y - b.y, dd = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dd < 150) { ctx2.strokeStyle = "rgba(37,99,235," + ((1 - dd / 150) * .22).toFixed(3) + ")"; ctx2.beginPath(); ctx2.moveTo(a.x, a.y); ctx2.lineTo(b.x, b.y); ctx2.stroke(); }
      }
      var cd = Math.hypot(a.x - mx, a.y - my);
      if (cd < 160) { ctx2.strokeStyle = "rgba(37,99,235," + ((1 - cd / 160) * .35).toFixed(3) + ")"; ctx2.beginPath(); ctx2.moveTo(a.x, a.y); ctx2.lineTo(mx, my); ctx2.stroke(); }
      ctx2.beginPath(); ctx2.arc(a.x, a.y, 1.8, 0, 6.2832); ctx2.fillStyle = "rgba(37,99,235,.35)"; ctx2.fill();
    }
  }
  function onBgMove(e) { mx = e.clientX; my = e.clientY; }
  function onBgLeave() { mx = my = -9999; }
  function onVis() { if (cv && !bgRaf && !document.hidden) bgRaf = requestAnimationFrame(bgDraw); }
  function startBg() {
    if (cv) return;
    orbs = document.createElement("div"); orbs.className = "pm-orbs"; orbs.setAttribute("aria-hidden", "true");
    orbs.innerHTML = "<i></i><i></i><i></i>"; document.body.appendChild(orbs);
    cv = document.createElement("canvas"); cv.className = "pm-net"; cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv); ctx2 = cv.getContext("2d"); bgSize();
    window.addEventListener("resize", bgSize); document.addEventListener("visibilitychange", onVis);
    if (fine) { window.addEventListener("pointermove", onBgMove, { passive: true }); document.addEventListener("pointerleave", onBgLeave); }
    bgRaf = requestAnimationFrame(bgDraw);
  }
  function stopBg() {
    if (!cv) return;
    cancelAnimationFrame(bgRaf); bgRaf = 0;
    window.removeEventListener("resize", bgSize); document.removeEventListener("visibilitychange", onVis);
    window.removeEventListener("pointermove", onBgMove); document.removeEventListener("pointerleave", onBgLeave);
    cv.remove(); orbs.remove(); cv = orbs = ctx2 = null; pts = [];
  }

  var SEL_CLICK = ".btn, .top-link, .type-tabs button, .card, .stamp, .premium-toggle, .pm-opt";
  function isDark() { return root.classList.contains("pm-dark"); }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  // Звуки: короткие приглушённые «стеклянные» щелчки, синтезируются на лету, по умолчанию выключены
  var audio = null, soundOn = false, lastTick = 0, lastHover = null;
  function ac() {
    if (!audio) { var C = window.AudioContext || window.webkitAudioContext; if (C) audio = new C(); }
    if (audio && audio.state === "suspended") audio.resume();
    return audio;
  }
  function blip(freq, dur, type, vol, slide, delay) {
    if (!soundOn) return;
    var a = ac(); if (!a) return;
    var t = a.currentTime + (delay || 0), o = a.createOscillator(), g = a.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.04, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.03);
  }
  var sfx = {
    hover: function () { blip(2300, 0.05, "sine", 0.014, 2900); },
    click: function () { blip(880, 0.08, "triangle", 0.045, 520); },
    status: function () { blip(660, 0.1, "sine", 0.05); blip(990, 0.14, "sine", 0.045, null, 0.07); },
    toggle: function () { blip(520, 0.07, "triangle", 0.04); blip(780, 0.1, "triangle", 0.04, null, 0.06); }
  };
  document.addEventListener("pointerover", function (e) {
    if (!soundOn || !root.classList.contains("premium") || !e.target.closest) return;
    var el = e.target.closest(SEL_CLICK), now = performance.now();
    if (el && el !== lastHover && now - lastTick > 70) { lastTick = now; sfx.hover(); }
    lastHover = el;
  }, true);
  document.addEventListener("click", function (e) {
    if (!soundOn || !root.classList.contains("premium") || !e.target.closest) return;
    if (e.target.closest(".stamp")) sfx.status();
    else if (e.target.closest(SEL_CLICK) && !e.target.closest(".pm-sound")) sfx.click();
  }, true);
  function setSound(on, silent) {
    soundOn = on; soundBtn.setAttribute("aria-pressed", String(on));
    soundBtn.setAttribute("aria-label", on ? "Выключить звуки" : "Включить звуки");
    if (on) { ac(); if (!silent) sfx.toggle(); }
    store("premium-sound", on ? "1" : "0");
  }
  soundBtn.addEventListener("click", function () { setSound(!soundOn); });

  // Тёмная тема: глубокие графитовые и тёмно-синие тона, свечение на фоне
  function setTheme(dark, anim) {
    if (anim && !reduce) { root.classList.add("pm-theme-anim"); setTimeout(function () { root.classList.remove("pm-theme-anim"); }, 900); }
    root.classList.toggle("pm-dark", dark);
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.setAttribute("aria-label", dark ? "Светлая тема" : "Тёмная тема");
  }
  themeBtn.addEventListener("click", function () { var d = !isDark(); setTheme(d, true); store("premium-theme", d ? "dark" : "light"); });
  function initTheme() {
    var saved = load("premium-theme");
    setTheme(saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches, false);
  }

  // Свой курсор: точка и отстающее кольцо; у кнопок кольцо «прилипает» к их границам, над скриншотами становится плашкой «Демо»
  var curBox = null, curDot, curRing, curLabel, cX = -200, cY = -200, rX = -200, rY = -200, rW = 24, rH = 24, curRaf = 0, curMode = "", curTarget = null;
  var curTone = "", BLUE = ".topbar, .site-foot, .stamp.st-done, .type-tabs button[aria-selected='true'], .m-contact a:first-child";
  var STICK = ".btn, .top-link, .type-tabs button, .stamp, .premium-toggle, .pm-opt";
  function curMove(e) {
    cX = e.clientX; cY = e.clientY;
    curBox.style.opacity = "1";
    var t = e.target.closest ? e.target.closest(STICK + ", .shot, .card, a, button") : null, mode = "";
    if (t && t.matches(STICK)) mode = "stick";
    else if (t && t.closest(".shot")) mode = "label";
    else if (t) mode = "link";
    curTarget = mode === "stick" ? t : null;
    var tone = e.target.closest && e.target.closest(BLUE) ? "light" : "";
    if (tone !== curTone) { curTone = tone; curBox.setAttribute("data-tone", tone); }
    if (mode !== curMode) {
      curMode = mode; curBox.setAttribute("data-mode", mode);
      curLabel.textContent = mode === "label" ? "Демо" : "";
    }
    if (!curRaf) curRaf = requestAnimationFrame(curFrame);
  }
  function curFrame() {
    curRaf = 0;
    if (!curBox) return;
    var tx = cX, ty = cY, tw = 24, th = 24, k = reduce ? 1 : 0.2;
    if (curMode === "stick" && curTarget) { var r = curTarget.getBoundingClientRect(); tx = r.left + r.width / 2; ty = r.top + r.height / 2; tw = r.width + 10; th = r.height + 10; k = reduce ? 1 : 0.28; }
    else if (curMode === "label") { tw = 62; th = 62; }
    else if (curMode === "link") { tw = 42; th = 42; }
    rX += (tx - rX) * k; rY += (ty - rY) * k; rW += (tw - rW) * 0.22; rH += (th - rH) * 0.22;
    curDot.style.transform = "translate(" + cX + "px," + cY + "px)";
    curRing.style.transform = "translate(" + rX.toFixed(1) + "px," + rY.toFixed(1) + "px)";
    curRing.style.width = rW.toFixed(1) + "px"; curRing.style.height = rH.toFixed(1) + "px";
    if (Math.abs(tx - rX) + Math.abs(ty - rY) + Math.abs(tw - rW) + Math.abs(th - rH) > 0.4) curRaf = requestAnimationFrame(curFrame);
  }
  function curLeave() { if (curBox) curBox.style.opacity = "0"; }
  function startCursor() {
    if (!fine || curBox) return;
    curBox = document.createElement("div"); curBox.className = "pm-cursor"; curBox.setAttribute("aria-hidden", "true");
    curBox.innerHTML = '<i class="pm-dot"></i><i class="pm-ring"><span></span></i>'; document.body.appendChild(curBox);
    curDot = curBox.querySelector(".pm-dot"); curRing = curBox.querySelector(".pm-ring"); curLabel = curRing.firstChild;
    root.classList.add("pm-cursor-on");
    window.addEventListener("pointermove", curMove, { passive: true }); document.addEventListener("pointerleave", curLeave);
  }
  function stopCursor() {
    if (!curBox) return;
    window.removeEventListener("pointermove", curMove); document.removeEventListener("pointerleave", curLeave);
    cancelAnimationFrame(curRaf); curRaf = 0; curBox.remove(); curBox = null; curMode = ""; curTone = ""; root.classList.remove("pm-cursor-on");
  }

  // Скелетоны вместо спиннеров: пульсирующие плашки по форме будущего содержимого
  function skeleton(host, kind, ms) {
    if (!host || reduce) return;
    var old = host.querySelector(":scope > .pm-skel"); if (old) old.remove();
    var sk = document.createElement("div"); sk.className = "pm-skel pm-skel-" + kind; sk.setAttribute("aria-hidden", "true");
    if (kind === "rows") {
      var rows = ""; for (var i = 0; i < 6; i++) rows += '<div class="sk-row"><i class="sk-b" style="width:' + (38 + (i * 7) % 20) + '%"></i><i class="sk-b" style="width:46%"></i><span class="sk-user"><i class="sk-av"></i><i class="sk-b" style="width:' + (50 + (i * 11) % 30) + '%"></i></span><i class="sk-b" style="width:' + (55 + (i * 13) % 35) + '%"></i><i class="sk-b" style="width:62%"></i><i class="sk-pill"></i></div>';
      sk.innerHTML = rows;
    } else {
      sk.innerHTML = '<div class="sk-card"><i class="sk-img"></i><i class="sk-b" style="width:30%"></i><i class="sk-b sk-h" style="width:70%"></i><i class="sk-b" style="width:92%"></i><i class="sk-b" style="width:84%"></i><i class="sk-b" style="width:60%"></i></div>';
    }
    host.classList.add("pm-skel-host"); host.appendChild(sk);
    setTimeout(function () { sk.classList.add("is-out"); setTimeout(function () { sk.remove(); if (!host.querySelector(":scope > .pm-skel")) host.classList.remove("pm-skel-host"); }, 500); }, ms);
  }
  document.addEventListener("click", function (e) {
    if (!root.classList.contains("premium") || !e.target.closest) return;
    var tab = e.target.closest(".type-tabs button");
    if (tab && tab.getAttribute("aria-selected") !== "true") skeleton(document.querySelector(".grid"), "card", 650);
  }, true);

  // Живой график выручки в мокапе CRM: линии медленно колеблются, как будто идут продажи
  var chart = null, chartRaf = 0;
  var CH = { x: .2828, y: .6375, w: .4281, h: .225 }; // область графика на скриншоте crm.jpg (доли картинки)
  var Y_PTS = [.5, .55, .47, .5, 0, 0, .58], D_PTS = [.6, 1, .02, .62, .56, .74, .38];
  function curveThrough(ctx, pts, w, h) {
    var xs = pts.map(function (_, i) { return i / (pts.length - 1) * w; }), ys = pts.map(function (v) { return h - 6 - v * (h - 12); });
    ctx.beginPath(); ctx.moveTo(xs[0], ys[0]);
    for (var i = 0; i < pts.length - 1; i++) { var cx = (xs[i] + xs[i + 1]) / 2; ctx.bezierCurveTo(cx, ys[i], cx, ys[i + 1], xs[i + 1], ys[i + 1]); }
    ctx.stroke();
  }
  function chartFrame(t) {
    chartRaf = 0;
    if (!chart) return;
    var cv = chart.cv, ctx = chart.ctx, w = cv.clientWidth, h = cv.clientHeight;
    if (w < 20) { chartRaf = requestAnimationFrame(chartFrame); return; }
    if (cv.width !== Math.round(w * chart.dpr)) { cv.width = Math.round(w * chart.dpr); cv.height = Math.round(h * chart.dpr); }
    ctx.setTransform(chart.dpr, 0, 0, chart.dpr, 0, 0);
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#eef0f3"; ctx.lineWidth = 1;
    [.0, .22, .45, .68, .91].forEach(function (g) { var y = Math.round(6 + g * (h - 12)) + .5; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); });
    var s = t / 1000, wob = function (pts, ph, amp) { return pts.map(function (v, i) { var n = v + Math.sin(s * .8 + i * 1.7 + ph) * amp; return Math.max(0, Math.min(1, n)); }); };
    ctx.lineWidth = 2.2; ctx.setLineDash([6, 5]); ctx.strokeStyle = "#10243d"; curveThrough(ctx, wob(D_PTS, 1.2, .045), w, h);
    ctx.setLineDash([]); ctx.strokeStyle = "#f2c200"; ctx.lineWidth = 2.6; curveThrough(ctx, wob(Y_PTS, 0, .05), w, h);
    if (!reduce) chartRaf = requestAnimationFrame(chartFrame);
  }
  function startChart() {
    if (chart) return;
    var img = document.querySelector('.shot img[src*="crm.jpg"]'); if (!img) return;
    var shot = img.parentElement, cv = document.createElement("canvas"); cv.className = "pm-chart"; cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "left:" + CH.x * 100 + "%;top:" + CH.y * 100 + "%;width:" + CH.w * 100 + "%;height:" + CH.h * 100 + "%";
    shot.appendChild(cv); chart = { cv: cv, ctx: cv.getContext("2d"), dpr: Math.min(2, window.devicePixelRatio || 1) };
    chartRaf = requestAnimationFrame(chartFrame);
  }
  function stopChart() { if (!chart) return; cancelAnimationFrame(chartRaf); chartRaf = 0; chart.cv.remove(); chart = null; }

  function set(on) {
    root.classList.toggle("premium", on);
    btn.setAttribute("aria-pressed", String(on));
    btn.querySelector(".pt-text").textContent = on ? "Премиум включён" : "Премиум-версия";
    if (on) { initTheme(); setSound(load("premium-sound") === "1", true); startCursor(); startChart(); skeleton(document.querySelector(".ledger-body"), "rows", 900); startBg(); magnets = magnetTargets(); revealTitle(); syncMetrics(); }
    else { stopBg(); stopCursor(); stopChart(); root.classList.remove("pm-dark"); soundOn = false; magnets.forEach(function (el) { el.style.transform = ""; el.classList.remove("is-magnet"); }); magnets = []; restoreTitle(); resetMetrics(); }
    parallax();
  }
  btn.addEventListener("click", function () {
    var on = !root.classList.contains("premium");
    set(on);
    try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {}
  });
  var start = false;
  try { start = localStorage.getItem(KEY) === "1"; } catch (e) {}
  if (location.hash === "#premium") start = true;
  if (start) set(true);
})();
