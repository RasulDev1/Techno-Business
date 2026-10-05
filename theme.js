// Выбор темы: «Океан» (основная, styles.css) или «Светлая» (themes/light.css)
(function () {
  var THEMES = { ocean: "styles.css?v=7", light: "themes/light.css?v=7" };
  var link = document.getElementById("theme-css");
  var theme = "ocean";
  try { if (localStorage.getItem("theme2") === "light") theme = "light"; } catch (e) {}

  function apply(t) {
    theme = t;
    if (link.getAttribute("href") !== THEMES[t]) link.href = THEMES[t];
    document.querySelectorAll(".theme-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.theme === t ? "true" : "false");
    });
  }
  if (theme !== "ocean") apply(theme);

  document.addEventListener("DOMContentLoaded", function () {
    apply(theme);
    document.querySelectorAll(".theme-switch button").forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.dataset.theme);
        try { localStorage.setItem("theme2", b.dataset.theme); } catch (e) {}
      });
    });
  });
})();
