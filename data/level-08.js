/* =====================================================================
   data/level-08.js — Level 8: PROYEK AKHIR (dari nol sampai jadi)
   Membangun SATU website kecil sungguhan — landing page "Kedai Senja" —
   secara bertahap: struktur HTML, lalu gaya CSS, lalu interaktivitas JS,
   sampai menjadi situs yang utuh dan berfungsi. Setiap lesson menambah
   potongan ke proyek yang sama (kode lanjutan memakai kode sebelumnya).
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- keping penyusun situs (dipakai ulang tiap lesson) ---- */
  var HEAD = '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Kedai Senja</title>\n</head>\n<body>\n';
  var END = '</body>\n</html>';
  var NAV = '  <header class="nav">\n    <div class="logo">Kedai Senja</div>\n    <nav>\n      <a href="#menu">Menu</a>\n      <a href="#tentang">Tentang</a>\n      <a href="#kontak">Kontak</a>\n    </nav>\n    <button id="tema">Tema</button>\n    <span id="temastatus">Terang</span>\n  </header>\n';
  var HERO = '  <section class="hero">\n    <h1>Kopi &amp; Camilan Terbaik</h1>\n    <p>Nikmati suasana senja di setiap tegukan.</p>\n    <a href="#kontak" class="cta">Pesan Sekarang</a>\n  </section>\n';
  var MENU = '  <section id="menu">\n    <h2>Menu Favorit</h2>\n    <div class="kartu">\n      <article class="item">\n        <h3>Kopi Susu</h3>\n        <p class="harga">Rp18.000</p>\n        <button id="plus">+1</button>\n        <button id="minus">-1</button>\n      </article>\n      <article class="item">\n        <h3>Matcha</h3>\n        <p class="harga">Rp22.000</p>\n      </article>\n      <article class="item">\n        <h3>Croissant</h3>\n        <p class="harga">Rp15.000</p>\n      </article>\n    </div>\n    <p>Total: <strong id="total">Rp0</strong></p>\n  </section>\n';
  var TENTANG = '  <section id="tentang">\n    <h2>Tentang Kami</h2>\n    <p>Kedai kecil yang menyajikan kopi lokal sejak 2022.</p>\n  </section>\n';
  var KONTAK = '  <section id="kontak">\n    <h2>Pesanan</h2>\n    <input id="nama" placeholder="Nama kamu">\n    <button id="kirim">Kirim Pesanan</button>\n    <p id="hasil"></p>\n  </section>\n';
  var FOOT = '  <footer>&copy; 2026 Kedai Senja</footer>\n';
  var HTML_AWAL = HEAD + END;
  var HTML_NAV_HERO = HEAD + NAV + HERO + END;
  var HTML_FULL = HEAD + NAV + HERO + MENU + TENTANG + KONTAK + FOOT + END;

  var CSS_BASE = ':root { --aksen: #b5651d; --teks: #2a211b; --bg: #f5efe6; }\n* { box-sizing: border-box; }\nbody { margin: 0; font-family: system-ui, sans-serif; color: var(--teks); background: var(--bg); }\n.hero { padding: 48px 20px; text-align: center; }\n.hero h1 { color: var(--aksen); font-size: 2.4rem; }\n.cta { display: inline-block; background: var(--aksen); color: #fff; padding: 12px 22px; border-radius: 999px; text-decoration: none; }\n';
  var CSS_DARK = 'body.gelap { --teks: #f5efe6; --bg: #201a16; }\n';
  var CSS_LAYOUT = '.nav { display: flex; align-items: center; gap: 16px; padding: 14px 20px; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.08); }\n.nav nav { margin-left: auto; }\n.nav a { margin-left: 14px; color: var(--teks); text-decoration: none; }\n.kartu { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 0 20px; }\n.item { background: #fff; padding: 16px; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.08); }\nsection { padding: 8px 20px 24px; }\nfooter { padding: 20px; text-align: center; background: #2a211b; color: #fff; }\n@media (max-width: 640px) { .kartu { grid-template-columns: 1fr; } }\n';
  var CSS_FULL = CSS_BASE + CSS_DARK + CSS_LAYOUT;

  var JS_THEME = 'var temaBtn = document.getElementById("tema");\nvar statusEl = document.getElementById("temastatus");\ntemaBtn.addEventListener("click", function () {\n  var gelap = document.body.classList.toggle("gelap");\n  statusEl.textContent = gelap ? "Gelap" : "Terang";\n});\n';
  var JS_COUNTER = 'var hargaSatuan = 18000;\nvar qty = 0;\nvar totalEl = document.getElementById("total");\nfunction gambarTotal() {\n  totalEl.textContent = "Rp" + (qty * hargaSatuan).toLocaleString("id-ID");\n}\ndocument.getElementById("plus").addEventListener("click", function () {\n  qty = qty + 1;\n  gambarTotal();\n});\ndocument.getElementById("minus").addEventListener("click", function () {\n  if (qty > 0) { qty = qty - 1; gambarTotal(); }\n});\n';
  var JS_FORM = 'document.getElementById("kirim").addEventListener("click", function () {\n  var nama = document.getElementById("nama").value.trim();\n  var out = document.getElementById("hasil");\n  if (!nama) { out.textContent = "Isi nama dulu ya!"; return; }\n  out.textContent = "Terima kasih, " + nama + "! Pesanan siap diproses.";\n});\n';

  var LEVEL = {
    id: 'level-8',
    num: 8,
    title: 'Proyek Akhir: Website Jadi',
    subtitle: 'Rangkum semuanya: bangun satu website kecil sungguhan — HTML, CSS, dan JavaScript — selangkah demi selangkah sampai benar-benar jadi dan berfungsi.',
    lessons: [

      /* 8.1 — struktur HTML: navigasi + hero */
      {
        id: 'l8-1',
        title: 'Mulai proyek: kerangka & navigasi',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Kita bangun satu website, dari nol' },
          { type: 'p', html: 'Di level pamungkas ini, kamu tidak lagi mengerjakan potongan terpencel — kamu <strong>membangun satu situs utuh</strong>: halaman kedai kopi bernama <em>Kedai Senja</em>. Kita mulai dari kerangka HTML, lanjut menata CSS, lalu menghidupkannya dengan JavaScript.' },
          { type: 'callout', title: 'Alur proyek', html: 'Lesson 1–2: struktur HTML. 3–4: gaya & tata letak CSS. 5–7: interaktivitas JavaScript sampai situs <em>jadi</em>.' },
          { type: 'p', html: 'Sama seperti Level 5, kita memetakannya lebih dulu: <code>header.nav</code> berisi logo + taut navigasi, lalu <code>section.hero</code> berisi judul besar, tagline, dan tombol ajakan (CTA).' },
          { type: 'code', lang: 'html', code: '<header class="nav">\n  <div class="logo">Kedai Senja</div>\n  <nav>\n    <a href="#menu">Menu</a>\n    <a href="#tentang">Tentang</a>\n    <a href="#kontak">Kontak</a>\n  </nav>\n</header>\n\n<section class="hero">\n  <h1>Judul besar</h1>\n  <p>Tagline singkat.</p>\n  <a href="#kontak" class="cta">Pesan Sekarang</a>\n</section>' },
          { type: 'list', items: [
            '<code>href="#menu"</code> akan melompat ke bagian berniat <code>id="menu"</code> — kita pasangkan nanti.',
            'Simpan tombol <code>#tema</code> dan <code>#temastatus</code> di navigasi; JavaScript memakainya di lesson 5.',
            'Satu halaman, banyak <code>section</code> — inilah pola umum landing page.'
          ] }
        ],
        challenge: {
          title: 'Buat header navigasi + hero',
          brief: 'Di index.html, buat <header class="nav"> berisi <div class="logo"> dan <nav> dengan 3 tautan (Menu, Tentang, Kontak). Lalu buat <section class="hero"> dengan <h1>, <p>, dan tautan <a class="cta">.',
          tabs: ['html'],
          starterCode: { html: HTML_AWAL },
          hint: [
            'Header: <header class="nav"> ... </header> dengan satu div.logo dan satu <nav>.',
            'Dalam <nav>, taruh tiga <a href="#...">Menu</a> dan seterusnya.',
            'Hero: <section class="hero"> berisi <h1>, <p>, lalu <a href="#kontak" class="cta">Pesan Sekarang</a>.',
            'Sertakan juga <button id="tema">Tema</button> dan <span id="temastatus">Terang</span> di dalam header untuk dipakai nanti.'
          ],
          checks: [
            { id: 'c1', type: 'exists', selector: 'header.nav', label: 'Ada header.nav' },
            { id: 'c2', type: 'count', selector: '.nav nav a', min: 3, label: '3 tautan navigasi' },
            { id: 'c3', type: 'exists', selector: '.hero h1', label: 'Judul hero' },
            { id: 'c4', type: 'exists', selector: '.cta', label: 'Tombol CTA (.cta)' }
          ],
          solution: { html: HTML_NAV_HERO },
          celebrate: 'Kerangka awal berdiri! Situsmu punya navigasi dan hero yang siap diisi.'
        },
        quiz: [
            { type: 'mcq', id: 'l8-1-q1', q: 'Apa fungsi href="#kontak" pada sebuah tautan?', options: ['Melompat ke elemen ber-id "kontak" di halaman yang sama', 'Membuka situs lain', 'Mengirim email', 'Mengulang halaman', 'Menutup halaman'], answer: 0, explanation: 'Awalan # menunjuk ke id target untuk lompat anchor.' },
            { type: 'mcq', id: 'l8-1-q2', q: 'Section <code>header</code> biasanya dipakai untuk…', options: ['Bagian pembuka/navigasi atas halaman', 'Isi utama artikel', 'Catatan kaki', 'Gambar', 'Skrip'], answer: 0, explanation: 'header menandai wilayah kepala/navigasi.' },
            { type: 'fill', id: 'l8-1-q3', q: 'Tag pembungkus navigasi:', before: '<______>\n  <a href="#menu">Menu</a>\n</______>', answerText: ['nav'], explanation: 'Elemen <nav> menandai blok tautan navigasi.' },
            { type: 'mcq', id: 'l8-1-q4', q: 'Istilah "CTA" pada tombol ajakan berarti…', options: ['Call To Action (ajakan bertindak)', 'Cascading Text Attribute', 'Core Tag Element', 'Cached Template Asset', 'Close The Anchor'], answer: 0, explanation: 'CTA = Call To Action, tombol yang mengajak pengguna bertindak.' },
            { type: 'order', id: 'l8-1-q5', q: 'Urutan penyusun halaman yang lazim:', lines: ['Deklarasi <!DOCTYPE html>', '<html> & <head> (meta, judul)', '<body> dengan header/nav', 'Section konten (hero, menu, dst)', '<footer> penutup'], explanation: 'Dari deklarasi, kepala, badan, konten, lalu penutup.' }
        ]
      },

      /* 8.2 — konten HTML: menu, tentang, kontak, footer */
      {
        id: 'l8-2',
        title: 'Mengisi konten: menu, tentang, kontak',
        minutes: 8,
        reading: [
          { type: 'h2', text: 'Menambah badan situs' },
          { type: 'p', html: 'Kerangka sudah ada. Sekarang isi bagian utamanya: <strong>menu</strong> (daftar produk), <strong>tentang</strong>, dan <strong>kontak/pesanan</strong>, ditutup sebuah <code>footer</code>.' },
          { type: 'p', html: 'Daftar menu kita susun sebagai kartu-kartu (<code>.item</code> di dalam <code>.kartu</code>). Tiap kartu punya nama & harga. Satu kartu pertama dilengkapi tombol <code>#plus</code>/<code>#minus</code> untuk demo pesanan nanti.' },
          { type: 'code', lang: 'html', code: '<section id="menu">\n  <h2>Menu Favorit</h2>\n  <div class="kartu">\n    <article class="item">\n      <h3>Kopi Susu</h3>\n      <p class="harga">Rp18.000</p>\n      <button id="plus">+1</button>\n      <button id="minus">-1</button>\n    </article>\n    <!-- item lain -->\n  </div>\n  <p>Total: <strong id="total">Rp0</strong></p>\n</section>' },
          { type: 'callout', title: 'id untuk JavaScript', html: 'Tombol <code>#kirim</code>, isian <code>#nama</code>, dan hasil <code>#hasil</code> di bagian kontak adalah "handle" yang akan disambungkan JavaScript di lesson 7.' }
        ],
        challenge: {
          title: 'Tambahkan section menu, tentang, kontak, footer',
          brief: 'Lengkapi HTML: <section id="menu"> berisi <div class="kartu"> dengan 3 <article class="item"> (tiap item ada h3 & p.harga) plus <p>Total: <strong id="total">Rp0</strong></p>. Tambah <section id="tentang">, <section id="kontak"> (dengan <input id="nama">, <button id="kirim">, <p id="hasil">), dan <footer>.',
          tabs: ['html'],
          starterCode: { html: HTML_NAV_HERO },
          hint: [
            'Bungkus kartu dalam <div class="kartu">, tiap produk <article class="item">.',
            'Minimal 3 .item — kopi, matcha, croissant.',
            'Kontak: input#nama, button#kirim, dan p#hasil (boleh kosong isinya).',
            'Akhiri dengan <footer>&copy; 2026 Kedai Senja</footer>.'
          ],
          checks: [
            { id: 'c1', type: 'exists', selector: '#menu', label: 'Ada section #menu' },
            { id: 'c2', type: 'count', selector: '.item', min: 3, label: 'Minimal 3 item menu' },
            { id: 'c3', type: 'exists', selector: '#kontak', label: 'Ada section #kontak' },
            { id: 'c4', type: 'exists', selector: '#kirim', label: 'Ada tombol #kirim' },
            { id: 'c5', type: 'exists', selector: 'footer', label: 'Ada footer' }
          ],
          solution: { html: HTML_FULL },
          celebrate: 'Struktur lengkap! Situsmu kini punya menu, profil, dan form — tinggal didandani.'
        },
        quiz: [
            { type: 'mcq', id: 'l8-2-q1', q: 'Tag paling tepat untuk satu kartu produk di daftar menu?', options: ['<article>', '<p>', '<h1>', '<br>', '<hr>'], answer: 0, explanation: 'article menandai bagian mandiri seperti satu kartu produk.' },
            { type: 'multi', id: 'l8-2-q2', q: 'Bagian yang wajib ada di section kontak agar bisa divalidasi JS:', options: ['<input id="nama">', '<button id="kirim">', '<p id="hasil">', '<video>', '<table>'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Elemen video tidak berperan pada form.', 'Table untuk data tabular, bukan input.'], explanation: 'Isian, tombol, dan tempat pesan adalah ketiganya.' },
            { type: 'mcq', id: 'l8-2-q3', q: 'Untuk menulis "©" tanpa karakter khusus, kita pakai…', options: ['entitas &copy;', 'tag <copy>', 'CSS ©', 'JavaScript', 'kompilasi'], answer: 0, explanation: 'Entitas HTML seperti &copy; menampilkan karakter khusus dengan aman.' },
            { type: 'fill', id: 'l8-2-q4', q: 'Atribut pemberi nama unik untuk dipakai CSS/JS:', before: '<section ____="menu">', answerText: ['id'], explanation: 'id memberi nama unik satu elemen, dipakai CSS (#menu) maupun JS (getElementById).' },
            { type: 'bug', id: 'l8-2-q5', q: 'Struktur kartu rusak.', code: '<div class="kartu">\n  <article class="item">\n    <h3>Kopi</h3>\n    <p class="harga">Rp18.000</p>\n  <article>\n</div>', instruction: 'Klik baris yang mengandung kesalahan.', bugLine: 4, explanation: 'Baris 5 membuka <article> lagi, padahal seharusnya tag penutup </article>.' }
        ]
      },

      /* 8.3 — CSS dasar */
      {
        id: 'l8-3',
        title: 'Gaya dasar: warna & tipografi',
        minutes: 8,
        reading: [
          { type: 'h2', text: 'Situs mulai terlihat' },
          { type: 'p', html: 'Saatnya menabur gaya di <code>style.css</code>. Kita pakai <strong>variabel CSS</strong> di <code>:root</code> untuk palet warna, memberi gaya dasar <code>body</code>, lalu mempercantik <code>.hero</code> dan tombol <code>.cta</code>.' },
          { type: 'code', lang: 'css', code: ':root { --aksen: #b5651d; --teks: #2a211b; --bg: #f5efe6; }\nbody { margin: 0; font-family: system-ui, sans-serif;\n  color: var(--teks); background: var(--bg); }\n.hero { padding: 48px 20px; text-align: center; }\n.cta { display: inline-block; background: var(--aksen); color: #fff;\n  padding: 12px 22px; border-radius: 999px; }' },
          { type: 'term', word: 'border-radius: 999px', meaning: 'Nilai besar membuat ujung membulat sempurna — kiat populer untuk bentuk "pil".' },
          { type: 'callout', title: 'Kenapa variabel?', html: 'Warna aksen dipakai di banyak tempat. Dengan <code>--aksen</code>, satu perubahan di <code>:root</code> langsung memperbarui semuanya.' }
        ],
        challenge: {
          title: 'Beri gaya dasar (variabel, body, hero, cta)',
          brief: 'Di style.css, definisikan variabel warna di <code>:root</code> (termasuk --aksen), atur gaya <code>body</code>, beri <code>.hero</code> padding (48px di atas) dan rata tengah, serta buat <code>.cta</code> menjadi tombol <em>inline-block</em> dengan ujung membulat.',
          tabs: ['html', 'css'],
          starterCode: { html: HTML_FULL, css: '/* Gaya dasar: tambahkan variabel warna, body, .hero, dan .cta */' },
          hint: [
            ':root { --aksen: #b5651d; --teks: #2a211b; --bg: #f5efe6; }',
            'body { margin:0; font-family: system-ui, sans-serif; color: var(--teks); background: var(--bg); }',
            '.hero { padding: 48px 20px; text-align: center; }',
            '.cta { display: inline-block; background: var(--aksen); color:#fff; padding:12px 22px; border-radius:999px; }'
          ],
          checks: [
            { id: 'c1', type: 'text', selector: '.hero h1', contains: 'Kopi', label: 'Judul hero tampil' },
            { id: 'c2', type: 'style', selector: '.hero', prop: 'padding-top', value: '48px', label: '.hero padding atas 48px' },
            { id: 'c3', type: 'style', selector: '.cta', prop: 'display', value: 'inline-block', label: '.cta inline-block' },
            { id: 'c4', type: 'jsExpr', expr: "doc.getElementById('user-css').textContent.indexOf('--aksen')>=0", msg: 'Definisikan variabel --aksen di :root' }
          ],
          solution: { html: HTML_FULL, css: CSS_BASE },
          celebrate: 'Sentuhan pertama! Hero dan tombol kini terlihat seperti situs betulan.'
        },
        quiz: [
            { type: 'mcq', id: 'l8-3-q1', q: 'Cara membaca variabel CSS --aksen?', options: ['var(--aksen)', '$aksen', '{--aksen}', '@aksen', '#aksen'], answer: 0, explanation: 'Fungsi var() memanggil nilai variabel.' },
            { type: 'mcq', id: 'l8-3-q2', q: 'border-radius: 999px pada tombol menghasilkan…', options: ['Ujung membulat seperti pil', 'Bayangan tebal', 'Garis tepi', 'Tulisan miring', 'Transparansi'], answer: 0, explanation: 'Radius besar membuat seluruh ujung melingkar sempurna.' },
            { type: 'multi', id: 'l8-3-q3', q: 'Properti yang mengatur jarak/"napas" elemen:', options: ['padding', 'margin', 'gap', 'width', 'color'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'width mengatur lebar, bukan jarak.', 'color mengatur warna, bukan jarak.'], explanation: 'padding, margin, dan gap mengatur jarak di dalam/luar antar elemen.' },
            { type: 'fill', id: 'l8-3-q4', q: 'Selector tempat variabel didaftarkan:', before: '______ { --aksen: #b5651d; }', answerText: [':root', 'root'], explanation: ':root menandai elemen terluar tempat variabel global didefinisikan.' },
            { type: 'mcq', id: 'l8-3-q5', q: 'text-align: center pada .hero akan…', options: ['Meratakan isi teks ke tengah', 'Memusatkan elemen secara flex', 'Mengubah warna', 'Menambah padding', 'Membuat kolom'], answer: 0, explanation: 'text-align memusatkan teks di dalam blok.' }
        ]
      },

      /* 8.4 — CSS tata letak & responsif */
      {
        id: 'l8-4',
        title: 'Tata letak & responsif',
        minutes: 8,
        reading: [
          { type: 'h2', text: 'Menempatkan kartu & navbar' },
          { type: 'p', html: 'Kita pakai dua raksasa layout: <code>display:flex</code> untuk navbar (sebar mendatar), dan <code>display:grid</code> untuk daftar menu (kisi kolom). Flex untuk satu dimensi, grid untuk dua dimensi.' },
          { type: 'code', lang: 'css', code: '.nav { display: flex; align-items: center; gap: 16px; }\n.nav nav { margin-left: auto; }   /* dorong tautan ke kanan */\n.kartu { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n\n@media (max-width: 640px) {\n  .kartu { grid-template-columns: 1fr; }  /* jadi satu kolom */\n}' },
          { type: 'list', items: [
            '<code>margin-left:auto</code> pada nav mendorong tautan merapat ke kanan.',
            '<code>repeat(3,1fr)</code> membuat tiga kolom rata.',
            'Media query meleburkan kisi jadi satu kolom di layar sempit.'
          ] }
        ],
        challenge: {
          title: 'Buat navbar flex, menu grid, & responsif',
          brief: 'Tambahkan CSS: <code>.nav</code> menjadi flex dengan item terpusat, <code>.kartu</code> menjadi grid 3 kolom, dan sebuah <code>@media (max-width:640px)</code> yang mengubah <code>.kartu</code> menjadi satu kolom.',
          tabs: ['html', 'css'],
          starterCode: { html: HTML_FULL, css: CSS_BASE + '\n/* TODO: buat .nav flex, .kartu grid, dan tambahkan @media */' },
          hint: [
            '.nav { display: flex; align-items: center; gap: 16px; }',
            '.kartu { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }',
            '@media (max-width: 640px) { .kartu { grid-template-columns: 1fr; } }',
            '.nav nav { margin-left: auto; } agar tautan rata kanan.'
          ],
          checks: [
            { id: 'c1', type: 'style', selector: '.nav', prop: 'display', value: 'flex', label: '.nav = flex' },
            { id: 'c2', type: 'style', selector: '.kartu', prop: 'display', value: 'grid', label: '.kartu = grid' },
            { id: 'c3', type: 'count', selector: '.item', min: 3, label: '3 kartu menu' },
            { id: 'c4', type: 'jsExpr', expr: "doc.getElementById('user-css').textContent.indexOf('@media')>=0", msg: 'Tambahkan media query @media' }
          ],
          solution: { html: HTML_FULL, css: CSS_FULL },
          celebrate: 'Tata letak jadi! Rapi di desktop, gesit di ponsel.'
        },
        quiz: [
            { type: 'mcq', id: 'l8-4-q1', q: 'Untuk kisi 3 kolom, kita pakai…', options: ['display: grid', 'display: flex saja', 'position: absolute', 'float: left', 'text-align'], answer: 0, explanation: 'Grid mengatur kolom & baris (2 dimensi).' },
            { type: 'mcq', id: 'l8-4-q2', q: 'Fungsi @media (max-width: 640px){…}?', options: ['Memakai gaya hanya saat layar ≤ 640px', 'Gaya selalu aktif', 'Mengubah JS', 'Memuat font', 'Menyembunyikan HTML'], answer: 0, explanation: 'Kondisi max-width menerapkan isi hanya pada layar sempit.' },
            { type: 'mcq', id: 'l8-4-q3', q: 'margin-left: auto pada nav bertujuan…', options: ['Mendorong nav ke tepi kanan', 'Menghapus margin', 'Menengahkan teks', 'Membuat border', 'Mengubah warna'], answer: 0, explanation: 'auto menyerap ruang sisa dan menggeser nav ke kanan.' },
            { type: 'fill', id: 'l8-4-q4', q: 'Fungsi CSS untuk mengulang kolom:', before: 'grid-template-columns: ______(3, 1fr);', answerText: ['repeat'], explanation: 'repeat(3, 1fr) membuat tiga kolom rata.' },
            { type: 'order', id: 'l8-4-q5', q: 'Urutan dari makro ke mikro saat menata layout:', lines: ['Tentukan arah (flex/grid)', 'Atur kolom/baris', 'Beri jarak (gap/padding)', 'Selaraskan (align/justify)', 'Tambah breakpoint @media'], explanation: 'Arah dulu, lalu struktur kolom, jarak, perataan, baru penyesuaian responsif.' }
        ]
      },

      /* 8.5 — JS: toggle tema */
      {
        id: 'l8-5',
        title: 'Menghidupkan situs: toggle tema',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Sekarang JavaScript masuk' },
          { type: 'p', html: 'Fitur pertama: tombol <code>#tema</code> yang berganti mode terang/gelap. Saat diklik, kita <em>toggle</em> class <code>gelap</code> pada <code>&lt;body&gt;</code> dan memperbarui teks status.' },
          { type: 'code', lang: 'js', code: 'var temaBtn = document.getElementById("tema");\nvar statusEl = document.getElementById("temastatus");\ntemaBtn.addEventListener("click", function () {\n  var gelap = document.body.classList.toggle("gelap");\n  statusEl.textContent = gelap ? "Gelap" : "Terang";\n});' },
          { type: 'term', word: 'classList.toggle', meaning: 'Menambah class jika belum ada, menghapusnya jika sudah ada; mengembalikan true/false menandai hasilnya.' },
          { type: 'callout', title: 'Cek otomatis', html: 'Pemeriksaan memakai reaksi sungguhan: tombol ditekan lalu sistem melihat teks <code>#temastatus</code> benar-benar berubah.' }
        ],
        challenge: {
          title: 'Buat tombol tema berfungsi',
          brief: 'Di script.js, pasang pendengar klik pada <code>#tema</code>. Saat diklik: toggle class <code>"gelap"</code> pada <code>document.body</code>, lalu set <code>#temastatus</code> menjadi "Gelap" atau "Terang" sesuai hasil toggle.',
          tabs: ['html', 'css', 'js'],
          starterCode: { html: HTML_FULL, css: CSS_FULL, js: '// TODO: saat #tema diklik, toggle class "gelap" pada body dan ubah teks #temastatus' },
          hint: [
            'Ambil elemen: document.getElementById("tema").',
            'Pakai addEventListener("click", function () { ... }).',
            'var gelap = document.body.classList.toggle("gelap");',
            'statusEl.textContent = gelap ? "Gelap" : "Terang";'
          ],
          checks: [
            { id: 'c1', type: 'exists', selector: '#tema', label: 'Ada tombol #tema' },
            { id: 'c2', type: 'text', selector: '#temastatus', contains: 'Terang', label: 'Status awal "Terang"' },
            { id: 'c3', type: 'clickChanges', button: '#tema', target: '#temastatus', label: 'Klik #tema mengubah status' }
          ],
          solution: { html: HTML_FULL, css: CSS_FULL, js: JS_THEME },
          celebrate: 'Klik pertama yang hidup! Situs kini bisa berganti wajah.'
        },
        quiz: [
            { type: 'mcq', id: 'l8-5-q1', q: 'Nilai kembali classList.toggle("gelap") saat class baru saja DITAMBAHKAN?', options: ['true', 'false', '"gelap"', 'undefined', '0'], answer: 0, explanation: 'toggle mengembalikan true bila class jadi aktif.' },
            { type: 'mcq', id: 'l8-5-q2', q: 'Perintah memasang aksi saat tombol diklik:', options: ['btn.addEventListener("click", fn)', 'btn.onClick(fn)', 'click(btn, fn)', 'btn.listen("click")', 'addEventListener(fn)'], answer: 0, explanation: 'addEventListener adalah cara baku memasang event.' },
            { type: 'fill', id: 'l8-5-q3', q: 'Properti untuk menulis teks elemen:', before: 'el.______ = "Halo";', answerText: ['textContent', 'innerText'], explanation: 'textContent (atau innerText) menaruh tulisan ke dalam elemen.' },
            { type: 'multi', id: 'l8-5-q4', q: 'Yang termasuk cara memilih elemen DOM:', options: ['getElementById', 'querySelector', 'getElementsByClassName', 'selectNode', 'pickDOM'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'selectNode bukan API DOM.', 'pickDOM tidak ada di JavaScript.'], explanation: 'Tiga API seleksi DOM yang sah.' },
            { type: 'bug', id: 'l8-5-q5', q: 'Status tak berubah saat tombol diklik.', code: 'document.getElementById("tema").addEventListener("click", function () {\n  var gelap = document.body.classList.toggle("gelap");\n  document.getElementById("temastatus").value = gelap ? "Gelap" : "Terang";\n});', instruction: 'Klik baris yang menjadi sumber masalah.', bugLine: 2, explanation: 'Baris 3 memakai .value, padahal <span> butuh .textContent — tulisan tak akan berubah.' }
        ]
      },

      /* 8.6 — JS: keranjang pesanan (counter harga) */
      {
        id: 'l8-6',
        title: 'Keranjang pesanan: hitung total',
        minutes: 8,
        reading: [
          { type: 'h2', text: 'Data + peristiwa = UI hidup' },
          { type: 'p', html: 'Fitur kedua: penghitung pesanan. Variabel <code>qty</code> menyimpan jumlah item; tombol <code>#plus</code>/<code>#minus</code> mengubahnya, lalu <code>#total</code> diperbarui memakai harga per item.' },
          { type: 'code', lang: 'js', code: 'var hargaSatuan = 18000;\nvar qty = 0;\nvar totalEl = document.getElementById("total");\nfunction gambarTotal() {\n  totalEl.textContent = "Rp" + (qty * hargaSatuan).toLocaleString("id-ID");\n}\ndocument.getElementById("plus").addEventListener("click", function () {\n  qty = qty + 1; gambarTotal();\n});' },
          { type: 'list', items: [
            '<code>qty > 0</code> menjaga jumlah tak turun di bawah nol.',
            '<code>toLocaleString("id-ID")</code> merapikan angka jadi ribuan (18.000).',
            'Memisahkan fungsi <code>gambarTotal()</code> menghindari duplikasi kode.'
          ] }
        ],
        challenge: {
          title: 'Buat penghitung total pesanan',
          brief: 'Lanjutkan script.js: buat variabel <code>qty</code> (mulai 0) dan harga per item (18000). Tombol <code>#plus</code> menaikkan qty, <code>#minus</code> menurunkan (tak di bawah 0), lalu perbarui <code>#total</code> menjadi "Rp" + jumlah × harga.',
          tabs: ['html', 'css', 'js'],
          starterCode: { html: HTML_FULL, css: CSS_FULL, js: JS_THEME + '\n// TODO: #plus menaikkan qty, #minus menurunkan, lalu update #total (Rp18.000 per item)' },
          hint: [
            'var hargaSatuan = 18000; var qty = 0;',
            'function gambarTotal(){ totalEl.textContent = "Rp" + (qty*hargaSatuan).toLocaleString("id-ID"); }',
            'Plus: qty = qty + 1; lalu gambarTotal();',
            'Minus: if (qty > 0) { qty = qty - 1; gambarTotal(); }'
          ],
          checks: [
            { id: 'c1', type: 'exists', selector: '#total', label: 'Ada #total' },
            { id: 'c2', type: 'text', selector: '#total', contains: 'Rp', label: 'Total berisi "Rp"' },
            { id: 'c3', type: 'clickChanges', button: '#plus', target: '#total', label: 'Klik #plus mengubah total' }
          ],
          solution: { html: HTML_FULL, css: CSS_FULL, js: JS_THEME + JS_COUNTER },
          celebrate: 'Angka bergerak! Fitur keranjang pesanan sudah berfungsi.'
        },
        quiz: [
            { type: 'mcq', id: 'l8-6-q1', q: 'Agar jumlah tidak jadi negatif saat #minus diklik?', options: ['if (qty > 0) { qty = qty - 1; }', 'qty = qty - 1;', 'qty = Math.abs(qty);', 'qty = 0;', 'qty--;'], answer: 0, explanation: 'Pagar kondisi menjaga qty tak turun dari 0.' },
            { type: 'fill', id: 'l8-6-q2', q: 'Method merapikan angka berformat ribuan lokal:', before: '(18000).___________("id-ID")', answerText: ['toLocaleString'], explanation: 'toLocaleString memformat angka sesuai locale (18.000).' },
            { type: 'mcq', id: 'l8-6-q3', q: 'Jika qty = 3 dan harga 18000, total yang tampil…', options: ['Rp54.000', 'Rp18.000', 'Rp3', 'Rp21.000', 'Rp0'], answer: 0, explanation: '3 × 18.000 = 54.000.' },
            { type: 'multi', id: 'l8-6-q4', q: 'Yang benar tentang memisahkan fungsi gambarTotal():', options: ['Menghindari kode duplikat', 'Menyatukan logika tampilan', 'Mudah diubah satu tempat', 'Memperlambat halaman', 'Wajib untuk counter'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Fungsi tidak memperlambat halaman.', 'Bukan wajib, hanya praktik baik.'], explanation: 'Fungsi memusatkan logika render.' },
            { type: 'bug', id: 'l8-6-q5', q: 'Total tidak berubah walau #plus diklik.', code: 'var qty = 0;\nfunction gambarTotal() {\n  var total = qty * 18000;\n  document.getElementById("total").value = total;\n}', instruction: 'Klik baris yang keliru.', bugLine: 3, explanation: 'Untuk <strong> pakai textContent, bukan .value (value hanya untuk elemen input).' }
        ]
      },

      /* 8.7 — JS: form validasi + situs jadi */
      {
        id: 'l8-7',
        title: 'Sentuhan akhir: form & situs jadi!',
        minutes: 9,
        reading: [
          { type: 'h2', text: 'Menyempurnakan pesanan' },
          { type: 'p', html: 'Fitur terakhir: form pesanan di bagian kontak. Saat <code>#kirim</code> ditekan, kita baca isian <code>#nama</code>. Bila kosong beri peringatan; bila terisi, ucapkan terima kasih di <code>#hasil</code>.' },
          { type: 'code', lang: 'js', code: 'document.getElementById("kirim").addEventListener("click", function () {\n  var nama = document.getElementById("nama").value.trim();\n  var out = document.getElementById("hasil");\n  if (!nama) { out.textContent = "Isi nama dulu ya!"; return; }\n  out.textContent = "Terima kasih, " + nama + "! Pesanan siap diproses.";\n});' },
          { type: 'callout', title: 'Satu situs utuh', html: 'Setelah ini, semua potongan menyatu: HTML (struktur) + CSS (gaya responsif) + JS (tema, keranjang, form). Kamu resmi membangun website kecil dari nol sampai <strong>jadi</strong>.' }
        ],
        challenge: {
          title: 'Rampungkan situs: validasi form',
          brief: 'Lanjutkan script.js: saat <code>#kirim</code> diklik, baca nilai <code>#nama</code> (pakai .value.trim()). Bila kosong, set <code>#hasil</code> ke peringatan ("Isi nama dulu ya!"); bila terisi, tampilkan ucapan terima kasih yang menyertakan nama.',
          tabs: ['html', 'css', 'js'],
          starterCode: { html: HTML_FULL, css: CSS_FULL, js: JS_THEME + JS_COUNTER + '\n// TODO: saat #kirim diklik, baca #nama; kosong -> peringatan, terisi -> ucapan terima kasih di #hasil' },
          hint: [
            'var nama = document.getElementById("nama").value.trim();',
            'if (!nama) { document.getElementById("hasil").textContent = "Isi nama dulu ya!"; return; }',
            'Else: "Terima kasih, " + nama + "! Pesanan siap diproses."'
          ],
          checks: [
            { id: 'c1', type: 'exists', selector: 'header.nav', label: 'Struktur HTML utuh' },
            { id: 'c2', type: 'count', selector: '.item', min: 3, label: 'Menu lengkap' },
            { id: 'c3', type: 'style', selector: '.kartu', prop: 'display', value: 'grid', label: 'CSS grid aktif' },
            { id: 'c4', type: 'clickChanges', button: '#kirim', target: '#hasil', label: 'Form merespons' },
            { id: 'c5', type: 'clickChanges', button: '#tema', target: '#temastatus', label: 'Tema bekerja' },
            { id: 'c6', type: 'clickChanges', button: '#plus', target: '#total', label: 'Keranjang bekerja' }
          ],
          solution: { html: HTML_FULL, css: CSS_FULL, js: JS_THEME + JS_COUNTER + JS_FORM },
          celebrate: 'SELESAI! Kamu baru saja membangun website kecil sungguhan — HTML, CSS, dan JavaScript menyatu jadi satu.'
        },
        quiz: [
            { type: 'mcq', id: 'l8-7-q1', q: 'Mengapa .trim() dipakai saat membaca input nama?', options: ['Menghapus spasi kosong di awal/akhir', 'Mengubah jadi angka', 'Menambah huruf', 'Menghapus semua karakter', 'Membesar-hurufkan'], answer: 0, explanation: 'trim membuang spasi tak terlihat agar cek kosong akurat.' },
            { type: 'mcq', id: 'l8-7-q2', q: 'Pernyataan yang membuat fungsi berhenti lebih awal bila nama kosong?', options: ['return;', 'break;', 'continue;', 'exit;', 'stop();'], answer: 0, explanation: 'return keluar dari fungsi sebelum baris ucapan.' },
            { type: 'multi', id: 'l8-7-q3', q: 'Tiga pilar yang dipadukan proyek ini:', options: ['HTML untuk struktur', 'CSS untuk gaya', 'JavaScript untuk perilaku', 'PHP untuk database', 'SQL untuk tabel'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'PHP bahasa server, tak dipakai di sini.', 'SQL untuk database, tak ada di proyek ini.'], explanation: 'Front-end situs dibangun dari ketiganya.' },
            { type: 'mcq', id: 'l8-7-q4', q: 'Proyek ini tanpa backend. Artinya data pesanan…', options: ['Hanya hidup di sisi klien (browser)', 'Tersimpan permanen di server', 'Terkirim ke database', 'Dienkripsi otomatis', 'Dikirim via email'], answer: 0, explanation: 'Semua berjalan di browser; tak ada penyimpanan server.' },
            { type: 'order', id: 'l8-7-q5', q: 'Alur membangun proyek front-end yang sehat:', lines: ['Rancang struktur HTML', 'Rapikan tata letak & gaya CSS', 'Tambah interaktivitas JS', 'Uji & perbaiki (debug)', 'Poles & publikasikan'], explanation: 'Struktur → gaya → perilaku → uji → poles.' }
        ]
      }
    ]
  };

  if (global.TutorData && global.TutorData.registerLevel) global.TutorData.registerLevel(LEVEL);
  else (global.__TutorPendingLevels = global.__TutorPendingLevels || []).push(LEVEL);
})(window);
