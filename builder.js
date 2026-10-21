(function () {
  var root = document.getElementById('builder');
  if (!root) return;
  var $ = function (id) { return document.getElementById(id); };
  var text = $('bsum-text'), list = $('bsum-list'), count = $('bsum-count');
  var openBtn = $('bsend-open'), form = $('bform'), err = $('bform-err'), done = $('bdone');
  var TG = 'https://t.me/Rasul_Develop';

  function vals(name) {
    return Array.prototype.map.call(root.querySelectorAll('input[name="' + name + '"]:checked'), function (i) { return i.value; });
  }
  function join(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' и ' + a[a.length - 1]; }

  function state() { return { what: vals('what')[0] || '', src: vals('src'), fn: vals('fn'), who: vals('who')[0] || '' }; }

  function render() {
    var s = state(), items = [];
    if (s.what) items.push('Принимает ' + s.what);
    if (s.src.length) items.push('Заявки приходят из ' + join(s.src));
    if (s.fn.length) items.push('Умеет: ' + join(s.fn));
    if (s.who) items.push('Работают: ' + s.who);
    list.innerHTML = '';
    items.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; list.appendChild(li); });
    text.textContent = s.what
      ? 'Приложение, которое принимает ' + s.what + (s.fn.length ? ' и ведёт их: ' + join(s.fn) + '.' : ' и ведёт их до результата.')
      : 'Выберите, что вы принимаете, и описание появится здесь.';
    var n = (s.what ? 1 : 0) + s.src.length + s.fn.length + (s.who ? 1 : 0);
    count.textContent = n ? 'Выбрано пунктов: ' + n : '';
    done.hidden = true;
  }

  function message(niche, contact) {
    var s = state(), l = ['Здравствуйте! Хочу приложение для оформления и учёта заявок.', 'Ниша: ' + niche];
    if (s.what) l.push('Принимаю: ' + s.what);
    if (s.src.length) l.push('Заявки приходят из: ' + join(s.src));
    if (s.fn.length) l.push('Функции: ' + join(s.fn));
    if (s.who) l.push('Кто работает: ' + s.who);
    if (contact) l.push('Связь: ' + contact);
    return l.join('\n');
  }

  root.addEventListener('change', render);
  openBtn.addEventListener('click', function () {
    form.hidden = false; openBtn.hidden = true; $('bniche').focus();
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var niche = $('bniche').value.trim();
    if (!niche) { err.hidden = false; $('bniche').focus(); return; }
    err.hidden = true;
    var msg = message(niche, $('bcontact').value.trim());
    try { if (navigator.clipboard) navigator.clipboard.writeText(msg); } catch (x) {}
    window.open(TG + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    done.hidden = false;
  });
  render();
})();
