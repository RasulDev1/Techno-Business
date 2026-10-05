// Выбор темы: «Технологичный премиум», «Синий океан», «Технологичный графит» и «Светлая 2»
(function () {
  var THEMES = {
    dark: "styles.css?v=5",
    ocean: "themes/ocean-light.css?v=5",
    graphite: "themes/graphite.css?v=5",
    light2: "themes/light-2.css?v=5",
  };
  var link = document.getElementById("theme-css");
  var theme = "dark";
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light") saved = "ocean";
    if (THEMES[saved]) theme = saved;
  } catch (e) {}

  function apply(t) {
    theme = t;
    if (link.getAttribute("href") !== THEMES[t]) link.href = THEMES[t];
    document.querySelectorAll(".theme-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.theme === t ? "true" : "false");
    });
  }
  if (theme !== "dark") apply(theme);

  document.addEventListener("DOMContentLoaded", function () {
    apply(theme);
    document.querySelectorAll(".theme-switch button").forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.dataset.theme);
        try { localStorage.setItem("theme", b.dataset.theme); } catch (e) {}
      });
    });
  });
})();
