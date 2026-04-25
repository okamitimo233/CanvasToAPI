# Manual Testing Checklist - Frontend Redesign

> Testing guide for PR6: Final optimization and testing
> Date: 2026-04-18

## 🚀 Getting Started

### 1. Start the Development Server

```bash
npm run dev
```

Open `http://localhost:7861` in your browser.

### 2. Test Environment Setup

Prepare these tools:

- ✅ Chrome/Edge (Chromium-based browser)
- ✅ Firefox
- ✅ Safari (if on macOS)
- ✅ Mobile device or Chrome DevTools device mode
- ✅ Screen reader (optional, for accessibility testing)

---

## 📱 Test 1: Responsive Design (Critical)

### Desktop Layout (≥1024px)

- [ ] **Sidebar Navigation**
  - [ ] Sidebar is visible and fixed on the left
  - [ ] All 3 navigation icons (home, settings, logs) are clickable
  - [ ] Active tab has highlight effect
  - [ ] Hover effects on menu items work
  - [ ] Language toggle button works (sidebar footer)
  - [ ] Logout button works

- [ ] **Main Content Area**
  - [ ] Content is properly aligned with sidebar
  - [ ] Cards and panels have proper spacing
  - [ ] Tab transitions are smooth

### Tablet Layout (768px - 1023px)

Use Chrome DevTools: Toggle device toolbar → select "iPad" or set width to 768px-1023px

- [ ] **Sidebar Behavior**
  - [ ] Sidebar remains visible
  - [ ] Content area adapts to narrower width
  - [ ] Cards and text remain readable

### Mobile Layout (<768px)

Use Chrome DevTools: Toggle device toolbar → select "iPhone 12" or set width to 375px

- [ ] **Mobile Header**
  - [ ] Mobile header is visible at the top
  - [ ] Hamburger menu button (☰) is visible and tappable
  - [ ] Page title is displayed correctly

- [ ] **Drawer Menu**
  - [ ] Click hamburger button → drawer slides in from left
  - [ ] Drawer has overlay (semi-transparent background)
  - [ ] All 3 navigation items are listed vertically
  - [ ] Active tab is highlighted
  - [ ] Language toggle works
  - [ ] Logout button works
  - [ ] Click outside drawer → drawer closes
  - [ ] Close button (X) works

- [ ] **Content Layout**
  - [ ] Content adapts to full width
  - [ ] Cards stack vertically
  - [ ] Text is readable (no horizontal scroll)
  - [ ] Buttons are tappable (min 44x44px touch target)

### Cross-Breakpoint Testing

Test at these specific widths:

- [ ] 375px (iPhone SE)
- [ ] 768px (iPad Portrait)
- [ ] 1024px (iPad Landscape / Small Laptop)
- [ ] 1440px (Desktop)

---

## 🌙 Test 2: Dark Mode (Critical)

### Theme Toggle

- [ ] **Toggle Functionality**
  - [ ] Find the theme toggle button (moon/sun icon)
  - [ ] Click → theme switches smoothly
  - [ ] All UI elements update correctly:
    - [ ] Background colors
    - [ ] Text colors
    - [ ] Card backgrounds
    - [ ] Border colors
    - [ ] Buttons and inputs

### Dark Mode Visual Check

- [ ] **Contrast & Readability**
  - [ ] All text is readable against dark backgrounds
  - [ ] No elements are invisible or hard to see
  - [ ] Status indicators (success/warning/error) are visible
  - [ ] Icons and buttons have proper contrast

- [ ] **State Persistence**
  - [ ] Refresh the page → theme preference is remembered
  - [ ] Check localStorage: `theme` key exists

### Light Mode Visual Check

- [ ] **Contrast & Readability**
  - [ ] All text is readable against light backgrounds
  - [ ] No washed-out elements
  - [ ] Shadows and borders are visible

---

## 🌍 Test 3: Internationalization (i18n)

### Language Toggle

- [ ] **Toggle Functionality**
  - [ ] Click language toggle button (sidebar or drawer)
  - [ ] Language switches between English (en) and Chinese (zh)
  - [ ] All UI text updates immediately:
    - [ ] Page titles
    - [ ] Button labels
    - [ ] Card titles
    - [ ] Status messages
    - [ ] Tooltips
    - [ ] Error messages

### Text Coverage

