// Нижние карточки преимуществ: по нажатию увеличиваются и уходят в центр экрана, по повторному нажатию возвращаются
import { prefersReducedMotion } from "./dom";

type Open = {
  li: HTMLElement;
  r: DOMRect;
  veil: HTMLElement;
  layer: HTMLElement;
  clone: HTMLElement;
  onKey: (e: KeyboardEvent) => void;
  onResize: () => void;
};

export function initResultsZoom() {
  const list = document.querySelector(".results-list");
  if (!list) return;
  const items = Array.from(list.children) as HTMLElement[];
  const DUR = prefersReducedMotion() ? 1 : 300, EASE = "cubic-bezier(.22,.8,.24,1)";
  let cur: Open | null = null;

  items.forEach((li) => {
    li.setAttribute("tabindex", "0");
    li.setAttribute("role", "button");
    li.setAttribute("aria-expanded", "false");
    li.addEventListener("click", () => { if (!cur) openCard(li); });
    li.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && !cur) { e.preventDefault(); openCard(li); }
    });
  });

  function target(r: DOMRect) {
    const vw = window.innerWidth, vh = window.innerHeight;
    const s = Math.max(1, Math.min(1.9, (vw * 0.88) / r.width, (vh * 0.8) / r.height));
    const dx = vw / 2 - (r.left + r.width / 2), dy = vh / 2 - (r.top + r.height / 2);
    return "translate(" + dx + "px," + dy + "px) scale(" + s + ")";
  }

  function openCard(li: HTMLElement) {
    const r = li.getBoundingClientRect(), idx = items.indexOf(li);
    const veil = document.createElement("div");
    veil.className = "res-veil";
    // копия карточки в отдельном слое: пустые скрытые «соседи» сохраняют номер и порядок для стилей nth-child
    const layer = document.createElement("ol");
    layer.className = "results-list res-layer";
    layer.style.counterReset = "res " + idx;
    for (let i = 0; i < idx; i++) { const d = document.createElement("li"); d.style.display = "none"; layer.appendChild(d); }
    const clone = li.cloneNode(true) as HTMLElement;
    clone.removeAttribute("tabindex"); clone.setAttribute("aria-expanded", "true");
    clone.classList.add("is-open");
    clone.style.cssText = "left:" + r.left + "px;top:" + r.top + "px;width:" + r.width + "px;height:" + r.height + "px;transition:transform " + DUR + "ms " + EASE + ",box-shadow " + DUR + "ms";
    layer.appendChild(clone);
    document.body.appendChild(veil);
    document.body.appendChild(layer);
    li.style.visibility = "hidden";
    li.setAttribute("aria-expanded", "true");
    void clone.offsetWidth;
    veil.classList.add("on");
    clone.style.transform = target(r);
    const close = () => closeCard();
    cur = { li, r, veil, layer, clone, onKey: (e) => { if (e.key === "Escape") closeCard(); }, onResize: () => closeCard(true) };
    veil.addEventListener("click", close);
    clone.addEventListener("click", close);
    document.addEventListener("keydown", cur.onKey);
    window.addEventListener("resize", cur.onResize);
  }

  function closeCard(instant?: boolean) {
    if (!cur) return;
    const c = cur;
    cur = null;
    document.removeEventListener("keydown", c.onKey);
    window.removeEventListener("resize", c.onResize);
    const finish = () => {
      c.layer.remove(); c.veil.remove();
      c.li.style.visibility = ""; c.li.setAttribute("aria-expanded", "false");
    };
    if (instant) return finish();
    const r2 = c.li.getBoundingClientRect();
    c.veil.classList.remove("on");
    c.clone.classList.remove("is-open");
    c.clone.style.transform = "translate(" + (r2.left - c.r.left) + "px," + (r2.top - c.r.top) + "px)";
    window.setTimeout(finish, DUR + 30);
  }
}
