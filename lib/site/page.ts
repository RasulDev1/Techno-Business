// Небольшие оживления страниц: счётчики, макет формы, видео, нижняя панель связи, вкладки и раскрытие карточек
import { PHONE, all, media, prefersReducedMotion } from "./dom";

/** Счётчики метрик под заголовком (на телефоне числа сразу итоговые) */
export function initHeroCounters() {
  if (prefersReducedMotion()) return;
  if (media(PHONE).matches) return;
  all(".hero-metrics b[data-to]").forEach((el) => {
    const to = +el.dataset.to!, sign = el.dataset.sign!, t0 = performance.now() + 350, dur = 1600;
    function tick(now: number) {
      const p = Math.min(1, Math.max(0, (now - t0) / dur));
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      el.textContent = sign + Math.round(to * e) + "%";
      if (p < 1) requestAnimationFrame(tick);
    }
    el.textContent = sign + "0%";
    requestAnimationFrame(tick);
  });
}

/** Макет одностраничника: курсор ходит по полям формы и нажимает «Отправить» */
export function initMockForm() {
  const mock = document.querySelector<HTMLElement>(".mock");
  if (!mock) return;
  const start = mock.querySelector<HTMLElement>(".mk-hero em");
  if (!start) return; // на странице CRM другой макет, без формы
  const targets = all(".mk-form span, .mk-form em", mock);
  function at(el: HTMLElement, i: number) {
    let x = el.offsetWidth * 0.45, y = el.offsetHeight * 0.45;
    for (let n: HTMLElement | null = el; n && n !== mock; n = n.offsetParent as HTMLElement | null) { x += n.offsetLeft; y += n.offsetTop; }
    mock!.style.setProperty("--cx" + i, Math.round(x) + "px");
    if (i < 2) mock!.style.setProperty("--cy" + i, Math.round(y) + "px");
  }
  function place() {
    at(start!, 0);
    targets.forEach((el, i) => at(el, i + 1));
  }
  place();
  window.addEventListener("resize", place);
  // скрипты запускаются после загрузки React, событие load к этому времени могло уже пройти
  if (document.readyState === "complete") place();
  else window.addEventListener("load", place);
  if (document.fonts) document.fonts.ready.then(place);
  mock.querySelector(".mock-cursor")?.addEventListener("animationiteration", place);
}

/** Телефон: «Подробнее» раскрывает карточку, а не открывает страницу */
export function initPhoneCardMore() {
  const mq = media(PHONE);
  all(".grid .card").forEach((card) => {
    const more = card.querySelector<HTMLElement>(".more"), label = card.querySelector<HTMLElement>(".more-text");
    if (!more) return;
    if (mq.matches) more.setAttribute("role", "button");
    const setLabel = () => {
      if (label && !card.classList.contains("is-open")) label.textContent = mq.matches ? "Раскрыть решение" : "Подробнее";
    };
    setLabel();
    mq.addEventListener("change", setLabel);
    const toggle = (e: Event) => {
      if (!mq.matches) return;
      e.preventDefault();
      const open = card.classList.toggle("is-open");
      if (label) label.textContent = open ? "Свернуть" : "Раскрыть решение";
      more.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) card.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };
    more.addEventListener("click", (e) => { e.stopPropagation(); toggle(e); });
  });
}

/** Телефон, одностраничник: макет сайта рисуется в ширину настоящего телефона и уменьшается под колонку */
export function initPhoneDemoFit() {
  const box = document.querySelector<HTMLElement>(".live-frame[data-phone-w]");
  if (!box) return;
  const f = box.querySelector("iframe");
  if (!f) return;
  const W = +box.dataset.phoneW!, mq = media(PHONE);
  function fit() {
    f!.style.cssText = "";
    if (!mq.matches) return;
    const w = box!.clientWidth, h = f!.offsetHeight, k = Math.min(1, w / W);
    if (k === 1) return;
    f!.style.cssText = "width:" + W + "px;height:" + h / k + "px;transform:scale(" + k + ");transform-origin:0 0;margin-bottom:" + (h - h / k) + "px";
  }
  if ("ResizeObserver" in window) new ResizeObserver(fit).observe(box);
  mq.addEventListener("change", fit);
  fit();
}

