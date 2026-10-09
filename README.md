# Nol ke HTML — Belajar coding dari nol

Website belajar HTML/CSS/JavaScript dari **nol sampai menengah**, murni front-end. Tidak ada server, tidak ada build, tidak ada dependensi yang wajib online. Cukup double-click `index.html` di Chrome, atau jalankan lewat VS Code Live Server.

> Status: **Tahap 1 selesai** — kerangka aplikasi (desain, routing, sidebar, penyimpanan, dashboard, onboarding, pengaturan, pencarian dasar, pintasan keyboard) sudah berjalan. Mesin COBA + QUIZ dan seluruh level 2–7 akan ditambahkan bertahap sesuai roadmap.

---

## Cara menjalankan

**Paling simpel:** double-click `index.html` → Chrome membuka beranda.

**Lebih baik (rekomendasi):** buka folder ini di VS Code → klik kanan `index.html` → *Open with Live Server*. Live Server membuat perilaku `file://` dan perilaku produksi identik.

Kalau tombol "Lanjutkan" tidak muncul atau sidebar kosong:
- Buka Console (F12). Cari pesan merah.
- Pastikan semua file termuat: `css/style.css`, `js/storage.js`, `js/curriculum.js`, `data/level-01.js`, `js/engine.js`, `js/app.js`.
- Kalau localStorage diblokir (mode incognito tertentu), aplikasi tetap jalan tetapi progres tidak tersimpan. Ada toast kuning yang mengingatkan.

---

## Struktur file

```
tutor/
├─ index.html            shell halaman (header, sidebar, main, modal)
├─ css/
│  └─ style.css          design system + tema gelap/terang
├─ js/
│  ├─ storage.js         wrapper localStorage (aman dari error)
│  ├─ curriculum.js      registry level/pelajaran + event bus
│  ├─ engine.js          router hash + view (home, level, lesson baca)
│  └─ app.js             boot, sidebar, header, onboarding, settings, search, shortcut
├─ data/
│  └─ level-01.js        Level 1 (5 pelajaran, sudah terisi materi BACA)
└─ README.md             file ini
```

---

## Menambah level atau pelajaran baru

1. **Buat file data** di `data/level-02.js` mengikuti pola `level-01.js`:

   ```js
   (function (global) {
     global.TutorData.registerLevel({
       id: 'level-2',        // harus unik, format `level-N`
       num: 2,
       title: 'Isi Halaman',
       subtitle: 'Daftar, link, gambar, tabel…',
       lessons: [
         {
           id: 'l2-1',                    // unik di dalam level
           title: 'Teks tebal, miring, dan komentar HTML',
           minutes: 5,                    // estimasi baca (menit)
           reading: [ /* blok baca, lihat di bawah */ ],
           challenge: { /* Tahap 2: starter code + checks + hints + solution */ },
           quiz: [ /* Tahap 2: bank 8 soal; engine mengambil 5 acak */ ]
         },
         // …pelajaran 2.2, 2.3, dst
       ]
     });
   })(window);
   ```

2. **Daftarkan di `index.html`** dengan menambahkan `<script>` di blok "Data kurikulum", tepat **setelah** `js/curriculum.js` dan **sebelum** `js/engine.js`:

   ```html
   <script src="data/level-02.js"></script>
   ```

3. **Selesai.** Sidebar, dashboard, pencarian, dan routing otomatis mengikuti.

### Format blok `reading`

Objek yang dikenali `engine.renderReading`:

| type        | field yang dipakai                                            | contoh singkat                                |
|-------------|---------------------------------------------------------------|-----------------------------------------------|
| `h2`, `h3`  | `text`                                                        | `{type:'h2', text:'Mulai di sini'}`           |
| `p`         | `html` (HTML inline disanitasi) **atau** `text`               | `{type:'p', html:'Ini <em>paragraf</em>.'}`   |
| `list`      | `items: [string]`, `ordered?: boolean`                        | daftar bullet/bernomor                        |
| `code`      | `code`, `lang?`                                               | potongan kode dengan tombol **Salin**         |
| `callout`   | `title?`, `html`, `variant?: 'note'\|'warn'`                  | kotak "Perhatikan!" atau peringatan           |
| `term`      | `word`, `meaning`                                             | kotak istilah/glosarium inline                |

Semua teks dalam **Bahasa Indonesia santai**. Istilah teknis boleh Inggris asalkan dijelaskan saat pertama muncul. HTML yang diberikan lewat `p.html` **disanitasi** — hanya tag inline (`a`, `em`, `strong`, `code`, `kbd`, `br`, `span` dengan class `term` dan atribut `title`) yang lolos. Tag di luar whitelist otomatis diubah jadi teks polos.

