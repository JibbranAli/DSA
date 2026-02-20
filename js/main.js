/**
 * Python & DSA Learning Hub — Main script
 * Sidebar, progress, copy code, collapsible nav, scroll reveal
 */

(function () {
  'use strict';

  var LESSON_IDS = [
    'introduction', 'arrays', 'lists', 'tuples', 'sets', 'dictionaries',
    'file-handling', 'algorithms-basics', 'time-space-complexity',
    'linear-search', 'binary-search', 'bubble-sort', 'selection-sort',
    'insertion-sort', 'quick-sort', 'merge-sort', 'linked-lists', 'graph-dfs'
  ];
  var STORAGE_KEY = 'dsa-hub-completed';

  function getCompleted() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function setCompleted(id, done) {
    var o = getCompleted();
    o[id] = !!done;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
    } catch (e) {}
    return o;
  }

  function getProgress() {
    var completed = getCompleted();
    var count = 0;
    LESSON_IDS.forEach(function (id) {
      if (completed[id]) count++;
    });
    return { count: count, total: LESSON_IDS.length, pct: Math.round((count / LESSON_IDS.length) * 100) };
  }

  function updateSidebarProgress() {
    var wrap = document.getElementById('sidebar-progress');
    if (!wrap) return;
    var p = getProgress();
    var fill = wrap.querySelector('.sidebar-progress-fill');
    var text = wrap.querySelector('.sidebar-progress-text');
    if (fill) fill.style.width = p.pct + '%';
    if (text) text.textContent = p.count + ' / ' + p.total + ' completed';
  }

  function setActiveNav() {
    var path = window.location.pathname;
    var segments = path.split('/').filter(Boolean);
    var currentPage = segments.length <= 1 ? 'index.html' : (segments[segments.length - 1] || 'index.html');

    document.querySelectorAll('.nav-link[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var linkPage = href.split('/').filter(Boolean).pop() || 'index.html';
      link.classList.toggle('active', linkPage === currentPage);
    });
  }

  function initSidebarToggle() {
    var toggle = document.getElementById('sidebar-toggle');
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.getElementById('sidebar-overlay');

    if (!toggle || !sidebar) return;

    function open() {
      sidebar.classList.add('open');
      if (overlay) overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      if (sidebar.classList.contains('open')) close(); else open();
    });
    if (overlay) overlay.addEventListener('click', close);
    sidebar.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', close);
    });
  }

  function initCollapsibleNav() {
    document.querySelectorAll('.nav-group').forEach(function (group) {
      var toggle = group.querySelector('.nav-group-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', function () {
        group.classList.toggle('collapsed');
      });
    });
  }

  function wrapPreWithToolbar(pre) {
    if (pre.closest('.code-block-wrapper')) return;
    var code = pre.querySelector('code');
    if (!code) return;
    var filename = pre.getAttribute('data-filename') || 'code.py';
    var wrap = document.createElement('div');
    wrap.className = 'code-block-wrapper';
    wrap.setAttribute('data-filename', filename);
    wrap.innerHTML = '<div class="code-toolbar"><span class="code-filename">' + filename + '</span><button type="button" class="copy-btn">Copy</button></div>';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
  }

  function initCopyButtons() {
    document.querySelectorAll('.main pre').forEach(wrapPreWithToolbar);

    document.querySelectorAll('.code-block-wrapper').forEach(function (wrap) {
      var pre = wrap.querySelector('pre');
      var code = pre ? pre.querySelector('code') : null;
      var toolbar = wrap.querySelector('.code-toolbar');
      var btn = toolbar ? toolbar.querySelector('.copy-btn') : null;
      if (!btn || !code) return;

      btn.addEventListener('click', function () {
        var text = code.textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.classList.add('copied');
            btn.textContent = 'Copied!';
            setTimeout(function () {
              btn.classList.remove('copied');
              btn.textContent = 'Copy';
            }, 2000);
          });
        } else {
          var ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          btn.classList.add('copied');
          btn.textContent = 'Copied!';
          setTimeout(function () {
            btn.classList.remove('copied');
            btn.textContent = 'Copy';
          }, 2000);
        }
      });
    });
  }

  function initMarkComplete() {
    var btn = document.getElementById('mark-complete-btn');
    var lessonId = btn ? btn.getAttribute('data-lesson-id') : null;
    if (!btn || !lessonId) return;

    var completed = getCompleted()[lessonId];
    if (completed) btn.classList.add('done');
    btn.innerHTML = completed ? '✓ Completed' : 'Mark as completed';
    btn.addEventListener('click', function () {
      var o = setCompleted(lessonId, !getCompleted()[lessonId]);
      var done = o[lessonId];
      btn.classList.toggle('done', done);
      btn.innerHTML = done ? '✓ Completed' : 'Mark as completed';
      updateSidebarProgress();
    });
  }

  function initLessonProgress() {
    var lessonId = document.getElementById('mark-complete-btn');
    lessonId = lessonId ? lessonId.getAttribute('data-lesson-id') : null;
    if (!lessonId) return;

    var p = getProgress();
    var fill = document.querySelector('.lesson-progress-fill');
    var text = document.querySelector('.lesson-progress-text');
    if (fill) fill.style.width = p.pct + '%';
    if (text) text.textContent = p.pct + '% course complete';
  }

  function initScrollReveal() {
    var els = document.querySelectorAll('.scroll-reveal');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

    els.forEach(function (el) { observer.observe(el); });
  }

  function init() {
    setActiveNav();
    initSidebarToggle();
    initCollapsibleNav();
    initCopyButtons();
    initMarkComplete();
    initLessonProgress();
    updateSidebarProgress();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
