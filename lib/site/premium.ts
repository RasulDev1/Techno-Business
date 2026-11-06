// Премиум-режим (включён всегда): тёмная тема, звуки интерфейса, свой курсор, фон со сферами и сетью частиц,
// появление заголовка по словам, отсчёт цифр, магнитные кнопки, параллакс макетов и скелетоны при смене вкладки.
// Панель кнопок (звук, тема) и сферы фона уже есть в разметке: components/PremiumLayers.tsx
import { FINE_POINTER, closest, isPremium, load, media, prefersReducedMotion, store } from "./dom";

const SEL_CLICK = ".btn, .top-link, .type-tabs button, .card-link, .go, .card-toggle, .results-list li, .stamp, .premium-toggle, .pm-opt";
// На синих фонах курсор и подсказка светлые
const BLUE = ".topbar, .site-foot, .stamp.st-done, .type-tabs button[aria-selected='true'], .m-contact a:first-child";
// К этим элементам кольцо курсора «прилипает»
const STICK = ".btn, .top-link, .type-tabs button, .stamp, .premium-toggle, .pm-opt";
// Подсказка у курсора: первая подходящая область задаёт текст
const BADGES: [selector: string, text: string][] = [
  [".card.is-open .card-toggle", "Свернуть"], [".card-toggle", "Раскрыть"], [".res-layer li", "Вернуть"], [".results-list li", "Увеличить"],
  [".stamp", "Сменить статус"], [".shot", "Демо"], [".btn, .hero-down", "Смотреть"], [".top-link, .type-tabs button", "Выбрать"],
  [".foot-contacts a, .top-contacts a, .cta-btn", "Написать"], [".card-link, .go", "Открыть"], [".ledger", "Живая лента"], [".metric", "Цифры"],
];

const ease = (p: number) => 1 - Math.pow(2, -10 * p); // быстрый старт, очень мягкое замедление