- [ ] **English (en)**
  - [ ] All text is in English
  - [ ] No missing translation keys (shows as raw key name)
  - [ ] Text fits in buttons and labels
  - [ ] No text overflow

- [ ] **Chinese (zh)**
  - [ ] All text is in Chinese
  - [ ] No missing translation keys
  - [ ] Chinese characters render correctly
  - [ ] Text fits in buttons and labels

### State Persistence

- [ ] Refresh page → language preference is remembered
- [ ] Check localStorage: `lang` key exists (`en` or `zh`)

---

## ✨ Test 4: Interaction & Animation

### Hover Effects

- [ ] **Buttons**
  - [ ] Hover → background/opacity changes
  - [ ] Cursor changes to pointer
  - [ ] Smooth transition (no abrupt changes)

- [ ] **Navigation Items**
  - [ ] Hover → background/highlight effect
  - [ ] Active state is distinct from hover state

- [ ] **Cards**
  - [ ] Hover → subtle shadow or lift effect (if designed)
  - [ ] Smooth transition

### Tab Switching

- [ ] **Desktop Sidebar**
  - [ ] Click tab → content switches immediately
  - [ ] Active indicator updates
  - [ ] Smooth fade/slide transition

- [ ] **Mobile Drawer**
  - [ ] Tap tab → content switches
  - [ ] Drawer closes automatically after selection
  - [ ] Active indicator updates

### Status Indicators

- [ ] **Pulse Animation**
  - [ ] Active/online status indicators have pulse animation
  - [ ] Animation is smooth (no jitter)
  - [ ] Animation doesn't affect layout

---

## 🔧 Test 5: Core Functionality

### Home Tab (Status Monitoring)

- [ ] **Service Status Card**
  - [ ] Displays current service status (running/stopped)
  - [ ] Status indicator updates in real-time
  - [ ] Text is clear and readable

- [ ] **Session Pool Card**
  - [ ] Displays active browser sessions
  - [ ] Session count is accurate
  - [ ] Session details are readable

- [ ] **Proxy Settings Card**
  - [ ] Displays current proxy settings:
    - [ ] Streaming mode (real/fake)
    - [ ] Force thinking toggle
    - [ ] Force web search toggle
    - [ ] Force URL context toggle
  - [ ] All toggles/switches work
  - [ ] Changes are saved/applied

### Settings Tab

- [ ] **Settings Panel**
  - [ ] All settings are visible
  - [ ] Input fields are editable
  - [ ] Dropdowns/selects work
  - [ ] Save/apply buttons work
  - [ ] Changes persist after refresh

### Logs Tab

- [ ] **Log Viewer**
  - [ ] Logs stream in real-time
  - [ ] Log levels are color-coded:
    - [ ] DEBUG (blue)
    - [ ] INFO (default color)
    - [ ] WARN (orange/yellow)
    - [ ] ERROR (red)
  - [ ] Scrolling works smoothly
  - [ ] Log count updates correctly
  - [ ] Download logs button works

---

## ♿ Test 6: Accessibility

### Keyboard Navigation

- [ ] **Tab Navigation**
  - [ ] Press `Tab` key → focus moves through interactive elements
  - [ ] Focus order is logical (left-to-right, top-to-bottom)
  - [ ] Focus indicator is visible (outline ring)
  - [ ] All interactive elements are reachable via Tab
  - [ ] Press `Enter/Space` → buttons/actions trigger

- [ ] **Skip Links** (if implemented)
  - [ ] Press `Tab` on page load → "Skip to content" link appears
  - [ ] Press `Enter` → focus jumps to main content

- [ ] **Focus Trapping** (Mobile Drawer)
  - [ ] When drawer is open, Tab focus stays within drawer
  - [ ] Press `Esc` → drawer closes

### Screen Reader (Optional)

Test with VoiceOver (Mac) or NVDA (Windows):

- [ ] All images have alt text or aria-labels
- [ ] Buttons have accessible names
- [ ] Form inputs have labels
- [ ] Status updates are announced
- [ ] Navigation is understandable

### Color Contrast

- [ ] Use browser's accessibility inspector or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] Text contrast meets WCAG AA standard (4.5:1 for normal text, 3:1 for large text)
- [ ] Status colors are distinguishable (not relying on color alone)

---

