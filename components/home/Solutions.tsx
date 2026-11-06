// Готовые решения: вкладки и карточки с живыми макетами сайтов и CRM
export default function Solutions() {
  return (
    <section className="types" id="types">
      <div className="wrap">
        <div className="types-head">
          <h2>Готовые решения</h2>
          <p className="note"><span className="note-mark">Пометка</span><span className="note-full">Это демо-версии: компании на них вымышленные, но весь функционал работает по-настоящему. Нажмите на сайт, чтобы узнать, что он умеет.</span><span className="note-short">Интерактивные демо-версии. Нажмите на сайт, чтобы протестировать реальный функционал</span></p>
        </div>
        {" "}
        <div className="type-tabs" role="tablist" aria-label="Тип решения"><button type="button" role="tab" className="is-active" aria-selected="true" data-i="0">Сайт для быстрого оформления заявок</button><button type="button" role="tab" aria-selected="false" data-i="1">CRM-система</button></div>
        {" "}
        <div className="grid">
          <div className="card">
            <span className="card-label">Приложение 1</span>
            <div className="shot shot-cm">
              {" "}
              <div className="cm-dev">
                <svg className="cm-sprite" width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
                  <defs>
                    <filter id="rx-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2" /></filter>
                    <filter id="rx-blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
                    <linearGradient id="rx-metal" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#4b5563" />
                      <stop offset=".45" stopColor="#1f2937" />
                      <stop offset="1" stopColor="#0b1220" />
                    </linearGradient>
                    <linearGradient id="rx-metal2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#0b1220" />
                      <stop offset=".3" stopColor="#4b5563" />
                      <stop offset=".55" stopColor="#1f2937" />
                      <stop offset="1" stopColor="#0b1220" />
                    </linearGradient>
                    <linearGradient id="rx-wall" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#7c3aed" />
                      <stop offset=".55" stopColor="#2563eb" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="rx-silver" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#f1f5f9" />
                      <stop offset=".5" stopColor="#cbd5e1" />
                      <stop offset="1" stopColor="#94a3b8" />
                    </linearGradient>
                    <linearGradient id="rx-glass" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#fff" stopOpacity=".38" />
                      <stop offset=".5" stopColor="#fff" stopOpacity=".04" />
                      <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="rx-band" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#7c4a2d" />
                      <stop offset=".5" stopColor="#b9774a" />
                      <stop offset="1" stopColor="#6b3d22" />
                    </linearGradient>
                    <radialGradient id="rx-cush" cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#4b5563" /><stop offset="1" stopColor="#111827" /></radialGradient>
                    <pattern id="rx-mesh" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="#1b2433" /><circle cx="1.5" cy="1.5" r=".8" fill="#3b475c" /></pattern>
                    <symbol id="pr-phone" viewBox="0 0 100 100">
                      <ellipse cx="50" cy="94" rx="24" ry="3.4" fill="#0f172a" opacity=".35" filter="url(#rx-blur)" />
                      <rect x="29" y="6" width="42" height="86" rx="8" fill="url(#rx-metal)" />
                      <rect x="29.6" y="6.6" width="40.8" height="84.8" rx="7.6" fill="none" stroke="#9ca3af" strokeOpacity=".55" strokeWidth=".8" />
                      <rect x="71" y="26" width="1.3" height="9" rx=".6" fill="#6b7280" />
                      <rect x="27.7" y="22" width="1.3" height="6" rx=".6" fill="#6b7280" />
                      <rect x="27.7" y="31" width="1.3" height="6" rx=".6" fill="#6b7280" />
                      <rect x="31.6" y="8.6" width="36.8" height="80.8" rx="6" fill="url(#rx-wall)" />
                      <circle cx="58" cy="30" r="14" fill="#f0abfc" opacity=".35" filter="url(#rx-blur2)" />
                      <circle cx="40" cy="70" r="16" fill="#22d3ee" opacity=".4" filter="url(#rx-blur2)" />
                      <text x="50" y="34" textAnchor="middle" fontFamily="Manrope,Arial,sans-serif" fontWeight="700" fontSize="13" fill="#fff" opacity=".95">9:41</text>
                      <text x="50" y="41" textAnchor="middle" fontFamily="Manrope,Arial,sans-serif" fontSize="3.2" fill="#fff" opacity=".8">вторник, 6 ноября</text>
                      <rect x="36" y="52" width="28" height="9" rx="3" fill="#fff" opacity=".22" />
                      <rect x="36" y="64" width="28" height="9" rx="3" fill="#fff" opacity=".16" />
                      <rect x="45" y="11" width="10" height="3.2" rx="1.6" fill="#05070c" />
                      <circle cx="53.3" cy="12.6" r=".9" fill="#1e293b" />
                      <rect x="43" y="85" width="14" height="1.2" rx=".6" fill="#fff" opacity=".7" />
                      <path d="M31.6 14 L52 8.6 H68.4 V30 Z" fill="url(#rx-glass)" />
                    </symbol>
                    <symbol id="pr-head" viewBox="0 0 100 100">
                      <ellipse cx="50" cy="90" rx="30" ry="3.6" fill="#0f172a" opacity=".3" filter="url(#rx-blur)" />
                      <path d="M23 60 C21 14 79 14 77 60" fill="none" stroke="#0b1220" strokeWidth="6.5" strokeLinecap="round" />
                      <path d="M23 60 C21 14 79 14 77 60" fill="none" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" opacity=".7" transform="translate(0 -1.4)" />
                      <rect x="12" y="46" width="19" height="38" rx="9.5" fill="url(#rx-metal)" />
                      <rect x="69" y="46" width="19" height="38" rx="9.5" fill="url(#rx-metal2)" />
                      <ellipse cx="22" cy="65" rx="8.6" ry="14.5" fill="url(#rx-cush)" />
                      <ellipse cx="78" cy="65" rx="8.6" ry="14.5" fill="url(#rx-cush)" />
                      <ellipse cx="22" cy="65" rx="5.4" ry="9.4" fill="none" stroke="#9ca3af" strokeOpacity=".5" strokeWidth=".9" />
                      <ellipse cx="78" cy="65" rx="5.4" ry="9.4" fill="none" stroke="#9ca3af" strokeOpacity=".5" strokeWidth=".9" />
                      <path d="M14 54 Q18 49 24 49" stroke="#fff" strokeOpacity=".45" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      <circle cx="22" cy="65" r="1.4" fill="#22d3ee" />
                    </symbol>
                    <symbol id="pr-watch" viewBox="0 0 100 100">
                      <ellipse cx="50" cy="95" rx="20" ry="3" fill="#0f172a" opacity=".3" filter="url(#rx-blur)" />
                      <path d="M38 2 H62 L64 30 H36 Z" fill="url(#rx-band)" />
                      <path d="M36 70 H64 L62 98 H38 Z" fill="url(#rx-band)" />
                      <g fill="#3b2314" opacity=".6"><circle cx="50" cy="78" r="1.2" /><circle cx="50" cy="84" r="1.2" /><circle cx="50" cy="90" r="1.2" /></g>
                      <rect x="63.5" y="42" width="4" height="9" rx="1.6" fill="url(#rx-silver)" />
                      <rect x="28" y="24" width="44" height="52" rx="13" fill="url(#rx-silver)" />
                      <rect x="31" y="27" width="38" height="46" rx="10.5" fill="#05070c" />
                      <circle cx="50" cy="50" r="15.5" fill="#0f172a" stroke="#334155" strokeWidth=".6" />
                      <g stroke="#e2e8f0" strokeWidth=".9" strokeLinecap="round"><path d="M50 36.4v2.2M50 61.4v2.2M36.4 50h2.2M61.4 50h2.2" /></g>
                      <path d="M50 50 L50 40.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M50 50 L58 54" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                      <path d="M50 50 L44 59" stroke="#f97316" strokeWidth=".8" strokeLinecap="round" />
                      <circle cx="50" cy="50" r="1.5" fill="#f97316" />
                      <path d="M31 27 H55 L31 52 Z" fill="url(#rx-glass)" />
                    </symbol>
                    <symbol id="pr-speaker" viewBox="0 0 100 100">
                      <ellipse cx="50" cy="82" rx="34" ry="4" fill="#0f172a" opacity=".32" filter="url(#rx-blur)" />
                      <rect x="14" y="28" width="72" height="52" rx="22" fill="url(#rx-metal)" />
                      <rect x="19" y="33" width="62" height="42" rx="17" fill="url(#rx-mesh)" />
                      <rect x="19" y="33" width="62" height="42" rx="17" fill="none" stroke="#000" strokeOpacity=".4" strokeWidth="1" />
                      <rect x="40" y="62" width="20" height="3.4" rx="1.7" fill="#0f172a" stroke="#475569" strokeWidth=".4" />
                      <circle cx="64" cy="63.7" r="1.1" fill="#22d3ee" />
                      <path d="M22 31 Q50 24 78 31" stroke="#fff" strokeOpacity=".38" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                    </symbol>
                  </defs>
                </svg>
                <div className="cm mock-site">
                  <div className="cm-stage">
                    <div className="cm-slide cm-s-site" data-kind="quiz" data-qs={JSON.stringify([{"q":"Какой тип ремонта вам нужен?","o":[["🛠️","Косметический","обои, покраска, полы"],["🏗️","Капитальный","со сменой коммуникаций"],["🛋️","Дизайнерский","с авторским проектом"],["🔑","Под ключ","от замера до сдачи"]],"a":1},{"q":"Какая площадь квартиры?","o":[["🏠","До 40 м²","студия, 1-комнатная"],["🏢","40–70 м²","2–3 комнаты"],["🏡","70–100 м²","3–4 комнаты"],["🏰","Больше 100 м²","большая квартира"]],"a":1},{"q":"Что делаем со стенами?","o":[["🖌️","Покраска","ровная гладкая стена"],["🌿","Обои","винил, флизелин"],["🧱","Штукатурка","с выравниванием"],["🪟","Декор. отделка","под бетон, лофт"]],"a":0},{"q":"Когда планируете начать?","o":[["⚡","Как можно скорее","в ближайшие дни"],["📅","В течение месяца","успеем подготовиться"],["🗓️","Через 2–3 месяца","планируем заранее"],["🤔","Пока считаю","нужна смета"]],"a":1},{"q":"Какой бюджет рассматриваете?","o":[["💰","До 500 тыс. ₽","экономный вариант"],["💎","500 тыс. – 1 млн ₽","оптимальный"],["🏅","1–2 млн ₽","расширенный"],["👑","От 2 млн ₽","премиум"]],"a":2}])} data-label="Квиз" style={{ "--c": "#2563eb" }}>
                      <div className="ws-bar"><i /><i /><i /><span>remont-kvartir.site/calc</span></div>
                      <div className="ws-page">
                        <header className="ws-head"><b className="ws-logo">РемонтПро</b><span className="ws-tel"><small>Консультант онлайн</small><b>+7 *** *** ** **</b></span></header>
                        <div className="qz">
                          <div className="qz-main">
                            <small className="qz-top">Рассчитайте стоимость ремонта за 1 минуту</small>
                            <div className="qz-prog"><span>Вопрос 1 из 5</span><s><i style={{ width: "20%" }} /></s><b>20%</b></div>
                            <h3>Какой тип ремонта вам нужен?</h3>
                            <div className="qz-opts">
                              <div>
                                <span>🛠️</span>
                                <div><b>Косметический</b><small>обои, покраска, полы</small></div>
                                <u>✓</u>
                              </div>
                              <div className="on">
                                <span>🏗️</span>
                                <div><b>Капитальный</b><small>со сменой коммуникаций</small></div>
                                <u>✓</u>
                              </div>
                              <div>
                                <span>🛋️</span>
                                <div><b>Дизайнерский</b><small>с авторским проектом</small></div>
                                <u>✓</u>
                              </div>
                              <div>
                                <span>🔑</span>
                                <div><b>Под ключ</b><small>от замера до сдачи</small></div>
                                <u>✓</u>
                              </div>
                            </div>
                            <div className="qz-btns"><span>← Назад</span><em>Далее</em></div>
                          </div>
                          <aside className="qz-side">
                            <div className="qz-man">
                              <i>И</i>
                              <div><b>Ирина</b><small>ваш консультант</small></div>
                            </div>
                            <p>«Отвечу на вопросы и подготовлю смету. Это бесплатно!»</p>
                            <ul>
                              <li>Смета в PDF на почту</li>
                              <li>Скидка 10% на работы</li>
                              <li>Бесплатный выезд замерщика</li>
                            </ul>
                          </aside>
                        </div>
                      </div>
                    </div>
                    <div className="cm-slide cm-s-site" data-kind="dental" data-label="Сайт-визитка · стоматолог" style={{ "--c": "#0891b2" }}>
                      <div className="ws-bar"><i /><i /><i /><span>dr-volkov.site</span></div>
                      <div className="ws-page">
                        <header className="ws-head dn-head">
                          <b className="ws-logo">Доктор Волков</b>
                          <nav><span>Услуги</span><span>Цены</span><span>Отзывы</span><span>Контакты</span></nav>
                          <b className="dn-tel">+7 *** *** ** **</b>
                          <em className="dn-mini">Записаться</em>
                        </header>
                        <div className="dn">
                          <div className="dn-text">
                            <span className="dn-rate"><b>★★★★★</b> 4,9 · 287 отзывов на Яндекс Картах</span>
                            <h3>Лечение зубов без боли и страха</h3>
                            <p>Стоматолог-терапевт, 12 лет опыта. Лечим под микроскопом и даём гарантию до 3 лет.</p>
                            <div className="dn-btns"><em>Записаться на приём</em><span>Позвонить</span></div>
                            <ul className="dn-trust">
                              <li>Рассрочка 0%</li>
                              <li>Осмотр бесплатно</li>
                              <li>Лицензия № ЛО-77</li>
                            </ul>
                          </div>
                          <div className="dn-photo"><svg className="dn-svg" viewBox="0 0 150 158" aria-hidden="true" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="dc-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e6fafc" /><stop offset=".55" stopColor="#bdecf2" /><stop offset="1" stopColor="#93dbe8" /></linearGradient><radialGradient id="dc-skin" cx=".45" cy=".4" r=".7"><stop offset="0" stopColor="#f7d6b8" /><stop offset=".65" stopColor="#ecb88f" /><stop offset="1" stopColor="#d49a72" /></radialGradient><linearGradient id="dc-neck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b9805a" /><stop offset="1" stopColor="#e6b28b" /></linearGradient><linearGradient id="dc-cap" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#14b8c4" /><stop offset="1" stopColor="#0e7490" /></linearGradient><linearGradient id="dc-coat" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#dfeaf0" /><stop offset=".4" stopColor="#ffffff" /><stop offset="1" stopColor="#d6e3eb" /></linearGradient><linearGradient id="dc-scrub" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0e9bb0" /><stop offset="1" stopColor="#0e7490" /></linearGradient><linearGradient id="dc-mask" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#eef6fa" /><stop offset="1" stopColor="#d4e3ec" /></linearGradient><filter id="dc-b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter><filter id="dc-b2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.1" /></filter></defs><rect width="150" height="158" fill="url(#dc-bg)" /><g filter="url(#dc-b)"><circle cx="22" cy="30" r="20" fill="#fff" opacity=".8" /><circle cx="130" cy="24" r="14" fill="#fff" opacity=".6" /><rect x="108" y="48" width="34" height="62" rx="6" fill="#5fc4d4" opacity=".7" /><circle cx="14" cy="106" r="16" fill="#8fe0b8" opacity=".5" /></g><ellipse cx="75" cy="157" rx="64" ry="9" fill="#0f172a" opacity=".12" filter="url(#dc-b2)" /><path d="M8 158 C10 126 32 114 56 110 L94 110 C118 114 140 126 142 158 Z" fill="url(#dc-coat)" /><path d="M56 110 L75 152 L94 110 Z" fill="url(#dc-scrub)" /><path d="M56 110 C60 128 68 144 75 158 L58 158 L40 124 Z" fill="#e8f0f5" /><path d="M94 110 C90 128 82 144 75 158 L92 158 L110 124 Z" fill="#dae6ee" /><path d="M56 110 L75 152" stroke="#b3c4cf" strokeWidth=".8" fill="none" /><path d="M94 110 L75 152" stroke="#b3c4cf" strokeWidth=".8" fill="none" /><path d="M28 142 C46 134 52 120 60 112" stroke="#c6d3dc" strokeWidth="1" fill="none" opacity=".9" /><path d="M122 142 C104 134 98 120 90 112" stroke="#c6d3dc" strokeWidth="1" fill="none" opacity=".9" /><rect x="104" y="134" width="22" height="10" rx="2" fill="#fff" stroke="#cbd5e1" strokeWidth=".6" /><rect x="107" y="137" width="9" height="1.5" rx=".7" fill="#0891b2" /><rect x="107" y="140.4" width="14" height="1" rx=".5" fill="#94a3b8" /><path d="M64 98 C64 108 68 114 75 114 C82 114 86 108 86 98 Z" fill="url(#dc-neck)" /><path d="M63 106 C68 112 82 112 87 106 L87 111 C82 116 68 116 63 111 Z" fill="#a9724e" opacity=".4" /><ellipse cx="52" cy="76" rx="4.4" ry="7" fill="#e2a981" /><ellipse cx="98" cy="76" rx="4.4" ry="7" fill="#d49a72" /><path d="M53 66 C53 46 62 38 75 38 C88 38 97 46 97 66 C97 84 88 100 75 101 C62 100 53 84 53 66 Z" fill="url(#dc-skin)" /><path d="M58 88 C63 99 69 102 75 102 C81 102 87 99 92 88 C88 96 81 98 75 98 C69 98 62 96 58 88 Z" fill="#c68b64" opacity=".35" /><path d="M50 62 C46 36 60 24 76 24 C92 24 104 36 100 62 C99 52 95 46 90 44 C82 48 68 48 60 44 C55 47 51 53 50 62 Z" fill="url(#dc-cap)" /><path d="M58 40 C66 34 86 34 94 40" stroke="#fff" strokeOpacity=".25" strokeWidth="1.2" fill="none" /><path d="M60 44 C68 49 82 49 90 44" stroke="#0a5d70" strokeWidth="1.4" fill="none" opacity=".7" /><path d="M62 61 Q67.5 58 73 60.5" stroke="#3a2415" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M77 60.5 Q82.5 58 88 61" stroke="#3a2415" strokeWidth="2" fill="none" strokeLinecap="round" /><g><ellipse cx="67.5" cy="68" rx="4.6" ry="2.7" fill="#fff" /><circle cx="67.8" cy="68" r="2.3" fill="#5b3a22" /><circle cx="67.8" cy="68" r="1.1" fill="#080808" /><circle cx="68.6" cy="67.2" r=".65" fill="#fff" /><path d="M62.6 68.2 Q67.5 63.4 72.4 68.2" stroke="#2a170c" strokeWidth="1.3" fill="none" strokeLinecap="round" /><path d="M63 69.6 Q67.5 72 72 69.6" stroke="#b4795a" strokeWidth=".7" fill="none" opacity=".7" /></g><g><ellipse cx="82.5" cy="68" rx="4.6" ry="2.7" fill="#fff" /><circle cx="82.8" cy="68" r="2.3" fill="#5b3a22" /><circle cx="82.8" cy="68" r="1.1" fill="#080808" /><circle cx="83.6" cy="67.2" r=".65" fill="#fff" /><path d="M77.6 68.2 Q82.5 63.4 87.4 68.2" stroke="#2a170c" strokeWidth="1.3" fill="none" strokeLinecap="round" /><path d="M78 69.6 Q82.5 72 87 69.6" stroke="#b4795a" strokeWidth=".7" fill="none" opacity=".7" /></g><rect x="60" y="62.5" width="15" height="11" rx="4.2" fill="#bfeaf2" fillOpacity=".18" stroke="#1f2937" strokeWidth="1.3" /><rect x="75" y="62.5" width="15" height="11" rx="4.2" fill="#bfeaf2" fillOpacity=".18" stroke="#1f2937" strokeWidth="1.3" /><path d="M75 66 Q75 65 75 66" stroke="#1f2937" strokeWidth="1.3" /><path d="M73.6 66.4 Q75 65 76.4 66.4" stroke="#1f2937" strokeWidth="1.2" fill="none" /><path d="M60 65 L53 66.5 M90 65 L97 66.5" stroke="#1f2937" strokeWidth="1.2" strokeLinecap="round" /><path d="M62 64.5 L66 64.5" stroke="#fff" strokeOpacity=".7" strokeWidth="1" strokeLinecap="round" /><path d="M77 64.5 L81 64.5" stroke="#fff" strokeOpacity=".7" strokeWidth="1" strokeLinecap="round" /><g><rect x="62.4" y="70.6" width="9" height="5.4" rx="2.4" fill="#0f172a" /><circle cx="67" cy="73.3" r="1.8" fill="#334155" /><circle cx="66.4" cy="72.6" r=".6" fill="#fff" opacity=".8" /><rect x="78.6" y="70.6" width="9" height="5.4" rx="2.4" fill="#0f172a" /><circle cx="83" cy="73.3" r="1.8" fill="#334155" /><circle cx="82.4" cy="72.6" r=".6" fill="#fff" opacity=".8" /></g><path d="M56 80 C62 76 68 78 75 78 C82 78 88 76 94 80 C95 90 90 102 75 106 C60 102 55 90 56 80 Z" fill="url(#dc-mask)" stroke="#c4d6e0" strokeWidth=".8" /><path d="M58 86 C66 90 84 90 92 86" stroke="#c4d6e0" strokeWidth="1" fill="none" /><path d="M58.6 91.4 C66 95 84 95 91.4 91.4" stroke="#c4d6e0" strokeWidth="1" fill="none" /><path d="M60.4 96.6 C67 100 83 100 89.6 96.6" stroke="#c4d6e0" strokeWidth="1" fill="none" /><path d="M56 81 C52 79 51 78 51.5 76" stroke="#e5eef3" strokeWidth="1.1" fill="none" /><path d="M94 81 C98 79 99 78 98.5 76" stroke="#e5eef3" strokeWidth="1.1" fill="none" /><path d="M66 79 C70 77.5 80 77.5 84 79" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".9" /><path d="M62 84 C66 90 70 96 72 104" stroke="#fff" strokeOpacity=".55" strokeWidth="1.2" fill="none" /><ellipse cx="60.5" cy="78" rx="3.4" ry="2" fill="#e8998a" opacity=".22" filter="url(#dc-b2)" /><ellipse cx="89.5" cy="78" rx="3.4" ry="2" fill="#e8998a" opacity=".22" filter="url(#dc-b2)" /></svg><span className="dn-b1"><b>12 лет</b>опыта</span><span className="dn-b2">★ 4,9</span></div>
                        </div>
                        <div className="dn-srv">
                          <div><b>Лечение кариеса</b><small>от 3 500 ₽</small></div>
                          <div><b>Профессиональная чистка</b><small>от 4 000 ₽</small></div>
                          <div><b>Имплантация</b><small>от 35 000 ₽</small></div>
                        </div>
                      </div>
                    </div>
                    <div className="cm-slide cm-s-site" data-kind="shop" data-label="Сайт-витрина" style={{ "--c": "#ea580c" }}>
                      <div className="ws-bar"><i /><i /><i /><span>technomarket.site</span></div>
                      <div className="sh-promo">Бесплатная доставка от 15 000 ₽ · Рассрочка 0% на 12 месяцев</div>
                      <div className="ws-page">
                        <header className="ws-head"><b className="ws-logo">ТехноМаркет</b><span className="sh-cat">☰ Каталог</span><span className="sh-search">Поиск среди 12 000 товаров</span><span className="sh-ic">♡</span><span className="sh-cart">🛒<b>2</b></span></header>
                        <div className="sh-chips"><span className="on">Все</span><span>Смартфоны</span><span>Наушники</span><span>Часы</span><span>Планшеты</span><span>Акции</span></div>
                        <div className="sh-grid">
                          <div className="sh-p">
                            <div className="sh-i"><b className="bd sale">−15%</b><u>♡</u><svg className="sh-img" viewBox="0 0 100 100" aria-hidden="true"><use href="#pr-phone" /></svg></div>
                            <div className="sh-r"><i>★</i> 4,8 <small>(126)</small></div>
                            <h6>Смартфон Nova 12, 256 ГБ</h6>
                            <div className="sh-pr"><strong>109 900 ₽</strong><s>129 900 ₽</s></div>
                            <small className="sh-inst">от 9 160 ₽/мес</small>
                            <em>В корзину</em>
                          </div>
                          <div className="sh-p">
                            <div className="sh-i"><b className="bd">Хит</b><u>♡</u><svg className="sh-img" viewBox="0 0 100 100" aria-hidden="true"><use href="#pr-head" /></svg></div>
                            <div className="sh-r"><i>★</i> 4,9 <small>(412)</small></div>
                            <h6>Наушники AirBeat Pro</h6>
                            <div className="sh-pr"><strong>24 500 ₽</strong></div>
                            <small className="sh-inst">от 2 040 ₽/мес</small>
                            <em>В корзину</em>
                          </div>
                          <div className="sh-p">
                            <div className="sh-i"><b className="bd sale">−10%</b><u>♡</u><svg className="sh-img" viewBox="0 0 100 100" aria-hidden="true"><use href="#pr-watch" /></svg></div>
                            <div className="sh-r"><i>★</i> 4,7 <small>(88)</small></div>
                            <h6>Умные часы Fit 5</h6>
                            <div className="sh-pr"><strong>16 900 ₽</strong><s>18 900 ₽</s></div>
                            <small className="sh-inst">от 1 410 ₽/мес</small>
                            <em>В корзину</em>
                          </div>
                          <div className="sh-p">
                            <div className="sh-i"><b className="bd">Новинка</b><u>♡</u><svg className="sh-img" viewBox="0 0 100 100" aria-hidden="true"><use href="#pr-speaker" /></svg></div>
                            <div className="sh-r"><i>★</i> 4,6 <small>(53)</small></div>
                            <h6>Колонка Boom Mini</h6>
                            <div className="sh-pr"><strong>9 900 ₽</strong></div>
                            <small className="sh-inst">от 825 ₽/мес</small>
                            <em>В корзину</em>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cm-bar"><span className="cm-lab" /><span className="cm-nav"><span className="cm-dots" /></span></div>
                  <i className="cm-sheen" />
                </div>
                <i className="cm-base" />
                <div className="cm-chip" aria-hidden="true"><i /><span /></div>
                <i className="cm-glare" />
              </div>
              {" "}
            </div>
            <div className="card-body">
              <span className="tag">Сервис аренды инструментов</span>
              <h3><a className="card-link" href="odnostranichnyj-sajt.html">Сайт для быстрого оформления заявок</a></h3>
              <p className="teaser"><a className="card-link" href="odnostranichnyj-sajt.html">Современный мобильный инструмент, который заменяет сложные сайты и мгновенно превращает пользователей в горячие лиды прямо в их смартфонах.</a></p>
              <p><a className="card-link" href="odnostranichnyj-sajt.html">Современный мобильный инструмент, который заменяет сложные сайты и мгновенно превращает пользователей в горячие лиды прямо в их смартфонах.</a></p>
              <span className="card-toggle" role="button" tabIndex={0} aria-expanded="false"><span className="ct-text">Подробнее</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></span>
              <div className="card-more">
                <div className="card-more-in">
                  <div className="fit">
                    <b>Кому подойдёт</b>
                    <ul>
                      <li><strong>Малому бизнесу и сфере услуг.</strong> Быстрый запуск потока клиентов на конкретную услугу: бьюти-сфера, ремонт, консалтинг, обучение, автосервисы или доставка. Без долгих разработок и сложных интеграций.</li>
                      <li><strong>Стартапам и предпринимателям для теста ниш.</strong> Идеальный способ проверить спрос на новый продукт или запустить сезонную акцию с минимальными вложениями. Клиент оформляет заказ в 2 клика — вы сразу видите реальный интерес.</li>
                      <li><strong>Экспертам, коучам и специалистам.</strong> Удобный инструмент для презентации личного бренда, записи на консультации, продажи курсов, вебинаров или гайдов без лишних шагов и потерь конверсии.</li>
                    </ul>
                  </div>
                  <div className="card-foot">
                    <p className="price"><b>от 10 000 ₽</b><span className="term">1 день</span><small>Точная стоимость обговаривается со специалистом</small></p>
                    <a className="go" href="odnostranichnyj-sajt.html">Открыть страницу с демо →</a>
                    <span className="more"><span className="more-text">Подробнее</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <span className="card-label">Приложение 2</span>
            <div className="shot shot-cm">
              {" "}
              <div className="cm-dev">
                <div className="cm mock-crm">
                  <div className="cm-stage">
                    <div className="cm-slide cm-s-crm c5" data-kind="crm" data-pool={JSON.stringify([["#10483","Асель Н.","Футболка Pro","3 500 ₽","new"],["#10484","Рустам Ж.","Спортивный костюм","14 900 ₽","ok"],["#10485","Камила Ш.","Рюкзак City","5 200 ₽","work"],["#10486","Тимур Д.","Кроссовки Trail","9 700 ₽","ship"],["#10487","Лаура А.","Топ Active","2 800 ₽","new"],["#10488","Бекзат О.","Шорты Run","3 900 ₽","ok"]])} data-pill={"{\"new\": \"Новый\", \"work\": \"В работе\", \"ok\": \"Оплачен\", \"ship\": \"Доставка\", \"wait\": \"Ожидает\", \"done\": \"Готово\", \"conf\": \"Подтверждён\", \"came\": \"Пришёл\", \"diag\": \"Диагностика\", \"part\": \"Ждёт запчасть\", \"show\": \"Показ\", \"dep\": \"Задаток\", \"deal\": \"Сделка\", \"lead\": \"Заявка\"}"} data-cycle={"[\"new\", \"work\", \"ok\", \"ship\"]"} data-co="СпортЛайн" data-label="CRM · интернет-магазин одежды" style={{ "--c": "#2563eb" }}>
                      <aside className="ck-side">
                        <div className="ck-logo"><b>CRM</b><span>СпортЛайн</span></div>
                        <nav><i className="on"><u />Заказы</i><i><u />Клиенты</i><i><u />Товары</i><i><u />Склад</i><i><u />Аналитика</i></nav>
                        <div className="ck-user"><s>АК</s><span>Анна К.<small>Менеджер</small></span></div>
                      </aside>
                      <div className="ck-main">
                        <header className="ck-top">
                          <h4>Заказы</h4>
                          <span className="ck-search">Поиск по клиентам и заказам…</span>
                          <span className="ck-bell" />
                          <s>АК</s>
                        </header>
                        <div className="ck-kpis">
                          <div><small>Заказы сегодня</small><b>128</b><em>+12%</em></div>
                          <div><small>Выручка</small><b>842 400 ₽</b><em>+8%</em></div>
                          <div><small>Средний чек</small><b>6 580 ₽</b><em>+3%</em></div>
                          <div><small>Конверсия</small><b>3,8%</b><em>+0,4</em></div>
                        </div>
                        <div className="ck-mid">
                          <div className="ck-chart">
                            <h5>Продажи за неделю, тыс. ₽</h5>
                            <div className="ck-bars"><i style={{ "--h": "48%" }}><u>Пн</u></i><i style={{ "--h": "62%" }}><u>Вт</u></i><i style={{ "--h": "55%" }}><u>Ср</u></i><i style={{ "--h": "78%" }}><u>Чт</u></i><i style={{ "--h": "92%" }}><u>Пт</u></i><i style={{ "--h": "100%" }}><u>Сб</u></i><i style={{ "--h": "70%" }}><u>Вс</u></i></div>
                          </div>
                          <div className="ck-fun">
                            <h5>Воронка заказов</h5>
                            <div><span>Новые</span><s><i style={{ width: "100%" }} /></s><b>46</b></div>
                            <div><span>В работе</span><s><i style={{ width: "67%" }} /></s><b>31</b></div>
                            <div><span>Оплачены</span><s><i style={{ width: "52%" }} /></s><b>24</b></div>
                            <div><span>Доставка</span><s><i style={{ width: "39%" }} /></s><b>18</b></div>
                          </div>
                        </div>
                        <div className="ck-table">
                          <div className="ck-h"><span>№</span><span>Клиент</span><span>Товар</span><span>Сумма</span><span>Статус</span></div>
                          <div className="ck-r"><span>#10482</span><span>Мария Л.</span><span>Худи Oversize</span><span>4 900 ₽</span><span><em className="p-ok">Оплачен</em></span></div>
                          <div className="ck-r"><span>#10481</span><span>Игорь С.</span><span>Кроссовки Run Pro</span><span>8 200 ₽</span><span><em className="p-ship">Доставка</em></span></div>
                          <div className="ck-r"><span>#10480</span><span>Алина Т.</span><span>Лосины Flex</span><span>3 100 ₽</span><span><em className="p-new">Новый</em></span></div>
                          <div className="ck-r"><span>#10479</span><span>Данияр Б.</span><span>Куртка Storm</span><span>12 600 ₽</span><span><em className="p-work">В работе</em></span></div>
                        </div>
                      </div>
                    </div>
                    <div className="cm-slide cm-s-crm c5" data-kind="crm" data-pool={JSON.stringify([["14:00","Данияр С.","Стрижка машинкой","Тимур","conf"],["14:45","Кирилл Б.","Стрижка + борода","Руслан","wait"],["15:30","Азат М.","Фейд, укладка","Тимур","conf"],["16:15","Олег Т.","Королевский уход","Руслан","conf"],["17:00","Марат К.","Бритьё","Тимур","wait"]])} data-pill={"{\"new\": \"Новый\", \"work\": \"В работе\", \"ok\": \"Оплачен\", \"ship\": \"Доставка\", \"wait\": \"Ожидает\", \"done\": \"Готово\", \"conf\": \"Подтверждён\", \"came\": \"Пришёл\", \"diag\": \"Диагностика\", \"part\": \"Ждёт запчасть\", \"show\": \"Показ\", \"dep\": \"Задаток\", \"deal\": \"Сделка\", \"lead\": \"Заявка\"}"} data-cycle={"[\"wait\", \"conf\", \"came\"]"} data-co="Борода" data-label="CRM · барбершоп" style={{ "--c": "#7c3aed" }}>
                      <aside className="ck-side">
                        <div className="ck-logo"><b>CRM</b><span>Борода</span></div>
                        <nav><i className="on"><u />Записи</i><i><u />Клиенты</i><i><u />Мастера</i><i><u />Услуги</i><i><u />Касса</i></nav>
                        <div className="ck-user"><s>АН</s><span>Айдар Н.<small>Администратор</small></span></div>
                      </aside>
                      <div className="ck-main">
                        <header className="ck-top">
                          <h4>Записи на сегодня</h4>
                          <span className="ck-search">Поиск по клиентам и заказам…</span>
                          <span className="ck-bell" />
                          <s>АН</s>
                        </header>
                        <div className="ck-kpis">
                          <div><small>Записей сегодня</small><b>41</b><em>+7</em></div>
                          <div><small>Выручка</small><b>118 600 ₽</b><em>+10%</em></div>
                          <div><small>Загрузка</small><b>91%</b><em>+4%</em></div>
                          <div><small>Повторные</small><b>68%</b><em>+5%</em></div>
                        </div>
                        <div className="ck-mid">
                          <div className="ck-chart">
                            <h5>Загрузка по дням, %</h5>
                            <div className="ck-bars"><i style={{ "--h": "62%" }}><u>Пн</u></i><i style={{ "--h": "70%" }}><u>Вт</u></i><i style={{ "--h": "78%" }}><u>Ср</u></i><i style={{ "--h": "84%" }}><u>Чт</u></i><i style={{ "--h": "98%" }}><u>Пт</u></i><i style={{ "--h": "100%" }}><u>Сб</u></i><i style={{ "--h": "66%" }}><u>Вс</u></i></div>
                          </div>
                          <div className="ck-fun">
                            <h5>Статусы записей</h5>
                            <div><span>Подтверждены</span><s><i style={{ width: "100%" }} /></s><b>26</b></div>
                            <div><span>Ожидают</span><s><i style={{ width: "35%" }} /></s><b>9</b></div>
                            <div><span>Пришли</span><s><i style={{ width: "81%" }} /></s><b>21</b></div>
                            <div><span>Отмены</span><s><i style={{ width: "8%" }} /></s><b>2</b></div>
                          </div>
                        </div>
                        <div className="ck-table">
                          <div className="ck-h"><span>Время</span><span>Клиент</span><span>Услуга</span><span>Мастер</span><span>Статус</span></div>
                          <div className="ck-r"><span>10:00</span><span>Арман К.</span><span>Стрижка + борода</span><span>Тимур</span><span><em className="p-came">Пришёл</em></span></div>
                          <div className="ck-r"><span>11:30</span><span>Денис Л.</span><span>Фейд, укладка</span><span>Руслан</span><span><em className="p-conf">Подтверждён</em></span></div>
                          <div className="ck-r"><span>12:00</span><span>Максим П.</span><span>Бритьё опасной бритвой</span><span>Тимур</span><span><em className="p-wait">Ожидает</em></span></div>
                          <div className="ck-r"><span>13:15</span><span>Алексей Р.</span><span>Уход за бородой</span><span>Руслан</span><span><em className="p-conf">Подтверждён</em></span></div>
                        </div>
                      </div>
                    </div>
                    <div className="cm-slide cm-s-crm c5" data-kind="crm" data-pool={JSON.stringify([["Mazda 6","Ерлан Т.","Замена масла","5 800 ₽","work"],["Lada Vesta","Павел К.","Развал-схождение","4 500 ₽","diag"],["Skoda Octavia","Нурлан Б.","Замена сцепления","38 000 ₽","part"],["Honda CR-V","Артём Л.","Компьютерная диагностика","3 500 ₽","done"],["Ford Focus","Ильяс Р.","Ремонт подвески","16 400 ₽","work"]])} data-pill={"{\"new\": \"Новый\", \"work\": \"В работе\", \"ok\": \"Оплачен\", \"ship\": \"Доставка\", \"wait\": \"Ожидает\", \"done\": \"Готово\", \"conf\": \"Подтверждён\", \"came\": \"Пришёл\", \"diag\": \"Диагностика\", \"part\": \"Ждёт запчасть\", \"show\": \"Показ\", \"dep\": \"Задаток\", \"deal\": \"Сделка\", \"lead\": \"Заявка\"}"} data-cycle={"[\"diag\", \"work\", \"part\", \"done\"]"} data-co="АвтоПрофи" data-label="CRM · автосервис" style={{ "--c": "#ea580c" }}>
                      <aside className="ck-side">
                        <div className="ck-logo"><b>CRM</b><span>АвтоПрофи</span></div>
                        <nav><i className="on"><u />Заказ-наряды</i><i><u />Клиенты</i><i><u />Запчасти</i><i><u />Посты</i><i><u />Отчёты</i></nav>
                        <div className="ck-user"><s>ВР</s><span>Виктор Р.<small>Мастер-приёмщик</small></span></div>
                      </aside>
                      <div className="ck-main">
                        <header className="ck-top">
                          <h4>Заказ-наряды</h4>
                          <span className="ck-search">Поиск по клиентам и заказам…</span>
                          <span className="ck-bell" />
                          <s>ВР</s>
                        </header>
                        <div className="ck-kpis">
                          <div><small>В работе</small><b>14</b><em>+3</em></div>
                          <div><small>Выручка</small><b>289 500 ₽</b><em>+9%</em></div>
                          <div><small>Средний чек</small><b>18 400 ₽</b><em>+6%</em></div>
                          <div><small>Ждут запчасти</small><b>5</b><em>−2</em></div>
                        </div>
                        <div className="ck-mid">
                          <div className="ck-chart">
                            <h5>Выручка по дням, тыс. ₽</h5>
                            <div className="ck-bars"><i style={{ "--h": "52%" }}><u>Пн</u></i><i style={{ "--h": "62%" }}><u>Вт</u></i><i style={{ "--h": "79%" }}><u>Ср</u></i><i style={{ "--h": "71%" }}><u>Чт</u></i><i style={{ "--h": "100%" }}><u>Пт</u></i><i style={{ "--h": "88%" }}><u>Сб</u></i><i style={{ "--h": "33%" }}><u>Вс</u></i></div>
                          </div>
                          <div className="ck-fun">
                            <h5>Этапы ремонта</h5>
                            <div><span>Приёмка</span><s><i style={{ width: "43%" }} /></s><b>6</b></div>
                            <div><span>Диагностика</span><s><i style={{ width: "36%" }} /></s><b>5</b></div>
                            <div><span>Ремонт</span><s><i style={{ width: "100%" }} /></s><b>14</b></div>
                            <div><span>Готово к выдаче</span><s><i style={{ width: "50%" }} /></s><b>7</b></div>
                          </div>
                        </div>
                        <div className="ck-table">
                          <div className="ck-h"><span>Авто</span><span>Клиент</span><span>Работы</span><span>Сумма</span><span>Статус</span></div>
                          <div className="ck-r"><span>Camry</span><span>Руслан А.</span><span>Замена ГРМ</span><span>42 000 ₽</span><span><em className="p-work">В работе</em></span></div>
                          <div className="ck-r"><span>Kia Rio</span><span>Сергей М.</span><span>ТО-2</span><span>14 500 ₽</span><span><em className="p-done">Готово</em></span></div>
                          <div className="ck-r"><span>BMW X5</span><span>Тимур Н.</span><span>Диагностика</span><span>6 000 ₽</span><span><em className="p-diag">Диагностика</em></span></div>
                          <div className="ck-r"><span>Solaris</span><span>Айдар К.</span><span>Колодки, диски</span><span>9 800 ₽</span><span><em className="p-part">Ждёт запчасть</em></span></div>
                        </div>
                      </div>
                    </div>
                    <div className="cm-slide cm-s-crm c4" data-kind="crm" data-pool={JSON.stringify([["1-к, ул. Абая","Назира К.","6 200 000 ₽","lead"],["Дом 220 м²","Сергей и Ольга П.","21 000 000 ₽","show"],["Офис 60 м²","ИП Алиев","8 700 000 ₽","dep"],["2-к, ЖК «Север»","Дина М.","10 400 000 ₽","lead"],["Участок 8 сот.","Руслан Е.","3 900 000 ₽","show"]])} data-pill={"{\"new\": \"Новый\", \"work\": \"В работе\", \"ok\": \"Оплачен\", \"ship\": \"Доставка\", \"wait\": \"Ожидает\", \"done\": \"Готово\", \"conf\": \"Подтверждён\", \"came\": \"Пришёл\", \"diag\": \"Диагностика\", \"part\": \"Ждёт запчасть\", \"show\": \"Показ\", \"dep\": \"Задаток\", \"deal\": \"Сделка\", \"lead\": \"Заявка\"}"} data-cycle={"[\"lead\", \"show\", \"dep\", \"deal\"]"} data-co="Новый Дом" data-label="CRM · агентство недвижимости" style={{ "--c": "#0d9488" }}>
                      <aside className="ck-side">
                        <div className="ck-logo"><b>CRM</b><span>Новый Дом</span></div>
                        <nav><i className="on"><u />Сделки</i><i><u />Клиенты</i><i><u />Объекты</i><i><u />Показы</i><i><u />Отчёты</i></nav>
                        <div className="ck-user"><s>МН</s><span>Марат Н.<small>Брокер</small></span></div>
                      </aside>
                      <div className="ck-main">
                        <header className="ck-top">
                          <h4>Сделки</h4>
                          <span className="ck-search">Поиск по клиентам и заказам…</span>
                          <span className="ck-bell" />
                          <s>МН</s>
                        </header>
                        <div className="ck-kpis">
                          <div><small>Активные сделки</small><b>47</b><em>+5</em></div>
                          <div><small>Комиссия</small><b>1 240 000 ₽</b><em>+14%</em></div>
                          <div><small>Показы на неделе</small><b>23</b><em>+4</em></div>
                          <div><small>Конверсия</small><b>11%</b><em>+1,2</em></div>
                        </div>
                        <div className="ck-mid">
                          <div className="ck-chart">
                            <h5>Новые заявки по дням</h5>
                            <div className="ck-bars"><i style={{ "--h": "50%" }}><u>Пн</u></i><i style={{ "--h": "67%" }}><u>Вт</u></i><i style={{ "--h": "44%" }}><u>Ср</u></i><i style={{ "--h": "83%" }}><u>Чт</u></i><i style={{ "--h": "100%" }}><u>Пт</u></i><i style={{ "--h": "61%" }}><u>Сб</u></i><i style={{ "--h": "33%" }}><u>Вс</u></i></div>
                          </div>
                          <div className="ck-fun">
                            <h5>Воронка сделок</h5>
                            <div><span>Заявка</span><s><i style={{ width: "100%" }} /></s><b>62</b></div>
                            <div><span>Показ</span><s><i style={{ width: "50%" }} /></s><b>31</b></div>
                            <div><span>Задаток</span><s><i style={{ width: "23%" }} /></s><b>14</b></div>
                            <div><span>Сделка</span><s><i style={{ width: "15%" }} /></s><b>9</b></div>
                          </div>
                        </div>
                        <div className="ck-table">
                          <div className="ck-h"><span>Объект</span><span>Клиент</span><span>Цена</span><span>Этап</span></div>
                          <div className="ck-r"><span>2-к, ЖК «Заря»</span><span>Алексей Р.</span><span>9 800 000 ₽</span><span><em className="p-show">Показ</em></span></div>
                          <div className="ck-r"><span>Студия, ул. Мира</span><span>Камила Ш.</span><span>5 400 000 ₽</span><span><em className="p-dep">Задаток</em></span></div>
                          <div className="ck-r"><span>Дом 140 м²</span><span>Игорь и Анна В.</span><span>14 200 000 ₽</span><span><em className="p-deal">Сделка</em></span></div>
                          <div className="ck-r"><span>3-к, ЖК «Парк»</span><span>Тимур Б.</span><span>12 600 000 ₽</span><span><em className="p-lead">Заявка</em></span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cm-bar"><span className="cm-lab" /><span className="cm-nav"><span className="cm-dots" /></span></div>
                  <i className="cm-sheen" />
                </div>
                <i className="cm-base" />
                <div className="cm-chip" aria-hidden="true"><i /><span /></div>
                <i className="cm-glare" />
              </div>
              {" "}
            </div>
            <div className="card-body">
              <span className="tag">Онлайн-магазин спортивной одежды</span>
              <h3><a className="card-link" href="gotovyj-internet-magazin.html">CRM-система для автоматизации и продаж</a></h3>
              <p className="teaser"><a className="card-link" href="gotovyj-internet-magazin.html">Наведем порядок в клиентской базе, автоматизируем рутину менеджеров и поможем не терять ни одной заявки.</a></p>
              <p><a className="card-link" href="gotovyj-internet-magazin.html">Наведем порядок в клиентской базе, автоматизируем рутину менеджеров и поможем не терять ни одной заявки.</a></p>
              <span className="card-toggle" role="button" tabIndex={0} aria-expanded="false"><span className="ct-text">Подробнее</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></span>
              <div className="card-more">
                <div className="card-more-in">
                  <div className="fit">
                    <b>Кому подойдёт</b>
                    <ul>
                      <li><strong>Производителям, брендам и поставщикам услуг (D2C / B2B).</strong> Для запуска прямых продаж напрямую через сайт, Telegram-бота или лид-формы, минуя сторонние площадки и сохраняя полный контроль над процессами.</li>
                      <li><strong>Компаниям с индивидуальными процессами.</strong> Для тех, кому не подходят шаблонные решения, и требуется гибкая автоматизация: от ведения сложных сделок и учета объектов до записи на услуги и контроля заявок.</li>
                      <li><strong>Растущему бизнесу с командой.</strong> Для предпринимателей, которые нанимают сотрудников и хотят безопасно разделять права доступа: менеджер видит только свои сделки и задачи, а владелец — всю прибыль.</li>
                    </ul>
                  </div>
                  <div className="card-foot">
                    <p className="price"><b>от 80 000 ₽</b><span className="term">от 7 дней</span><small>Точная стоимость обговаривается со специалистом</small></p>
                    <a className="go" href="gotovyj-internet-magazin.html">Открыть страницу с демо →</a>
                    <span className="more"><span className="more-text">Подробнее</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
