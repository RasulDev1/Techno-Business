// Демо-версия: звонки, почта и мессенджеры отключены, вместо перехода — подсказка
(function () {
  var BLOCK = /^(tel:|mailto:|sms:|https?:\/\/(t\.me|telegram\.me|wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\b)/i;
  var toast, timer;
  function show() {
    if (!toast) {
      toast = document.createElement('div');
      toast.setAttribute('role', 'status');
      toast.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;background:#141414;color:#fff;border:2px solid #FFD400;border-radius:10px;padding:12px 18px;font:600 15px/1.4 Manrope,system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.3);max-width:calc(100% - 32px);text-align:center;transition:opacity .2s';
      document.body.appendChild(toast);
    }
    toast.textContent = 'В демо-версии звонки, почта и мессенджеры отключены';
    toast.style.opacity = '1';
    clearTimeout(timer);
    timer = setTimeout(function () { toast.style.opacity = '0'; }, 2200);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (a && BLOCK.test(a.getAttribute('href'))) { e.preventDefault(); e.stopPropagation(); show(); }
  }, true);
})();
