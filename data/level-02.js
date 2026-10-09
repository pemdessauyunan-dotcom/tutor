/* =====================================================================
   data/level-02.js — Level 2: Mengisi Halaman dengan Konten
   Membahas format teks, daftar, tautan, gambar, pengelompokan/semantik,
   tabel, lalu mini-project "Tentang Saya".
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVEL = {
    id: 'level-2',
    num: 2,
    title: 'Mengisi Halaman dengan Konten',
    subtitle: 'Teks berciri khas, daftar, link, gambar, dan tabel — isi halaman mulai hidup.',
    lessons: [

      /* ==================== 2.1 Format teks ==================== */
      {
        id: 'l2-1',
        title: 'Memberi ciri pada teks: strong, em, dan lainnya',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Teks tidak selalu harus datar' },
          { type: 'p', html: 'Di Level 1 kamu menulis paragraf polos. Sekarang kita beri <em>makna</em> pada sebagian kata. HTML punya tag khusus yang menandakan <strong>penting</strong>, <em>penekanan</em>, coretan, dan lainnya. Browser sekaligus membacanya sebagai petunjuk arti, bukan sekadar hiasan.' },
          { type: 'code', lang: 'html', code: '<p>Hati-hati: ini <strong>penting sekali</strong>.</p>\n<p>Kalimat ini punya <em>penekanan</em> halus.</p>\n<p>Harga coret <del>Rp100.000</del> jadi <ins>Rp50.000</ins>.</p>\n<p>Air adalah H<sub>2</sub>O. Kuadrat = x<sup>2</sup>.</p>\n<p>Perintah <code>npm install</code> dijalankan di terminal.</p>' },
          { type: 'list', items: [
            '<code>&lt;strong&gt;</code> — penting (tampil tebal). Beda dengan <code>&lt;b&gt;</code> yang hanya tebal tanpa makna.',
            '<code>&lt;em&gt;</code> — penekanan (tampil miring). Beda dengan <code>&lt;i&gt;</code> yang miring tanpa makna.',
            '<code>&lt;del&gt;</code> / <code>&lt;ins&gt;</code> — teks dicoret / disisipkan.',
            '<code>&lt;sub&gt;</code> / <code>&lt;sup&gt;</code> — subscript / superscript (contoh rumus, catatan kaki).',
            '<code>&lt;mark&gt;</code> — teks ditandai seperti stabilo.',
            '<code>&lt;small&gt;</code> — teks lebih kecil (mis. syarat & ketentuan).',
            '<code>&lt;code&gt;</code> — potongan kode inline.'
          ] },
          { type: 'callout', variant: 'note', title: 'Makna, bukan tampilan', html: 'Aturan emas: pakai tag karena <em>arti</em>-nya, bukan karena bentuknya. Kalau kamu cuma ingin tebal tanpa makna penting, lebih baik pakai CSS nanti. <code>&lt;strong&gt;</code> memberi sinyal ke pembaca layar dan mesin pencari.' },
          { type: 'h2', text: 'Kutipan panjang' },
          { type: 'code', lang: 'html', code: '<blockquote cite="https://contoh.id">\n  Jadilah diri sendiri; semua posisi sudah ada.\n  <cite>— Oscar Wilde</cite>\n</blockquote>\n<p>Singkatan: <abbr title="HyperText Markup Language">HTML</abbr>.</p>' },
          { type: 'p', html: '<code>&lt;blockquote&gt;</code> untuk kutipan besar yang berdiri sendiri, dan <code>&lt;abbr&gt;</code> untuk singkatan (arahkan kursor ke <em>title</em>-nya untuk melihat kepanjangan).' }
        ],
        challenge: {
          instructions: [
            'Tulis satu <code>&lt;p&gt;</code> yang berisi sebuah kata dalam <code>&lt;strong&gt;</code>.',
            'Tambahkan kata lain yang ditekan dengan <code>&lt;em&gt;</code>.',
            'Buat satu <code>&lt;code&gt;</code> berisi nama perintah apa saja.'
          ],
          tabs: ['html'],
          starterCode: { html: '<p>Teks biasa.</p>\n' },
          checks: [
            { id: 'strong', type: 'exists', selector: 'strong', label: '<strong>', desc: 'Ada elemen <code>&lt;strong&gt;</code>.' },
            { id: 'strongtext', type: 'text', selector: 'strong', desc: '<code>&lt;strong&gt;</code> tidak kosong.' },
            { id: 'em', type: 'exists', selector: 'em', label: '<em>', desc: 'Ada elemen <code>&lt;em&gt;</code>.' },
            { id: 'code', type: 'exists', selector: 'code', label: '<code>', desc: 'Ada elemen <code>&lt;code&gt;</code>.' }
          ],
          hints: [
            'Contoh: <code>Ini &lt;strong&gt;sangat&lt;/strong&gt; penting.</code>',
            '<code>&lt;em&gt;</code> menandai penekanan: <code>aku &lt;em&gt;beneran&lt;/em&gt; suka.</code>'
          ],
          solution: { html: '<p>Baca bagian <strong>penting</strong> ini, ya. Serius, aku &lt;em&gt;tidak bercanda&lt;/em&gt;.</p>\n<p>Ketik <code>git status</code> untuk memeriksa perubahan.</p>' }
        },
        quiz: [
          { type: 'mcq', id: 'l2-1-q1', q: 'Tag mana yang menandakan teks PENTING (bukan sekadar tebal)?', options: ['<b>', '<strong>', '<mark>', '<small>'], answer: 1, explanation: '<strong> bermakna penting; <b> hanya menebalkan tanpa makna.' },
          { type: 'mcq', id: 'l2-1-q2', q: '<em> secara tampilan biasanya membuat teks menjadi…', options: ['Tebal', 'Miring', 'Bergaris bawah', 'Coret'], answer: 1, explanation: '<em> tampil miring dan bermakna penekanan.' },
          { type: 'multi', id: 'l2-1-q3', q: 'Pilih semua tag yang cocok untuk teks <em>H<sub>2</sub>O</em> dan rumus pangkat.', options: ['<sub>', '<sup>', '<del>', '<mark>'], answer: [0, 1], wrongWhy: ['', '', '<del> untuk mencoret teks, bukan angka.', '<mark> untuk menandai, tidak relevan.'], explanation: '<sub> untuk angka di bawah, <sup> untuk pangkat.' },
          { type: 'fill', id: 'l2-1-q4', q: 'Lengkapi tag untuk teks yang ditandai seperti stabilo.', before: '<', after: '>teks</>', answerText: ['mark'], explanation: '<mark> memberi latar menandai pada teks.' },
          { type: 'mcq', id: 'l2-1-q5', q: 'Perbedaan <code>&lt;code&gt;</code> dan <code>&lt;pre&gt;</code> adalah…', options: ['Tidak ada beda', '<code> untuk inline, <pre> untuk blok kode dengan spasi terjaga', '<pre> untuk inline', '<code> hanya untuk CSS'], answer: 1, explanation: '<code> menandai potongan kode dalam kalimat; <pre> untuk blok multi-baris yang mempertahankan spasi/indentasi.' },
          { type: 'bug', id: 'l2-1-q6', q: 'Tag emphasis ini salah tutup.', code: '<p>Kamu <em>hebat<p> sekali.</p>', instruction: 'Klik baris dengan tag yang tidak pas.', bugLine: 0, explanation: 'Ditulis <p> lagi padahal seharusnya </em>. Tag penutup harus <em> dan paragraf ditutup sekali.', hint: 'Cek pasangan <em> — ke mana penutupnya?' }
        ]
      },

      /* ==================== 2.2 Daftar ==================== */
      {
        id: 'l2-2',
        title: 'Daftar: ul, ol, dan li',
        minutes: 5,
        reading: [
          { type: 'h2', text: 'Kenapa daftar?' },
          { type: 'p', html: 'Bayangan daftar belanja atau langkah memasak. HTML punya dua jenis daftar: <strong>tak bernomor</strong> (<code>&lt;ul&gt;</code>, <em>unordered list</em>) dan <strong>bernomor</strong> (<code>&lt;ol&gt;</code>, <em>ordered list</em>). Setiap butirnya ditulis dengan <code>&lt;li&gt;</code> (<em>list item</em>).' },
          { type: 'code', lang: 'html', code: '<ul>\n  <li>Bawang</li>\n  <li>Tomat</li>\n</ul>\n\n<ol>\n  <li>Panaskan minyak</li>\n  <li>Tumis bawang</li>\n  <li>Sajikan</li>\n</ol>' },
          { type: 'callout', variant: 'note', title: 'Ingat', html: '<code>&lt;li&gt;</code> <em>selalu</em> berada di dalam <code>&lt;ul&gt;</code> atau <code>&lt;ol&gt;</code>. Menulis <code>&lt;li&gt;</code> lepas tanpa induknya itu salah.' },
          { type: 'h2', text: 'Daftar bersarang' },
          { type: 'p', html: 'Kamu bisa menaruh daftar di dalam daftar dengan menyelipkan <code>&lt;ul&gt;</code>/<code>&lt;ol&gt;</code> baru <em>di dalam</em> sebuah <code>&lt;li&gt;</code>.' },
          { type: 'code', lang: 'html', code: '<ul>\n  <li>Kopi\n    <ul>\n      <li>Robusta</li>\n      <li>Arabika</li>\n    </ul>\n  </li>\n  <li>Teh</li>\n</ul>' },
          { type: 'p', html: 'Ada juga daftar definisi <code>&lt;dl&gt;</code> dengan pasangan <code>&lt;dt&gt;</code> (istilah) dan <code>&lt;dd&gt;</code> (penjelasan) — cocok untuk glosarium.' }
        ],
        challenge: {
          instructions: [
            'Buat satu daftar tak bernomor <code>&lt;ul&gt;</code> berisi minimal 3 <code>&lt;li&gt;</code>.',
            'Buat satu daftar bernomor <code>&lt;ol&gt;</code> berisi minimal 2 <code>&lt;li&gt;</code>.'
          ],
          tabs: ['html'],
          starterCode: { html: '<!-- Buat daftarmu di sini -->\n' },
          checks: [
            { id: 'ul', type: 'exists', selector: 'ul', label: 'sebuah <ul>', desc: 'Ada daftar tak bernomor <code>&lt;ul&gt;</code>.' },
            { id: 'ul3', type: 'count', selector: 'ul > li', min: 3, label: '3 item di <ul>', desc: '<code>&lt;ul&gt;</code> punya minimal 3 <code>&lt;li&gt;</code> langsung.' },
            { id: 'ol', type: 'exists', selector: 'ol', label: 'sebuah <ol>', desc: 'Ada daftar bernomor <code>&lt;ol&gt;</code>.' },
            { id: 'ol2', type: 'count', selector: 'ol > li', min: 2, label: '2 item di <ol>', desc: '<code>&lt;ol&gt;</code> punya minimal 2 <code>&lt;li&gt;</code>.' }
          ],
          hints: [
            'Struktur: <code>&lt;ul&gt;</code> → beberapa <code>&lt;li&gt;</code> → <code>&lt;/ul&gt;</code>.',
            'Tiap <code>&lt;li&gt;</code> harus punya penutup <code>&lt;/li&gt;</code>.'
          ],
          solution: { html: '<ul>\n  <li>API</li>\n  <li>Github</li>\n  <li>Google</li>\n</ul>\n<ol>\n  <li>Buka editor</li>\n  <li>Simpan file</li>\n</ol>' }
        },
        quiz: [
          { type: 'mcq', id: 'l2-2-q1', q: 'Untuk daftar langkah yang urutannya penting, pakai…', options: ['<ul>', '<ol>', '<dl>', '<li>'], answer: 1, explanation: '<ol> (ordered list) menampilkan nomor sehingga urutan jelas.' },
          { type: 'mcq', id: 'l2-2-q2', q: 'Item daftar selalu ditulis memakai tag…', options: ['<it>', '<item>', '<li>', '<lm>'], answer: 2, explanation: '<li> adalah list item, selalu di dalam <ul> atau <ol>.' },
          { type: 'bug', id: 'l2-2-q3', q: 'Ada <li> yang berada di luar daftar.', code: '<li>Tanpa induk</li>\n<ul>\n  <li>Benar</li>\n</ul>', instruction: 'Klik baris <li> yang tidak punya induk <ul>/<ol>.', bugLine: 0, explanation: 'Baris pertama menaruh <li> langsung, padahal harus di dalam <ul> atau <ol>.', hint: '<li> tidak boleh berdiri sendiri.' },
          { type: 'multi', id: 'l2-2-q4', q: 'Pasangan tag daftar yang benar adalah…', options: ['<ul> dengan </ul>', '<ol> dengan </ol>', '<li> dengan </ol>', '<dl> dengan </dl>'], answer: [0, 1, 3], wrongWhy: ['', '', '<li> ditutup dengan </li>, bukan </ol>.', ''], explanation: 'Setiap tag punya penutup sama nama: ul, ol, dl, dan li.' },
          { type: 'order', id: 'l2-2-q5', q: 'Susun struktur daftar dua item yang benar.', lines: ['<ul>', '<li>Satu</li>', '<li>Dua</li>', '</ul>'], explanation: 'Buka <ul>, isi <li>, lalu tutup </ul>.' },
          { type: 'fill', id: 'l2-2-q6', q: 'Tag induk daftar bernomor.', before: '<', after: '>', answerText: ['ol'], explanation: '<ol> = ordered list (bernomor).', hint: 'ol, dari “ordered list”.' }
        ]
      },

      /* ==================== 2.3 Tautan ==================== */
      {
        id: 'l2-3',
        title: 'Tautan: menghubungkan halaman dengan <a>',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Hyperlink — inti “web”' },
          { type: 'p', html: '“Web” = jaring. Jaringnya adalah <strong>tautan</strong> (link). Tag-nya <code>&lt;a&gt;</code> (<em>anchor</em>) dengan atribut <code>href</code> yang berisi tujuan.' },
          { type: 'code', lang: 'html', code: '<a href="https://developer.mozilla.org">Buka MDN</a>\n<a href="tentang.html">Halaman tentang saya</a>\n<a href="#kontak">Lompat ke bagian kontak</a>\n<a href="mailto:halo@contoh.id">Kirim email</a>' },
          { type: 'list', items: [
            '<code>href="https://…"</code> — ke situs lain (tautan eksternal).',
            '<code>href="file.html"</code> — ke halaman lain di proyekmu (tautan internal/relatif).',
            '<code>href="#id"</code> — lompat ke elemen ber-<code>id</code> sama dalam halaman yang sama.',
            '<code>href="mailto:…"</code> — membuka aplikasi email.'
          ] },
          { type: 'callout', variant: 'note', title: 'Membuka di tab baru', html: 'Tambahkan <code>target="_blank"</code> agar link terbuka di tab baru. Untuk keamanan, kombinasikan dengan <code>rel="noopener noreferrer"</code>.' },
          { type: 'callout', variant: 'warn', title: 'Teks link harus bermakna', html: 'Hindari “klik di sini”. Tulis <em>maksudnya</em>: “Unduh daftar harga”. Pembaca layar dan Google memakai teks link untuk mengerti isi tujuan.' }
        ],
        challenge: {
          instructions: [
            'Buat link ke <code>https://developer.mozilla.org</code> dengan teks “MDN”.',
            'Tambahkan atribut <code>target="_blank"</code> agar terbuka di tab baru.',
            'Buat link kedua yang mengarah ke <code>#atas</code> (tautan internal).'
          ],
          tabs: ['html'],
          starterCode: { html: '<p id="atas">Halaman ini</p>\n<!-- Buat tautanmu di bawah -->\n' },
          checks: [
            { id: 'a', type: 'exists', selector: 'a', label: 'sebuah <a>', desc: 'Ada minimal satu elemen <code>&lt;a&gt;</code>.' },
            { id: 'href', type: 'attr', selector: 'a', attr: 'href', contains: 'mozilla', desc: 'Link pertama punya <code>href</code> menuju alamat mozilla.' },
            { id: 'target', type: 'attr', selector: 'a[target="_blank"]', attr: 'target', value: '_blank', desc: 'Ada link dengan <code>target="_blank"</code>.' },
            { id: 'anchor', type: 'attr', selector: 'a[href="#atas"]', attr: 'href', value: '#atas', desc: 'Ada link internal ke <code>#atas</code>.' }
          ],
          hints: [
            'Contoh dasar: <code>&lt;a href="https://…"</code>teks<code>&lt;/a&gt;</code>.',
            'Untuk tab baru: <code>&lt;a href="…" target="_blank"&gt;</code>.'
          ],
          solution: { html: '<p id="atas">Halaman ini</p>\n<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN</a>\n<a href="#atas">Kembali ke atas</a>' }
        },
        quiz: [
          { type: 'mcq', id: 'l2-3-q1', q: 'Atribut yang menentukan tujuan link adalah…', options: ['src', 'href', 'link', 'to'], answer: 1, explanation: '<a> memakai href; src dipakai untuk gambar/media.' },
          { type: 'mcq', id: 'l2-3-q2', q: 'Agar link terbuka di tab baru, tambahkan…', options: ['target="_blank"', 'new="tab"', 'open="win"', 'blank="yes"'], answer: 0, explanation: 'target="_blank" membuka tab baru; sebaiknya disertai rel="noopener".' },
          { type: 'fill', id: 'l2-3-q3', q: 'Lompat ke bagian dalam halaman yang sama.', before: '<a href="', after: 'kontak">Ke kontak</a>', answerText: ['#'], explanation: 'Awali dengan # lalu nama id target.', hint: 'Karakter pagar/lambang nomor.' },
          { type: 'multi', id: 'l2-3-q4', q: 'Format href yang valid ada yang mana saja?', options: ['https://…', 'halaman.html', '#id', 'mailto:…'], answer: [0, 1, 2, 3], explanation: 'Semuanya sah: eksternal, internal relatif, jangkar, dan email.' },
          { type: 'mcq', id: 'l2-3-q5', q: 'Manakah teks link yang baik untuk aksesibilitas?', options: ['klik di sini', 'di sini', 'Unduh katalog PDF', 'lanjut'], answer: 2, explanation: 'Teks link harus menjelaskan tujuan, bukan “klik di sini”.' },
          { type: 'bug', id: 'l2-3-q6', q: 'Link ini tidak akan menuju ke mana-mana.', code: '<a>MDN</a>', instruction: 'Apa yang hilang supaya <a> berfungsi?', bugLine: 0, explanation: '<a> tanpa href tidak menjadi tautan sungguhan. Perlu href="…".', hint: 'Tag anchor butuh atribut tujuan.' }
        ]
      },

      /* ==================== 2.4 Gambar ==================== */
      {
        id: 'l2-4',
        title: 'Menampilkan gambar: img, alt, dan figure',
        minutes: 5,
        reading: [
          { type: 'h2', text: 'Tag gambar' },
          { type: 'p', html: 'Gambar disisipkan dengan <code>&lt;img&gt;</code> — sebuah void tag (tanpa penutup). Dua atribut wajib diperhatikan: <code>src</code> (sumber berkas) dan <code>alt</code> (teks alternatif).' },
          { type: 'code', lang: 'html', code: '<img src="kucing.jpg" alt="Kucing oranye tidur di sofa" width="320">' },
          { type: 'callout', variant: 'warn', title: 'alt itu wajib', html: '<code>alt</code> tampil bila gambar gagal dimuat, dan dibacakan oleh <em>screen reader</em> untuk pengguna tunanetra. Biarkan alt kosong <code>alt=""</code> hanya untuk gambar hiasan murni. Jangan pernah menghilangkannya.' },
          { type: 'h2', text: 'Membungkus dengan caption' },
          { type: 'code', lang: 'html', code: '<figure>\n  <img src="peta.png" alt="Peta lokasi kafe">\n  <figcaption>Peta menuju Kafe Senja.</figcaption>\n</figure>' },
          { type: 'p', html: '<code>&lt;figure&gt;</code> membungkus gambar beserta keterangan <code>&lt;figcaption&gt;</code> secara semantik.' },
          { type: 'p', html: 'Sumber <code>src</code> bisa berupa berkas lokal (gambar.jpg), alamat relatif (img/a.png), atau URL penuh (https://…/a.jpg).' }
        ],
        challenge: {
          instructions: [
            'Sisipkan sebuah <code>&lt;img&gt;</code> dengan <code>src</code> dan <code>alt</code>.',
            'Bungkus gambar dalam <code>&lt;figure&gt;</code> dan tambahkan <code>&lt;figcaption&gt;</code>.',
            'Karena tidak ada file asli, isi <code>src</code> bebas (yang penting atribut ada).'
          ],
          tabs: ['html'],
          starterCode: { html: '<!-- Tambahkan gambar di sini -->\n' },
          checks: [
            { id: 'img', type: 'exists', selector: 'img', label: 'sebuah <img>', desc: 'Ada elemen <code>&lt;img&gt;</code>.' },
            { id: 'src', type: 'attr', selector: 'img', attr: 'src', desc: '<code>&lt;img&gt;</code> punya atribut <code>src</code>.' },
            { id: 'alt', type: 'attr', selector: 'img', attr: 'alt', desc: '<code>&lt;img&gt;</code> punya atribut <code>alt</code>.' },
            { id: 'fig', type: 'exists', selector: 'figure figcaption', label: '<figcaption>', desc: 'Ada <code>&lt;figcaption&gt;</code> di dalam <code>&lt;figure&gt;</code>.' }
          ],
          hints: [
            'Ingat <code>&lt;img&gt;</code> tidak perlu penutup.',
            'Contoh: <code>&lt;figure&gt;&lt;img src="a.jpg" alt="…"&gt;&lt;figcaption&gt;Keterangan&lt;/figcaption&gt;&lt;/figure&gt;</code>'
          ],
          solution: { html: '<figure>\n  <img src="taman.jpg" alt="Taman kota di sore hari">\n  <figcaption>Taman kota, foto penulis.</figcaption>\n</figure>' }
        },
        quiz: [
          { type: 'mcq', id: 'l2-4-q1', q: 'Atribut yang menentukan alamat berkas gambar adalah…', options: ['href', 'src', 'alt', 'link'], answer: 1, explanation: 'src (source) menunjuk berkas; href untuk link.' },
          { type: 'mcq', id: 'l2-4-q2', q: 'Fungsi utama atribut alt adalah…', options: ['Mengatur ukuran', 'Teks alternatif untuk pembaca layar & gambar gagal', 'Mempercantik gambar', 'Menentukan format'], answer: 1, explanation: 'alt menjelaskan isi gambar bagi yang tidak bisa melihatnya.' },
          { type: 'multi', id: 'l2-4-q3', q: 'Yang benar tentang <img> adalah…', options: ['Merupakan void tag', 'Wajib punya alt', 'Perlu tag penutup </img>', 'Bisa diberi width'], answer: [0, 1, 3], wrongWhy: ['', '', '<img> tidak punya penutup karena void tag.', ''], explanation: '<img> self-closing, idealnya alt diisi, dan mendukung width/height.' },
          { type: 'fill', id: 'l2-4-q4', q: 'Tag untuk membungkus gambar beserta keterangannya.', before: '<', after: '>', answerText: ['figure'], explanation: '<figure> untuk gambar + <figcaption>.', hint: 'Berarti “gambar/bagan” dalam bahasa Inggris.' },
          { type: 'mcq', id: 'l2-4-q5', q: 'Kapan alt boleh dibiarkan kosong (alt="")?', options: ['Tidak pernah', 'Untuk gambar hiasan murni', 'Untuk gambar besar', 'Saat offline'], answer: 1, explanation: 'Hiasan dekoratif boleh alt kosong agar tidak mengganggu pembaca layar.' },
          { type: 'bug', id: 'l2-4-q6', q: 'Gambar ini bermasalah dari sisi aksesibilitas.', code: '<img src="logo.png">', instruction: 'Baris mana yang kurang atribut penting?', bugLine: 0, explanation: 'Kehabisan alt. Setiap <img> perlu alt untuk aksesibilitas.', hint: 'Atribut apa yang membantu tunanetra?' }
        ]
      },

      /* ==================== 2.5 Grouping & semantik ==================== */
      {
        id: 'l2-5',
        title: 'Mengelompokkan isi: div, span, dan tag semantik',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Kadang kita perlu “kotak”' },
          { type: 'p', html: 'Untuk mengatur sekelompok elemen jadi satu unit, kita pakai wadah. Dulu cuma ada <code>&lt;div&gt;</code> (wadah blok) dan <code>&lt;span&gt;</code> (wadah inline). Sejak HTML5 ada tag yang <em>bermakna</em>: menandakan bagian apa isinya.' },
          { type: 'list', items: [
            '<code>&lt;header&gt;</code> — bagian atas, biasanya judul/logo & intro.',
            '<code>&lt;nav&gt;</code> — kumpulan tautan navigasi.',
            '<code>&lt;main&gt;</code> — isi utama halaman (sebaiknya satu per halaman).',
            '<code>&lt;section&gt;</code> — bagian bertema dengan judul sendiri.',
            '<code>&lt;article&gt;</code> — konten mandiri (posting, kartu produk).',
            '<code>&lt;aside&gt;</code> — sisi tambahan (sidebar).',
            '<code>&lt;footer&gt;</code> — bagian bawah (info hak cipta, kontak).'
          ] },
          { type: 'code', lang: 'html', code: '<header>\n  <h1>Blog Saya</h1>\n  <nav><a href="#">Beranda</a> <a href="#">Tulisan</a></nav>\n</header>\n<main>\n  <article>\n    <h2>Tulisan Pertama</h2>\n    <p>Halo dunia.</p>\n  </article>\n</main>\n<footer>© 2026 Saya</footer>' },
          { type: 'callout', variant: 'note', title: 'Kenapa repot?', html: 'Tag semantik membuat struktur mudah dipahami mesin & alat bantu. “<code>&lt;div&gt;</code> tanpa akhir” hanyalah kotak kosong; <code>&lt;article&gt;</code> langsung bilang “ini satu tulisan utuh”. Nanti di Level 3, tag ini juga jadi jangkar untuk menata letak.' },
          { type: 'p', html: '<code>&lt;span&gt;</code> tetap berguna untuk membungkus <em>sebagian teks dalam kalimat</em>, misalnya satu kata untuk diberi gaya.' }
        ],
        challenge: {
          instructions: [
            'Buat <code>&lt;header&gt;</code> berisi satu <code>&lt;h1&gt;</code>.',
            'Tambahkan <code>&lt;main&gt;</code> yang di dalamnya ada sebuah <code>&lt;article&gt;</code>.',
            'Akhiri dengan <code>&lt;footer&gt;</code> berisi teks hak cipta.'
          ],
          tabs: ['html'],
          starterCode: { html: '<!-- Susun kerangka semantik di sini -->\n' },
          checks: [
            { id: 'header', type: 'exists', selector: 'header h1', label: '<h1> di dalam <header>', desc: 'Ada <code>&lt;h1&gt;</code> di dalam <code>&lt;header&gt;</code>.' },
            { id: 'main', type: 'exists', selector: 'main', label: '<main>', desc: 'Ada elemen <code>&lt;main&gt;</code>.' },
            { id: 'article', type: 'exists', selector: 'main article', label: '<article>', desc: 'Ada <code>&lt;article&gt;</code> di dalam <code>&lt;main&gt;</code>.' },
            { id: 'footer', type: 'exists', selector: 'footer', label: '<footer>', desc: 'Ada elemen <code>&lt;footer&gt;</code>.' }
          ],
          hints: [
            'Mulai dari luar ke dalam: <code>&lt;header&gt;…&lt;/header&gt;</code>, lalu <code>&lt;main&gt;…&lt;/main&gt;</code>, lalu <code>&lt;footer&gt;…&lt;/footer&gt;</code>.',
            '<code>&lt;article&gt;</code> bisa berada di dalam <code>&lt;main&gt;</code>.'
          ],
          solution: { html: '<header>\n  <h1>Catatan Harian</h1>\n</header>\n<main>\n  <article>\n    <h2>Hari Pertama</h2>\n    <p>Senang bisa mulai belajar.</p>\n  </article>\n</main>\n<footer>© 2026 Catatan Harian</footer>' }
        },
        quiz: [
          { type: 'mcq', id: 'l2-5-q1', q: 'Tag semantik untuk isi <em>utama</em> halaman adalah…', options: ['<div>', '<main>', '<section>', '<body>'], answer: 1, explanation: '<main> menandai konten utama; idealnya satu per halaman.' },
          { type: 'mcq', id: 'l2-5-q2', q: 'Untuk membungkus sebagian kata dalam kalimat, paling tepat pakai…', options: ['<div>', '<span>', '<p>', '<section>'], answer: 1, explanation: '<span> adalah wadah inline; <div> adalah blok.' },
          { type: 'multi', id: 'l2-5-q3', q: 'Manakah tag semantik HTML5?', options: ['<article>', '<section>', '<content>', '<aside>'], answer: [0, 1, 3], wrongWhy: ['', '', '<content> bukan tag HTML yang valid.', ''], explanation: 'article, section, aside (dan header/footer/nav/main) adalah semantik HTML5.' },
          { type: 'fill', id: 'l2-5-q4', q: 'Tag untuk kumpulan tautan navigasi.', before: '<', after: '>', answerText: ['nav'], explanation: '<nav> menandai area navigasi.' },
          { type: 'mcq', id: 'l2-5-q5', q: 'Kelebihan memakai tag semantik dibanding <div> belaka?', options: ['Halaman jadi lebih berat', 'Struktur mudah dipahami mesin & alat bantu', 'Otomatis punya warna', 'Tidak perlu CSS'], answer: 1, explanation: 'Semantik memberi makna struktur, membantu aksesibilitas dan SEO.' },
          { type: 'order', id: 'l2-5-q6', q: 'Susun kerangkan yang wajar atas ke bawah.', lines: ['<header>', '<main>', '<footer>'], explanation: 'header di atas, main di tengah (isi), footer di bawah.' }
        ]
      },

      /* ==================== 2.6 Tabel ==================== */
      {
        id: 'l2-6',
        title: 'Tabel: menyusun data berbaris',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Baris dan sel' },
          { type: 'p', html: 'Tabel cocok untuk <em>data</em> (jadwal, daftar harga), bukan untuk menata letak. Struktur dasar: <code>&lt;table&gt;</code> → baris <code>&lt;tr&gt;</code> → sel. Sel data memakai <code>&lt;td&gt;</code>, sel judul memakai <code>&lt;th&gt;</code>.' },
          { type: 'code', lang: 'html', code: '<table>\n  <caption>Jadwal Les</caption>\n  <thead>\n    <tr><th>Hari</th><th>Jam</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Senin</td><td>16:00</td></tr>\n    <tr><td>Rabu</td><td>16:00</td></tr>\n  </tbody>\n</table>' },
          { type: 'list', items: [
            '<code>&lt;caption&gt;</code> — judul tabel, ditulis pertama di dalam <table>.',
            '<code>&lt;thead&gt;</code> / <code>&lt;tbody&gt;</code> — mengelompokkan baris judul dan isi.',
            '<code>&lt;th&gt;</code> — header sel (tebal & rata tengah secara bawaan).',
            '<code>&lt;td&gt;</code> — <em>table data</em>, sel biasa.'
          ] },
          { type: 'callout', variant: 'warn', title: 'Jangan pakai tabel untuk layout', html: 'Dulu orang memakai tabel untuk menata halaman. Sekarang itu <em>tidak disarankan</em>—ruwet dan buruk untuk aksesibilitas. Untuk tata letak, kita punya CSS Flexbox/Grid (Level 4). Tabel hanya untuk data sungguhan.' }
        ],
        challenge: {
          instructions: [
            'Buat sebuah <code>&lt;table&gt;</code> dengan satu baris judul <code>&lt;th&gt;</code>.',
            'Tambahkan minimal 2 baris data dengan <code>&lt;td&gt;</code>.',
            'Sisipkan <code>&lt;caption&gt;</code> sebagai judul tabel.'
          ],
          tabs: ['html'],
          starterCode: { html: '<table>\n  <!-- isi di sini -->\n</table>\n' },
          checks: [
            { id: 'table', type: 'exists', selector: 'table', label: '<table>', desc: 'Ada elemen <code>&lt;table&gt;</code>.' },
            { id: 'caption', type: 'exists', selector: 'caption', label: '<caption>', desc: 'Ada <code>&lt;caption&gt;</code>.' },
            { id: 'th', type: 'exists', selector: 'th', label: '<th>', desc: 'Ada minimal satu <code>&lt;th&gt;</code> (judul kolom).' },
            { id: 'td', type: 'count', selector: 'td', min: 4, label: '4 <td>', desc: 'Ada minimal 4 sel data <code>&lt;td&gt;</code> (2 baris x 2 kolom).' }
          ],
          hints: [
            'Satu baris = <code>&lt;tr&gt;</code>. Di dalamnya ada <code>&lt;th&gt;</code> atau <code>&lt;td&gt;</code>.',
            'Baris judul: <code>&lt;tr&gt;&lt;th&gt;…&lt;/th&gt;&lt;th&gt;…&lt;/th&gt;&lt;/tr&gt;</code>.'
          ],
          solution: { html: '<table>\n  <caption>Daftar Harga</caption>\n  <thead><tr><th>Item</th><th>Harga</th></tr></thead>\n  <tbody>\n    <tr><td>Nasi</td><td>Rp10.000</td></tr>\n    <tr><td>Teh</td><td>Rp3.000</td></tr>\n  </tbody>\n</table>' }
        },
        quiz: [
          { type: 'mcq', id: 'l2-6-q1', q: 'Tag untuk sebuah <em>baris</em> tabel adalah…', options: ['<td>', '<tr>', '<th>', '<row>'], answer: 1, explanation: '<tr> = table row (baris).' },
          { type: 'mcq', id: 'l2-6-q2', q: 'Sel untuk <em>judul kolom</em> memakai tag…', options: ['<td>', '<th>', '<caption>', 'header'], answer: 1, explanation: '<th> untuk header, <td> untuk data biasa.' },
          { type: 'mcq', id: 'l2-6-q3', q: 'Kapan tabel sebaiknya dipakai?', options: ['Untuk menata letak halaman', 'Untuk menampilkan data berbaris & berkolom', 'Untuk membuat gambar', 'Untuk navigasi'], answer: 1, explanation: 'Tabel untuk data; layout pakai CSS.' },
          { type: 'multi', id: 'l2-6-q4', q: 'Bagian yang termasuk struktur tabel yang baik…', options: ['<caption>', '<thead>', '<tbody>', '<tfootx>'], answer: [0, 1, 2], wrongWhy: ['', '', '', '<tfootx> bukan tag; yang benar <tfoot>.'], explanation: 'caption, thead, tbody (dan tfoot) membangun tabel yang rapi.' },
          { type: 'order', id: 'l2-6-q5', q: 'Susun dari pembungkus terluar ke sel data.', lines: ['<table>', '<tr>', '<td>'], explanation: 'table memuat row, row memuat sel.' },
          { type: 'fill', id: 'l2-6-q6', q: 'Singkatan td berarti…', before: '<td> adalah kepanjangan dari table ', after: '', answerText: ['data', 'data cell', 'data sel'], explanation: 'td = table data (sel isi).' }
        ]
      },

      /* ==================== 2.7 Mini-project ==================== */
      {
        id: 'l2-7',
        title: 'Mini-project: Halaman “Tentang Saya”',
        minutes: 10,
        reading: [
          { type: 'h2', text: 'Waktunya merangkai semuanya' },
          { type: 'p', html: 'Level 2 mengajakmu menulis konten: teks berciri, daftar, tautan, gambar, dan tabel. Sekarang rangkai semuanya jadi satu halaman “Tentang Saya” yang layak, memakai kerangka semantik dari 2.5.' },
          { type: 'h2', text: 'Checklist halaman yang baik' },
          { type: 'list', ordered: true, items: [
            'Sebuah <code>&lt;header&gt;</code> dengan <code>&lt;h1&gt;</code> (namamu) dan paragraf pembuka yang punya minimal satu <code>&lt;strong&gt;</code>.',
            'Sebuah <code>&lt;img&gt;</code> dengan <code>alt</code> yang bermakna.',
            'Sebuah <code>&lt;ul&gt;</code> berisi minat/hobi (minimal 3 butir).',
            'Sebuah tautan <code>&lt;a href&gt;</code> ke media sosial atau email.',
            'Opsional: sebuah <code>&lt;table&gt;</code> data (mis. riwayat singkat).',
            '<code>&lt;footer&gt;</code> penutup.'
          ] },
          { type: 'callout', variant: 'note', title: 'Kerja seperti desainer', html: 'Jangan langsung mengejar semua syarat. Tulis dulu struktur kasarnya, jalankan pratinjau, lalu rapikan satu per satu. Kebiasaan “tulis-simpan-lihat” ini akan menemanimu sepanjang karier.' }
        ],
        challenge: {
          instructions: [
            'Bangun halaman “Tentang Saya” lengkap. Cek syarat di kanan satu per satu.',
            'Sertakan <code>&lt;h1&gt;</code> nama dan satu <code>&lt;strong&gt;</code> di paragraf.',
            'Tambahkan gambar ber-<code>alt</code>, daftar <code>&lt;ul&gt;</code> minat, dan sebuah <code>&lt;a&gt;</code>.'
          ],
          tabs: ['html'],
          starterCode: { html: '<header>\n  <h1>Nama Kamu</h1>\n</header>\n<main>\n  <!-- isi di sini -->\n</main>\n<footer></footer>\n' },
          checks: [
            { id: 'h1', type: 'exists', selector: 'h1', desc: 'Ada <code>&lt;h1&gt;</code> sebagai namamu.' },
            { id: 'strong', type: 'exists', selector: 'p strong', label: '<strong> dalam <p>', desc: 'Ada paragraf yang memuat <code>&lt;strong&gt;</code>.' },
            { id: 'img', type: 'exists', selector: 'img[alt]', label: '<img> ber-alt', desc: 'Ada gambar dengan atribut <code>alt</code>.' },
            { id: 'li', type: 'count', selector: 'ul li', min: 3, label: '3 <li>', desc: 'Daftar minat punya minimal 3 <code>&lt;li&gt;</code>.' },
            { id: 'link', type: 'attr', selector: 'a', attr: 'href', desc: 'Ada tautan <code>&lt;a&gt;</code> dengan <code>href</code>.' },
            { id: 'footer', type: 'exists', selector: 'footer', desc: 'Ada <code>&lt;footer&gt;</code> penutup.' }
          ],
          hints: [
            'Isi <code>&lt;main&gt;</code> dengan paragraf, gambar, dan daftar secara berurutan.',
            'Email bisa dijadikan link: <code>&lt;a href="mailto:kamu@email.com"&gt;kirim email&lt;/a&gt;</code>.'
          ],
          solution: { html: '<header>\n  <h1>Rani Amelia</h1>\n</header>\n<main>\n  <p>Halo! Aku <strong>suka sekali</strong> belajar hal baru lewat internet.</p>\n  <img src="foto.jpg" alt="Foto Rani sedang tersenyum">\n  <h2>Minat</h2>\n  <ul>\n    <li>Menggambar</li>\n    <li>Koding</li>\n    <li>Kopi</li>\n  </ul>\n  <p>Hubungi aku: <a href="mailto:rani@contoh.id">rani@contoh.id</a></p>\n</main>\n<footer>© 2026 Rani Amelia</footer>' }
        },
        quiz: [
          { type: 'multi', id: 'l2-7-q1', q: 'Elemen yang membuat halaman “Tentang Saya” mudah diakses ada di…', options: ['alt pada gambar', 'teks link yang bermakna', 'header/footer semantik', 'warna latar'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Warna tidak berkaitan langsung dengan aksesibilitas.'], explanation: 'alt, teks link jelas, dan struktur semantik menolong pembaca layar.' },
          { type: 'mcq', id: 'l2-7-q2', q: 'Untuk membuat alamat bisa diklik dan membuka email, pakai…', options: ['<a href="mailto:…">', '<a src="email">', '<email>', '<a mail="…">'], answer: 0, explanation: 'Href dengan skema mailto: membuka aplikasi email.' },
          { type: 'mcq', id: 'l2-7-q3', q: 'Tag paling tepat untuk satu berita/posting mandiri?', options: ['<section>', '<article>', '<div>', '<aside>'], answer: 1, explanation: '<article> untuk konten utuh yang berdiri sendiri.' },
          { type: 'order', id: 'l2-7-q4', q: 'Urutan membangun halaman yang efektif.', lines: ['Tulis struktur kasar', 'Jalankan pratinjau', 'Rapikan satu per satu'], explanation: 'Iteratif: kerangka → lihat → perbaiki.' },
          { type: 'fill', id: 'l2-7-q5', q: 'Atribut wajib pada gambar untuk aksesibilitas.', before: '<img src="a.jpg" ', after: '="deskripsi">', answerText: ['alt'], explanation: 'alt wajib diisi deskripsi gambar.' }
        ]
      }
    ]
  };

  if (global.TutorData && global.TutorData.registerLevel) global.TutorData.registerLevel(LEVEL);
  else (global.__TutorPendingLevels = global.__TutorPendingLevels || []).push(LEVEL);
})(window);
