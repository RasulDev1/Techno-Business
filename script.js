// Живая схема в hero: поток заявок с сайта идёт через CRM к одному менеджеру и превращается в оплаты.
(function () {
  const box = document.querySelector(".flow");
  const canvas = box && box.querySelector("canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const counter = document.getElementById("flow-count");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const NODES = [
    { x: 0.22, y: 0.36, label: "Заявка с сайта", icon: "site" },
    { x: 0.62, y: 0.30, label: "CRM", icon: "crm" },
    { x: 0.80, y: 0.58, label: "1 менеджер", icon: "manager" },
    { x: 0.38, y: 0.68, label: "Оплата", icon: "pay" },
  ];

  let W = 0, H = 0, dpr = 1, pts = [], particles = [], pulses = [0, 0, 0, 0], done = 0, last = 0, spawnAcc = 0, dash = 0;

  function colors() {
    const s = getComputedStyle(document.documentElement);
    const v = (n) => s.getPropertyValue(n).trim();
    return { ink: v("--ink"), muted: v("--muted"), line: v("--line"), accent: v("--accent"), soft: v("--accent-soft"), coin: v("--coin"), surface: v("--surface") };
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = NODES.map((n) => ({ x: n.x * W, y: n.y * H }));
  }

  // Квадратичная кривая между двумя точками с изгибом в сторону
  function ctrl(a, b, bend) {
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
    return { x: mx - (dy / len) * bend, y: my + (dx / len) * bend };
  }
  function qp(a, c, b, t) {
    const u = 1 - t;
    return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y };
  }
  function segs(p) {
    const s = [{ a: p.start, b: pts[0], c: ctrl(p.start, pts[0], p.bend) }];
    for (let i = 0; i < pts.length - 1; i++) s.push({ a: pts[i], b: pts[i + 1], c: ctrl(pts[i], pts[i + 1], W * 0.08) });
    return s;
  }

  function spawn() {
    particles.push({
      start: { x: -10, y: H * (0.12 + Math.random() * 0.7) },
      bend: (Math.random() - 0.5) * W * 0.2,
      seg: 0, t: 0,
      speed: 0.55 + Math.random() * 0.35,
    });
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function icon(kind, x, y, c) {
    ctx.save(); ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 1.8; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath();
    if (kind === "site") { roundRect(x - 9, y - 7, 18, 14, 3); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 9, y - 2); ctx.lineTo(x + 9, y - 2); }
    if (kind === "crm") { ctx.arc(x - 4, y - 3, 3.2, 0, 7); ctx.moveTo(x + 9.2, y - 3); ctx.arc(x + 6, y - 3, 3.2, 0, 7); ctx.moveTo(x - 10, y + 8); ctx.quadraticCurveTo(x - 4, y, x + 2, y + 8); ctx.moveTo(x, y + 8); ctx.quadraticCurveTo(x + 6, y, x + 12, y + 8); }
    if (kind === "pay") { roundRect(x - 10, y - 7, 20, 14, 3); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 10, y - 2); ctx.lineTo(x + 10, y - 2); ctx.moveTo(x + 2, y + 3); ctx.lineTo(x + 6, y + 3); }
    if (kind === "manager") { ctx.arc(x, y - 4, 4.2, 0, 7); ctx.moveTo(x - 8, y + 9); ctx.quadraticCurveTo(x, y - 2, x + 8, y + 9); }
    if (kind === "report") { ctx.moveTo(x - 9, y + 8); ctx.lineTo(x - 9, y + 1); ctx.moveTo(x - 3, y + 8); ctx.lineTo(x - 3, y - 3); ctx.moveTo(x + 3, y + 8); ctx.lineTo(x + 3, y - 7); ctx.moveTo(x + 9, y + 8); ctx.lineTo(x + 9, y - 1); }
    ctx.stroke(); ctx.restore();
  }

  function draw(c) {
    ctx.clearRect(0, 0, W, H);

    // Сетка точек
    ctx.fillStyle = c.line;
    for (let x = 14; x < W; x += 26) for (let y = 14; y < H; y += 26) ctx.fillRect(x, y, 1.4, 1.4);

    // Связи
    ctx.save(); ctx.setLineDash([5, 7]); ctx.lineDashOffset = -dash; ctx.strokeStyle = c.accent; ctx.globalAlpha = 0.45; ctx.lineWidth = 1.6;
    for (let i = 0; i < pts.length - 1; i++) {
      const cc = ctrl(pts[i], pts[i + 1], W * 0.08);
      ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.quadraticCurveTo(cc.x, cc.y, pts[i + 1].x, pts[i + 1].y); ctx.stroke();
    }
    ctx.restore();

    // Частицы: заявки зелёные, после менеджера превращаются в монеты
    for (const p of particles) {
      const s = segs(p)[p.seg];
      const q = qp(s.a, s.c, s.b, p.t);
      const money = p.seg >= 3;
      ctx.beginPath();
      ctx.fillStyle = money ? c.coin : c.accent;
      ctx.arc(q.x, q.y, money ? 5 : 3.6, 0, 7);
      ctx.fill();
      if (money) { ctx.fillStyle = c.surface; ctx.font = "700 7px " + getComputedStyle(document.body).fontFamily; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("₽", q.x, q.y + 0.5); }
    }

    // Узлы
    const small = W < 420;
    NODES.forEach((n, i) => {
      const p = pts[i], k = pulses[i];
      const r = small ? 22 : 27;
      if (k > 0) { ctx.beginPath(); ctx.strokeStyle = i === 3 ? c.coin : c.accent; ctx.globalAlpha = k; ctx.lineWidth = 2; ctx.arc(p.x, p.y, r + (1 - k) * 22, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; }
      ctx.beginPath(); ctx.fillStyle = c.surface; ctx.strokeStyle = c.accent; ctx.lineWidth = 1.6;
      ctx.arc(p.x, p.y, r, 0, 7); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.fillStyle = c.soft; ctx.arc(p.x, p.y, r - 5, 0, 7); ctx.fill();
      icon(n.icon, p.x, p.y, c.ink);
      ctx.fillStyle = c.ink; ctx.font = "600 " + (small ? 11 : 13) + "px " + getComputedStyle(document.body).fontFamily;
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText(n.label, p.x, p.y + r + 8);
    });
  }

  function step(now) {
    const dt = Math.min((now - (last || now)) / 1000, 0.05); last = now;
    dash += dt * 18;
    spawnAcc += dt;
    if (spawnAcc > 0.3 && particles.length < 40) { spawnAcc = 0; spawn(); }
    for (let i = 0; i < 4; i++) pulses[i] = Math.max(0, pulses[i] - dt * 1.6);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.t += dt * p.speed;
      if (p.t >= 1) {
        p.t = 0; pulses[p.seg] = 1; p.seg++;
        if (p.seg > 3) { particles.splice(i, 1); done++; if (counter) counter.textContent = done.toLocaleString("ru-RU"); }
      }
    }
    draw(colors());
    requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);
  if (reduce) {
    // Статичный кадр: несколько заявок на разных этапах
    for (let i = 0; i < 8; i++) { spawn(); const p = particles[i]; p.seg = i % 4; p.t = (i * 0.37) % 1; }
    const redraw = () => { resize(); draw(colors()); };
    redraw(); window.addEventListener("resize", redraw);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redraw);
  } else {
    for (let i = 0; i < 10; i++) { spawn(); const p = particles[i]; p.seg = i % 4; p.t = Math.random(); }
    requestAnimationFrame(step);
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
