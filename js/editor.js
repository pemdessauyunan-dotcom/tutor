/* =====================================================================
   editor.js — Mesin tantangan "COBA".
   Berisi:
     • CodeEditor  : textarea + nomor baris + auto-indent + Tab + pewarnaan sintaks (buatan sendiri)
     • Preview     : iframe sandbox (opaque origin) + harness postMessage untuk
                     - menangkap console.log & error
                     - menjalankan "checks" dengan membaca DOM di dalam iframe (aman)
     • lint*       : deteksi error umum pemula (tag belum ditutup, kutip, titik koma CSS)
     • ChallengeView : merangkai editor + preview + checklist + petunjuk + solusi + tombol
   Keamanan: kode pengguna jalan di iframe sandbox="allow-scripts" TANPA allow-same-origin,
   sehingga tidak bisa menyentuh DOM/localStorage induk. Validasi dilakukan oleh harness
   di dalam iframe itu sendiri lalu hasilnya dikirim balik via postMessage.
   ===================================================================== */
(function (global) {
  'use strict';

  /* ============================================================
     1. PEWARNAAN SINTAKS SEDERHANA (bikin sendiri, tanpa library)
     ============================================================ */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // highlight menerima string mentah, mengembalikan HTML untuk layer <pre>.
  function highlight(code, lang) {
    if (lang === 'html') return hlHtml(code);
    if (lang === 'css') return hlCss(code);
    if (lang === 'js') return hlJs(code);
    return esc(code);
  }

  function hlHtml(src) {
    // urutan: comment, tag (+atribut), sisanya teks
    var out = '', i = 0;
    var re = /<!--[\s\S]*?-->|<\/?[A-Za-z][A-Za-z0-9-]*(?:"[^"]*"|'[^']*'|[^>])*>/g;
    var m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(i, re.lastIndex - m[0].length));
      out += colorTag(m[0]);
      i = re.lastIndex;
    }
    out += esc(src.slice(i));
    return out;
  }
  function colorTag(tok) {
    if (tok.startsWith('<!--')) return '<span class="t-com">' + esc(tok) + '</span>';
    // pisah atribut dulu (sebelum sisip span nama tag), baru nama tag.
    // Kalau nama tag dibungkus lebih dulu, regex atribut akan ikut men-match
    // class="t-tag" yang baru disisipkan dan merusak HTML (markup bocor).
    return tok
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/([A-Za-z-]+)=(&quot;|")(.*?)\2/g, function (_, a, q, v) {
        return '<span class="t-attr">' + a + '</span>=<span class="t-str">' + q + esc2(v) + q + '</span>';
      })
      .replace(/^(&lt;\/?)([A-Za-z][A-Za-z0-9-]*)/, '$1<span class="t-tag">$2</span>');
  }
  function esc2(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function hlJs(src) {
    var kw = /\b(var|let|const|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|this|typeof|instanceof|null|undefined|true|false|of|in|try|catch|finally|throw|=>|async|await|import|export|default)\b/g;
    // token besar dulu: string & komentar, baru keyword/number
    return esc(src)
      .replace(/(&quot;.*?&quot;|&#39;.*?&#39;|`[^`]*`)/g, '<span class="t-str">$1</span>')
      .replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span class="t-com">$1</span>')
      .replace(/\b(console|document|window|Math|JSON|Array|Object|String|Number|localStorage)\b/g, '<span class="t-builtin">$1</span>')
      .replace(kw, '<span class="t-kw">$&</span>')
      .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="t-num">$1</span>');
  }

  function hlCss(src) {
    return esc(src)
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="t-com">$1</span>')
      .replace(/([.#]?[\w-]+\s*\{)/g, '<span class="t-sel">$1</span>')
      .replace(/([-\w]+)(\s*:)/g, '<span class="t-prop">$1</span>$2')
      .replace(/(:\s*)([^;{}]+)(;)/g, '$1<span class="t-str">$2</span>$3');
  }

  /* ============================================================
     2. CODE EDITOR
     ============================================================ */
  function CodeEditor(opts) {
    this.lang = opts.lang || 'html';
    this.el = document.createElement('div');
    this.el.className = 'ce';
    this.el.innerHTML =
      '<div class="ce-gutter" aria-hidden="true"></div>' +
      '<div class="ce-scroll">' +
        '<pre class="ce-hl" aria-hidden="true"><code></code></pre>' +
        '<textarea class="ce-ta" spellcheck="false" autocomplete="off" autocapitalize="off" wrap="off" aria-label="Editor kode ' + this.lang + '"></textarea>' +
      '</div>';
    this.gutter = this.el.querySelector('.ce-gutter');
    this.scroll = this.el.querySelector('.ce-scroll');
    this.hl = this.el.querySelector('.ce-hl code');
    this.ta = this.el.querySelector('.ce-ta');
    this.onChange = opts.onChange || function () {};

    var self = this;
    this.ta.addEventListener('input', function () { self._refresh(); self.onChange(self.getValue()); });
    this.ta.addEventListener('scroll', function () { self._sync(); });
    this.ta.addEventListener('keydown', function (e) { self._keys(e); });
    if (opts.value != null) this.setValue(opts.value);
  }
  CodeEditor.prototype.getValue = function () { return this.ta.value; };
  CodeEditor.prototype.setValue = function (v) { this.ta.value = v == null ? '' : v; this._refresh(); };
  CodeEditor.prototype.focus = function () { this.ta.focus(); };
  CodeEditor.prototype._refresh = function () {
    this.hl.innerHTML = highlight(this.ta.value, this.lang) + '\n'; // +1 baris hantu biar scroll mulus
    var lines = this.ta.value.split('\n').length;
    var g = '';
    for (var i = 1; i <= lines; i++) g += i + '\n';
    this.gutter.textContent = g;
    this._sync();
  };
  CodeEditor.prototype._sync = function () {
    this.hl.parentElement.style.transform = 'translate(' + (-this.ta.scrollLeft) + 'px,' + (-this.ta.scrollTop) + 'px)';
    this.gutter.style.transform = 'translateY(' + (-this.ta.scrollTop) + 'px)';
  };
  CodeEditor.prototype._keys = function (e) {
    var ta = this.ta;
    if (e.key === 'Tab') {
      e.preventDefault();
      var s = ta.selectionStart, en = ta.selectionEnd;
      if (e.shiftKey) {
        // hapus indentasi 2 spasi di awal baris terpilih
        var before = ta.value.slice(0, s);
        var lineStart = before.lastIndexOf('\n') + 1;
        if (ta.value.slice(lineStart, lineStart + 2) === '  ') {
          ta.value = ta.value.slice(0, lineStart) + ta.value.slice(lineStart + 2);
          ta.selectionStart = ta.selectionEnd = Math.max(lineStart, s - 2);
        }
      } else {
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 2;
      }
      this._refresh(); this.onChange(this.getValue()); return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      var pos = ta.selectionStart;
      var text = ta.value.slice(0, pos);
      var lineStart = text.lastIndexOf('\n') + 1;
      var curLine = text.slice(lineStart);
      var indent = (curLine.match(/^[ \t]*/) || [''])[0];
      // tambah indentasi kalau baris berakhir dengan { > : (pembuka blok)
      if (/[{:>]\s*$/.test(curLine) && !/\/>\s*$/.test(curLine)) indent += '  ';
      var insert = '\n' + indent;
      ta.value = ta.value.slice(0, pos) + insert + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = pos + insert.length;
      this._refresh(); this.onChange(this.getValue()); return;
    }
  };

  /* ============================================================
     3. PREVIEW (iframe + harness)
     ============================================================ */
  var HARNESS = [
    '(function(){',
    '  function send(o){ try{ parent.postMessage(Object.assign({__tutor:1},o), "*"); }catch(e){} }',
    '  ["log","info","warn","error"].forEach(function(lvl){',
    '    var orig = console[lvl];',
    '    console[lvl] = function(){ var a=[].slice.call(arguments).map(fmt); send({type:"console",level:lvl,args:a}); orig && orig.apply(console,arguments); };',
    '  });',
    '  function fmt(v){ try{ if(typeof v==="object"&&v!==null) return JSON.stringify(v); return String(v);}catch(e){ return String(v);} }',
    '  window.addEventListener("error", function(e){ send({type:"console",level:"error",args:[e.message]}); });',
    '  window.addEventListener("unhandledrejection", function(e){ send({type:"console",level:"error",args:["Promise ditolak: "+e.reason]}); });',
    '  window.addEventListener("message", function(ev){ var d=ev.data||{}; if(d.__tutor && d.type==="runChecks"){ send({type:"checkResults", nonce:d.nonce, results: runChecks(d.checks)}); } });',
    '  function q(sel){ try{ return document.querySelector(sel); }catch(e){ return null; } }',
    '  function qa(sel){ try{ return [].slice.call(document.querySelectorAll(sel)); }catch(e){ return []; } }',
    '  function norm(s){ return String(s==null?"":s).toLowerCase().replace(/\\s+/g," ").trim(); }',
    '  function runChecks(checks){',
    '    return (checks||[]).map(function(c){',
    '      try { return evalCheck(c); }',
    '      catch(err){ return { id:c.id, pass:false, msg:"Kesalahan pemeriksaan: "+err.message }; }',
    '    });',
    '  }',
    '  function evalCheck(c){',
    '    var el, els, ok, val;',
    '    switch(c.type){',
    '      case "exists": els=qa(c.selector); ok=els.length>=(c.min||1); return {id:c.id,pass:ok,msg:ok?"":"Belum ada "+(c.label||c.selector)+"."};',
    '      case "notExists": ok=qa(c.selector).length===0; return {id:c.id,pass:ok,msg:ok?"":"Masih ada "+(c.label||c.selector)+" yang seharusnya tidak ada."};',
    '      case "count": els=qa(c.selector); ok=els.length>=(c.min||0)&&(c.max==null||els.length<=c.max); return {id:c.id,pass:ok,msg:ok?"":"Jumlah "+(c.label||c.selector)+" = "+els.length+", butuh "+(c.min||0)+(c.max!=null?"-"+c.max:"+")+"."};',
    '      case "text": el=q(c.selector); ok=!!el && matchText(el.textContent,c); return {id:c.id,pass:ok,msg:ok?"":(el?("Teks di "+(c.label||c.selector)+" belum sesuai."):("Belum ada "+(c.label||c.selector)+"."))};',
    '      case "attr": el=q(c.selector); if(!el) return {id:c.id,pass:false,msg:"Belum ada "+(c.label||c.selector)+"."}; val=el.getAttribute(c.attr)||""; ok=(c.value==null)?val.length>0:norm(val)===norm(c.value); if(!ok&&c.contains) ok=norm(val).indexOf(norm(c.contains))>=0; return {id:c.id,pass:ok,msg:ok?"":"Atribut "+c.attr+" belum benar."};',
    '      case "style": el=q(c.selector); if(!el) return {id:c.id,pass:false,msg:"Belum ada "+(c.label||c.selector)+"."}; var cs=getComputedStyle(el); val=cs[c.prop]; ok=c.value==null? (val && val!=="normal") : near(val,c.value); return {id:c.id,pass:ok,msg:ok?"":"Properti "+c.prop+" belum "+(c.value||"diatur")+" (sekarang: "+val+")."};',
    '      case "bodyText": ok=matchText(document.body.textContent,c); return {id:c.id,pass:ok,msg:ok?"":"Halaman belum memuat teks yang diminta."};',
    '      case "clickChanges": var b=q(c.button); if(!b) return {id:c.id,pass:false,msg:"Belum ada tombol "+(c.button||"")+"."}; var t=q(c.target||c.button); var before=t?(t.textContent+"|"+t.getAttribute("value")):""; b.click(); var after=t?(t.textContent+"|"+(t.getAttribute&&t.getAttribute("value"))||""):""; ok=before!==after; return {id:c.id,pass:ok,msg:ok?"":"Saat tombol diklik, teks/nilai target harus berubah."};',
    '      case "jsGlobal": ok=(typeof window[c.name]!=="undefined"); return {id:c.id,pass:ok,msg:ok?"":"Variabel/fungsi "+c.name+" belum dibuat."};',
    '      case "jsExpr": ok=!!(new Function("doc","win","return ("+c.expr+")"))(document,window); return {id:c.id,pass:!!ok,msg:ok?"":(c.msg||"Syarat belum terpenuhi.")};',
    '      default: return {id:c.id,pass:false,msg:"Jenis check tidak dikenal: "+c.type};',
    '    }',
    '  }',
    '  function matchText(txt,c){ txt=norm(txt); if(c.equals!=null) return txt===norm(c.equals); if(c.contains!=null){ var need=norm(c.contains).split(" "); return need.every(function(w){return txt.indexOf(w)>=0;}); } return txt.length>0; }',
    '  function near(a,b){ a=norm(a);b=norm(b); if(a===b) return true; var na=parseFloat(a),nb=parseFloat(b); if(!isNaN(na)&&!isNaN(nb)&&String(b).match(/[0-9]/)) return Math.abs(na-nb)<1.5; var map={"rgb(255, 0, 0)":"red","rgb(0, 0, 255)":"blue","rgb(0, 128, 0)":"green"}; if(map[a]===b) return true; return a.replace(/\\s/g,"")===b.replace(/\\s/g,""); }',
    '  send({type:"ready"});',
    '})();'
  ].join('\n');

  function buildSrcdoc(html, css, js) {
    return '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8">' +
      '<style>body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;margin:0;padding:14px;color:#111;background:#fff;line-height:1.5}' +
      'button,input,select,textarea{font:inherit} .err{color:#b00}</style>' +
      '<style id="user-css">' + (css || '') + '</style></head><body>' +
      (html || '') +
      '<script>' + HARNESS + '</scr' + 'ipt>' +
      '<script>' + (js || '') + '</scr' + 'ipt>' +
      '</body></html>';
  }

  function Preview(opts) {
    this.onConsole = opts.onConsole || function () {};
    this.onReady = opts.onReady || function () {};
    this.iframe = document.createElement('iframe');
    this.iframe.className = 'pv-frame';
    this.iframe.setAttribute('sandbox', 'allow-scripts allow-modals allow-forms allow-popups');
    this.iframe.setAttribute('title', 'Pratinjau hasil kode');
    this.pending = null;
    this.nonce = 0;
    var self = this;
    this._msg = function (ev) {
      var d = ev.data; if (!d || !d.__tutor) return;
      if (d.type === 'console') self.onConsole(d.level, d.args);
      else if (d.type === 'ready') { self.ready = true; self.onReady(); if (self.pending) { self._fireChecks(); } }
      else if (d.type === 'checkResults' && self._cb && d.nonce === self._nonce) { self._cb(d.results); self._cb = null; }
    };
    window.addEventListener('message', this._msg);
  }
  Preview.prototype.render = function (html, css, js) {
    this.ready = false;
    this.iframe.srcdoc = buildSrcdoc(html, css, js);
  };
  Preview.prototype.runChecks = function (checks, cb) {
    var self = this;
    this._cb = cb; this._nonce = ++this.nonce;
    function fire() {
      try { self.iframe.contentWindow.postMessage({ __tutor: 1, type: 'runChecks', checks: checks, nonce: self._nonce }, '*'); }
      catch (e) { cb(checks.map(function (c) { return { id: c.id, pass: false, msg: 'Gagal menjalankan pemeriksaan.' }; })); }
    }
    if (this.ready) fire(); else this.pending = fire;
  };
  Preview.prototype._fireChecks = function () { var f = this.pending; this.pending = null; if (f) f(); };
  Preview.prototype.destroy = function () { window.removeEventListener('message', this._msg); };

  /* ============================================================
     4. DETEKSI ERROR UMUM (heuristik string, untuk pesan ramah)
     ============================================================ */
  function lintHtml(code) {
    var msgs = [];
    var voidTags = { br: 1, hr: 1, img: 1, input: 1, meta: 1, link: 1, area: 1, base: 1, col: 1, embed: 1, source: 1, track: 1, wbr: 1 };
    var stack = [], re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>/g, m;
    var stripped = code.replace(/<!--[\s\S]*?-->/g, '');
    while ((m = re.exec(stripped))) {
      var closing = m[1] === '/', name = m[2].toLowerCase(), attrs = m[3];
      if (/["']/.test(attrs)) {
        var quotes = attrs.match(/["']/g) || [];
        if (quotes.length % 2 !== 0) msgs.push('Ada atribut yang tanda kutipnya belum ditutup di tag <' + name + '>.');
      }
      if (voidTags[name] || /\/$/.test(attrs.trim())) continue;
      if (!closing) stack.push(name);
      else {
        if (stack.length && stack[stack.length - 1] === name) stack.pop();
        else if (stack.indexOf(name) >= 0) { while (stack.length && stack.pop() !== name) {} msgs.push('Tag </' + name + '> menutup tapi ada tag lain yang belum selesai.'); }
        else msgs.push('Ada tag penutup </' + name + '> tanpa pembuka <' + name + '>.');
      }
    }
    if (stack.length) msgs.push('Tag <' + stack[stack.length - 1] + '> kamu belum ditutup. Tambahkan </' + stack[stack.length - 1] + '>.');
    // tag mirip tapi salah ketik, mis. <pik>
    return dedupe(msgs);
  }
  function lintCss(code) {
    var msgs = [];
    var opens = (code.match(/{/g) || []).length, closes = (code.match(/}/g) || []).length;
    if (opens !== closes) msgs.push('Jumlah kurung kurawal { dan } di CSS tidak seimbang.');
    // deklarasi tanpa ; sebelum }
    var re = /([a-z-]+\s*:\s*[^;{}]+?)(?=\})/gi, m;
    while ((m = re.exec(code))) { if (!/;\s*$/.test(m[1]) && m[1].trim()) msgs.push('Mungkin lupa titik koma (;) setelah "' + m[1].trim() + '".'); }
    return dedupe(msgs).slice(0, 3);
  }
  function dedupe(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }

  /* ============================================================
     5. CHALLENGE VIEW (perangkai UI)
     ============================================================ */
  function ChallengeView(mount, opts) {
    this.mount = mount;
    this.ch = opts.challenge;
    this.onComplete = opts.onComplete || function () {};
    this.lang = detectLang(this.ch);
    this.hintLevel = 0;
    this.solutionShown = false;
    this.attempts = 0;
    this.completed = opts.completed || false;
    this._previews = [];
    this._render();
  }
  function detectLang(ch) {
    var keys = Object.keys(ch.starterCode || {});
    if (ch.tabs) return ch.tabs; // mis. ['html','css'] atau ['html','css','js']
    return keys.length ? keys : ['html'];
  }

  ChallengeView.prototype._render = function () {
    var self = this;
    var ch = this.ch;
    var tabs = this.lang;
    this.mount.innerHTML = '';

    // instruksi
    var inst = document.createElement('div');
    inst.className = 'ch-inst';
    inst.innerHTML = '<h3>Coba sendiri</h3>' +
      '<ol>' + (ch.instructions || []).map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';
    this.mount.appendChild(inst);

    // workspace: editor | preview
    var ws = document.createElement('div');
    ws.className = 'ws';
    // tab bar
    var left = document.createElement('div');
    left.className = 'ws-left';
    var tabbar = document.createElement('div'); tabbar.className = 'ed-tabs'; tabbar.setAttribute('role', 'tablist');
    var editors = {};
    var panes = document.createElement('div'); panes.className = 'ed-panes';
    tabs.forEach(function (t, idx) {
      var btn = document.createElement('button');
      btn.className = 'ed-tab' + (idx === 0 ? ' active' : ''); btn.textContent = t.toUpperCase();
      btn.setAttribute('role', 'tab'); btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      var ed = new CodeEditor({ lang: t, value: (ch.starterCode && ch.starterCode[t]) || '', onChange: function () { self._onEdit(); } });
      ed.el.style.display = idx === 0 ? 'flex' : 'none';
      editors[t] = { ed: ed, btn: btn };
      tabbar.appendChild(btn); panes.appendChild(ed.el);
      btn.addEventListener('click', function () {
        tabs.forEach(function (x) { editors[x].ed.el.style.display = 'none'; editors[x].btn.classList.remove('active'); editors[x].btn.setAttribute('aria-selected', 'false'); });
        ed.el.style.display = 'flex'; btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      });
    });
    left.appendChild(tabbar); left.appendChild(panes);

    var right = document.createElement('div'); right.className = 'ws-right';
    var pvHead = document.createElement('div'); pvHead.className = 'pv-head';
    pvHead.innerHTML = '<span>Pratinjau langsung</span>' +
      '<div class="pv-tools"><button class="mini-btn" data-act="run">▶ Jalankan</button>' +
      '<button class="mini-btn" data-act="download">⬇ Unduh .html</button>' +
      '<button class="mini-btn" data-act="copy">⧉ Salin</button></div>';
    right.appendChild(pvHead);
    this.preview = new Preview({
      onConsole: function (lvl, args) { self._log(lvl, args); },
      onReady: function () { /* siap di-check kapan pun */ }
    });
    right.appendChild(this.preview.iframe);
    // panel console (untuk js)
    if (tabs.indexOf('js') >= 0) {
      var con = document.createElement('div'); con.className = 'console'; con.id = 'consolePanel';
      con.innerHTML = '<div class="con-head">Console <button class="mini-btn" data-act="clearcon">bersihkan</button></div><div class="con-body"></div>';
      right.appendChild(con); this.consoleBody = con.querySelector('.con-body');
      con.querySelector('[data-act="clearcon"]').addEventListener('click', function () { self.consoleBody.innerHTML = ''; });
    }

    ws.appendChild(left); ws.appendChild(right);
    this.mount.appendChild(ws);

    // toolbar aksi
    var bar = document.createElement('div'); bar.className = 'ch-bar';
    bar.innerHTML =
      '<button class="btn btn-ghost" data-act="reset">↺ Reset kode</button>' +
      '<button class="btn btn-ghost" data-act="hint">💡 Lihat petunjuk</button>' +
      '<button class="btn btn-ghost" data-act="solution">👁 Tampilkan solusi</button>' +
      '<span class="ch-status" id="chStatus"></span>';
    this.mount.appendChild(bar);

    // checklist
    var chk = document.createElement('div'); chk.className = 'checks';
    chk.innerHTML = '<p class="muted" style="margin:0 0 8px">Selesaikan semua syarat berikut:</p><ul id="checkList"></ul>';
    this.mount.appendChild(chk);
    this.checkList = chk.querySelector('#checkList');
    this.statusEl = bar.querySelector('#chStatus');

    // hint area
    this.hintBox = document.createElement('div'); this.hintBox.className = 'hint-box'; this.hintBox.hidden = true;
    this.mount.appendChild(this.hintBox);

    // tombol lanjut
    this.nextBtn = document.createElement('a');
    this.nextBtn.className = 'btn btn-primary'; this.nextBtn.hidden = true;
    this.nextBtn.textContent = 'Lanjut ke Quiz →';
    this.nextBtn.href = '#';
    this.mount.appendChild(this.nextBtn);
    this.nextBtn.addEventListener('click', function (e) { e.preventDefault(); self.onComplete(); });

    // bind toolbar
    bar.addEventListener('click', function (e) {
      var a = e.target.getAttribute('data-act'); if (!a) return;
      if (a === 'reset') self._reset();
      else if (a === 'hint') self._hint();
      else if (a === 'solution') self._solution();
    });
    pvHead.addEventListener('click', function (e) {
      var a = e.target.getAttribute('data-act'); if (!a) return;
      if (a === 'run') self._run(true);
      else if (a === 'download') self._download();
      else if (a === 'copy') self._copy();
    });

    // simpan referensi editor
    this.editors = editors;

    // render awal + debounce check
    this._run(false);
    // Enter di editor menjalankan kode
    tabs.forEach(function (t) {
      editors[t].ed.ta.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); self._run(true); }
      });
    });
  };

  ChallengeView.prototype._collect = function () {
    var out = {}; for (var t in this.editors) out[t] = this.editors[t].ed.getValue();
    return out;
  };
  ChallengeView.prototype._onEdit = function () {
    var self = this; clearTimeout(this._deb);
    this._deb = setTimeout(function () { self._run(false); }, 500);
  };
  ChallengeView.prototype._run = function (manual) {
    var c = this._collect();
    this.preview.render(c.html || '', c.css || '', c.js || '');
    this._validate(manual);
  };
  ChallengeView.prototype._validate = function (manual) {
    var self = this, checks = this.ch.checks || [];
    if (!checks.length) { this.checkList.innerHTML = ''; return; }
    this.preview.runChecks(checks, function (results) {
      self._renderChecks(results);
    });
  };
  ChallengeView.prototype._renderChecks = function (results) {
    var self = this, allPass = true, html = '';
    results.forEach(function (r) {
      var def = (self.ch.checks || []).filter(function (c) { return c.id === r.id; })[0] || {};
      if (!r.pass) allPass = false;
      html += '<li class="' + (r.pass ? 'pass' : 'fail') + '"><span class="ck-ic">' + (r.pass ? '✓' : '○') + '</span>' +
        '<span>' + esc(def.desc || def.label || r.id) + (r.pass ? '' : '<em class="ck-hint"> — ' + esc(r.msg || '') + '</em>') + '</span></li>';
    });
    this.checkList.innerHTML = html;

    // lint tambahan (hanya saat belum lulus, agar tidak menakuti)
    if (!allPass && !this.completed) {
      var c = this._collect(), lint = [];
      if (this.lang.indexOf('html') >= 0) lint = lint.concat(lintHtml(c.html));
      if (this.lang.indexOf('css') >= 0) lint = lint.concat(lintCss(c.css));
      this.statusEl.innerHTML = lint.length ? '<span class="lint">🔎 ' + esc(lint[0]) + '</span>' : '';
    } else {
      this.statusEl.innerHTML = '';
    }

    if (allPass && !this.completed) {
      this.completed = true;
      this.nextBtn.hidden = false;
      this.statusEl.innerHTML = '<span class="done">Semua syarat terpenuhi! 🎉</span>';
      if (global.tutorCelebrate) global.tutorCelebrate();
      if (global.TutorEvents) global.TutorEvents.emit('challenge:done');
    }
  };
  ChallengeView.prototype._reset = function () {
    var self = this;
    tutorConfirm({ title: 'Reset ke kode awal?', body: 'Perubahanmu akan hilang dan diganti kode bawaan pelajaran.', okLabel: 'Ya, reset' }).then(function (yes) {
      if (!yes) return;
      for (var t in self.editors) self.editors[t].ed.setValue((self.ch.starterCode && self.ch.starterCode[t]) || '');
      self._run(false);
    });
  };
  ChallengeView.prototype._hint = function () {
    var hints = this.ch.hints || [];
    if (!hints.length) { this.hintBox.hidden = false; this.hintBox.innerHTML = '<p class="muted">Belum ada petunjuk untuk tantangan ini.</p>'; return; }
    this.hintLevel = Math.min(this.hintLevel + 1, hints.length);
    this.hintBox.hidden = false;
    this.hintBox.innerHTML = '<p class="hint-k">Petunjuk (' + this.hintLevel + '/' + hints.length + ')</p>' +
      hints.slice(0, this.hintLevel).map(function (h) { return '<p>' + h + '</p>'; }).join('');
    if (global.TutorEvents) global.TutorEvents.emit('hint:used');
  };
  ChallengeView.prototype._solution = function () {
    var self = this;
    tutorConfirm({
      title: 'Buka solusi?',
      body: 'Ini akan menampilkan jawaban lengkap. XP tantangan tetap didapat, tapi kamu tidak latihan sendiri. Yakin ingin lanjut? (Coba dulu minimal beberapa kali ya.)',
      okLabel: 'Ya, tampilkan solusi'
    }).then(function (yes) {
      if (!yes) return;
      var sol = self.ch.solution || {};
      for (var t in self.editors) if (sol[t] != null) self.editors[t].ed.setValue(sol[t]);
      self.solutionShown = true;
      self._run(false);
      self.statusEl.innerHTML = '<span class="muted">Solusi dimuat. Tekan ▶ Jalankan lalu pahami barisnya.</span>';
    });
  };
  ChallengeView.prototype._copy = function () {
    var c = this._collect();
    var text = ['html', 'css', 'js'].filter(function (t) { return c[t]; }).map(function (t) { return c[t]; }).join('\n\n/* ---- */\n\n');
    if (navigator.clipboard) navigator.clipboard.writeText(text); else { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    tutorToast('Kode disalin.', 'success');
  };
  ChallengeView.prototype._download = function () {
    var c = this._collect();
    var doc = '<!DOCTYPE html>\n<html lang="id">\n<head>\n<meta charset="UTF-8">\n<title>Hasil belajarku</title>\n' +
      (c.css ? '<style>\n' + c.css + '\n</style>\n' : '') + '</head>\n<body>\n' + (c.html || '') + '\n' +
      (c.js ? '<script>\n' + c.js + '\n<\/script>\n' : '') + '</body>\n</html>';
    var blob = new Blob([doc], { type: 'text/html' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'hasil-belajar.html'; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 500);
    tutorToast('Berkas hasil-belajar.html diunduh.', 'success');
  };
  ChallengeView.prototype._log = function (lvl, args) {
    if (!this.consoleBody) return;
    var line = document.createElement('div'); line.className = 'con-line con-' + lvl;
    line.textContent = (lvl === 'error' ? ' ' : lvl === 'warn' ? '⚠ ' : '› ') + (args || []).join(' ');
    this.consoleBody.appendChild(line);
    this.consoleBody.scrollTop = this.consoleBody.scrollHeight;
  };
  ChallengeView.prototype.destroy = function () { if (this.preview) this.preview.destroy(); };

  global.TutorEditor = {
    CodeEditor: CodeEditor, Preview: Preview, ChallengeView: ChallengeView,
    highlight: highlight, lintHtml: lintHtml, lintCss: lintCss, esc: esc
  };
})(window);
