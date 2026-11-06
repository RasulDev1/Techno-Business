// Синий футер: логотип, политика и контакты
export default function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          {" "}
          <a className="logo" href="index.html"><span className="logo-mark" aria-hidden="true"><img src="favicon.svg?v=3" alt="" width="64" height="64" /></span>Автоматизация Бизнеса</a>
          {" "}
          <p className="foot-copy">© 2026<span className="copy-name"> · Автоматизация Бизнеса</span></p>
          <p className="foot-legal"><a href="politika-konfidencialnosti.html">Политика конфиденциальности</a></p>
        </div>
        <div className="foot-contacts">
          <ul>
            <li><a href="tel:+79899328775"><span className="fc-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg></span>+7 989 932-87-75</a></li>
            <li><a href="https://t.me/Rasul_Develop" target="_blank" rel="noopener"><span className="fc-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.4 11.2 19.6 5c.8-.3 1.5.2 1.2 1.4l-2.8 13c-.2.9-.8 1.2-1.6.7l-4.3-3.2-2.1 2c-.2.2-.4.4-.9.4l.3-4.4 8-7.2c.3-.3-.1-.5-.5-.2l-9.9 6.2-4.2-1.3c-.9-.3-.9-.9.2-1.4z" /></svg></span>Telegram</a></li>
            <li><a href="https://wa.me/message/DM4VIR545I2WM1" target="_blank" rel="noopener"><span className="fc-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.8 2.3 1 2.5.1.2 1.7 2.6 4.1 3.6 1.5.7 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.4z" /></svg></span>WhatsApp</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
