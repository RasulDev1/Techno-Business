// Оживление страниц сайта. Вызывается один раз после того, как React подхватил разметку (components/SiteScripts.tsx).
// Порядок тот же, что в прежнем script.js: от него зависят случайные данные журнала и раскладка при запуске.
import { initCarousels } from "./carousels";
import { initLedger } from "./ledger";
import {
  initDesktopCards, initFeatureVideos, initHeroCounters, initMobileContactBar, initMockForm,
  initPhoneCardMore, initPhoneDemoFit, initPhoneTabs, initSingleVideo,
} from "./page";
import { initPremium } from "./premium";
import { initResultsZoom } from "./results";

const STEPS: [name: string, run: () => void][] = [
  ["журнал заявок", initLedger],
  ["счётчики", initHeroCounters],
  ["макет формы", initMockForm],
  ["карточки на телефоне", initPhoneCardMore],
  ["макет сайта на телефоне", initPhoneDemoFit],
  ["видео", initFeatureVideos],
  ["панель связи", initMobileContactBar],
  ["одно видео за раз", initSingleVideo],
  ["вкладки", initPhoneTabs],
  ["премиум-режим", initPremium],
  ["карусели", initCarousels],
  ["преимущества", initResultsZoom],
  ["карточки решений", initDesktopCards],
];

let started = false;

export function initSite() {
  if (started) return;
  started = true;
  // ошибка в одной части не должна останавливать остальные
  for (const [name, run] of STEPS) {
    try {
      run();
    } catch (err) {
      console.error("Не запустилось: " + name, err);
    }
  }
}
