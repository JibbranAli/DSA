# Python & DSA Learning Hub

A premium, production-ready educational website for teaching **Python, Data Structures & Algorithms**. Built for GitHub Pages with a modern, clean UI and structured curriculum.

## What’s included

- **Home page** — Hero, “What you’ll learn”, “Who this is for”, curriculum cards  
- **Sidebar navigation** — All modules and lessons  
- **Lesson pages** — Introduction, Arrays (full content), Lists, Tuples, Sets, Dictionaries, File Handling, Algorithms Basics, Time & Space Complexity, Linear/Binary Search, Bubble/Selection/Insertion/Quick/Merge Sort, Linked Lists, Graph DFS  
- **UI** — Dark theme, code blocks, callouts (Tip/Note), tables, responsive layout with mobile sidebar toggle  

## Tech stack

- **HTML + CSS + JavaScript** — No build step, works everywhere  
- Relative paths — Works at site root or under a GitHub Pages subpath (e.g. `username.github.io/repo-name/`)  
- Fonts: DM Sans, JetBrains Mono (Google Fonts)  

## Run locally

1. Clone the repo and open the project folder.  
2. Serve the root folder with any static server, for example:
   - **Python 3:** `python -m http.server 8000` then open `http://localhost:8000`
   - **Node:** `npx serve .` or `npx live-server .`
3. Open `index.html` in a browser (file://) also works, but relative links are best tested with a server.

## Deploy on GitHub Pages

### Option A: Deploy from the root of the repo (recommended)

1. Push this project to a GitHub repository.  
2. In the repo: **Settings → Pages**.  
3. Under **Source**, choose **Deploy from a branch**.  
4. Branch: **main** (or **master**), folder: **/ (root)**.  
5. Save. After a minute or two, the site will be at:  
   `https://<username>.github.io/<repo-name>/`  
6. If you use a **project site** (e.g. `username.github.io/repo-name/`), links and active nav are written to work with that subpath.

### Option B: Use a separate branch or folder

- You can use the **gh-pages** branch and set Pages to deploy from that branch (copy the same files there).  
- Or move the site into a `docs/` folder and set Pages to **Deploy from branch** → **main** → **/docs**.  
  If you use `docs/`, update links so they still point to `index.html` and `lessons/...` relative to the root URL GitHub gives you.

## Content

- The **Arrays** lesson is fully written (1D/2D, traversal, insertion, deletion, update, pros/cons).  
- Other lessons have a clear structure and placeholders.  
- To finish the site, paste in (or type in) the exact content from your PDFs into the corresponding lesson pages so the teaching flow and code match your material.

## Folder structure

```
/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
└── lessons/
    ├── introduction.html
    ├── arrays.html
    ├── lists.html
    ├── tuples.html
    ├── sets.html
    ├── dictionaries.html
    ├── file-handling.html
    ├── algorithms-basics.html
    ├── time-space-complexity.html
    ├── linear-search.html
    ├── binary-search.html
    ├── bubble-sort.html
    ├── selection-sort.html
    ├── insertion-sort.html
    ├── quick-sort.html
    ├── merge-sort.html
    ├── linked-lists.html
    └── graph-dfs.html
```

## Adding a new lesson

1. Add a new HTML file in `lessons/` (e.g. `lessons/new-topic.html`).  
2. Copy the structure and sidebar from an existing lesson (e.g. `lessons/arrays.html`).  
3. Add a sidebar link in **every** page (index + all lessons), under the right section:
   ```html
   <a class="nav-link" href="new-topic.html">New Topic</a>
   ```
   Use `href="new-topic.html"` in other lesson files (same folder) and `href="lessons/new-topic.html"` in `index.html`.  
4. Optionally add a curriculum card on `index.html` linking to the new lesson.

---

**Python & DSA Learning Hub** — Ready for GitHub Pages. Push to GitHub, enable Pages, and your site goes live.
