# Raffle System Design Guidelines

## Design Approach

**Selected Approach:** Design System-Based (Material Design principles)

**Justification:** This is a utility-focused productivity tool requiring clarity, efficiency, and data-dense displays. Material Design provides excellent patterns for form inputs, lists, and interactive components while maintaining clean, functional aesthetics.

**Key Design Principles:**
1. Clear visual hierarchy for quick scanning of participants and prizes
2. Smooth, celebratory animations for the wheel spin
3. Efficient data management with inline editing capabilities
4. Clear state feedback for tracking prize quantities

---

## Typography

**Font Families:**
- Primary: Inter or Roboto (via Google Fonts)
- Monospace: JetBrains Mono for quantity counters (1/5, 2/10, etc.)

**Hierarchy:**
- Page Titles: text-2xl, font-semibold (Dashboard, Participants, Prizes)
- Section Headers: text-lg, font-medium
- Body Text: text-base, font-normal
- Labels: text-sm, font-medium
- Metadata/Timestamps: text-xs, text-gray-500
- Winner Announcement Modal: text-3xl, font-bold

**Special Typography:**
- Wheel item names: text-lg, font-medium for readability during spin
- Prize quantity badges: text-sm, font-mono for tabular alignment
- Winner celebration text: text-4xl, font-extrabold with tracking-tight

---

## Layout System

**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16, 24

**Grid Structure:**
- Overall layout: 12-column grid
- Sidebar navigation: col-span-2 (narrower, icon + text)
- Main content area: col-span-10
- Dashboard splits: 40% controls, 60% wheel
- Participants/Prizes: Single column, full width

**Container Constraints:**
- Max width: max-w-7xl
- Content padding: p-6 desktop, p-4 mobile
- Card spacing: gap-6 between major sections
- List item spacing: space-y-2 for dense lists

**Responsive Breakpoints:**
- Mobile: Single column, stacked layout
- Tablet (md): 2-column where applicable
- Desktop (lg): Full 12-column grid system

---

## Component Library

### A. Navigation (Sidebar)
**Structure:**
- Vertical tab navigation with icons + labels
- Active state: Distinct visual treatment with indicator bar
- Three tabs: Dashboard, Participants, Prizes
- Sticky positioning for scroll-independent access

**Specs:**
- Height: Full viewport (min-h-screen)
- Tab padding: px-4 py-3
- Icon size: w-5 h-5
- Active indicator: Left border (border-l-4) or background fill

### B. Vertical Spinning Wheel
**Core Component:**
- Container: Aspect ratio 3:4, centered in content area
- Viewport window: h-96, overflow-hidden
- Highlight zone: Centered horizontal band (h-16) with dashed border
- Reel items: h-14 each, centered text

**Animation Specs:**
- Easing: cubic-bezier(0.215, 0.61, 0.355, 1) for realistic deceleration
- Duration: 4-5 seconds
- Item height: Exactly h-14 (56px) for precise calculations
- Repeats: 12-15 cycles before landing

**Visual Treatment:**
- Highlight zone: Subtle border with minimal fill
- Wheel items: Clean separators between entries
- Momentum blur (optional): Slight blur filter during high-speed spin

### C. Participant Management (Tab)
**List Structure:**
- Header: "Add Participant" input with action button
- List container: Scrollable area with max-h-[600px]
- Each entry row displays:
  - Participant name (text-base, font-medium)
  - Assigned prize badge (inline, text-sm)
  - Remove action (icon button, right-aligned)

**Input Form:**
- Full-width text input: w-full, h-12
- Add button: w-full, h-10, positioned below input
- Input grouping: mb-6 separation from list

**Prize Badge Display:**
- Inline with name using flex layout
- Badge styling: Rounded, small padding (px-3 py-1)
- Shows prize name assigned to participant

### D. Prize Management (Tab)
**Card Layout:**
- Each prize as expandable/editable card
- Grid structure for multiple fields:
  - Prize name input (text-lg)
  - Quantity controls (numeric input or stepper)
  - Current tracking: "Won: X out of Y" display

**Quantity Tracker:**
- Visual progress: Linear progress bar or fraction display
- Typography: Monospace for alignment (3/10, 10/10)
- Status indicator: Visual cue when quantity exhausted

**Controls:**
- Add Prize button: Bottom-fixed or top-right
- Inline edit: Click-to-edit for prize names
- Delete action: Icon button, requires confirmation

### E. Dashboard (Tab)
**Layout Split:**
- Left column (40%): Controls and history
  - Spin button: Large, prominent (h-16, text-xl)
  - Winner announcement area
  - History list (compact, scrollable)
- Right column (60%): Vertical wheel component

**Spin Control:**
- Button states: Default, Disabled (spinning), Success (post-spin)
- Loading state: Animated spinner or "Spinning..." text
- Positioned above wheel with mb-6 spacing

**Winner History:**
- Compact list with timestamps
- Each entry shows: Name, Prize, Time
- Max height with scroll: max-h-64
- Reverse chronological order

### F. Winner Announcement Modal
**Overlay:**
- Full viewport overlay with backdrop blur
- Centered modal container
- Z-index: z-50

**Modal Content:**
- Celebration header: Large emoji or icon (text-6xl)
- Winner name: text-3xl, font-bold, centered
- Prize display: text-xl, below name
- Dismiss button: Centered, primary action styling
- Padding: p-8 for generous spacing

**Animation:**
- Entry: Scale up from 0.8 with fade-in
- Exit: Scale down to 0.8 with fade-out
- Duration: 300ms for both

### G. Form Controls
**Text Inputs:**
- Height: h-12 for comfortable touch targets
- Border: 1px solid, rounded corners
- Focus state: Ring treatment (ring-2)
- Padding: px-4

**Buttons:**
- Primary actions: h-12, rounded, font-medium
- Secondary/Icon buttons: h-10, w-10 for square
- Disabled state: Reduced opacity, cursor-not-allowed
- Full-width when contextually appropriate

**Numeric Steppers:**
- Grouped input with +/- buttons
- Input: text-center, w-20
- Buttons: w-10, h-10, square

---

## Animations

**Use Sparingly - Only Where Essential:**

1. **Wheel Spin Animation** (Primary)
   - Smooth vertical translation with easing
   - No additional effects during spin

2. **Winner Modal** (Secondary)
   - Simple scale + fade entrance/exit
   - No confetti or excessive celebration effects

3. **List Updates** (Micro)
   - Subtle fade-in for new entries
   - Fade-out for removals (200ms)

4. **Tab Transitions**
   - No slide animations between tabs
   - Instant content swap with fade (100ms)

**Explicitly Avoid:**
- Hover animations on list items
- Spinning icons or loaders (use static states)
- Pulsing or bouncing effects
- Page transition animations

---

## Images

**No hero images required** - This is a functional application focused on utility.

**Icon Usage:**
- Navigation icons: Heroicons (dashboard, users, gift icons)
- Action icons: Plus, trash, checkmark (outline style)
- Celebration icon: Trophy or party emoji for winner modal
- All icons: w-5 h-5 standard size, w-6 h-6 for emphasis

---

## Accessibility

- All interactive elements: Minimum 44x44px touch targets
- Form inputs: Associated labels (sr-only where visual labels exist)
- Focus indicators: Visible ring treatment on all focusable elements
- Modal: Focus trap and keyboard dismissal (Escape key)
- Spin button: Disabled state with aria-disabled attribute
- Lists: Semantic HTML (ul/li) with proper heading hierarchy