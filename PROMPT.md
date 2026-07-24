# Claude Code prompt — RLP Agency Console (Home + Settings)

Copy everything below the line into Claude Code as your task prompt. The two reference files in `reference/` show the exact intended look and behavior; recreate them faithfully in **plain, framework-free HTML, CSS, and JavaScript**.

---

## Task

Recreate two screens of an agency console web app **exactly** as shown in the reference prototypes, using **vanilla HTML, CSS, and JavaScript only** (no React, no build step, no framework). Produce clean, production-quality, well-structured code I can extend into more screens.

Deliver this file structure:

```
/index.html          → Agency Home ("screen 9")
/settings.html       → Settings
/css/app.css         → shared styles for both pages (chrome, tokens, components)
/js/toolbar.js       → the shared customizable toolbar behavior
/assets/tyler-t.png  → tenant logo (provided in reference/)
```

Both pages share the same header + customizable toolbar, so factor that chrome into shared CSS and one shared JS module used by both pages.

### Reference files (in `reference/`)
- `Agency Home.dc.html` — the Home screen. **Ignore the `<x-dc>`, `<helmet>`, `support.js`, and `data-dc-script` wrappers** — those are prototype-runtime scaffolding. The screen to build is the option with `id="9a"` (the Font Awesome icon version). Its logic (the `class Component` block near the bottom) is the exact spec for the toolbar behavior — port that logic to vanilla JS.
- `Settings.dc.html` — the Settings screen. Same header/toolbar chrome, plus a settings body.
- `tyler-t.png` — the logo bitmap.

These are **design references**, not code to paste. Rebuild them in the structure above.

---

## Global design tokens

**Fonts** (load from Google Fonts):
- UI text: **Public Sans** — `@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;900&display=swap')`
- Icons: **Font Awesome 6.5.1 Free** — `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">`

**Colors**
| Token | Hex | Use |
|---|---|---|
| Header navy | `#162e51` | top header bar, tile titles |
| Toolbar navy | `#1b3763` | customizable toolbar bar |
| Gold accent | `#e6a817` | active tab underline, count badges |
| Gold on-badge text | `#3d2a00` | text inside gold badges |
| Gold icon | `#a97400` | tile / menu icons, warning accent |
| Primary blue | `#005ea2` | links, search focus border, Search button, active toggle |
| Link hover | `#1a4480` | link hover |
| Page bg | `#f0eee9` | body background behind the 1280px app |
| Surface white | `#ffffff` | app + content background |
| Tile bg | `#fafafa` | quick-action / settings tiles |
| Border | `#dfe1e6` | tile & panel borders |
| Hairline | `#eceef1` / `#e6e9ec` | dividers |
| Text primary | `#1b1b1b` | body headings/text |
| Text secondary | `#565c65` | supporting text, overlines |
| Toolbar text idle | `#cdd9ea` | inactive toolbar links |
| Toolbar text on-dark | `#dbe4f0` | header right-side links |
| Header divider | `#3d557d` | `|` separators in header |

**Radii:** tiles/panels `8px`, toolbar pills & buttons `6px`, chips `20px` (pill), small chips `4px`.
**Shadows:** dropdown menu `0 10px 28px rgba(0,0,0,.22)`.
**App width:** fixed `1280px`, centered (`margin:0 auto`) on the page background. Content padding is edge-aligned at `32px` horizontal.

**Type scale (Public Sans):**
- Page title ("Good morning, Dana." / "Settings"): `21px / 700`, color `#1b1b1b`
- Sub-date: `13px / 400`, `#565c65`
- Section overline ("QUICK ACTIONS"): `12px / 700`, `letter-spacing:.5px`, uppercase, `#565c65`
- Tile title: `16px / 700`, `#162e51`
- Tile body: `13.5px / 400`, `line-height:1.5`, `#565c65`
- Toolbar pill label: `14px / 600`
- Header brand: `15px / 600`; header links `13px / 400`

---

## Shared chrome (top of both pages)

