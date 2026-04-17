# FocusForge ΓÇö Solution Repository

> **This is the reference solution for the FocusForge.**
> If you haven't attempted the challenge yet ΓÇö close this tab and go work through it first. Seriously.

---

## What Changed

The original `DashboardPage.jsx` was a 250+ line monolith. Every UI section, every handler, every style lived in one place. It worked ΓÇö but it was one bad sprint away from becoming a file nobody wants to touch.

This solution breaks that file into **7 focused components**, each with a single, clear responsibility.

---

## Project Structure

```
src/
Γö£ΓöÇΓöÇ pages/
Γöé   ΓööΓöÇΓöÇ DashboardPage.jsx          ΓåÉ State manager + composer only
Γö£ΓöÇΓöÇ components/
Γöé   Γö£ΓöÇΓöÇ dashboard/                 ΓåÉ Page-specific components
Γöé   Γöé   Γö£ΓöÇΓöÇ DashboardHeader.jsx    ΓåÉ Logo, nav, user avatar
Γöé   Γöé   Γö£ΓöÇΓöÇ StatsRow.jsx           ΓåÉ Grid of 4 stat cards
Γöé   Γöé   Γö£ΓöÇΓöÇ AddTaskInput.jsx       ΓåÉ Controlled input + add button
Γöé   Γöé   Γö£ΓöÇΓöÇ TaskFilterBar.jsx      ΓåÉ Filter tabs + search input
Γöé   Γöé   ΓööΓöÇΓöÇ TaskList.jsx           ΓåÉ List renderer + empty state
Γöé   ΓööΓöÇΓöÇ shared/                    ΓåÉ Reusable across any page
Γöé       Γö£ΓöÇΓöÇ StatCard.jsx           ΓåÉ Single metric card (used 4├ù)
Γöé       ΓööΓöÇΓöÇ TaskItem.jsx           ΓåÉ Single task row (used N├ù)
ΓööΓöÇΓöÇ data/
    ΓööΓöÇΓöÇ tasks.js                   ΓåÉ Seed data
```

---

## Component Responsibilities

### `DashboardPage.jsx`
Owns all state (`taskList`, `newTask`, `filter`, `searchQuery`). Derives computed values (`completedCount`, `progressPercent`, filtered list). Passes everything down as props. Contains zero JSX layout ΓÇö only composition.

### `DashboardHeader.jsx`
Renders the top navigation bar: logo, brand name, greeting, user avatar. Receives no props. Completely stateless.

### `StatsRow.jsx`
Renders the 4-column stats grid. Receives `total`, `completed`, `remaining`, `progressPercent` as props. Composes `StatCard` four times.

### `StatCard.jsx` *(shared)*
Renders a single metric card with label, value, subtext, and an optional progress bar. Accepts `showProgress` and `progressPercent` props for the progress variant. **Reusable** ΓÇö can appear in any page that needs a metric summary.

### `AddTaskInput.jsx`
Renders a labeled input field and an "Add Task" button. Accepts `value`, `onChange`, and `onAdd` as props. Handles Enter key internally. Contains no state.

### `TaskFilterBar.jsx`
Renders the three filter toggle buttons and the search input. Accepts `filter`, `onFilterChange`, `searchQuery`, `onSearchChange`. The filter labels are defined as a constant inside the component ΓÇö the only internal logic.

### `TaskList.jsx`
Receives a pre-filtered array of tasks and renders either the list or an empty state. Composes `TaskItem` for each task. Has no filtering logic of its own ΓÇö that lives in `DashboardPage`.

### `TaskItem.jsx` *(shared)*
Renders a single task row: checkbox, title, priority badge, tag badge, delete button. Accepts `task`, `onToggle`, `onDelete`. Priority color mapping is an internal constant. **Reusable** ΓÇö could appear in a sidebar, a modal, or a mobile view without changes.

---

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## Key Decisions Worth Understanding

**Why `shared/` vs `dashboard/`?**
Components in `shared/` have no knowledge of the dashboard context. `StatCard` just knows how to render a number with a label. `TaskItem` just knows how to render a task object. They could be dropped into any page. Components in `dashboard/` are purpose-built for this page and assume its data shape.

**Why does `DashboardPage` still own all the state?**
Because state should live at the lowest common ancestor of all components that need it. Every component here reads from or writes to the same task list. Lifting state higher or splitting it across components would add unnecessary complexity with no benefit at this scale.

**Why are there no `useEffect` calls?**
The filtered list and computed stats are derived values ΓÇö they can be calculated synchronously from existing state on every render. There's no async operation, no subscription, no side effect that would justify `useEffect`. Reaching for `useEffect` to compute derived state is a very common mistake worth avoiding early.

---

## The Before vs. After

| | Before | After |
|---|---|---|
| Files | 1 component file | 7 component files |
| Lines in DashboardPage | 250+ | ~60 |
| Reusable components | 0 | 2 (`StatCard`, `TaskItem`) |
| Can update header without touching task logic? | Γ¥î | Γ£à |
| Can reuse task row in a sidebar? | Γ¥î | Γ£à |
| New developer orientation time | Long | Short |

---

> The UI is pixel-identical to the starter. Nothing the user sees changed. That's the point ΓÇö good architecture is invisible to users and invaluable to developers.
