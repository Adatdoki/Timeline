# GitHub és Netlify Deployment Útmutató

## 1. GitHub Repository létrehozása

### Opció A: Új repository létrehozása GitHub-on
1. Menj a [GitHub.com](https://github.com)-ra
2. Kattints a "New repository" gombra
3. Add meg a repository nevét (pl. `magyar-tortenelmi-idovonal`)
4. Válaszd a "Public" opciót
5. **NE** pipáld be a "Initialize this repository with a README" opciót
6. Kattints a "Create repository" gombra

### Opció B: Fájlok feltöltése
Ha már van repository-d, töltsd fel ezeket a fájlokat:

```
projekt-mappa/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── assets/
├── public/
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
├── README.md
└── .gitignore
```

## 2. Fájlok feltöltése GitHub-ra

### Parancssorból (ha van git):
```bash
# Repository klónozása
git clone https://github.com/FELHASZNALONEV/REPOSITORY-NEV.git
cd REPOSITORY-NEV

# Fájlok másolása a mappába
# (másold át az összes fájlt a projekt mappájából)

# Commit és push
git add .
git commit -m "Initial commit - Magyar történelmi idővonal"
git push origin main
```

### Webes felületről:
1. Menj a GitHub repository oldalára
2. Kattints az "uploading an existing file" linkre
3. Húzd be vagy válaszd ki az összes fájlt
4. Írj commit üzenetet: "Initial commit - Magyar történelmi idővonal"
5. Kattints a "Commit changes" gombra

## 3. Netlify Deployment

### Automatikus deployment GitHub-ról:
1. Menj a [Netlify.com](https://netlify.com)-ra
2. Regisztrálj vagy jelentkezz be
3. Kattints a "New site from Git" gombra
4. Válaszd a "GitHub" opciót
5. Válaszd ki a repository-t
6. Build beállítások:
   - **Branch to deploy:** `main` (vagy `master`)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Kattints a "Deploy site" gombra

### Manuális deployment:
1. Futtasd le a build parancsot:
   ```bash
   npm install
   npm run build
   ```
2. Menj a Netlify.com-ra
3. Húzd be a `dist` mappát a "Deploy manually" területre

## 4. Fontos fájlok magyarázata

### `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### `package.json` - fontos részek:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### `.gitignore`
```
node_modules/
dist/
.env
.DS_Store
```

## 5. Hibaelhárítás

### "Page Not Found" hiba:
- Ellenőrizd, hogy a `netlify.toml` fájl tartalmazza a redirects szabályt
- Győződj meg róla, hogy a publish directory `dist`

### Build hiba:
- Ellenőrizd a Node.js verziót (18 vagy újabb)
- Futtasd le lokálisan: `npm install && npm run build`
- Nézd meg a Netlify build logokat

### Üres oldal:
- Ellenőrizd, hogy az `index.html` a `dist` mappában van
- Nézd meg a böngésző konzolt hibákért
- Ellenőrizd, hogy minden asset file elérhető

## 6. Automatikus újradeployment

Ha a GitHub repository-t összekapcsoltad a Netlify-jal:
- Minden push automatikusan új deployment-et indít
- A változások 1-2 perc alatt élőben lesznek
- Email értesítést kapsz a deployment állapotáról

## 7. Custom domain (opcionális)

1. Netlify dashboard → Site settings → Domain management
2. Add custom domain
3. Kövesd az DNS beállítási utasításokat

