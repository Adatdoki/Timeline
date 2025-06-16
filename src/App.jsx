import { useState, useRef, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './App.css'

// Történelmi események adatai
const timelineData = [
  {
    ev: 1000,
    cim: 'Államalapítás',
    datum: '1000. december 25.',
    kategoria: 'történelem',
    rovid: 'Szent István királlyá koronáztatása és a keresztény magyar állam megalapítása.',
    reszletes: `# Államalapítás

**1000. december 25.**

Szent István 1000 körül királlyá koronáztatta magát, ezzel megalapítva a keresztény magyar államot. Ez a momentum nemcsak a magyar történelem, hanem egész Közép-Európa szempontjából is kiemelkedő jelentőségű volt.

## A koronázás jelentősége

A koronázás nem csupán szimbolikus aktus volt, hanem a magyar állam nemzetközi elismerését is jelentette. István ezzel egyenrangú partnerré vált a nyugat-európai keresztény uralkodókkal.

## Államszervezés

István király modern közigazgatási rendszert épített ki:
- Megyerendszer kialakítása
- Keresztény egyház megszervezése
- Törvények kodifikálása
- Gazdasági reformok bevezetése

## Örökség

Az államalapítás hagyománya máig meghatározza a magyar nemzeti identitást. Szent István alakja a keresztény királyság eszményképévé vált.`
  },
  {
    ev: 1241,
    cim: 'Tatárjárás',
    datum: '1241-1242',
    kategoria: 'történelem',
    rovid: 'A mongol seregek pusztító hadjárata Magyarországon.',
    reszletes: `# Tatárjárás

**1241-1242**

A mongol-tatár seregek 1241 tavaszán törtek be Magyarországra, súlyos pusztítást végezve az országban. Ez volt az egyik legsúlyosabb katasztrófa a magyar történelemben.

## A támadás menete

Batu kán vezetésével a mongol seregek három irányból támadtak:
- Északi hadoszlop: Lengyelországon át
- Középső hadoszlop: Vereckei-szoroson át
- Déli hadoszlop: Oláhországon át

## Mohi csata

1241. április 11-én a mohii csatában a magyar sereg súlyos vereséget szenvedett. II. Béla király menekülni kényszerült.

## Következmények

- A lakosság harmada-fele elpusztult
- Számos város és település megsemmisült
- A gazdasági élet összeomlott
- Kényszerű újjáépítés és megerősítés`
  },
  {
    ev: 1456,
    cim: 'Nándorfehérvári diadal',
    datum: '1456. július 22.',
    kategoria: 'történelem',
    rovid: 'Hunyadi János és Kapisztrán János győzelme a török sereg felett.',
    reszletes: `# Nándorfehérvári diadal

**1456. július 22.**

Hunyadi János és Kapisztrán János vezetésével a keresztény seregek döntő győzelmet arattak II. Mehmed szultán török serege felett Nándorfehérvárnál (ma Belgrád).

## A csata előzményei

II. Mehmed szultán 1453-ban elfoglalta Konstantinápolyt, majd Magyarország felé fordította figyelmét. Nándorfehérvár stratégiai fontosságú erőd volt a Duna és Száva találkozásánál.

## A győzelem

A keresztény sereg váratlan támadása meglepte a török ostromlókat. A győzelem:
- Megállította a török előrenyomulást
- 70 évre biztosította Magyarország függetlenségét
- Európa-szerte ünnepelték

## Örökség

A győzelem emlékére a pápa elrendelte a déli harangszót, amely máig szól világszerte.`
  },
  {
    ev: 1526,
    cim: 'Mohácsi csata',
    datum: '1526. augusztus 29.',
    kategoria: 'történelem',
    rovid: 'A magyar sereg pusztító veresége a török hadak ellen.',
    reszletes: `# Mohácsi csata

**1526. augusztus 29.**

A mohácsi csatában II. Lajos magyar király serege súlyos vereséget szenvedett I. Szulejmán szultán török hadaitól. Ez a csata véget vetett a középkori Magyar Királyságnak.

## A csata

A magyar sereg létszámbeli hátrányban volt:
- Magyar sereg: kb. 25-30 ezer fő
- Török sereg: kb. 100 ezer fő

## Következmények

- II. Lajos király elesett a csatában
- A magyar állam három részre szakadt
- Kezdetét vette a 150 éves török hódoltság
- Európa keresztény bástyája megrendült

## Történelmi jelentőség

A mohácsi vereség a magyar történelem egyik legmeghatározóbb eseménye, amely évszázadokra megváltoztatta az ország sorsát.`
  }
];

const kategoriak = [...new Set(timelineData.map(e => e.kategoria))];

export default function App() {
  const [aktivKategoriak, setAktivKategoriak] = useState(new Set(kategoriak));
  const [aktivReszletes, setAktivReszletes] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const timelineRef = useRef(null);

  const szurtEsemenyek = timelineData.filter(event => aktivKategoriak.has(event.kategoria));

  const toggleKategoria = (kat) => {
    const uj = new Set(aktivKategoriak);
    uj.has(kat) ? uj.delete(kat) : uj.add(kat);
    setAktivKategoriak(uj);
  };

  const handleMouseEnter = (event, e) => {
    setHoveredEvent(event);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };

  const handleEventClick = (event) => {
    console.log('Event clicked:', event.cim);
    setAktivReszletes(event);
  };

  // Évek generálása 1000-től 1600-ig
  const evek = [];
  for (let ev = 1000; ev <= 1600; ev += 100) {
    evek.push(ev);
  }

  const scrollLeft = () => {
    timelineRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    timelineRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Fejléc */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-800">Magyar Történelmi Idővonal</h1>
        <p className="text-slate-600 text-sm mt-1">Interaktív történelmi események böngészése</p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Bal oldali kategória szűrők */}
        <aside className="w-64 bg-white shadow-sm border-r p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Kategóriák</h2>
          {kategoriak.map(k => (
            <label key={k} className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={aktivKategoriak.has(k)}
                  onChange={() => toggleKategoria(k)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                {aktivKategoriak.has(k) && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </div>
              <span className="text-slate-700 capitalize font-medium group-hover:text-blue-600 transition-colors">
                {k}
              </span>
            </label>
          ))}
          
          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              {szurtEsemenyek.length} esemény megjelenítve
            </p>
          </div>
        </aside>

        {/* Fő idővonal terület */}
        <main className="flex-1 flex flex-col bg-slate-50">
          {/* Navigációs gombok */}
          <div className="flex justify-between items-center p-4 bg-white border-b">
            <button
              onClick={scrollLeft}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Korábbi</span>
            </button>
            <div className="text-slate-600 text-sm">
              Húzd az idővonalat vagy használd a nyilakat a navigáláshoz
            </div>
            <button
              onClick={scrollRight}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <span>Későbbi</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Idővonal container */}
          <div className="flex-1 relative overflow-hidden">
            <div 
              ref={timelineRef}
              className="h-full overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
            >
              <div className="relative h-full" style={{ width: '4000px' }}>
                {/* Évszám csík */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-200">
                  <div className="relative h-full">
                    {/* Évszám jelölések */}
                    {evek.map(ev => (
                      <div
                        key={ev}
                        className="absolute bottom-0 flex flex-col items-center"
                        style={{ left: `${(ev - 1000) * 6 + 100}px` }}
                      >
                        <div className="w-px h-6 bg-slate-300"></div>
                        <span className="text-sm font-medium text-slate-600 mt-2">{ev}</span>
                      </div>
                    ))}
                    
                    {/* Fő idővonal */}
                    <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-slate-300"></div>
                  </div>
                </div>

                {/* Események */}
                {szurtEsemenyek.map(event => (
                  <div
                    key={event.ev}
                    className="absolute bottom-20 transform -translate-x-1/2 cursor-pointer group"
                    style={{ left: `${(event.ev - 1000) * 6 + 100}px` }}
                    onMouseEnter={(e) => handleMouseEnter(event, e)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleEventClick(event)}
                  >
                    {/* Esemény pont */}
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg group-hover:bg-blue-700 group-hover:scale-125 transition-all duration-200 mb-2"></div>
                    
                    {/* Esemény címke */}
                    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-3 min-w-[200px] max-w-[250px] group-hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-slate-800 text-sm mb-1">{event.cim}</h3>
                      <p className="text-xs text-slate-600">{event.datum}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Tooltip buborék */}
      {hoveredEvent && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-w-sm pointer-events-none transform -translate-x-1/2 -translate-y-full tooltip-enter"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
        >
          <div className="text-sm font-semibold text-slate-800 mb-1">
            {hoveredEvent.datum}
          </div>
          <div className="text-sm text-slate-600 leading-relaxed">
            {hoveredEvent.rovid}
          </div>
          <div className="text-xs text-blue-600 mt-2 font-medium">
            Kattints a részletekért →
          </div>
          
          {/* Buborék nyíl */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        </div>
      )}

      {/* Részletes modal */}
      {aktivReszletes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-enter">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setAktivReszletes(null)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
            
            <div className="p-8">
              <div className="prose prose-slate max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: aktivReszletes.reszletes.split('\n').map(line => {
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-3xl font-bold text-slate-800 mb-4">${line.substring(2)}</h1>`;
                    } else if (line.startsWith('## ')) {
                      return `<h2 class="text-xl font-semibold text-slate-700 mt-6 mb-3">${line.substring(3)}</h2>`;
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      return `<p class="text-lg font-medium text-blue-600 mb-4">${line.substring(2, line.length - 2)}</p>`;
                    } else if (line.startsWith('- ')) {
                      return `<li class="text-slate-600 mb-1">${line.substring(2)}</li>`;
                    } else if (line.trim() === '') {
                      return '<br>';
                    } else {
                      return `<p class="text-slate-700 mb-4 leading-relaxed">${line}</p>`;
                    }
                  }).join('')
                }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