/** Телефон: два видео рядом, нажатие раскрывает видео до удобного размера (кнопки уже есть в разметке) */
export function initFeatureVideos() {
  all(".features .feature").forEach((it) => {
    const cover = it.querySelector<HTMLElement>(".feature-cover"), close = it.querySelector<HTMLElement>(".feature-close");
    if (!cover || !close) return;
    cover.addEventListener("click", () => {
      it.classList.add("is-open");
      it.scrollIntoView({ block: "start", behavior: "smooth" });
    });
    close.addEventListener("click", () => {
      it.querySelector("video")?.pause();
      it.classList.remove("is-open");
      it.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  });
}

/** Телефон: нижняя панель связи прячется на первом экране и при прокрутке вниз, возвращается при прокрутке вверх */
export function initMobileContactBar() {
  const bar = document.querySelector<HTMLElement>(".m-contact");
  if (!bar) return;
  const mq = media(PHONE);
  let last = window.pageYOffset, ticking = false;
  function upd() {
    ticking = false;
    const y = window.pageYOffset;
    if (!mq.matches) { bar!.classList.remove("is-hidden"); last = y; return; }
    // высоту документа читаем только когда она нужна: чтение scrollHeight заставляет браузер пересчитать раскладку
    if (y < innerHeight * 0.8) bar!.classList.add("is-hidden");
    else if (y < last - 4 || y + innerHeight >= document.documentElement.scrollHeight - 80) bar!.classList.remove("is-hidden");
    else if (y > last + 4) bar!.classList.add("is-hidden");
    last = y;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  mq.addEventListener("change", upd);
  upd();
}

/** Видео: одновременно играет только одно */
export function initSingleVideo() {
  document.addEventListener("play", (e) => {
    if (!(e.target instanceof HTMLVideoElement)) return;
    all<HTMLVideoElement>(".feature-media video").forEach((v) => { if (v !== e.target) v.pause(); });
  }, true);
}

/** Телефон: «умные табы» — показана одна карточка, смена с плавным сдвигом */
export function initPhoneTabs() {
  const tabs = document.querySelector(".type-tabs"), grid = document.querySelector(".grid");
  if (!tabs || !grid) return;
  const btns = all("button", tabs), cards = all(".card", grid), mq = media(PHONE);
  let cur = 0;
  function apply() {
    grid!.classList.toggle("has-tabs", mq.matches);
    cards.forEach((c, i) => {
      c.classList.toggle("tab-on", mq.matches && i === cur);
      c.classList.toggle("tab-off", mq.matches && i !== cur);
      c.classList.toggle("from-right", i > cur);
    });
    btns.forEach((b, i) => { b.classList.toggle("is-active", i === cur); b.setAttribute("aria-selected", i === cur ? "true" : "false"); });
  }
  btns.forEach((b, i) => {
    b.addEventListener("click", () => {
      if (i === cur) return;
      cards.forEach((c) => {
        if (!c.classList.contains("is-open")) return;
        c.classList.remove("is-open");
        const t = c.querySelector(".more-text"), m = c.querySelector(".more");
        if (t) t.textContent = "Раскрыть решение";
        if (m) m.setAttribute("aria-expanded", "false");
      });
      cur = i;
      apply();
    });
  });
  mq.addEventListener("change", apply);
  apply();
}

/** Карточки «Готовые решения» на компьютере и планшете: «Подробнее» раскрывает остальное, повторное нажатие сворачивает */
export function initDesktopCards() {
  const phone = media(PHONE);
  all(".grid .card").forEach((card) => {
    const btn = card.querySelector<HTMLElement>(".card-toggle"), label = card.querySelector(".ct-text");
    if (!btn) return;
    const toggle = (e: Event) => {
      if (phone.matches) return;
      e.preventDefault(); e.stopPropagation();
      const open = card.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (label) label.textContent = open ? "Свернуть" : "Подробнее";
      if (open) window.setTimeout(() => {
        const r = card.getBoundingClientRect();
        if (r.bottom > window.innerHeight) window.scrollBy({ top: Math.min(r.bottom - window.innerHeight + 24, r.top - 80), behavior: "smooth" });
      }, 470);
    };
    btn.addEventListener("click", toggle);
    btn.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") toggle(e); });
  });
  // при переходе на телефон раскрытие управляется прежним механизмом
  phone.addEventListener("change", () => {
    if (phone.matches) all(".grid .card.is-open").forEach((c) => {
      c.classList.remove("is-open");
      const t = c.querySelector(".ct-text");
      if (t) t.textContent = "Подробнее";
    });
  });
}
