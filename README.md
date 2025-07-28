# 📦 stromschnittstelle

**XML-Export/Import-Schnittstelle für Stromaufträge (Turnustausch Stromzähler – SWTT)**  
Basierend auf der LSW XML-Dokumentation, umgesetzt in **Node.js**.  
Erstellt zur Integration in Dritt- oder Bestandslösungen wie z. B. Ninox.

---

## ⚙️ Features

- ✅ Erstellung von LSW-kompatiblen XML-Auftragsdateien (`export.js`)
- ✅ Einlesen und Auswerten von Ergebnisdateien (`import.js`)
- ✅ Stromaufträge (`SWTT`) mit Tätigkeiten wie Zählerstand und Foto
- ✅ Sauber formatiertes XML (`BLOCK > OBJ > ACT`)
- 🧪 Einfach erweiterbar mit Ninox-API, Uploads, XSD-Validierung, etc.

---

## 📁 Projektstruktur

```
stromschnittstelle/
├── export.js           # XML-Datei generieren (Stromauftrag)
├── import.js           # XML-Datei einlesen und parsen
├── strom-export.xml    # Beispielausgabe (wird automatisch erstellt)
├── package.json        # NPM-Konfiguration
└── node_modules/       # Abhängigkeiten
```

---

## 🚀 Installation

```bash
git clone https://github.com/Matzelino84/stromschnittstelle.git
cd stromschnittstelle
npm install
```

---

## ▶️ Nutzung

### 🔧 Export-Datei erzeugen
```bash
npm run export
```
Erstellt `strom-export.xml` mit Beispiel-Auftragsdaten und Tätigkeiten.

### 📥 Import einer Ergebnisdatei
```bash
npm run import
```
Liest `strom-export.xml` ein und gibt Auftrag + Tätigkeiten aus.

---

## 📝 Beispielausgabe

```bash
📝 Auftrag: 123456789
🔢 Gerät: ST123456
🔧 Tätigkeit [10001]: Zählerstand = 7890
🔧 Tätigkeit [10002]: Foto = ST123456_STROM_1630.jpg
```

---

## 📌 Anforderungen

- Node.js ≥ 16
- Pakete:
  - `xmlbuilder2`
  - `fast-xml-parser`

Installiert mit:

```bash
npm install
```

---

## 🔄 To Do / Erweiterungen (optional)

- [ ] Ninox-API-Integration (POST zu REST-Endpunkt)
- [ ] XSD-Validierung für strukturierte Importe
- [ ] Fehlerprotokollierung & Logging
- [ ] Express.js API für Dateiannahme und Weiterleitung

---

## 👤 Autor

**Matthias (@Matzelino84)**  
Mit Unterstützung durch ChatGPT | OpenAI

---

## 🧾 Lizenz

MIT – Nutzung frei für private und kommerzielle Zwecke. Kein Gewähr.