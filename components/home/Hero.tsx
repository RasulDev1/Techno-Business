// Первый экран: заголовок, метрики и журнал заявок (строки журнала дописывает скрипт)
export default function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="hero-title">
      <div className="sheet">
        <div className="sheet-head">
          <div className="hero-left">
            <h1 id="hero-title">Автоматизируйте бизнес и не теряйте клиентов</h1>
            <p className="lead"><span className="lead-full">Все клиенты, заявки, чаты и товары — в одной внутренней системе. Быстрее обрабатывайте обращения, закрывайте больше сделок и возвращайте покупателей снова.</span><span className="lead-short">Управляйте клиентами, заявками и товарами в одной системе. Продавайте быстрее и без утери лидов</span></p>
          </div>
          <div className="hero-right">
            <div className="hero-metrics" aria-hidden="true">
              <div className="metric metric-down">
                <div className="metric-top"><b data-to="80" data-sign="−">−80%</b><span>рутины</span></div>
                <div className="metric-bar"><i style={{ "--from": "100%", "--to": "20%" }} /></div>
                <small><span>Было: 8 ч в день</span><span>Стало: 1,5 ч</span></small>
              </div>
              <div className="metric metric-up">
                <div className="metric-top"><b data-to="29" data-sign="+">+29%</b><span>продаж</span></div>
                <div className="metric-bar"><i style={{ "--from": "62%", "--to": "80%" }} /></div>
                <small><span>Было: 100 сделок</span><span>Стало: 129</span></small>
              </div>
            </div>
            <p className="stat-note">* По данным исследований: CRM сокращает ручную работу до 80% (Nutshell) и повышает продажи до 29% (Salesforce).<span className="note-tail"> Точный результат зависит от вашего бизнеса.</span></p>
            <a className="btn hero-down" href="#types" aria-label="Посмотреть готовые решения"><span className="btn-text">Посмотреть готовые решения</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg></a>
          </div>
        </div>
      </div>
      <div className="sheet ledger-sheet">
        <div className="ledger" role="img" aria-label="Пример журнала заявок: заявки с сайта записываются сами, менеджер Султан ведёт каждую: принимает, ждёт оплату, вручает или отменяет">
          {" "}
          <div className="ledger-row ledger-cols" aria-hidden="true"><span>№</span><span>Время</span><span>Клиент</span><span>Что нужно</span><span>Исполнитель</span><span>Отметка</span></div>
          {" "}
          <div className="ledger-body" aria-hidden="true" />
          <div className="ledger-foot" aria-hidden="true">
            <span className="ledger-note">Пример заполнения</span>
            <div className="ledger-total">
              <ul className="ledger-stats">
                <li><i className="st-new" />Принято <b data-st="new">0</b></li>
                <li><i className="st-pay" />Ждёт оплаты <b data-st="pay">0</b></li>
                <li><i className="st-done" />Вручено <b data-st="done">0</b></li>
                <li><i className="st-cancel" />Отменено <b data-st="cancel">0</b></li>
              </ul>
              <span className="tally"><b id="ledger-count">0</b><small><span id="ledger-word">заявок</span> обработал<br />менеджер Султан</small></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
