/* =====================================================================
   data/level-07.js — Level 7: Naik Level (Pengetahuan Menengah)
   Objek, array-of-objects & render daftar, animasi @keyframes,
   struktur kode & debugging, JSON (dan konsep fetch), lalu FINAL PROJECT.
   Catatan: pratinjau berjalan di iframe tanpa same-origin, jadi
   localStorage/fetch sejati tidak bisa dieksekusi langsung — keduanya
   dijelaskan secara konsep, sementara tantangan memakai JSON (aman) dan
   render DOM.
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVEL = {
    id: 'level-7',
    num: 7,
    title: 'Naik ke Menengah',
    subtitle: 'Data terstruktur, animasi, kebiasaan debugger, dan pertukaran data — bekal jadi penyusun aplikasi sungguhan.',
    lessons: [

      /* 7.1 */
      {
        id: 'l7-1',
        title: 'Objek: mengelompokkan properti',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Benda dengan sifat & tindakan' },
          { type: 'p', html: 'Array menyimpan daftar berurutan. <strong>Objek</strong> menyimpan pasangan <em>kunci: nilai</em> — cocok untuk menggambarkan satu "benda" dengan banyak sifat.' },
          { type: 'code', lang: 'js', code: 'var user = {\n  nama: "Ana",\n  umur: 20,\n  hobi: ["baca", "koding"]\n};\nconsole.log(user.nama);      // "Ana"\nconsole.log(user["umur"]);   // 20' },
          { type: 'list', items: [
            'Akses dot: <code>user.nama</code>, atau kurung: <code>user["nama"]</code> (berguna saat kunci dinamis).',
            'Menambah/mengubah: <code>user.email = "a@b.c";</code>.',
            '<code>Object.keys(user)</code> memberi daftar kunci.',
            'Fungsi di dalam objek disebut <em>method</em>.'
          ] },
          { type: 'callout', variant: 'note', title: 'Kapan objek vs array?', html: 'Pakai <strong>array</strong> untuk koleksi serupa yang urut (daftar nama). Pakai <strong>objek</strong> untuk satu entitas dengan bidang berbeda (satu pengguna). Sering keduanya digabung: array berisi objek.' }
        ],
        challenge: {
          instructions: [
            'Buat objek <code>user</code> dengan properti <code>nama</code> bernilai <code>"Ana"</code>.',
            'Tampilkan <code>user.nama</code> ke <code>#output</code>.'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<div id="output"></div>\n', js: 'var user = {\n  // isi properti nama: "Ana"\n};\ndocument.getElementById("output").textContent = user.nama;\n' },
          checks: [
            { id: 'obj', type: 'jsGlobal', name: 'user', desc: 'Objek <code>user</code> dibuat.' },
            { id: 'prop', type: 'jsExpr', expr: 'win.user && win.user.nama === "Ana"', desc: '<code>user.nama</code> bernilai <code>"Ana"</code>.' },
            { id: 'text', type: 'text', selector: '#output', equals: 'Ana', desc: '<code>#output</code> menampilkan <code>Ana</code>.' }
          ],
          hints: [
            '<code>var user = { nama: "Ana" };</code>',
            'Kunci tidak pakai kutip, nilai string pakai kutip.'
          ],
          solution: { html: '<div id="output"></div>\n', js: 'var user = {\n  nama: "Ana",\n  umur: 20\n};\ndocument.getElementById("output").textContent = user.nama;' }
        },
        quiz: [
          { type: 'mcq', id: 'l7-1-q1', q: 'Objek menyimpan data sebagai…', options: ['daftar berurutan', 'pasangan kunci: nilai', 'satu angka', 'teks mentah'], answer: 1, explanation: 'Objek = koleksi property kunci: nilai.' },
          { type: 'mcq', id: 'l7-1-q2', q: 'Mengakses properti "nama" dari objek user bisa dengan…', options: ['user.nama', 'user(nama)', 'user->nama', 'user::nama'], answer: 0, explanation: 'Dot notation: user.nama (atau user["nama"]).' },
          { type: 'fill', id: 'l7-1-q3', q: 'Fungsi untuk mengambil semua kunci objek.', before: '______.keys(user);', answerText: ['Object'], explanation: 'Object.keys(obj) mengembalikan array kunci.' },
          { type: 'mcq', id: 'l7-1-q4', q: 'Fungsi yang disimpan di dalam objek disebut…', options: ['method', 'loop', 'array', 'global'], answer: 0, explanation: 'Fungsi sebagai properti objek = method.' },
          { type: 'multi', id: 'l7-1-q5', q: 'Bentuk penulisan nilai objek yang sah:', options: ['angka tanpa kutip', 'string dengan kutip', 'array dalam [ ]', 'kunci dengan titik dua'], answer: [0, 1, 2, 3], explanation: 'Semua itu tipe nilai/kunci yang valid di dalam objek.' },
          { type: 'mcq', id: 'l7-1-q6', q: 'Struktur "daftar pengguna" paling tepat sebagai…', options: ['objek tunggal', 'array berisi objek', 'string panjang', 'variabel angka'], answer: 1, explanation: 'Banyak item serupa => array; tiap item punya bidang => objek.' }
        ]
      },

      /* 7.2 */
      {
        id: 'l7-2',
        title: 'Array of objects & render daftar ke layar',
        minutes: 8,
        reading: [
          { type: 'h2', text: 'Pola paling sering di aplikasi nyata' },
          { type: 'p', html: 'Sebagian besar antarmuka menampilkan <em>daftar</em> data: daftar produk, komentar, tugas. Polanya sama: <strong>array berisi objek</strong>, lalu <em>dipetakan</em> menjadi elemen HTML satu per satu.' },
          { type: 'code', lang: 'js', code: 'var orang = [\n  { nama: "Amin" },\n  { nama: "Bella" }\n];\nvar ul = document.getElementById("list");\nfor (var i = 0; i < orang.length; i++) {\n  var li = document.createElement("li");\n  li.textContent = orang[i].nama;\n  ul.appendChild(li);\n}' },
          { type: 'list', items: [
            '<code>document.createElement("li")</code> — membuat elemen baru.',
            '<code>ul.appendChild(li)</code> — menempelkan anak ke induk.',
            'Alternatif modern: <code>orang.map(function (o) { ... })</code>.'
          ] },
          { type: 'callout', variant: 'note', title: 'Menyimpan data tanpa server', html: 'Di aplikasi nyata, daftar begini sering diambil dari <code>fetch</code> lalu disimpan ke <code>localStorage</code> browser agar awet setelah refresh. (Keduanya kita bahas konsepnya di pelajaran 7.4–7.5; di pratinjau aman ini kita fokus ke render-nya.)' }
        ],
        challenge: {
          instructions: [
            'Buat array <code>orang</code> berisi minimal 2 objek yang punya properti <code>nama</code>.',
            'Lewati dengan <code>for</code>, buat <code>&lt;li&gt;</code> untuk tiap nama.',
            'Tempelkan semuanya ke <code>#list</code>.'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<ul id="list"></ul>\n', js: 'var orang = [\n  { nama: "Amin" },\n  { nama: "Bella" }\n];\nvar ul = document.getElementById("list");\n// buat & tempel <li> untuk tiap orang\n' },
          checks: [
            { id: 'list', type: 'exists', selector: '#list', desc: 'Ada wadah <code>#list</code>.' },
            { id: 'li', type: 'count', selector: '#list li', min: 2, label: '2 li', desc: 'Daftar punya minimal 2 <code>&lt;li&gt;</code>.' },
            { id: 'arr', type: 'jsExpr', expr: 'win.orang && win.orang.length >= 2 && win.orang[0].nama', desc: 'Array <code>orang</code> berisi objek ber-<code>nama</code>.' }
          ],
          hints: [
            'Dalam loop: <code>var li = document.createElement("li"); li.textContent = orang[i].nama; ul.appendChild(li);</code>',
            'Gunakan <code>orang[i].nama</code> untuk mengambil nama tiap objek.'
          ],
          solution: { html: '<ul id="list"></ul>\n', js: 'var orang = [\n  { nama: "Amin" },\n  { nama: "Bella" }\n];\nvar ul = document.getElementById("list");\nfor (var i = 0; i < orang.length; i++) {\n  var li = document.createElement("li");\n  li.textContent = orang[i].nama;\n  ul.appendChild(li);\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l7-2-q1', q: 'Untuk membuat elemen baru di JS dipakai…', options: ['document.newElement', 'document.createElement', 'html.createElement', 'document.addTag'], answer: 1, explanation: 'document.createElement("tag") membuat node baru.' },
          { type: 'mcq', id: 'l7-2-q2', q: 'Menempelkan anak ke induk memakai…', options: ['appendChild', 'addChild', 'push', "insert"], answer: 0, explanation: 'induk.appendChild(anak) menyisipkan ke akhir induk.' },
          { type: 'fill', id: 'l7-2-q3', q: 'Mengambil nama elemen ke-2 dari array objek.', before: 'var n = orang[1].______;', answerText: ['nama'], explanation: 'Akses properti dengan dot notation.' },
          { type: 'mcq', id: 'l7-2-q4', q: 'Method array yang mengembalikan array baru hasil olahan tiap item adalah…', options: ['map', 'push', 'pop', 'join'], answer: 0, explanation: '.map(fn) memetakan tiap elemen jadi nilai baru.' },
          { type: 'order', id: 'l7-2-q5', q: 'Urutan merender daftar dari array objek.', lines: ['forEach/for tiap item', 'createElement li', 'li.textContent = data', 'ul.appendChild(li)'], explanation: 'Loop → buat elemen → isi → tempel.' },
          { type: 'multi', id: 'l7-2-q6', q: 'Hal yang benar soal render daftar:', options: ['satu li per data', 'loop sampai length', 'isi lewat textContent', 'harus pakai tabel'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Tidak wajib tabel; ul/li sering cukup.'], explanation: 'Satu item per data, iterasi penuh, isi pakai textContent.' }
        ]
      },

      /* 7.3 */
      {
        id: 'l7-3',
        title: 'Animasi: @keyframes',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Menggerakkan gaya langkah demi langkah' },
          { type: 'p', html: 'Transisi hanya mengubah antara dua keadaan. <strong>@keyframes</strong> memungkinkanmu mendefinisikan banyak tahap gerakan lalu menjalankannya lewat properti <code>animation</code>.' },
          { type: 'code', lang: 'css', code: '@keyframes naik {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.box {\n  animation: naik 2s;\n}' },
          { type: 'list', items: [
            '<code>from</code>/<code>to</code> atau <code>0%</code>/<code>100%</code> menandai awal & akhir.',
            '<code>animation: nama durasi;</code> menjalankan keyframes.',
            'Tambah <code>infinite</code> agar berulang, <code>alternate</code> untuk maju-mundur.'
          ] },
          { type: 'callout', variant: 'warn', title: 'Hormati pengguna', html: 'Sebagian orang sensitif gerakan. Sediakan <code>@media (prefers-reduced-motion: reduce) { * { animation: none; } }</code> agar yang tak suka gerakan bisa menonaktifkannya.' }
        ],
        challenge: {
          instructions: [
            'Di tab <strong>CSS</strong>, buat <code>@keyframes naik</code> dari <code>opacity: 0</code> ke <code>opacity: 1</code>.',
            'Terapkan ke <code>.box</code> memakai <code>animation: naik 2s;</code>.'
          ],
          tabs: ['html', 'css'],
          starterCode: { html: '<div class="box">Hai</div>\n', css: '/* buat @keyframes lalu jalankan ke .box */\n' },
          checks: [
            { id: 'kf', type: 'jsExpr', expr: "document.getElementById('user-css').textContent.indexOf('@keyframes') >= 0", desc: 'CSS memuat aturan <code>@keyframes</code>.' },
            { id: 'anim', type: 'style', selector: '.box', prop: 'animation-name', value: 'naik', desc: '<code>.box</code> memakai animasi bernama <code>naik</code>.' }
          ],
          hints: [
            '<code>@keyframes naik { from { opacity: 0; } to { opacity: 1; } }</code>',
            '<code>.box { animation: naik 2s; }</code> — nama harus cocok.'
          ],
          solution: { html: '<div class="box">Hai</div>\n', css: '@keyframes naik {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.box {\n  animation: naik 2s;\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l7-3-q1', q: 'Perbedaan utama @keyframes vs transition adalah…', options: ['tak ada beda', 'keyframes bisa banyak tahap', 'transition lebih cepat', 'keyframes untuk warna saja'], answer: 1, explanation: 'Keyframes mendefinisikan banyak frame; transisi hanya dua keadaan.' },
          { type: 'fill', id: 'l7-3-q2', q: 'Properti untuk menjalankan animasi.', before: '______: naik 2s;', answerText: ['animation'], explanation: 'animation: nama durasi; menjalankan keyframes.' },
          { type: 'mcq', id: 'l7-3-q3', q: 'Agar animasi terus berulang tambahkan kata kunci…', options: ['repeat', 'infinite', 'loop', 'again'], answer: 1, explanation: 'animation: naik 2s infinite;' },
          { type: 'multi', id: 'l7-3-q4', q: 'Penanda tahap pada keyframes:', options: ['from', 'to', '50%', 'next'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'next bukan penanda frame.'], explanation: 'from/to dan persentase (mis. 50%) menandai frame.' },
          { type: 'mcq', id: 'l7-3-q5', q: 'Cara ramah aksesibilitas terhadap animasi adalah…', options: ['percepat semua', 'hormati prefers-reduced-motion', 'hapus transisi', 'perbesar durasi'], answer: 1, explanation: 'Menonaktifkan animasi saat pengguna memilih reduced-motion.' }
        ]
      },

      /* 7.4 */
      {
        id: 'l7-4',
        title: 'Menata struktur kode & debugging',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Kode rapi lebih mudah diperbaiki' },
          { type: 'list', items: [
            'Pecah tugas besar menjadi <em>fungsi kecil</em> bernama jelas (mis. <code>hitungTotal</code>, <code>tampilResult</code>).',
            'Simpan nilai berulang dalam variabel, jangan salin-tempel angka.',
            'Baca pesan error: ia biasanya menyebut <em>jenis</em> kesalahan dan <em>baris</em>-nya.'
          ] },
          { type: 'h2', text: 'Alat debugger' },
          { type: 'p', html: 'Panel <strong>Console</strong> di bawah pratinjau menampilkan error dan hasil <code>console.log</code>. Cara cepat menelusuri bug: selipkan <code>console.log</code> pada titik-titik penting untuk melihat nilai sebenarnya.' },
          { type: 'code', lang: 'js', code: 'var total = 0;\nfor (var i = 1; i <= 4; i++) {  // seharusnya sampai 5?\n  total = total + i;\n}\nconsole.log("total saat ini:", total);' },
          { type: 'callout', variant: 'note', title: 'Metode divide & conquer', html: 'Kode tidak sesuai harapan? Persempit: komentari sebagian, cek bagian mana yang masih salah. Bug hampir selalu ada di "jendela" kecil antar baris yang kamu curigai.' }
        ],
        challenge: {
          instructions: [
            'Kode di samping seharusnya menjumlahkan <code>1..5</code>, tetapi loop-nya berhenti terlalu cepat.',
            'Perbaiki agar jumlah semua angka <code>1</code> sampai <code>5</code>.',
            '<code>#output</code> harus menampilkan <code>15</code>.'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<div id="output"></div>\n', js: 'var total = 0;\nfor (var i = 1; i <= 4; i++) {\n  total = total + i;\n}\ndocument.getElementById("output").textContent = total;\n' },
          checks: [
            { id: 'sum', type: 'jsExpr', expr: 'win.total === 15', desc: 'Nilai <code>total</code> akhirnya <code>15</code>.' },
            { id: 'text', type: 'text', selector: '#output', equals: '15', desc: '<code>#output</code> menampilkan <code>15</code>.' }
          ],
          hints: [
            'Batas loop harus mencakup angka 5: <code>i <= 5</code>.',
            '1+2+3+4+5 = 15.'
          ],
          solution: { html: '<div id="output"></div>\n', js: 'var total = 0;\nfor (var i = 1; i <= 5; i++) {\n  total = total + i;\n}\ndocument.getElementById("output").textContent = total;' }
        },
        quiz: [
          { type: 'mcq', id: 'l7-4-q1', q: 'Alat untuk mencetak nilai saat menelusuri bug adalah…', options: ['alert()', 'console.log', 'document.write', 'print'], answer: 1, explanation: 'console.log menampakkan nilai di DevTools/panel console.' },
          { type: 'mcq', id: 'l7-4-q2', q: 'Memecah program menjadi fungsi kecil bertujuan…', options: ['memperlambat', 'memudahkan perawatan & pembacaan', 'menambah bug', 'memperbesar file'], answer: 1, explanation: 'Fungsi kecil, bernama jelas = mudah dibaca & diuji.' },
          { type: 'fill', id: 'l7-4-q3', q: 'Perhatikan bug ini.', before: 'for (var i = 1; i <= ___; i++)', codeContext: 'ingin menjumlah 1 sampai 5', answerText: ['5'], explanation: 'Batas atas harus 5 agar ikut menjumlah angka 5.' },
          { type: 'mcq', id: 'l7-4-q4', q: 'Pesan error browser umumnya memberi tahu…', options: ['hanya jenis error', 'jenis & lokasi (baris) masalah', 'solusi otomatis', 'tidak ada info'], answer: 1, explanation: 'Error biasanya menyebut tipe galat plus file/baris.' },
          { type: 'multi', id: 'l7-4-q5', q: 'Kebiasaan debugging yang baik:', options: ['baca pesan error', 'pakai console.log untuk intip nilai', 'persempit dengan komentar/tes', 'tebak acak lalu simpan'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Tebak tanpa metode membuat makin kacau.'], explanation: 'Sistematis: baca, intip, persempit.' },
          { type: 'bug', id: 'l7-4-q6', q: 'Loop ini menghasilkan jumlah yang kurang.', code: 'var t = 0;\nfor (var i = 1; i < 5; i++) {\n  t += i;\n}', instruction: 'Baris mana yang menahan agar angka 5 tak ikut?', bugLine: 1, explanation: 'i < 5 berhenti di 4; harus i <= 5 untuk menyertakan 5.' }
        ]
      },

      /* 7.5 */
      {
        id: 'l7-5',
        title: 'JSON & konsep mengambil data (fetch)',
        minutes: 8,
        reading: [
          { type: 'h2', text: 'Bahasa pertukaran data' },
          { type: 'p', html: '<strong>JSON</strong> (<em>JavaScript Object Notation</em>) adalah format teks untuk mengirim data antar program. Di JS, <code>JSON.parse</code> mengubah teks jadi objek, dan <code>JSON.stringify</code> mengubah objek jadi teks.' },
          { type: 'code', lang: 'js', code: 'var teks = \'{"nama":"Sari","umur":19}\' ;\nvar data = JSON.parse(teks);\nconsole.log(data.nama);        // "Sari"\nvar lagi = JSON.stringify(data); // objek -> teks' },
          { type: 'h2', text: 'Dari mana teks itu datang? fetch' },
          { type: 'p', html: 'Di aplikasi nyata, JSON biasanya diunduh dari server memakai <code>fetch</code>. Konsepnya: minta data → tunggu → ubah JSON jadi objek → tampilkan.' },
          { type: 'code', lang: 'js', code: 'fetch("https://api.example.com/user")\n  .then(function (res) { return res.json(); })\n  .then(function (data) { console.log(data); })\n  .catch(function (err) { console.log("gagal", err); });' },
          { type: 'callout', variant: 'warn', title: 'Kenapa tak dicoba langsung di sini', html: 'Pratinjau kursus ini berjalan terisolasi tanpa izin jaringan/origin, jadi <code>fetch</code> sungguhan dan <code>localStorage</code> tak bisa dijalankan. Pahami bentuknya; kamu akan mencobanya di proyekmu sendiri nanti. Tantangan ini memakai <code>JSON.parse</code> yang aman.' }
        ],
        challenge: {
          instructions: [
            'Ubah teks <code>teks</code> menjadi objek memakai <code>JSON.parse</code> dan simpan di variabel <code>data</code>.',
            'Tampilkan <code>data.nama</code> ke <code>#output</code> (hasilnya <code>Sari</code>).'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<div id="output"></div>\n', js: 'var teks = \'{"nama":"Sari","umur":19}\' ;\nvar data = {}; // ubah teks jadi objek\n// tampilkan data.nama ke #output\n' },
          checks: [
            { id: 'parse', type: 'jsExpr', expr: 'win.data && win.data.nama === "Sari"', desc: '<code>data</code> adalah objek hasil parse dengan <code>nama</code> "Sari".' },
            { id: 'umur', type: 'jsExpr', expr: 'win.data && win.data.umur === 19', desc: '<code>data.umur</code> bernilai angka <code>19</code>.' },
            { id: 'text', type: 'text', selector: '#output', equals: 'Sari', desc: '<code>#output</code> menampilkan <code>Sari</code>.' }
          ],
          hints: [
            '<code>var data = JSON.parse(teks);</code>',
            'Lalu <code>document.getElementById("output").textContent = data.nama;</code>'
          ],
          solution: { html: '<div id="output"></div>\n', js: 'var teks = \'{"nama":"Sari","umur":19}\' ;\nvar data = JSON.parse(teks);\ndocument.getElementById("output").textContent = data.nama;' }
        },
        quiz: [
          { type: 'mcq', id: 'l7-5-q1', q: 'Fungsi yang mengubah teks JSON menjadi objek adalah…', options: ['JSON.stringify', 'JSON.parse', 'JSON.toObj', 'evalJSON'], answer: 1, explanation: 'JSON.parse(text) => objek; JSON.stringify(objek) => text.' },
          { type: 'mcq', id: 'l7-5-q2', q: 'Kebalikannya, mengubah objek menjadi teks memakai…', options: ['JSON.parse', 'JSON.stringify', 'toString', 'join'], answer: 1, explanation: 'JSON.stringify mengurut objek jadi string.' },
          { type: 'fill', id: 'l7-5-q3', q: 'Perintah mengambil data dari server.', before: '______("https://api/...");', answerText: ['fetch'], explanation: 'fetch(url) memulai permintaan jaringan.' },
          { type: 'mcq', id: 'l7-5-q4', q: 'Karena fetch bersifat asinkron, hasilnya dibaca melalui…', options: ['langsung return', '.then() / async-await', 'loop while', 'setTimeout'], answer: 1, explanation: 'Janji (Promise) diselesaikan dengan .then atau await.' },
          { type: 'multi', id: 'l7-5-q5', q: 'Yang benar tentang JSON:', options: ['berbasis teks', 'mirip objek/JS', 'cocok pertukaran data', 'hanya untuk gambar'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'JSON untuk data terstruktur, bukan gambar.'], explanation: 'JSON = teks, sintaks mirip objek, untuk bertukar data.' },
          { type: 'mcq', id: 'l7-5-q6', q: 'localStorage berfungsi untuk…', options: ['mengirim email', 'menyimpan data di browser', 'menjalankan CSS', 'mengompres gambar'], answer: 1, explanation: 'localStorage menyimpan key/value di peramban pengguna.' }
        ]
      },

      /* 7.6 FINAL PROJECT */
      {
        id: 'l7-6',
        title: 'FINAL PROJECT: Daftar Tugas Interaktif',
        minutes: 12,
        reading: [
          { type: 'h2', text: 'Merakit aplikasi kecilmu' },
          { type: 'p', html: 'Gabungan semua level: struktur HTML, gaya CSS, dan logika JS untuk membuat <em>to-do list</em>. Saat tombol ditekan, teks dari input menjadi item baru di daftar.' },
          { type: 'list', ordered: true, items: [
            'Buat <code>&lt;input id="inp"&gt;</code>, <code>&lt;button id="add"&gt;</code>, dan <code>&lt;ul id="list"&gt;</code>.',
            'Ambil nilai input: <code>inp.value</code>.',
            'Buat <code>&lt;li&gt;</code> berisi teks itu lalu <code>appendChild</code> ke daftar.',
            'Bersihkan input setelah menambah.',
            'Kosongkan <code>value</code> dengan <code>inp.value = "";</code>.'
          ] },
          { type: 'callout', variant: 'note', title: 'Sentuhan akhir', html: 'Setelah berfungsi, percantik dengan CSS (padding pada li, hapus bullet). Kamu baru saja membuat aplikasi interaktif sungguhan — selamat! 🎉' }
        ],
        challenge: {
          instructions: [
            'Sediakan <code>#inp</code> (input), <code>#add</code> (tombol), dan <code>#list</code> (ul).',
            'Saat <code>#add</code> diklik, tambahkan satu <code>&lt;li&gt;</code> ke <code>#list</code>.',
            'Isi li dari nilai input (boleh pakai teks cadangan bila input kosong).'
          ],
          tabs: ['html', 'css', 'js'],
          starterCode: { html: '<input id="inp" placeholder="Tugas baru">\n<button id="add">Tambah</button>\n<ul id="list"></ul>\n', css: '#list li {\n  /* poles di sini */\n}\n', js: 'var inp = document.getElementById("inp");\nvar btn = document.getElementById("add");\nvar list = document.getElementById("list");\n// pasang click handler pada btn\n' },
          checks: [
            { id: 'inp', type: 'exists', selector: '#inp', desc: 'Ada input <code>#inp</code>.' },
            { id: 'btn', type: 'exists', selector: '#add', desc: 'Ada tombol <code>#add</code>.' },
            { id: 'list', type: 'exists', selector: '#list', desc: 'Ada daftar <code>#list</code>.' },
            { id: 'add', type: 'clickChanges', button: '#add', target: '#list', desc: 'Mengklik <code>#add</code> menambah isi ke <code>#list</code>.' }
          ],
          hints: [
            '<code>var isi = inp.value || "Tugas baru";</code> memberi nilai cadangan bila kosong.',
            '<code>btn.addEventListener("click", function () { var li = document.createElement("li"); li.textContent = isi; list.appendChild(li); });</code>'
          ],
          solution: { html: '<input id="inp" placeholder="Tugas baru">\n<button id="add">Tambah</button>\n<ul id="list"></ul>\n', css: '#list li {\n  padding: 6px 0;\n  border-bottom: 1px solid #ccc;\n}\n', js: 'var inp = document.getElementById("inp");\nvar btn = document.getElementById("add");\nvar list = document.getElementById("list");\nbtn.addEventListener("click", function () {\n  var isi = inp.value || "Tugas baru";\n  var li = document.createElement("li");\n  li.textContent = isi;\n  list.appendChild(li);\n  inp.value = "";\n});' }
        },
        quiz: [
          { type: 'mcq', id: 'l7-6-q1', q: 'Mengambil teks yang diketik pengguna di input memakai…', options: ['inp.text', 'inp.value', 'inp.textContent', 'inp.data'], answer: 1, explanation: 'Nilai input dibaca/tulis lewat properti value.' },
          { type: 'order', id: 'l7-6-q2', q: 'Urutan menambah item ke daftar.', lines: ['ambil inp.value', 'createElement li', 'isi li.textContent', 'appendChild ke list'], explanation: 'Baca data → buat elemen → isi → tempel.' },
          { type: 'multi', id: 'l7-6-q3', q: 'Fitur to-do yang ramah pengguna:', options: ['membersihkan input setelah tambah', 'tidak menambah item kosong', 'menggunakan label pada input', 'menghapus semua tanpa konfirmasi'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Hapus massal tanpa konfirmasi justru menjengkelkan.'], explanation: 'Bersihkan input, tolak kosong, beri label jelas.' },
          { type: 'fill', id: 'l7-6-q4', q: 'Mengosongkan input setelah menambah item.', before: 'inp.______ = "";', answerText: ['value'], explanation: 'Setel value kosong untuk membersihkan input.' },
          { type: 'multi', id: 'l7-6-q5', q: 'Keterampilan yang kamu latih di proyek akhir ini:', options: ['DOM & events', 'array/objek untuk data', 'struktur HTML', 'hanya menghias warna'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Bukan cuma warna—logika & struktur ikut.'], explanation: 'Proyek ini menyatukan HTML, CSS, dan JS secara nyata.' },
          { type: 'mcq', id: 'l7-6-q6', q: 'Langkah lanjutan terbaik setelah proyek ini…', options: ['menyimpan tugas via localStorage/fetch', 'menghenti belajar', 'membuang JS', 'hapus semua fitur'], answer: 0, explanation: 'Ketahanan data (localStorage/fetch) adalah langkah natural berikutnya.' }
        ]
      }
    ]
  };

  if (global.TutorData && global.TutorData.registerLevel) global.TutorData.registerLevel(LEVEL);
  else (global.__TutorPendingLevels = global.__TutorPendingLevels || []).push(LEVEL);
})(window);
