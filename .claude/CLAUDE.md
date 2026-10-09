# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Additional Instructions
- git workflow @docs/git-instructions.md

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## Directory layout note

The actual project lives one level down, in `bucket-list-main/` (this nested folder name duplicates the repo root — likely an artifact of extracting a GitHub zip download). All source files, and the `README.md` with fuller documentation, are at:

```
bucket-list-main/index.html
bucket-list-main/css/styles.css
bucket-list-main/js/storage.js
bucket-list-main/js/app.js
```

## What this project is

A single-page "bucket list" tracker: add/edit/delete life-goal items, mark them complete, filter by status, and see live stats (total/completed/in-progress/completion rate). Pure client-side app — no backend, no build step, no package manager. Data persists only in the browser's LocalStorage.

## Running it

There is no build/lint/test tooling in this repo. To run the app, just serve or open `bucket-list-main/index.html`:

- Double-click `index.html` to open directly in a browser, or
- `python -m http.server 8000` from `bucket-list-main/` and visit `http://localhost:8000`, or
- VS Code "Live Server" extension on `index.html`.

Tailwind CSS is loaded via the CDN `<script>` tag in `index.html` (no local Tailwind config/build). `css/styles.css` only holds the handful of things Tailwind's utility classes can't express (keyframe animations, `.filter-btn.active` state, a dark-mode media query, mobile layout tweaks for `.bucket-item`).

There are no automated tests. Verify changes manually in a browser.

## Architecture

Two plain scripts, loaded in this order in `index.html`, split cleanly into a data layer and a UI layer:

1. **`js/storage.js` — `BucketStorage`**: a static-method object that is the *only* thing that touches `localStorage` (under key `bucketList`). Owns the item shape and all CRUD/derived-data logic: `load`/`save`, `addItem`, `updateItem`, `deleteItem`, `toggleComplete`, `getStats`, `getFilteredList(filter)`. Has no DOM dependency — treat it as the model layer.

2. **`js/app.js` — `BucketListApp`**: a class instantiated once as the global `app` on `DOMContentLoaded`. It caches DOM refs (`cacheElements`), wires all event listeners (`bindEvents`), and does full re-renders (`render()`) on every mutation rather than patching the DOM incrementally — there's no diffing/virtual-DOM, `render()` just regenerates the list's `innerHTML` from `BucketStorage.getFilteredList(...)`. Item buttons (`app.handleToggle(...)`, `app.openEditModal(...)`, `app.handleDelete(...)`) are wired via inline `onclick` attributes referencing the global `app`, not addEventListener — keep this pattern if adding new per-item actions, and remember `escapeHtml()` must be applied to any user text interpolated into that generated HTML (including inside the `onclick` attribute's inline JS string, which additionally escapes single quotes).

Item data shape (see `BucketStorage.addItem`):
```js
{ id: "<Date.now() as string>", title, completed: bool, createdAt: ISOString, completedAt: ISOString|null }
```

Filtering (`all` / `active` / `completed`) is state held on `app.currentFilter` and re-applied via `BucketStorage.getFilteredList()` on every render; it is not persisted.

The edit modal is a single shared DOM element toggled via `hidden`/`flex` classes, with `app.editingId` tracking which item is being edited.
