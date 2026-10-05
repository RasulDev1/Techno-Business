// Переключатель темы: тёмная «Технологичный премиум» (styles.css) и светлая «Бизнес и надёжность»
(function () {
  var DARK = "styles.css?v=3", LIGHT = "themes/business-light.css?v=3";
  var link = document.getElementById("theme-css");
  var theme = "dark";
  try { if (localStorage.getItem("theme") === "light") theme = "light"; } catch (e) {}

  function apply(t) {
    theme = t;
    link.href = t === "light" ? LIGHT : DARK;
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", t === "light" ? "true" : "false");
      btn.querySelector("span").textContent = t === "light" ? "Тёмная тема" : "Светлая тема";
    }
  }
  if (theme === "light") apply("light");

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    apply(theme);
    btn.addEventListener("click", function () {
      var next = theme === "light" ? "dark" : "light";
      apply(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });
})();
