/* =====================================================================
   engine.js — Router berbasis hash + renderer seluruh halaman.
   Tahap 2+: pelajaran punya 4 tahap (BACA → COBA → QUIZ → HASIL) memakai
   TutorEditor.ChallengeView dan TutorQuiz.QuizView.
   ===================================================================== */
(function (global) {
  'use strict';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* -------- Escape & sanitasi -------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  var ALLOW_TAGS = { A: 1, EM: 1, STRONG: 1, B: 1, I: 1, CODE: 1, KBD: 1, BR: 1, SPAN: 1, SMALL: 1 };
  var ALLOW_ATTR = { A: ['href', 'target', 'rel', 'title'], SPAN: ['class', 'title'], KBD: ['class'], CODE: ['class'] };
  function safeInline(html) {
    var doc = new DOMParser().parseFromString('<body>' + String(html || '') + '</body>', 'text/html');
    var frag = document.createDocumentFragment();
    (function walk(src, dst) {
      for (var i = 0; i < src.childNodes.length; i++) {
        var n = src.childNodes[i];
        if (n.nodeType === 3) { dst.appendChild(document.createTextNode(n.nodeValue)); continue; }
        if (n.nodeType !== 1) continue;
        var tag = n.tagName;
        if (!ALLOW_TAGS[tag]) { dst.appendChild(document.createTextNode(n.textContent)); continue; }
        var el = document.createElement(tag.toLowerCase());
        var allowed = ALLOW_ATTR[tag] || [];
        for (var j = 0; j < allowed.length; j++) {
          var a = allowed[j];
          if (n.hasAttribute(a)) { var v = n.getAttribute(a); if (a === 'href' && /^\s*javascript:/i.test(v)) continue; el.setAttribute(a, v); }
        }
        if (tag === 'A') { el.setAttribute('rel', 'noopener noreferrer'); el.setAttribute('target', '_blank'); }
        walk(n, el); dst.appendChild(el);
      }
    })(doc.body, frag);
    return frag;
  }

  /* -------- Render blok reading -------- */
  function renderReading(blocks) {
    var wrap = document.createElement('div'); wrap.className = 'reading';
    (blocks || []).forEach(function (b) {
      if (!b || !b.type) return;
      if (b.type === 'h2' || b.type === 'h3') { var h = document.createElement(b.type); h.textContent = b.text || ''; wrap.appendChild(h); }
      else if (b.type === 'p') { var p = document.createElement('p'); p.appendChild(safeInline(b.html || b.text || '')); wrap.appendChild(p); }
      else if (b.type === 'list') {
        var list = document.createElement(b.ordered ? 'ol' : 'ul');
        (b.items || []).forEach(function (it) { var li = document.createElement('li'); li.appendChild(safeInline(it)); list.appendChild(li); });
        wrap.appendChild(list);
      } else if (b.type === 'code') {
        var pre = document.createElement('pre'); var code = document.createElement('code');
        code.textContent = b.code || ''; if (b.lang) code.setAttribute('data-lang', b.lang); pre.appendChild(code);
        var btn = document.createElement('button'); btn.className = 'copy-btn'; btn.type = 'button'; btn.textContent = 'Salin';
        btn.setAttribute('aria-label', 'Salin potongan kode ini');
        btn.addEventListener('click', function () { copyText(b.code || ''); toast('Kode disalin', 'success'); });
        pre.appendChild(btn); wrap.appendChild(pre);
      } else if (b.type === 'callout') {
        var co = document.createElement('div'); co.className = 'callout' + (b.variant === 'warn' ? ' callout--warn' : '');
        var t = document.createElement('span'); t.className = 'co-title'; t.textContent = b.title || 'Catatan';
        var body = document.createElement('div'); body.appendChild(safeInline(b.html || b.text || ''));
        co.appendChild(t); co.appendChild(body); wrap.appendChild(co);
      } else if (b.type === 'term') {
        var box = document.createElement('div'); box.className = 'callout';
        box.innerHTML = '<span class="co-title">' + esc(b.word) + '</span> — ' + esc(b.meaning); wrap.appendChild(box);
      }
    });
    return wrap;
  }

  function copyText(t) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).catch(function () { legacyCopy(t); });
    else legacyCopy(t);
  }
  function legacyCopy(t) {
    var ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta);
  }

  function toast(msg, kind) {
    var wrap = document.getElementById('toastWrap'); if (!wrap) return;
    var el = document.createElement('div'); el.className = 'toast' + (kind ? ' ' + kind : ''); el.setAttribute('role', 'status'); el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(function () { el.classList.add('out'); }, 2600);
    setTimeout(function () { el.remove(); }, 3000);
  }
  global.tutorToast = toast;

  /* ======== Router ======== */
  var Router = {
    routes: {},
    on: function (p, h) { this.routes[p] = h; return this; },
    start: function () { var s = this; window.addEventListener('hashchange', function () { s.resolve(); }); this.resolve(); },
    resolve: function () {
      var hash = (location.hash || '#/').replace(/^#/, '');
      if (hash.length > 1 && hash.endsWith('/')) hash = hash.slice(0, -1);
      var parts = hash.split('/').filter(Boolean);
      var view = parts[0] || 'home';
      var handler = this.routes[view] || this.routes['*'];
      try { if (!handler) throw new Error('tidak ada handler untuk ' + view); handler(parts.slice(1)); }
      catch (err) { console.error('[router] error', err); renderError(err); }
      global.TutorEvents && global.TutorEvents.emit('route', { view: view, args: parts.slice(1), hash: hash });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    go: function (path) { if (path === undefined) path = '/'; if (path[0] !== '/') path = '/' + path; location.hash = '#' + path; }
  };
  global.TutorRouter = Router;

  function setMain(html) {
    var main = document.getElementById('main'); if (!main) return;
    main.innerHTML = ''; if (typeof html === 'string') main.innerHTML = html; else main.appendChild(html);
    main.focus({ preventScroll: true });
  }
  function renderError(err) {
    var wrap = document.createElement('div'); wrap.className = 'empty-state';
    wrap.innerHTML = '<div class="es-emoji">🧯</div><h2>Ada yang tidak beres</h2><p>' + esc(err && err.message ? err.message : 'Kesalahan tak terduga.') + '</p>' +
      '<p class="muted">Coba kembali ke <a href="#/">Beranda</a>. Progresmu tetap aman.</p>';
    setMain(wrap);
  }

  /* ======== VIEW: HOME ======== */
  function viewHome() {
    var s = TutorStore.getSettings(), p = TutorStore.getProgress();
    var ov = TutorData.overallProgress(), lv = TutorStore.levelFromXp(p.xp), last = TutorData.lastTouched();
    var hour = new Date().getHours();
    var greet = hour < 4 ? 'Masih begadang' : hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 19 ? 'Selamat sore' : 'Selamat malam';
    var mins = Math.floor((p.timeSpentSec || 0) / 60), hrs = Math.floor(mins / 60);
    var timeLabel = hrs > 0 ? (hrs + ' jam ' + (mins % 60) + ' menit') : (mins + ' menit');
    var acc = p.totalAnswers ? Math.round(p.correctAnswers / p.totalAnswers * 100) : 0;
    var badgeCount = Object.keys(p.badges || {}).length;

    var html = '' +
      '<div class="page-title-row"><div><p class="page-kicker">Beranda</p>' +
      '<h1>' + esc(greet) + (s.name ? ', ' + esc(s.name) : '') + '.</h1>' +
      '<p class="lede">' + (ov.done === 0
        ? 'Kamu berada di garis start. Kita mulai dari yang paling sederhana: satu baris HTML, lalu kamu lihat hasilnya di browser.'
        : 'Kamu sudah menyelesaikan <strong>' + ov.done + '</strong> dari <strong>' + ov.total + '</strong> pelajaran (' + ov.pct + '%). Ambil tempatmu lagi.') + '</p></div></div>' +
      '<section class="hero"><h2>' + (ov.done === 0 ? 'Siap menulis kode pertamamu?' : 'Lanjutkan perjalananmu') + '</h2>' +
      '<p class="lede">' + (last ? 'Terakhir kamu di <strong>' + esc(last.level.title) + ' — ' + esc(last.lesson.title) + '</strong>.' : 'Mulai dari Pelajaran 1.1.') + '</p>' +
      '<div class="cta-row"><a class="btn btn-primary" href="#/level-1/l1-1" id="ctaStart">' + (ov.done === 0 ? 'Mulai dari awal →' : 'Lanjutkan belajar →') + '</a>' +
      (last && ov.done > 0 ? '<a class="btn btn-ghost" href="#/' + esc(last.levelId) + '/' + esc(last.lessonId) + '">Ke pelajaran terakhir</a>' : '') + '</div></section>' +
      '<div class="grid grid-3" style="margin:24px 0"><div class="stat"><span class="stat-num">' + p.xp + '</span><span class="stat-lbl">XP · ' + esc(lv.name) + '</span></div>' +
      '<div class="stat"><span class="stat-num">' + ((p.streak && p.streak.current) || 0) + '</span><span class="stat-lbl">Hari beruntun</span></div>' +
      '<div class="stat"><span class="stat-num">' + esc(timeLabel) + '</span><span class="stat-lbl">Total waktu</span></div>' +
      '<div class="stat"><span class="stat-num">' + (p.quizzesTaken || 0) + '</span><span class="stat-lbl">Quiz dikerjakan</span></div>' +
      '<div class="stat"><span class="stat-num">' + acc + '%</span><span class="stat-lbl">Akurasi</span></div>' +
      '<div class="stat"><span class="stat-num">' + badgeCount + '</span><span class="stat-lbl">Badge didapat</span></div></div>' +
      '<h2 style="margin-top:24px">Kurikulum</h2><div class="grid grid-2">' + curriculumGridHtml() + '</div>' +
      '<h2 style="margin-top:32px">Jalan pintas</h2><div class="grid grid-3">' +
      '<a class="card level-card" href="#/cheatsheet"><h3>📑 Cheat Sheet</h3><p class="lc-sub">Referensi cepat tag, CSS, JS.</p></a>' +
      '<a class="card level-card" href="#/glossary"><h3>📖 Glosarium</h3><p class="lc-sub">Kamus istilah dengan bahasa sederhana.</p></a>' +
      '<a class="card level-card" href="#/playground"><h3>🧪 Playground</h3><p class="lc-sub">Editor bebas untuk eksperimen.</p></a>' +
      '<a class="card level-card" href="#/review"><h3>🔁 Review</h3><p class="lc-sub">Latih ulang soal yang pernah salah.</p></a>' +
      '<a class="card level-card" href="#/badges"><h3>🏆 Badge & Sertifikat</h3><p class="lc-sub">Lihat koleksi dan cetak sertifikat.</p></a>' +
      '</div>';
    setMain(html);
    var btn = $('#ctaStart');
    if (btn && last && ov.done > 0) { btn.setAttribute('href', '#/' + last.levelId + '/' + last.lessonId); btn.textContent = 'Lanjutkan: ' + last.lesson.title; }
  }
  function curriculumGridHtml() {
    return TutorData.levels.map(function (lv) {
      var pr = TutorData.levelProgress(lv.id), isOpen = pr.done > 0 || lv.id === 'level-1';
      return '<a class="card level-card" href="#/' + esc(lv.id) + '"' + (isOpen ? '' : ' style="opacity:.55"') + '>' +
        '<div class="lc-head"><span class="lc-num">' + (lv.num != null ? lv.num : '') + '</span>' +
        '<div style="flex:1"><h3>' + esc(lv.title) + '</h3><p class="lc-sub">' + esc(lv.subtitle || '') + '</p></div></div>' +
        '<div class="lc-progress"><div style="width:' + pr.pct + '%"></div></div>' +
        '<small class="muted">' + pr.done + '/' + pr.total + ' pelajaran · ' + pr.pct + '%</small></a>';
    }).join('');
  }

  /* ======== VIEW: LEVEL ======== */
  function viewLevel(args) {
    var lv = TutorData.getLevel(args[0]);
    if (!lv) { view404(); return; }
    var pr = TutorData.levelProgress(lv.id);
    var rows = lv.lessons.map(function (ls, i) {
      var unlocked = TutorData.isUnlocked(lv.id, ls.id);
      var rec = TutorStore.getProgress().lessons[lv.id + '/' + ls.id];
      var done = rec && (rec.completedAt || rec.quizPassed || rec.skipped);
      var status = !unlocked ? '🔒' : (done ? '✓' : (rec && rec.startedAt ? '▸' : '○'));
      return '<a class="ls-link' + (unlocked ? '' : ' locked') + '" href="' + (unlocked ? '#/' + lv.id + '/' + ls.id : '#/' + lv.id) + '">' +
        '<span class="ls-status ' + (!unlocked ? 'lock' : done ? 'done' : (rec && rec.startedAt ? 'progress' : '')) + '">' + status + '</span>' +
        '<span class="ls-title">' + (i + 1) + '. ' + esc(ls.title) + '</span>' +
        (done && rec.bestScore ? '<span class="ls-score">' + rec.bestScore + '%</span>' : '') +
        '<span class="muted" style="font-size:.75rem">±' + ls.minutes + 'm</span></a>';
    }).join('');
    setMain('<div class="page-title-row"><div><p class="page-kicker">Level ' + lv.num + '</p><h1>' + esc(lv.title) + '</h1>' +
      '<p class="lede">' + esc(lv.subtitle || '') + '</p></div>' +
      '<div class="stat"><span class="stat-num">' + pr.pct + '%</span><span class="stat-lbl">Selesai ' + pr.done + '/' + pr.total + '</span></div></div>' +
      '<div class="card" style="padding:10px 6px"><nav aria-label="Daftar pelajaran">' + rows + '</nav></div>' +
      '<p class="muted" style="margin-top:16px">Setiap pelajaran: BACA → COBA (editor sungguhan) → QUIZ (5 soal acak dari bank 8) → HASIL. Pelajaran berikutnya terbuka setelah quiz lulus (min. ' + TutorStore.getSettings().passScore + '%), atau bisa dilewati dengan konfirmasi.</p>');
  }

  /* ======== VIEW: PELAJARAN (4 tahap) ======== */
  var _activeChallenge = null;

  function viewLesson(args) {
    var lvId = args[0], lsId = args[1], wantStage = args[2] || 'baca';
    var entry = TutorData.getLesson(lvId, lsId);
    if (!entry) { view404(); return; }
    if (!TutorData.isUnlocked(lvId, lsId)) {
      setMain('<div class="empty-state"><div class="es-emoji">🔒</div><h2>Pelajaran ini masih terkunci</h2>' +
        '<p>Selesaikan pelajaran sebelumnya dulu.</p><p class="btn-row"><a class="btn btn-ghost" href="#/' + esc(lvId) + '">Lihat level ini</a><a class="btn btn-primary" href="#/">Ke Beranda</a></p></div>');
      return;
    }
    if (_activeChallenge) { _activeChallenge.destroy(); _activeChallenge = null; }

    var lv = entry.level, ls = entry.lesson;
    var existing = TutorStore.getProgress().lessons[lvId + '/' + lsId];
    var rec = TutorStore.patchLesson(lvId, lsId, { startedAt: (existing && existing.startedAt) || new Date().toISOString() });
    var prog = TutorStore.getProgress(); prog.lastLesson = { levelId: lvId, lessonId: lsId }; TutorStore.saveProgress(prog);

    var hasCh = !!(ls.challenge && ls.challenge.checks && ls.challenge.checks.length);
    var hasQz = !!(ls.quiz && ls.quiz.length);
    var allow = {
      baca: true,
      coba: rec.readDone,
      quiz: rec.readDone && (!hasCh || rec.challengeDone),
      hasil: rec.quizPassed || rec.skipped || rec.attempts > 0
    };
    var stage = wantStage;
    if (!allow[stage]) stage = allow.hasil ? 'hasil' : allow.quiz ? 'quiz' : allow.coba ? 'coba' : 'baca';
    TutorStore.patchLesson(lvId, lsId, { stage: stage });

    var wrap = document.createElement('article'); wrap.className = 'lesson';
    wrap.innerHTML = '<div class="page-title-row"><div><p class="page-kicker">' + esc(lv.title) + ' · ' + esc(ls.title) + '</p>' +
      '<h1>' + esc(ls.title) + '</h1><div class="lesson-meta"><span>⏱ ±' + ls.minutes + ' menit baca</span><span class="dot">·</span><span>' + stageLabel(stage) + '</span></div></div></div>' +
      buildSteps(rec, stage, allow);
    var content = document.createElement('div'); content.className = 'stage-content'; wrap.appendChild(content);
    setMain(wrap);

    if (stage === 'baca') renderBaca(content, lvId, lsId, rec, ls, hasCh, hasQz);
    else if (stage === 'coba') renderCoba(content, lvId, lsId, rec, ls, hasQz);
    else if (stage === 'quiz') renderQuiz(content, lvId, lsId, rec, ls);
    else renderHasil(content, lvId, lsId, rec, ls, hasCh, hasQz);

    $$('.steps li[data-stage]', wrap).forEach(function (li) {
      function go() { var s = li.getAttribute('data-stage'); if (li.classList.contains('locked')) { toast('Tahap ini belum terbuka.', 'error'); return; } TutorRouter.go(lvId + '/' + lsId + '/' + s); }
      li.addEventListener('click', go);
      li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  }

  function stageLabel(s) { return { baca: 'Tahap: Membaca', coba: 'Tahap: Mencoba kode', quiz: 'Tahap: Kuis', hasil: 'Tahap: Hasil' }[s] || ''; }

  function buildSteps(rec, cur, allow) {
    var stages = [
      { k: 'baca', label: 'Baca', done: rec.readDone },
      { k: 'coba', label: 'Coba', done: rec.challengeDone },
      { k: 'quiz', label: 'Quiz', done: rec.quizPassed },
      { k: 'hasil', label: 'Hasil', done: rec.completedAt }
    ];
    var html = '<ol class="steps" aria-label="Tahap pelajaran">';
    stages.forEach(function (s) {
      var cls = 'step'; if (s.k === cur) cls += ' current'; if (s.done && s.k !== cur) cls += ' done'; if (!allow[s.k]) cls += ' locked';
      html += '<li class="' + cls + '" data-stage="' + s.k + '" role="button" tabindex="' + (allow[s.k] ? '0' : '-1') + '">' +
        '<span class="st-ic">' + (!allow[s.k] ? '🔒' : s.done ? '✓' : (s.k === cur ? '●' : '○')) + '</span>' + s.label + '</li>';
    });
    return html + '</ol>';
  }

  function renderBaca(content, lvId, lsId, rec, ls, hasCh, hasQz) {
    content.appendChild(renderReading(ls.reading));
    var foot = document.createElement('div'); foot.className = 'btn-row';
    if (!rec.readDone) foot.innerHTML = '<button class="btn btn-primary" id="btnRead">✓ Saya sudah paham, lanjut →</button>';
    else { var nxt = hasCh ? 'coba' : (hasQz ? 'quiz' : 'hasil'); foot.innerHTML = '<a class="btn btn-primary" href="#/' + esc(lvId) + '/' + esc(lsId) + '/' + nxt + '">Lanjut ke ' + nxt.toUpperCase() + ' →</a>'; }
    content.appendChild(foot);
    var b = $('#btnRead'); if (b) b.addEventListener('click', function () {
      if (!rec.readDone) { TutorStore.addXp(10, 'read'); maybeAwardBadge('first-read'); toast('+10 XP', 'success'); }
      TutorStore.patchLesson(lvId, lsId, { readDone: true }); TutorEvents.emit('progress:change');
      TutorRouter.go(lvId + '/' + lsId + '/' + (hasCh ? 'coba' : (hasQz ? 'quiz' : 'hasil')));
    });
  }

  function renderCoba(content, lvId, lsId, rec, ls, hasQz) {
    if (!ls.challenge) { content.innerHTML = '<p class="muted">Pelajaran ini tanpa tantangan kode.</p><p class="btn-row"><a class="btn btn-primary" href="#/' + esc(lvId) + '/' + esc(lsId) + '/quiz">Lanjut ke Quiz →</a></p>'; return; }
    var holder = document.createElement('div'); content.appendChild(holder);
    _activeChallenge = new global.TutorEditor.ChallengeView(holder, {
      challenge: ls.challenge, completed: rec.challengeDone,
      onComplete: function () {
        var usedHint = _activeChallenge && _activeChallenge.hintLevel > 0;
        if (!rec.challengeDone) {
          var bonus = 0; TutorStore.addXp(25, 'challenge');
          if (!usedHint) { bonus = 10; TutorStore.addXp(bonus, 'challenge-nohint'); }
          TutorStore.patchLesson(lvId, lsId, { challengeDone: true }); maybeAwardBadge('first-challenge');
          toast('Tantangan selesai! +25 XP' + (bonus ? ' (+10 tanpa petunjuk)' : ''), 'success'); TutorEvents.emit('progress:change');
        }
        TutorRouter.go(lvId + '/' + lsId + '/' + (hasQz ? 'quiz' : 'hasil'));
      }
    });
    var skip = document.createElement('p'); skip.className = 'btn-row';
    skip.innerHTML = '<button class="btn btn-ghost" id="skipCh">Kesulitan? Tandai selesai & lanjut</button>';
    content.appendChild(skip);
    $('#skipCh').addEventListener('click', function () {
      tutorConfirm({ title: 'Lewati tantangan ini?', body: 'Kamu boleh lanjut tanpa menyelesaikan tantangan. Nanti bisa diulang kok.', okLabel: 'Ya, lewati' }).then(function (yes) {
        if (!yes) return;
        TutorStore.patchLesson(lvId, lsId, { challengeDone: true, skippedChallenge: true });
        TutorEvents.emit('progress:change'); TutorRouter.go(lvId + '/' + lsId + '/quiz');
      });
    });
  }

  function renderQuiz(content, lvId, lsId, rec, ls) {
    var settings = TutorStore.getSettings();
    var holder = document.createElement('div'); content.appendChild(holder);
    var key = lvId + ':' + lsId;
    var resume = TutorStore.getCustom('quiz:' + key);
    var qv = new global.TutorQuiz.QuizView(holder, {
      questions: ls.quiz, pick: 5, passScore: settings.passScore, timer: settings.quizTimer, key: key, resume: resume,
      onFinish: function (r) {
        var gained = r.correct * 5; if (r.perfect) gained += 20; if (r.hintUsed === 0) gained += 10;
        TutorStore.addXp(gained, 'quiz');
        var p = TutorStore.getProgress();
        TutorStore.saveProgress({
          quizzesTaken: (p.quizzesTaken || 0) + 1,
          correctAnswers: (p.correctAnswers || 0) + r.correct,
          totalAnswers: (p.totalAnswers || 0) + r.total
        });
        r.wrongIds.forEach(function (id) { TutorStore.recordWrong(id); });
        if (r.perfect) maybeAwardBadge('perfect-quiz');
        if (r.hintUsed === 0) maybeAwardBadge('no-hint');
        var best = Math.max(rec.bestScore || 0, r.score);
        var patch = { bestScore: best, attempts: (rec.attempts || 0) + 1, stage: 'hasil', lastResult: r };
        if (r.passed) { patch.quizPassed = true; patch.completedAt = rec.completedAt || new Date().toISOString(); maybeAwardBadge('first-quiz-pass'); }
        TutorStore.patchLesson(lvId, lsId, patch);
        if (global.tutorOnQuizFinish) global.tutorOnQuizFinish(r, ls);
        if (r.passed && global.tutorCelebrate) global.tutorCelebrate();
        TutorEvents.emit('progress:change'); TutorRouter.go(lvId + '/' + lsId + '/hasil');
      }
    });
    qv.render();
    var skip = document.createElement('p'); skip.className = 'btn-row';
    skip.innerHTML = '<button class="btn btn-ghost" id="skipQz">Lewati quiz dengan konfirmasi</button>';
    content.appendChild(skip);
    $('#skipQz').addEventListener('click', function () {
      tutorConfirm({ title: 'Lewati quiz?', body: 'Kamu akan menandai pelajaran selesai tanpa lulus quiz. Sebaiknya dicoba dulu.', okLabel: 'Ya, lewati' }).then(function (yes) {
        if (!yes) return;
        TutorStore.patchLesson(lvId, lsId, { quizPassed: true, skipped: true, completedAt: new Date().toISOString(), stage: 'hasil' });
        TutorEvents.emit('progress:change'); TutorRouter.go(lvId + '/' + lsId + '/hasil');
      });
    });
  }

  function renderHasil(content, lvId, lsId, rec, ls, hasCh, hasQz) {
    var r = rec.lastResult, next = TutorData.nextOf(lvId, lsId), html = '<div class="hasil">';
    if (rec.skipped && (!r || !r.passed)) html += '<div class="qz-result pass"><div class="qr-emoji">✅</div><h2>Pelajaran ditandai selesai</h2><p>Kamu melewati quiz. Tetap boleh mengulanginya kapan pun.</p></div>';
    else if (r) { var pass = r.passed; html += '<div class="qz-result ' + (pass ? 'pass' : 'fail') + '"><div class="qr-emoji">' + (pass ? '🏅' : '📚') + '</div><h2>Skor terbaikmu: ' + rec.bestScore + '%</h2><p>' + r.correct + '/' + r.total + ' benar · ' + (r.perfect ? 'Sempurna! ' : '') + (r.hintUsed ? r.hintUsed + ' petunjuk dipakai' : 'tanpa petunjuk') + '</p></div>'; }
    else html += '<div class="qz-result pass"><h2>Belum ada hasil quiz</h2><p>Kerjakan quiz dulu untuk melihat hasilmu.</p></div>';
    html += '</div>'; content.innerHTML = html;
    var foot = document.createElement('div'); foot.className = 'btn-row'; var btns = [];
    if (hasQz) btns.push('<button class="btn btn-ghost" id="hRetry">↻ Ulangi quiz</button>');
    if (hasCh) btns.push('<a class="btn btn-ghost" href="#/' + esc(lvId) + '/' + esc(lsId) + '/coba">↺ Coba lagi tantangan</a>');
    if (next) btns.push('<a class="btn btn-primary" href="#/' + esc(next.levelId) + '/' + esc(next.lessonId) + '">Pelajaran berikutnya: ' + esc(next.lesson.title) + ' →</a>');
    else btns.push('<a class="btn btn-primary" href="#/badges">🎓 Lihat Badge & Sertifikat →</a>');
    foot.innerHTML = btns.join(''); content.appendChild(foot);
    var rt = $('#hRetry'); if (rt) rt.addEventListener('click', function () { TutorStore.patchCustom('quiz:' + lvId + ':' + lsId, null); TutorRouter.go(lvId + '/' + lsId + '/quiz'); });
    var lp = TutorData.levelProgress(lvId); if (lp.done === lp.total) maybeAwardBadge('level-done-' + lvId);
  }

  /* ======== VIEW: 404 ======== */
  function view404() {
    setMain('<div class="empty-state"><div class="es-emoji">🧭</div><h2>Halaman tidak ditemukan</h2>' +
      '<p>Alamat yang kamu buka tidak cocok dengan pelajaran mana pun.</p><p class="btn-row"><a class="btn btn-primary" href="#/">Kembali ke Beranda</a></p></div>');
  }

  /* ======== Badge helper ======== */
  function maybeAwardBadge(id) {
    var p = TutorStore.getProgress();
    if (p.badges && p.badges[id]) return;
    p.badges = p.badges || {}; p.badges[id] = new Date().toISOString();
    TutorStore.saveProgress({ badges: p.badges });
    TutorEvents.emit('badge', { id: id });
  }
  global.maybeAwardBadge = maybeAwardBadge;

  /* ======== Mount routes ======== */
  // Route level dibuat dinamis dari level yang terdaftar (plus fallback 1–8),
  // supaya level baru (mis. Proyek Akhir) otomatis ikut ter-wire tanpa hardcode.
  var levelRouteIds = {};
  if (global.TutorData && global.TutorData.levels) {
    global.TutorData.levels.forEach(function (l) { if (l && l.id) levelRouteIds[l.id] = true; });
  }
  for (var ln = 1; ln <= 8; ln++) levelRouteIds['level-' + ln] = true;
  Object.keys(levelRouteIds).forEach(function (id) {
    Router.on(id, function (rest) { if (!rest.length) viewLevel([id]); else viewLesson([id].concat(rest)); });
  });
  // halaman pendukung didelegasikan ke TutorPages bila tersedia
  ['cheatsheet', 'glossary', 'playground', 'review', 'badges', 'certificate'].forEach(function (id) {
    Router.on(id, function (rest) {
      if (global.TutorPages && global.TutorPages[id]) global.TutorPages[id](rest);
      else view404();
    });
  });
  Router.on('home', viewHome);
  Router.on('*', view404);

  global.TutorEngine = {
    esc: esc, safeInline: safeInline, renderReading: renderReading, toast: toast, setMain: setMain,
    viewHome: viewHome, viewLevel: viewLevel, viewLesson: viewLesson, view404: view404, maybeAwardBadge: maybeAwardBadge
  };
})(window);
