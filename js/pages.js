/* =====================================================================
   pages.js — Cheat Sheet, Glosarium, Playground, Review (spaced repetition),
   dan delegasi halaman Badge & Sertifikat ke TutorGamify.
   ===================================================================== */
(function (global) {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---------- Data glosarium ---------- */
  var GLOSSARY = [
    { t: 'HTML', lv: 1, d: 'HyperText Markup Language — bahasa penanda untuk menyusun struktur halaman web.' },
    { t: 'Tag', lv: 1, d: 'Penanda seperti <h1> dan </h1>. Umumnya sepasang: pembuka dan penutup.' },
    { t: 'Elemen', lv: 1, d: 'Kesatuan tag pembuka + isi + tag penutup. Contoh: <p>Halo</p>.' },
    { t: 'Atribut', lv: 1, d: 'Informasi tambahan pada tag, ditulis di tag pembuka. Contoh: href="…".' },
    { t: 'Browser', lv: 1, d: 'Aplikasi (Chrome/Firefox) yang membaca HTML lalu menggambar halamannya.' },
    { t: 'Server', lv: 1, d: 'Komputer yang mengirim file halaman web ke browser-mu.' },
    { t: 'CSS', lv: 3, d: 'Cascading Style Sheets — bahasa untuk mengatur tampilan (warna, jarak, letak).' },
    { t: 'Selector', lv: 3, d: 'Pola yang memilih elemen HTML untuk diberi gaya, mis. h1, .kartu, #judul.' },
    { t: 'Class', lv: 3, d: 'Label yang bisa dipakai berulang: <div class="kartu">. Di CSS ditulis .kartu.' },
    { t: 'ID', lv: 3, d: 'Penanda unik satu elemen: <div id="hero">. Di CSS ditulis #hero. Harus beda tiap elemen.' },
    { t: 'Box model', lv: 3, d: 'Cara browser menghitung ruang elemen: isi (content) + padding + border + margin.' },
    { t: 'Margin', lv: 3, d: 'Ruang KOSONG di LUAR elemen, menjarakannya dari elemen tetangga.' },
    { t: 'Padding', lv: 3, d: 'Ruang di DALAM elemen, antara teks dan garis tepinya.' },
    { t: 'Flexbox', lv: 4, d: 'Model tata letak satu dimensi (sebaris/sekolom) untuk menyusun item dengan rapi.' },
    { t: 'Grid', lv: 4, d: 'Model tata letak dua dimensi (baris & kolom) untuk layout kompleks.' },
    { t: 'Media query', lv: 4, d: 'Aturan CSS yang aktif hanya pada kondisi layar tertentu, mis. max-width:600px.' },
    { t: 'Responsif', lv: 4, d: 'Desain yang menyesuaikan diri di HP, tablet, dan desktop.' },
    { t: 'Variabel CSS', lv: 4, d: 'Nilai bernama (--warna) yang bisa dipakai ulang. Dasar untuk membuat tema.' },
    { t: 'Form', lv: 5, d: 'Wilayah berisi input untuk mengumpulkan data dari pengguna.' },
    { t: 'Label', lv: 5, d: 'Teks pengiring input; menghubungkan nama dengan kolom isian (penting untuk aksesibilitas).' },
    { t: 'JavaScript', lv: 6, d: 'Bahasa pemrograman yang membuat halaman bisa bereaksi (klik, hitung, ubah isi).' },
    { t: 'Variabel', lv: 6, d: 'Kotak bernama untuk menyimpan nilai: let nama = "Rani".' },
    { t: 'Tipe data', lv: 6, d: 'Jenis nilai: string (teks), number (angka), boolean (true/false), array, object, null.' },
    { t: 'Fungsi', lv: 6, d: 'Blok kode yang bisa dipanggil berulang: function sapa(){ … }.' },
    { t: 'DOM', lv: 6, d: 'Document Object Model — representasi halaman sebagai objek yang bisa diubah JS.' },
    { t: 'Event', lv: 6, d: 'Peristiwa (klik, ketik, kirim form) yang bisa kamu "dengarkan" lalu bereaksi.' },
    { t: 'console.log', lv: 6, d: 'Menampilkan nilai ke Console browser untuk membantu memeriksa kode.' },
    { t: 'Array', lv: 6, d: 'Daftar bernomor: let items = ["a","b","c"]; akses lewat items[0].' },
    { t: 'Object', lv: 7, d: 'Kumpulan pasangan key: value, mis. { nama: "Rani", umur: 20 }.' },
    { t: 'localStorage', lv: 7, d: 'Penyimpanan teks di browser yang tetap ada setelah halaman ditutup.' },
    { t: 'JSON', lv: 7, d: 'Format teks untuk menukar data: {"nama":"Rani"}. Mirip object JS.' },
    { t: 'fetch', lv: 7, d: 'Fungsi JS untuk meminta data dari alamat lain (API), mengembalikan Promise.' },
    { t: 'Promise', lv: 7, d: 'Janji hasil kerja async: selesai (resolve) atau gagal (reject). Dipakai fetch.' },
    { t: 'Keyframe', lv: 7, d: 'Aturan @keyframes CSS untuk membuat animasi bertahap.' },
    { t: 'DevTools', lv: 7, d: 'Alat bawaan browser (F12) untuk memeriksa elemen, CSS, dan error JS.' }
  ];

  /* ---------- Data cheat sheet ---------- */
  var CHEAT = [
    { grp: 'HTML', lv: 1, rows: [
      ['<h1>…</h1>', 'Judul (h1 terbesar s/d h6)'],
      ['<p>…</p>', 'Paragraf'],
      ['<br>', 'Baris baru'],
      ['<hr>', 'Garis pemisah'],
      ['<!-- komentar -->', 'Komentar (tidak tampil)']
    ]},
    { grp: 'HTML', lv: 2, rows: [
      ['<strong>…</strong>', 'Teks penting (tebal)'],
      ['<em>…</em>', 'Teks penekanan (miring)'],
      ['<ul><li>…</li></ul>', 'Daftar tak bernomor'],
      ['<ol><li>…</li></ol>', 'Daftar bernomor'],
      ['<a href="url">…</a>', 'Tautan'],
      ['<a href="x.html" target="_blank">', 'Tautan ke halaman lain, tab baru'],
      ['<img src="a.jpg" alt="…">', 'Gambar'],
      ['<div>…</div>', 'Wadah blok (grouping)'],
      ['<span>…</span>', 'Wadah inline (untuk sebagian teks)'],
      ['<header><main><section><footer>', 'Tag semantik'],
      ['<table><tr><td>', 'Tabel']
    ]},
    { grp: 'CSS', lv: 3, rows: [
      ['h1 { }', 'Selector elemen'],
      ['.kelas { }', 'Selector class'],
      ['#id { }', 'Selector id'],
      ['color: #333;', 'Warna teks'],
      ['font-size: 18px;', 'Ukuran teks'],
      ['margin / padding', 'Ruang luar / dalam'],
      ['border: 1px solid #ccc;', 'Garis tepi'],
      ['background: …;', 'Latar'],
      ['border-radius: 8px;', 'Sudut membulat'],
      ['box-shadow: 0 2px 6px rgba(0,0,0,.2);', 'Bayangan'],
      ['a:hover { }', 'Saat kursor di atasnya'],
      ['transition: all .2s ease;', 'Animasi halus']
    ]},
    { grp: 'CSS', lv: 4, rows: [
      ['display: flex;', 'Tata letak satu baris/kolom'],
      ['justify-content / align-items', 'Perataan pada flex'],
      ['flex-direction: column;', 'Susun vertikal'],
      ['gap: 12px;', 'Jarak antar item'],
      ['display: grid; grid-template-columns: 1fr 1fr;', 'Tata letak kolom'],
      ['@media (max-width:600px){ }', 'Aturan khusus layar kecil'],
      ['--nama: nilai; var(--nama)', 'Variabel CSS']
    ]},
    { grp: 'HTML', lv: 5, rows: [
      ['<form>…</form>', 'Wadah formulir'],
      ['<input type="text" required>', 'Kolom teks, wajib diisi'],
      ['<textarea></textarea>', 'Kolom teks panjang'],
      ['<select><option>', 'Daftar pilihan'],
      ['<input type="checkbox">', 'Kotak centang'],
      ['<input type="radio" name="x">', 'Pilihan tunggal']
    ]},
    { grp: 'JS', lv: 6, rows: [
      ['let x = 5;', 'Deklarasi variabel'],
      ['const PI = 3.14;', 'Nilai tetap'],
      ['typeof x', 'Cek tipe data'],
      ['if (a) { } else { }', 'Bercabang'],
      ['for (let i=0;i<n;i++) { }', 'Perulangan'],
      ['function f(a){ return a*2; }', 'Fungsi'],
      ['document.querySelector(".x")', 'Pilih elemen'],
      ['el.textContent = "hi"', 'Ganti teks'],
      ['el.addEventListener("click", fn)', 'Dengarkan event']
    ]},
    { grp: 'JS', lv: 7, rows: [
      ['const o = { a:1, b:2 };', 'Object'],
      ['localStorage.setItem("k", v)', 'Simpan data lokal'],
      ['JSON.stringify(o) / JSON.parse(s)', 'Objek ↔ teks JSON'],
      ['fetch(url).then(r=>r.json()).then(d=>…)', 'Ambil data dari API'],
      ['@keyframes nama { from{} to{} }', 'Animasi CSS']
    ]}
  ];

  function maxUnlockedLevel() {
    var lv = 1;
    for (var i = 1; i <= 7; i++) { if (TutorData.isUnlocked('level-' + i, (TutorData.getLevel('level-' + i) || {}).lessons?.[0]?.id || '')) lv = i; }
    return lv;
  }

  /* ---------- Halaman: Cheat Sheet ---------- */
  function cheatsheet() {
    var unlocked = maxUnlockedLevel();
    var html = '<div class="page-title-row"><div><p class="page-kicker">Referensi</p><h1>Cheat Sheet</h1>' +
      '<p class="lede">Contekan cepat tag & sintaks. Bagian terbuka sesuai pelajaran yang sudah kamu capai.</p></div></div>' +
      '<input type="search" id="csSearch" class="cs-search" placeholder="Filter… mis. flex, margin, array" aria-label="Filter cheat sheet">';
    html += CHEAT.map(function (c) {
      var locked = c.lv > unlocked;
      return '<div class="cs-grp" data-lv="' + c.lv + '" data-grp="' + esc(c.grp) + '"' + (locked ? ' data-locked="1"' : '') + '>' +
        '<h3>' + esc(c.grp) + ' <span class="cs-lv">Level ' + c.lv + '</span>' + (locked ? ' <span class="cs-lock">🔒 terbuka menyusul</span>' : '') + '</h3>' +
        (locked ? '' : '<table class="cs-table"><tbody>' + c.rows.map(function (r) {
          return '<tr><td><code>' + esc(r[0]) + '</code></td><td>' + esc(r[1]) + '</td></tr>';
        }).join('') + '</tbody></table>') + '</div>';
    }).join('');
    TutorEngine.setMain(html);
    var inp = document.getElementById('csSearch');
    inp.addEventListener('input', function () {
      var q = inp.value.toLowerCase();
      document.querySelectorAll('.cs-grp').forEach(function (g) {
        var txt = g.textContent.toLowerCase();
        g.style.display = (!q || txt.indexOf(q) >= 0) ? '' : 'none';
      });
    });
  }

  /* ---------- Halaman: Glosarium ---------- */
  function glossary() {
    var unlocked = maxUnlockedLevel();
    var html = '<div class="page-title-row"><div><p class="page-kicker">Kamus</p><h1>Glosarium</h1>' +
      '<p class="lede">Istilah teknis dengan penjelasan bahasa manusia.</p></div></div>' +
      '<input type="search" id="glSearch" class="cs-search" placeholder="Cari istilah…" aria-label="Cari istilah">';
    html += '<div class="gl-list">' + GLOSSARY.map(function (g) {
      var locked = g.lv > unlocked;
      return '<div class="gl-item' + (locked ? ' locked' : '') + '" data-t="' + esc(g.t.toLowerCase()) + ' ' + esc(g.d.toLowerCase()) + '">' +
        '<h4>' + esc(g.t) + ' <span class="cs-lv">L' + g.lv + '</span></h4>' +
        (locked ? '<p class="muted">🔒 Terbuka setelah kamu sampai Level ' + g.lv + '.</p>' : '<p>' + esc(g.d) + '</p>') + '</div>';
    }).join('') + '</div>';
    TutorEngine.setMain(html);
    var inp = document.getElementById('glSearch');
    inp.addEventListener('input', function () {
      var q = inp.value.toLowerCase();
      document.querySelectorAll('.gl-item').forEach(function (el) {
        el.style.display = (!q || el.getAttribute('data-t').indexOf(q) >= 0) ? '' : 'none';
      });
    });
  }

  /* ---------- Halaman: Playground ---------- */
  var _pg = null;
  function playground() {
    var html = '<div class="page-title-row"><div><p class="page-kicker">Bebas</p><h1>Playground</h1>' +
      '<p class="lede">Editor kosong HTML/CSS/JS untuk eksperimen. Simpan proyekmu di perangkat ini.</p></div></div>' +
      '<div class="pg-bar"><button class="btn btn-ghost" id="pgSave">💾 Simpan</button>' +
      '<select id="pgList" class="select-inline"><option value="">— muat proyek —</option></select>' +
      '<button class="btn btn-ghost" id="pgExport">⬇ Ekspor</button>' +
      '<button class="btn btn-ghost" id="pgNew">＋ Baru</button></div>' +
      '<div id="pgMount"></div>';
    TutorEngine.setMain(html);

    var mount = document.getElementById('pgMount');
    _pg = new TutorEditor.ChallengeView(mount, {
      challenge: {
        instructions: ['Tulis apa saja. Pratinjau otomatis ter-update.'],
        tabs: ['html', 'css', 'js'],
        starterCode: { html: '<h1>Halo</h1>\n<p id="t">Coba ubah teks ini.</p>\n<button id="b">Klik aku</button>', css: 'h1 { color: #d4a24c; }\nbody { font-family: system-ui; padding: 16px; }', js: 'document.getElementById("b").addEventListener("click", function(){\n  document.getElementById("t").textContent = "Hore, berhasil!";\n  console.log("tombol diklik");\n});' },
        checks: [], hints: [], solution: {}
      },
      onComplete: function () {}
    });
    refreshPgList();
    document.getElementById('pgNew').addEventListener('click', function () {
      _pg.editors.html.ed.setValue(''); _pg.editors.css.ed.setValue(''); _pg.editors.js.ed.setValue(''); _pg._run(false);
    });
    document.getElementById('pgSave').addEventListener('click', function () {
      var name = prompt('Nama proyek:'); if (!name) return;
      var c = _pg._collect();
      var projs = TutorStore.getCustom('playground') || {};
      projs[name] = { html: c.html, css: c.css, js: c.js, at: new Date().toISOString() };
      TutorStore.patchCustom('playground', projs); refreshPgList();
      tutorToast('Proyek "' + name + '" disimpan.', 'success');
    });
    document.getElementById('pgList').addEventListener('change', function (e) {
      var name = e.target.value; if (!name) return;
      var p = (TutorStore.getCustom('playground') || {})[name]; if (!p) return;
      _pg.editors.html.ed.setValue(p.html || ''); _pg.editors.css.ed.setValue(p.css || ''); _pg.editors.js.ed.setValue(p.js || ''); _pg._run(false);
    });
    document.getElementById('pgExport').addEventListener('click', function () {
      var c = _pg._collect();
      var doc = '<!DOCTYPE html>\n<html lang="id"><head><meta charset="UTF-8"><title>Playground</title>' +
        (c.css ? '<style>' + c.css + '</style>' : '') + '</head><body>' + c.html + (c.js ? '<script>' + c.js + '<\/script>' : '') + '</body></html>';
      var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([doc], { type: 'text/html' })); a.download = 'playground.html'; a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 500);
    });
  }
  function refreshPgList() {
    var sel = document.getElementById('pgList'); if (!sel) return;
    var projs = TutorStore.getCustom('playground') || {};
    sel.innerHTML = '<option value="">— muat proyek —</option>' + Object.keys(projs).map(function (n) { return '<option value="' + esc(n) + '">' + esc(n) + '</option>'; }).join('');
  }

  /* ---------- Halaman: Review (spaced repetition) ---------- */
  function review() {
    var due = TutorStore.reviewDue();
    // kumpulkan objek soal dari semua level berdasarkan id
    var byId = {};
    TutorData.flat.forEach(function (f) { (f.lesson.quiz || []).forEach(function (q) { byId[q.id] = q; }); });
    var qs = due.map(function (id) { return byId[id]; }).filter(Boolean);
    var html = '<div class="page-title-row"><div><p class="page-kicker">Pengulangan berjarak</p><h1>Review</h1>' +
      '<p class="lede">Latih ulang soal yang pernah kamu salah. Muncul lagi setelah 1, 3, lalu 7 hari sampai benar.</p></div></div>';
    TutorEngine.setMain(html);
    var holder = document.createElement('div'); document.getElementById('main').appendChild(holder);
    if (!qs.length) {
      holder.innerHTML = '<div class="empty-state"><div class="es-emoji">🎉</div><h2>Tidak ada yang perlu di-review</h2>' +
        '<p>Semua soal yang pernah salah sudah kamu kuasai, atau belum jatuh tempo. Kerjakan pelajaran dulu ya.</p>' +
        '<p class="btn-row"><a class="btn btn-primary" href="#/">Ke Beranda</a></p></div>';
      return;
    }
    holder.insertAdjacentHTML('beforebegin', '<p class="muted">' + qs.length + ' soal menunggu untuk dilatih.</p>');
    var qv = new TutorQuiz.QuizView(holder, {
      questions: qs, pick: qs.length, passScore: 60, key: 'review',
      onFinish: function (r) {
        r.perQuestion.forEach(function (pq) { if (pq.correct) TutorStore.recordReviewPass(pq.id); else TutorStore.recordWrong(pq.id); });
        if (r.passed && global.tutorCelebrate) global.tutorCelebrate();
        tutorToast('Review selesai! Skor ' + r.score + '%', 'success');
        setTimeout(review, 800);
      }
    });
    qv.render();
  }

  global.TutorPages = {
    cheatsheet: cheatsheet, glossary: glossary, playground: playground, review: review,
    badges: function () { global.TutorGamify.badgesPage(); },
    certificate: function () { global.TutorGamify.certificatePage(); }
  };
})(window);