### 1. Header bar
- Height `52px`, background `#162e51`, color `#fff`, padding `0 28px`, flex space-between.
- Left: `tyler-t.png` logo `26×26px` + brand text "Name of Tenant" (`15px/600`).
- Right: four text links separated by `|` (color `#3d557d`): **Settings · Search · Help · Logout** (`13px`, color `#dbe4f0`, no underline). "Settings" links to `settings.html`; the logo/brand and "Home" behavior links to `index.html`.

### 2. Customizable toolbar
Background `#1b3763`, `min-height:48px`, `padding:0 8px`, `position:relative`, flex row, items never wrap.

**Structure (left→right):** optional left chevron · scrollable pill track · optional right chevron · (edit mode only) "+ Add" button · "Customize/Done" button · (conditional) Add-menu dropdown.

**Pills** (the nav links). Two visual modes:
- *Default mode:* height `48px`, padding `0 15px`, gap `7px`, `14px/600`, `white-space:nowrap`. Active pill: text `#fff`, `border-bottom:3px solid #e6a817`, `background:rgba(255,255,255,.07)`. Inactive: text `#cdd9ea`, transparent.
- *Edit mode:* pill becomes a draggable chip — height `34px`, `margin:7px 3px`, `border-radius:6px`, `background:rgba(255,255,255,.10)`, `border:1px dashed rgba(255,255,255,.4)`, color `#eaf0f8`, `cursor:grab`. Shows a leading grip icon (`fa-grip-vertical`, `#8ba3c7`) and a trailing remove ✕ (`fa-xmark`, `#c9d6ea`).
- Each pill: Font Awesome icon (`16px`) + label. If the item has a badge, show a gold count badge (`#e6a817` bg, `#3d2a00` text, `11px/700`, `border-radius:9px`, `padding:1px 7px`) — hide badges while in edit mode.

**Chevrons** appear only when the track overflows (see behavior). Each: `34px` wide, full height, `background:rgba(0,0,0,.18)`, color `#dbe4f0`, chevron icon `16px`, `cursor:pointer`.

**"+ Add" button** (edit mode only): height `34px`, `margin:7px 3px`, dashed border `1px #5b7cb0`, transparent bg, color `#a9c7e8`, `fa-plus` + "Add", `13.5px/600`, `border-radius:6px`.

**"Customize" button** (always visible, far right): height `34px`, `margin:7px 0`, `border-radius:6px`, `13px/600`.
- Idle: transparent bg, `1px solid #3d557d` border, color `#cdd9ea`, icon `fa-sliders`, label "Customize".
- Active (in edit mode): `background:#e6a817`, color `#3d2a00`, `1px solid #e6a817`, icon `fa-check`, label "Done".

**Add-menu dropdown** (shown when "+ Add" is clicked): absolutely positioned `top:100%; left:16px; margin-top:6px`, width `320px`, white, `1px solid #dfe1e6`, `border-radius:8px`, shadow `0 10px 28px rgba(0,0,0,.22)`, `padding:10px`, `z-index:30`.
- Heading "ADD TO TOOLBAR" (`11px/700`, `letter-spacing:.5px`, `#565c65`).
- One row per catalog item not already on the toolbar: `fa` icon (`16px`, `#a97400`, `20px` fixed width) + label (`13.5px`) + trailing `fa-plus` (`#565c65`). Row hover highlight. Clicking a row adds it to the end of the toolbar and closes the menu.
- If everything is already added, show "All links are already on your toolbar." centered.

### Toolbar catalog (id → label, Font Awesome icon, optional badge)
```
home         → Home            fa-solid fa-house
tasks        → My Tasks        fa-solid fa-list-check      badge 12
queues       → Queues          fa-solid fa-inbox           badge 48
constituents → Constituents    fa-solid fa-users
licenses     → License Types   fa-solid fa-id-badge
applications → Applications    fa-solid fa-file-lines
metrics      → Metrics         fa-solid fa-chart-column
casemgmt     → Case Management fa-solid fa-folder-open
flags        → Flags           fa-solid fa-flag
inspections  → Inspections     fa-solid fa-clipboard-check
denials      → Denials         fa-solid fa-ban
appeals      → Appeals         fa-solid fa-gavel
correspondence → Correspondence fa-solid fa-envelope
```
**Default toolbar order:** `home, tasks, queues, constituents, licenses, applications, metrics`. The remaining catalog entries are what appears in the Add menu.

