# Error Handling & Troubleshooting Guide

This document contains all the issues encountered during development and their solutions.

---

## 1. PostCSS Configuration Error

### Issue
When first running the development server, encountered this error:
```
[vite] Internal server error: [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package...
```

### Cause
The project was using Tailwind CSS v4 (`@tailwindcss/postcss`), which has a different configuration structure than v3.

### Solution
**Step 1:** Install the correct package
```bash
npm install -D @tailwindcss/postcss
```

**Step 2:** Update `postcss.config.js`
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // Changed from 'tailwindcss: {}'
    autoprefixer: {},
  },
}
```

---

## 2. Tailwind CSS Styles Not Loading

### Issue
After fixing the PostCSS error, the Tailwind CSS classes were not being applied. The page appeared unstyled with default browser styles.

### Cause
Tailwind CSS v4 uses a different import syntax in the CSS file compared to v3.

### Solution
Update `src/index.css` from:
```css
/* Old v3 syntax */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

To:
```css
/* New v4 syntax */
@import "tailwindcss";
```

**Note:** After making this change, hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R) to clear cached CSS.

---

## 3. Image Cropping Issue

### Issue
Images in the grid view were being cropped, showing only portions of the image instead of the full image.

### Cause
The CSS was using `object-cover` which crops images to fill the container, cutting off parts of the image.

### Solution
Update `src/components/EntryCard.jsx`:

**Before:**
```jsx
<div className="relative group h-56 overflow-hidden bg-slate-900">
  <img
    src={entry.imageUrl}
    alt={entry.title}
    className="w-full h-full object-cover cursor-pointer"
  />
```

**After:**
```jsx
<div className="relative group h-56 overflow-hidden bg-slate-900 flex items-center justify-center">
  <img
    src={entry.imageUrl}
    alt={entry.title}
    className="w-full h-full object-contain cursor-pointer"
  />
```

**Changes:**
1. Changed `object-cover` to `object-contain` - scales the image to fit without cropping
2. Added `flex items-center justify-center` to the container - centers the image within the card

---

## 4. Plain UI Design

### Issue
Initial UI had a plain white background with basic styling, not visually appealing.

### Solution
Implemented a dark navy blue theme with modern design elements:

**Color Scheme:**
- Background: `bg-slate-900` (dark navy blue)
- Cards: `bg-slate-800` with `border-slate-700` borders
- Header: `bg-slate-800`
- Inputs: `bg-slate-700` with light text
- Text: White and gray shades for contrast

**Components Updated:**
1. `Dashboard.jsx` - Dark background, improved search bar
2. `EntryCard.jsx` - Dark cards with gradient effects
3. `Auth.jsx` - Dark login/signup form
4. `App.jsx` - Dark loading screen

**Visual Enhancements:**
- Gradient buttons (blue to indigo)
- Hover effects with scale animations
- Improved shadows and borders
- Better contrast for readability

---

## 5. Missing Image Preview Feature

### Issue
No way to view images in full size - users could only see small cropped thumbnails in the grid.

### Solution
Added click-to-preview modal in `EntryCard.jsx`:

```jsx
const [showPreview, setShowPreview] = useState(false);

// Image is clickable
<img
  src={entry.imageUrl}
  alt={entry.title}
  className="w-full h-full object-contain cursor-pointer"
  onClick={() => setShowPreview(true)}
/>

// Preview Modal
{showPreview && (
  <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4 z-50"
       onClick={() => setShowPreview(false)}>
    <div className="relative max-w-7xl max-h-[90vh] w-full">
      {/* Large image display with title and copy button */}
    </div>
  </div>
)}
```

**Features:**
- Click on any image to view full size
- "Click to preview" hint on hover
- Two buttons: "Preview" and "Copy"
- Large modal with dark navy background
- Click outside or X button to close

---

## Development Server Issues

### Issue
Server not reflecting changes or port conflicts.

### Solution
**Restart the dev server:**
```bash
# Kill the running process
Ctrl+C (in terminal)

# Start fresh
npm run dev
```

**Port conflicts:**
Vite automatically tries alternative ports if the default is in use:
- Default: 5173
- Alternative: 5174, 5175, 5176, etc.

Always check the terminal output for the actual port being used.

---

## Browser Caching Issues

### Issue
Changes not appearing in browser even after server restart.

### Solution
**Hard refresh the browser:**
- **Windows/Linux:** Ctrl + Shift + R
- **Mac:** Cmd + Shift + R

**Clear cache if needed:**
1. Open browser DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

---

## Firebase Configuration

### Issue
App won't work without Firebase credentials.

### Solution
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable these services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
4. Get your config from Project Settings
5. Update `src/firebase.js` with your credentials

**Security Rules:**
See `README.md` for proper Firestore and Storage security rules.

---

## Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Tips for Future Development

1. **Always use object-contain for user-uploaded images** - prevents cropping
2. **Test with different image aspect ratios** - portrait, landscape, square
3. **Hard refresh after CSS changes** - browser caching can hide updates
4. **Check console for errors** - F12 in browser, look at Console tab
5. **Verify Tailwind v4 syntax** - different from v3, check docs
6. **Use dark theme throughout** - maintain consistency with slate colors

---

## File Locations Reference

- **CSS imports:** `src/index.css`
- **PostCSS config:** `postcss.config.js`
- **Tailwind config:** `tailwind.config.js`
- **Firebase config:** `src/firebase.js`
- **Components:** `src/components/`
- **Main app:** `src/App.jsx`

---

*Last updated: 2025-11-19*
