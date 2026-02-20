/**
 * Practice & Playground — State, Python runner (Pyodide), test runner, gamification
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'dsa-practice-state';
  var BADGES = [
    { name: 'Beginner', points: 50, emoji: '🥉' },
    { name: 'Intermediate', points: 150, emoji: '🥈' },
    { name: 'Pro', points: 300, emoji: '🥇' }
  ];

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { completed: {}, score: 0 };
    } catch (e) {
      return { completed: {}, score: 0 };
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function markSolved(problemId, points) {
    var state = loadState();
    if (state.completed[problemId]) return state;
    state.completed[problemId] = true;
    state.score = (state.score || 0) + points;
    saveState(state);
    return state;
  }

  function getDashboardStats() {
    var state = loadState();
    var problems = window.PRACTICE_PROBLEMS || [];
    var completed = state.completed || {};
    var solved = 0;
    var easyTotal = 0, easySolved = 0, mediumTotal = 0, mediumSolved = 0, hardTotal = 0, hardSolved = 0;
    problems.forEach(function (p) {
      if (p.difficulty === 'easy') { easyTotal++; if (completed[p.id]) easySolved++; }
      else if (p.difficulty === 'medium') { mediumTotal++; if (completed[p.id]) mediumSolved++; }
      else if (p.difficulty === 'hard') { hardTotal++; if (completed[p.id]) hardSolved++; }
      if (completed[p.id]) solved++;
    });
    var totalProblems = problems.length;
    var progressPct = totalProblems ? Math.round((solved / totalProblems) * 100) : 0;
    var score = state.score || 0;
    var badgeName = '—';
    for (var i = BADGES.length - 1; i >= 0; i--) {
      if (score >= BADGES[i].points) {
        badgeName = BADGES[i].emoji + ' ' + BADGES[i].name;
        break;
      }
    }
    return {
      score: score,
      solved: solved,
      totalProblems: totalProblems,
      progressPct: progressPct,
      badgeName: badgeName,
      easySolved: easySolved,
      easyTotal: easyTotal,
      mediumSolved: mediumSolved,
      mediumTotal: mediumTotal,
      hardSolved: hardSolved,
      hardTotal: hardTotal
    };
  }

  window.PracticeState = {
    loadState: loadState,
    saveState: saveState,
    markSolved: markSolved,
    getDashboardStats: getDashboardStats,
    isSolved: function (problemId) {
      return (loadState().completed || {})[problemId];
    }
  };

  // —— Pyodide runner (load on first use) ——
  var pyodideReady = null;

  function loadPyodide() {
    if (window.loadPyodide) {
      return window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' }).then(function (pyodide) {
        pyodideReady = pyodide;
        return pyodide;
      });
    }
    return Promise.reject(new Error('Pyodide not loaded'));
  }

  function runPythonCode(code, stdin) {
    if (!pyodideReady) {
      return loadPyodide().then(function (pyodide) {
        return runPythonWithPyodide(pyodide, code, stdin);
      });
    }
    return Promise.resolve(runPythonWithPyodide(pyodideReady, code, stdin));
  }

  function runPythonWithPyodide(pyodide, code, stdin) {
    var inputLines = (stdin || '').split('\n');
    var inputIndex = [0];
    pyodide.globals.set('_stdin_lines', inputLines);
    pyodide.globals.set('_stdin_index', inputIndex);
    var inputPatch = [
      'import sys',
      'class StdinMock:',
      '    def readline(self):',
      '        i = _stdin_index[0]',
      '        if i < len(_stdin_lines):',
      '            _stdin_index[0] += 1',
      '            return _stdin_lines[i] if _stdin_lines[i] else "\\n"',
      '        return ""',
      '    def read(self): return self.readline()',
      'sys.stdin = StdinMock()',
      '_buf = []',
      'class W:',
      '    def write(self, x): _buf.append(x)',
      '    def flush(self): pass',
      'sys.stdout = W()',
      'sys.stderr = W()',
      ''
    ].join('\n');
    var fullCode = inputPatch + code + '\n\n__output = "".join(_buf)';
    return pyodide.runPythonAsync(fullCode).then(function () {
      var out = pyodide.globals.get('__output');
      return out != null ? String(out) : '';
    }).catch(function (err) {
      return '[Error] ' + (err.message || String(err));
    });
  }

  window.runPythonCode = runPythonCode;
  window.runPythonCodeNeedsLoad = function () {
    if (!window.loadPyodide) return true;
    return !pyodideReady;
  };

  // —— Test runner (for Submit) ——
  function normalizeOutput(s) {
    return String(s).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  }

  function runTests(problem, code, onResult) {
    var testCases = problem.testCases || [];
    var results = [];
    var allPassed = true;
    var index = 0;

    function runNext() {
      if (index >= testCases.length) {
        onResult({ allPassed: allPassed, results: results });
        return;
      }
      var tc = testCases[index];
      runPythonCode(code, tc.input).then(function (output) {
        var normalized = normalizeOutput(output);
        var expected = normalizeOutput(tc.expected);
        var passed = normalized === expected;
        if (!passed) allPassed = false;
        results.push({ index: index + 1, passed: passed, expected: expected, actual: normalized });
        index++;
        runNext();
      }).catch(function (err) {
        results.push({ index: index + 1, passed: false, expected: tc.expected, actual: '[Error] ' + (err.message || String(err)) });
        allPassed = false;
        index++;
        runNext();
      });
    }
    runNext();
  }

  window.runPracticeTests = runTests;

  // —— Confetti ——
  function triggerConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      document.body.appendChild(canvas);
    }
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var particles = [];
    var colors = ['#38bdf8', '#818cf8', '#34d399', '#fbbf24', '#f472b6'];
    for (var i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 12 - 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4
      });
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = 0;
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        if (p.y < canvas.height + 20) {
          alive++;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });
      if (alive > 0) requestAnimationFrame(draw);
      else document.body.removeChild(canvas);
    }
    draw();
  }

  window.triggerPracticeConfetti = triggerConfetti;
})();
