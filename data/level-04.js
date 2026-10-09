/* =====================================================================
   data/level-04.js — Level 4: Menata Letak (Layout) dengan CSS
   display & position, Flexbox, Grid, media query, variabel CSS,
   lalu mini-project: halaman arahan (landing page) responsif.
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVEL = {
    id: 'level-4',
    num: 4,
    title: 'Menata Letak (Layout)',
    subtitle: 'Menempatkan elemen di posisi yang kamu mau: baris, kolom, grid, dan responsif.',
    lessons: [

      /* 4.1 */
      {
        id: 'l4-1',
        title: 'display & position: block, inline, dan menggeser',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'display mengatur cara elemen berbaris' },
          { type: 'list', items: [
            '<code>block</code> — melebar penuh, mulai baris baru (contoh: <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>).',
            '<code>inline</code> — mengalir di dalam teks, tak bisa atur lebar/tinggi (contoh: <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>).',
            '<code>inline-block</code> — mengalir sebaris TAPI boleh diatur lebar/tingginya.',
            '<code>none</code> — hilangkan elemen sepenuhnya dari halaman.'
          ] },
          { type: 'code', lang: 'css', code: '.spoiler { display: none; }\n.tag { display: inline-block; padding: 2px 8px; }' },
          { type: 'h2', text: 'position untuk menggeser' },
          { type: 'list', items: [
            '<code>static</code> — bawaan, mengalir normal.',
            '<code>relative</code> — bergeser dari tempat aslinya, ruang aslinya tetap ada.',
            '<code>absolute</code> — lepas dari alur, mengunci ke leluhur ber-position (pakai top/right/bottom/left).',
            '<code>fixed</code> — menempel di layar meski halaman di-scroll (mis. navbar).'
          ] },
          { type: 'callout', variant: 'note', title: 'Trik "positioned parent"', html: 'Elemen <code>absolute</code> mencari induk terdekat yang <code>position</code>-nya bukan <code>static</code>. Lupa menandai induk dengan <code>position: relative</code> adalah sumber kebingungan layout paling klasik. Ingat selalu.' }
        ],
        challenge: {
          instructions: [
            'Sembunyikan isi spoiler: <code>.spoiler { display: none; }</code>.',
            'Jadikan label <code>.tag</code> menjadi <code>inline-block</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<p>Jawaban: <span class="spoiler">42</span></p>\n<span class="tag">Baru</span> <span class="tag">Populer</span>\n', css: '.spoiler {\n\n}\n.tag {\n\n}' },
          checks: [
            { id: 'hide', type: 'style', selector: '.spoiler', prop: 'display', value: 'none', desc: '<code>.spoiler</code> ber-<code>display: none</code>.' },
            { id: 'ib', type: 'style', selector: '.tag', prop: 'display', value: 'inline-block', desc: '<code>.tag</code> ber-<code>display: inline-block</code>.' }
          ],
          hints: [
            'Di dalam blok <code>.spoiler { }</code> tulis <code>display: none;</code>.',
            'Untuk label: <code>.tag { display: inline-block; }</code>.'
          ],
          solution: { html: '<p>Jawaban: <span class="spoiler">42</span></p>\n<span class="tag">Baru</span> <span class="tag">Populer</span>\n', css: '.spoiler {\n  display: none;\n}\n.tag {\n  display: inline-block;\n  padding: 2px 8px;\n  background-color: green;\n  color: white;\n  border-radius: 6px;\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l4-1-q1', q: 'display: none berbeda dari visibility: hidden karena…', options: ['Tidak ada beda', 'none menghapus elemen dari alur/layout', 'hidden menghapus permanen', 'none hanya memudar'], answer: 1, explanation: 'display:none membuang elemen & ruangnya; visibility:hidden menyembunyikan tapi ruang tetap ada.' },
          { type: 'mcq', id: 'l4-1-q2', q: 'Elemen inline seperti <span> tidak bisa…', options: ['Diberi warna', 'Diatur lebar & tingginya', 'Diberi teks', 'Ditautkan'], answer: 1, explanation: 'Inline mengalir dalam teks; width/tinggi diabaikan kecuali dijadikan inline-block/block.' },
          { type: 'mcq', id: 'l4-1-q3', q: 'Navbar yang menempel saat scroll biasanya memakai…', options: ['position: static', 'position: fixed', 'position: relative', 'display: none'], answer: 1, explanation: 'fixed mengunci elemen ke viewport.' },
          { type: 'fill', id: 'l4-1-q4', q: 'Position yang bergeser tapi meninggalkan ruang aslinya.', before: 'position: ______;', answerText: ['relative'], explanation: 'relative bergeser dari posisi semula namun ruangnya tetap tersisa.' },
          { type: 'multi', id: 'l4-1-q5', q: 'Nilai display yang sah:', options: ['block', 'inline', 'inline-block', 'middle'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'middle bukan nilai display (itu vertical-align).'], explanation: 'block, inline, inline-block, none, flex, grid adalah display sah.' },
          { type: 'bug', id: 'l4-1-q6', q: 'Balloon absolute melompat ke sudut layar.', code: '.parent { /* lupa */ }\n.balloon {\n  position: absolute;\n  top: 0; left: 0;\n}', instruction: 'Baris mana yang perlu diisi agar balloon mengunci ke parent?', bugLine: 0, explanation: 'Parent harus diberi position: relative agar anak absolute berpaut padanya.', hint: 'Induk butuh "positioned parent".' }
        ]
      },

      /* 4.2 */
      {
        id: 'l4-2',
        title: 'Flexbox: menata dalam satu arah',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Sumbu utama & silang' },
          { type: 'p', html: 'Flexbox menata item dalam satu <strong>baris</strong> atau satu <strong>kolom</strong>. Aktifkan di wadah dengan <code>display: flex;</code>. Arah diatur <code>flex-direction</code> (row default, atau column).' },
          { type: 'code', lang: 'css', code: '.bar {\n  display: flex;\n  justify-content: space-between; /* sumbu utama */\n  align-items: center;          /* sumbu silang */\n  gap: 12px;                      /* jarak antar item */\n}' },
          { type: 'list', items: [
            '<code>justify-content</code> — rata sepanjang sumbu utama (flex-start, center, space-between, space-around).',
            '<code>align-items</code> — rata sumbu silang (stretch, center, flex-start).',
            '<code>gap</code> — jarak antar item tanpa marginManual.',
            '<code>flex-wrap: wrap</code> — item boleh turun baris bila tak cukup ruang.'
          ] },
          { type: 'callout', variant: 'note', title: 'Cara berpikir', html: 'Bayangkan dua garis: <em>main axis</em> (arah item berjajar) dan <em>cross axis</em> (tegak lurusnya). <code>justify-content</code> bekerja sepanjang main axis; <code>align-items</code> melintang. Saat <code>flex-direction: column</code>, keduanya bertukar peran—ini sering mengecoh pemula.' }
        ],
        challenge: {
          instructions: [
            'Jadikan <code>.bar</code> sebagai wadah flex.',
            'Ratakan item ke kiri-kanan: <code>justify-content: space-between</code>.',
            'Tengahkan secara vertikal: <code>align-items: center</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<div class="bar">\n  <span>Logo</span>\n  <span>Beranda</span>\n  <span>Kontak</span>\n</div>\n', css: '.bar {\n  /* ubah ke flex di sini */\n}' },
          checks: [
            { id: 'flex', type: 'style', selector: '.bar', prop: 'display', value: 'flex', desc: '<code>.bar</code> ber-<code>display: flex</code>.' },
            { id: 'just', type: 'style', selector: '.bar', prop: 'justify-content', value: 'space-between', desc: '<code>justify-content: space-between</code>.' },
            { id: 'align', type: 'style', selector: '.bar', prop: 'align-items', value: 'center', desc: '<code>align-items: center</code>.' }
          ],
          hints: [
            '<code>.bar { display: flex; }</code> menyalakan flexbox.',
            '<code>space-between</code> merenggangkan item pertama & terakhir ke tepi.'
          ],
          solution: { html: '<div class="bar">\n  <span>Logo</span>\n  <span>Beranda</span>\n  <span>Kontak</span>\n</div>\n', css: '.bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l4-2-q1', q: 'Untuk mengaktifkan flexbox pada wadah, tulis…', options: ['display: flex', 'position: flex', 'layout: flex', 'flex: on'], answer: 0, explanation: 'display: flex pada induk membuat anak-anaknya item flex.' },
          { type: 'mcq', id: 'l4-2-q2', q: 'Properti yang mengatur perataan sepanjang sumbu utama…', options: ['align-items', 'justify-content', 'flex-wrap', 'order'], answer: 1, explanation: 'justify-content untuk sumbu utama; align-items untuk sumbu silang.' },
          { type: 'mcq', id: 'l4-2-q3', q: 'Menyusun item secara VERTIKAL memakai…', options: ['flex-direction: column', 'flex-direction: vertical', 'align: bottom', 'rotate: 90'], answer: 0, explanation: 'flex-direction: column menumpuk item ke bawah.' },
          { type: 'fill', id: 'l4-2-q4', q: 'Memberi jarak antar item tanpa margin.', before: '______: 12px;', answerText: ['gap'], explanation: 'gap mengatur jarak antar item flex/grid.' },
          { type: 'multi', id: 'l4-2-q5', q: 'Nilai justify-content yang sah:', options: ['space-between', 'center', 'flex-start', 'middle'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'middle bukan nilai justify-content.'], explanation: 'flex-start/end, center, space-between/around/evenly sah.' },
          { type: 'order', id: 'l4-2-q6', q: 'Urutan menata navbar kiri-kanan dengan flex.', lines: ['display: flex', 'justify-content: space-between', 'align-items: center'], explanation: 'Aktifkan flex, atur sumbu utama, lalu sumbu silang.' }
        ]
      },

      /* 4.3 */
      {
        id: 'l4-3',
        title: 'Grid: tata letak dua dimensi',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Baris dan kolom sekaligus' },
          { type: 'p', html: 'Kalau Flexbox satu arah, <strong>Grid</strong> menata dua arah (baris & kolom) bersamaan. Aktifkan <code>display: grid</code> lalu definisikan kolom dengan <code>grid-template-columns</code>.' },
          { type: 'code', lang: 'css', code: '.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr; /* tiga kolom sama lebar */\n  gap: 16px;\n}' },
          { type: 'list', items: [
            '<code>1fr</code> = satu "fraction" (bagian) dari ruang yang tersedia.',
            '<code>repeat(3, 1fr)</code> singkat untuk 3 kolom identik.',
            '<code>grid-template-rows</code> untuk mengatur baris.',
            '<code>gap</code> jarak antar sel, sama seperti flex.'
          ] },
          { type: 'callout', variant: 'note', title: 'Flex atau Grid?', html: 'Aturan praktis: <strong>Flex</strong> untuk deretan satu arah (toolbar, tag berjejer); <strong>Grid</strong> untuk hamparan dua arah (galeri, dashboard kartu). Keduanya bisa dikombinasikan — Grid untuk kerangka, Flex untuk isi tiap kartu.' }
        ],
        challenge: {
          instructions: [
            'Jadikan <code>.grid</code> sebuah grid: <code>display: grid</code>.',
            'Buat dua kolom sama lebar dengan <code>grid-template-columns</code>.',
            'Tambahkan jarak antar sel memakai <code>gap</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<div class="grid">\n  <div class="a">Satu</div>\n  <div class="b">Dua</div>\n</div>\n', css: '.grid {\n  /* jadi grid dua kolom */\n}' },
          checks: [
            { id: 'grid', type: 'style', selector: '.grid', prop: 'display', value: 'grid', desc: '<code>.grid</code> ber-<code>display: grid</code>.' },
            { id: 'cols', type: 'jsExpr', expr: "document.getElementById('user-css').textContent.indexOf('grid-template-columns')>=0", desc: 'CSS memakai <code>grid-template-columns</code>.' },
            { id: 'gap', type: 'jsExpr', expr: "/gap\\s*:/.test(document.getElementById('user-css').textContent)", desc: 'CSS mengatur <code>gap</code>.' }
          ],
          hints: [
            '<code>.grid { display: grid; }</code> lalu <code>grid-template-columns: 1fr 1fr;</code>.',
            'Jangan lupa <code>gap: 16px;</code> untuk jarak antar sel.'
          ],
          solution: { html: '<div class="grid">\n  <div class="a">Satu</div>\n  <div class="b">Dua</div>\n</div>\n', css: '.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.a, .b {\n  padding: 20px;\n  border-radius: 8px;\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l4-3-q1', q: 'Grid berbeda dari Flexbox karena…', options: ['Grid dua dimensi, Flex satu arah', 'Grid lebih tua', 'Flex tak bisa punya jarak', 'Tidak ada beda'], answer: 0, explanation: 'Grid mengatur baris & kolom sekaligus.' },
          { type: 'mcq', id: 'l4-3-q2', q: 'Unit <code>1fr</code> berarti…', options: ['1 fixed rem', 'satu bagian ruang bebas', '1 persen', '1 piksel tetap'], answer: 1, explanation: 'fr = fraction, membagi ruang yang tersedia.' },
          { type: 'fill', id: 'l4-3-q3', q: 'Mengaktifkan grid pada wadah.', before: 'display: ______;', answerText: ['grid'], explanation: 'display: grid pada kontainer.' },
          { type: 'mcq', id: 'l4-3-q4', q: 'Cara singkat membuat 3 kolom identik?', options: ['repeat(3, 1fr)', '3 x 1fr', 'columns: 3', 'grid: 3'], answer: 0, explanation: 'grid-template-columns: repeat(3, 1fr).' },
          { type: 'multi', id: 'l4-3-q5', q: 'Kapan memilih Grid?', options: ['galeri kartu', 'dashboard berkolom', 'deretan tombol satu baris', 'layout artikel majalah'], answer: [0, 1, 3], wrongWhy: ['', '', 'Deretan satu baris lebih pas pakai Flexbox.', ''], explanation: 'Dua dimensi → Grid; satu deret → Flex.' }
        ]
      },

      /* 4.4 */
      {
        id: 'l4-4',
        title: 'Media query: menyesuaikan ukuran layar',
        minutes: 5,
        reading: [
          { type: 'h2', text: 'Satu kode, banyak perangkat' },
          { type: 'p', html: '<strong>Media query</strong> memaketkan aturan CSS agar hanya aktif pada kondisi layar tertentu. Pondasi desain <em>responsif</em> agar halaman nyaman di HP maupun desktop.' },
          { type: 'code', lang: 'css', code: '.bar {\n  display: flex;\n}\n@media (max-width: 600px) {\n  .bar {\n    flex-direction: column;\n  }\n}' },
          { type: 'list', items: [
            '<code>@media (max-width: 600px)</code> — aktif bila lebar layar ≤ 600px (kecil/HP).',
            '<code>@media (min-width: 900px)</code> — aktif saat lebar ≥ 900px.',
            'Letakkan aturan "default" dulu, lalu <code>@media</code> untuk menimpa pada kondisi tertentu.'
          ] },
          { type: 'callout', variant: 'note', title: 'Mobile-first', html: 'Alur populer: tulis gaya paling sederhana untuk HP lebih dulu, lalu tambahkan <code>@media (min-width…)</code> untuk layar besar. Perlu ingat: media query mengatur <em>tampilan</em>, bukan memuat berkas berbeda—tetap jaga gambar ringan.' }
        ],
        challenge: {
          instructions: [
            'Buat <code>.bar</code> sebagai flex row (default).',
            'Tambahkan blok <code>@media (max-width: 600px)</code> yang mengubah <code>.bar</code> menjadi <code>flex-direction: column</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<div class="bar">\n  <div>Menu 1</div>\n  <div>Menu 2</div>\n</div>\n', css: '.bar {\n  display: flex;\n  gap: 10px;\n}\n/* tambahkan @media di bawah */' },
          checks: [
            { id: 'flex', type: 'style', selector: '.bar', prop: 'display', value: 'flex', desc: '<code>.bar</code> tetap flex.' },
            { id: 'media', type: 'jsExpr', expr: "document.getElementById('user-css').textContent.indexOf('@media')>=0", desc: 'CSS memuat aturan <code>@media</code>.' },
            { id: 'col', type: 'jsExpr', expr: "document.getElementById('user-css').textContent.indexOf('column')>=0", desc: 'Di dalam media query memakai <code>flex-direction: column</code>.' }
          ],
          hints: [
            'Sintaks: <code>@media (max-width: 600px) { .bar { flex-direction: column; } }</code>.',
            'Tulis blok @media SETELAH aturan default agar menimpa.'
          ],
          solution: { html: '<div class="bar">\n  <div>Menu 1</div>\n  <div>Menu 2</div>\n</div>\n', css: '.bar {\n  display: flex;\n  gap: 10px;\n}\n@media (max-width: 600px) {\n  .bar {\n    flex-direction: column;\n  }\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l4-4-q1', q: '<code>@media (max-width: 600px)</code> aktif ketika…', options: ['layar lebih besar dari 600px', 'layar 600px ke bawah', 'Printer aktif', 'Selamanya'], answer: 1, explanation: 'max-width:600px = berlaku hingga 600px ke bawah.' },
          { type: 'mcq', id: 'l4-4-q2', q: 'Desain yang menyesuaikan berbagai ukuran layar disebut…', options: ['statis', 'responsif', 'paralel', 'vector'], answer: 1, explanation: 'Responsif = satu halaman nyaman di banyak perangkat.' },
          { type: 'fill', id: 'l4-4-q3', q: 'Kata kunci pembuka aturan kondisi.', before: '@______ (max-width: 600px) {', answerText: ['media'], explanation: '@media membuka blok aturan kondisional.' },
          { type: 'multi', id: 'l4-4-q4', q: 'Strategi responsif yang baik:', options: ['pakai satuan relatif (%, rem)', 'tambahkan viewport meta tag', 'pakai gambar sebesar mungkin', 'uji di beberapa lebar layar'], answer: [0, 1, 3], wrongWhy: ['', '', 'Gambar besar memperlambat, bukan strategi baik.', ''], explanation: 'Relatif + viewport + pengujian = fondasi responsif.' },
          { type: 'mcq', id: 'l4-4-q5', q: 'Pendekatan "mobile-first" artinya…', options: ['desain desktop dulu', 'tulis gaya dasar untuk HP lalu tingkatkan ke layar besar', 'hanya mendukung HP', 'sembunyikan menu'], answer: 1, explanation: 'Mobile-first mulai dari kecil, tambahkan min-width untuk layar besar.' }
        ]
      },

      /* 4.5 */
      {
        id: 'l4-5',
        title: 'Variabel CSS (--var): satu nilai, banyak pemakaian',
        minutes: 5,
        reading: [
          { type: 'h2', text: 'Menamai nilai' },
          { type: 'p', html: 'Variabel CSS menyimpan nilai dengan nama, lalu dipakai ulang dengan <code>var()</code>. Definikan di <code>:root</code> agar tersedia di seluruh halaman. Ini dasar membuat <em>tema</em> dan menjaga konsistensi warna.' },
          { type: 'code', lang: 'css', code: ':root {\n  --utama: green;\n  --radius: 10px;\n}\nh1 {\n  color: var(--utama);\n}\n.kartu {\n  border-radius: var(--radius);\n}' },
          { type: 'list', items: [
            'Nama variabel selalu diawali dua titik: <code>--utama</code>.',
            'Dipakai dengan <code>var(--utama)</code>, boleh diberi fallback: <code>var(--x, red)</code>.',
            'Ubah satu nilai di <code>:root</code>, seluruh halaman ikut berubah.'
          ] },
          { type: 'callout', variant: 'note', title: 'Kekuatan tema', html: 'Ingin tombol tema gelap? Cukup ganti nilai <code>--utama</code> dan <code>--bg</code> pada satu tempat. Tanpa variabel, kamu harus mencari & mengganti puluhan baris.' }
        ],
        challenge: {
          instructions: [
            'Definisikan <code>:root { --utama: green; }</code>.',
            'Beri <code>h1</code> warna memakai <code>var(--utama)</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<h1>Bertema</h1>\n', css: ':root {\n  /* definisikan variabel */\n}\nh1 {\n  /* pakai var() */\n}' },
          checks: [
            { id: 'def', type: 'jsExpr', expr: "document.getElementById('user-css').textContent.indexOf('--utama')>=0", desc: 'CSS mendefinisikan variabel <code>--utama</code>.' },
            { id: 'use', type: 'jsExpr', expr: "document.getElementById('user-css').textContent.indexOf('var(--utama)')>=0", desc: 'CSS memakai <code>var(--utama)</code>.' },
            { id: 'applied', type: 'style', selector: 'h1', prop: 'color', value: 'green', desc: 'Terbukti: warna h1 jadi green.' }
          ],
          hints: [
            '<code>:root { --utama: green; }</code> menaruh nilai di tingkat dokumen.',
            '<code>h1 { color: var(--utama); }</code> membacanya kembali.'
          ],
          solution: { html: '<h1>Bertema</h1>\n', css: ':root {\n  --utama: green;\n}\nh1 {\n  color: var(--utama);\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l4-5-q1', q: 'Awalan nama variabel CSS yang benar adalah…', options: ['$', '--', '@', '#'], answer: 1, explanation: 'Variabel CSS selalu diawali dua tanda hubung, mis. --utama.' },
          { type: 'fill', id: 'l4-5-q2', q: 'Memakai variabel.', before: 'color: ', after: '(--utama);', answerText: ['var'], explanation: 'Gunakan var(--utama) untuk membaca nilai variabel.' },
          { type: 'mcq', id: 'l4-5-q3', q: 'Menaruh variabel di <code>:root</code> berfungsi agar…', options: ['hanya untuk root', 'tersedia di seluruh halaman', 'lebih cepat dimuat', 'rahasia'], answer: 1, explanation: ':root menjangkau seluruh dokumen lewat pewarisan.' },
          { type: 'mcq', id: 'l4-5-q4', q: 'Keuntungan terbesar variabel CSS adalah…', options: ['mengurangi jumlah HTML', 'ganti satu nilai, seluruh tema ikut berubah', 'mengganti JavaScript', 'menambah gambar'], answer: 1, explanation: 'Konsistensi dan kemudahan tema—nilai terpusat.' },
                    { type: 'mcq', id: 'l4-5-q5', q: 'Variabel CSS paling umum didefinisikan pada selector…', options: [':root', 'body', '*', 'main'], answer: 0, explanation: ':root tempat deklarasinya agar variabel berlaku ke seluruh dokumen.' }
        ]
      },

      /* 4.6 mini-project */
      {
        id: 'l4-6',
        title: 'Mini-project: Landing Page Responsif',
        minutes: 12,
        reading: [
          { type: 'h2', text: 'Merangkai layout' },
          { type: 'p', html: 'Kini gabungkan semuanya: sebuah navbar flex, bagian hero, tiga kartu fitur dalam grid, variabel warna, dan satu media query agar rapi di HP.' },
          { type: 'list', ordered: true, items: [
            'Navbar <code>.nav</code> ber-<code>display: flex</code>, <code>justify-content: space-between</code>.',
            'Bagian fitur <code>.fitur</code> memakai <code>display: grid</code> dengan <code>grid-template-columns</code>.',
            'Set <code>--utama</code> di <code>:root</code> dan pakai lewat <code>var()</code>.',
            'Tambahkan <code>@media</code> agar grid jadi satu kolom di layar kecil.'
          ] },
          { type: 'callout', variant: 'note', title: 'Pola nyata', html: 'Inilah pola yang dipakai di hampir semua situs: header flex, konten grid, tema via variabel, penyesuaian via media query. Menguasai pola ini membuatmu siap menata proyek sesungguhnya.' }
        ],
        challenge: {
          instructions: [
            'Buat <code>.nav</code> menjadi flex dengan <code>justify-content: space-between</code>.',
            'Jadikan <code>.fitur</code> grid dan definisikan <code>grid-template-columns</code>.',
            'Buat variabel <code>--utama</code> di <code>:root</code> lalu gunakan <code>var()</code>.',
            'Tambahkan aturan <code>@media</code> untuk mengubah tata letak di layar kecil.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<nav class="nav">\n  <strong>Logo</strong>\n  <span>Menu</span>\n</nav>\n<section class="hero">\n  <h1>Selamat Datang</h1>\n</section>\n<section class="fitur">\n  <div>Kartu 1</div>\n  <div>Kartu 2</div>\n  <div>Kartu 3</div>\n</section>\n', css: ':root {\n  /* variabel */\n}\n.nav {\n\n}\n.fitur {\n\n}\n/* media query */' },
          checks: [
            { id: 'navflex', type: 'style', selector: '.nav', prop: 'display', value: 'flex', desc: '<code>.nav</code> ber-<code>display: flex</code>.' },
            { id: 'just', type: 'style', selector: '.nav', prop: 'justify-content', value: 'space-between', desc: 'Navbar pakai <code>space-between</code>.' },
            { id: 'grid', type: 'style', selector: '.fitur', prop: 'display', value: 'grid', desc: '<code>.fitur</code> ber-<code>display: grid</code>.' },
            { id: 'var', type: 'jsExpr', expr: "document.getElementById('user-css').textContent.indexOf('var(--')>=0", desc: 'Ada pemakaian variabel <code>var(--…)</code>.' },
            { id: 'media', type: 'jsExpr', expr: "document.getElementById('user-css').textContent.indexOf('@media')>=0", desc: 'Ada aturan <code>@media</code>.' },
            { id: 'h1', type: 'exists', selector: '.hero h1', label: 'h1 di hero', desc: 'Bagian hero punya <code>&lt;h1&gt;</code>.' }
          ],
          hints: [
            'Mulai: <code>.nav { display: flex; justify-content: space-between; }</code>',
            'Grid: <code>.fitur { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }</code>',
            'Variabel: <code>:root { --utama: green; }</code> lalu <code>h1 { color: var(--utama); }</code>'
          ],
          solution: { html: '<nav class="nav">\n  <strong>Logo</strong>\n  <span>Menu</span>\n</nav>\n<section class="hero">\n  <h1>Selamat Datang</h1>\n</section>\n<section class="fitur">\n  <div>Kartu 1</div>\n  <div>Kartu 2</div>\n  <div>Kartu 3</div>\n</section>\n', css: ':root {\n  --utama: green;\n}\n.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 20px;\n}\n.hero {\n  text-align: center;\n  padding: 40px 16px;\n}\n.hero h1 {\n  color: var(--utama);\n}\n.fitur {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n  padding: 20px;\n}\n@media (max-width: 600px) {\n  .fitur {\n    grid-template-columns: 1fr;\n  }\n}' }
        },
        quiz: [
          { type: 'multi', id: 'l4-6-q1', q: 'Yang termasuk pola layout modern:', options: ['flexbox', 'grid', 'tabel untuk layout', 'variabel CSS'], answer: [0, 1, 3], wrongWhy: ['', '', 'Tabel layout tidak disarankan untuk tata letak.', ''], explanation: 'Flex, Grid, dan variabel adalah fondasi layout modern.' },
          { type: 'mcq', id: 'l4-6-q2', q: 'Pada navbar, <code>space-between</code> membuat…', options: ['item menumpuk', 'item pertama & terakhir menempel tepi', 'item hilang', 'semua item di tengah'], answer: 1, explanation: 'space-between merenggangkan item ke tepi.' },
          { type: 'mcq', id: 'l4-6-q3', q: 'Untuk membuat grid jadi 1 kolom di HP, ubah di dalam @media…', options: ['grid-template-columns: 1fr', 'display: none', 'flex: wrap', 'position: fixed'], answer: 0, explanation: 'Menimpa grid-template-columns ke 1fr menumpuk kartu.' },
          { type: 'order', id: 'l4-6-q4', q: 'Urutan membangun landing page.', lines: ['Susun struktur HTML semantik', 'Atur layout dengan flex/grid', 'Rapikan tema dengan variabel', 'Sesuaikan lewat media query'], explanation: 'Struktur → tata letak → tema → responsif.' },
                    { type: 'mcq', id: 'l4-6-q5', q: 'Kegunaan utama media query adalah membuat tampilan…', options: ['sama di semua alat', 'menyesuaikan lebar layar (responsif)', 'selalu gelap', 'lebih berat'], answer: 1, explanation: '@media menyesuaikan gaya sesuai lebar/kondisi layar.' }
        ]
      }
    ]
  };

  if (global.TutorData && global.TutorData.registerLevel) global.TutorData.registerLevel(LEVEL);
  else (global.__TutorPendingLevels = global.__TutorPendingLevels || []).push(LEVEL);
})(window);
