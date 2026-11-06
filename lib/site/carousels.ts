// Карусели-макеты в карточках: CRM по нишам и виды сайтов. Данные в макетах «живут», нажатие листает слайды
import { FINE_POINTER, media, prefersReducedMotion, replay } from "./dom";

type Say = (text: string) => void;
type Slide = { tick: () => void };
type Kind = (slide: HTMLElement, say: Say) => Slide;

const fmt = (n: number) => Math.round(n).toLocaleString("ru-RU").replace(/[  ]/g, " ");
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Число внутри текста (например «842 400 ₽») увеличивается на delta, ячейка коротко подсвечивается */
function bumpNum(el: HTMLElement, delta: number) {
  const m = (el.textContent || "").match(/^([^\d]*)([\d\s ]+)(.*)$/);
  if (!m) return;
  const v = parseInt(m[2].replace(/\D/g, ""), 10) || 0;
  el.textContent = m[1] + fmt(v + delta) + m[3];
  if (el.parentElement) replay(el.parentElement, "flash");
}

// Таймеры надписей «✓ В корзине»: повторное добавление продлевает надпись
const labelTimers = new WeakMap<Element, number>();
/** Кнопка на время меняет надпись и возвращает прежнюю */
function flashLabel(btn: HTMLElement, text: string, ms: number) {
  const orig = btn.dataset.t || (btn.dataset.t = btn.textContent || "");
  btn.textContent = text; btn.classList.add("done");
  window.clearTimeout(labelTimers.get(btn));
  labelTimers.set(btn, window.setTimeout(() => { btn.textContent = orig; btn.classList.remove("done"); }, ms));
}

const KINDS: Record<string, Kind> = {
  crm(slide, say) {
    const pool: string[][] = JSON.parse(slide.dataset.pool!), pill: Record<string, string> = JSON.parse(slide.dataset.pill!);
    let pi = 0;
    const table = slide.querySelector(".ck-table")!, head = slide.querySelector(".ck-h")!, kb = slide.querySelectorAll<HTMLElement>(".ck-kpis > div b"), bars = slide.querySelectorAll<HTMLElement>(".ck-bars i");
    function addRow() {
      const r = pool[pi++ % pool.length], row = document.createElement("div");
      row.className = "ck-r is-new";
      row.innerHTML = r.slice(0, -1).map((c) => "<span>" + c + "</span>").join("") + '<span><em class="p-' + r[r.length - 1] + '">' + pill[r[r.length - 1]] + "</em></span>";
      head.after(row);
      const rows = table.querySelectorAll(".ck-r");
      if (rows.length > 4) rows[rows.length - 1].remove();
      if (kb[0]) bumpNum(kb[0], 1);
      if (kb[1]) { const v = parseInt((kb[1].textContent || "").replace(/\D/g, ""), 10) || 1000; bumpNum(kb[1], Math.max(100, Math.round((v * 0.004) / 100) * 100)); }
      const last = bars[bars.length - 1];
      if (last) last.style.setProperty("--h", rnd(68, 100) + "%");
      say("Новая заявка · " + slide.dataset.co + " +1");
    }
    return { tick: addRow };
  },
  quiz(slide, say) {
    const qs: { q: string; o: string[][]; a: number }[] = JSON.parse(slide.dataset.qs!);
    const opts = slide.querySelector<HTMLElement>(".qz-opts")!, h3 = slide.querySelector(".qz h3")!,
      label = slide.querySelector(".qz-prog span")!, bar = slide.querySelector<HTMLElement>(".qz-prog s i")!, pct = slide.querySelector(".qz-prog b")!;
    let qi = 0, timer = 0;
    function render(sel: number) {
      const q = qs[qi];
      h3.textContent = q.q;
      opts.innerHTML = q.o.map((o, k) => "<div" + (k === sel ? ' class="on"' : "") + "><span>" + o[0] + "</span><div><b>" + o[1] + "</b><small>" + o[2] + "</small></div><u>✓</u></div>").join("");
      replay(opts, "swap");
      label.textContent = "Вопрос " + (qi + 1) + " из " + qs.length;
      const p = Math.round(((qi + 1) / qs.length) * 100);
      bar.style.width = p + "%"; pct.textContent = p + "%";
    }
    function choose(k: number) {
      opts.querySelectorAll(":scope > div").forEach((d, i) => d.classList.toggle("on", i === k));
      say("Ответ сохранён");
    }
    return {
      tick() { qi = (qi + 1) % qs.length; render(-1); window.clearTimeout(timer); timer = window.setTimeout(() => choose(qs[qi].a), 1000); },
    };
  },
  dental(slide, say) {
    const names = [["к терапевту", "15:30"], ["к хирургу", "16:15"], ["к ортодонту", "17:00"], ["к имплантологу", "17:45"], ["к пародонтологу", "18:30"]];
    let ni = 0;
    return {
      tick() { const n = names[ni++ % names.length]; say("Новая запись " + n[0] + " · " + n[1]); },
    };
  },
  shop(slide, say) {
    const cartB = slide.querySelector<HTMLElement>(".sh-cart b")!, cards = slide.querySelectorAll<HTMLElement>(".sh-p");
    let count = 2, last = -1;
    function add(card: HTMLElement) {
      flashLabel(card.querySelector<HTMLElement>("em")!, "✓ В корзине", 1500);
      count = count >= 9 ? 2 : count + 1; cartB.textContent = String(count); replay(cartB, "bump");
      say("Добавлено в корзину: " + (card.querySelector("h6")!.textContent || "").split(",")[0]);
    }
    return {
      tick() { let i; do { i = rnd(0, cards.length - 1); } while (i === last); last = i; add(cards[i]); },
    };
  },
};

