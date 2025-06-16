
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { ScrollArea } from "./components/ui/scroll-area";
import data from "./data/idovonal_sablon_egyseges.json";

const categories = Array.from(new Set(data.map(e => e.kategória)));

export default function Idovonal() {
  const [visibleCategories, setVisibleCategories] = useState(new Set(categories));
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleCategory = (cat) => {
    const newSet = new Set(visibleCategories);
    newSet.has(cat) ? newSet.delete(cat) : newSet.add(cat);
    setVisibleCategories(newSet);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4 flex-wrap">
        {categories.map(cat => (
          <label key={cat} className="flex items-center gap-2">
            <Checkbox
              checked={visibleCategories.has(cat)}
              onChange={() => toggleCategory(cat)}
            />
            <span className="capitalize text-sm">{cat}</span>
          </label>
        ))}
      </div>

      <ScrollArea className="h-[600px] border rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4">
          {data.filter(e => visibleCategories.has(e.kategória)).map((e, idx) => (
            <Card
              key={idx}
              className="relative group cursor-pointer border-l-4"
              style={{ borderColor: e.szín || "#ccc" }}
              onClick={() => setSelectedItem(e)}
            >
              <CardContent className="p-4">
                <div className="text-xs text-gray-500">{e.időszak} • {e.kategória}</div>
                <div className="text-base font-bold">{e.címsor}</div>
                <div className="text-sm text-muted-foreground group-hover:block hidden absolute z-10 bg-white p-2 border shadow-lg rounded w-96 left-full ml-4 top-0">
                  {e.rövid_magyarázat}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {selectedItem && (
        <div className="p-4 border rounded shadow-xl bg-white">
          <div className="text-xl font-semibold mb-2">{selectedItem.címsor}</div>
          <div className="text-sm text-gray-500 mb-2">{selectedItem.időszak} • {selectedItem.kategória}</div>
          <p className="whitespace-pre-wrap text-sm">{selectedItem.részletes_szöveg || "(részletes tartalom még nincs kitöltve)"}</p>
          <button
            className="mt-4 text-blue-600 hover:underline text-sm"
            onClick={() => setSelectedItem(null)}
          >
            Bezárás
          </button>
        </div>
      )}
    </div>
  );
}
