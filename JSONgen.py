import pandas as pd
import json

# Excel fájl beolvasása
xlsx_path = "idővonal.xlsx"
df = pd.read_excel(xlsx_path)

# Oszlopnevek egységesítése
df.columns = [col.strip().lower() for col in df.columns]

# JSON konvertálása az elvárt struktúrába
output = []
for _, row in df.iterrows():
    record = {
        "időszak": row.get("évszázad", ""),
        "év": int(row.get("év", 0)),
        "kategória": row.get("kategória", ""),
        "címsor": row.get("címsor", ""),
        "rövid_magyarázat": f"{row.get('buborék_5sor_0sora', '')} – {row.get('buborék_5sor_1–4sora', '')}",
        "részletes_szöveg": row.get("részletes_szöveg (a4)", ""),
        "szín": row.get("színkód", "#cccccc")
    }
    output.append(record)

# Eredmény JSON fájlba írása
json_path = "idovonal_kesz.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

json_path
