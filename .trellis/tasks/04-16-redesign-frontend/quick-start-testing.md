# 🚀 Quick Start - Manual Testing

**Time needed:** ~30-45 minutes

## Step 1: Start the Server

```bash
npm run dev
```

Open: `http://localhost:7861`

---

## Step 2: Priority Test Sequence

### 🔴 Critical Path (15 min)

1. **Responsive Design (5 min)**
   - Open Chrome DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test widths: 375px → 768px → 1024px → 1440px
   - ✅ Verify mobile drawer menu works

2. **Dark Mode (2 min)**
   - Click theme toggle
   - ✅ All UI elements update correctly
   - Refresh page → theme remembered

3. **Language Toggle (2 min)**
   - Click language button
   - ✅ All text switches between EN/ZH
   - Refresh page → language remembered

4. **Core Features (6 min)**
   - ✅ Home tab: service status, session pool, proxy settings
   - ✅ Settings tab: all inputs work
   - ✅ Logs tab: real-time streaming, color-coded levels

### 🟡 Quality Check (10 min)

5. **Interactions**
   - ✅ Hover effects on buttons/nav items
   - ✅ Tab switching smooth
   - ✅ Status pulse animation works

6. **Accessibility**
   - Press `Tab` repeatedly → focus moves logically
   - ✅ Focus indicator visible
   - ✅ `Enter` triggers buttons

7. **Cross-Browser**
   - Test in Firefox
   - Test in Safari (if macOS)
   - ✅ No layout breakage

### 🟢 Performance (5 min)

8. **Load Time**
   - Open Chrome DevTools → Network tab
   - Hard refresh (Ctrl+Shift+R)
   - ✅ Load time < 2s

9. **Animation Smoothness**
   - Switch tabs multiple times
   - ✅ No jitter or lag

---

## Step 3: Report Issues

Found a bug? Use this template:

```markdown
**Browser:** Chrome 120
**Width:** 375px
**Theme:** Dark
**Steps:** 1. Open mobile drawer 2. Click settings
**Expected:** Drawer closes
**Actual:** Drawer stays open
**Screenshot:** [paste here]
```

---

## 📋 Full Testing Checklist

See: [manual-testing-checklist.md](./manual-testing-checklist.md)

---

## ✅ Ready to Test?

1. Run `npm run dev`
2. Open `http://localhost:7861`
3. Follow the **Priority Test Sequence** above
4. Report any issues found

**Estimated time:** 30 minutes for critical path + quality check
