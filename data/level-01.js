/* =====================================================================
   data/level-01.js — Level 1: Mulai dari Nol
   Format pelajaran:
   {
     id, title, minutes,
     reading: [blok],           // baca
     challenge: { … },           // coba (diisi Tahap 2)
     quiz:    [ … ]              // bank soal, 8 butir (diisi Tahap 2)
   }
   Blok reading yang dikenali engine:
     { type: 'h2'|'h3', text }
     { type: 'p', html }                       — boleh HTML sederhana
     { type: 'list', ordered?, items:[str] }   — item boleh HTML
     { type: 'code', lang, code }
     { type: 'callout', variant, title, html } — variant: 'note' | 'warn'
     { type: 'term', word, meaning }            — inline, dipakai di dalam p? Tidak; blok ini menampilkan kotak istilah.
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVEL = {
    id: 'level-1',
    num: 1,
    title: 'Mulai dari Nol',
    subtitle: 'Benar-benar dari nol. Kamu belum perlu tahu apa pun sebelum membuka ini.',
    lessons: [

      /* ==================== 1.1 ==================== */
      {
        id: 'l1-1',
        title: 'Apa itu website, HTML, dan browser?',
        minutes: 4,
        reading: [
          { type: 'h2', text: 'Mulai dari yang paling dasar' },
          { type: 'p', html: 'Anggap kamu masuk ke sebuah restoran. Kamu duduk, buka menu, dan lihat daftar hidangan yang tertata rapi. <em>Website</em> itu seperti menu restoran itu: kumpulan halaman yang menampilkan informasi, gambar, dan tombol yang bisa kamu klik.' },
          { type: 'p', html: 'Bedanya, menu restoran dicetak oleh tukang cetak, sedangkan halaman website <em>ditulis oleh seseorang menggunakan bahasa khusus</em>. Bahasa itu namanya <span class="term" title="HyperText Markup Language — bahasa untuk menandai struktur sebuah halaman web">HTML</span>.' },

          { type: 'h2', text: 'HTML itu apa, sebenarnya?' },
          { type: 'p', html: 'HTML bukan bahasa pemrograman. HTML adalah <strong>bahasa penanda</strong> (<em>markup</em>). Tugasnya hanya satu: memberi tahu browser "ini judul, ini paragraf, ini gambar, ini tombol". Browser yang membaca tanda-tanda itu lalu menggambar halaman untukmu.' },
          { type: 'p', html: 'Bayangkan kamu menyuruh tukang bangunan: "di sini pasang pintu, di sana pasang jendela, di atas tulis nama pemilik". Kamu tidak menyuruh dia <em>berpikir</em>, kamu hanya <em>menandai</em> apa di mana. HTML persis seperti itu.' },
          { type: 'code', lang: 'html', code: '<h1>Judul halaman</h1>\n<p>Ini satu paragraf biasa.</p>' },
          { type: 'p', html: '<code>&lt;h1&gt;</code> artinya "ini judul tingkat 1". <code>&lt;p&gt;</code> artinya "ini paragraf". Tanda <code>&lt;</code> dan <code>&gt;</code> namanya <strong>tag</strong>. Kebanyakan tag punya pasangan penutup, contoh <code>&lt;/h1&gt;</code> (perhatikan garis miring di depan nama tag).' },

          { type: 'h2', text: 'Kalau browser itu apa?' },
          { type: 'p', html: '<strong>Browser</strong> adalah aplikasi yang membuka website. Chrome, Firefox, Safari, Edge — semuanya browser. Tuganya: mengambil file HTML dari internet (atau dari komputer kamu), membaca tag-tag-nya, lalu menggambar hasilnya di layar. Kamu tidak perlu "melihat" HTML-nya; yang kamu lihat adalah hasil gambarnya.' },
          { type: 'p', html: 'Dan satu istilah terakhir: <strong>server</strong> adalah komputer lain yang <em>mengirim</em> file HTML ke browser-mu. Untuk Tahap 1 kita belum butuh server sungguhan. Kamu cukup menyimpan file di komputer sendiri dan membukanya lewat Chrome.' },

          { type: 'callout', variant: 'note', title: 'Perhatikan!', html: 'Banyak pemula mengira HTML "mengatur warna, animasi, posisi". Bukan. HTML hanya <em>struktur</em>. Warna dan tata letak adalah pekerjaan <strong>CSS</strong>, nanti di Level 3. Perilaku dinamis (tombol yang bereaksi) adalah pekerjaan <strong>JavaScript</strong>, di Level 6.' },

          { type: 'h2', text: 'Ringkasan 10 detik' },
          { type: 'list', items: [
            '<strong>Website</strong> = kumpulan halaman yang bisa dibuka browser.',
            '<strong>HTML</strong> = bahasa penanda untuk menyusun isi halaman.',
            '<strong>Browser</strong> = aplikasi (Chrome/Firefox) yang membaca HTML dan menggambar halaman.',
            '<strong>Tag</strong> = penanda seperti <code>&lt;h1&gt;</code>, umumnya dibuka dan ditutup.'
          ] },
          { type: 'p', html: 'Kamu tidak perlu menghafal. Pelajaran berikutnya, kita akan benar-benar membuat file HTML pertamamu.' }
        ],
        challenge: {
          instructions: [
            'Tulis satu judul memakai <code>&lt;h1&gt;</code>…<code>&lt;/h1&gt;</code> — isinya bebas, misalnya namamu.',
            'Di bawahnya, tulis satu paragraf memakai <code>&lt;p&gt;</code>…<code>&lt;/p&gt;</code>.',
            'Lihat panel pratinjau di kanan: kalau tulisanmu muncul, berarti strukturmu benar.'
          ],
          tabs: ['html'],
          starterCode: { html: '<!-- Tulis kodemu di bawah komentar ini -->\n' },
          checks: [
            { id: 'h1', type: 'exists', selector: 'h1', label: 'sebuah <h1>', desc: 'Ada satu elemen <code>&lt;h1&gt;</code> (judul).' },
            { id: 'h1text', type: 'text', selector: 'h1', desc: 'Elemen <code>&lt;h1&gt;</code> punya isi teks (tidak kosong).' },
            { id: 'p', type: 'exists', selector: 'p', label: 'sebuah <p>', desc: 'Ada satu elemen <code>&lt;p&gt;</code> (paragraf).' },
            { id: 'ptext', type: 'text', selector: 'p', desc: 'Paragraf <code>&lt;p&gt;</code> punya isi teks.' }
          ],
          hints: [
            'Tag umumnya sepasang: pembuka <code>&lt;h1&gt;</code> dan penutup <code>&lt;/h1&gt;</code>.',
            'Tag penutup ditandai garis miring, contoh <code>&lt;/p&gt;</code>. Jangan sampai lupa.'
          ],
          solution: { html: '<h1>Halo, aku Belajar HTML</h1>\n<p>Ini adalah paragraf pertamaku.</p>' }
        },
        quiz: [
          { type: 'mcq', id: 'l1-1-q1', q: 'HTML paling tepat disebut…', options: ['Bahasa pemrograman', 'Bahasa penanda (markup)', 'Aplikasi browser', 'Server web'], answer: 1, explanation: 'HTML bukan bahasa pemrograman. Ia menandai struktur isi (judul, paragraf, gambar), lalu browser yang menggambar.', hint: 'Tugasnya memberi tahu browser “ini judul, ini paragraf”.' },
          { type: 'mcq', id: 'l1-1-q2', q: 'Apa tugas utama browser?', options: ['Menulis file HTML', 'Membaca HTML lalu menggambar halaman', 'Menyimpan data ke server', 'Mengompilasi kode program'], answer: 1, explanation: 'Browser mengambil file HTML, membaca tag-tag-nya, lalu merender jadi halaman yang kamu lihat.' },
          { type: 'multi', id: 'l1-1-q3', q: 'Manakah yang termasuk browser? (pilih semua yang benar)', options: ['Chrome', 'Firefox', 'VS Code', 'Edge', 'Photoshop'], answer: [0, 1, 3], wrongWhy: ['', '', 'VS Code adalah editor untuk menulis kode, bukan browser.', '', 'Photoshop aplikasi desain gambar, bukan browser.'], explanation: 'Chrome, Firefox, dan Edge sama-sama browser. VS Code editor, Photoshop aplikasi desain.', hint: 'Browser = aplikasi yang membuka website.' },
          { type: 'fill', id: 'l1-1-q4', q: 'Isi bagian yang kosong.', before: 'Tag penutup <h1> ditulis dengan tanda', after: 'di depan nama tag.', codeContext: '<h1>Halo</h1>', answerText: ['garis miring', 'miring', 'slash', '/'], explanation: 'Tanda garis miring (/) menandakan tag penutup: </h1>.', hint: 'Lihat contoh: ada satu karakter tambahan sebelum “h1”.' },
          { type: 'order', id: 'l1-1-q5', q: 'Urutkan alur kerja seorang web developer dari paling awal.', lines: ['Menulis kode di editor', 'Menyimpan file dengan Ctrl+S', 'Membuka file .html di browser'], explanation: 'Tiga langkah abadi: tulis → simpan → lihat di browser.' },
          { type: 'bug', id: 'l1-1-q6', q: 'Ada tag yang belum ditutup.', code: '<h1>Selamat Datang\n<p>Ini paragraf.</p>', instruction: 'Klik baris yang tag-nya belum ditutup.', bugLine: 0, explanation: 'Baris 1 membuka <h1> tetapi tidak pernah menutupnya dengan </h1>.', hint: 'Cari tag pembuka yang tidak punya pasangan penutup.' },
          { type: 'mcq', id: 'l1-1-q7', q: 'Manakah penulisan elemen paragraf yang benar?', options: ['<p>Halo</p>', '<p>Halo<p/>', '</p>Halo</p>', '<p>Halo'], answer: 0, explanation: 'Pola yang benar: tag pembuka, isi, lalu tag penutup dengan garis miring.' },
          { type: 'mcq', id: 'l1-1-q8', q: 'Tag berikut yang TIDAK memerlukan penutup adalah…', options: ['<p>', '<div>', '<br>', '<h1>'], answer: 2, explanation: '<br> adalah void tag (menyisip baris baru), tidak punya pasangan penutup.' }
        ]
      },

      /* ==================== 1.2 ==================== */
      {
        id: 'l1-2',
        title: 'Menyiapkan alat: Chrome, editor, dan file .html',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Kamu hanya butuh dua hal' },
          { type: 'list', items: [
            '<strong>Browser</strong> — pakai Google Chrome. Kalau belum punya, unduh di <a href="https://www.google.com/chrome/" target="_blank" rel="noopener">google.com/chrome</a>.',
            '<strong>Editor teks</strong> — tempat kamu mengetik HTML. Bisa VS Code (disarankan, gratis) atau Notepad bawaan Windows / TextEdit di Mac.'
          ] },

          { type: 'h2', text: 'Cara memasang VS Code (opsional tapi disarankan)' },
          { type: 'list', ordered: true, items: [
            'Buka <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">code.visualstudio.com</a>, klik <strong>Download for Windows</strong> (atau macOS).',
            'Jalankan installer, klik <em>Next</em> terus sampai selesai. Tidak ada pilihan khusus yang perlu diubah.',
            'Setelah terbuka, klik menu <strong>File → Open Folder…</strong>, pilih (atau buat) folder baru di <em>Dokumen</em> misalnya <code>tutor-html</code>.'
          ] },
          { type: 'p', html: 'Kenapa VS Code lebih nyaman? Karena ia memberi warna pada tag, menampilkan nomor baris, dan mengingatkan saat kamu lupa menutup tag. Notepad bisa, tapi seperti menulis esai dengan pulpen yang tintanya habis.' },

          { type: 'h2', text: 'Membuat file .html pertama' },
          { type: 'list', ordered: true, items: [
            'Di VS Code: klik <strong>File → New File</strong>, lalu simpan dengan <code>Ctrl + S</code>.',
            'Pada kotak nama file, ketik: <code>belajar.html</code> (akhiran <code>.html</code> <em>wajib</em>).',
            'Pilih folder <code>tutor-html</code> tadi, klik <strong>Simpan</strong>.',
            'Buka <em>Windows Explorer</em>, masuk ke folder itu, <strong>klik kanan → Open with → Google Chrome</strong>. Alternatif: klik dua kali kalau Chrome sudah jadi browser default.'
          ] },
          { type: 'p', html: 'Selamat, kamu baru saja menjalankan workflow seorang web developer: <em>tulis → simpan → buka di browser</em>. Semua yang kita lakukan nanti hanya mengulang tiga langkah itu.' },

          { type: 'callout', variant: 'warn', title: 'Ekstensi file tidak kelihatan?', html: 'Windows sering menyembunyikan akhiran <code>.html</code>, <code>.txt</code>, <code>.jpg</code>. Akibatnya, saat kamu menyimpan "belajar.html", file yang sebenarnya bernama <code>belajar.html.txt</code>. Solusinya: buka <strong>File Explorer</strong> → tab <strong>View</strong> → centang <strong>File name extensions</strong>. Di macOS: <em>Finder → Preferences → Advanced → Show all filename extensions</em>.' },

          { type: 'h2', text: 'Kalau mau pakai Notepad saja' },
          { type: 'list', ordered: true, items: [
            'Buka Notepad (tekan <kbd>Windows</kbd>, ketik "Notepad", Enter).',
            'Ketik satu kata saja dulu: <code>Hello</code>.',
            '<kbd>Ctrl + S</kbd>, di kotak <strong>Save as type</strong> pilih <strong>All Files (*.*)</strong>, lalu di kotak nama ketik <code>belajar.html</code>.',
            'Simpan di folder yang mudah ditemukan (mis. Desktop). Buka file itu dengan klik ganda.'
          ] },
          { type: 'p', html: 'Penting: jangan lupa pilih <em>All Files</em> saat pakai Notepad. Kalau tidak, Windows akan menambahkan <code>.txt</code> di belakang, dan browser tidak akan mengenali file itu sebagai halaman web.' },

          { type: 'callout', variant: 'note', title: 'Tips kecil', html: 'Buat satu kebiasaan: simpan file dengan <code>Ctrl + S</code> setiap ~30 detik sekali. Browser tidak menampilkan perubahan sebelum kamu menyimpan. Banyak pemula frustrasi karena "kok tidak berubah" — padahal belum di-save.' }
        ],
        challenge: {
          instructions: [
            'Anggap editor di bawah ini adalah file <code>belajar.html</code>-mu.',
            'Buat satu <code>&lt;h1&gt;</code> berisi namamu lengkap.',
            'Buat satu <code>&lt;p&gt;</code> yang menyebut editor/browser yang kamu pakai (mis. “Saya pakai VS Code dan Chrome”).'
          ],
          tabs: ['html'],
          starterCode: { html: '<!-- Ini “file” belajarmu. Tulis di bawah. -->\n' },
          checks: [
            { id: 'h1', type: 'exists', selector: 'h1', label: 'sebuah <h1>', desc: 'Ada elemen <code>&lt;h1&gt;</code> berisi namamu.' },
            { id: 'h1text', type: 'text', selector: 'h1', desc: '<code>&lt;h1&gt;</code> tidak kosong.' },
            { id: 'p', type: 'exists', selector: 'p', label: 'sebuah <p>', desc: 'Ada elemen <code>&lt;p&gt;</code> tentang alat yang kamu pakai.' },
            { id: 'ptext', type: 'text', selector: 'p', desc: '<code>&lt;p&gt;</code> punya isi teks.' }
          ],
          hints: [
            'Sama seperti pelajaran sebelumnya: <code>&lt;h1&gt;</code> lalu <code>&lt;/h1&gt;</code>.',
            'Tidak ada salahnya menekan tombol “▶ Jalankan” untuk menyegarkan pratinjau.'
          ],
          solution: { html: '<h1>Rani Amelia</h1>\n<p>Saya belajar memakai VS Code dan Google Chrome.</p>' }
        },
        quiz: [
          { type: 'mcq', id: 'l1-2-q1', q: 'Agar dikenali browser sebagai halaman web, file harus disimpan dengan akhiran…', options: ['.txt', '.html', '.jpg', '.code'], answer: 1, explanation: 'Akhiran .html memberi tahu sistem dan browser bahwa isinya dokumen HTML.' },
          { type: 'mcq', id: 'l1-2-q2', q: 'Apa kelebihan editor seperti VS Code dibanding Notepad?', options: ['Otomatis mengunggah ke internet', 'Pewarnaan sintaks & nomor baris', 'Bisa membuat gambar', 'Berfungsi sebagai server'], answer: 1, explanation: 'Editor kode memberi warna pada tag, nomor baris, dan peringatan saat tag belum ditutup.' },
          { type: 'mcq', id: 'l1-2-q3', q: 'Kamu menyimpan “belajar.html” di Notepad, tapi filenya jadi “belajar.html.txt”. Penyebab paling mungkin?', options: ['Chrome belum dibuka ulang', 'Windows menyembunyikan akhiran file & tipe simpan masih Text Documents', 'VS Code sedang error', 'Koneksi internet putus'], answer: 1, explanation: 'Notepad menambahkan .txt bila tipe masih “Text Documents” dan Windows menyembunyikan ekstensi. Pilih All Files (*) dan aktifkan “File name extensions”.' },
          { type: 'multi', id: 'l1-2-q4', q: 'Manakah langkah yang benar saat menyimpan halaman web dari Notepad?', options: ['Pilih Save as type: All Files (*.*)', 'Ketik nama belajar.html', 'Biarkan tipe tetap Text Documents', 'Simpan lalu buka file dengan Chrome'], answer: [0, 1, 3], wrongWhy: ['', '', 'Kalau tipe dibiarkan Text Documents, file menjadi .html.txt dan tidak dikenali HTML.', ''], explanation: 'Pilih All Files, beri nama dengan .html, lalu buka di browser.', hint: 'Yang penting file benar-benar berakhir dengan .html.' },
          { type: 'fill', id: 'l1-2-q5', q: 'Lengkapi.', before: 'Setelah menyimpan, kita melihat hasil lewat aplikasi bernama', after: '.', answerText: ['browser', 'chrome', 'firefox'], explanation: 'Browser (Chrome/Firefox) yang membuka file HTML.' },
          { type: 'order', id: 'l1-2-q6', q: 'Urutkan tiga langkah workflow developer.', lines: ['Menulis kode di editor', 'Menyimpan file', 'Melihat hasil di browser'], explanation: 'Tulis → simpan → lihat. Diulang terus sepanjang kursus ini.' }
        ]
      },

      /* ==================== 1.3 ==================== */
      {
        id: 'l1-3',
        title: 'HELLO WORLD: tulisan pertamamu',
        minutes: 5,
        reading: [
          { type: 'h2', text: 'Satu baris saja' },
          { type: 'p', html: 'Semua programmer di planet ini memulai dengan hal yang sama: membuat tulisan <em>Hello World</em> muncul di layar. Kita akan lakukan itu. Serius, cuma satu baris.' },
          { type: 'code', lang: 'html', code: '<h1>Hello World</h1>' },
          { type: 'p', html: 'Itu saja. Tag <code>&lt;h1&gt;</code> menandai "ini judul besar", dan teks <code>Hello World</code> adalah isi judulnya. Garis miring di <code>&lt;/h1&gt;</code> menutup tag tadi.' },

          { type: 'h2', text: 'Langkah lengkap, tidak ada yang dilewat' },
          { type: 'list', ordered: true, items: [
            'Buka VS Code (atau Notepad). File → New File.',
            'Ketik persis: <code>&lt;h1&gt;Hello World&lt;/h1&gt;</code>',
            '<kbd>Ctrl + S</kbd>. Nama file: <code>hello.html</code>. Simpan di folder <code>tutor-html</code>.',
            'Buka folder itu di Windows Explorer, klik dua kali <code>hello.html</code>.',
            'Chrome terbuka, menampilkan <strong>Hello World</strong> dengan huruf besar dan tebal.'
          ] },

          { type: 'callout', variant: 'note', title: 'Kamu berhasil!', html: 'Kalau tulisan Hello World muncul di Chrome, kamu <em>secara teknis</em> sudah membuat website. Belum ada server, belum ada domain, tapi browser-mu sudah membaca file HTML yang kamu tulis sendiri. Itu persis cara kerja semua website di dunia — hanya lebih besar.' },

          { type: 'h2', text: 'Kalau tidak muncul, cek ini dulu' },
          { type: 'list', items: [
            'Apakah file benar-benar bernama <code>hello.html</code>, bukan <code>hello.html.txt</code>? Cek di Explorer, aktifkan "File name extensions".',
            'Apakah kamu sudah <kbd>Ctrl + S</kbd> setelah mengetik? Browser membaca file tersimpan, bukan apa yang ada di editor.',
            'Coba buka ulang: tutup tab Chrome, klik dua kali lagi file-nya.'
          ] },

          { type: 'p', html: 'Di Tahap 2 nanti, kamu akan mengetik kode ini lagi — tapi di dalam editor interaktif langsung di website ini, jadi kamu bisa lihat hasilnya tanpa pindah jendela. Untuk sekarang, lakukan sungguhan dulu. Rasa memiliki dari "ini file-ku sendiri" tidak tergantikan.' }
        ],
        challenge: {
          instructions: [
            'Buat tradisi semua programmer: tampilkan tulisan <code>Hello World</code>.',
            'Tulis di dalam sebuah <code>&lt;h1&gt;</code>, persis: <code>Hello World</code>.',
            'Pastikan pratinjau menampilkan “Hello World” dengan huruf besar dan tebal.'
          ],
          tabs: ['html'],
          starterCode: { html: '<h1></h1>\n' },
          checks: [
            { id: 'h1', type: 'exists', selector: 'h1', label: 'sebuah <h1>', desc: 'Ada elemen <code>&lt;h1&gt;</code>.' },
            { id: 'hw', type: 'text', selector: 'h1', contains: 'Hello World', desc: 'Isi <code>&lt;h1&gt;</code> menampilkan teks “Hello World”.' }
          ],
          hints: [
            'Teks ditulis DI ANTARA tag: <code>&lt;h1&gt;Hello World&lt;/h1&gt;</code>.',
            'Perhatikan huruf besar pada H dan W, dan satu spasi di antaranya.'
          ],
          solution: { html: '<h1>Hello World</h1>' }
        },
        quiz: [
          { type: 'mcq', id: 'l1-3-q1', q: 'Pada <h1>Hello World</h1>, bagian “Hello World” disebut…', options: ['Isi (content) elemen', 'Tag pembuka', 'Atribut', 'Dokumen'], answer: 0, explanation: 'Teks di antara tag pembuka dan penutup adalah isi (content) dari elemen.' },
          { type: 'bug', id: 'l1-3-q2', q: 'Ada salah ketik pada kode ini.', code: '<<h1>Hello World</h1>\n<p>Rapi, bukan?</p>', instruction: 'Klik baris yang mengandung tanda salah ketiknya.', bugLine: 0, explanation: 'Baris 1 menulis “<<h1>” dengan kurung sudut ganda. Cukup satu <h1>.', hint: 'Hitung tanda < di awal baris pertama.' },
          { type: 'fill', id: 'l1-3-q3', q: 'Lengkapi penutupnya.', before: 'Untuk menutup tag h1 kamu menulis </', after: '>', answerText: ['h1'], explanation: 'Penutup <h1> adalah </h1>.', hint: 'Sama persis dengan nama tag pembukanya.' },
          { type: 'mcq', id: 'l1-3-q4', q: 'Kamu sudah mengetik <h1> tapi pratinjau Chrome tidak berubah. Penyebab paling umum?', options: ['Keburu menekan Ctrl+S', 'Belum menyimpan file, atau nama file salah (.html.txt)', 'Chrome Crash', 'Layar terlalu kecil'], answer: 1, explanation: 'Browser membaca file yang tersimpan. Kalau belum Ctrl+S atau ekstensi salah, perubahan tak akan terlihat.' },
          { type: 'mcq', id: 'l1-3-q5', q: 'Kata “markup” dalam “markup language” artinya…', options: ['Menandai bagian-bagian isi dengan tag', 'Menggambar grafik', 'Menghitung angka', 'Mengirim email'], answer: 0, explanation: 'Markup = menandai (memberi tanda) struktur: ini judul, ini paragraf.' },
          { type: 'order', id: 'l1-3-q6', q: 'Susun potongan berikut menjadi elemen paragraf yang utuh.', lines: ['<p>', 'Halo', '</p>'], explanation: 'Urutan sebuah elemen: tag pembuka, isi, tag penutup.' }
        ]
      },

      /* ==================== 1.4 ==================== */
      {
        id: 'l1-4',
        title: 'Kerangka dasar halaman: DOCTYPE, html, head, body',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Kenapa perlu kerangka' },
          { type: 'p', html: 'Kalau kamu hanya menulis <code>&lt;h1&gt;Hello&lt;/h1&gt;</code>, browser masih bisa menampilkannya — tapi ia harus "menebak" banyak hal. Halaman sungguhan punya kerangka resmi supaya semua browser menafsirkan sama. Kerangka itu terdiri dari empat bagian: <strong>DOCTYPE</strong>, <strong>&lt;html&gt;</strong>, <strong>&lt;head&gt;</strong>, dan <strong>&lt;body&gt;</strong>.' },

          { type: 'code', lang: 'html', code: '<!DOCTYPE html>\n<html lang="id">\n  <head>\n    <meta charset="UTF-8">\n    <title>Halaman Pertamaku</title>\n  </head>\n  <body>\n    <h1>Halo, dunia!</h1>\n    <p>Ini paragraf pertama saya.</p>\n  </body>\n</html>' },

          { type: 'h2', text: 'Baris demi baris' },
          { type: 'list', items: [
            '<code>&lt;!DOCTYPE html&gt;</code> — kalimat pembuka yang memberi tahu browser "ini HTML modern". Tidak ada penutup. Tulis persis seperti ini, huruf besar kecil boleh campuran tapi konvensinya kapital.',
            '<code>&lt;html lang="id"&gt;</code> — elemen pembungkus seluruh halaman. Atribut <code>lang="id"</code> berarti isi halaman dalam Bahasa Indonesia (penting untuk penerjemah layar dan Google).',
            '<code>&lt;head&gt;…&lt;/head&gt;</code> — isi halaman yang <em>tidak</em> kamu lihat: judul tab, karakter yang dipakai, dsb.',
            '<code>&lt;meta charset="UTF-8"&gt;</code> — memastikan huruf beraksen (é, ñ, ü) tampil benar.',
            '<code>&lt;title&gt;…&lt;/title&gt;</code> — teks yang muncul di <em>tab</em> browser, bukan di badan halaman.',
            '<code>&lt;body&gt;…&lt;/body&gt;</code> — semua yang terlihat pengguna: tulisan, gambar, tombol.'
          ] },

          { type: 'callout', variant: 'warn', title: 'Kesalahan umum pemula', html: 'Lupa menutup <code>&lt;/body&gt;</code> atau <code>&lt;/html&gt;</code>. Kadang browser masih bisa menampilkannya dengan benar karena ia "maafkan", tapi kamu akan pusing nanti saat halaman bertambah besar. Biasakan menulis kerangka ini <em>dulu</em>, baru isi.' },

          { type: 'h2', text: 'Analogi: rumah' },
          { type: 'p', html: '<code>&lt;html&gt;</code> adalah fondasi rumah. <code>&lt;head&gt;</code> adalah surat-surat di laci (tidak terlihat dari luar, tapi wajib). <code>&lt;body&gt;</code> adalah ruangan-ruangan yang bisa dimasuki tamu. Kalau kamu tamu, kamu akan melihat <em>body</em>; kalau kurir, yang ia baca adalah <em>head</em>.' },

          { type: 'p', html: 'Di pelajaran berikutnya kita akan mengisi <em>body</em> dengan berbagai jenis teks: judul, sub-judul, paragraf, dan pemisah.' }
        ],
        challenge: {
          instructions: [
            'Pratinjau di sini sudah menyediakan kerangka (DOCTYPE, html, head, body) secara otomatis. Tugasmu mengisi <strong>body</strong>.',
            'Buat <em>tepat satu</em> <code>&lt;h1&gt;</code> sebagai judul utama.',
            'Buat minimal satu <code>&lt;h2&gt;</code> sebagai sub-bagian.',
            'Buat minimal dua <code>&lt;p&gt;</code> sebagai isi.'
          ],
          tabs: ['html'],
          starterCode: { html: '<!-- Body halamanmu: isi judul & paragraf di sini -->\n<h1>Halaman Pertamaku</h1>\n' },
          checks: [
            { id: 'oneh1', type: 'count', selector: 'h1', min: 1, max: 1, label: 'tepat satu <h1>', desc: 'Ada tepat satu <code>&lt;h1&gt;</code> sebagai judul utama.' },
            { id: 'h2', type: 'exists', selector: 'h2', label: 'sebuah <h2>', desc: 'Ada minimal satu <code>&lt;h2&gt;</code>.' },
            { id: 'twoP', type: 'count', selector: 'p', min: 2, label: 'dua <p>', desc: 'Ada minimal dua paragraf <code>&lt;p&gt;</code>.' }
          ],
          hints: [
            'Judul besar satu saja: <code>&lt;h1&gt;</code>. Bagian di bawahnya pakai <code>&lt;h2&gt;</code>.',
            'Setiap <code>&lt;p&gt;</code> harus ditutup <code>&lt;/p&gt;</code>.'
          ],
          solution: { html: '<h1>Halaman Pertamaku</h1>\n<h2>Tentang Saya</h2>\n<p>Halo, saya sedang belajar HTML.</p>\n<p>Semoga belajarnya menyenangkan!</p>' }
        },
        quiz: [
          { type: 'mcq', id: 'l1-4-q1', q: 'Apa fungsi <code><!DOCTYPE html></code>?', options: ['Memberi tahu browser ini dokumen HTML modern', 'Menulis judul tab', 'Mengatur warna latar', 'Menutup body'], answer: 0, explanation: 'DOCTYPE baris pertama yang menandai bahwa file memakai HTML standar.' },
          { type: 'mcq', id: 'l1-4-q2', q: 'Isi tag <code><title></code> akan muncul di…', options: ['Badan halaman', 'Tab browser', 'Console', 'Footer'], answer: 1, explanation: '<title> menampilkan teks pada tab browser, bukan di badan halaman.' },
          { type: 'order', id: 'l1-4-q3', q: 'Urutkan dari pembungkus terluar ke bagian yang tampil.', lines: ['<html>', '<head>', '<body>'], explanation: '<html> memuat segalanya; <head> isi tak terlihat; <body> yang tampil.' },
          { type: 'multi', id: 'l1-4-q4', q: 'Yang seharusnya berada di dalam <code><head></code> adalah…', options: ['<title>', '<meta charset>', '<h1>', '<p>'], answer: [0, 1], wrongWhy: ['', '', '<h1> bagian isi, berada di body.', '<p> juga berada di body.'], explanation: 'Head berisi metadata (title, charset). Konten terlihat seperti h1/p berada di body.' },
          { type: 'fill', id: 'l1-4-q5', q: 'Lengkapi atributnya.', codeContext: '<html ____="id">', before: 'Atribut untuk menandakan halaman berbahasa Indonesia bernama', after: '', answerText: ['lang'], explanation: 'Atribut lang="id" menandai bahasa halaman.', hint: 'Tiga huruf, artinya “bahasa”.' },
          { type: 'mcq', id: 'l1-4-q6', q: 'Kegunaan <code><meta charset="UTF-8"></code> adalah…', options: ['Menjamin huruf beraksen (é, ü) tampil benar', 'Menambah warna', 'Membuat animasi', 'Menyambung ke internet'], answer: 0, explanation: 'UTF-8 adalah set karakter universal agar huruf khusus tidak rusak.' }
        ]
      },

      /* ==================== 1.5 ==================== */
      {
        id: 'l1-5',
        title: 'Judul dan paragraf: h1–h6, p, br, hr',
        minutes: 5,
        reading: [
          { type: 'h2', text: 'Enam tingkat judul' },
          { type: 'p', html: 'HTML punya enam tingkat judul, dari <code>&lt;h1&gt;</code> paling penting sampai <code>&lt;h6&gt;</code> paling kecil. Ini <em>bukan</em> soal ukuran huruf — itu urusan CSS. Ini soal <strong>struktur</strong>, supaya pembaca layar dan mesin pencari paham bagian mana judul utama, bagian mana sub-bagian.' },
          { type: 'code', lang: 'html', code: '<h1>Judul Utama Halaman</h1>\n<h2>Bagian Besar</h2>\n<h3>Sub-bagian</h3>\n<h4>Sdetail lagi</h4>\n<h5>Catatan kecil</h5>\n<h6>Teks paling halus</h6>' },

          { type: 'callout', variant: 'note', title: 'Aturan tak tertulis', html: 'Dalam satu halaman, gunakan <strong>tepat satu</strong> <code>&lt;h1&gt;</code>. Lalu <code>&lt;h2&gt;</code> untuk bagian besar, dan <code>&lt;h3&gt;</code> di dalam sebuah <code>&lt;h2&gt;</code>. Jangan lompat: h1 → h3 langsung itu dianggap kasar secara struktur.' },

          { type: 'h2', text: 'Paragraf, baris baru, dan pemisah' },
          { type: 'code', lang: 'html', code: '<p>Ini paragraf pertama. Paragraf punya jarak otomatis di atas dan bawah.</p>\n<p>Dan ini paragraf kedua.</p>\n\n<p>Baris pertama.<br>Baris kedua masih di paragraf yang sama.</p>\n\n<hr>\n<p>Garis di atas adalah horizontal rule, pemisah visual antar bagian.</p>' },
          { type: 'list', items: [
            '<code>&lt;p&gt;</code> — paragraf. Punya penutup <code>&lt;/p&gt;</code>, tapi HTML modern kadang membolehkan lupa; biasakan tulis penutupnya.',
            '<code>&lt;br&gt;</code> — pindah baris <em>tanpa</em> memulai paragraf baru. Tidak punya penutup karena memang bukan elemen pembungkus.',
            '<code>&lt;hr&gt;</code> — garis horizontal penanda perpindahan topik. Sama, tidak punya penutup.'
          ] },

          { type: 'callout', variant: 'warn', title: 'Jangan pakai br untuk menata jarak', html: 'Banyak pemula menumpuk <code>&lt;br&gt;&lt;br&gt;&lt;br&gt;</code> untuk memberi jarak antar bagian. Itu bekerja, tapi salah. Jarak adalah urusan <strong>CSS</strong> (nanti di Level 3, properti <code>margin</code>). Untuk sekarang, <em>br</em> hanya dipakai untuk hal yang memang butuh baris baru: puisi, alamat, dialog.' },

          { type: 'h2', text: 'Kerangka lengkap dengan isi' },
          { type: 'code', lang: 'html', code: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <title>Resep Nasi Goreng</title>\n</head>\n<body>\n  <h1>Nasi Goreng Rumahan</h1>\n  <p>Hobi masak? Resep ini cepat dan murah.</p>\n\n  <h2>Bahan</h2>\n  <p>Nasi putih, bawang, telur, kecap.</p>\n\n  <hr>\n\n  <h2>Langkah</h2>\n  <p>Tumis bawang, masukkan telur, nasi, kecap.</p>\n</body>\n</html>' },

          { type: 'p', html: 'Simpan sebagai <code>resep.html</code>, buka di Chrome. Selamat — kamu sudah punya halaman web pertama yang <em>terstruktur benar</em>. Level 1 selesai. Di Level 2, kita tambahkan daftar, link, gambar, dan tabel.' }
        ],
        challenge: {
          instructions: [
            'Buat halaman “resep” sederhana dengan struktur yang rapi.',
            'Mulai dengan satu <code>&lt;h1&gt;</code> sebagai nama resep.',
            'Tambahkan <code>&lt;h2&gt;</code> lalu <code>&lt;h3&gt;</code> di bawahnya (jangan melompat tingkat).',
            'Sisipkan sebuah <code>&lt;hr&gt;</code> sebagai pemisah antar bagian.'
          ],
          tabs: ['html'],
          starterCode: { html: '<h1>Nasi Goreng</h1>\n' },
          checks: [
            { id: 'oneh1', type: 'count', selector: 'h1', min: 1, max: 1, desc: 'Ada tepat satu <code>&lt;h1&gt;</code>.' },
            { id: 'h2', type: 'exists', selector: 'h2', label: 'sebuah <h2>', desc: 'Ada <code>&lt;h2&gt;</code> untuk bagian besar.' },
            { id: 'h3', type: 'exists', selector: 'h3', label: 'sebuah <h3>', desc: 'Ada <code>&lt;h3&gt;</code> untuk sub-bagian.' },
            { id: 'hr', type: 'exists', selector: 'hr', label: 'sebuah <hr>', desc: 'Ada garis pemisah <code>&lt;hr&gt;</code>.' }
          ],
          hints: [
            'Urutan halus: <code>&lt;h1&gt;</code> → <code>&lt;h2&gt;</code> → <code>&lt;h3&gt;</code>, tanpa melompat.',
            '<code>&lt;hr&gt;</code> tidak butuh penutup; tulis saja <code>&lt;hr&gt;</code>.'
          ],
          solution: { html: '<h1>Nasi Goreng Rumahan</h1>\n<h2>Bahan</h2>\n<h3>Bahan Utama</h3>\n<p>Nasi, bawang, telur, kecap.</p>\n<hr>\n<h2>Langkah</h2>\n<p>Tumis bawang, masukkan telur, nasi, dan kecap.</p>' }
        },
        quiz: [
          { type: 'mcq', id: 'l1-5-q1', q: 'Dalam satu halaman, jumlah <code><h1></code> yang disarankan adalah…', options: ['Tepat satu', 'Sebanyak mungkin', 'Minimal tiga', 'Tidak boleh ada'], answer: 0, explanation: 'Satu <h1> sebagai judul utama membuat struktur mudah dipahami pembaca layar & Google.' },
          { type: 'bug', id: 'l1-5-q2', q: 'Ada lompatan tingkat judul yang kurang baik.', code: '<h1>Judul Utama</h1>\n<h3>Sub bagian</h3>\n<p>Teks</p>', instruction: 'Klik baris yang melompat tingkat judul.', bugLine: 1, explanation: 'Setelah <h1> seharusnya <h2> dulu; melompat langsung ke <h3> dianggap kasar secara struktur.', hint: 'Perhatikan angka pada h1 lalu h3.' },
          { type: 'mcq', id: 'l1-5-q3', q: 'Kapan <code><br></code> sebaiknya dipakai?', options: ['Memberi jarak antar bagian besar', 'Baris baru dalam puisi/alamat/dialog', 'Membuat paragraf baru', 'Mengganti warna teks'], answer: 1, explanation: '<br> untuk baris baru dalam satu blok teks. Jarak antar bagian adalah urusan CSS (margin).' },
          { type: 'multi', id: 'l1-5-q4', q: 'Mana yang termasuk void tag (tanpa penutup)?', options: ['<br>', '<hr>', '<p>', '<img>', '<h1>'], answer: [0, 1, 3], wrongWhy: ['', '', '<p> wajib ditutup dengan </p>.', '', '<h1> wajib ditutup dengan </h1>.'], explanation: '<br>, <hr>, dan <img> tidak memiliki pasangan penutup.' },
          { type: 'fill', id: 'l1-5-q5', q: 'Lengkapi.', before: 'Garis horizontal pemisah bagian memakai tag', after: '', answerText: ['hr', '<hr>'], explanation: '<hr> membuat garis pemisah horizontal.', hint: 'Singkatan dari “horizontal rule”.' },
          { type: 'order', id: 'l1-5-q6', q: 'Urutkan heading dari yang paling penting.', lines: ['<h1>', '<h2>', '<h3>'], explanation: 'Angka makin kecil = makin penting. h1 paling utama.' }
        ]
      }
    ]
  };

  if (global.TutorData && global.TutorData.registerLevel) global.TutorData.registerLevel(LEVEL);
  else (global.__TutorPendingLevels = global.__TutorPendingLevels || []).push(LEVEL);
})(window);
