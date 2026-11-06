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
  document.body.appendChild(btn);

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

  function set(on) {
    root.classList.toggle("premium", on);
    btn.setAttribute("aria-pressed", String(on));
    btn.querySelector(".pt-text").textContent = on ? "Премиум включён" : "Премиум-версия";
    if (on) { startBg(); magnets = magnetTargets(); revealTitle(); syncMetrics(); }
    else { stopBg(); magnets.forEach(function (el) { el.style.transform = ""; el.classList.remove("is-magnet"); }); magnets = []; restoreTitle(); resetMetrics(); }
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
