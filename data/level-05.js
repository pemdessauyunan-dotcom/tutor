/* =====================================================================
   data/level-05.js — Level 5: Menerima Input dari Pengguna (Form)
   Struktur form + label, jenis-jenis input, validasi bawaan, lalu
   mini-project: formulir pendaftaran.
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVEL = {
    id: 'level-5',
    num: 5,
    title: 'Formulir & Input',
    subtitle: 'Tempat pengguna mengetik, memilih, dan mengirim data — dengan label yang aksesibel.',
    lessons: [

      /* 5.1 */
      {
        id: 'l5-1',
        title: 'Anatomi form: input, label, dan button',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Wadah pengumpul data' },
          { type: 'p', html: '<code>&lt;form&gt;</code> adalah wadah yang mengelompokkan kolom isian dan tombol kirim. Di dalamnya kamu menaruh <code>&lt;input&gt;</code> (kolom), <code>&lt;label&gt;</code> (nama kolom), dan <code>&lt;button&gt;</code> (tombol).' },
          { type: 'code', lang: 'html', code: '<form>\n  <label for="nama">Nama:</label>\n  <input type="text" id="nama" name="nama">\n  <button type="submit">Kirim</button>\n</form>' },
          { type: 'h2', text: 'Label itu penting, bukan hiasan' },
          { type: 'p', html: '<code>&lt;label&gt;</code> dengan atribut <code>for</code> yang cocok dengan <code>id</code> input akan <em>menautkan</em> teks ke kolom. Klik label = fokus ke kolom. Bagi pengguna pembaca layar, ini cara mereka tahu kolom apa yang sedang diisi.' },
          { type: 'list', items: [
            '<code>id</code> pada <code>&lt;input&gt;</code> dan <code>for</code> pada <code>&lt;label&gt;</code> harus <em>sama persis</em>.',
            '<code>name</code> dipakai sebagai kunci data saat form dikirim (mis. <code>nama=...</code>).',
            '<code>placeholder</code> hanyalah contoh samar — jangan menggantikannya sebagai label.'
          ] },
          { type: 'callout', variant: 'warn', title: 'Jangan ganti label dengan placeholder', html: 'Placeholder menghilang saat pengguna mulai mengetik, sehingga orang lupa kolom itu apa. Selalu sediakan <code>&lt;label&gt;</code> sungguhan.' }
        ],
        challenge: {
          instructions: [
            'Buat sebuah <code>&lt;form&gt;</code>.',
            'Tambahkan <code>&lt;label for="nama"&gt;</code> dan <code>&lt;input id="nama"&gt;</code> yang saling menaut.',
            'Akhiri dengan <code>&lt;button&gt;</code>.'
          ],
          tabs: ['html'],
          starterCode: { html: '<form>\n  <!-- isi di sini -->\n</form>\n' },
          checks: [
            { id: 'form', type: 'exists', selector: 'form', desc: 'Ada elemen <code>&lt;form&gt;</code>.' },
            { id: 'input', type: 'exists', selector: 'form input', label: 'input di form', desc: 'Ada <code>&lt;input&gt;</code> di dalam form.' },
            { id: 'label', type: 'exists', selector: 'label[for]', label: 'label[for]', desc: 'Ada <code>&lt;label&gt;</code> dengan atribut <code>for</code>.' },
            { id: 'btn', type: 'exists', selector: 'form button', label: 'button', desc: 'Ada <code>&lt;button&gt;</code> di dalam form.' },
            { id: 'match', type: 'jsExpr', expr: "(function(){var l=document.querySelector('label[for]');var i=l&&document.getElementById(l.getAttribute('for'));return !!i;})()", desc: '<code>for</code> label menunjuk ke <code>id</code> input yang benar.' }
          ],
          hints: [
            '<code>&lt;label for="nama"&gt;Nama&lt;/label&gt;</code> dipasangkan dengan <code>&lt;input id="nama"&gt;</code>.',
            'Nilai <code>for</code> harus sama persis dengan <code>id</code>.'
          ],
          solution: { html: '<form>\n  <label for="nama">Nama:</label>\n  <input type="text" id="nama" name="nama">\n  <button type="submit">Kirim</button>\n</form>' }
        },
        quiz: [
          { type: 'mcq', id: 'l5-1-q1', q: 'Tag wadah untuk mengumpulkan input adalah…', options: ['<section>', '<form>', '<fieldsetx>', '<input>'], answer: 1, explanation: '<form> membungkus kolom isian dan tombol kirim.' },
          { type: 'mcq', id: 'l5-1-q2', q: 'Cara menautkan label ke input adalah…', options: ['for = id input', 'name = id input', 'href input', 'id = for button'], answer: 0, explanation: '<label for="x"> ditautkan ke <input id="x">.' },
          { type: 'fill', id: 'l5-1-q3', q: 'Atribut label yang menunjuk id input.', before: '<label ____="nama">Nama</label>', answerText: ['for'], explanation: 'Atribut for berisi id target.' },
          { type: 'multi', id: 'l5-1-q4', q: 'Praktik form yang baik:', options: ['setiap input punya label', 'pakai atribut name', 'andalkan placeholder saja', 'button bertipe submit'], answer: [0, 1, 3], wrongWhy: ['', '', 'Placeholder bukan pengganti label.', ''], explanation: 'Label, name, dan tombol submit = form sehat.' },
          { type: 'mcq', id: 'l5-1-q5', q: 'Kegunaan atribut <code>name</code> pada input adalah…', options: ['menampilkan teks', 'menjadi kunci data saat dikirim', 'menghias', 'menentukan warna'], answer: 1, explanation: 'Data dikirim sebagai pasangan name=value.' }
        ]
      },

      /* 5.2 */
      {
        id: 'l5-2',
        title: 'Mengenal jenis input & kontrol',
        minutes: 7,
        reading: [
          { type: 'h2', text: 'type menentukan perilaku' },
          { type: 'p', html: 'Atribut <code>type</code> mengubah bentuk dan perilaku input: keyboard angka untuk <code>number</code>, titik <code>•</code> untuk <code>password</code>, pemilih tanggal untuk <code>date</code>.' },
          { type: 'code', lang: 'html', code: '<input type="text">\n<input type="email">\n<input type="password">\n<input type="number">\n<input type="date">\n<input type="checkbox"> Setuju\n<input type="radio" name="gender"> Pria' },
          { type: 'h2', text: 'Kontrol non-input' },
          { type: 'list', items: [
            '<code>&lt;textarea&gt;</code> — teks panjang multi-baris (punya penutup, bukan void).',
            '<code>&lt;select&gt;</code> + <code>&lt;option&gt;</code> — daftar pilihan.',
            '<code>&lt;button&gt;</code> — tombol (type submit/button/reset).'
          ] },
          { type: 'callout', variant: 'note', title: 'Radio butuh nama sama', html: 'Sekelompok <code>radio</code> menjadi “pilih salah satu” bila berbagi <code>name</code> yang identik. Beda <code>name</code> = kelompok berbeda.' }
        ],
        challenge: {
          instructions: [
            'Buat input <code>type="email"</code> dengan label.',
            'Tambahkan satu <code>checkbox</code>.',
            'Buat <code>&lt;select&gt;</code> berisi minimal 2 <code>&lt;option&gt;</code>.'
          ],
          tabs: ['html'],
          starterCode: { html: '<form>\n  <!-- lengkapi kontrolnya -->\n</form>\n' },
          checks: [
            { id: 'email', type: 'exists', selector: 'input[type="email"]', label: 'input email', desc: 'Ada <code>&lt;input type="email"&gt;</code>.' },
            { id: 'check', type: 'exists', selector: 'input[type="checkbox"]', label: 'checkbox', desc: 'Ada <code>&lt;input type="checkbox"&gt;</code>.' },
            { id: 'sel', type: 'count', selector: 'select option', min: 2, label: '2 option', desc: '<code>&lt;select&gt;</code> punya minimal 2 <code>&lt;option&gt;</code>.' }
          ],
          hints: [
            '<code>&lt;input type="email" id="em"&gt;</code> untuk email.',
            'Contoh select: <code>&lt;select&gt;&lt;option&gt;A&lt;/option&gt;&lt;option&gt;B&lt;/option&gt;&lt;/select&gt;</code>.'
          ],
          solution: { html: '<form>\n  <label for="em">Email</label>\n  <input type="email" id="em" name="em">\n  <label><input type="checkbox" name="setuju"> Setuju</label>\n  <select name="kota">\n    <option>Jakarta</option>\n    <option>Bandung</option>\n  </select>\n</form>' }
        },
        quiz: [
          { type: 'mcq', id: 'l5-2-q1', q: 'Jenis input yang menampilkan bullet (•) saat mengetik adalah…', options: ['text', 'password', 'hidden', 'email'], answer: 1, explanation: 'type="password" menyamarkan karakter dengan •.' },
          { type: 'mcq', id: 'l5-2-q2', q: 'Untuk teks panjang multi-baris, gunakan…', options: ['<input type="textarea">', '<textarea></textarea>', '<textbox>', '<p contenteditable>'], answer: 1, explanation: '<textarea> punya tag penutup dan menerima banyak baris.' },
          { type: 'mcq', id: 'l5-2-q3', q: 'Agar sekumpulan radio menjadi “pilih satu”, mereka harus punya…', options: ['id sama', 'name sama', 'type sama', 'value sama'], answer: 1, explanation: 'Radio sekelompok berbagi atribut name yang identik.' },
          { type: 'multi', id: 'l5-2-q4', q: 'Tipe input yang benar ada di…', options: ['number', 'date', 'color', 'dropdown'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'dropdown bukan type; untuk pilihan pakai <select>.'], explanation: 'number/date/color sah; dropdown memakai <select>.' },
          { type: 'fill', id: 'l5-2-q5', q: 'Tag untuk daftar pilihan.', before: '<', after: '>', answerText: ['select'], explanation: '<select> membungkus <option>.' },
          { type: 'mcq', id: 'l5-2-q6', q: 'Checkbox berbeda dari radio karena…', options: ['bisa pilih banyak sekaligus', 'hanya satu', 'tidak punya label', 'khusus angka'], answer: 0, explanation: 'Checkbox untuk centang bebas (banyak), radio untuk satu pilihan.' }
        ]
      },

      /* 5.3 */
      {
        id: 'l5-3',
        title: 'Validasi bawaan HTML',
        minutes: 6,
        reading: [
          { type: 'h2', text: 'Biarkan browser membantu' },
          { type: 'p', html: 'Sebelum JavaScript, HTML sudah bisa memaksa aturan tertentu. Saat form dikirim, browser memeriksa dan menolak bila tak lolos — lengkap dengan pesan bawaan.' },
          { type: 'code', lang: 'html', code: '<input type="email" required>\n<input type="number" min="1" max="10">\n<input type="text" minlength="3">\n<input type="text" pattern="[A-Za-z ]+">' },
          { type: 'list', items: [
            '<code>required</code> — kolom wajib diisi.',
            '<code>min</code>/<code>max</code> — batas angka.',
            '<code>minlength</code>/<code>maxlength</code> — batas jumlah karakter.',
            '<code>pattern</code> — ekspresi reguler yang harus cocok.',
            '<code>type="email/url"</code> — memvalidasi format email/URL otomatis.'
          ] },
          { type: 'callout', variant: 'warn', title: 'Validasi klien bukan keamanan', html: 'Validasi browser (client-side) demi kenyamanan. Ia bisa dilewati (mis. lewat devtools). Untuk keamanan sungguhan, data harus diperiksa lagi di server. Untuk sekarang, kita pakai validasi HTML agar pengalaman mengisi lebih ramah.' }
        ],
        challenge: {
          instructions: [
            'Buat input email yang <code>required</code>.',
            'Tambahkan input <code>number</code> dengan <code>min="1"</code> dan <code>max="10"</code>.'
          ],
          tabs: ['html'],
          starterCode: { html: '<form>\n  <input type="text">\n</form>\n' },
          checks: [
            { id: 'email', type: 'exists', selector: 'input[type="email"]', desc: 'Ada input email.' },
            { id: 'req', type: 'jsExpr', expr: "document.querySelector('input[required]')!==null", desc: 'Ada input dengan atribut <code>required</code>.' },
            { id: 'num', type: 'exists', selector: 'input[type="number"]', desc: 'Ada input number.' },
            { id: 'min', type: 'jsExpr', expr: "document.querySelector('input[min]')!==null", desc: 'Ada input dengan atribut <code>min</code>.' }
          ],
          hints: [
            '<code>&lt;input type="email" required&gt;</code> menggabungkan tipe dan keharusan.',
            'Untuk angka: <code>&lt;input type="number" min="1" max="10"&gt;</code>.'
          ],
          solution: { html: '<form>\n  <label for="e">Email</label>\n  <input id="e" type="email" name="e" required>\n  <label for="n">Skor (1-10)</label>\n  <input id="n" type="number" name="n" min="1" max="10" required>\n  <button type="submit">Kirim</button>\n</form>' }
        },
        quiz: [
          { type: 'mcq', id: 'l5-3-q1', q: 'Atribut untuk mewajibkan input diisi adalah…', options: ['mandatory', 'required', 'must', 'validate'], answer: 1, explanation: 'Kata kuncinya <code>required</code> (boolean attribute).' },
          { type: 'mcq', id: 'l5-3-q2', q: 'Untuk membatasi angka 1–10 pada input number, pakai…', options: ['min & max', 'low & high', 'range', 'from & to'], answer: 0, explanation: 'min dan max mengatur batas nilai angka.' },
          { type: 'fill', id: 'l5-3-q3', q: 'Memvalidasi format email otomatis.', before: '<input type="______">', answerText: ['email'], explanation: 'type=email memaksa format alamat email.' },
          { type: 'multi', id: 'l5-3-q4', q: 'Manakah atribut validasi HTML?', options: ['required', 'pattern', 'minlength', 'onclick'], answer: [0, 1, 2], wrongWhy: ['', '', '', 'onclick adalah event JavaScript, bukan validasi.'], explanation: 'required/pattern/minlength adalah validasi native.' },
          { type: 'mcq', id: 'l5-3-q5', q: 'Validasi sisi klien sebaiknya dilengkapi karena…', options: ['cukup dan aman', 'bisa dilewati, butuh validasi server', 'memperberat browser', 'tidak didukung'], answer: 1, explanation: 'Pesan: validasi klien untuk UX, keamanan tetap butuh server.' }
        ]
      },

      /* 5.4 mini-project */
      {
        id: 'l5-4',
        title: 'Mini-project: Formulir Pendaftaran',
        minutes: 10,
        reading: [
          { type: 'h2', text: 'Merangkai form nyata' },
          { type: 'p', html: 'Buat form pendaftaran akun lengkap. Terapkan semua yang baru dipelajari: label menaut, jenis kontrol bervariasi, dan validasi bawaan.' },
          { type: 'list', ordered: true, items: [
            'Kolom <code>nama</code> (text, required) dengan label.',
            'Kolom <code>email</code> (type email, required).',
            'Kolom <code>sandi</code> (type password).',
            'Sebuah <code>&lt;select&gt;</code> pilihan dengan minimal 2 <code>&lt;option&gt;</code>.',
            'Checkbox “setuju syarat”.',
            '<code>&lt;button type="submit"&gt;</code>.'
          ] },
          { type: 'callout', variant: 'note', title: 'Rapi tanpa CSS', html: 'Bahkan tanpa CSS, form yang terstruktur rapi sudah nyaman bagi pembaca layar. Nanti kamu bisa memperindahnya (margin antar baris, lebar input) — tapi struktur dulu, gaya belakangan.' }
        ],
        challenge: {
          instructions: [
            'Bangun form dengan nama(text), email, dan password.',
            'Setiap input punya <code>&lt;label for&gt;</code> yang menaut.',
            'Beri minimal satu <code>required</code>, sebuah <code>&lt;select&gt;</code>, dan sebuah <code>checkbox</code>.'
          ],
          tabs: ['html'],
          starterCode: { html: '<form>\n  <!-- formulir pendaftaran -->\n</form>\n' },
          checks: [
            { id: 'form', type: 'exists', selector: 'form', desc: 'Ada <code>&lt;form&gt;</code>.' },
            { id: 'labels', type: 'count', selector: 'label[for]', min: 3, label: '3 label', desc: 'Ada minimal 3 <code>&lt;label for&gt;</code>.' },
            { id: 'name', type: 'exists', selector: 'input[type="text"]', desc: 'Ada input nama (text).' },
            { id: 'email', type: 'exists', selector: 'input[type="email"]', desc: 'Ada input email.' },
            { id: 'pass', type: 'exists', selector: 'input[type="password"]', desc: 'Ada input password.' },
            { id: 'sel', type: 'exists', selector: 'select option', desc: 'Ada <code>&lt;select&gt;</code> dengan <code>&lt;option&gt;</code>.' },
            { id: 'check', type: 'exists', selector: 'input[type="checkbox"]', desc: 'Ada checkbox.' },
            { id: 'req', type: 'jsExpr', expr: "document.querySelector('input[required]')!==null", desc: 'Ada minimal satu input <code>required</code>.' }
          ],
          hints: [
            'Pola label+input berulang: ulangi tiga kali dengan id berbeda.',
            '<code>&lt;button type="submit"&gt;Daftar&lt;/button&gt;</code> di akhir form.'
          ],
          solution: { html: '<form>\n  <label for="nama">Nama</label>\n  <input id="nama" type="text" name="nama" required>\n  <label for="em">Email</label>\n  <input id="em" type="email" name="em" required>\n  <label for="pw">Sandi</label>\n  <input id="pw" type="password" name="pw" required>\n  <label for="kota">Kota</label>\n  <select id="kota" name="kota">\n    <option>Jakarta</option>\n    <option>Bandung</option>\n  </select>\n  <label><input type="checkbox" name="setuju" required> Saya setuju syarat</label>\n  <button type="submit">Daftar</button>\n</form>' }
        },
        quiz: [
          { type: 'multi', id: 'l5-4-q1', q: 'Form yang ramah aksesibilitas sebaiknya punya:', options: ['label untuk tiap kolom', 'atribut name', 'validasi required seperlunya', 'satu tombol submit'], answer: [0, 1, 2, 3], explanation: 'Keempatnya membantu pengguna & pemrosesan data.' },
          { type: 'mcq', id: 'l5-4-q2', q: 'Untuk memilih satu dari banyak kota tanpa mengetik, kontrol terbaik adalah…', options: ['<input type="text">', '<select>', '<textarea>', '<input type="checkbox">'], answer: 1, explanation: '<select> ideal untuk daftar pilihan tunggal.' },
          { type: 'order', id: 'l5-4-q3', q: 'Urutan menyusun form yang efektif.', lines: ['Tulis struktur HTML rapi', 'Tambahkan label & name', 'Beri validasi bawaan', 'Baru dipoles dengan CSS'], explanation: 'Struktur → label → validasi → gaya.' },
          { type: 'fill', id: 'l5-4-q4', q: 'Tipe tombol untuk mengirim form.', before: '<button type="______">', answerText: ['submit'], explanation: 'type="submit" memicu pengiriman form.' },
                    { type: 'mcq', id: 'l5-4-q5', q: 'Saat form dikirim, atribut <code>name</code> pada input berguna sebagai…', options: ['kunci data (name=value)', 'penghias input', 'pengganti label', 'penanda warna'], answer: 0, explanation: 'Data form dikirim sebagai pasangan name=value.' }
        ]
      }
    ]
  };

  if (global.TutorData && global.TutorData.registerLevel) global.TutorData.registerLevel(LEVEL);
  else (global.__TutorPendingLevels = global.__TutorPendingLevels || []).push(LEVEL);
})(window);
