/* =====================================================================
   data/level-06.js — Level 6: Membuat Halaman Hidup dengan JavaScript
   Variabel & console, tipe data & operator, if/else, perulangan & array,
   fungsi, DOM, events, lalu mini-project: tombol penghitung (counter).
   Tantangan memakai tab HTML + JS. Kode JS jalan di iframe; hasil
   ditampilkan ke elemen #output sehingga bisa diperiksa otomatis.
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVEL = {
    id: 'level-6',
    num: 6,
    title: 'JavaScript Dasar',
    subtitle: 'Saatnya halamanmu BERPITIKIR: menyimpan data, mengambil keputusan, mengulang, dan merespons klik.',
    lessons: [

      /* 6.1 */
      {
        id: 'l6-1',
        title: 'Mengenal JavaScript, variabel & console',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Bahasa yang membuat halaman bergerak' },
          { type: 'p', html: 'Kalau HTML adalah <em>tulang</em> dan CSS adalah <em>kulit</em>, maka <strong>JavaScript</strong> (JS) adalah <em>otak</em>-nya. JS bisa menyimpan informasi, mengambil keputusan, dan mengubah tampilan halaman saat juga.' },
          { type: 'p', html: 'Di kursus ini, tab <strong>JS</strong> pada editor otomatis dijalankan di dalam pratinjau. Kamu tidak perlu menulis tag <code>&lt;script&gt;</code> sendiri — cukup tulis kodenya.' },
          { type: 'h2', text: 'Variabel: kotak berlabel untuk data' },
          { type: 'p', html: 'Variabel adalah nama yang menampung sebuah nilai. Cara menulis paling umum: <code>var nama = "Budi";</code>. Ada tiga kata kunci: <code>var</code>, <code>let</code>, dan <code>const</code>.' },
          { type: 'code', lang: 'js', code: 'var nama = "Budi";   // boleh diubah nanti\nlet umur = 17;        // untuk nilai yang akan diganti\nconst PHI = 3.14;     // tetap, tidak boleh diganti' },
          { type: 'list', items: [
            '<code>var</code> &amp; <code>let</code> — isinya boleh diganti setelah dibuat.',
            '<code>const</code> — isinya tetap; mencoba menggantinya menimbulkan error.',
            'Nama variabel tidak boleh mengandung spasi dan tidak boleh dimulai dengan angka.'
          ] },
          { type: 'h2', text: 'console.log: jendela menuju isi pikiran kode' },
          { type: 'p', html: '<code>console.log("Halo")</code> mencetak nilai ke panel <strong>Console</strong> di bawah pratinjau. Ini alat nomor satu untuk mengintip apa yang sebenarnya disimpan sebuah variabel.' },
          { type: 'callout', variant: 'note', title: 'Tampilan ke halaman', html: 'Untuk menampakkan sesuatu ke pembaca, kita tulis ke elemen di halaman, misalnya <code>document.getElementById("output").textContent = nama;</code>. <code>console.log</code> untuk <em>kamu</em>; <code>textContent</code> untuk <em>pengguna</em>.' }
        ],
        challenge: {
          instructions: [
            'Buat variabel <code>nama</code> berisi sebuah nama (mis. <code>"Budi"</code>).',
            'Tampilkan teks <code>Halo, Budi!</code> ke elemen <code>#output</code>.',
            'Cetak juga sapaan itu ke console dengan <code>console.log</code>.'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<div id="output"></div>\n', js: '// 1. buat variabel "nama"\n// 2. tampilkan ke #output, contoh: Halo, Budi!\n' },
          checks: [
            { id: 'var', type: 'jsGlobal', name: 'nama', desc: 'Variabel <code>nama</code> sudah dibuat.' },
            { id: 'out', type: 'exists', selector: '#output', desc: 'Ada elemen <code>#output</code> (sudah disiapkan).' },
            { id: 'text', type: 'text', selector: '#output', contains: 'Halo budi', label: '#output', desc: 'Isi <code>#output</code> berisi "Halo" dan nama "Budi".' }
          ],
          hints: [
            '<code>var nama = "Budi";</code> lalu <code>document.getElementById("output").textContent = "Halo, " + nama + "!";</code>',
            'Gabung teks memakai tanda <code>+</code>. <code>console.log("Halo, " + nama);</code>'
          ],
          solution: { html: '<div id="output"></div>\n', js: 'var nama = "Budi";\ndocument.getElementById("output").textContent = "Halo, " + nama + "!";\nconsole.log("Halo, " + nama);' }
        },
        quiz: [
          { type: 'mcq', id: 'l6-1-q1', q: 'Peran JavaScript dalam sebuah halaman web adalah…', options: ['Menyusun struktur', 'Mengatur warna & jarak', 'Menambahkan logika & interaksi', 'Menyimpan gambar'], answer: 2, explanation: 'Struktur=HTML, tampilan=CSS, logika/interaksi=JavaScript.' },
          { type: 'mcq', id: 'l6-1-q2', q: 'Kata kunci untuk nilai yang TIDAK boleh diubah lagi adalah…', options: ['var', 'let', 'const', 'static'], answer: 2, explanation: 'const menandai nilai tetap.' },
          { type: 'fill', id: 'l6-1-q3', q: 'Perintah untuk mencetak ke panel console.', before: '______.log("Halo");', answerText: ['console'], explanation: 'console.log(...) mencetak ke konsol.' },
          { type: 'multi', id: 'l6-1-q4', q: 'Nama variabel yang BOLEH dipakai:', options: ['namaSaya', 'total_harga', '2nilai', 'user-1'], answer: [0, 1], wrongWhy: ['', '', 'Tidak boleh diawali angka.', 'Tanda minus dianggap pengurangan, tidak valid.'], explanation: 'Boleh huruf/angka/_/$, tapi tidak boleh diawali angka atau memakai spasi/minus.' },
          { type: 'mcq', id: 'l6-1-q5', q: 'Untuk menampilkan teks ke layar (bukan konsol), kita mengubah properti…', options: ['innerHTML teks', 'element.textContent', 'console.value', 'window.title'], answer: 1, explanation: 'textContent menaruh teks ke dalam elemen yang tampil.' },
          { type: 'bug', id: 'l6-1-q6', q: 'Kode ini error saat dijalankan.', code: 'const PHI = 3.14;\nPHI = 3.15;', instruction: 'Baris mana yang menjadi sumber kesalahan?', bugLine: 1, explanation: 'const tidak bisa ditugaskan ulang; baris 2 melanggar.' }
        ]
      },

      /* 6.2 */
      {
        id: 'l6-2',
        title: 'Tipe data & operator',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Jenis-jenis nilai' },
          { type: 'list', items: [
            '<strong>String</strong> — teks, dibungkus kutip: <code>"halo"</code>.',
            '<strong>Number</strong> — angka: <code>42</code>, <code>3.5</code>.',
            '<strong>Boolean</strong> — benar/salah: <code>true</code> / <code>false</code>.',
            '<strong>undefined</strong> — variabel yang belum diisi.',
            '<strong>null</strong> — sengaja dikosongkan.'
          ] },
          { type: 'h2', text: 'Operator aritmetika' },
          { type: 'code', lang: 'js', code: '7 + 3   // 10 tambah\n7 - 3   // 4 kurang\n7 * 3   // 21 kali\n7 / 2   // 3.5 bagi\n7 % 2   // 1 sisa bagi (modulo)\n2 ** 3  // 8 pangkat' },
          { type: 'h2', text: 'Penggabungan string vs penjumlahan' },
          { type: 'p', html: 'Tanda <code>+</code> berperan ganda: menjumlah angka, tapi <em>menggabung</em> (menyambung) bila salah satunya string. <code>"5" + 1</code> hasilnya <code>"51"</code>, bukan 6!' },
          { type: 'callout', variant: 'warn', title: 'Operator perbandingan', html: 'Gunakan <code>===</code> (sama nilai <em>dan</em> tipe) alih-alih <code>==</code>. <code>"5" == 5</code> itu <code>true</code> (berbahaya), sedangkan <code>"5" === 5</code> itu <code>false</code>.' }
        ],
        challenge: {
          instructions: [
            'Buat variabel <code>hasil</code> yang menyimpan hasil perkalian <code>7 * 6</code>.',
            'Tampilkan angka tersebut ke <code>#output</code>.'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<div id="output"></div>\n', js: 'var hasil = 0; // ganti dengan 7 * 6\ndocument.getElementById("output").textContent = hasil;\n' },
          checks: [
            { id: 'var', type: 'jsGlobal', name: 'hasil', desc: 'Variabel <code>hasil</code> dibuat.' },
            { id: 'val', type: 'jsExpr', expr: 'win.hasil === 42', desc: 'Nilai <code>hasil</code> benar-benar <code>42</code> (hasil perkalian).' },
            { id: 'text', type: 'text', selector: '#output', equals: '42', desc: '<code>#output</code> menampilkan <code>42</code>.' }
          ],
          hints: [
            '<code>var hasil = 7 * 6;</code> langsung menyimpan 42.',
            'Jangan tulis <code>var hasil = "42"</code> (itu string).'
          ],
          solution: { html: '<div id="output"></div>\n', js: 'var hasil = 7 * 6;\ndocument.getElementById("output").textContent = hasil;' }
        },
        quiz: [
          { type: 'mcq', id: 'l6-2-q1', q: 'Hasil dari <code>"5" + 1</code> adalah…', options: ['6', '"51"', '51 angka', 'error'], answer: 1, explanation: 'Karena ada string, + menyambung: "5" + 1 => "51".' },
          { type: 'mcq', id: 'l6-2-q2', q: 'Operator untuk mengambil sisa hasil bagi adalah…', options: ['/', '%', '**', '//'], answer: 1, explanation: '% (modulo) memberi sisa, mis. 7 % 2 = 1.' },
          { type: 'fill', id: 'l6-2-q3', q: 'Perbandingan ketat (nilai & tipe) memakai.', before: 'if (a ___ b)', answerText: ['==='], explanation: '=== memastikan tipe dan nilai sama.' },
          { type: 'mcq', id: 'l6-2-q4', q: 'Tipe data dari nilai <code>true</code> dan <code>false</code> adalah…', options: ['string', 'number', 'boolean', 'object'], answer: 2, explanation: 'true/false bertipe boolean.' },
          { type: 'multi', id: 'l6-2-q5', q: 'Yang merupakan number (bukan string):', options: ['42', '3.14', '"7"', 'true'], answer: [0, 1], wrongWhy: ['', '', 'Ada kutip, jadi string.', 'Boolean, bukan angka.'], explanation: 'Angka ditulis tanpa kutip.' },
          { type: 'mcq', id: 'l6-2-q6', q: 'Nilai dari variabel yang dideklarasikan tapi belum diisi adalah…', options: ['null', '0', 'undefined', '""'], answer: 2, explanation: 'Tanpa nilai awal, isinya undefined.' }
        ]
      },

      /* 6.3 */
      {
        id: 'l6-3',
        title: 'Mengambil keputusan dengan if/else',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Bila… maka…' },
          { type: 'p', html: 'Logika percabangan menjalankan kode berbeda tergantung kondisi. Bentuknya: <code>if</code> (jika benar, jalankan ini), <code>else if</code> (atau jika…), dan <code>else</code> (kalau tidak semua).' },
          { type: 'code', lang: 'js', code: 'var nilai = 80;\nif (nilai >= 90) {\n  console.log("A");\n} else if (nilai >= 70) {\n  console.log("Lulus");\n} else {\n  console.log("Perbaiki lagi");\n}' },
          { type: 'list', items: [
            'Kondisi di dalam <code>( )</code> harus menghasilkan <code>true</code>/<code>false</code>.',
            'Blok <code>{ }</code> hanya jalan saat kondisinya <code>true</code>.',
            'Hanya <strong>satu</strong> cabang yang dijalankan — begitu satu cocok, sisanya dilewati.'
          ] },
          { type: 'callout', variant: 'note', title: 'Sering keliru', html: 'Ingat <code>=</code> (menugaskan) berbeda dengan <code>===</code> (membandingkan). Menulis <code>if (x = 5)</code> bukan membandingkan, melainkan mengisi x dengan 5 — sumber bug legendaris.' }
        ],
        challenge: {
          instructions: [
            'Buat variabel <code>nilai</code> berisi <code>80</code>.',
            'Jika <code>nilai >= 70</code> tampilkan <code>Lulus</code> ke <code>#output</code>, selain itu tampilkan <code>Ulangan</code>.'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<div id="output"></div>\n', js: 'var nilai = 80;\nvar out = document.getElementById("output");\n// lengkapi percabangan di bawah\n' },
          checks: [
            { id: 'var', type: 'jsGlobal', name: 'nilai', desc: 'Variabel <code>nilai</code> dibuat.' },
            { id: 'text', type: 'text', selector: '#output', equals: 'Lulus', desc: 'Karena 80 ≥ 70, <code>#output</code> harus berisi <code>Lulus</code>.' }
          ],
          hints: [
            '<code>if (nilai >= 70) { out.textContent = "Lulus"; } else { out.textContent = "Ulangan"; }</code>',
            'Gunakan <code>>=</code> untuk "lebih besar atau sama dengan".'
          ],
          solution: { html: '<div id="output"></div>\n', js: 'var nilai = 80;\nvar out = document.getElementById("output");\nif (nilai >= 70) {\n  out.textContent = "Lulus";\n} else {\n  out.textContent = "Ulangan";\n}' }
        },
        quiz: [
          { type: 'mcq', id: 'l6-3-q1', q: 'Blok di dalam <code>else</code> dijalankan ketika…', options: ['selalu', 'if dan semua else if bernilai false', 'if bernilai true', 'tidak pernah'], answer: 1, explanation: 'else adalah jalur "kalau tidak ada yang cocok".' },
          { type: 'mcq', id: 'l6-3-q2', q: 'Dengan <code>nilai = 50</code>, output dari <code>if (nilai>=70) "Lulus" else "Ulangan"</code> adalah…', options: ['Lulus', 'Ulangan', 'kosong', 'error'], answer: 1, explanation: '50 < 70 sehingga else yang jalan: "Ulangan".' },
          { type: 'fill', id: 'l6-3-q3', q: 'Kata kunci tambahan untuk memeriksa kondisi kedua.', before: 'if (a) {...} ____ (b) {...}', answerText: ['else if'], explanation: 'else if menambah cabang pemeriksaan.' },
          { type: 'multi', id: 'l6-3-q4', q: 'Operator perbandingan yang sah:', options: ['>=', '<=', '!=', '=+'], answer: [0, 1, 2], wrongWhy: ['', '', '', '=+ bukan operator perbandingan.'], explanation: '>=, <=, !=, ===, !==, <, > adalah pembanding.' },
          { type: 'bug', id: 'l6-3-q5', q: 'Pernyataan ini tidak membandingkan sebagaimana mestinya.', code: 'var x = 5;\nif (x = 5) {\n  console.log("sama");\n}', instruction: 'Baris mana yang keliru?', bugLine: 1, explanation: 'Harusnya x === 5; "x = 5" malah menugaskan nilai.' },
          { type: 'mcq', id: 'l6-3-q6', q: 'Berapa banyak blok cabang yang dijalankan pada satu if/else-if/else?', options: ['Semua yang true', 'Tepat satu', 'Dua', 'Nol'], answer: 1, explanation: 'Cabang pertama yang cocok dijalankan, sisanya dilewati.' }
        ]
      },

      /* 6.4 */
      {
        id: 'l6-4',
        title: 'Mengulang dengan perulangan & menyimpan banyak data di array',
        minutes: 8,
        reading: [
          { type: 'h2', text: 'Array: daftar bernomor' },
          { type: 'p', html: 'Array menampung banyak nilai dalam satu variabel, ditulis dalam kurung siku. Posisi (index) dimulai dari <strong>0</strong>.' },
          { type: 'code', lang: 'js', code: 'var angka = [10, 20, 30];\nconsole.log(angka[0]);      // 10\nconsole.log(angka.length);  // 3\nangka.push(40);             // tambah di akhir' },
          { type: 'h2', text: 'for: jalankan berkali-kali' },
          { type: 'p', html: 'Perulangan <code>for</code> punya tiga bagian: <em>awal</em>, <em>kondisi lanjut</em>, dan <em>langkah</em>.' },
          { type: 'code', lang: 'js', code: 'var total = 0;\nfor (var i = 0; i < angka.length; i++) {\n  total = total + angka[i];\n}\nconsole.log(total); // 100' },
          { type: 'callout', variant: 'warn', title: 'Hati-hati endless loop', html: 'Jika kondisi selalu <code>true</code> (mis. lupa menaikkan <code>i</code>), perulangan tidak pernah berhenti dan halaman membeku. Pola aman: <code>for (var i = 0; i &lt; n; i++)</code>.' }
        ],
        challenge: {
          instructions: [
            'Buat array <code>angka</code> berisi lima elemen: <code>[1, 2, 3, 4, 5]</code>.',
            'Jumlahkan semua isinya memakai <code>for</code>.',
            'Tampilkan totalnya ke <code>#output</code> (jawabannya <code>15</code>).'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<div id="output"></div>\n', js: 'var angka = [1, 2, 3, 4, 5];\nvar total = 0;\n// jumlahkan dengan for, lalu tampilkan total\n' },
          checks: [
            { id: 'arr', type: 'jsGlobal', name: 'angka', desc: 'Array <code>angka</code> dibuat.' },
            { id: 'len', type: 'jsExpr', expr: 'win.angka && win.angka.length === 5', desc: 'Array berisi tepat 5 angka.' },
            { id: 'sum', type: 'text', selector: '#output', equals: '15', desc: '<code>#output</code> menampilkan total <code>15</code>.' }
          ],
          hints: [
            '<code>for (var i = 0; i < angka.length; i++) { total = total + angka[i]; }</code>',
            'Jangan lupa <code>document.getElementById("output").textContent = total;</code>'
          ],
          solution: { html: '<div id="output"></div>\n', js: 'var angka = [1, 2, 3, 4, 5];\nvar total = 0;\nfor (var i = 0; i < angka.length; i++) {\n  total = total + angka[i];\n}\ndocument.getElementById("output").textContent = total;' }
        },
        quiz: [
          { type: 'mcq', id: 'l6-4-q1', q: 'Index elemen PERTAMA pada array adalah…', options: ['1', '0', '-1', 'auto'], answer: 1, explanation: 'Array dihitung mulai dari 0.' },
          { type: 'mcq', id: 'l6-4-q2', q: 'Properti untuk mengetahui jumlah elemen array adalah…', options: ['size', 'count', 'length', 'total'], answer: 2, explanation: 'array.length memberi banyak elemen.' },
          { type: 'fill', id: 'l6-4-q3', q: 'Fungsi untuk menambah item di akhir array.', before: 'angka.______(99);', answerText: ['push'], explanation: 'push menambah elemen di ujung belakang.' },
          { type: 'mcq', id: 'l6-4-q4', q: 'Bagian mana yang BUKAN merupakan komponen for klasik?', options: ['inisialisasi', 'kondisi', 'langkah (increment)', 'penamaan variabel global'], answer: 3, explanation: 'for = init; kondisi; langkah. Penamaan global tidak termasuk.' },
          { type: 'multi', id: 'l6-4-q5', q: 'Akibat lupa menaikkan i pada for (mis. tanpa i++)?', options: ['Loop tak berhenti', 'Halaman bisa membeku', 'Total salah/nol', 'Otomatis berhenti'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Tidak berhenti otomatis—justru macet.'], explanation: 'Kondisi tak pernah salah => endless loop, UI terkunci.' },
          { type: 'order', id: 'l6-4-q6', q: 'Urutan komponen for untuk menjumlah array.', lines: ['var i = 0', 'i < angka.length', 'i++', 'total += angka[i]'], explanation: 'Mulai 0, selama i valid, naikkan i, jumlahkan tiap elemen.' }
        ]
      },

      /* 6.5 */
      {
        id: 'l6-5',
        title: 'Fungsi: blok kode yang bisa dipakai ulang',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Membungkus langkah jadi satu nama' },
          { type: 'p', html: 'Fungsi adalah kumpulan instruksi yang diberi nama dan bisa dipanggil berkali-kali. Ia menerima <em>parameter</em> (bahan masuk) dan bisa <em>mengembalikan</em> nilai lewat <code>return</code>.' },
          { type: 'code', lang: 'js', code: 'function tambah(a, b) {\n  return a + b;\n}\nconsole.log(tambah(2, 3)); // 5' },
          { type: 'list', items: [
            '<code>function</code> — kata kunci pembuat fungsi.',
            '<code>a, b</code> — parameter (nilai masuk).',
            '<code>return</code> — hasil keluar; menghentikan fungsi.',
            'Fungsi tanpa <code>return</code> menghasilkan <code>undefined</code>.'
          ] },
          { type: 'callout', variant: 'note', title: 'Kenapa fungsi penting?', html: 'Fungsi menghindari pengulangan kode (prinsip <em>DRY</em>: Don\'t Repeat Yourself) dan membuat program lebih mudah diuji. Tulis sekali, pakai di mana saja.' }
        ],
        challenge: {
          instructions: [
            'Buat fungsi <code>tambah</code> dengan dua parameter yang <code>return</code> hasil penjumlahan.',
            'Panggil <code>tambah(2, 3)</code> dan tampilkan hasilnya ke <code>#output</code> (jawabannya <code>5</code>).'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<div id="output"></div>\n', js: 'function tambah(a, b) {\n  // kembalikan a + b\n}\ndocument.getElementById("output").textContent = tambah(2, 3);\n' },
          checks: [
            { id: 'fn', type: 'jsExpr', expr: "typeof win.tambah === 'function' && win.tambah(2, 3) === 5", desc: 'Fungsi <code>tambah</code> ada dan <code>tambah(2,3)</code> menghasilkan <code>5</code>.' },
            { id: 'text', type: 'text', selector: '#output', equals: '5', desc: '<code>#output</code> menampilkan <code>5</code>.' }
          ],
          hints: [
            'Isi fungsi: <code>return a + b;</code>',
            'Tanpa <code>return</code>, hasil fungsi adalah undefined.'
          ],
          solution: { html: '<div id="output"></div>\n', js: 'function tambah(a, b) {\n  return a + b;\n}\ndocument.getElementById("output").textContent = tambah(2, 3);' }
        },
        quiz: [
          { type: 'mcq', id: 'l6-5-q1', q: 'Kata kunci untuk mengeluarkan nilai dari fungsi adalah…', options: ['output', 'send', 'return', 'give'], answer: 2, explanation: 'return mengirim nilai keluar dan menghentikan fungsi.' },
          { type: 'mcq', id: 'l6-5-q2', q: 'Nilai yang diterima fungsi saat dipanggil (bahan masuk) disebut…', options: ['return', 'parameter/argumen', 'variabel global', 'loop'], answer: 1, explanation: 'Parameter menampung nilai yang dikirim saat pemanggilan.' },
          { type: 'fill', id: 'l6-5-q3', q: 'Kata kunci pembuat fungsi.', before: '______ sapa() { }', answerText: ['function'], explanation: 'function menandai definisi fungsi.' },
          { type: 'mcq', id: 'l6-5-q4', q: 'Hasil memanggil fungsi yang tidak punya return adalah…', options: ['0', 'null', 'undefined', 'kosong'], answer: 2, explanation: 'Fungsi tanpa return mengembalikan undefined.' },
          { type: 'multi', id: 'l6-5-q5', q: 'Manfaat memakai fungsi:', options: ['menghindari kode berulang', 'mudah dipakai ulang', 'lebih mudah diuji', 'membuat lebih lambat'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Fungsi justru membantu efisiensi perawatan.'], explanation: 'DRY, reusable, testable.' },
          { type: 'bug', id: 'l6-5-q6', q: 'Fungsi ini tidak menghasilkan nilai.', code: 'function kali(a, b) {\n  a * b;\n}\nconsole.log(kali(3, 4));', instruction: 'Baris mana yang perlu diperbaiki?', bugLine: 1, explanation: 'Perlu "return a * b;" agar nilai dikirim keluar.' }
        ]
      },

      /* 6.6 */
      {
        id: 'l6-6',
        title: 'DOM: JavaScript menyentuh halaman',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Object Model dokumen' },
          { type: 'p', html: '<strong>DOM</strong> (<em>Document Object Model</em>) adalah tampilan halaman sebagai objek yang bisa dibaca & diubah JS. Lewat <code>document</code>, kamu memilih elemen lalu mengubah teks, gaya, atau atributnya.' },
          { type: 'code', lang: 'js', code: 'var judul = document.getElementById("judul");\njudul.textContent = "Teks Baru";\njudul.style.color = "red";' },
          { type: 'list', items: [
            '<code>getElementById("x")</code> — ambil satu elemen berdasarkan id.',
            '<code>querySelector(".kelas")</code> — ambil elemen pertama lewat selector CSS.',
            '<code>.textContent</code> — ubah teks di dalamnya.',
            '<code>.style.properti</code> — ubah gaya inline (mis. <code>.style.color</code>).'
          ] },
          { type: 'callout', variant: 'note', title: 'Injeksi vs teks', html: '<code>textContent</code> aman untuk teks biasa. Hindari <code>innerHTML</code> untuk data mentah pengguna karena bisa menyuntupkan HTML/JS berbahaya (XSS).' }
        ],
        challenge: {
          instructions: [
            'Ambil elemen <code>#judul</code> lewat JavaScript.',
            'Ubah teksnya menjadi <code>Teks Baru</code>.',
            'Ganti warna teksnya menjadi <code>red</code> melalui <code>.style</code>.'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<h1 id="judul">Teks Lama</h1>\n', js: 'var el = document.getElementById("judul");\n// ubah teks & warnanya\n' },
          checks: [
            { id: 'text', type: 'text', selector: '#judul', equals: 'Teks Baru', desc: 'Teks <code>#judul</code> menjadi <code>Teks Baru</code>.' },
            { id: 'color', type: 'style', selector: '#judul', prop: 'color', value: 'red', desc: 'Warna teks <code>#judul</code> menjadi <code>red</code>.' }
          ],
          hints: [
            '<code>el.textContent = "Teks Baru";</code>',
            '<code>el.style.color = "red";</code>'
          ],
          solution: { html: '<h1 id="judul">Teks Lama</h1>\n', js: 'var el = document.getElementById("judul");\nel.textContent = "Teks Baru";\nel.style.color = "red";' }
        },
        quiz: [
          { type: 'mcq', id: 'l6-6-q1', q: 'Objek bawaan yang mewakili seluruh dokumen halaman adalah…', options: ['window', 'document', 'page', 'dom'], answer: 1, explanation: 'document adalah pintu masuk ke elemen halaman.' },
          { type: 'mcq', id: 'l6-6-q2', q: 'Memilih satu elemen lewat id memakai…', options: ['querySelector', 'getElementsByName', 'getElementById', 'findById'], answer: 2, explanation: 'getElementById mengembalikan elemen dengan id itu.' },
          { type: 'fill', id: 'l6-6-q3', q: 'Properti untuk mengubah teks sebuah elemen.', before: 'el.______ = "Halo";', answerText: ['textContent'], explanation: 'textContent menyetel teks dalam elemen.' },
          { type: 'mcq', id: 'l6-6-q4', q: 'Mengatur warna latar sebuah elemen lewat JS ditulis…', options: ['el.style.background', 'el.color', 'el.bg', 'el.setStyle(color)'], answer: 0, explanation: 'el.style.backgroundColor / background mengatur latar.' },
          { type: 'multi', id: 'l6-6-q5', q: 'Yang merupakan cara memilih elemen DOM:', options: ['getElementById', 'querySelector', 'querySelectorAll', 'getStyleElement'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Bukan metode pemilihan.'], explanation: 'tiga metode seleksi utama: by id, querySelector(All).' },
          { type: 'mcq', id: 'l6-6-q6', q: 'Bahaya memakai innerHTML dengan data pengguna adalah…', options: ['lebih lambat', 'rentan suntikan XSS', 'tidak didukung', 'menghapus CSS'], answer: 1, explanation: 'innerHTML menyisipkan HTML mentah, bisa dipakai menyuntik skrip jahat.' }
        ]
      },

      /* 6.7 */
      {
        id: 'l6-7',
        title: 'Events: merespons aksi pengguna',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'Menunggu sesuatu terjadi' },
          { type: 'p', html: 'Event adalah "sinyal" bahwa sesuatu terjadi: tombol diklik, input diketik, halaman dimuat. Kita menempelkan <em>listener</em> (fungsi) yang dipanggil saat event itu muncul.' },
          { type: 'code', lang: 'js', code: 'var tombol = document.getElementById("tb");\ntombol.addEventListener("click", function () {\n  document.getElementById("output").textContent = "Halo! Tombol diklik.";\n});' },
          { type: 'list', items: [
            '<code>addEventListener("click", fn)</code> — jalankan <code>fn</code> saat diklik.',
            'Event lain: <code>keydown</code>, <code>input</code>, <code>mouseover</code>, <code>submit</code>.',
            'Fungsi yang dijalankan tadi disebut <em>callback</em> (kode "dipanggil nanti").'
          ] },
          { type: 'callout', variant: 'note', title: 'Deklaratif vs addEventListener', html: 'Kamu mungkin melihat <code>onclick="…"</code> langsung di tag HTML. Lebih baik pakai <code>addEventListener</code> karena memisahkan struktur (HTML) dan logika (JS), serta bisa memasang banyak pendengar.' }
        ],
        challenge: {
          instructions: [
            'Pasang <code>addEventListener("click", …)</code> pada tombol <code>#tb</code>.',
            'Saat diklik, isi <code>#output</code> berubah menjadi teks apa pun (mis. <code>Halo!</code>).'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<button id="tb">Klik aku</button>\n<p id="output"></p>\n', js: 'var tb = document.getElementById("tb");\n// pasang listener click di sini\n' },
          checks: [
            { id: 'btn', type: 'exists', selector: '#tb', desc: 'Tombol <code>#tb</code> ada (sudah disiapkan).' },
            { id: 'out', type: 'exists', selector: '#output', desc: 'Ada <code>#output</code> untuk menampilkan hasil.' },
            { id: 'click', type: 'clickChanges', button: '#tb', target: '#output', desc: 'Mengklik <code>#tb</code> mengubah isi <code>#output</code>.' }
          ],
          hints: [
            '<code>tb.addEventListener("click", function () { ... });</code>',
            'Di dalam callback: <code>document.getElementById("output").textContent = "Halo!";</code>'
          ],
          solution: { html: '<button id="tb">Klik aku</button>\n<p id="output"></p>\n', js: 'var tb = document.getElementById("tb");\ntb.addEventListener("click", function () {\n  document.getElementById("output").textContent = "Halo! Tombol diklik.";\n});' }
        },
        quiz: [
          { type: 'mcq', id: 'l6-7-q1', q: 'Metode untuk memasang reaksi terhadap suatu kejadian adalah…', options: ['attachEvent', 'addEventListener', 'onClick()', 'listenTo'], answer: 1, explanation: 'addEventListener(namaEvent, callback).' },
          { type: 'fill', id: 'l6-7-q2', q: 'Nama event ketika elemen diklik.', before: 'el.addEventListener("______", fn);', answerText: ['click'], explanation: '"click" dipicu saat elemen diklik.' },
          { type: 'mcq', id: 'l6-7-q3', q: 'Fungsi yang diberikan ke addEventListener dan dijalankan nanti disebut…', options: ['variabel', 'callback', 'konstanta', 'loop'], answer: 1, explanation: 'Callback = fungsi yang dipanggil ketika event terjadi.' },
          { type: 'multi', id: 'l6-7-q4', q: 'Event yang nyata ada di browser:', options: ['keydown', 'submit', 'mouseover', 'onHover'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'onHover bukan nama event (pakai mouseover).'], explanation: 'keydown, submit, mouseover adalah event sah.' },
          { type: 'mcq', id: 'l6-7-q5', q: 'Event yang cocok untuk menangkap teks yang sedang diketik di input adalah…', options: ['click', 'input', 'load', 'scroll'], answer: 1, explanation: 'input fires tiap kali nilai input berubah saat mengetik.' },
          { type: 'mcq', id: 'l6-7-q6', q: 'Keutamaan addEventListener dibanding onclick di HTML adalah…', options: ['lebih pendek', 'memisahkan logika & bisa banyak handler', 'wajib', 'lebih cepat'], answer: 1, explanation: 'Separation of concerns dan bisa memasang beberapa listener.' }
        ]
      },

      /* 6.8 mini-project */
      {
        id: 'l6-8',
        title: 'Mini-project: Tombol Penghitung (Counter)',
        minutes: 10,
        reading: [
          { type: 'h2', text: 'Menyatukan semuanya' },
          { type: 'p', html: 'Buat alat penghitung sederhana: dua tombol (<code>+</code> dan <code>−</code>) yang menaikkan/menurunkan angka di layar. Ini menggabungkan variabel, fungsi/event, dan DOM sekaligus.' },
          { type: 'list', ordered: true, items: [
            'Simpan angka awal dalam variabel, mis. <code>var n = 0;</code>.',
            'Ambil elemen penampil <code>#count</code>.',
            'Pasang listener ke <code>#plus</code> (tambah 1) dan <code>#minus</code> (kurang 1).',
            'Setiap klik, perbarui <code>textContent</code> penampil.'
          ] },
          { type: 'callout', variant: 'note', title: 'Pola berpikir', html: 'Ingat alurnya: <em>aksi</em> (klik) → <em>ubah data</em> (n berubah) → <em>tampilkan ulang</em> (textContent). Memisahkan "data" dan "tampilan" adalah inti pemrograman antarmuka modern.' }
        ],
        challenge: {
          instructions: [
            'Siapkan variabel <code>n</code> dengan nilai awal <code>0</code>.',
            'Tombol <code>#plus</code> menaikkan <code>n</code> lalu memperbarui <code>#count</code>.',
            'Tombol <code>#minus</code> menurunkan <code>n</code> lalu memperbarui <code>#count</code>.'
          ],
          tabs: ['html', 'js'],
          starterCode: { html: '<button id="minus">-</button>\n<span id="count">0</span>\n<button id="plus">+</button>\n', js: 'var n = 0;\nvar c = document.getElementById("count");\n// pasang listener #plus dan #minus\n' },
          checks: [
            { id: 'count', type: 'exists', selector: '#count', desc: 'Ada penampil <code>#count</code>.' },
            { id: 'plus', type: 'clickChanges', button: '#plus', target: '#count', desc: 'Mengklik <code>#plus</code> mengubah angka di <code>#count</code>.' },
            { id: 'minus', type: 'clickChanges', button: '#minus', target: '#count', desc: 'Mengklik <code>#minus</code> mengubah angka di <code>#count</code>.' }
          ],
          hints: [
            '<code>document.getElementById("plus").addEventListener("click", function () { n = n + 1; c.textContent = n; });</code>',
            'Ulangi pola yang sama untuk #minus dengan <code>n = n - 1</code>.'
          ],
          solution: { html: '<button id="minus">-</button>\n<span id="count">0</span>\n<button id="plus">+</button>\n', js: 'var n = 0;\nvar c = document.getElementById("count");\ndocument.getElementById("plus").addEventListener("click", function () {\n  n = n + 1;\n  c.textContent = n;\n});\ndocument.getElementById("minus").addEventListener("click", function () {\n  n = n - 1;\n  c.textContent = n;\n});' }
        },
        quiz: [
          { type: 'mcq', id: 'l6-8-q1', q: 'Dalam pola interaktif, langkah yang benar setelah data berubah adalah…', options: ['Muat ulang halaman', 'Perbarui tampilan (textContent)', 'Hapus variabel', 'Tambah CSS'], answer: 1, explanation: 'Ubah data lalu render ulang tampilan dari data itu.' },
          { type: 'multi', id: 'l6-8-q2', q: 'Elemen yang dibutuhkan project counter ini:', options: ['variabel penyimpan angka', 'dua tombol', 'elemen penampil', 'koneksi internet'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'Semua berjalan lokal tanpa server.'], explanation: 'Cukup variabel + tombol + penampil.' },
          { type: 'order', id: 'l6-8-q3', q: 'Urutan logika tombol "+" agar angka bertambah & tampil.', lines: ['n = n + 1', 'c.textContent = n', 'user melihat angka baru'], explanation: 'Ubah data, lalu sinkronkan tampilan.' },
          { type: 'fill', id: 'l6-8-q4', q: 'Perintah menambah 1 pada n secara singkat (shorthand).', before: 'n ____ 1;', answerText: ['+='], explanation: 'n += 1 sama dengan n = n + 1.' },
          { type: 'mcq', id: 'l6-8-q5', q: 'Mengapa kita menyimpan angka di variabel, bukan membaca dari teks?', options: ['Teks terlalu lambat dan rawan; variabel = sumber kebenaran data', 'Variabel otomatis tampil', 'Teks tidak bisa dibaca', 'Karena CSS'], answer: 0, explanation: 'Variabel adalah "single source of truth"; tampilan hanya cerminan.' }
        ]
      }
    ]
  };

  if (global.TutorData && global.TutorData.registerLevel) global.TutorData.registerLevel(LEVEL);
  else (global.__TutorPendingLevels = global.__TutorPendingLevels || []).push(LEVEL);
})(window);
