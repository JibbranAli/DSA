/**
 * Practice & Playground — Problem definitions
 * Easy = 10 pts, Medium = 20 pts, Hard = 30 pts
 */

window.PRACTICE_PROBLEMS = [
  // —— EASY ——
  {
    id: 'sum-two-numbers',
    title: 'Sum of Two Numbers',
    difficulty: 'easy',
    points: 10,
    statement: 'Write a program that takes two numbers as input and prints their sum. Read the two numbers using <code>input()</code> (one per line or space-separated) and print the sum.',
    examples: [
      { input: '5\n3', output: '8' },
      { input: '10\n-2', output: '8' }
    ],
    sampleInput: '5\n3',
    sampleOutput: '8',
    starterCode: '# Read two numbers and print their sum\na = int(input())\nb = int(input())\nprint(a + b)',
    testCases: [
      { input: '5\n3', expected: '8' },
      { input: '10\n-2', expected: '8' },
      { input: '0\n0', expected: '0' },
      { input: '100\n200', expected: '300' }
    ]
  },
  {
    id: 'max-in-list',
    title: 'Find Maximum in List',
    difficulty: 'easy',
    points: 10,
    statement: 'Given a list of integers, find and print the maximum value. The first line of input is <code>n</code> (number of elements), the next line has <code>n</code> space-separated integers.',
    examples: [
      { input: '5\n3 7 2 9 1', output: '9' },
      { input: '3\n-1 -5 -3', output: '-1' }
    ],
    sampleInput: '5\n3 7 2 9 1',
    sampleOutput: '9',
    starterCode: 'n = int(input())\narr = list(map(int, input().split()))\n# Print the maximum value\nprint(max(arr))',
    testCases: [
      { input: '5\n3 7 2 9 1', expected: '9' },
      { input: '3\n-1 -5 -3', expected: '-1' },
      { input: '1\n42', expected: '42' },
      { input: '4\n10 10 10 10', expected: '10' }
    ]
  },
  {
    id: 'count-even-numbers',
    title: 'Count Even Numbers',
    difficulty: 'easy',
    points: 10,
    statement: 'Given a list of integers, count how many of them are even and print that count. First line: <code>n</code>. Second line: <code>n</code> space-separated integers.',
    examples: [
      { input: '5\n2 3 4 5 6', output: '3' },
      { input: '3\n1 3 5', output: '0' }
    ],
    sampleInput: '5\n2 3 4 5 6',
    sampleOutput: '3',
    starterCode: 'n = int(input())\narr = list(map(int, input().split()))\ncount = 0\nfor x in arr:\n    if x % 2 == 0:\n        count += 1\nprint(count)',
    testCases: [
      { input: '5\n2 3 4 5 6', expected: '3' },
      { input: '3\n1 3 5', expected: '0' },
      { input: '4\n2 4 6 8', expected: '4' },
      { input: '1\n7', expected: '0' }
    ]
  },
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'easy',
    points: 10,
    statement: 'Read a string and print its reverse. Use a single line of input.',
    examples: [
      { input: 'hello', output: 'olleh' },
      { input: 'python', output: 'nohtyp' }
    ],
    sampleInput: 'hello',
    sampleOutput: 'olleh',
    starterCode: 's = input().strip()\nprint(s[::-1])',
    testCases: [
      { input: 'hello', expected: 'olleh' },
      { input: 'python', expected: 'nohtyp' },
      { input: 'a', expected: 'a' },
      { input: '12345', expected: '54321' }
    ]
  },
  {
    id: 'sum-list',
    title: 'Sum of List Elements',
    difficulty: 'easy',
    points: 10,
    statement: 'Given <code>n</code> and then <code>n</code> space-separated integers, print the sum of all elements.',
    examples: [
      { input: '4\n1 2 3 4', output: '10' }
    ],
    sampleInput: '4\n1 2 3 4',
    sampleOutput: '10',
    starterCode: 'n = int(input())\narr = list(map(int, input().split()))\nprint(sum(arr))',
    testCases: [
      { input: '4\n1 2 3 4', expected: '10' },
      { input: '1\n5', expected: '5' },
      { input: '3\n0 0 0', expected: '0' }
    ]
  },
  // —— MEDIUM ——
  {
    id: 'linear-search',
    title: 'Linear Search',
    difficulty: 'medium',
    points: 20,
    statement: 'Given a list and a target value, find the index of the first occurrence of the target. First line: <code>n</code>. Second: <code>n</code> space-separated integers. Third: target. Print the index (0-based) or <code>-1</code> if not found.',
    examples: [
      { input: '5\n10 20 30 20 50\n20', output: '1' },
      { input: '3\n1 2 3\n5', output: '-1' }
    ],
    sampleInput: '5\n10 20 30 20 50\n20',
    sampleOutput: '1',
    starterCode: 'n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\nfor i in range(n):\n    if arr[i] == target:\n        print(i)\n        break\nelse:\n    print(-1)',
    testCases: [
      { input: '5\n10 20 30 20 50\n20', expected: '1' },
      { input: '3\n1 2 3\n5', expected: '-1' },
      { input: '1\n7\n7', expected: '0' },
      { input: '4\n5 5 5 5\n5', expected: '0' }
    ]
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'medium',
    points: 20,
    statement: 'Given a sorted list and a target, find the index of the target using binary search. First line: <code>n</code>, then <code>n</code> sorted integers, then target. Print index or <code>-1</code>.',
    examples: [
      { input: '5\n1 3 5 7 9\n5', output: '2' },
      { input: '4\n2 4 6 8\n5', output: '-1' }
    ],
    sampleInput: '5\n1 3 5 7 9\n5',
    sampleOutput: '2',
    starterCode: 'n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\nlo, hi = 0, n - 1\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if arr[mid] == target:\n        print(mid)\n        break\n    if arr[mid] < target:\n        lo = mid + 1\n    else:\n        hi = mid - 1\nelse:\n    print(-1)',
    testCases: [
      { input: '5\n1 3 5 7 9\n5', expected: '2' },
      { input: '4\n2 4 6 8\n5', expected: '-1' },
      { input: '1\n10\n10', expected: '0' },
      { input: '3\n1 2 3\n2', expected: '1' }
    ]
  },
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from List',
    difficulty: 'medium',
    points: 20,
    statement: 'Given <code>n</code> and <code>n</code> space-separated integers, print the list with duplicates removed, preserving order of first occurrence. Output space-separated on one line.',
    examples: [
      { input: '6\n1 2 2 3 2 1', output: '1 2 3' }
    ],
    sampleInput: '6\n1 2 2 3 2 1',
    sampleOutput: '1 2 3',
    starterCode: 'n = int(input())\narr = list(map(int, input().split()))\nseen = set()\nresult = []\nfor x in arr:\n    if x not in seen:\n        seen.add(x)\n        result.append(x)\nprint(" ".join(map(str, result)))',
    testCases: [
      { input: '6\n1 2 2 3 2 1', expected: '1 2 3' },
      { input: '3\n5 5 5', expected: '5' },
      { input: '4\n1 2 3 4', expected: '1 2 3 4' }
    ]
  },
  {
    id: 'count-frequency',
    title: 'Count Frequency Using Dictionary',
    difficulty: 'medium',
    points: 20,
    statement: 'Given <code>n</code> and <code>n</code> space-separated integers, for each unique value print the value and its count in the format <code>value count</code>, one per line, in order of first appearance.',
    examples: [
      { input: '6\n1 2 1 2 3 1', output: '1 3\n2 2\n3 1' }
    ],
    sampleInput: '6\n1 2 1 2 3 1',
    sampleOutput: '1 3\n2 2\n3 1',
    starterCode: 'n = int(input())\narr = list(map(int, input().split()))\nfreq = {}\nfor x in arr:\n    freq[x] = freq.get(x, 0) + 1\nfor x in arr:\n    if freq.get(x):\n        print(x, freq[x])\n        freq[x] = 0',
    testCases: [
      { input: '6\n1 2 1 2 3 1', expected: '1 3\n2 2\n3 1' },
      { input: '1\n5', expected: '5 1' },
      { input: '3\n1 1 1', expected: '1 3' }
    ]
  },
  // —— HARD ——
  {
    id: 'bubble-sort',
    title: 'Implement Bubble Sort',
    difficulty: 'hard',
    points: 30,
    statement: 'Given <code>n</code> and <code>n</code> space-separated integers, sort the list using bubble sort and print the sorted list space-separated.',
    examples: [
      { input: '5\n5 2 8 1 9', output: '1 2 5 8 9' }
    ],
    sampleInput: '5\n5 2 8 1 9',
    sampleOutput: '1 2 5 8 9',
    starterCode: 'n = int(input())\narr = list(map(int, input().split()))\nfor i in range(n):\n    for j in range(0, n - 1 - i):\n        if arr[j] > arr[j + 1]:\n            arr[j], arr[j + 1] = arr[j + 1], arr[j]\nprint(" ".join(map(str, arr)))',
    testCases: [
      { input: '5\n5 2 8 1 9', expected: '1 2 5 8 9' },
      { input: '1\n1', expected: '1' },
      { input: '3\n3 2 1', expected: '1 2 3' }
    ]
  },
  {
    id: 'second-largest',
    title: 'Find Second Largest Element',
    difficulty: 'hard',
    points: 30,
    statement: 'Given <code>n</code> and <code>n</code> distinct integers, find and print the second largest value. Assume n >= 2.',
    examples: [
      { input: '5\n3 7 2 9 5', output: '7' }
    ],
    sampleInput: '5\n3 7 2 9 5',
    sampleOutput: '7',
    starterCode: 'n = int(input())\narr = list(map(int, input().split()))\narr.sort()\nprint(arr[-2])',
    testCases: [
      { input: '5\n3 7 2 9 5', expected: '7' },
      { input: '2\n1 2', expected: '1' },
      { input: '4\n10 20 30 40', expected: '30' }
    ]
  },
  {
    id: 'pattern-nested-loop',
    title: 'Simple Pattern (Nested Loop)',
    difficulty: 'hard',
    points: 30,
    statement: 'Read an integer <code>n</code> (1 <= n <= 10). Print <code>n</code> lines: line <code>i</code> should have <code>i</code> asterisks (*). Example: n=3 gives *\\n**\\n***',
    examples: [
      { input: '3', output: '*\n**\n***' },
      { input: '1', output: '*' }
    ],
    sampleInput: '3',
    sampleOutput: '*\n**\n***',
    starterCode: 'n = int(input())\nfor i in range(1, n + 1):\n    print("*" * i)',
    testCases: [
      { input: '3', expected: '*\n**\n***' },
      { input: '1', expected: '*' },
      { input: '4', expected: '*\n**\n***\n****' }
    ]
  }
];

// Helpers
window.getProblemById = function (id) {
  return window.PRACTICE_PROBLEMS.find(function (p) { return p.id === id; });
};
window.getProblemsByLevel = function (level) {
  return window.PRACTICE_PROBLEMS.filter(function (p) { return p.difficulty === level; });
};
window.getPointsForDifficulty = function (d) {
  return d === 'easy' ? 10 : d === 'medium' ? 20 : 30;
};
