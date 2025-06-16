// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// src/App.jsx
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

const timelineData = [
  {
    ev: 1000,
    cim: 'Államalapítás',
    datum: '1000. december 25.',
    kategoria: 'történelem',
    rovid: 'Szent István királlyá koronáztatása és az államalapítás kezdete.',
    reszletes: '# Államalapítás\n\nSzent István 1000-ben a keresztény magyar államot megalapította...'
  },
  {
    ev: 1241,
    cim: 'Tatárjárás',
    datum: '1241 tavasza',
    kategoria: 'történelem',
    rovid: 'A tatárok elözönlik az országot, súlyos pusztítással.',
    reszletes: '# Tatárjárás\n\n1241-ben a tatár seregek feldúlták Magyarország nagy részét...'
  }
];

const kategoriak = [...new Set(timelineData.map(e => e.kategoria))];

export default function App() {
  const [aktivKategoriak, setAktivKategoriak] = useState(new Set(kategoriak));
  const [aktivReszletes, setAktivReszletes] = useState(null);

  const toggleKategoria = (kat) => {
    const uj = new Set(aktivKategoriak);
    uj.has(kat) ? uj.delete(kat) : uj.add(kat);
    setAktivKategoriak(uj);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-40 bg-gray-100 border-r p-2 space-y-2 text-sm">
        {kategoriak.map(k => (
          <label key={k} className="block">
            <input
              type="checkbox"
              checked={aktivKategoriak.has(k)}
              onChange={() => toggleKategoria(k)}
              className="mr-2"
            />
            {k}
          </label>
        ))}
      </aside>
      <main className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="relative h-full flex items-start">
          <div className="absolute bottom-0 flex gap-16 px-10 py-2 border-t w-max">
            {timelineData.map(item => (
              <div
                key={item.ev}
                className="relative group cursor-pointer"
                style={{ left: `${(item.ev - 1000) * 3}px` }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto mb-1"></div>
                <div className="text-xs text-center max-w-[100px] group-hover:text-blue-800">
                  {item.cim}
                </div>
                <div className="absolute bottom-full mb-1 hidden group-hover:block bg-white border p-2 text-xs w-64 shadow z-10">
                  <div className="font-bold">{item.datum}</div>
                  <div>{item.rovid}</div>
                  <button
                    onClick={() => setAktivReszletes(item)}
                    className="mt-1 text-blue-500 underline text-xs"
                  >
                    Részletesen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {aktivReszletes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl max-h-[80vh] overflow-y-auto p-6 rounded shadow relative">
            <button
              onClick={() => setAktivReszletes(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <div dangerouslySetInnerHTML={{ __html: marked.parse(aktivReszletes.reszletes) }} />
          </div>
        </div>
      )}
    </div>
  );
}

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
