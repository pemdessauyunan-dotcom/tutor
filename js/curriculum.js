/* =====================================================================
   curriculum.js — Registry level/pelajaran + event bus kecil.
   Tiap file di /data memanggil TutorData.registerLevel({...}).
   Engine/app membaca lewat helper di file ini.
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---------------- Event bus mini ---------------- */
  var Bus = {
    _h: {},
    on: function (name, fn) { (this._h[name] = this._h[name] || []).push(fn); },
    off: function (name, fn) {
      var arr = this._h[name]; if (!arr) return;
      this._h[name] = arr.filter(function (f) { return f !== fn; });
    },
    emit: function (name, payload) {
      var arr = this._h[name] || [];
      for (var i = 0; i < arr.length; i++) {
        try { arr[i](payload); }
        catch (e) { console.warn('[bus] handler error', name, e); }
      }
    }
  };
  global.TutorEvents = Bus;

  /* ---------------- Registry ---------------- */
  var Data = {
    levels: [],          // [{ id, title, subtitle, lessons: [...] }]
    _index: {},          // 'levelId' → level
    _lessonIdx: {},      // 'levelId/lessonId' → { level, lesson, order }
    flat: [],            // [{ levelId, lessonId, order, lesson, level }]

    registerLevel: function (lv) {
      if (!lv || !lv.id || !Array.isArray(lv.lessons)) {
        console.warn('[curriculum] level tidak valid', lv);
        return;
      }
      // Replace kalau id sama (mis. hot reload)
      var existingIdx = this._index[lv.id];
      if (existingIdx) {
        this.levels = this.levels.filter(function (l) { return l.id !== lv.id; });
      }
      this.levels.push(lv);
      this._rebuild();
    },

    _rebuild: function () {
      // urutkan level berdasarkan id numerik (level-1, level-2, …)
      this.levels.sort(function (a, b) {
        return Data._lvNum(a.id) - Data._lvNum(b.id);
      });
      this._index = {};
      this._lessonIdx = {};
      this.flat = [];
      var order = 0;
      for (var i = 0; i < this.levels.length; i++) {
        var lv = this.levels[i];
        this._index[lv.id] = lv;
        for (var j = 0; j < lv.lessons.length; j++) {
          var ls = lv.lessons[j];
          order++;
          var key = lv.id + '/' + ls.id;
          this._lessonIdx[key] = { level: lv, lesson: ls, order: order };
          this.flat.push({ levelId: lv.id, lessonId: ls.id, order: order, lesson: ls, level: lv });
        }
      }
    },

    _lvNum: function (id) {
      var m = String(id).match(/(\d+)/);
      return m ? Number(m[1]) : 999;
    },

    getLevel: function (id) { return this._index[id] || null; },
    getLesson: function (lvId, lsId) {
      var e = this._lessonIdx[lvId + '/' + lsId];
      return e || null;
    },
    totalLessons: function () { return this.flat.length; },

    /** Apakah pelajaran ini sudah terbuka (sebelumnya selesai / merupakan yang pertama)? */
    isUnlocked: function (lvId, lsId) {
      var e = this._lessonIdx[lvId + '/' + lsId];
      if (!e) return false;
      if (e.order === 1) return true;
      var prev = this.flat[e.order - 2];
      if (!prev) return true;
      var p = TutorStore.getProgress();
      var rec = p.lessons[prev.levelId + '/' + prev.lessonId];
      if (!rec) return false;
      // terbuka bila pelajaran sebelumnya sudah selesai ATAU sudah "dilewati dengan konfirmasi"
      return !!(rec.completedAt || rec.skipped || rec.quizPassed);
    },

    /** Progres selesai per level → { done, total, pct }. */
    levelProgress: function (lvId) {
      var lv = this._index[lvId];
      if (!lv) return { done: 0, total: 0, pct: 0 };
      var p = TutorStore.getProgress();
      var done = 0;
      for (var i = 0; i < lv.lessons.length; i++) {
        var rec = p.lessons[lvId + '/' + lv.lessons[i].id];
        if (rec && (rec.completedAt || rec.quizPassed || rec.skipped)) done++;
      }
      var total = lv.lessons.length;
      return { done: done, total: total, pct: total ? Math.round(done / total * 100) : 0 };
    },

    /** Progres total semua level. */
    overallProgress: function () {
      var done = 0, total = this.flat.length;
      var p = TutorStore.getProgress();
      for (var i = 0; i < this.flat.length; i++) {
        var k = this.flat[i].levelId + '/' + this.flat[i].lessonId;
        var rec = p.lessons[k];
        if (rec && (rec.completedAt || rec.quizPassed || rec.skipped)) done++;
      }
      return { done: done, total: total, pct: total ? Math.round(done / total * 100) : 0 };
    },

    /** Pelajaran berikutnya / sebelumnya secara linear. */
    nextOf: function (lvId, lsId) {
      var e = this._lessonIdx[lvId + '/' + lsId];
      if (!e) return null;
      return this.flat[e.order] || null;
    },
    prevOf: function (lvId, lsId) {
      var e = this._lessonIdx[lvId + '/' + lsId];
      if (!e || e.order <= 1) return null;
      return this.flat[e.order - 2];
    },

    /** Pelajaran terakhir yang disentuh user (untuk tombol "Lanjutkan"). */
    lastTouched: function () {
      var p = TutorStore.getProgress();
      if (p.lastLesson) {
        var e = this._lessonIdx[p.lastLesson.levelId + '/' + p.lastLesson.lessonId];
        if (e) return { levelId: p.lastLesson.levelId, lessonId: p.lastLesson.lessonId, lesson: e.lesson, level: e.level };
      }
      // fallback: pelajaran pertama yang belum selesai, kalau ada
      for (var i = 0; i < this.flat.length; i++) {
        var f = this.flat[i];
        var rec = p.lessons[f.levelId + '/' + f.lessonId];
        var done = rec && (rec.completedAt || rec.quizPassed || rec.skipped);
        if (!done) return f;
      }
      return this.flat[0] || null;
    }
  };

  global.TutorData = Data;

  // Kalau ada file data yang termuat lebih dulu (fallback), daftarkan sekarang.
  if (Array.isArray(global.__TutorPendingLevels)) {
    for (var i = 0; i < global.__TutorPendingLevels.length; i++) Data.registerLevel(global.__TutorPendingLevels[i]);
    global.__TutorPendingLevels = [];
  }
})(window);
