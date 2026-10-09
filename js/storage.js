/* =====================================================================
   storage.js — Pembungkus localStorage yang aman.
   - Semua akses dibungkus try/catch (mode privat, storage penuh, diblokir).
   - Punya versioning skema supaya upgrade tidak merusak data lama.
   - Fallback ke memori bila storage benar-benar tidak tersedia.
   ===================================================================== */
(function (global) {
  'use strict';

  var PREFIX = 'nolkehtml:';
  var VERSION = 1;

  // flag: true kalau localStorage benar-benar bisa dipakai
  var available = (function () {
    try {
      var k = PREFIX + '__probe__';
      global.localStorage.setItem(k, '1');
      global.localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  })();

  // fallback in-memory bila storage diblokir (mis. file:// + beberapa konfigurasi privat)
  var memory = Object.create(null);

  function _read(key) {
    try {
      var raw = available ? global.localStorage.getItem(PREFIX + key) : memory[PREFIX + key];
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.__v === VERSION) return parsed.data;
      return null; // versi beda → anggap kosong (nanti ada migrasi)
    } catch (e) {
      console.warn('[storage] gagal baca', key, e);
      return null;
    }
  }

  function _write(key, value) {
    try {
      var payload = JSON.stringify({ __v: VERSION, data: value });
      if (available) global.localStorage.setItem(PREFIX + key, payload);
      else memory[PREFIX + key] = payload;
      return true;
    } catch (e) {
      console.warn('[storage] gagal tulis', key, e);
      return false;
    }
  }

  function _remove(key) {
    try {
      if (available) global.localStorage.removeItem(PREFIX + key);
      else delete memory[PREFIX + key];
    } catch (e) { /* diabaikan */ }
  }

  /* ------------------ STATE DEFAULT ------------------ */
  function defaultSettings() {
    return {
      theme: 'dark',
      font: 'md',              // sm | md | lg
      anim: true,
      sound: false,
      passScore: 60,           // ambang lulus quiz (persen)
      quizTimer: false,        // timer mati default
      onboarded: false,
      name: '',
      experience: 'nol',       // nol | sedikit
      targetMinutes: 20,
      placementDone: false,
      placementLevel: 1
    };
  }

  function defaultProgress() {
    return {
      xp: 0,
      userLevel: 1,            // dihitung dari XP, disimpan untuk kemudahan render
      badges: {},              // { badgeId: ISODate }
      streak: { current: 0, longest: 0, lastDay: null, calendar: {} }, // calendar: {'YYYY-MM-DD': true}
      timeSpentSec: 0,
      quizzesTaken: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      lastLesson: null,        // { levelId, lessonId }
      lessons: {},             // { '<levelId>/<lessonId>': { startedAt, completedAt, bestScore, stage, readDone, challengeDone, quizPassed, notes, bookmark } }
      wrongBank: {},           // { questionId: { hits, lastWrong, nextReview } } — dipakai spaced repetition (Tahap 6)
      custom: {}               // ruang untuk data tambahan (playground project dst)
    };
  }

  /* ------------------ API PUBLIK ------------------ */
  var Store = {
    isAvailable: function () { return available; },

    getSettings: function () {
      var s = _read('settings');
      if (!s) return defaultSettings();
      // merge supaya field baru di versi berikutnya tidak undefined
      var base = defaultSettings();
      for (var k in base) if (s[k] === undefined) s[k] = base[k];
      return s;
    },
    saveSettings: function (patch) {
      var cur = Store.getSettings();
      var next = Object.assign({}, cur, patch || {});
      return _write('settings', next);
    },

    getProgress: function () {
      var p = _read('progress');
      if (!p) return defaultProgress();
      var base = defaultProgress();
      for (var k in base) if (p[k] === undefined) p[k] = base[k];
      return p;
    },
    saveProgress: function (patch) {
      var cur = Store.getProgress();
      var next = Object.assign({}, cur, patch || {});
      return _write('progress', next);
    },

    /** Ambil (atau buat) record per pelajaran. */
    lesson: function (levelId, lessonId) {
      var key = levelId + '/' + lessonId;
      var p = Store.getProgress();
      if (!p.lessons[key]) {
        p.lessons[key] = {
          startedAt: null, completedAt: null, bestScore: 0,
          stage: 'baca',   // baca | coba | quiz | hasil
          readDone: false, challengeDone: false, quizPassed: false,
          attempts: 0, notes: '', bookmark: false
        };
      }
      return p.lessons[key];
    },
    /** Simpan perubahan per pelajaran dengan patch. */
    patchLesson: function (levelId, lessonId, patch) {
      var p = Store.getProgress();
      var key = levelId + '/' + lessonId;
      var rec = p.lessons[key] || {
        startedAt: null, completedAt: null, bestScore: 0,
        stage: 'baca', readDone: false, challengeDone: false, quizPassed: false,
        attempts: 0, notes: '', bookmark: false
      };
      Object.assign(rec, patch || {});
      p.lessons[key] = rec;
      Store.saveProgress({ lessons: p.lessons });
      return rec;
    },

    /* ------------------ Ruang khusus (playground, state quiz berjalan) ------------------ */
    getCustom: function (key) {
      var p = Store.getProgress();
      return p.custom && p.custom[key] != null ? p.custom[key] : null;
    },
    patchCustom: function (key, value) {
      var p = Store.getProgress();
      p.custom = p.custom || {};
      if (value === null || value === undefined) delete p.custom[key];
      else p.custom[key] = value;
      Store.saveProgress({ custom: p.custom });
      return value;
    },

    /* ------------------ Spaced repetition (soal yang pernah salah) ------------------ */
    /** Catat soal salah; naikkan 'hits' dan jadwalkan review (1, 3, 7 hari). */
    recordWrong: function (questionId) {
      var p = Store.getProgress();
      p.wrongBank = p.wrongBank || {};
      var e = p.wrongBank[questionId] || { hits: 0, interval: 1 };
      e.hits++;
      e.lastWrong = new Date().toISOString();
      var steps = [1, 3, 7];
      e.interval = steps[Math.min(e.hits - 1, steps.length - 1)];
      var d = new Date(); d.setDate(d.getDate() + e.interval);
      e.nextReview = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      p.wrongBank[questionId] = e;
      Store.saveProgress({ wrongBank: p.wrongBank });
    },
    /** Anggap soal "lulus" saat review → kurangi prioritasnya. */
    recordReviewPass: function (questionId) {
      var p = Store.getProgress();
      if (p.wrongBank && p.wrongBank[questionId]) {
        p.wrongBank[questionId].interval = Math.max(7, (p.wrongBank[questionId].interval || 7) * 2);
        var d = new Date(); d.setDate(d.getDate() + p.wrongBank[questionId].interval);
        p.wrongBank[questionId].nextReview = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        Store.saveProgress({ wrongBank: p.wrongBank });
      }
    },
    /** Daftar id soal yang sudah jatuh tempo review hari ini. */
    reviewDue: function () {
      var p = Store.getProgress(); var today = Store._todayKey(); var out = [];
      Object.keys(p.wrongBank || {}).forEach(function (id) { if ((p.wrongBank[id].nextReview || '') <= today) out.push(id); });
      return out;
    },

    /** Tambah XP + update streak harian. */
    addXp: function (amount, reason) {
      if (!amount || amount <= 0) return Store.getProgress();
      var p = Store.getProgress();
      p.xp = (p.xp || 0) + amount;
      p.userLevel = Store.levelFromXp(p.xp);
      Store._touchStreak(p);
      Store.saveProgress(p);
      if (global.TutorEvents) global.TutorEvents.emit('xp', { amount: amount, reason: reason, xp: p.xp });
      return p;
    },

    /** Reset seluruh progres + settings. */
    resetAll: function () {
      _remove('progress');
      _remove('settings');
      return true;
    },

    /** Ekspor data sebagai objek siap-stringify (untuk file JSON). */
    exportAll: function () {
      return {
        app: 'nolkehtml',
        version: VERSION,
        exportedAt: new Date().toISOString(),
        settings: Store.getSettings(),
        progress: Store.getProgress()
      };
    },
    /** Impor data dari objek hasil exportAll. Validasi ringan. */
    importAll: function (obj) {
      if (!obj || obj.app !== 'nolkehtml') throw new Error('File bukan backup Nol ke HTML.');
      if (obj.settings) _write('settings', obj.settings);
      if (obj.progress) _write('progress', obj.progress);
      return true;
    },

    /** Nama level pengguna bertema (Rekrutan → Kepala Divisi). */
    levelFromXp: function (xp) {
      var thresholds = [0, 100, 300, 700, 1400, 2400];
      var names = ['Rekrutan', 'Penyelidik', 'Detektif', 'Inspektur', 'Kepala Divisi', 'Legenda'];
      var idx = 0;
      for (var i = 0; i < thresholds.length; i++) if (xp >= thresholds[i]) idx = i;
      return { index: idx + 1, name: names[idx], next: thresholds[idx + 1] || null, floor: thresholds[idx] };
    },

    /** Update streak harian berdasarkan tanggal lokal (YYYY-MM-DD). */
    _touchStreak: function (p) {
      var today = Store._todayKey();
      var s = p.streak || (p.streak = { current: 0, longest: 0, lastDay: null, calendar: {} });
      if (!s.calendar) s.calendar = {};
      if (s.lastDay === today) return; // sudah dihitung hari ini
      var yest = Store._shiftDay(today, -1);
      if (s.lastDay === yest) s.current = (s.current || 0) + 1;
      else s.current = 1; // putus → mulai lagi
      s.longest = Math.max(s.longest || 0, s.current);
      s.lastDay = today;
      s.calendar[today] = true;
    },

    /** Kembalikan streak kalau user buka app dan streak-nya sudah kedaluwarsa (gap > 1 hari). */
    normalizeStreak: function () {
      var p = Store.getProgress();
      var s = p.streak;
      if (!s || !s.lastDay) return p;
      var today = Store._todayKey();
      if (s.lastDay === today) return p;
      var yest = Store._shiftDay(today, -1);
      if (s.lastDay !== yest) { s.current = 0; Store.saveProgress({ streak: s }); }
      return p;
    },

    _todayKey: function () {
      var d = new Date();
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return d.getFullYear() + '-' + m + '-' + day;
    },
    _shiftDay: function (ymd, delta) {
      var parts = ymd.split('-');
      var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]) + delta);
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return d.getFullYear() + '-' + m + '-' + day;
    }
  };

  global.TutorStore = Store;
})(window);
