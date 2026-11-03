// Ноутбук + смартфон с одним и тем же чистым интерфейсом — показываем кроссплатформенность.
// Нарисовано вёрсткой, чтобы картинка была чёткой на любом экране и ничего не весила.

const bars = [38, 52, 44, 66, 58, 74, 88];

function LaptopScreen() {
  return (
    <div className="flex h-full text-[7px] leading-tight sm:text-[8.5px]">
      <aside className="flex w-[22%] flex-col gap-1.5 bg-navy p-2 text-slate-300">
        <div className="mb-1 flex items-center gap-1 font-bold text-white">
          <span className="inline-block size-2.5 rounded-sm bg-accent" /> Мой бизнес
        </div>
        {["Сделки", "Склад", "Финансы", "Производство", "Клиенты"].map((s, i) => (
          <div key={s} className={`rounded px-1.5 py-1 ${i === 0 ? "bg-white/10 text-white" : ""}`}>
            {s}
          </div>
        ))}
      </aside>
      <div className="flex flex-1 flex-col gap-2 bg-bg p-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-ink sm:text-[10.5px]">Сводка за ноябрь</span>
          <span className="rounded bg-accent px-1.5 py-0.5 text-white">+ Сделка</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            ["Выручка", "4,8 млн", "+12%"],
            ["Сделки", "126", "+8%"],
            ["Остатки", "1 940 шт", "норма"],
          ].map(([k, v, d]) => (
            <div key={k} className="rounded-md bg-white p-1.5 shadow-sm">
              <div className="text-muted">{k}</div>
              <div className="text-[10px] font-extrabold text-ink sm:text-[12px]">{v}</div>
              <div className="text-good">{d}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 gap-1.5">
          <div className="flex flex-[3] flex-col rounded-md bg-white p-1.5 shadow-sm">
            <div className="text-muted">Продажи по неделям</div>
            <div className="mt-1 flex flex-1 items-end gap-1">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? "bg-accent" : "bg-accent/25"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-[2] flex-col gap-1 rounded-md bg-white p-1.5 shadow-sm">
            <div className="text-muted">Новые заявки</div>
            {[
              ["ООО «Вектор»", "Новая"],
              ["ИП Алиев", "В работе"],
              ["Стройдом", "Счёт"],
            ].map(([n, s]) => (
              <div key={n} className="flex items-center justify-between border-b border-line pb-0.5 last:border-0">
                <span className="truncate text-ink">{n}</span>
                <span className="rounded bg-accent-soft px-1 text-accent">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneScreen() {
  return (
    <div className="flex h-full flex-col gap-1.5 bg-bg p-2 pt-4 text-[7px] leading-tight sm:text-[8px]">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-ink sm:text-[10px]">Сделки</span>
        <span className="size-3 rounded-full bg-accent" />
      </div>
      <div className="rounded-md bg-accent p-1.5 text-white">
        <div className="opacity-80">План месяца</div>
        <div className="text-[11px] font-extrabold">78%</div>
        <div className="mt-1 h-1 rounded bg-white/30">
          <div className="h-1 w-[78%] rounded bg-white" />
        </div>
      </div>
      {[
        ["Вектор", "120 000 ₽"],
        ["Алиев", "48 500 ₽"],
        ["Стройдом", "310 000 ₽"],
        ["Гранд", "76 000 ₽"],
      ].map(([n, s]) => (
        <div key={n} className="flex items-center justify-between rounded-md bg-white p-1.5 shadow-sm">
          <span className="text-ink">{n}</span>
          <span className="font-bold text-ink">{s}</span>
        </div>
      ))}
    </div>
  );
}

export default function DeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] pb-6" aria-hidden="true">
      {/* Ноутбук */}
      <div className="relative mr-[14%]">
        <div className="rounded-t-[14px] border border-slate-700 bg-slate-800 p-[2.2%] shadow-2xl shadow-slate-900/25">
          <div className="aspect-[16/10] overflow-hidden rounded-[4px] bg-white">
            <LaptopScreen />
          </div>
        </div>
        <div className="relative mx-[-5%] h-3 rounded-b-xl bg-gradient-to-b from-slate-300 to-slate-400 sm:h-4">
          <div className="absolute left-1/2 top-0 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-slate-500/40" />
        </div>
      </div>
      {/* Смартфон */}
      <div className="absolute bottom-0 right-0 w-[27%] rounded-[18px] border border-slate-700 bg-slate-800 p-[1.5%] shadow-2xl shadow-slate-900/30">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[14px] bg-white">
          <div className="absolute left-1/2 top-1 z-10 h-1.5 w-1/3 -translate-x-1/2 rounded-full bg-slate-800" />
          <PhoneScreen />
        </div>
      </div>
    </div>
  );
}