### Menambah jenis soal kuis (Tahap 2+)

Soal didefinisikan di `quiz: []` dengan format:

```js
{
  type: 'mcq' | 'multi' | 'fill' | 'order' | 'bug',
  id: 'l1-3-q1',              // id stabil (untuk spaced repetition)
  q: 'Teks pertanyaan',
  options: ['A','B','C'],     // mcq/multi
  answer: 0,                  // mcq (index), multi (array index)
  answerText: ['h1','</h1>'], // fill — array jawaban alternatif yang diterima
  lines: ['<html>','  <body>','</html>'],   // order — urutan benar
  code: 'baris1\nbaris2',     // bug — kode salah
  bugLine: 1,                 // bug — index baris (0-based) yang bermasalah
  explanation: 'Kenapa ini benar…',
  wrongWhy: { 1: 'Karena X salah sebab Y' }  // (opsional) kenapa opsi lain salah
}
```

Engine kuis (Tahap 2) membaca field di atas; menambah `type` baru cukup dengan menambah satu renderer baru di `js/engine.js` (function `renderQuizQuestion`).

---

## Sistem progres & penyimpanan

- Kunci di `localStorage` dengan prefix `nolkehtml:` + versi skema `{__v:1,data:…}`.
- Semua operasi dibungkus `try/catch`. Kalau storage diblokir, fallback ke memori in-process (progres akan hilang saat reload — pengguna diberi tahu lewat toast).
- Settings dan progress disimpan terpisah. Reset hanya lewat tombol di Pengaturan dengan konfirmasi ganda.
- Ekspor/impor JSON lewat Pengaturan → *Ekspor JSON* / *Impor JSON*.

## Pintasan keyboard

| Kombinasi          | Aksi |
|--------------------|------|
| `Ctrl` + `K`       | Buka pencarian global |
| `T`                | Ganti tema gelap/terang |
| `?`                | Tampilkan daftar pintasan |
| `←` / `→`          | Pelajaran sebelumnya / berikutnya |
| `Enter` (di editor) | Jalankan kode (aktif mulai Tahap 2) |
| `Esc`              | Tutup dialog / pencarian |

Pintasan **nonaktif** saat fokus di `input`, `textarea`, `select`, atau konten editable.

## Asumsi desain Tahap 1

- Semua teks UI & materi dalam Bahasa Indonesia santai; istilah teknis tetap Inggris tapi dijelaskan saat pertama muncul.
- Pada halaman pelajaran Tahap 1, indikator empat tahap (Baca / Coba / Quiz / Hasil) **sudah tampil** agar pengguna tahu akan ada tahap lanjutan, tapi tombol utamanya adalah "Tandai sudah dibaca". Setelah Tahap 2 mengaktifkan blok `challenge` dan `quiz` per pelajaran, tombol Tahap 1 ini otomatis berganti jadi navigasi ke etape berikutnya — **tanpa perlu mengubah engine**.
- Onboarding tidak bisa ditutup lewat backdrop (hanya lewat tombol *Selesai*) supaya pengguna tidak kehilangan setup awal.
- "Tanda selesai" di sidebar mengikuti logika `completedAt ∥ quizPassed ∥ skipped`. Kalau `challenge`/`quiz` belum didefinisikan di data, menekan "Tandai sudah dibaca" langsung menyelesaikan pelajaran.

## Roadmap (sesuai instruksi)

- **Tahap 1** ✅ kerangka, desain, routing, sidebar, penyimpanan progres, dashboard, onboarding, pengaturan dasar, pencarian pelajaran, pintasan keyboard.
- **Tahap 2** ⏭ mesin COBA (editor iframe + checks + solusi bertingkat) dan mesin QUIZ (5 tipe soal, bank cadangan 8, review) + Level 1 penuh sebagai bukti kerja.
- **Tahap 3** gamifikasi penuh: badge (≥15), kalender streak, confetti, sertifikat, XP bonus, export/import teruji.
- **Tahap 4** Level 2, 3, 4 lengkap dengan mini-proyek.
- **Tahap 5** Level 5, 6, 7 + proyek akhir.
- **Tahap 6** cheat sheet, glosarium, playground, spaced repetition, polish akhir.

## Lisensi & Privasi

Tidak ada analitik, tidak ada server, tidak ada cookie. Progresmu adalah milikmu, tersimpan di perangkatmu sendiri. Konten di `data/*.js` ditulis untuk proyek ini — silakan gunakan untuk belajar atau memodifikasi untuk keperluan mengajar pribadi.