## 🌐 Test 7: Cross-Browser Compatibility

Test in each browser:

### Chrome/Edge (Chromium)

- [ ] All features work correctly
- [ ] Layout is correct
- [ ] Animations are smooth
- [ ] No console errors

### Firefox

- [ ] All features work correctly
- [ ] Layout is correct
- [ ] Animations are smooth
- [ ] No console errors

### Safari (macOS/iOS)

- [ ] All features work correctly
- [ ] Layout is correct
- [ ] Animations are smooth
- [ ] No console errors
- [ ] No specific Safari bugs (e.g., flexbox issues)

---

## 🚦 Test 8: Error States & Edge Cases

### Network Errors

- [ ] **Disconnect backend**
  - [ ] Error message displays correctly
  - [ ] UI doesn't break
  - [ ] Retry mechanism works (if applicable)

### Empty States

- [ ] **No logs**
  - [ ] Displays "No logs" or placeholder message
  - [ ] Layout remains stable

- [ ] **No sessions**
  - [ ] Displays appropriate message
  - [ ] User knows what to do next

### Loading States

- [ ] **Initial load**
  - [ ] Loading indicator shows
  - [ ] Content appears smoothly
  - [ ] No layout shift

---

## 🎨 Test 9: Visual Polish

### Alignment & Spacing

- [ ] All elements are properly aligned
- [ ] Spacing between cards is consistent
- [ ] Padding within cards is consistent
- [ ] Text is vertically centered in buttons
- [ ] Icons are aligned with text

### Typography

- [ ] Font family is correct (Space Grotesk for headings, Inter for body)
- [ ] Font sizes are readable
- [ ] Line heights are comfortable
- [ ] No text is cut off or overlapping

### Icons

- [ ] All icons are the same style (outline/linear)
- [ ] Icons are properly sized
- [ ] Icons are aligned with adjacent text
- [ ] No missing icons

---

## ⚡ Test 10: Performance

### Page Load Time

- [ ] Open Chrome DevTools → Network tab
- [ ] Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] Check load time:
  - [ ] DOM Content Loaded: < 1s
  - [ ] Load: < 2s
  - [ ] No blocking resources

### Animation Performance

- [ ] Open Chrome DevTools → Performance tab
- [ ] Record a session of tab switching and interactions
- [ ] Check:
  - [ ] Frame rate stays at 60fps
  - [ ] No long tasks (> 50ms)
  - [ ] No layout thrashing

### Bundle Size

- [ ] Check `ui/dist/` folder
- [ ] Total bundle size:
  - [ ] CSS: < 400KB (current: 379KB) ✅
  - [ ] JS: < 1.2MB (current: 1.06MB) ✅
  - [ ] Gzipped: CSS ~52KB, JS ~346KB ✅

---

## 📋 Final Checklist

### Critical Tests (Must Pass)

- [ ] ✅ Responsive design works on all breakpoints
- [ ] ✅ Dark mode works perfectly
- [ ] ✅ Language toggle works
- [ ] ✅ All core features functional
- [ ] ✅ No console errors
- [ ] ✅ No accessibility blockers

### Quality Tests (Should Pass)

- [ ] ✅ Animations are smooth
- [ ] ✅ Hover effects work
- [ ] ✅ Keyboard navigation works
- [ ] ✅ Cross-browser compatibility
- [ ] ✅ Performance is acceptable

### Nice-to-Have Tests

- [ ] ✅ Screen reader compatible
- [ ] ✅ Perfect visual alignment
- [ ] ✅ Optimized bundle size (< 1MB JS)

---

## 🐛 Bug Reporting Template

If you find issues, report them in this format:

```markdown
### Issue: [Short Description]

**Environment:**

- Browser: [Chrome 120, Firefox 121, Safari 17]
- Screen width: [375px, 1440px]
- Theme: [Light/Dark]
- Language: [English/Chinese]

**Steps to Reproduce:**

1. [First step]
2. [Second step]
3. [Third step]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happened]

**Screenshots:**
[If applicable]

**Console Errors:**
[Paste any console errors]
```

---

## 📝 Notes

Use this section for general notes, observations, or ideas for future improvements:

```markdown
### Observations:

- [Your observations here]

### Ideas for Future:

- [Future improvement ideas]
```

---

**Testing completed?** Submit results to the development team!