---

## Toolbar behavior (port this logic exactly to `js/toolbar.js`)

State: `items` (array of catalog keys, ordered), `active` (key or null), `editing` (bool), `addOpen` (bool), `dragKey` (key being dragged), `canLeft`/`canRight` (chevron visibility).

- **Customize toggle:** flips `editing`; always closes the Add menu when toggled.
- **Select:** clicking a pill in default mode sets `active` to that key. No navigation needed for the prototype (single active-highlight is enough), but wire Home→`index.html` and Settings entry via the header.
- **Add:** appends the key to the end of `items`, closes the menu.
- **Remove (✕):** removes the key from `items`; if it was active, move active to the first remaining item (or null). Stop propagation so it doesn't also select.
- **Reorder (drag & drop):** HTML5 drag. `dragstart` records `dragKey`. `dragover` calls `preventDefault`. `drop` on a target pill removes `dragKey` from the array and reinserts it at the target's index. Only draggable in edit mode.
- **Overflow / chevrons:** the pill track has `overflow-x:hidden` and never wraps. After any change and on `window.resize`, measure the track: `canLeft = scrollLeft > 2`; `canRight = scrollLeft < scrollWidth - clientWidth - 2`. Show a chevron on each side only when its flag is true.
- **Chevron scroll (one link at a time):** on right-chevron, find the first child whose right edge is past the track's right edge and scroll so it becomes flush (or scroll to end); on left-chevron, find the last child whose left edge is before the track's left edge and align it (or scroll to 0). Clamp `scrollLeft` to `[0, scrollWidth - clientWidth]`, then recompute chevron flags.
- **Persistence:** save `items` (and optionally `active`) to `localStorage` under a key like `rlp.toolbar.v1` and restore on load, so a customized layout survives reload. Never wipe unrelated storage.

Re-render the toolbar from state after every mutation. Keep it a small self-contained module that both pages initialize with the same code.

---

## Page 1 — Agency Home (`index.html`)

Below the shared chrome, content on white background, `min-height:600px`.

**A. Greeting block** — padding `26px 32px 22px`:
- "Good morning, Dana." (`21px/700`, `#1b1b1b`)
- "Wednesday, July 23" (`13px/400`, `#565c65`, `margin-top:2px`)

**B. Search panel** — `margin-top:16px`, `background:#fafafa`, `1px solid #dfe1e6`, `border-radius:8px`, `padding:18px 20px`:
- Top row (flex space-between, `margin-bottom:12px`):
  - **Type toggle** — inline segmented control, `1px solid #c9ccd0`, `border-radius:6px`, `overflow:hidden`. Four segments: **Constituent** (active: `background:#005ea2`, `#fff`, `600`), Invoice, License, Submission (inactive: white bg, `#1b1b1b`, `13px`, `border-left:1px solid #c9ccd0`). Clicking a segment moves the active state.
  - **"Advanced search"** link on the right (`13px/600`, `#005ea2`) + `fa-chevron-down` (`12px`). No target needed yet.
- Field row (flex, `gap:10px`):
  - Search box: `flex:1`, `border:2px solid #005ea2`, `border-radius:8px`, `padding:11px 15px`, gap `10px`, white bg. Leading `fa-magnifying-glass` (`17px`, `#005ea2`), placeholder text "Last name, first name, business, DBA, license #, or email…" (`14.5px`, `#565c65`), trailing "⌘K" chip (`11px`, `1px solid #c9ccd0`, `border-radius:4px`, `padding:2px 7px`). Make it a real focusable `<input>` styled to match (border stays blue).
  - **Search button:** `background:#005ea2`, `#fff`, `border-radius:8px`, `padding:0 26px`, `14.5px/700`, centered.

