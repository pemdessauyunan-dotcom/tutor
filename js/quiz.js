/* =====================================================================
   quiz.js — Mesin QUIZ.
   5 tipe soal: mcq, multi, fill, order, bug.
   Fitur: bank 8 → ambil 5 acak, acak opsi, umpan balik instan + penjelasan,
   hint (mengurangi XP), progress bar, timer opsional, resume state,
   layar hasil + "ulangi hanya yang salah".
   ===================================================================== */
(function (global) {
  'use strict';

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function shuffle(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(arr, n) { return shuffle(arr).slice(0, n); }

  function normalize(s) { return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim(); }

  function QuizView(mount, opts) {
    this.mount = mount;
    this.opts = opts;
    this.pick = opts.pick || 5;
    this.passScore = opts.passScore != null ? opts.passScore : 60;
    this.timerOn = !!opts.timer;
    this.bank = (opts.questions || []).slice();
    this.resume = opts.resume || null; // { order:[ids], answers:{}, index, started }
    this.hintUsedCount = 0;
    this._build();
  }

  /* ---------- susun urutan soal ---------- */
  QuizView.prototype._build = function () {
    var chosen;
    if (this.resume && this.resume.order) {
      var byId = {}; this.bank.forEach(function (q) { byId[q.id] = q; });
      chosen = this.resume.order.map(function (id) { return byId[id]; }).filter(Boolean);
    } else {
      chosen = pick(this.bank, Math.min(this.pick, this.bank.length));
    }
    this.questions = chosen.map(function (q) {
      var qq = Object.assign({}, q);
      if (Array.isArray(q.options)) {
        // simpan koreksi indeks setelah diacak; wrongWhy ikut diacak agar tidak tertukar
        var pairs = q.options.map(function (o, i) { return { o: o, w: Array.isArray(q.wrongWhy) ? q.wrongWhy[i] : null, correct: q.answer === i || (Array.isArray(q.answer) && q.answer.indexOf(i) >= 0) }; });
        var sh = shuffle(pairs);
        qq.options = sh.map(function (p) { return p.o; });
        if (Array.isArray(q.wrongWhy)) qq.wrongWhy = sh.map(function (p) { return p.w; });
        qq._correctIdx = sh.map(function (p, i) { return p.correct ? i : -1; }).filter(function (i) { return i >= 0; });
      }
      if (q.type === 'order' && Array.isArray(q.lines)) {
        var idxs = q.lines.map(function (_, i) { return i; });
        var sidx = shuffle(idxs);
        if (sidx.join() === idxs.join()) sidx = sidx.reverse(); // hindari sudah benar
        qq._shuffled = sidx.map(function (i) { return q.lines[i]; });
        qq._shuffledIdx = sidx;
      }
      return qq;
    });
    this.index = this.resume ? (this.resume.index || 0) : 0;
    this.answers = this.resume ? (this.resume.answers || {}) : {};
    this.startedAt = (this.resume && this.resume.started) || Date.now();
    this.hintUsed = this.resume ? (this.resume.hintUsed || {}) : {};
    this.finished = false;
  };

  QuizView.prototype.render = function () {
    var self = this;
    this.mount.innerHTML = '';
    if (this.finished) { this._renderResult(); return; }
    var q = this.questions[this.index];
    if (!q) { this._renderResult(); return; }

    var head = document.createElement('div'); head.className = 'qz-head';
    var pct = Math.round((this.index) / this.questions.length * 100);
    head.innerHTML =
      '<div class="qz-progress"><div class="qz-bar" style="width:' + pct + '%"></div></div>' +
      '<div class="qz-meta"><span>Soal ' + (this.index + 1) + ' / ' + this.questions.length + '</span>' +
      (this.timerOn ? '<span id="qzTimer">⏱ 0:00</span>' : '<span class="muted">Timer mati</span>') + '</div>';
    this.mount.appendChild(head);

    var card = document.createElement('div'); card.className = 'qz-card';
    card.innerHTML = '<p class="qz-type">' + typeLabel(q.type) + '</p><h3 class="qz-q">' + (q.qHtml ? q.q : esc(q.q)) + '</h3>';
    this.body = document.createElement('div'); this.body.className = 'qz-body';
    card.appendChild(this.body);
    this.mount.appendChild(card);

    this.answerArea = document.createElement('div'); this.answerArea.className = 'qz-answer';
    card.appendChild(this.answerArea);

    this._renderQuestion(q);

    // feedback + kontrol
    this.foot = document.createElement('div'); this.foot.className = 'qz-foot';
    this.foot.innerHTML =
      '<button class="btn btn-ghost" data-q="hint">💡 Petunjuk</button>' +
      '<button class="btn btn-primary" data-q="check">Periksa</button>';
    card.appendChild(this.foot);

    this.foot.addEventListener('click', function (e) {
      var a = e.target.getAttribute('data-q'); if (!a) return;
      if (a === 'hint') self._showHint(q);
      else if (a === 'check') self._check(q);
      else if (a === 'next') { self.index++; self.render(); self._persist(); }
    });

    if (this.timerOn) this._startTimer();
    this._restoreAnswer(q);
  };

  /* ---------- resume: terapkan jawaban yang sudah tersimpan ---------- */
  QuizView.prototype._restoreAnswer = function (q) {
    var self = this;
    var saved = this.answers[q.id];
    if (!saved) return; // belum dijawab
    var ans = saved.ans;
    if (q.type === 'mcq') {
      var r = this.answerArea.querySelector('input[name="q"][value="' + ans + '"]');
      if (r) r.checked = true;
    } else if (q.type === 'multi') {
      (Array.isArray(ans) ? ans : []).forEach(function (i) {
        var cb = self.answerArea.querySelector('input[name="q"][value="' + i + '"]');
        if (cb) cb.checked = true;
      });
    } else if (q.type === 'fill') {
      var f = this.answerArea.querySelector('.fill-in'); if (f) f.value = ans || '';
    } else if (q.type === 'bug') {
      this._picked = ans;
      var bl = this.answerArea.querySelector('.bug-line[data-line="' + ans + '"]'); if (bl) bl.classList.add('sel');
    } else if (q.type === 'order') {
      this._orderCurrent = Array.isArray(ans) ? ans.slice() : (this._orderCurrent || []);
    }
    // tampilkan kembali umpan balik + kunci input sehingga pengguna lanjut di posisi semula
    this._feedback(q, saved.correct, ans);
  };

  function typeLabel(t) {
    return { mcq: 'Pilihan ganda', multi: 'Pilih semua yang benar', fill: 'Isian', order: 'Urutkan', bug: 'Cari bug' }[t] || 'Soal';
  }

  /* ---------- render tiap tipe ---------- */
  QuizView.prototype._renderQuestion = function (q) {
    var self = this, html = '';
    if (q.type === 'mcq') {
      html = q.options.map(function (o, i) {
        return '<label class="opt"><input type="radio" name="q" value="' + i + '"><span class="opt-b">' + esc(o) + '</span></label>';
      }).join('');
    } else if (q.type === 'multi') {
      html = q.options.map(function (o, i) {
        return '<label class="opt"><input type="checkbox" name="q" value="' + i + '"><span class="opt-b">' + esc(o) + '</span></label>';
      }).join('');
    } else if (q.type === 'fill') {
      html = '<label class="fill-l">' + (q.before ? esc(q.before) + ' ' : '') +
        '<input type="text" class="fill-in" placeholder="ketik di sini…" autocomplete="off" spellcheck="false">' +
        (q.after ? ' ' + esc(q.after) : '') + '</label>';
      if (q.codeContext) html = '<pre class="qz-code">' + esc(q.codeContext) + '</pre>' + html;
    } else if (q.type === 'order') {
      html = '<ol class="order-list" id="orderList"></ol><p class="muted" style="font-size:.82rem">Gunakan ▲▼ (atau seret) untuk menyusun urutan yang benar.</p>';
    } else if (q.type === 'bug') {
      var lines = String(q.code).split('\n');
      html = '<p class="muted">' + (q.instruction ? esc(q.instruction) : 'Klik baris yang mengandung kesalahan.') + '</p><div class="bug-code" id="bugCode">' +
        lines.map(function (l, i) { return '<div class="bug-line" data-line="' + i + '"><span class="bl-no">' + (i + 1) + '</span><span class="bl-tx">' + esc(l) + '</span></div>'; }).join('') + '</div>';
    }
    this.answerArea.innerHTML = html;

    if (q.type === 'order') this._setupOrder(q);
    if (q.type === 'bug') {
      this.answerArea.querySelectorAll('.bug-line').forEach(function (el) {
        el.addEventListener('click', function () {
          self.answerArea.querySelectorAll('.bug-line').forEach(function (x) { x.classList.remove('sel'); });
          el.classList.add('sel'); self._picked = Number(el.getAttribute('data-line'));
        });
      });
    }
  };

  /* ---------- ORDER: drag & drop + tombol naik/turun ---------- */
  QuizView.prototype._setupOrder = function (q) {
    var self = this;
    var list = this.answerArea.querySelector('#orderList');
    var current = this.answers[q.id] && this.answers[q.id].order ? this.answers[q.id].order : q._shuffled.slice();
    function draw() {
      list.innerHTML = '';
      current.forEach(function (lineText, i) {
        var li = document.createElement('li'); li.className = 'order-item'; li.draggable = true; li.setAttribute('data-i', i);
        li.innerHTML = '<span class="oi-grip">⋮⋮</span><span class="oi-tx">' + esc(lineText) + '</span>' +
          '<span class="oi-nav"><button data-mv="up" aria-label="Naik">▲</button><button data-mv="down" aria-label="Turun">▼</button></span>';
        li.querySelector('[data-mv="up"]').addEventListener('click', function () { if (i > 0) { current.splice(i - 1, 0, current.splice(i, 1)[0]); draw(); } });
        li.querySelector('[data-mv="down"]').addEventListener('click', function () { if (i < current.length - 1) { current.splice(i + 1, 0, current.splice(i, 1)[0]); draw(); } });
        li.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', i); li.classList.add('dragging'); });
        li.addEventListener('dragend', function () { li.classList.remove('dragging'); });
        li.addEventListener('dragover', function (e) { e.preventDefault(); li.classList.add('over'); });
        li.addEventListener('dragleave', function () { li.classList.remove('over'); });
        li.addEventListener('drop', function (e) {
          e.preventDefault(); li.classList.remove('over');
          var from = Number(e.dataTransfer.getData('text/plain')), to = i;
          current.splice(to, 0, current.splice(from, 1)[0]); draw();
        });
        list.appendChild(li);
      });
      self._orderCurrent = current;
    }
    draw();
  };

  /* ---------- kumpulkan jawaban ---------- */
  QuizView.prototype._collect = function (q) {
    if (q.type === 'mcq') { var r = this.answerArea.querySelector('input[name="q"]:checked'); return r ? Number(r.value) : null; }
    if (q.type === 'multi') { return [].slice.call(this.answerArea.querySelectorAll('input[name="q"]:checked')).map(function (x) { return Number(x.value); }); }
    if (q.type === 'fill') { var f = this.answerArea.querySelector('.fill-in'); return f ? f.value : ''; }
    if (q.type === 'order') { return this._orderCurrent || []; }
    if (q.type === 'bug') { return this._picked != null ? this._picked : null; }
    return null;
  };

  QuizView.prototype._grade = function (q, ans) {
    if (q.type === 'mcq') return ans != null && ans === q._correctIdx[0];
    if (q.type === 'multi') { if (!Array.isArray(ans)) return false; var a = ans.slice().sort().join(), b = q._correctIdx.slice().sort().join(); return a === b; }
    if (q.type === 'fill') {
      var alts = (q.answerText || (q.answer != null ? [q.answer] : [])).map(normalize);
      var got = normalize(ans); return got !== '' && alts.some(function (x) { return x === got; });
    }
    if (q.type === 'order') { if (!Array.isArray(ans)) return false; return ans.join('\u0001') === q.lines.join('\u0001'); }
    if (q.type === 'bug') { return ans != null && ans === q.bugLine; }
    return false;
  };

  QuizView.prototype._check = function (q) {
    var ans = this._collect(q);
    // validasi belum dijawab
    var empty = ans == null || (q.type === 'multi' && !ans.length) || (q.type === 'fill' && !String(ans).trim()) || (q.type === 'bug' && ans == null);
    if (empty) { this._feedback(q, null, ans); return; }
    var correct = this._grade(q, ans);
    this.answers[q.id] = { ans: ans, correct: correct, usedHint: !!this.hintUsed[q.id] };
    this._answered = true;
    this._feedback(q, correct, ans);
  };

  QuizView.prototype._feedback = function (q, correct, ans) {
    var self = this;
    var fb = document.createElement('div');
    fb.className = 'qz-fb ' + (correct == null ? 'warn' : correct ? 'ok' : 'no');
    var head = correct == null ? 'Pilih/jawab dulu ya.' : correct ? 'Betul! 🎉' : 'Belum tepat.';
    var body = '<strong>' + head + '</strong>';
    if (correct != null) {
      body += '<p>' + (q.explanationHtml ? q.explanation : esc(q.explanation || '')) + '</p>';
      if (correct === false && q.wrongWhy && Array.isArray(ans)) {
        var notes = ans.filter(function (i) { return q._correctIdx.indexOf(i) < 0 && q.wrongWhy[i]; })
          .map(function (i) { return '• Opsi "' + esc(q.options[i]) + '": ' + esc(q.wrongWhy[i]); });
        if (notes.length) body += '<div class="qz-why">' + notes.join('<br>') + '</div>';
      }
      if (correct === false && q.type === 'fill') body += '<p class="muted">Jawaban yang diterima: ' + (q.answerText || [q.answer]).map(function (x) { return '<code>' + esc(x) + '</code>'; }).join(' atau ') + '</p>';
      if (correct === false && q.type === 'bug' && ans != null) body += '<p class="muted">Baris ' + (q.bugLine + 1) + ' adalah sumber masalahnya.</p>';
    }
    fb.innerHTML = body;
    // ganti feedback lama
    var old = this.mount.querySelector('.qz-fb'); if (old) old.remove();
    this.foot.parentNode.insertBefore(fb, this.foot);

    // matikan input
    this.answerArea.querySelectorAll('input,button,.bug-line,.order-item').forEach(function (el) { el.disabled = true; if (el.classList) el.classList.add('locked'); });
    // tandai benar/salah pada opsi
    if (q.type === 'mcq' || q.type === 'multi') {
      this.answerArea.querySelectorAll('input[name="q"]').forEach(function (inp) {
        var i = Number(inp.value);
        var isCorrectOpt = q._correctIdx.indexOf(i) >= 0;
        var cls = isCorrectOpt ? 'is-correct' : (inp.checked ? 'is-wrong' : '');
        var opt = inp.closest('.opt');
        if (cls && opt) opt.classList.add(cls);
      });
    }
    if (q.type === 'bug') {
      var bl = this.answerArea.querySelector('.bug-line[data-line="' + q.bugLine + '"]'); if (bl) bl.classList.add('is-correct');
    }
    if (q.type === 'order' && correct === false) {
      var list = this.answerArea.querySelector('#orderList');
      if (list) { list.innerHTML = q.lines.map(function (l) { return '<li class="order-item is-correct"><span class="oi-tx">' + esc(l) + '</span></li>'; }).join(''); }
    }

    // ubah tombol jadi Lanjut / Hasil
    this.foot.innerHTML = '<button class="btn btn-primary" data-q="next">' + (this.index < this.questions.length - 1 ? 'Soal berikutnya →' : 'Lihat hasil →') + '</button>';
    this.foot.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.getAttribute('data-q');
        if (a === 'next') { self.index++; self.render(); self._persist(); }
      });
    });
    if (correct != null && this.index >= this.questions.length - 1) {
      // tetap tombol lihat hasil; saat render berikutnya index==len → result
    }
  };

  QuizView.prototype._showHint = function (q) {
    if (!q.hint) { tutorToast('Soal ini tidak punya petunjuk.', 'error'); return; }
    this.hintUsed[q.id] = true; this.hintUsedCount++;
    var box = this.mount.querySelector('.qz-hint');
    if (!box) { box = document.createElement('div'); box.className = 'qz-hint'; this.answerArea.parentNode.insertBefore(box, this.answerArea.nextSibling); }
    box.innerHTML = '<span class="hint-k">Petunjuk</span> ' + esc(q.hint);
  };

  /* ---------- hasil ---------- */
  QuizView.prototype._score = function () {
    var correct = 0, total = this.questions.length;
    this.questions.forEach(function (q) { if (this.answers[q.id] && this.answers[q.id].correct) correct++; }, this);
    return { correct: correct, total: total };
  };
  QuizView.prototype._renderResult = function () {
    var self = this;
    var sc = this._score();
    var pct = Math.round(sc.correct / sc.total * 100);
    var passed = pct >= this.passScore;
    var timeSec = Math.round((Date.now() - this.startedAt) / 1000);
    var wrong = this.questions.filter(function (q) { return !(self.answers[q.id] && self.answers[q.id].correct); });

    var html = '<div class="qz-result ' + (passed ? 'pass' : 'fail') + '">' +
      '<div class="qr-emoji">' + (passed ? '🏅' : '📚') + '</div>' +
      '<h2>Skor kamu: ' + pct + '%</h2>' +
      '<p>' + sc.correct + ' benar dari ' + sc.total + ' soal · waktu ' + Math.floor(timeSec / 60) + 'm ' + (timeSec % 60) + 'd · petunjuk dipakai ' + Object.keys(this.hintUsed).filter(function (k) { return self.hintUsed[k]; }).length + '×</p>' +
      '<p class="qr-note">' + (passed ? 'Lulus! Pelajaran berikutnya sudah terbuka.' : 'Belum lulus (butuh minimal ' + this.passScore + '%). Tidak apa-apa — baca penjelasannya lalu coba lagi, soalnya diacak ulang kok.') + '</p>' +
      '</div>';
    this.mount.innerHTML = html;

    if (wrong.length) {
      var list = document.createElement('div'); list.className = 'qr-review';
      list.innerHTML = '<h3>Pembahasan soal yang salah</h3>' + wrong.map(function (q) {
        return '<div class="qr-item"><p><strong>' + esc(q.q) + '</strong></p><p class="muted">' + (q.explanationHtml ? q.explanation : esc(q.explanation || '')) + '</p></div>';
      }).join('');
      this.mount.appendChild(list);
    }

    var actions = document.createElement('div'); actions.className = 'btn-row';
    actions.innerHTML =
      (wrong.length ? '<button class="btn btn-ghost" data-r="retrywrong">↻ Ulangi hanya yang salah</button>' : '') +
      '<button class="btn btn-ghost" data-r="retryall">↻ Ulangi semua</button>';
    this.mount.appendChild(actions);
    actions.addEventListener('click', function (e) {
      var a = e.target.getAttribute('data-r'); if (!a) return;
      if (a === 'retryall') self._restart(self.bank);
      else if (a === 'retrywrong') self._restart(wrong);
    });

    // laporkan hasil
    if (this.opts.onFinish) this.opts.onFinish({
      score: pct, correct: sc.correct, total: sc.total, passed: passed,
      timeSec: timeSec, hintUsed: this.hintUsedCount,
      perfect: sc.correct === sc.total,
      perQuestion: this.questions.map(function (q) { return { id: q.id, correct: !!(self.answers[q.id] && self.answers[q.id].correct), usedHint: !!self.hintUsed[q.id] }; }),
      wrongIds: wrong.map(function (q) { return q.id; })
    });
    this._clearPersist();
  };

  QuizView.prototype._restart = function (questions) {
    this.bank = questions.slice();
    this.resume = null;
    this.finished = false;
    this.answers = {}; this.hintUsed = {}; this.hintUsedCount = 0; this.index = 0;
    this.startedAt = Date.now();
    this._build();
    this.render();
  };

  QuizView.prototype.finish = function () { this.finished = true; this.index = this.questions.length; this.render(); };

  /* ---------- persist state berjalan (resume) ---------- */
  QuizView.prototype._persist = function () {
    if (this.index >= this.questions.length) { this._clearPersist(); return; }
    var order = this.questions.map(function (q) { return q.id; });
    TutorStore.patchCustom('quiz:' + this.opts.key, {
      order: order, index: this.index, answers: this.answers, hintUsed: this.hintUsed, started: this.startedAt
    });
  };
  QuizView.prototype._clearPersist = function () { if (this.opts.key) TutorStore.patchCustom('quiz:' + this.opts.key, null); };

  global.TutorQuiz = { QuizView: QuizView, _shuffle: shuffle, _pick: pick };
})(window);
