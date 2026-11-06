import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import FeatureVideo from "@/components/FeatureVideo";

export const metadata: Metadata = {
  title: "CRM-система для автоматизации и продаж",
  description: "Автоматизация бизнес-процессов под задачи вашего проекта: продажи, клиенты, сотрудники и аналитика в единой системе. Живая демо-версия магазина и CRM.",
  alternates: { canonical: "/gotovyj-internet-magazin.html" },
};

export default function ShopCrmPage() {
  return (
    <>
      <Topbar />
      <main className="wrap tpl">
        <div className="sheet passport">
          <div className="page-head has-mock crm-head">
            <div className="ph-text">
              <h1>CRM-система для автоматизации и продаж</h1>
              <p className="tpl-lead"><span className="t-full">Автоматизация бизнес-процессов под задачи вашего проекта. Управление продажами, клиентами, сотрудниками и сквозная аналитика в единой системе.</span><span className="t-short">Автоматизация процессов. Гибкая настройка под любые задачи вашего бизнеса</span></p>
            </div>
            <div className="combo" aria-hidden="true">
              <div className="mock crm-mock">
                <div className="mock-bar"><i /><i /><i /><span>crm.ваш-сайт.ru</span></div>
                <div className="cr-page">
                  <div className="cr-side"><b /><i className="on" /><i /><i /><i /></div>
                  <div className="cr-main">
                    <div className="cr-kpi">
                      <div><small>Заказы сегодня</small><strong className="cr-flip"><span>23</span><span>24</span></strong></div>
                      <div><small>Выручка</small><strong className="cr-flip"><span>86 400 ₽</span><span>92 300 ₽</span></strong></div>
                      <div><small>На складе</small><strong className="cr-flip"><span>1 248</span><span>1 247</span></strong></div>
                    </div>
                    <div className="cr-table">
                      <div className="cr-row cr-new"><span className="cr-n">0413</span><b style={{ "--w": "58%" }} /><span className="cr-sum">5 900 ₽</span><span className="cr-st st-new">Новый</span></div>
                      <div className="cr-row"><span className="cr-n">0412</span><b style={{ "--w": "62%" }} /><span className="cr-sum">4 900 ₽</span><span className="cr-st st-pay">Ждёт оплаты</span></div>
                      <div className="cr-row"><span className="cr-n">0409</span><b style={{ "--w": "48%" }} /><span className="cr-sum">12 300 ₽</span><span className="cr-st st-done">Выдан</span></div>
                      <div className="cr-row"><span className="cr-n">0405</span><b style={{ "--w": "70%" }} /><span className="cr-sum">2 150 ₽</span><span className="cr-st st-done">Выдан</span></div>
                      <div className="cr-row"><span className="cr-n">0401</span><b style={{ "--w": "55%" }} /><span className="cr-sum">7 800 ₽</span><span className="cr-st st-cancel">Отменён</span></div>
                    </div>
                  </div>
                </div>
              </div>
              {" "}
              <div className="phone shop-mock">
                {" "}
                <div className="phone-notch" />
                {" "}
                <div className="sp-page">
                  <div className="sp-nav"><b /><span className="sp-cart"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 11h10.2L20 8H6.2" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></svg><em>1</em></span></div>
                  <div className="sp-banner"><b /><s /></div>
                  <div className="sp-grid">
                    <div className="sp-card"><i /><b /><s /><em>В корзину</em></div>
                    <div className="sp-card sp-hit"><i /><b /><s /><em>В корзину</em></div>
                  </div>
                </div>
              </div>
              {" "}
              <span className="combo-pulse" />
              {" "}
            </div>
          </div>
          <dl className="passport-rows has-icons icons-crm">
            <div>
              <dt>Все заказы в одном окне</dt>
              <dd><span className="t-full">Заявки с сайта и из Telegram сразу попадают в CRM. Статус, оплата и переписка с клиентом — в карточке заказа.</span><span className="t-short">Сбор заявок и чатов в единую систему</span></dd>
            </div>
            <div>
              <dt>Доступ по ролям</dt>
              <dd><span className="t-full">Менеджер видит свои заказы и задачи. Владелец — выручку, прибыль и работу каждого сотрудника.</span><span className="t-short">Разделение прав для сотрудников и владельца</span></dd>
            </div>
            <div>
              <dt>Склад без таблиц</dt>
              <dd><span className="t-full">Остатки по каждому размеру и цвету видны в CRM. Поставки и возвраты записываются в журнал.</span><span className="t-short">Автоматический учет остатков, поставок и возвратов</span></dd>
            </div>
            <div>
              <dt>Аналитика на графиках</dt>
              <dd><span className="t-full">Продажи, выручка и новые клиенты за неделю, месяц или полгода.</span><span className="t-short">Наглядные отчеты по продажам и прибыли</span></dd>
            </div>
          </dl>
        </div>
        <div className="variant-head wide">
          <h2>Один из вариантов реализации</h2>
          <p><span className="t-full">Ниже — пример интерфейса для компании, которая принимает заявки через сайт и Telegram Mini App. Магазин синхронизирован с Telegram-ботом: товары и заказы одни и те же на сайте и в боте. Система автоматически собирает заказы, распределяет задачи между сотрудниками и ведет учет остатков.</span><span className="t-short">Пример автоматизации для сайта и Telegram Mini App. Магазин синхронизирован с ботом: товары и заказы общие. CRM сама собирает сделки, распределяет задачи и ведет учет остатков</span></p>
          {" "}
          <p className="variant-note"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5" /><path d="M12 11v6M12 7.5v.01" /></svg><span><span className="t-full">Перед вами пример интерфейса. Мы проектируем логику, функции и дизайн CRM индивидуально под конкретные процессы вашего бизнеса.</span><span className="t-short">Пример интерфейса. Проектируем логику, функции и дизайн CRM индивидуально под ваши процессы</span></span></p>
          {" "}
        </div>
        <div className="sheet live live-duo">
          <div className="live-frame live-embed">
            <div className="live-bar"><span>Магазин «VEXA» и CRM</span><a className="live-open" href="https://rasuldev1.github.io/vexa/demo/" target="_blank" rel="noopener">Открыть на отдельной странице ↗</a></div>
            <iframe src="https://rasuldev1.github.io/vexa/demo/" title="Демо-версия магазина «VEXA» и CRM" loading="lazy" allow="clipboard-write; fullscreen" />
          </div>
          {" "}
          <ol className="live-steps">
            <li><b>Выберите товар</b> в магазине и добавьте его в корзину.</li>
            <li><b>Оформите заказ</b> во вкладке «Корзина».</li>
            <li><b>Смотрите в CRM</b>: заказ появится там сразу.</li>
            <li><b>Примите и отметьте оплату</b>, и статус обновится у покупателя в «Мои заказы».</li>
            <li><b>Напишите в чат заказа</b>: переписка с клиентом идёт прямо в CRM.</li>
          </ol>
          {" "}
          <p className="live-steps-short">Сделайте тестовый заказ в левом экране и мгновенно увидите его в CRM-системе справа</p>
          {" "}
          <p className="live-hint"><span className="note-mark">Пометка</span><span className="t-full">Это живая демо-версия: все кнопки работают. Заказы никуда не отправляются и хранятся только в вашем браузере. Этот же магазин интегрирован в Telegram-бот и открывается прямо в нём как Mini App.</span><span className="t-short">Интерактивная демо-версия: все кнопки работают. Магазин интегрирован в Telegram-бот и открывается прямо в нем</span></p>
          <p className="live-link"><span>Открыть на отдельной странице:</span> <a href="https://rasuldev1.github.io/vexa/demo/" target="_blank" rel="noopener">rasuldev1.github.io/vexa/demo<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg></a></p>
        </div>
        <section className="features" id="features">
          <FeatureVideo label="Функция 1" shortLabel="Видео" title="Работа с клиентами" src="videos/vexa.mp4?v=2" poster="videos/vexa.jpg?v=2" />
        </section>
        <nav className="sheet next" aria-label="Что дальше">
          <h2>Что дальше</h2>
          <div className="next-links"><a className="btn btn-ghost btn-back" href="index.html#types">← Все решения</a><a className="btn btn-forward" href="odnostranichnyj-sajt.html">Сайт для быстрого оформления заявок →</a></div>
        </nav>
      </main>
    </>
  );
}
