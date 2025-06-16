# Magyar Történelmi Idővonal

Interaktív magyar történelmi idővonal React alkalmazás.

## Funkciók

- 🕒 Vízszintesen scrollozható idővonal
- 🏷️ Kategória-alapú szűrés
- 📱 Responsive dizájn
- 🎨 Modern UI Tailwind CSS-sel
- 📖 Részletes esemény leírások

## Fejlesztés

```bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Build készítése
npm run build
```

## Deployment

### Netlify-vel

1. Fork-old vagy töltsd le ezt a repository-t
2. Csatlakoztasd a GitHub repository-t a Netlify-hoz
3. Build beállítások:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18 vagy újabb

### Manuális deployment

1. Futtasd a `npm run build` parancsot
2. Töltsd fel a `dist` mappa tartalmát a hosting szolgáltatóhoz

## Projekt struktúra

```
src/
├── App.jsx          # Fő komponens
├── App.css          # Stílusok
├── main.jsx         # Belépési pont
└── assets/          # Statikus fájlok
```

## Technológiák

- React 18
- Vite
- Tailwind CSS
- Lucide React (ikonok)

