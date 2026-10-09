/* =====================================================================
   app.js — Boot, sidebar, header, onboarding, pengaturan, pencarian,
   pintasan keyboard, dan seluruh wiring UI.
   ===================================================================== */
(function (global) {
  'use strict';

  var D = document;
  function $(sel, root) { return (root || D).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || D).querySelectorAll(sel)); }

  /* ==================== BOOT ==================== */
  function boot() {
    var settings = TutorStore.getSettings();
    applySettingsToDom(settings);

    // kalau storage diblokir, beri tahu sekali (tanpa menakuti)
    if (!TutorStore.isAvailable()) {
      tutorToast('Catatan: penyimpanan lokal diblokir browser, progresmu tidak akan tersimpan.', 'error');
    }

    TutorStore.normalizeStreak();

    renderSidebar();
    updateHeader();

    // Onboarding
    if (!settings.onboarded) openOnboarding();

    // Router
    TutorRouter.start();

    // Bind global
    bindHeader();
    bindSidebarToggle();
    bindSettings();
    bindSearch();
    bindKeyboard();
    bindConfirmOnce();

    // Update UI saat progres berubah
    TutorEvents.on('progress:change', function () { if (global.evaluateBadges) evaluateBadges(); renderSidebar(); updateHeader(); });
    TutorEvents.on('xp', function () { updateHeader(); });
    TutorEvents.on('badge', function (e) {
      var b = (global.TutorBadges || []).filter(function (x) { return x.id === e.id; })[0];
      tutorToast((b ? b.icon + ' ' + b.title : 'Badge baru!') + ' terbuka', 'success');
    });
    TutorEvents.on('route', function () { highlightSidebarActive(); closeSidebarMobile(); });

    // Timer belajar: kumpulkan detik aktif saat tab terlihat
    startSessionTimer();

    // Safety: jangan sampai blank kalau ada error tak terduga
    window.addEventListener('error', function (ev) {
      console.error('[app] error global', ev.error || ev.message);
      try { tutorToast('Terjadi kesalahan tak terduga. Coba reload.', 'error'); } catch (e) {}
    });
  }

  /* ==================== APPLY SETTINGS KE DOM ==================== */
  function applySettingsToDom(s) {
    var html = D.documentElement;
    html.setAttribute('data-theme', s.theme === 'light' ? 'light' : 'dark');
    html.setAttribute('data-font', s.font || 'md');
    html.setAttribute('data-anim', s.anim ? 'on' : 'off');
    // warna meta theme-color biar mobile bar senada
    var mt = D.querySelector('meta[name="theme-color"]');
    if (!mt) { mt = D.createElement('meta'); mt.setAttribute('name', 'theme-color'); D.head.appendChild(mt); }
    mt.setAttribute('content', s.theme === 'light' ? '#f6f1e6' : '#0a0a0c');
  }

  /* ==================== HEADER ==================== */
  function updateHeader() {
    var p = TutorStore.getProgress();
    var ov = TutorData.overallProgress();
    var lv = TutorStore.levelFromXp(p.xp);
    $('#hpFill').style.width = ov.pct + '%';
    $('#hpPct').textContent = ov.pct + '%';
    $('#chipXpVal').textContent = p.xp;
    $('#chipLevelLabel').textContent = lv.name;
    $('#chipStreakVal').textContent = (p.streak && p.streak.current) || 0;
  }

  function bindHeader() {
    $('#btnTheme').addEventListener('click', toggleTheme);
    $('#btnSettings').addEventListener('click', openSettings);
    $('#btnSearch').addEventListener('click', openSearch);
    $('#btnShortcuts').addEventListener('click', openShortcuts);
    $$('.modal .icon-btn[data-close-modal]').forEach(function (b) {
      b.addEventListener('click', function () {
        var owner = b.closest('.modal');
        // Onboarding wajib diisi, tidak bisa ditutup lewat X
        if (owner && owner.id === 'modalOnboarding') return;
        closeAllModals();
      });
    });
    // tutup modal saat backdrop diklik (kecuali onboarding)
    $$('.modal').forEach(function (m) {
      m.addEventListener('click', function (e) {
        if (e.target !== m) return;
        if (m.id === 'modalOnboarding') return;
        closeAllModals();
      });
    });
  }

  function toggleTheme() {
    var s = TutorStore.getSettings();
    s.theme = s.theme === 'dark' ? 'light' : 'dark';
    TutorStore.saveSettings({ theme: s.theme });
    applySettingsToDom(s);
  }

  /* ==================== SIDEBAR ==================== */
  function renderSidebar() {
    var nav = $('#sidebarNav');
    if (!nav) return;
    var p = TutorStore.getProgress();
    var html = sidebarMenuHtml();
    TutorData.levels.forEach(function (lv) {
      var pr = TutorData.levelProgress(lv.id);
      var isOpen = pr.done > 0 || lv.id === 'level-1';
      html += '<div class="lv-group' + (isOpen ? ' open' : '') + '" data-lv="' + lv.id + '">';
      html += '<button class="lv-head" aria-expanded="' + isOpen + '" data-toggle-lv="' + lv.id + '">';
      html += '<span class="chev" aria-hidden="true">▸</span>';
      html += '<span class="lv-badge">' + (lv.num != null ? lv.num : '') + '</span>';
      html += '<span class="lv-title">' + TutorEngine.esc(lv.title) + '</span>';
      html += '<span class="lv-pct">' + pr.pct + '%</span>';
      html += '</button>';
      html += '<ul class="lv-lessons" role="list">';
      lv.lessons.forEach(function (ls) {
        var unlocked = TutorData.isUnlocked(lv.id, ls.id);
        var rec = p.lessons[lv.id + '/' + ls.id];
        var done = rec && (rec.completedAt || rec.quizPassed || rec.skipped);
        var started = rec && rec.startedAt && !done;
        var icon = !unlocked ? '🔒' : (done ? '✓' : (started ? '▸' : '○'));
        var cls = 'ls-status ' + (!unlocked ? 'lock' : (done ? 'done' : (started ? 'progress' : '')));
        html += '<li>';
        html += '<a class="ls-link' + (unlocked ? '' : ' locked') + '" ' +
                (unlocked ? 'href="#/' + lv.id + '/' + ls.id + '"' : 'href="#" aria-disabled="true"') + ' ' +
                'data-lv="' + lv.id + '" data-ls="' + ls.id + '">';
        html += '<span class="' + cls + '" aria-hidden="true">' + icon + '</span>';
        html += '<span class="ls-title">' + TutorEngine.esc(ls.title) + '</span>';
        if (done && rec.bestScore) html += '<span class="ls-score">' + rec.bestScore + '</span>';
        html += '</a></li>';
      });
      html += '</ul></div>';
    });
    nav.innerHTML = html;

    // bind menu atas (halaman pendukung)
    $$('[data-menu]', nav).forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); TutorRouter.go(a.getAttribute('data-menu')); });
    });

    // Bind toggle level (collapsible)
    $$('[data-toggle-lv]', nav).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var grp = btn.closest('.lv-group');
        var open = grp.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    // Cegah klik link terkunci
    $$('a.locked', nav).forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); tutorToast('Pelajaran masih terkunci. Selesaikan yang sebelumnya dulu.', 'error'); });
    });
    highlightSidebarActive();
  }

  function sidebarMenuHtml() {
    var hash = (location.hash || '').replace(/^#\//, '').split('/')[0];
    var items = [
      { k: '', ic: '🏠', t: 'Beranda' },
      { k: 'cheatsheet', ic: '📑', t: 'Cheat Sheet' },
      { k: 'glossary', ic: '📖', t: 'Glosarium' },
      { k: 'playground', ic: '🧪', t: 'Playground' },
      { k: 'review', ic: '🔁', t: 'Review' },
      { k: 'badges', ic: '🏆', t: 'Badge & Sertifikat' }
    ];
    var due = (TutorStore.reviewDue && TutorStore.reviewDue().length) || 0;
    return '<div class="sb-menu">' + items.map(function (it) {
      var active = (it.k === '' && (hash === '' || hash === 'home')) || hash === it.k;
      return '<a class="sb-menu-link' + (active ? ' active' : '') + '" href="#/' + it.k + '" data-menu="' + it.k + '">' +
        '<span class="sb-ic">' + it.ic + '</span><span>' + it.t + '</span>' +
        (it.k === 'review' && due ? '<span class="sb-due">' + due + '</span>' : '') + '</a>';
    }).join('') + '</div><div class="sb-sep"></div>';
  }

  function highlightSidebarActive() {
    var hash = (location.hash || '').replace(/^#/, '');
    var parts = hash.split('/').filter(Boolean);
    $$('a.ls-link').forEach(function (a) { a.classList.remove('active'); });
    if (parts.length >= 2) {
      var sel = 'a.ls-link[data-lv="' + parts[0] + '"][data-ls="' + parts[1] + '"]';
      var a = $(sel);
      if (a) {
        a.classList.add('active');
        var grp = a.closest('.lv-group');
        if (grp && !grp.classList.contains('open')) {
          grp.classList.add('open');
          var head = $('.lv-head', grp); if (head) head.setAttribute('aria-expanded', 'true');
        }
      }
    }
  }

  function bindSidebarToggle() {
    var btn = $('#btnHamburger'), bd = $('#sidebarBackdrop');
    btn.addEventListener('click', function () {
      var open = D.body.classList.toggle('sb-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      bd.hidden = !open;
    });
    bd.addEventListener('click', closeSidebarMobile);
  }
  function closeSidebarMobile() {
    if (window.innerWidth > 900) return;
    if (!D.body.classList.contains('sb-open')) return;
    D.body.classList.remove('sb-open');
    $('#sidebarBackdrop').hidden = true;
    $('#btnHamburger').setAttribute('aria-expanded', 'false');
  }

  /* ==================== ONBOARDING ==================== */
  function openOnboarding() {
    var m = $('#modalOnboarding');
    m.hidden = false;
    showObStep(1);
    $$('[data-ob-next]', m).forEach(function (b) {
      b.addEventListener('click', function () { showObStep(Number(b.getAttribute('data-ob-next'))); });
    });
    $$('[data-ob-back]', m).forEach(function (b) {
      b.addEventListener('click', function () { showObStep(Number(b.getAttribute('data-ob-back'))); });
    });
    var fin = $('#obFinish');
    if (fin.dataset.bound !== '1') {
      fin.dataset.bound = '1';
      fin.addEventListener('click', function () {
        var name = ($('#obName').value || '').trim();
        var exp = $('input[name="obExp"]:checked').value;
        var tgt = Number($('input[name="obTarget"]:checked').value);
        TutorStore.saveSettings({
          onboarded: true, name: name, experience: exp, targetMinutes: tgt
        });
        m.hidden = true;
        updateHeader();
        tutorToast('Senang berkenalan' + (name ? ', ' + name : '') + '. Mulai dari Pelajaran 1 ya!', 'success');
      });
    }
  }
  function showObStep(n) {
    $$('#modalOnboarding .ob-step').forEach(function (s) {
      s.hidden = Number(s.getAttribute('data-step')) !== n;
    });
    if (n === 1) setTimeout(function () { $('#obName').focus(); }, 50);
  }

  /* ==================== SETTINGS ==================== */
  function bindSettings() { /* tombol header sudah di-bind di bindHeader */ }
  function openSettings() {
    var m = $('#modalSettings');
    renderSettingsBody();
    m.hidden = false;
    setTimeout(function () { var f = $('.settings-body input, .settings-body select, .settings-body button'); if (f) f.focus(); }, 40);
  }

  function renderSettingsBody() {
    var s = TutorStore.getSettings();
    var p = TutorStore.getProgress();
    var lv = TutorStore.levelFromXp(p.xp);
    var body = $('#settingsBody');
    body.innerHTML =
      rowText('Nama', 'Dipakai untuk menyapa di Beranda dan sertifikat.', 'name', s.name, 24) +
      rowSelect('Tema', 'Gelap untuk malam hari, terang untuk siang.', 'theme', [
        { v: 'dark', l: 'Gelap' }, { v: 'light', l: 'Terang' }
      ], s.theme) +
      rowSelect('Ukuran font', 'Sesuaikan kenyamanan matamu.', 'font', [
        { v: 'sm', l: 'Kecil' }, { v: 'md', l: 'Sedang' }, { v: 'lg', l: 'Besar' }
      ], s.font) +
      rowNumber('Ambang lulus quiz (%)', 'Minimal skor agar pelajaran berikutnya terbuka.', 'passScore', s.passScore, 40, 100) +
      rowToggle('Timer quiz', 'Opsional. Mati secara default supaya kamu tenang.', 'quizTimer', s.quizTimer) +
      rowToggle('Animasi', 'Kalau kamu merasa pusing dengan gerak, matikan.', 'anim', s.anim) +
      rowToggle('Bunyi efek', 'Nanti di Tahap 3 (belum ada suara hari ini).', 'sound', s.sound) +

      '<hr style="border:0;border-top:1px solid var(--border);margin:8px 0"/>' +

      '<div class="set-row"><div class="sr-label"><strong>Data progres</strong>' +
        '<small>XP: ' + p.xp + ' · Level ' + lv.index + ' (' + TutorEngine.esc(lv.name) + ')' +
        (lv.next ? ' · ' + (lv.next - p.xp) + ' XP lagi menuju level berikutnya' : '') + '</small></div>' +
        '<div class="btn-row" style="margin:0">' +
          '<button class="btn btn-ghost" id="btnExport">Ekspor JSON</button>' +
          '<button class="btn btn-ghost" id="btnImport">Impor JSON</button>' +
          '<button class="btn btn-danger" id="btnReset">Reset progres</button>' +
        '</div>' +
        '<input type="file" id="importFile" accept="application/json" class="visually-hidden" />' +
      '</div>' +

      '<p class="muted" style="font-size:.8rem">Semua data disimpan di perangkat ini saja (localStorage). Tidak ada server, tidak ada akun.</p>';

    // Bind
    $$('.set-row input, .set-row select, .switch', body).forEach(function (el) {
      var k = el.getAttribute('data-k'); if (!k) return;
      el.addEventListener('change', onSettingChange);
      el.addEventListener('input', onSettingChange);
    });
    $$('.switch', body).forEach(function (sw) {
      sw.addEventListener('click', function () {
        var k = sw.getAttribute('data-k');
        var cur = TutorStore.getSettings()[k];
        TutorStore.saveSettings(setObj(k, !cur));
        applySettingsToDom(TutorStore.getSettings());
        renderSettingsBody();
        tutorToast('Pengaturan disimpan.', 'success');
      });
    });
    var ex = $('#btnExport'); if (ex) ex.addEventListener('click', doExport);
    var im = $('#btnImport'); if (im) im.addEventListener('click', function () { $('#importFile').click(); });
    var imf = $('#importFile'); if (imf) imf.addEventListener('change', doImport);
    var rs = $('#btnReset'); if (rs) rs.addEventListener('click', function () {
      confirmDialog({
        title: 'Hapus seluruh progres?',
        body: 'Semua XP, badge, dan catatan akan hilang. Tindakan ini tidak bisa dibatalkan. Kalau ragu, ekspor dulu.',
        okLabel: 'Ya, hapus semuanya'
      }).then(function (yes) {
        if (!yes) return;
        return confirmDialog({ title: 'Yakin yakin yakin?', body: 'Klik "Ya" sekali lagi untuk menghapus.', okLabel: 'Ya, hapus' });
      }).then(function (yes2) {
        if (!yes2) return;
        TutorStore.resetAll();
        location.hash = '#/';
        D.body.classList.remove('sb-open');
        boot();
        tutorToast('Progres direset. Selamat datang kembali di garis start.', 'success');
      });
    });
  }

  function setObj(k, v) { var o = {}; o[k] = v; return o; }
  function onSettingChange(e) {
    var el = e.target;
    var k = el.getAttribute('data-k'); if (!k) return;
    var v;
    if (el.type === 'number') v = Number(el.value);
    else if (el.type === 'checkbox') v = el.checked;
    else v = el.value;
    TutorStore.saveSettings(setObj(k, v));
    applySettingsToDom(TutorStore.getSettings());
    updateHeader();
  }

  function rowText(label, hint, key, val, max) {
    return '<div class="set-row">' +
      '<div class="sr-label"><strong>' + label + '</strong><small>' + hint + '</small></div>' +
      '<input type="text" data-k="' + key + '" value="' + TutorEngine.esc(val || '') + '" maxlength="' + (max || 40) + '" style="width:220px;padding:8px 12px;background:var(--bg-2);color:var(--text);border:1px solid var(--border-strong);border-radius:var(--r-md);font:inherit" />' +
    '</div>';
  }
  function rowNumber(label, hint, key, val, min, max) {
    return '<div class="set-row">' +
      '<div class="sr-label"><strong>' + label + '</strong><small>' + hint + '</small></div>' +
      '<input type="number" data-k="' + key + '" value="' + val + '" min="' + min + '" max="' + max + '" step="5" style="width:100px;padding:8px 12px;background:var(--bg-2);color:var(--text);border:1px solid var(--border-strong);border-radius:var(--r-md);font:inherit" />' +
    '</div>';
  }
  function rowSelect(label, hint, key, opts, val) {
    var html = '<div class="set-row"><div class="sr-label"><strong>' + label + '</strong><small>' + hint + '</small></div><select class="select-inline" data-k="' + key + '">';
    opts.forEach(function (o) { html += '<option value="' + o.v + '"' + (o.v === val ? ' selected' : '') + '>' + o.l + '</option>'; });
    html += '</select></div>';
    return html;
  }
  function rowToggle(label, hint, key, val) {
    return '<div class="set-row"><div class="sr-label"><strong>' + label + '</strong><small>' + hint + '</small></div>' +
      '<button class="switch' + (val ? ' on' : '') + '" data-k="' + key + '" role="switch" aria-checked="' + (val ? 'true' : 'false') + '" aria-label="' + label + '"></button></div>';
  }

  function doExport() {
    try {
      var data = TutorStore.exportAll();
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = D.createElement('a');
      var d = new Date();
      var fname = 'nolkehtml-backup-' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '.json';
      a.href = url; a.download = fname; a.click();
      setTimeout(function () { URL.revokeObjectURL(url); }, 500);
      tutorToast('Backup diunduh: ' + fname, 'success');
    } catch (e) {
      tutorToast('Gagal mengekspor: ' + e.message, 'error');
    }
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function doImport(ev) {
    var f = ev.target.files && ev.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var obj = JSON.parse(r.result);
        confirmDialog({ title: 'Ganti progres dengan file ini?', body: 'Progres sekarang akan ditimpa oleh isi file backup.', okLabel: 'Ya, impor' }).then(function (yes) {
          if (!yes) return;
          TutorStore.importAll(obj);
          renderSidebar(); updateHeader(); renderSettingsBody();
          tutorToast('Progres diimpor.', 'success');
        });
      } catch (e) {
        tutorToast('File tidak valid: ' + e.message, 'error');
      }
    };
    r.readAsText(f);
    ev.target.value = '';
  }

  /* ==================== PENCARIAN (Ctrl+K) ==================== */
  function bindSearch() {
    var ov = $('#searchOverlay');
    ov.addEventListener('click', function (e) { if (e.target === ov) closeSearch(); });
    var input = $('#searchInput');
    input.addEventListener('input', doSearch);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeSearch(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); activateSel(); }
    });
  }
  function openSearch() {
    $('#searchOverlay').hidden = false;
    $('#searchInput').value = '';
    doSearch();
    setTimeout(function () { $('#searchInput').focus(); }, 30);
  }
  function closeSearch() { $('#searchOverlay').hidden = true; }

  var _results = [];
  function doSearch() {
    var q = ($('#searchInput').value || '').toLowerCase().trim();
    var list = $('#searchResults');
    if (!q) { list.innerHTML = '<li class="muted" style="pointer-events:none">Ketik minimal 2 huruf untuk mencari pelajaran.</li>'; _results = []; return; }
    var out = [];
    TutorData.flat.forEach(function (f) {
      var hay = (f.level.title + ' ' + f.lesson.title + ' ' + flattenReading(f.lesson.reading)).toLowerCase();
      if (hay.indexOf(q) !== -1) {
        var snippet = makeSnippet(flattenReading(f.lesson.reading), q);
        out.push({
          levelId: f.levelId, lessonId: f.lessonId,
          title: f.lesson.title,
          sub: f.level.title + (snippet ? ' — …' + snippet + '…' : ''),
          unlocked: TutorData.isUnlocked(f.levelId, f.lessonId)
        });
      }
    });
    _results = out.slice(0, 20);
    if (!_results.length) {
      list.innerHTML = '<li class="muted" style="pointer-events:none">Tidak ada pelajaran yang cocok.</li>';
      return;
    }
    list.innerHTML = _results.map(function (r, i) {
      return '<li role="option" data-i="' + i + '" class="' + (i === 0 ? 'sel' : '') + (r.unlocked ? '' : ' locked') + '" aria-disabled="' + (!r.unlocked) + '">' +
        '<strong>' + TutorEngine.esc(r.title) + '</strong><small>' + TutorEngine.esc(r.sub) + (r.unlocked ? '' : ' · 🔒 masih terkunci') + '</small>' +
      '</li>';
    }).join('');
    $$('#searchResults li[data-i]').forEach(function (li) {
      li.addEventListener('click', function () {
        var i = Number(li.getAttribute('data-i'));
        openResult(_results[i]);
      });
    });
  }
  function moveSel(d) {
    var lis = $$('#searchResults li[data-i]'); if (!lis.length) return;
    var cur = lis.findIndex(function (l) { return l.classList.contains('sel'); });
    if (cur < 0) cur = 0;
    var ni = Math.max(0, Math.min(lis.length - 1, cur + d));
    lis.forEach(function (l) { l.classList.remove('sel'); });
    lis[ni].classList.add('sel');
    lis[ni].scrollIntoView({ block: 'nearest' });
  }
  function activateSel() {
    var li = $('#searchResults li.sel'); if (!li) return;
    openResult(_results[Number(li.getAttribute('data-i'))]);
  }
  function openResult(r) {
    if (!r) return;
    if (!r.unlocked) { tutorToast('Pelajaran masih terkunci.', 'error'); return; }
    closeSearch();
    location.hash = '#/' + r.levelId + '/' + r.lessonId;
  }
  function flattenReading(blocks) {
    return (blocks || []).map(function (b) {
      var t = (b.text || b.html || b.code || '') + ((b.items || []).join(' '));
      return String(t).replace(/<[^>]+>/g, ' ');
    }).join(' ');
  }
  function makeSnippet(text, q) {
    var i = text.toLowerCase().indexOf(q);
    if (i < 0) return '';
    var a = Math.max(0, i - 30), b = Math.min(text.length, i + q.length + 40);
    return text.slice(a, b).trim();
  }

  /* ==================== SHORTCUTS MODAL ==================== */
  function openShortcuts() { $('#modalShortcuts').hidden = false; }

  /* ==================== CONFIRM DIALOG ==================== */
  // Resolver tunggal supaya X / Batal / backdrop / Ya sama-sama menutup promise.
  var _cfResolve = null;
  function _cfSettle(v) {
    var m = $('#modalConfirm');
    if (!m.hidden) m.hidden = true;
    var r = _cfResolve; _cfResolve = null;
    if (typeof r === 'function') r(v);
  }
  function bindConfirmOnce() {
    var m = $('#modalConfirm');
    var ok = $('#cfOk');
    ok.addEventListener('click', function () { _cfSettle(true); });
    $$('[data-close-modal]', m).forEach(function (b) {
      b.addEventListener('click', function () { _cfSettle(false); });
    });
    m.addEventListener('click', function (e) { if (e.target === m) _cfSettle(false); });
  }
  function confirmDialog(opt) {
    $('#cfTitle').textContent = opt.title || 'Konfirmasi';
    $('#cfBody').textContent = opt.body || '';
    $('#cfOk').textContent = opt.okLabel || 'Ya';
    $('#modalConfirm').hidden = false;
    setTimeout(function () { $('#cfOk').focus(); }, 40);
    return new Promise(function (res) { _cfResolve = res; });
  }
  global.tutorConfirm = confirmDialog;

  function closeAllModals() {
    // Kalau modal konfirmasi sedang terbuka (atau ada promise pending), anggap user membatalkan.
    if (_cfResolve || !$('#modalConfirm').hidden) _cfSettle(false);
    $$('.modal').forEach(function (m) { if (m.id !== 'modalOnboarding' || TutorStore.getSettings().onboarded) m.hidden = true; });
    $('#searchOverlay').hidden = true;
  }

  /* ==================== KEYBOARD ==================== */
  function bindKeyboard() {
    D.addEventListener('keydown', function (e) {
      // lewati saat mengetik di input/textarea/contenteditable
      var t = e.target;
      var isField = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); openSearch(); return;
      }
      if (e.key === 'Escape') {
        if (!$('#searchOverlay').hidden) { closeSearch(); return; }
        closeAllModals(); return;
      }
      if (isField) return;

      if (e.key === '?') { e.preventDefault(); openShortcuts(); return; }
      if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // jangan aktifkan saat modal terbuka
        if (!D.querySelector('.modal:not([hidden])')) toggleTheme();
        return;
      }
      // navigasi ← / → saat di halaman pelajaran (bukan saat modal terbuka)
      if (D.querySelector('.modal:not([hidden])') || !$('#searchOverlay').hidden) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        var hash = (location.hash || '').replace(/^#/, '');
        var parts = hash.split('/').filter(Boolean);
        if (parts.length < 2) return;
        var lvId = parts[0], lsId = parts[1];
        var n = e.key === 'ArrowRight' ? TutorData.nextOf(lvId, lsId) : TutorData.prevOf(lvId, lsId);
        if (n && TutorData.isUnlocked(n.levelId, n.lessonId)) {
          location.hash = '#/' + n.levelId + '/' + n.lessonId;
        } else if (n) {
          tutorToast('Pelajaran ' + (e.key === 'ArrowRight' ? 'berikutnya' : 'sebelumnya') + ' masih terkunci.', 'error');
        }
      }
    });
  }

  /* ==================== TIMER AKTIF ==================== */
  function startSessionTimer() {
    var visible = !D.hidden;
    var last = Date.now();
    function tick() {
      var now = Date.now();
      var dt = Math.round((now - last) / 1000);
      last = now;
      if (visible && dt > 0 && dt < 60) {
        var p = TutorStore.getProgress();
        p.timeSpentSec = (p.timeSpentSec || 0) + dt;
        // hemat: tulis paling sering tiap 10 detik sekali
        if (!tick._acc) tick._acc = 0;
        tick._acc += dt;
        if (tick._acc >= 10) { TutorStore.saveProgress({ timeSpentSec: p.timeSpentSec }); tick._acc = 0; }
      }
    }
    D.addEventListener('visibilitychange', function () { visible = !D.hidden; last = Date.now(); });
    setInterval(tick, 5000);
  }

  /* ==================== GO ==================== */
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot);
  else boot();

  global.TutorApp = { boot: boot, closeAllModals: closeAllModals, renderSidebar: renderSidebar, updateHeader: updateHeader };
})(window);
