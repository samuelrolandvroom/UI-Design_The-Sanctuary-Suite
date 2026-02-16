# Sanctuary Suite - The Narthex

> Digital sanctuary for church life unifying sermon study, ministry scheduling, and choir rehearsal

---

## Screens

| Screen | Description |
|--------|-------------|
| **The Narthex** | Dashboard with duties, sermon drafts, choir assignments |
| **Live Word** | Split-pane sermon notebook with transcript + notes |
| **Roster Grid** | Volunteer management calendar (Gantt-style) |
| **Choir Loft** | Multi-track rehearsal dashboard with waveforms |
| **Deep Read** | Immersive focus mode for scripture/notes |

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-ink-primary` | `#3A3A38` | Text, active states |
| `--color-ink-secondary` | `#4A4A46` | Body copy |
| `--color-paper-main` | `#F5F2EA` | Main background |
| `--color-paper-surface` | `#EBE6DA` | Cards, sidebars |
| `--color-accent` | `#8C3B3B` | Liturgical red |
| `--color-border` | `#D8D3C8` | Subtle dividers |

### Typography

```
Font Display: Crimson Text (H1: 32px, H2: 24px)
Font Body:    EB Garamond (18px, line-height 1.6)
Font UI:      Jost (12px, uppercase, wide tracking)
Font Mono:    Space Mono (12px, timestamps)
```

### Style Rules

- **No shadows:** Depth via borders + color shifts
- **Matte finish:** Fade-in animations only
- **Ink bleed:** Never pure black, use `#3A3A38`

---

## Component Specifications

### 1. The Narthex (Team Hub)

**Layout:** 3-column masonry + sidebar (240px)

```
┌──────────┬─────────────────────────────────────────┐
│          │  ┌─────────────┐  ┌─────────────────┐  │
│ STUDY    │  │ Oct 20      │  │ Recent Notes    │  │
│ Serve    │  │ Sunday      │  │ "Grace in...    │  │
│ Sing     │  │ Greeter     │  │  Psalm 23       │  │
│          │  │ North Door  │  │  Oct 12         │  │
│          │  └─────────────┘  └─────────────────┘  │
│          ├─────────────────────────────────────────┤
│          │  ┌─────────────────────────────────┐   │
│          │  │  Choir Practice Widget          │   │
│          │  │  [▶ Resume Rehearsal]          │   │
│          │  └─────────────────────────────────┘   │
└──────────┴─────────────────────────────────────────┘
```

- **Sidebar:** Crimson Text headers, "Study, Serve, Sing"
- **Next Sunday Card:** Large serif date, assigned roles
- **Hover:** Border to `#9C9991`, text-select cursor

---

### 2. Live Word (Sermon Notebook)

**Layout:** Split screen - 40% Transcript / 60% Notes

```
┌──────────────────────────┬─────────────────────────┐
│ [● Recording]           │                         │
│                          │ ┌─────────────────────┐ │
│ 10:15 And lo, I say...  │ │ Note anchored to     │ │
│                          │ │ timestamp 10:15     │ │
│ 10:22 the word is near   │ │                     │ │
│                          │ │ [Add reflection...] │ │
│ ─────────────────────    │ │                     │ │
│  Scripture:             │ │                     │ │
│  *John 3:16* For God    │ │                     │ │
│  so loved the world... │ │                     │ │
│                          │ └─────────────────────┘ │
│                          │                         │
└──────────────────────────┴─────────────────────────┘
```

- **Transcript:** Active `#3A3A38`, past fades to `#9C9991`
- **Scripture:** Italic EB Garamond, indented
- **Timestamp Tag:** Space Mono, 10px, clickable
- **Verse Highlight:** `#EBE6DA` bg, 4px `#8C3B3B` left border

---

### 3. Roster Grid (Volunteer Management)

**Layout:** Horizontal scrolling Gantt-style ledger

```
┌────────────┬──────────┬──────────┬──────────┬──────┐
│            │ Oct 12   │ Oct 19   │ Oct 26   │ ...  │
├────────────┼──────────┼──────────┼──────────┼──────┤
│USHERS      │ [Avatar] │    +     │ [Avatar] │      │
│            │  John    │          │  Mary    │      │
├────────────┼──────────┼──────────┼──────────┼──────┤
│NURSERY     │    +     │ [Avatar] │    +     │      │
│            │          │  Sarah   │          │      │
├────────────┼──────────┼──────────┼──────────┼──────┤
│COFFEE      │ [Avatar] │ [Avatar] │    +     │      │
│            │  Mike    │  Anna    │          │      │
└────────────┴──────────┴──────────┴──────────┴──────┘
```

- **Role Headers:** Jost uppercase, sticky left
- **Slot Card:** Avatar + Name
- **States:** Unfilled (dotted +), Pending (grey ?), Confirmed (solid)
- **Conflict:** Diagonal hatch pattern

---

### 4. Choir Loft (Rehearsal Dashboard)

**Layout:** Sheet music + Audio deck

```
┌─────────────────────────────────────────────────────┐
│                   SHEET MUSIC                       │
│              [Lyrics with karaoke highlight]        │
├─────────────────────────────────────────────────────┤
│  M S │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  Soprano
│  M S │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  Alto
│  M S │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  Tenor
│  M S │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  Bass
├─────────────────────────────────────────────────────┤
│                      [ ▶ ]                         │
│  ━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
└─────────────────────────────────────────────────────┘
```

- **Waveform:** 4 stacked tracks (Soprano, Alto, Tenor, Bass)
- **Controls:** M (Mute), S (Solo) toggles
- **Solo Mode:** Selected track `#3A3A38`, others 20% opacity
- **Loop Region:** Draggable brackets

---

### 5. Deep Read (Focus Mode)

**Layout:** Single column, centered, max-width 700px

**Components:**

| Element | Description |
|---------|-------------|
| Text Body | EB Garamond 22px, justified |
| Marginalia | Margin icons, hover reveals note tooltip |
| Progress | Thin line at bottom showing scroll depth |
| Exit FAB | Bottom right, X icon, 50% opacity |

- **Select Text:** Context menu "Highlight, Copy, Prayer Request"
- **No UI:** No sidebar, no header

---

## Tech Stack

- **Framework:** React + Tailwind CSS

---

## Build Order

1. Live Word (typography + split-pane)
2. The Narthex (navigation + cards)
3. Choir Loft (audio visualization)
4. Roster Grid (complex layout)
5. Deep Read (simplification)

---

## Local Server

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

*Created by Samuel Roland Vroom*
