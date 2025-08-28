# Weather Now — React + Vite + Tailwind

A tiny, fast app for Jamie to see **current weather** for any city using the **Open‑Meteo** API (no API key required).

Live UX highlights:
- City search with top matches (country + state).
- Current conditions with temperature, feels-like, humidity, wind, precipitation, daylight.
- **Unit toggle** °C/°F.
- Clear loading, empty, and error states.
- Responsive + accessible (keyboard and screen-reader labels).

---

## 1) Run locally

**Prereq:** Node.js 18+

```bash
# 1. Install
npm install

# 2. Start dev
npm run dev

# 3. Open the printed URL (e.g., http://localhost:5173)
```

---

## 2) One‑click deployment options

### Option A — StackBlitz (easiest)
1. Go to https://stackblitz.com/.
2. Click **Create → Vite → React**.
3. Replace the auto-generated files with the ones in this repo (or drag‑drop the whole folder).  
   **Tip:** You can also upload the provided ZIP.
4. It runs instantly; copy the StackBlitz URL for submission.

### Option B — CodeSandbox
1. Go to https://codesandbox.io/.
2. Choose **Vite + React** template.
3. Paste the project files or upload the ZIP.
4. Share the sandbox link.

### Option C — Vercel/Netlify (optional)
- Build command: `npm run build`
- Output directory: `dist`

---

## 3) APIs used

### Geocoding (to turn city name → lat/lon)
`https://geocoding-api.open-meteo.com/v1/search?name={CITY}&count=5&language=en&format=json`

### Current weather
`https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm`

---

## 4) Project structure

```
weather-now-react/
  ├─ index.html
  ├─ package.json
  ├─ postcss.config.js
  ├─ tailwind.config.js
  ├─ vite.config.ts
  ├─ src/
  │  ├─ main.jsx
  │  ├─ App.jsx
  │  ├─ index.css
  │  ├─ lib/
  │  │  └─ api.js
  │  ├─ utils/
  │  │  └─ weatherCodes.js
  │  └─ components/
  │     ├─ SearchBar.jsx
  │     └─ WeatherCard.jsx
  └─ README.md
```

---

## 5) How to demo (what to show the reviewers)

- Search for a city (e.g., **Mumbai**, **Dublin**, **New York**).
- Select the correct match from the list (country/state shown).
- Point out accessibility (form label, focus states) and error handling.
- Toggle **°C/°F** and note instant refetch with unit change.
- Mention no secrets/keys needed (safe to deploy).

---

## 6) Notes on decisions

- **Open‑Meteo** chosen per the brief; it’s free and CORS‑enabled.
- I separated API logic and weather‑code mapping for readability.
- Keeping dependencies minimal (no chart/map libs) to keep build size small.
- Tailwind for speed + consistent spacing/typography.
- Strong empty/loading/error states for a polished UX.

---

## 7) Testing checklist

- [ ] Search with typos (e.g., “Dubln”) → shows “No matches found”
- [ ] City with multiple matches → list renders; selection works
- [ ] Slow network → loading states visible
- [ ] Toggle °C/°F → values update; no console errors
- [ ] Mobile viewport 360px → layout remains readable
- [ ] Keyboard: `Tab` into input, `Enter` to search, `Enter` to select a city

---

## 8) Submission checklist (matches the prompt)

- [ ] **Level 1 (50%)** — ChatGPT link: use ChatGPT’s “Share” feature, include the link in your submission.
- [ ] **Level 2 (30%)** — Deployed app link: StackBlitz or CodeSandbox URL.
- [ ] **Level 3 (20%)** — Code + README: provide this repository/ZIP and brief notes (this README).

Good luck! ✨