export function initCarousels() {
  const reduce = prefersReducedMotion();
  const fine = media(FINE_POINTER).matches;
  document.querySelectorAll<HTMLElement>(".cm").forEach((mock, n) => {
    const dev = mock.parentElement!, shot = mock.closest<HTMLElement>(".shot"), stage = mock.querySelector<HTMLElement>(".cm-stage")!, slides = Array.from(mock.querySelectorAll<HTMLElement>(".cm-slide"));
    const lab = mock.querySelector<HTMLElement>(".cm-lab")!, dotsBox = mock.querySelector(".cm-dots")!, chip = dev.querySelector(".cm-chip")!, chipT = chip.querySelector("span")!;
    let cur = 0, timer = 0, hovered = false, visible = true, chipTimer = 0;
    function fit() { const w = mock.clientWidth; if (w) stage.style.setProperty("--s", (w / 640).toFixed(4)); }
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(mock);
    else window.addEventListener("resize", fit);
    function say(text: string) {
      chipT.textContent = text; chip.classList.add("on");
      window.clearTimeout(chipTimer);
      chipTimer = window.setTimeout(() => chip.classList.remove("on"), 2600);
    }
    const handlers = slides.map((s) => { const k = KINDS[s.dataset.kind || ""]; return k ? k(s, say) : null; });
    const dots = slides.map((_, i) => {
      const d = document.createElement("i");
      d.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); go(i, true); });
      dotsBox.appendChild(d);
      return d;
    });
    function setLabel(text: string) {
      lab.textContent = ""; lab.setAttribute("aria-label", text);
      if (reduce) { lab.textContent = text; return; }
      Array.from(text).forEach((ch, i) => { const c = document.createElement("i"); c.textContent = ch; c.style.setProperty("--n", String(i)); lab.appendChild(c); });
    }
    function go(i: number, manual?: boolean) {
      const prev = slides[cur];
      cur = (i + slides.length) % slides.length;
      if (prev !== slides[cur]) { prev.classList.add("is-out"); window.setTimeout(() => prev.classList.remove("is-out"), 850); }
      slides.forEach((s, k) => { s.classList.toggle("is-on", k === cur); dots[k].classList.toggle("on", k === cur); });
      setLabel(slides[cur].getAttribute("data-label") || "");
      chip.classList.remove("on");
      if (manual) restart();
    }
    function restart() {
      window.clearInterval(timer);
      if (reduce) return;
      timer = window.setInterval(() => { if (!hovered && visible && !document.hidden) go(cur + 1); }, 6200 + n * 700);
    }
    mock.addEventListener("click", (e) => {
      e.preventDefault();
      go(cur + 1, true);
    });
    mock.addEventListener("pointerenter", () => { hovered = true; });
    mock.addEventListener("pointerleave", () => { hovered = false; });
    if (window.IntersectionObserver) new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(mock);
    if (!reduce) window.setInterval(() => {
      if (!visible || document.hidden) return;
      handlers[cur]?.tick?.();
    }, 3300 + n * 600);
    // наклон карточки за курсором и блик
    if (fine && !reduce && shot) {
      shot.addEventListener("pointermove", (e) => {
        const r = shot.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        shot.style.setProperty("--rx", ((0.5 - py) * 7).toFixed(2) + "deg"); shot.style.setProperty("--ry", ((px - 0.5) * 9).toFixed(2) + "deg");
        shot.style.setProperty("--gx", (px * 100).toFixed(1)); shot.style.setProperty("--gy", (py * 100).toFixed(1)); shot.classList.add("is-tilt");
      });
      shot.addEventListener("pointerleave", () => { shot.classList.remove("is-tilt"); shot.style.removeProperty("--rx"); shot.style.removeProperty("--ry"); });
    }
    go(0);
    restart();
  });
}

