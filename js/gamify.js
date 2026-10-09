/* =====================================================================
   gamify.js — Badge, confetti, kalender streak, XP level, sertifikat.
   ===================================================================== */
(function (global) {
  'use strict';

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---------- Definisi badge (deklaratif) ---------- */
  var BADGES = [
    { id: 'first-read', icon: '📖', title: 'Pembaca Pertama', desc: 'Menyelesaikan bacaan pertamamu.' },
    { id: 'first-challenge', icon: '⌨️', title: 'Hello World Pertamamu', desc: 'Lulus tantangan kode pertama.' },
    { id: 'first-quiz-pass', icon: '🎯', title: 'Kuis Pertama', desc: 'Lulus quiz pertamamu.' },
    { id: 'perfect-quiz', icon: '💯', title: 'Nilai Sempurna', desc: 'Quiz 100% benar.' },
    { id: 'no-hint', icon: '🧠', title: 'Mandiri', desc: 'Lulus quiz tanpa satu pun petunjuk.' },
    { id: 'bug-hunter', icon: '🐛', title: 'Pemburu Bug', desc: 'Menemukan 5 bug dengan benar di soal "Cari bug".' },
    { id: 'streak-7', icon: '🔥', title: '7 Hari Beruntun', desc: 'Belajar 7 hari tanpa putus.' },
    { id: 'streak-30', icon: '🌋', title: '30 Hari Menyala', desc: 'Belajar 30 hari beruntun.' },
    { id: 'speedster', icon: '⚡', title: 'Si Kilat', desc: 'Menyelesaikan quiz di bawah 45 detik.' },
    { id: 'xp-100', icon: '✦', title: '100 XP', desc: 'Mengumpulkan 100 XP.' },
    { id: 'xp-500', icon: '✧', title: '500 XP', desc: 'Mengumpulkan 500 XP.' },
    { id: 'xp-1500', icon: '★', title: '1500 XP', desc: 'Mengumpulkan 1500 XP.' },
    { id: 'lessons-10', icon: '📚', title: 'Rajin', desc: 'Menyelesaikan 10 pelajaran.' },
    { id: 'level-done-level-1', icon: '1️⃣', title: 'Tamat Level 1', desc: 'Menyelesaikan semua pelajaran Level 1.' },
    { id: 'level-done-level-2', icon: '2️⃣', title: 'Tamat Level 2', desc: 'Menyelesaikan semua pelajaran Level 2.' },
    { id: 'level-done-level-3', icon: '3️⃣', title: 'Tamat Level 3', desc: 'Menyelesaikan semua pelajaran Level 3.' },
    { id: 'level-done-level-4', icon: '4️⃣', title: 'Tamat Level 4', desc: 'Menyelesaikan semua pelajaran Level 4.' },
    { id: 'level-done-level-5', icon: '5️⃣', title: 'Tamat Level 5', desc: 'Menyelesaikan semua pelajaran Level 5.' },
    { id: 'level-done-level-6', icon: '6️⃣', title: 'Tamat Level 6', desc: 'Menyelesaikan semua pelajaran Level 6.' },
    { id: 'level-done-level-7', icon: '7️⃣', title: 'Tamat Level 7', desc: 'Menyelesaikan semua pelajaran Level 7.' },
    { id: 'level-done-level-8', icon: '8️⃣', title: 'Tamat Level 8', desc: 'Menyelesaikan semua pelajaran Proyek Akhir (Level 8).' },
    { id: 'final-project', icon: '🏗️', title: 'Proyek Akhir', desc: 'Menyelesaikan proyek akhir.' },
    { id: 'graduate', icon: '🎓', title: 'Lulusan', desc: 'Menyelesaikan seluruh kurikulum.' }
  ];
  global.TutorBadges = BADGES;

  function completedLessons() {
    var p = TutorStore.getProgress(), n = 0;
    Object.keys(p.lessons).forEach(function (k) { var r = p.lessons[k]; if (r.completedAt || r.quizPassed || r.skipped) n++; });
    return n;
  }

  /* ---------- Evaluasi badge berbasis statistik ---------- */
  function evaluateBadges() {
    var p = TutorStore.getProgress(); p.badges = p.badges || {};
    function award(id) { if (!p.badges[id]) { p.badges[id] = new Date().toISOString(); TutorEvents.emit('badge', { id: id }); } }
    if (p.xp >= 100) award('xp-100');
    if (p.xp >= 500) award('xp-500');
    if (p.xp >= 1500) award('xp-1500');
    if (p.streak && p.streak.current >= 7) award('streak-7');
    if (p.streak && p.streak.current >= 30) award('streak-30');
    if ((p.bugCorrect || 0) >= 5) award('bug-hunter');
    if ((p.fastestQuizSec || 999) < 45 && (p.fastestQuizSec || 999) > 0) award('speedster');
    if (completedLessons() >= 10) award('lessons-10');
    // Badge Tamat Level dibuat dinamis untuk setiap level yang terdaftar.
    TutorData.levels.forEach(function (lv) {
      var lp = TutorData.levelProgress(lv.id);
      if (lp.total > 0 && lp.done === lp.total) {
        award('level-done-' + lv.id);
        if (lv.id === 'level-8') award('final-project'); // Proyek Akhir tuntas
      }
    });
    var all = TutorData.overallProgress();
    if (all.total > 0 && all.done === all.total) award('graduate');
    TutorStore.saveProgress({ badges: p.badges });
  }
  global.evaluateBadges = evaluateBadges;

  /* ---------- Hook dari engine saat quiz selesai ---------- */
  global.tutorOnQuizFinish = function (r, ls) {
    var p = TutorStore.getProgress();
    // hitung soal bug yang dijawab benar
    var byId = {}; (ls.quiz || []).forEach(function (q) { byId[q.id] = q; });
    var bugOk = 0;
    (r.perQuestion || []).forEach(function (pq) { if (pq.correct && byId[pq.id] && byId[pq.id].type === 'bug') bugOk++; });
    if (bugOk) { p.bugCorrect = (p.bugCorrect || 0) + bugOk; }
    if (r.passed && r.timeSec > 0 && (!p.fastestQuizSec || r.timeSec < p.fastestQuizSec)) p.fastestQuizSec = r.timeSec;
    TutorStore.saveProgress({ bugCorrect: p.bugCorrect, fastestQuizSec: p.fastestQuizSec });
    evaluateBadges();
  };

  /* ---------- Confetti (canvas buatan sendiri) ---------- */
  var _confettiRAF = null;
  function celebrate() {
    var s = TutorStore.getSettings();
    if (!s.anim) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var c = document.getElementById('confettiCanvas');
    if (!c) { c = document.createElement('canvas'); c.id = 'confettiCanvas'; c.className = 'confetti'; document.body.appendChild(c); }
    var ctx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    var colors = ['#d4a24c', '#eab863', '#ece7de', '#6ecf8b', '#e6b45a'];
    var parts = [];
    for (var i = 0; i < 140; i++) parts.push({
      x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.3,
      r: 4 + Math.random() * 6, d: Math.random() * 140, color: colors[i % colors.length],
      tilt: Math.random() * 10 - 10, spin: 0.05 + Math.random() * 0.1
    });
    var start = Date.now();
    cancelAnimationFrame(_confettiRAF);
    (function frame() {
      var t = (Date.now() - start) / 1000;
      ctx.clearRect(0, 0, c.width, c.height);
      parts.forEach(function (p, idx) {
        p.y += 2 + p.d * 0.02; p.tilt += p.spin * 6;
        var x = p.x + Math.sin((p.y + idx) / 40) * 24;
        ctx.save(); ctx.translate(x, p.y); ctx.rotate(p.tilt * 0.2);
        ctx.fillStyle = p.color; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6); ctx.restore();
      });
      if (t < 2.4) _confettiRAF = requestAnimationFrame(frame);
      else { ctx.clearRect(0, 0, c.width, c.height); }
    })();
  }
  global.tutorCelebrate = celebrate;

  /* ---------- Kalender streak mini ---------- */
  function streakCalendar() {
    var p = TutorStore.getProgress(); var s = p.streak || { calendar: {} };
    var today = new Date(); var cells = '';
    for (var i = 27; i >= 0; i--) {
      var d = new Date(today); d.setDate(today.getDate() - i);
      var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      var on = s.calendar && s.calendar[key];
      cells += '<span class="cal-cell' + (on ? ' on' : '') + '" title="' + key + (on ? ' · belajar' : '') + '"></span>';
    }
    return '<div class="cal" aria-label="28 hari terakhir">' + cells + '</div>';
  }

  /* ---------- Halaman Badge & Sertifikat ---------- */
  function badgesPage() {
    var p = TutorStore.getProgress(); p.badges = p.badges || {};
    var earned = BADGES.filter(function (b) { return p.badges[b.id]; });
    var grid = BADGES.map(function (b) {
      var has = !!p.badges[b.id];
      return '<div class="badge' + (has ? '' : ' locked') + '" title="' + esc(b.desc) + '"><span class="b-icon">' + b.icon + '</span>' +
        '<span><strong>' + esc(b.title) + '</strong><br><small class="muted">' + esc(has ? 'Didapat ' + new Date(p.badges[b.id]).toLocaleDateString('id-ID') : b.desc) + '</small></span></div>';
    }).join('');
    var lv = TutorStore.levelFromXp(p.xp);
    var ov = TutorData.overallProgress();
    var canCert = ov.done === ov.total && ov.total > 0;
    TutorEngine.setMain(
      '<div class="page-title-row"><div><p class="page-kicker">Pencapaian</p><h1>Badge & Sertifikat</h1>' +
      '<p class="lede">' + earned.length + ' dari ' + BADGES.length + ' badge terbuka.</p></div></div>' +
      '<div class="card" style="margin-bottom:20px"><h3>Streak & Level</h3><div class="badge-row-inline">' +
      '<span class="chip"><span class="chip-icon">✦</span> ' + p.xp + ' XP · ' + esc(lv.name) + '</span>' +
      '<span class="chip"><span class="chip-icon">🔥</span> ' + ((p.streak && p.streak.current) || 0) + ' hari beruntun (rekor ' + ((p.streak && p.streak.longest) || 0) + ')</span></div>' +
      '<div style="margin-top:12px">' + streakCalendar() + '</div></div>' +
      '<div class="badge-list">' + grid + '</div>' +
      '<div class="card" style="margin-top:24px"><h3>Sertifikat</h3>' +
      '<p class="muted">' + (canCert ? 'Selamat! Kamu menuntaskan seluruh kurikulum. Cetak sertifikatnya.' : 'Sertifikat terbuka setelah semua pelajaran selesai. Semangat!') + '</p>' +
      '<div class="btn-row"><a class="btn ' + (canCert ? 'btn-primary' : 'btn-ghost') + '" href="#/certificate">🎓 Buka Sertifikat</a></div></div>'
    );
  }

  function certificatePage() {
    var s = TutorStore.getSettings(), p = TutorStore.getProgress();
    var ov = TutorData.overallProgress(); var canCert = ov.done === ov.total && ov.total > 0;
    var name = s.name || 'Belajar';
    var date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    TutorEngine.setMain(
      '<div class="cert-actions"><button class="btn btn-primary" id="printCert">🖨 Cetak / Simpan PDF</button>' +
      '<a class="btn btn-ghost" href="#/badges">← Kembali</a></div>' +
      '<div class="cert" id="certSheet">' +
      (canCert ? '' : '<div class="cert-lock">🔒 Sertifikat terbuka setelah semua pelajaran selesai.<br><small>' + ov.done + '/' + ov.total + ' pelajaran</small></div>') +
      '<div class="cert-inner">' +
      '<p class="cert-kicker">Sertifikat Penyelesaian</p>' +
      '<h2 class="cert-name">' + esc(name) + '</h2>' +
      '<p class="cert-text">telah menuntaskan kurikulum <strong>Nol ke HTML</strong> — dari HTML dasar hingga JavaScript menengah, ' +
      'sebanyak ' + ov.total + ' pelajaran dengan total ' + p.xp + ' XP.</p>' +
      '<p class="cert-date">' + date + '</p>' +
      '<div class="cert-seal" aria-hidden="true">0→H</div>' +
      '</div></div>'
    );
    var pb = document.getElementById('printCert');
    if (pb) pb.addEventListener('click', function () {
      if (!canCert) { tutorToast('Selesaikan semua pelajaran dulu ya.', 'error'); return; }
      window.print();
    });
  }

  global.TutorGamify = { evaluateBadges: evaluateBadges, celebrate: celebrate, badgesPage: badgesPage, certificatePage: certificatePage, streakCalendar: streakCalendar };
})(window);
