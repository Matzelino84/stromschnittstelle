## ⚡ Stromschnittstelle – Datenaustausch Ninox ↔ Cloud (inkl. Archivierung & Rückimport)

### 📌 Zielsetzung

Automatisierter Export von Stromzählerwechsel-Daten aus Ninox, deren strukturierter Versand in ZIP-Form an eine Cloud-Schnittstelle sowie Import der Rückmeldungen (z. B. ausgetauschte Zählerstände) zurück in das CRM-System.

---

### ✅ Bisher umgesetzte Funktionen

#### 1. 📄 Export aus Ninox

- **Skript:** `ninox-export.js`
- Holt alle aktuellen Aufträge aus einer Ninox-Datenbank.
- Erzeugt pro Auftrag eine strukturierte XML-Datei im Verzeichnis `/outbox/`.

#### 2. 🗌️ ZIP-Packaging

- **Skript:** `zip-packager-final.js`
- Nimmt alle XML-Dateien aus `/outbox/`
- Fügt passende Bilder (Zählerstandfotos) hinzu
- Erstellt ZIP-Paket im Verzeichnis `/pakete/`, z. B.:
  ```
  pakete/strom_export_2025-07-29T18-06-33-219Z.zip
  ```

#### 3. 🌥️ Upload zur Cloud

- **Skript:** `cloud-upload.js`
- Simuliert aktuell das Hochladen des ZIPs (Echt-Upload folgt bei Zugangsdaten)

#### 4. 📅 Rückimport von XML-Daten

- **Skript:** `ninox-import-runner.js`
- Liest Rückgabedateien (z. B. `rueckgabe.xml`)
- Extrahiert Zählernummern, Stand alt/neu, Monteur, Einbauort etc.
- Sendet strukturierte Daten (aktuell simuliert) zurück an Ninox

#### 5. ♻️ Tägliche Automatisierung

- Konfiguriert mit `PM2`
- Datei: `ecosystem.config.js`
- Führt `export-runner.js` täglich um 6 Uhr aus:
  ```json
  "cron_restart": "0 6 * * *"
  ```

---

### ⚖️ Hilfsskripte

| Datei              | Funktion                                   |
| ------------------ | ------------------------------------------ |
| `export-runner.js` | Orchestriert XML-Export und ZIP-Erstellung |
| `upload.js`        | Separates Upload-Skript (nicht aktiv)      |
| `validate-xml.js`  | XML-Validierung gegen XSD                  |
| `process-xml.js`   | (optional) Generische XML-Verarbeitung     |
| `archive.js`       | (optional) Archivierung der Daten          |

---

### 📁 Verzeichnisstruktur

```text
/outbox/          → erzeugte XML-Dateien (Export)
/pakete/          → ZIP-Pakete mit XML + Fotos
/archiv/          → optionaler Ablageort
/bilder/          → Zählerstandbilder (JPGs)
/node_modules/    → npm-Pakete
```

---

### 🚀 Technologien & Tools

- **Node.js** (ESM-Modulformat)
- **PM2** für Cron-artige Automatisierung
- **Ninox API** für Datenabruf (Token-basiert)
- **fast-xml-parser** für XML-Verarbeitung
- **zip-lib** zur ZIP-Erstellung

---

### 🧠 Aktueller Status

| Bereich         | Status              |
| --------------- | ------------------- |
| Export          | ✅ Fertig            |
| XML-Erstellung  | ✅ Fertig            |
| ZIP-Paket       | ✅ Fertig            |
| Cloud-Upload    | ⏳ Wartet auf Zugang |
| Rückimport      | ✅ Fertig (Dummy)    |
| Automatisierung | ✅ Aktiv (PM2)       |

---

### 🧰 Nächste Schritte

- Zugang zur echten Cloud-Schnittstelle hinterlegen
- Ninox-Zugangsdaten via `.env` verwalten
- Optional: XSD-Validierung aktivieren
- Monitoring via PM2 Dashboard oder Logfiles

