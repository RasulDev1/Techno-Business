// Верхняя панель: на главной ссылка ведёт к выбору системы, на остальных страницах — обратно на главную
export default function Topbar({ home = false }: { home?: boolean }) {
  return (
    <div className="topbar">
      <header className="wrap top">
        <a className="logo" href="index.html"><span className="logo-mark" aria-hidden="true"><img src="favicon.svg?v=3" alt="" width="64" height="64" /></span><span className="logo-name">Автоматизация Бизнеса</span></a>
        <a className="promo-bar" href="#contacts"><span aria-hidden="true">📈</span><span className="promo-text"><span className="t-full">Рассчитайте точную стоимость автоматизации вашего бизнеса</span><span className="t-short">Рассчитать стоимость<br />автоматизации</span></span><span className="promo-arrow" aria-hidden="true">→</span></a>
        <div className="top-actions">
          {home ? (
            <a className="top-link" href="#types">Выбрать систему</a>
          ) : (
            <a className="top-link top-home" href="index.html"><span aria-hidden="true">←</span> <span className="th-long">На главную</span><span className="th-short">Главная</span></a>
          )}
          <div className="top-contacts"><a href="tel:+79899328775" aria-label="Позвонить: +7 989 932-87-75" title="Позвонить: +7 989 932-87-75"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg></a><a href="https://t.me/Rasul_Develop" target="_blank" rel="noopener" aria-label="Написать в Telegram" title="Написать в Telegram"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.4 11.2 19.6 5c.8-.3 1.5.2 1.2 1.4l-2.8 13c-.2.9-.8 1.2-1.6.7l-4.3-3.2-2.1 2c-.2.2-.4.4-.9.4l.3-4.4 8-7.2c.3-.3-.1-.5-.5-.2l-9.9 6.2-4.2-1.3c-.9-.3-.9-.9.2-1.4z" /></svg></a><a href="https://wa.me/message/DM4VIR545I2WM1" target="_blank" rel="noopener" aria-label="Написать в WhatsApp" title="Написать в WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.8 2.3 1 2.5.1.2 1.7 2.6 4.1 3.6 1.5.7 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.4z" /></svg></a></div>
        </div>
      </header>
    </div>
  );
}
