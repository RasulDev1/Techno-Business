import type { Metadata } from "next";
import Topbar from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Сайт для быстрого оформления заявок",
  description: "Одностраничные сайты для быстрого запуска продаж: рекламный трафик, тест ниши, запуск продукта. Живая демо-версия и цена от 10 000 ₽.",
  alternates: { canonical: "/odnostranichnyj-sajt.html" },
};

export default function LandingPage() {
  return (
    <>
      <Topbar />
      <main className="wrap tpl">
        <div className="sheet passport">
          <div className="page-head has-mock">
            <div className="ph-text">
              <h1>Сайт для быстрого оформления заявок</h1>
              <p className="tpl-lead">Идеальное решение для мгновенных повторных продаж, интеграции в соцсети и работы с теплой аудиторией. Приложение убирает лишние шаги и доводит клиента до заказа за 5 секунд.</p>
            </div>
            <div className="mock" aria-hidden="true">
              {" "}
              <div className="mock-bar"><i /><i /><i /><span>ваш-сайт.ru</span></div>
              {" "}
              <div className="mock-page">
                <div className="mk mk-nav"><b /><s /><s /><s /></div>
                <div className="mk mk-hero"><b /><b /><s /><em /></div>
                <div className="mk mk-cards"><i /><i /><i /></div>
                <div className="mk mk-form"><span /><span /><em /></div>
              </div>
              {" "}
              <span className="mock-cursor"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M5 3l14 8-6 2-3 6z" fill="var(--ink)" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg></span>
              {" "}
            </div>
          </div>
          <dl className="passport-rows has-icons">
            <div>
              <dt>Оформление в 2 клика</dt>
              <dd>Максимально короткий путь к покупке без заполнения длинных форм и лишних полей.</dd>
            </div>
            <div>
              <dt>Интеграция за 1 минуту</dt>
              <dd>Заявки мгновенно улетают в CRM, Telegram или на почту сразу в момент клика.</dd>
            </div>
            <div>
              <dt>Иконка на экране смартфона</dt>
              <dd>Клиент сохраняет приложение в один тап и возвращается к вам без затрат на рекламу.</dd>
            </div>
            <div>
              <dt>Удобная интеграция в TG, INST</dt>
              <dd>Связь с клиентом в привычных мессенджерах и соцсетях: заявки и ответы без лишних переходов.</dd>
            </div>
          </dl>
        </div>
        <div className="variant-head">
          <h2>Один из вариантов реализации</h2>
          <p>Ниже — одностраничный сайт, сделанный для сервиса аренды строительного инструмента.</p>
          {" "}
          <p className="variant-note"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5" /><path d="M12 11v6M12 7.5v.01" /></svg><span><span className="t-full">Перед вами пример интерфейса и функционала. Мы разрабатываем сайты индивидуально, под конкретные запросы вашего бизнеса.</span><span className="t-short">Пример интерфейса и функционала. Разрабатываем сайты индивидуально под ваши задачи</span></span></p>
          {" "}
        </div>
        <div className="sheet live">
          {" "}
          <span className="card-label">Вариант: сервис аренды инструментов</span>
          {" "}
          <p className="m-version-note phone-note"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>Мобильная версия сайта — вы зашли с телефона</p>
          {" "}
          <p className="m-version-note pc-note"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>Версия сайта для компьютера — вы зашли с ПК</p>
          {" "}
          <div className="live-frame" data-phone-w="390">
            <div className="live-bar"><span>Сервис аренды инструментов</span><a className="live-open" href="https://rasuldev1.github.io/tyaga-site/demo/" target="_blank" rel="noopener">Открыть на отдельной странице ↗</a></div>
            <iframe src="https://rasuldev1.github.io/tyaga-site/demo/" title="Демо-версия сайта сервиса аренды инструментов" loading="lazy" />
          </div>
          <p className="live-hint"><span className="note-mark">Пометка</span><span className="t-full">Это живой сайт: листайте, выбирайте инструмент и заполняйте форму. Заявки в демо-версии не отправляются.</span><span className="t-short">Интерактивная демо-версия: листайте, выбирайте инструмент и тестируйте формы</span></p>
          <p className="live-link"><span>Открыть на отдельной странице:</span> <a href="https://rasuldev1.github.io/tyaga-site/demo/" target="_blank" rel="noopener">rasuldev1.github.io/tyaga-site/demo<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg></a></p>
        </div>
        <section className="features" id="features">
          <article className="sheet feature">
            <span className="card-label"><span className="t-full">Функция 1</span><span className="t-short">Видео 1</span></span>
            <div className="feature-media">
              <video controls preload="metadata" playsInline poster="videos/admin.jpg" aria-label="Админ-панель: видео">
                <source src="videos/admin.mp4" type="video/mp4" />
              </video>
            </div>
            <h2>Админ-панель</h2>
          </article>
        </section>
        <nav className="sheet next" aria-label="Что дальше">
          <h2>Что дальше</h2>
          <div className="next-links"><a className="btn btn-ghost btn-back" href="index.html#types">← Все решения</a><a className="btn btn-forward" href="gotovyj-internet-magazin.html">CRM-система для автоматизации и продаж →</a></div>
        </nav>
      </main>
    </>
  );
}