**C. Quick actions** — padding `0 32px 32px`:
- Overline "QUICK ACTIONS".
- Grid `repeat(3,1fr)`, `gap:18px`. Each tile: `background:#fafafa`, `1px solid #dfe1e6`, `border-radius:8px`, `padding:20px 22px`, `min-height:170px`, flex column. Header row = icon (`20px`, `#a97400`, `24px` fixed width) + title (`16px/700`, `#162e51`). Body text (`13.5px`, `#565c65`, `flex:1`).
- **Two tile types:**
  - *Single-action tiles* (the whole tile is one `<a>`, `cursor:pointer`, no footer): **Create Constituent Account** (`fa-user-plus`, "Set up a new constituent account on their behalf."), **Metrics** (`fa-chart-column`, "View available reports for your agency.").
  - *Multi-action tiles* (footer with a top divider `1px solid #eceef1`, `margin-top:14px; padding-top:12px`, two links `13.5px/600` `#162e51`, spaced between):
    - **Submit Constituent Application** (`fa-paper-plane`, "Submit an application on behalf of a constituent.") → links **Start Submission** / **Continue Submission**.
    - **License Types** (`fa-id-badge`, "Set up licenses for use in applications.") → **Create New** / **View All**.
    - **Applications** (`fa-file-lines`, "View your applications or start a new one.") → **Start New Application** / **All Applications**.
- Tile order (5 tiles, 3-col grid): Create Constituent Account · Submit Constituent Application · Metrics · License Types · Applications.

---

## Page 2 — Settings (`settings.html`)

Same header + toolbar. Content on white, `padding:26px 32px 40px`, `min-height:640px`.

- Title "Settings" (`21px/700`, `#1b1b1b`).
- Body `margin-top:24px`, flex row `gap:40px`, align-items flex-start.

**Left category rail** (`width:300px`, flex:none):
- "All settings" header — `border-left:3px solid #162e51`, `padding:2px 0 2px 14px`, `16px/700`, `#1b1b1b`.
- Below (`margin-top:6px`), a vertical list. Each row: flex space-between, `padding:12px 2px 12px 17px`, `15px`, `border-bottom:1px solid #e6e9ec`. Left label is a link (`#005ea2`), right is a count (`#565c65`).
  - Agency Information · 4
  - Application Processing · 3
  - Communications · 1
  - System Administration · 3

**Right tile grid** (`flex:1`, grid `repeat(3,1fr)`, `gap:22px`): 11 tiles. Each tile is an `<a>`: `background:#fafafa`, `1px solid #dfe1e6`, `border-radius:8px`, `padding:24px 26px`, `max-height:120px`, flex column, `cursor:pointer`. Title (`16px/700`, `#162e51`, `margin-bottom:8px`) + description (`13.5px`, `#565c65`, `line-height:1.5`). Tiles, in order:
```
Agency Profile        — View and Edit Agency Profile.
Appeals               — View, Edit and Add Appeals Information
Application Contact   — View and Edit Agency Contact Information
Assets                — View and Edit Assets
Configurations        — View Agency Configurations
Correspondence        — View, Edit and Add Email and Letter Templates.
Denials               — View, Edit and Add Denial Information
Inspections           — View and Manage Inspections
Key Contacts          — View, Edit and Add Agency Key Contacts
Logs                  — View Log Information
Users/Groups          — View and Edit Agency Users and Groups
```

---

## Quality bar
- Pixel-faithful to the references: exact colors, sizes, spacing, radii, and copy above.
- Semantic HTML, accessible focus states, keyboard-operable buttons/toggles.
- No frameworks or bundlers — just the three CDN links (Public Sans, Font Awesome) and your own CSS/JS.
- Shared chrome (header + toolbar CSS, `toolbar.js`) must be identical and reused across both pages so more pages can be added the same way.
- Keep the code organized and commented enough that I can add screens (My Tasks, Queues, Constituents, Applications, etc.) using the same shell.
