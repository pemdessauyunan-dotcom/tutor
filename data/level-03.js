/* =====================================================================
   data/level-03.js — Level 3: Memperindah dengan CSS
   Cara memasang CSS, warna & teks, selector class/id, box model,
   background/border/bayangan, hover & transisi, lalu mini-project kartu profil.
   Tantangan memakai tab HTML + CSS. Pratinjau menyisipkan CSS-mu ke <style>.
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVEL = {
    id: 'level-3',
    num: 3,
    title: 'Memperindah dengan CSS',
    subtitle: 'HTML mengurus struktur, CSS mengurus tampilan: warna, jarak, dan letak.',
    lessons: [

      /* 3.1 */
      {
        id: 'l3-1',
        title: 'Apa itu CSS & cara memasangnya',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Bahasa untuk menata' },
          { type: 'p', html: '<strong>CSS</strong> (<em>Cascading Style Sheets</em>) mengatur <em>tampilan</em>: warna, ukuran, jarak, posisi. HTML tetap jadi kerangka, CSS jadi cat dan dekorasinya.' },
          { type: 'h2', text: 'Anatomi sebuah aturan' },
          { type: 'code', lang: 'css', code: 'h1 {\n  color: red;\n  font-size: 32px;\n}' },
          { type: 'list', items: [
            '<code>h1</code> → <strong>selector</strong>: siapa yang diberi gaya.',
            '<code>color</code> → <strong>properti</strong>: aspek apa yang diubah.',
            '<code>red</code> → <strong>nilai</strong>: jadi seperti apa.',
            'Properti & nilai dipisahkan <code>:</code>, tiap deklarasi diakhiri <code>;</code>, semua dibungkus <code>{ }</code>.'
          ] },
          { type: 'h2', text: 'Tiga cara memasang' },
          { type: 'list', ordered: true, items: [
            '<strong>Inline</strong>: atribut <code>style="…"</code> langsung pada tag. Cepat tapi sulit dirawat.',
            '<strong>Blok internal</strong>: <code>&lt;style&gt;…&lt;/style&gt;</code> di dalam <code>&lt;head&gt;</code>.',
            '<strong>Eksternal</strong>: file <code>.css</code> terpisah, dipautkan dengan <code>&lt;link rel="stylesheet" href="gaya.css"&gt;</code>. Cara terbaik untuk proyek nyata.'
          ] },
          { type: 'callout', variant: 'note', title: 'Di kursus ini', html: 'Panel <strong>CSS</strong> di editor sudah otomatis dipautkan ke pratinjau, jadi kamu tinggal menulis aturan biasa seperti <code>h1 { color: red; }</code>. Tab HTML tetap berisi struktur halamanmu.' }
        ],
        challenge: {
          instructions: [
            'Di tab <strong>CSS</strong>, buat warna teks <code>h1</code> menjadi <code>red</code>.',
            'Buat warna teks paragraf <code>p</code> menjadi <code>blue</code>.',
            'Lihat pratinjau berubah saat kodemu benar.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<h1>Judul Saya</h1>\n<p>Paragraf contoh untuk diwarnai.</p>\n', css: '/* Tulis aturan CSS-mu di sini */\n' },
          checks: [
            { id: 'h1red', type: 'style', selector: 'h1', prop: 'color', value: 'red', desc: 'Warna teks <code>h1</code> = <code>red</code>.' },
            { id: 'pblue', type: 'style', selector: 'p', prop: 'color', value: 'blue', desc: 'Warna teks <code>p</code> = <code>blue</code>.' }
          ],
          hints: [
            'Contoh: <code>h1 { color: red; }</code>',
            'Jangan lupa titik koma <code>;</code> setelah tiap nilai.'
          ],
          solution: { html: '<h1>Judul Saya</h1>\n<p>Paragraf contoh untuk diwarnai.</p>\n', css: 'h1 {\n  color: red;\n}\np {\n  color: blue;\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l3-1-q1', q: 'CSS terutama digunakan untuk…', options: ['Menyusun struktur halaman', 'Mengatur tampilan (warna, jarak, letak)', 'Menyimpan data', 'Membuat logika interaksi'], answer: 1, explanation: 'Struktur = HTML; tampilan = CSS; logika = JavaScript.' },
          { type: 'fill', id: 'l3-1-q2', q: 'Pada <code>h1 { color: red; }</code>, bagian <code>h1</code> disebut…', before: 'h1 adalah ______', answerText: ['selector'], explanation: 'Selector menentukan elemen mana yang diberi gaya.', hint: '“Siapa” yang disasar aturan.' },
          { type: 'mcq', id: 'l3-1-q3', q: 'Pemisah antara properti dan nilai pada CSS adalah…', options: ['=', ':', ';', '->'], answer: 1, explanation: 'Ditulis properti: nilai; (titik dua memisahkan, titik koma mengakhiri).' },
          { type: 'multi', id: 'l3-1-q4', q: 'Cara memasang CSS yang valid: ', options: ['Atribut style=""', 'Blok <style> di head', 'File eksternal lewat <link>', 'Atribut css=""'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Tidak ada atribut css="" untuk memasang CSS.'], explanation: 'Inline, internal, dan eksternal adalah tiga cara sah.' },
          { type: 'bug', id: 'l3-1-q5', q: 'Aturan CSS ini bermasalah.', code: 'h1 {\n  color red;\n}', instruction: 'Klik baris yang deklarasi-nya keliru.', bugLine: 1, explanation: 'Kurang titik dua: seharusnya color: red;', hint: 'Properti dan nilai dipisah dengan ":".' },
          { type: 'order', id: 'l3-1-q6', q: 'Urutan bagian pembentuk satu aturan CSS.', lines: ['selector', '{', 'properti: nilai;', '}'], explanation: 'selector { properti: nilai; }' }
        ]
      },

      /* 3.2 */
      {
        id: 'l3-2',
        title: 'Warna, huruf, dan perataan teks',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Menulis warna' },
          { type: 'p', html: 'Warna bisa ditulis dengan tiga cara: <strong>nama</strong> (<code>red</code>, <code>goldenrod</code>), <strong>heksadesimal</strong> (<code>#ffcc00</code>), atau <strong>rgb()</strong> (<code>rgb(255, 204, 0)</code>). Untuk <em>latar</em> pakai <code>background-color</code>, untuk <em>teks</em> pakai <code>color</code>.' },
          { type: 'code', lang: 'css', code: 'body {\n  background-color: #111;\n  color: white;\n}' },
          { type: 'h2', text: 'Mengatur huruf' },
          { type: 'list', items: [
            '<code>font-size</code> — ukuran (pakai px atau rem).',
            '<code>font-family</code> — jenis huruf, mis. <code>Arial, sans-serif</code>.',
            '<code>font-weight</code> — ketebalan (normal, bold, atau 100–900).',
            '<code>text-align</code> — perataan: left, center, right.',
            '<code>line-height</code> — jarak antar baris.'
          ] },
          { type: 'callout', variant: 'note', title: 'Kontras itu penting', html: 'Pastikan teks terbaca di atas latarnya. Teks abu gelap di latar hitam sulit dibaca. Kontras yang baik juga membantu pengguna dengan gangguan penglihatan.' }
        ],
        challenge: {
          instructions: [
            'Buat <code>h1</code> berukuran <code>32px</code>.',
            'Rata-tengahkan teks <code>h1</code> dengan <code>text-align: center</code>.',
            'Beri latar <code>h1</code> warna <code>green</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<h1>Judul Besar</h1>\n', css: 'h1 {\n  /* ubah di sini */\n}' },
          checks: [
            { id: 'fs', type: 'style', selector: 'h1', prop: 'font-size', value: '32px', desc: '<code>font-size</code> h1 = 32px.' },
            { id: 'ta', type: 'style', selector: 'h1', prop: 'text-align', value: 'center', desc: '<code>text-align</code> h1 = center.' },
            { id: 'bg', type: 'style', selector: 'h1', prop: 'background-color', value: 'green', desc: '<code>background-color</code> h1 = green.' }
          ],
          hints: [
            'Tiga deklarasi dalam satu blok: <code>h1 { font-size: 32px; text-align: center; }</code>',
            'Latar pakai <code>background-color</code>, bukan <code>color</code>.'
          ],
          solution: { html: '<h1>Judul Besar</h1>\n', css: 'h1 {\n  font-size: 32px;\n  text-align: center;\n  background-color: green;\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l3-2-q1', q: 'Properti untuk warna TEKS adalah…', options: ['background-color', 'color', 'text-color', 'fill'], answer: 1, explanation: 'color untuk teks; background-color untuk latar.' },
          { type: 'mcq', id: 'l3-2-q2', q: 'Manakah penulisan warna heksadesimal yang benar?', options: ['#ff0000', 'ff0000', 'rgb-ff0000', '#ff00'], answer: 0, explanation: 'Heks diawali # dengan 3 atau 6 digit.' },
          { type: 'fill', id: 'l3-2-q3', q: 'Properti untuk mengatur perataan teks.', before: 'Untuk rata tengah: text-______: center;', answerText: ['align'], explanation: 'text-align: center.' },
          { type: 'multi', id: 'l3-2-q4', q: 'Yang merupakan properti tipografi (huruf):', options: ['font-size', 'font-family', 'font-weight', 'text-decoration'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'text-decoration mengatur garis bawah/coret, bukan bentuk huruf.'], explanation: 'font-size/family/weight mengatur huruf.' },
          { type: 'mcq', id: 'l3-2-q5', q: 'Nilai font-size paling umum untuk teks body?', options: ['16px', '160px', '1px', '100rem'], answer: 0, explanation: '16px adalah ukuran dasar bawaan browser.' },
          { type: 'bug', id: 'l3-2-q6', q: 'Satu kata kunci tertukar.', code: 'p {\n  background-color: red;\n  color: #111;\n}', instruction: 'Baris mana yang mungkin keliru jika maksudnya teks merah di latar gelap?', bugLine: 1, explanation: 'Jika maksudnya teks merah, maka color harus red, bukan background-color.', hint: 'Beda color dan background-color.' }
        ]
      },

      /* 3.3 */
      {
        id: 'l3-3',
        title: 'Selector class dan id',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Memilih target dengan tepat' },
          { type: 'p', html: 'Selector elemen (<code>p</code>) menata semua <code>p</code>. Kadang kita ingin menata <em>sebagian</em> saja. Untuk itu ada <strong>class</strong> dan <strong>id</strong>.' },
          { type: 'code', lang: 'html', code: '<p class="catatan">Pakai berulang, boleh banyak.</p>\n<div id="hero">Hanya satu di halaman ini.</div>' },
          { type: 'code', lang: 'css', code: '.catatan {\n  color: gray;\n}\n#hero {\n  text-align: center;\n}' },
          { type: 'list', items: [
            '<code>.nama</code> → memilih berdasarkan <strong>class</strong> (boleh dipakai banyak elemen, bisa banyak class satu elemen).',
            '<code>#nama</code> → memilih berdasarkan <strong>id</strong> (harus <em>unik</em> di satu halaman).',
            '<code>p.khusus</code> → elemen p yang juga punya class khusus.'
          ] },
          { type: 'callout', variant: 'warn', title: 'Kapan pakai class vs id?', html: 'Utamakan <strong>class</strong> untuk gaya. <code>id</code> paling pas untuk <em>jangkar</em> link internal (<code>#bagian</code>) dan untuk ditunjuk skrip. Duplikasi id dalam satu halaman itu kesalahan.' }
        ],
        challenge: {
          instructions: [
            'Beri <code>h2</code> sebuah class bernama <code>judul</code> di tab HTML.',
            'Di CSS, buat warna <code>.judul</code> menjadi <code>red</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<h2>Sub judul</h2>\n', css: '/* pilih .judul lalu warnai */\n' },
          checks: [
            { id: 'cls', type: 'attr', selector: 'h2', attr: 'class', value: 'judul', desc: '<code>&lt;h2&gt;</code> punya <code>class="judul"</code>.' },
            { id: 'color', type: 'style', selector: '.judul', prop: 'color', value: 'red', desc: 'Elemen <code>.judul</code> berwarna merah.' }
          ],
          hints: [
            'HTML: <code>&lt;h2 class="judul"&gt;</code>.',
            'CSS: <code>.judul { color: red; }</code> — awali nama class dengan titik.'
          ],
          solution: { html: '<h2 class="judul">Sub judul</h2>\n', css: '.judul {\n  color: red;\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l3-3-q1', q: 'Simbol selector class di CSS adalah…', options: ['#', '.', '@', '&'], answer: 1, explanation: 'Class diawali titik (.nama), id diawali pagar (#nama).' },
          { type: 'mcq', id: 'l3-3-q2', q: 'Berapa kali sebuah id boleh muncul dalam satu halaman?', options: ['Bebas', 'Tepat satu kali', 'Dua kali', 'Tidak terbatas'], answer: 1, explanation: 'id harus unik; kalau berulang, pakai class.' },
          { type: 'fill', id: 'l3-3-q3', q: 'Selector untuk elemen id="hero".', before: 'CSS-nya ditulis', after: ' { }', answerText: ['#hero', 'hero'], explanation: 'id dipilih dengan #hero.', hint: 'Simbol # + nama id.' },
          { type: 'multi', id: 'l3-3-q4', q: 'Pernyataan yang BENAR tentang class:', options: ['Satu elemen bisa punya banyak class', 'Class ditulis dengan titik di CSS', 'Class harus unik', 'Nama class tanpa atribut'], answer: [0, 1], wrongWhy: ['', '', 'Yang harus unik itu id, bukan class.', 'Class tetap lewat atribut class="" di HTML.'], explanation: 'Class fleksibel dan bisa banyak.' },
          { type: 'mcq', id: 'l3-3-q5', q: '<code>p.khusus</code> memilih…', options: ['Semua p', 'Semua class khusus', 'Elemen p yang juga berclass khusus', 'Semua div'], answer: 2, explanation: 'Gabungan tag + class: hanya p yang punya class khusus.' },
          { type: 'bug', id: 'l3-3-q6', q: 'Elemennya punya class="promo", tapi gaya tidak menempel.', code: 'promo {\n  color: red;\n}', instruction: 'Baris pertama bermasalah. Kenapa?', bugLine: 0, explanation: 'Class harus diawali titik. Tulisannya .promo { }. Tanpa titik, browser mengira “promo” adalah nama tag.', hint: 'Lupa satu karakter kecil di depan nama class.' }
        ]
      },

      /* 3.4 */
      {
        id: 'l3-4',
        title: 'Box model: padding, border, margin',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Semua elemen adalah kotak' },
          { type: 'p', html: 'Bayangkan setiap elemen sebagai bingkai bersarang dari dalam ke luar: <strong>isi</strong> (content) → <strong>padding</strong> (ruang dalam) → <strong>border</strong> (garis tepi) → <strong>margin</strong> (ruang luar antar elemen).' },
          { type: 'code', lang: 'css', code: '.kotak {\n  padding: 20px;      /* jarak teks ke tepi */\n  border: 3px solid black;\n  margin: 10px;        /* jarak ke tetangga */\n}' },
          { type: 'list', items: [
            '<code>padding: 20px</code> applies ke semua sisi; bisa juga <code>padding-top/left/…</code>.',
            '<code>border</code> punya tiga bagian: lebar, gaya (<code>solid/dashed</code>), warna.',
            '<code>margin</code> menciptakan ruang kosong di luar garis tepi.'
          ] },
          { type: 'callout', variant: 'note', title: 'box-sizing', html: 'Secara bawaan, <code>width</code> belum menghitung padding & border. Menambahkan <code>box-sizing: border-box;</code> membuat lebar elemen lebih mudah diprediksi. Kebiasaan banyak developer: set <code>* { box-sizing: border-box }</code>.' }
        ],
        challenge: {
          instructions: [
            'Di HTML, buat <code>&lt;div class="kotak"&gt;</code> berisi sebuah paragraf.',
            'Di CSS, beri <code>.kotak</code>: <code>padding: 20px;</code>, <code>border: 3px solid black;</code>, dan <code>margin: 10px;</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<div class="kotak">\n  <p>Teks dalam kotak</p>\n</div>\n', css: '.kotak {\n  /* tambahkan box model */\n}' },
          checks: [
            { id: 'hasdiv', type: 'exists', selector: 'div.kotak', label: 'div.kotak', desc: 'Ada <code>&lt;div class="kotak"&gt;</code>.' },
            { id: 'pad', type: 'style', selector: '.kotak', prop: 'padding-top', value: '20px', desc: '<code>padding</code> 20px.' },
            { id: 'bord', type: 'style', selector: '.kotak', prop: 'border-style', value: 'solid', desc: '<code>border</code> bergaya solid.' },
            { id: 'mar', type: 'style', selector: '.kotak', prop: 'margin-top', value: '10px', desc: '<code>margin</code> 10px.' }
          ],
          hints: [
            '<code>border: 3px solid black;</code> — urutan lebar, gaya, warna.',
            'Padding dan margin bisa disingkat satu nilai untuk empat sisi.'
          ],
          solution: { html: '<div class="kotak">\n  <p>Teks dalam kotak</p>\n</div>\n', css: '.kotak {\n  padding: 20px;\n  border: 3px solid black;\n  margin: 10px;\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l3-4-q1', q: 'Ruang KOSONG di LUAR elemen ke tetangga disebut…', options: ['padding', 'margin', 'border', 'content'], answer: 1, explanation: 'margin = ruang luar; padding = ruang dalam.' },
          { type: 'mcq', id: 'l3-4-q2', q: 'Yang berada PALING dalam pada box model adalah…', options: ['margin', 'border', 'content (isi)', 'padding'], answer: 2, explanation: 'Urutan: content → padding → border → margin.' },
          { type: 'order', id: 'l3-4-q3', q: 'Urutkan dari dalam ke luar.', lines: ['content', 'padding', 'border', 'margin'], explanation: 'Dari isi keluar: content, padding, border, margin.' },
          { type: 'fill', id: 'l3-4-q4', q: 'Nilai yang membuat width ikut menghitung padding & border.', before: 'box-sizing: ______;', answerText: ['border-box'], explanation: 'box-sizing: border-box memasukkan padding/border ke dalam lebar.' },
          { type: 'multi', id: 'l3-4-q5', q: 'Bagian yang termasuk dalam sintaks <code>border</code> shorthand:', options: ['lebar', 'gaya (solid/dashed)', 'warna', 'radius'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'radius memakai properti border-radius terpisah.'], explanation: 'border = lebar + gaya + warna.' },
          { type: 'mcq', id: 'l3-4-q6', q: 'Elemen A margin-bottom:10px, B margin-top:10px. Jarak antaranya…', options: ['20px', '10px (collapse)', '0px', 'Tidak tentu'], answer: 1, explanation: 'Margin vertikal antar blok mengalami collapse, hasilnya 10px bukan 20px.' }
        ]
      },

      /* 3.5 */
      {
        id: 'l3-5',
        title: 'Latar, sudut membulat, dan bayangan',
        minutes: 5,
        reading: [
          { type: 'h2', text: 'Membuat kartu modern' },
          { type: 'p', html: 'Kombinasi <code>background-color</code>, <code>border-radius</code> (sudut melengkung), dan <code>box-shadow</code> (bayangan lembut) adalah resep tampilan “kartu” yang rapi dan kontemporer.' },
          { type: 'code', lang: 'css', code: '.kartu {\n  background-color: green;\n  border-radius: 12px;\n  box-shadow: 0 4px 10px rgba(0,0,0,.2);\n  padding: 16px;\n}' },
          { type: 'list', items: [
            '<code>border-radius: 50%</code> → lingkaran untuk gambar.',
            '<code>box-shadow: x y blur warna</code> (opsional blur spread).',
            '<code>background</code> bisa juga gambar: <code>background-image: url(…)</code>.'
          ] },
          { type: 'callout', variant: 'note', title: 'Hemat bayangan', html: 'Bayangan halus dan secukupnya terlihat premium; bayangan pekat di mana-mana justru kuno. Gunakan transparansi <code>rgba(…)</code> agar lebih lembut.' }
        ],
        challenge: {
          instructions: [
            'Di HTML, siapkan <code>&lt;div class="kartu"&gt;</code> berisi sebuah paragraf.',
            'Di CSS, beri <code>.kartu</code>: <code>background-color: green;</code>, <code>border-radius: 12px;</code>, dan <code>padding: 16px;</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<div class="kartu">\n  <p>Isi kartu</p>\n</div>\n', css: '.kartu {\n  /* percantik di sini */\n}' },
          checks: [
            { id: 'hasdiv', type: 'exists', selector: 'div.kartu', label: 'div.kartu', desc: 'Ada <code>&lt;div class="kartu"&gt;</code>.' },
            { id: 'bg', type: 'style', selector: '.kartu', prop: 'background-color', value: 'green', desc: 'Latar <code>.kartu</code> = green.' },
            { id: 'rad', type: 'style', selector: '.kartu', prop: 'border-radius', value: '12px', desc: '<code>border-radius</code> = 12px.' },
            { id: 'pad', type: 'style', selector: '.kartu', prop: 'padding-top', value: '16px', desc: '<code>padding</code> = 16px.' }
          ],
          hints: [
            'Contoh lengkap: <code>.kartu { background-color: green; border-radius: 12px; padding: 16px; }</code>',
            'border-radius juga bisa nilai persen untuk membuat lingkaran.'
          ],
          solution: { html: '<div class="kartu">\n  <p>Isi kartu</p>\n</div>\n', css: '.kartu {\n  background-color: green;\n  border-radius: 12px;\n  padding: 16px;\n  box-shadow: 0 4px 10px rgba(0,0,0,.2);\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l3-5-q1', q: 'Properti untuk menyudut melengkung adalah…', options: ['box-shadow', 'border-radius', 'text-align', 'outline'], answer: 1, explanation: 'border-radius mengatur lengkung sudut elemen.' },
          { type: 'fill', id: 'l3-5-q2', q: 'Nilai untuk membuat lingkaran.', before: 'border-radius: ______;', answerText: ['50%', '9999px', '50'], explanation: '50% menghasilkan bentuk bulat penuh.', hint: 'Persen.' },
          { type: 'mcq', id: 'l3-5-q3', q: '<code>box-shadow: 0 4px 10px …</code> — angka ketiga (10px) adalah…', options: ['warna', 'blur (kekaburan)', 'lebar', 'warna tepi'], answer: 1, explanation: 'Format umum: offset-x offset-y blur warna.' },
          { type: 'multi', id: 'l3-5-q4', q: 'Mana yang sah untuk latar?', options: ['background-color: green', 'background-image: url(a.jpg)', 'background: red', 'background-text: red'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Tidak ada properti background-text.'], explanation: 'background-color/-image dan shorthand background sah.' },
          { type: 'mcq', id: 'l3-5-q5', q: 'rgba(0,0,0,.2) — angka .2 mengatur…', options: ['huruf', 'transparansi (alpha)', 'radius', 'margin'], answer: 1, explanation: 'Alpha mengatur tingkat transparansi (0 transparan – 1 pekat).' }
        ]
      },

      /* 3.6 */
      {
        id: 'l3-6',
        title: 'Interaksi: hover dan transisi',
        minutes: 5,
        reading: [
          { type: 'h2', text: 'Reaksi saat kursor di atasnya' },
          { type: 'p', html: 'Pseudo-class <code>:hover</code> memilih elemen saat kursor di atasnya. Cocok untuk tombol yang berubah warna, kartu yang terangkat, dan tautan yang bergaris bawah.' },
          { type: 'code', lang: 'css', code: '.btn {\n  background-color: blue;\n  color: white;\n  transition: background-color .2s ease;\n}\n.btn:hover {\n  background-color: green;\n}' },
          { type: 'p', html: '<code>transition</code> membuat perubahan berlangsung <em>halus</em>, bukan mendadak. Format: <code>transition: properti durasi fungsi;</code>.' },
          { type: 'callout', variant: 'note', title: 'Hover hanya satu jalur', html: 'Di HP tidak ada hover. Jadi jangan andalkan hover untuk info penting—jadikan bonus kenyamanan saja, dengan pembanding yang tetap jelas saat tidak di-hover.' }
        ],
        challenge: {
          instructions: [
            'Beri <code>&lt;button class="btn"&gt;</code> warna latar <code>blue</code> (di CSS).',
            'Tambahkan <code>.btn:hover { background-color: green; }</code> (tidak wajib untuk lulus, tapi coba!).'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<button class="btn">Klik aku</button>\n', css: '.btn {\n  color: white;\n}' },
          checks: [
            { id: 'hasbtn', type: 'exists', selector: 'button.btn', label: 'button.btn', desc: 'Ada <code>&lt;button class="btn"&gt;</code>.' },
            { id: 'bg', type: 'style', selector: '.btn', prop: 'background-color', value: 'blue', desc: 'Latar .btn = blue.' }
          ],
          hints: [
            'Beri latar: <code>.btn { background-color: blue; }</code>',
            'Hover: <code>.btn:hover { background-color: green; }</code>.'
          ],
          solution: { html: '<button class="btn">Klik aku</button>\n', css: '.btn {\n  color: white;\n  background-color: blue;\n  padding: 10px 16px;\n  border: none;\n  border-radius: 8px;\n  transition: background-color .2s ease;\n}\n.btn:hover {\n  background-color: green;\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l3-6-q1', q: '<code>a:hover</code> memilih tautan ketika…', options: ['Diklik', 'Kursor berada di atasnya', 'Difokus dengan keyboard', 'Dimuat'], answer: 1, explanation: ':hover aktif saat pointer di atas elemen.' },
          { type: 'mcq', id: 'l3-6-q2', q: 'Fungsi <code>transition</code> adalah…', options: ['Menunda loading', 'Membuat perubahan gaya berjalan halus', 'Memutar elemen', 'Menghapus elemen'], answer: 1, explanation: 'Transisi menganimasikan perubahan properti.' },
          { type: 'multi', id: 'l3-6-q3', q: 'Alasan tidak mengandalkan hover untuk info penting:', options: ['HP tidak punya hover', 'Tidak semua pengguna bisa menggunakan mouse', 'Hover lebih lambat dari klik', 'Warna hover dibatasi'], answer: [0, 1], wrongWhy: ['', '', 'Kecepatan bukan alasan utama.', 'Warna hover bebas dipilih.'], explanation: 'Aksesibilitas menuntut fungsi tak bergantung hover.' },
          { type: 'fill', id: 'l3-6-q4', q: 'Properti untuk mengubah gaya elemen yang sedang difokus keyboard.', before: ':______', answerText: ['focus', ':focus'], explanation: 'Pseudo-class :focus untuk elemen aktif via keyboard/tab.' },
          { type: 'mcq', id: 'l3-6-q5', q: '<code>transition: color .2s ease;</code> — .2s adalah…', options: ['Jeda sebelum mulai', 'Durasi animasi', 'Pengulangan', 'Warna'], answer: 1, explanation: 'Nilai waktu kedua = durasi transisi.' }
        ]
      },

      /* 3.7 mini-project */
      {
        id: 'l3-7',
        title: 'Mini-project: Kartu Profil Bergaya',
        minutes: 10,
        reading: [
          { type: 'h2', text: 'Merangkai CSS' },
          { type: 'p', html: 'Gabungkan warna, box model, dan radius jadi kartu profil rapi. Gunakan class agar mudah dikembangkan. Target: sebuah <code>&lt;div class="kartu"&gt;</code> berisi nama (<code>&lt;h2&gt;</code>), peran (paragraf), dan avatar bulat (<code>&lt;img&gt;</code>).' },
          { type: 'list', ordered: true, items: [
            'Beri <code>.kartu</code> latar <code>green</code>, <code>padding: 16px;</code>, dan <code>border-radius: 12px;</code>.',
            'Bulat avatar <code>.avatar { width: 80px; border-radius: 50%; }</code>.',
            'Pusatkan teks dengan <code>text-align: center;</code> di kartu.'
          ] },
          { type: 'callout', variant: 'note', title: 'Pola berpikir desainer', html: 'Mulai dari elemen kecil (nama, gambar), lalu kelompokkan dalam wadah (.kartu), lalu atur jarak. Kelas yang jelas (mis. .kartu, .avatar) membuat CSS mudah dibaca & dirawat.' }
        ],
        challenge: {
          instructions: [
            'Susun kartu: <code>&lt;div class="kartu"&gt;</code> berisi <code>&lt;img class="avatar"&gt;</code> dan sebuah <code>&lt;h2&gt;</code>.',
            'Atur <code>.kartu</code> dengan <code>background-color: green;</code>, <code>padding: 16px;</code>, <code>border-radius: 12px;</code>.',
            'Bulatkan avatar: <code>.avatar { border-radius: 50%; }</code> dan <code>width: 80px;</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<div class="kartu">\n  <img class="avatar" src="a.jpg" alt="Foto profil">\n  <h2>Nama Kamu</h2>\n  <p>Web Developer pemula</p>\n</div>\n', css: '.kartu {\n  /* atur kartunya */\n}\n.avatar {\n  /* atur avatarnya */\n}' },
          checks: [
            { id: 'hasimg', type: 'exists', selector: '.kartu img.avatar', label: 'avatar di kartu', desc: 'Ada <code>&lt;img class="avatar"&gt;</code> dalam <code>.kartu</code>.' },
            { id: 'bg', type: 'style', selector: '.kartu', prop: 'background-color', value: 'green', desc: 'Latar <code>.kartu</code> = green.' },
            { id: 'rad', type: 'style', selector: '.kartu', prop: 'border-radius', value: '12px', desc: '<code>border-radius</code> .kartu = 12px.' },
            { id: 'pad', type: 'style', selector: '.kartu', prop: 'padding-top', value: '16px', desc: '<code>padding</code> .kartu = 16px.' },
            { id: 'av', type: 'style', selector: '.avatar', prop: 'border-radius', value: '50%', desc: 'Avatar bulat (<code>border-radius: 50%</code>).' }
          ],
          hints: [
            '<code>.kartu { background-color: green; padding: 16px; border-radius: 12px; }</code>',
            '<code>.avatar { width: 80px; border-radius: 50%; }</code>'
          ],
          solution: { html: '<div class="kartu">\n  <img class="avatar" src="a.jpg" alt="Foto profil">\n  <h2>Nama Kamu</h2>\n  <p>Web Developer pemula</p>\n</div>\n', css: '.kartu {\n  background-color: green;\n  color: white;\n  padding: 16px;\n  border-radius: 12px;\n  text-align: center;\n}\n.avatar {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  object-fit: cover;\n}' }
        },
        quiz: [
          { type: 'multi', id: 'l3-7-q1', q: 'Pola CSS yang baik dalam proyek kartu:', options: ['pakai class jelas', 'ulang nilai (mis. padding) bila perlu', 'id untuk setiap elemen', 'hover untuk info wajib'], answer: [0, 1], wrongWhy: ['', '', 'Id harus unik; jangan dipakai untuk gaya massal.', 'Info wajib harus terlihat tanpa hover.'], explanation: 'Class + pengulangan yang terukur membuat CSS awet.' },
          { type: 'mcq', id: 'l3-7-q2', q: 'Untuk menjaga rasio wajah pada avatar, tambahkan…', options: ['object-fit: cover', 'display: none', 'visibility: hidden', 'float: left'], answer: 0, explanation: 'object-fit: cover mengisi bingkai bulat tanpa merentangkan.' },
          { type: 'fill', id: 'l3-7-q3', q: 'Properti yang membuat gambar mengisi & memotong rapi.', before: 'object-______: cover;', answerText: ['fit'], explanation: 'object-fit mengatur bagaimana gambar mengisi kotaknya.' },
          { type: 'order', id: 'l3-7-q4', q: 'Urutan membangun kartu yang paling mudah.', lines: ['Atur elemen isi', 'Bungkus dalam wadah', 'Rapikan jarak & radius'], explanation: 'Mulai kecil, lalu gabung, lalu poles.' },
                    { type: 'mcq', id: 'l3-7-q5', q: 'Properti untuk menambah bayangan lembut di belakang kartu adalah…', options: ['box-shadow', 'text-shadow', 'border', 'outline'], answer: 0, explanation: 'box-shadow memberi bayangan pada kotak/kartu.' }
        ]
      }
    ]
  };

  if (global.TutorData && global.TutorData.registerLevel) global.TutorData.registerLevel(LEVEL);
  else (global.__TutorPendingLevels = global.__TutorPendingLevels || []).push(LEVEL);
})(window);
