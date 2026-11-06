// Премиум-режим: кнопки звука и темы в углу и световые сферы на фоне.
// Они в разметке, а не создаются скриптом: видны с первой отрисовки и не появляются рывком после загрузки.
// Состояние кнопок (aria-pressed) уточняет lib/site/premium.ts по сохранённым настройкам.
export default function PremiumLayers() {
  return (
    <>
      <div className="pm-dock">
        <button type="button" className="pm-opt pm-sound" aria-pressed="true" aria-label="Выключить звуки">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" />
            <path className="snd-on" d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.6 7.6 0 0 1 0 11" />
            <path className="snd-off" d="M16 9.5l5 5M21 9.5l-5 5" />
          </svg>
        </button>
        <button type="button" className="pm-opt pm-theme" aria-pressed="false" aria-label="Тёмная тема">
          <svg className="ic-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
          </svg>
          <svg className="ic-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
          </svg>
        </button>
      </div>
      <div className="pm-orbs" aria-hidden="true"><i /><i /><i /></div>
    </>
  );
}