export function initPremium() {
  const root = document.documentElement;
  const reduce = prefersReducedMotion();
  const fine = media(FINE_POINTER).matches;
  const raf: Record<string, number> = {};
  const title = document.querySelector<HTMLElement>(".hero h1");
  const soundBtn = document.querySelector<HTMLElement>(".pm-dock .pm-sound");
  const themeBtn = document.querySelector<HTMLElement>(".pm-dock .pm-theme");

  // ---------- Заголовок: слова вырастают снизу вверх с размытием ----------
  // Разбивка по словам уже в HTML (components/home/Hero.tsx), анимация на CSS идёт с первой отрисовки.
  // При «уменьшить движение» возвращаем обычный текст, как было.
  function revealTitle() {
    if (!title) return;
    const split = title.querySelector(".tw");
    if (reduce) {
      const text = title.getAttribute("aria-label");
      if (split && text) { title.textContent = text; title.removeAttribute("aria-label"); }
      return;
    }
    if (split) return;
    const text = (title.textContent || "").trim();
    title.setAttribute("aria-label", text);
    title.innerHTML = text.split(/\s+/).map((w, i) => '<span class="tw" aria-hidden="true"><span class="twi" style="--i:' + i + '">' + w + "</span></span>").join(" ");
  }

  // ---------- Цифры ----------
  // Пока цифра считается, её ширина зафиксирована по итоговому значению: соседний текст не прыгает и не переносится
  // (раньше на телефоне блоки под цифрами дёргались вверх-вниз на строку, это сдвиг раскладки CLS)
  function lockW(el: HTMLElement, text: string) {
    const prev = el.textContent;
    el.textContent = text;
    const w = el.getBoundingClientRect().width;
    el.textContent = prev;
    el.style.display = "inline-block"; el.style.width = w + "px"; el.style.whiteSpace = "nowrap"; el.style.flex = "none";
  }
  function unlockW(el: HTMLElement) { el.style.display = ""; el.style.width = ""; el.style.whiteSpace = ""; el.style.flex = ""; }

  // Проценты и полоски растут строго вместе
  function syncMetrics() {
    document.querySelectorAll<HTMLElement>(".hero-metrics .metric").forEach((m, idx) => {
      const b = m.querySelector<HTMLElement>("b[data-to]"), bar = m.querySelector<HTMLElement>(".metric-bar i");
      if (!b || !bar) return;
      const to = +b.dataset.to!, sign = b.dataset.sign!, cs = getComputedStyle(bar);
      const from = parseFloat(cs.getPropertyValue("--from")), target = parseFloat(cs.getPropertyValue("--to"));
      cancelAnimationFrame(raf["m" + idx]);
      if (reduce) return;
      lockW(b, sign + to + "%");
      bar.style.animation = "none"; bar.style.width = from + "%"; b.textContent = sign + "0%";
      const t0 = performance.now() + idx * 160, dur = 2000;
      const tick = (now: number) => {
        const p = Math.min(1, Math.max(0, (now - t0) / dur)), e = ease(p);
        b.textContent = sign + Math.round(to * e) + "%";
        bar.style.width = from + (target - from) * e + "%";
        if (p < 1) raf["m" + idx] = requestAnimationFrame(tick);
        else unlockW(b);
      };
      tick(t0);
    });
    // «До 70%» в преимуществах: цифра и тонкая шкала под ней растут вместе, когда карточка видна
    document.querySelectorAll<HTMLElement>(".results-list li").forEach((li) => {
      const fig = li.querySelector<HTMLElement>(".fig");
      if (!fig || !/^До\s*\d+%/.test((fig.textContent || "").trim())) return;
      const h = fig.parentElement!, to = parseInt((fig.textContent || "").replace(/\D/g, ""), 10);
      let track = li.querySelector<HTMLElement>(".pm-track");
      if (!track) {
        track = document.createElement("div"); track.className = "pm-track"; track.innerHTML = "<i></i>";
        h.insertAdjacentElement("afterend", track);
      }
      const fill = track.firstChild as HTMLElement, orig = fig.dataset.orig || (fig.dataset.orig = fig.textContent || "");
      cancelAnimationFrame(raf.fig);
      if (reduce) { fill.style.width = to + "%"; return; }
      lockW(fig, orig);
      fill.style.width = "0%"; fig.textContent = "До 0%";
      function run() {
        const t0 = performance.now(), dur = 2000;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur), e = ease(p);
          fig!.textContent = "До " + Math.round(to * e) + "%"; fill.style.width = to * e + "%";
          if (p < 1) raf.fig = requestAnimationFrame(tick);
          else unlockW(fig!);
        };
        tick(t0);
      }
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { io.disconnect(); run(); } }, { threshold: 0.5 });
        io.observe(li);
      } else run();
    });
  }

  // ---------- Магнитные кнопки ----------
  let magnets: HTMLElement[] = [];
  const magnetTargets = () => Array.from(document.querySelectorAll<HTMLElement>(".hero-down, .top-link, .hero .btn"));
  window.addEventListener("pointermove", (e) => {
    if (!isPremium() || reduce || !fine) return;
    magnets.forEach((el) => {
      const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy, near = Math.max(r.width, r.height) / 2 + 70;
      if (Math.hypot(dx, dy) < near) {
        const cl = (v: number, m: number) => Math.max(-m, Math.min(m, v));
        el.style.transform = "translate(" + cl(dx * 0.18, 9).toFixed(1) + "px," + cl(dy * 0.25, 7).toFixed(1) + "px)";
        el.classList.add("is-magnet");
      } else if (el.classList.contains("is-magnet")) { el.style.transform = ""; el.classList.remove("is-magnet"); }
    });
  }, { passive: true });

  // ---------- Параллакс макетов в карточках ----------
  let ticking = false;
  function parallax() {
    ticking = false;
    const on = isPremium() && !reduce;
    document.querySelectorAll<HTMLElement>(".shot img, .shot .cm").forEach((img) => {
      if (!on) { img.style.removeProperty("--py"); return; }
      const r = img.parentElement!.getBoundingClientRect(), k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.setProperty("--py", Math.max(-1, Math.min(1, k)) * -6 + "px");
    });
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });

  // ---------- Фон: световые сферы (CSS), тонкая сетка с узлами и сеть частиц (Canvas) ----------
  let cv: HTMLCanvasElement | null = null, ctx2: CanvasRenderingContext2D | null = null, bgRaf = 0, lastT = 0, W = 0, H = 0, mx = -9999, my = -9999, DPR = 1;
  const pts: { x: number; y: number; vx: number; vy: number }[] = [];
  const GRID = 56, NODE_R = 100;
  function bgSize() {
    DPR = Math.min(1.5, window.devicePixelRatio || 1); W = innerWidth; H = innerHeight;
    cv!.width = W * DPR; cv!.height = H * DPR; ctx2!.setTransform(DPR, 0, 0, DPR, 0, 0);
    const n = Math.round(Math.min(46, Math.max(16, (W * H) / 32000)));
    while (pts.length < n) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22 });
    pts.length = n;
  }
  function bgDraw(t: number) {
    bgRaf = 0;
    if (!cv || !ctx2) return;
    if (!reduce && !document.hidden) bgRaf = requestAnimationFrame(bgDraw);
    if (t - lastT < 32) return; // примерно 30 кадров в секунду
    lastT = t;
    const c = ctx2;
    c.clearRect(0, 0, W, H);
    // Сетка 4% и узлы, которые у курсора подсвечиваются и чуть притягиваются
    c.lineWidth = 1; c.strokeStyle = "rgba(37,99,235,.045)"; c.beginPath();
    for (let x = 0; x <= W; x += GRID) { c.moveTo(x + 0.5, 0); c.lineTo(x + 0.5, H); }
    for (let y = 0; y <= H; y += GRID) { c.moveTo(0, y + 0.5); c.lineTo(W, y + 0.5); }
    c.stroke();
    for (let x = 0; x <= W; x += GRID) {
      for (let y = 0; y <= H; y += GRID) {
        const dx = mx - x, dy = my - y, d = Math.sqrt(dx * dx + dy * dy), k = d < NODE_R ? 1 - d / NODE_R : 0, e = k * k * (3 - 2 * k);
        const px = x + dx * e * 0.16, py = y + dy * e * 0.16;
        c.beginPath(); c.arc(px, py, 1.2 + e * 2.2, 0, 6.2832);
        c.fillStyle = e > 0 ? "rgba(37,99,235," + (0.12 + e * 0.7).toFixed(2) + ")" : "rgba(37,99,235,.12)";
        c.fill();
      }
    }
    // Частицы: редкие точки, которые сближаясь соединяются тонкими линиями, курсор мягко их отталкивает и тоже связывается
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      if (!reduce) {
        a.x += a.vx; a.y += a.vy;
        if (a.x < -20 || a.x > W + 20) a.vx *= -1;
        if (a.y < -20 || a.y > H + 20) a.vy *= -1;
        const mdx = a.x - mx, mdy = a.y - my, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 120 && md > 1) { a.x += (mdx / md) * 0.5; a.y += (mdy / md) * 0.5; }
      }
      for (let q = i + 1; q < pts.length; q++) {
        const b = pts[q], ddx = a.x - b.x, ddy = a.y - b.y, dd = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dd < 150) { c.strokeStyle = "rgba(37,99,235," + ((1 - dd / 150) * 0.22).toFixed(3) + ")"; c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke(); }
      }
      const cd = Math.hypot(a.x - mx, a.y - my);
      if (cd < 160) { c.strokeStyle = "rgba(37,99,235," + ((1 - cd / 160) * 0.35).toFixed(3) + ")"; c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(mx, my); c.stroke(); }
      c.beginPath(); c.arc(a.x, a.y, 1.8, 0, 6.2832); c.fillStyle = "rgba(37,99,235,.35)"; c.fill();
    }
  }
  function startBg() {
    if (cv) return;
    if (!document.querySelector(".pm-orbs")) {
      const orbs = document.createElement("div"); orbs.className = "pm-orbs"; orbs.setAttribute("aria-hidden", "true");
      orbs.innerHTML = "<i></i><i></i><i></i>"; document.body.appendChild(orbs);
    }
    cv = document.createElement("canvas"); cv.className = "pm-net"; cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv); ctx2 = cv.getContext("2d"); bgSize();
    window.addEventListener("resize", bgSize);
    document.addEventListener("visibilitychange", () => { if (cv && !bgRaf && !document.hidden) bgRaf = requestAnimationFrame(bgDraw); });
    if (fine) {
      window.addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
      document.addEventListener("pointerleave", () => { mx = my = -9999; });
    }
    bgRaf = requestAnimationFrame(bgDraw);
  }

  // ---------- Звуки: короткие приглушённые «стеклянные» щелчки, синтезируются на лету ----------
  let audio: AudioContext | null = null, soundOn = false, lastTick = 0, lastHover: Element | null = null;
  function ac() {
    if (!audio) {
      const C = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (C) audio = new C();
    }
    if (audio && audio.state === "suspended") audio.resume();
    return audio;
  }
  function blip(freq: number, dur: number, type?: OscillatorType, vol?: number, slide?: number | null, delay?: number) {
    if (!soundOn) return;
    const a = ac();
    if (!a) return;
    const t = a.currentTime + (delay || 0), o = a.createOscillator(), g = a.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.04, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.03);
  }
  const sfx = {
    hover: () => blip(2300, 0.05, "sine", 0.014, 2900),
    click: () => blip(880, 0.08, "triangle", 0.045, 520),
    status: () => { blip(660, 0.1, "sine", 0.05); blip(990, 0.14, "sine", 0.045, null, 0.07); },
    toggle: () => { blip(520, 0.07, "triangle", 0.04); blip(780, 0.1, "triangle", 0.04, null, 0.06); },
  };
  document.addEventListener("pointerover", (e) => {
    if (!soundOn || !isPremium() || !(e.target instanceof Element)) return;
    const el = e.target.closest(SEL_CLICK), now = performance.now();
    if (el && el !== lastHover && now - lastTick > 70) { lastTick = now; sfx.hover(); }
    lastHover = el;
  }, true);
  document.addEventListener("click", (e) => {
    if (!soundOn || !isPremium() || !(e.target instanceof Element)) return;
    if (e.target.closest(".stamp")) sfx.status();
    else if (e.target.closest(SEL_CLICK) && !e.target.closest(".pm-sound")) sfx.click();
  }, true);
  function setSound(on: boolean, silent?: boolean) {
    soundOn = on;
    soundBtn?.setAttribute("aria-pressed", String(on));
    soundBtn?.setAttribute("aria-label", on ? "Выключить звуки" : "Включить звуки");
    if (on) { ac(); if (!silent) sfx.toggle(); }
    store("premium-sound", on ? "1" : "0");
  }
  soundBtn?.addEventListener("click", () => setSound(!soundOn));

  // ---------- Тёмная тема: глубокие графитовые и тёмно-синие тона, свечение на фоне ----------
  const isDark = () => root.classList.contains("pm-dark");
  function setTheme(dark: boolean, anim: boolean) {
    if (anim && !reduce) { root.classList.add("pm-theme-anim"); window.setTimeout(() => root.classList.remove("pm-theme-anim"), 900); }
    root.classList.toggle("pm-dark", dark);
    themeBtn?.setAttribute("aria-pressed", String(dark));
    themeBtn?.setAttribute("aria-label", dark ? "Светлая тема" : "Тёмная тема");
  }
  themeBtn?.addEventListener("click", () => { const d = !isDark(); setTheme(d, true); store("premium-theme", d ? "dark" : "light"); });

  // ---------- Свой курсор: стрелка, кольцо у кнопок и подсказка, что произойдёт по нажатию ----------
  let curBox: HTMLElement | null = null, curRing!: HTMLElement, curDot!: HTMLElement, curArrow!: SVGSVGElement, curBadge!: HTMLElement;
  let cX = -200, cY = -200, rX = -200, rY = -200, rW = 24, rH = 24, curRaf = 0, curMode = "", curTone = "", badgeText = "";
  function regionText(tg: Element | null) {
    for (const [sel, text] of BADGES) if (tg && tg.closest(sel)) return text;
    return "";
  }
  function curMove(e: PointerEvent) {
    cX = e.clientX; cY = e.clientY;
    curBox!.style.opacity = "1";
    const tg = e.target instanceof Element ? e.target : null;
    const t = tg ? tg.closest(STICK + ", .shot, .card, a, button") : null;
    const mode = t && t.matches(STICK) ? "stick" : t && t.closest(".shot") ? "label" : t ? "link" : "";
    const tone = tg && tg.closest(BLUE) ? "light" : "";
    if (tone !== curTone) { curTone = tone; curBox!.setAttribute("data-tone", tone); }
    if (mode !== curMode) { curMode = mode; curBox!.setAttribute("data-mode", mode); }
    const txt = regionText(tg);
    if (txt !== badgeText) {
      badgeText = txt;
      if (txt) curBadge.textContent = txt;
      curBadge.classList.toggle("is-on", !!txt);
      curBox!.setAttribute("data-badge", txt ? "on" : "");
    }
    const bx = Math.min(cX + 14, innerWidth - curBadge.offsetWidth - 8), by = Math.min(cY + 20, innerHeight - 34);
    curBadge.style.transform = "translate(" + bx.toFixed(0) + "px," + by.toFixed(0) + "px)";
    if (!curRaf) curRaf = requestAnimationFrame(curFrame);
  }
  function curFrame() {
    curRaf = 0;
    if (!curBox) return;
    const tx = cX, ty = cY, tw = 24, th = 24, k = reduce ? 1 : 0.2;
    rX += (tx - rX) * k; rY += (ty - rY) * k; rW += (tw - rW) * 0.22; rH += (th - rH) * 0.22;
    const p = "translate(" + cX + "px," + cY + "px)";
    curDot.style.transform = p; curArrow.style.transform = p;
    curRing.style.transform = "translate(" + rX.toFixed(1) + "px," + rY.toFixed(1) + "px)";
    curRing.style.width = rW.toFixed(1) + "px"; curRing.style.height = rH.toFixed(1) + "px";
    if (Math.abs(tx - rX) + Math.abs(ty - rY) + Math.abs(tw - rW) + Math.abs(th - rH) > 0.4) curRaf = requestAnimationFrame(curFrame);
  }
  function startCursor() {
    if (!fine || curBox) return;
    curBox = document.createElement("div"); curBox.className = "pm-cursor"; curBox.setAttribute("aria-hidden", "true");
    curBox.innerHTML = '<i class="pm-dot"></i><i class="pm-ring"><span></span></i><svg class="pm-arrow" width="16" height="22" viewBox="-1 -1 16 22"><path d="M0 0 L0 17 L4.4 13 L7.4 19.6 L10.2 18.4 L7.2 11.9 L12.8 11.9 Z" fill="#111827" stroke="#fff" stroke-width="1" stroke-linejoin="round"/></svg><div class="pm-badge"></div>';
    document.body.appendChild(curBox);
    curDot = curBox.querySelector<HTMLElement>(".pm-dot")!; curRing = curBox.querySelector<HTMLElement>(".pm-ring")!;
    curArrow = curBox.querySelector<SVGSVGElement>(".pm-arrow")!; curBadge = curBox.querySelector<HTMLElement>(".pm-badge")!;
    curBox.setAttribute("data-style", "arrow");
    curBadge.classList.remove("is-on"); curBox.setAttribute("data-badge", ""); curBox.setAttribute("data-mode", ""); (curRing.firstChild as HTMLElement).textContent = "";
    window.addEventListener("pointermove", curMove, { passive: true });
    document.addEventListener("pointerleave", () => { if (curBox) curBox.style.opacity = "0"; });
  }

  // ---------- Скелетоны вместо спиннеров: пульсирующие плашки по форме будущего содержимого ----------
  function skeleton(host: Element | null, kind: "rows" | "card", ms: number) {
    if (!host) return;
    // прежний скелетон уходит, в том числе заготовка журнала из разметки (components/home/Hero.tsx)
    host.querySelector(":scope > .pm-skel")?.remove();
    if (reduce) { host.classList.remove("pm-skel-host"); return; }
    const sk = document.createElement("div"); sk.className = "pm-skel pm-skel-" + kind; sk.setAttribute("aria-hidden", "true");
    if (kind === "rows") {
      let rows = "";
      for (let i = 0; i < 6; i++) rows += '<div class="sk-row"><i class="sk-b" style="width:' + (38 + ((i * 7) % 20)) + '%"></i><i class="sk-b" style="width:46%"></i><span class="sk-user"><i class="sk-av"></i><i class="sk-b" style="width:' + (50 + ((i * 11) % 30)) + '%"></i></span><i class="sk-b" style="width:' + (55 + ((i * 13) % 35)) + '%"></i><i class="sk-b" style="width:62%"></i><i class="sk-pill"></i></div>';
      sk.innerHTML = rows;
    } else {
      sk.innerHTML = '<div class="sk-card"><i class="sk-img"></i><i class="sk-b" style="width:30%"></i><i class="sk-b sk-h" style="width:70%"></i><i class="sk-b" style="width:92%"></i><i class="sk-b" style="width:84%"></i><i class="sk-b" style="width:60%"></i></div>';
    }
    host.classList.add("pm-skel-host"); host.appendChild(sk);
    window.setTimeout(() => {
      sk.classList.add("is-out");
      window.setTimeout(() => { sk.remove(); if (!host.querySelector(":scope > .pm-skel")) host.classList.remove("pm-skel-host"); }, 500);
    }, ms);
  }
  document.addEventListener("click", (e) => {
    if (!isPremium()) return;
    const tab = closest(e.target, ".type-tabs button");
    if (tab && tab.getAttribute("aria-selected") !== "true") skeleton(document.querySelector(".grid"), "card", 650);
  }, true);

  // ---------- Включение ----------
  root.classList.add("premium");
  setTheme(load("premium-theme") === "dark", false);
  setSound(load("premium-sound") !== "0", true);
  startCursor();
  skeleton(document.querySelector(".ledger-body"), "rows", 900);
  startBg();
  magnets = magnetTargets();
  revealTitle();
  syncMetrics();
  // цифры готовы к отсчёту, кнопки показывают настоящий выбор: снимаем «ожидание» из app/boot.css
  root.classList.remove("pm-wait", "pm-mute");
  parallax();
}
