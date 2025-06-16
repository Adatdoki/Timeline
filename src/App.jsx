import { useState, useRef, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './App.css'

export default function App() {
  const [timelineData, setTimelineData] = useState([]);
  const [aktivKategoriak, setAktivKategoriak] = useState(new Set());
  const [aktivReszletes, setAktivReszletes] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const timelineRef = useRef(null);

  // JSON adatok betöltése
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/idovonal_kesz.json');
        const data = await response.json();
        setTimelineData(data);
        
        // Kategóriák automatikus beállítása
        const kategoriak = [...new Set(data.map(e => e.kategória))];
        setAktivKategoriak(new Set(kategoriak));
        setLoading(false);
      } catch (error) {
        console.error('Hiba az adatok betöltésekor:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const kategoriak = [...new Set(timelineData.map(e => e.kategória))];
  const szurtEsemenyek = timelineData.filter(event => aktivKategoriak.has(event.kategória));

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
    console.log('Event clicked:', event.címsor);
    setAktivReszletes(event);
  };

  // Évek generálása a legkorábbi és legkésőbbi év alapján
  const evek = [];
  if (timelineData.length > 0) {
    const minEv = Math.min(...timelineData.map(e => e.év));
    const maxEv = Math.max(...timelineData.map(e => e.év));
    const startYear = Math.floor(minEv / 100) * 100;
    const endYear = Math.ceil(maxEv / 100) * 100;
    
    for (let ev = startYear; ev <= endYear; ev += 100) {
      evek.push(ev);
    }
  }

  const scrollLeft = () => {
    timelineRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    timelineRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Kategória színek
  const kategoriaColors = {
    'történelem': '#c0392b',
    'kultúra': '#2980b9', 
    'oktatás': '#8e44ad',
    'gazdaság': '#27ae60',
    'vallás': '#f39c12'
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Adatok betöltése...</p>
        </div>
      </div>
    );
  }

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
                  <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ backgroundColor: kategoriaColors[k] || '#3b82f6' }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <span className="text-slate-700 capitalize font-medium group-hover:text-blue-600 transition-colors">
                {k}
              </span>
              <div 
                className="w-3 h-3 rounded-full ml-auto"
                style={{ backgroundColor: kategoriaColors[k] || '#3b82f6' }}
              ></div>
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
              <div className="relative h-full" style={{ width: `${evek.length * 600}px` }}>
                {/* Évszám csík */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-200">
                  <div className="relative h-full">
                    {/* Évszám jelölések */}
                    {evek.map(ev => (
                      <div
                        key={ev}
                        className="absolute bottom-0 flex flex-col items-center"
                        style={{ left: `${(ev - evek[0]) * 6 + 100}px` }}
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
                    key={`${event.év}-${event.címsor}`}
                    className="absolute bottom-20 transform -translate-x-1/2 cursor-pointer group"
                    style={{ left: `${(event.év - evek[0]) * 6 + 100}px` }}
                    onMouseEnter={(e) => handleMouseEnter(event, e)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleEventClick(event)}
                  >
                    {/* Vonal az idősávhoz */}
                    <div 
                      className="absolute top-full w-px bg-slate-400 group-hover:bg-slate-600 transition-colors"
                      style={{ 
                        height: '60px',
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                    ></div>
                    
                    {/* Esemény pont */}
                    <div 
                      className="w-4 h-4 rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-all duration-200 mb-2 mx-auto"
                      style={{ backgroundColor: event.szín || kategoriaColors[event.kategória] || '#3b82f6' }}
                    ></div>
                    
                    {/* Esemény címke */}
                    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-3 min-w-[200px] max-w-[250px] group-hover:shadow-lg transition-shadow text-center">
                      <h3 className="font-semibold text-slate-800 text-sm mb-1">{event.címsor}</h3>
                      <p className="text-xs text-slate-600">{event.év}</p>
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
          <div className="text-center">
            <div className="text-sm font-semibold text-slate-800 mb-1">
              {hoveredEvent.év}
            </div>
            <div className="text-sm text-slate-600 leading-relaxed">
              {hoveredEvent.rövid_magyarázat}
            </div>
            <div className="text-xs text-blue-600 mt-2 font-medium">
              Kattints a részletekért →
            </div>
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
                <h1 className="text-3xl font-bold text-slate-800 mb-2">{aktivReszletes.címsor}</h1>
                <p className="text-lg font-medium text-blue-600 mb-4">{aktivReszletes.év}</p>
                <div className="text-slate-700 leading-relaxed">
                  <p className="mb-4">{aktivReszletes.rövid_magyarázat}</p>
                  <p>{aktivReszletes.részletes_szöveg}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: aktivReszletes.szín || kategoriaColors[aktivReszletes.kategória] || '#3b82f6' }}>
                    {aktivReszletes.kategória}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

