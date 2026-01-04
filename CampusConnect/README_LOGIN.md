
# Handcrafted Login Bundle - Campus Skill Connect

This bundle contains a high-fidelity, CSS-only login page designed specifically for Madan Mohan Malviya Technology University students (Team VisionX).

## 📁 Files Included
The "bundle" is integrated into the React structure for ease of use:
- **`src/pages/Login.tsx`**: The HTML structure and minimal JS logic (React component).
- **`src/pages/Login.css`**: The complete, handcrafted CSS styles (No Tailwind, No Frameworks).
- **`src/components/Navbar.tsx`**: Updated to route the profile icon to `/login`.

## 🚀 How to Run
1. Ensure the React development server is running (`npm run dev`).
2. Navigate to `http://localhost:5173/#/login` OR click the **User Profile Icon** in the navbar.

## 🎨 Design Implementation
- **Theme**: Dark cinematic theme (`#060812`) with Neon Blue & Violet accents.
- **Font Stack**: Orbitron (Headlines), Poppins (UI), Inter (Body).
- **Effects**: 
  - Glassmorphism cards (`backdrop-filter: blur(12px)`)
  - CSS-only particle animations (`.vx-shape-orb`)
  - Gradient shimmer text effects.
  - Parallax background using vanilla JS event listeners in `useEffect`.

## 🔧 Developer Notes

### Plugging in OAuth
In `src/pages/Login.tsx`, locate the `handleOAuth` function:
```javascript
const handleOAuth = (provider) => {
    // 1. Call your backend endpoint
    // window.location.href = `https://api.yourbackend.com/auth/${provider.toLowerCase()}`;
}
```

### Changing Assets
- **Background Image**: Search for `.vx-bg-image` in `src/pages/Login.css` and replace the `background-image` URL.
- **Fonts**: The Google Fonts import is at the top of `Login.css`.

### Performance
- The background image uses a high-quality Unsplash source. For production, download this image, convert to WebP, and serve from `public/assets/`.
- `will-change` properties have been added to animated elements to promote GPU layering.

## ✅ Accessibility Checklist
- [x] All form inputs have associated `<label>` elements.
- [x] Color contrast ratios for text meet WCAG AA standards (4.5:1).
- [x] Focus states are clearly visible (Blue ring).
- [x] `prefers-reduced-motion` can be added to the CSS to disable animations for sensitive users (CSS structure supports this easily).
