"use client";

import { useEffect, useRef, useState } from "react";
import { rub, type Comparison } from "@/lib/pricing";

const BOX = "#e2622b";
const OWN = "#1f3fd1";

function short(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString("ru-RU", { maximumFractionDigits: 1 })} млн`;
  if (n >= 1000) return `${Math.round(n / 1000)} тыс`;
  return String(n);
}

// Шаг сетки «красивым» числом, чтобы подписи были вида 250 тыс / 500 тыс / 750 тыс
function niceStep(v: number) {
  const pow = Math.pow(10, Math.floor(Math.log10(Math.max(v, 1))));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * pow >= v) return m * pow;
  return 10 * pow;
}

export default function PaybackChart({ estimate }: { estimate: Comparison }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(640);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { series, breakEvenMonth } = estimate;
  const narrow = w < 480;
  const h = narrow ? 260 : 340;
  const pad = { l: narrow ? 54 : 60, r: narrow ? 22 : 28, t: 18, b: 34 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const lastM = series[series.length - 1].month;
  const yStep = niceStep((Math.max(...series.map((p) => Math.max(p.box, p.own))) * 1.05) / 4);
  const yMax = yStep * 4;

  const x = (m: number) => pad.l + (m / lastM) * iw;
  const y = (v: number) => pad.t + ih - (v / yMax) * ih;

  const path = (key: "box" | "own") => series.map((p, i) => `${i ? "L" : "M"}${x(p.month).toFixed(1)},${y(p[key]).toFixed(1)}`).join("");

  // Заливка «экономии» — область между линиями после точки окупаемости
  const savingsArea = (() => {
    if (!breakEvenMonth || breakEvenMonth > lastM) return "";
    const pts = series.filter((p) => p.month >= breakEvenMonth);
    const top = pts.map((p) => `${x(p.month).toFixed(1)},${y(p.box).toFixed(1)}`);
    const bottom = [...pts].reverse().map((p) => `${x(p.month).toFixed(1)},${y(p.own).toFixed(1)}`);
    return `M${top.join("L")}L${bottom.join("L")}Z`;
  })();

  const yTicks = [0, 1, 2, 3, 4].map((k) => k * yStep);
  const xStep = lastM > 36 || narrow ? 12 : 6;
  const xTicks = Array.from({ length: Math.floor(lastM / xStep) + 1 }, (_, i) => i * xStep);

  const be = breakEvenMonth && breakEvenMonth <= lastM ? series[breakEvenMonth] : null;
  const hp = hover !== null ? series[hover] : null;

  const onMove = (clientX: number) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    const m = Math.round(((clientX - r.left - pad.l) / iw) * lastM);
    setHover(Math.max(0, Math.min(lastM, m)));
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] font-medium text-muted">
        <span className="flex items-center gap-2">
          <span className="h-1 w-5 rounded" style={{ background: BOX }} /> Готовая CRM (внедрение + подписка + интеграции)
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1 w-5 rounded" style={{ background: OWN }} /> Свой софт (разработка + хостинг)
        </span>
      </div>
      <div
        ref={wrap}
        className="relative touch-pan-y select-none"
        onMouseMove={(e) => onMove(e.clientX)}
        onMouseLeave={() => setHover(null)}
        onTouchStart={(e) => onMove(e.touches[0].clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
      >
        <svg width={w} height={h} className="block max-w-full" role="img" aria-label="График накопленных затрат по месяцам">
          {yTicks.map((v) => (
            <g key={v}>
              <line x1={pad.l} x2={w - pad.r} y1={y(v)} y2={y(v)} stroke="#e7eaf0" />
              <text x={pad.l - 8} y={y(v) + 4} textAnchor="end" fontSize={11} fill="#7b8597">
                {short(v)}
              </text>
            </g>
          ))}
          {xTicks.map((m) => (
            <text key={m} x={x(m)} y={h - 10} textAnchor="middle" fontSize={11} fill="#7b8597">
              {m === 0 ? "старт" : `${m} мес`}
            </text>
          ))}

          {savingsArea && <path d={savingsArea} fill="#12805c" opacity={0.12} />}
          <path d={path("box")} fill="none" stroke={BOX} strokeWidth={3} strokeLinejoin="round" />
          <path d={path("own")} fill="none" stroke={OWN} strokeWidth={3} strokeLinejoin="round" />

          {be && (
            <g>
              <line x1={x(be.month)} x2={x(be.month)} y1={pad.t} y2={pad.t + ih} stroke="#12805c" strokeDasharray="4 4" />
              <circle cx={x(be.month)} cy={y(be.own)} r={7} fill="#fff" stroke="#12805c" strokeWidth={3} />
              <text
                x={x(be.month) + (x(be.month) > w * 0.6 ? -10 : 10)}
                y={pad.t + 12}
                textAnchor={x(be.month) > w * 0.6 ? "end" : "start"}
                fontSize={12}
                fontWeight={800}
                fill="#12805c"
              >
                Окупаемость: {be.month} мес
              </text>
            </g>
          )}

          {hp && (
            <g pointerEvents="none">
              <line x1={x(hp.month)} x2={x(hp.month)} y1={pad.t} y2={pad.t + ih} stroke="#94a3b8" />
              <circle cx={x(hp.month)} cy={y(hp.box)} r={4.5} fill={BOX} stroke="#fff" strokeWidth={2} />
              <circle cx={x(hp.month)} cy={y(hp.own)} r={4.5} fill={OWN} stroke="#fff" strokeWidth={2} />
            </g>
          )}
        </svg>

        {hp && (
          <div
            className="pointer-events-none absolute top-6 z-10 w-48 rounded-xl border border-line bg-white/95 p-3 backdrop-blur text-xs shadow-lg"
            style={{
              left: Math.min(Math.max(x(hp.month) - 96, 0), w - 192),
            }}
          >
            <div className="mb-1 font-bold">{hp.month === 0 ? "Старт" : `${hp.month}-й месяц`}</div>
            <div className="flex justify-between gap-2">
              <span style={{ color: BOX }}>Коробка</span>
              <b>{rub(hp.box)}</b>
            </div>
            <div className="flex justify-between gap-2">
              <span style={{ color: OWN }}>Свой софт</span>
              <b>{rub(hp.own)}</b>
            </div>
            <div className={`mt-1 border-t border-line pt-1 font-bold ${hp.box >= hp.own ? "text-good" : "text-muted"}`}>
              {hp.box >= hp.own ? `Экономия ${rub(hp.box - hp.own)}` : `До окупаемости ${rub(hp.own - hp.box)}`}
            </div>
          </div>
        )}
      </div>
      <p className="m-0 mt-2 text-[13px] text-faint">Наведите или проведите пальцем по графику, чтобы увидеть затраты на любой месяц.</p>
    </div>
  );
}
