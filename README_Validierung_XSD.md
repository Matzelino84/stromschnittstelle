# ⚡ Stromschnittstelle Ninox ↔︎ Argos (LSW)

Dieses Projekt ermöglicht den bidirektionalen Austausch von Stromzähler-Daten zwischen **Ninox** (CRM) und dem **Argos-System** über XML-Dateien.

---

## 📦 Funktionen

- ✅ **Import** von Argos-XML in Ninox (inkl. Tätigkeiten wie Zählerstand & Foto)
- ✅ **Export** von aktualisierten Daten aus Ninox als XML
- ✅ **XML-Validierung** (wohlgeformt)
- ✅ **Simulierter Upload** in ein `outbox`-Verzeichnis
- ✅ **Archivierung** nach Datum (`./archiv/yyyy-mm-dd/`)
- 🔜 Optional: XSD-Prüfung, echter SFTP/API-Upload

---

## 🚀 Schnellstart

### 🔧 1. Vorbereitung

```bash
npm install
node setup.js
```

### 🔁 2. Export aus Ninox als XML

> ACHTUNG: Ersetze Dummy-Token im `ninox-export.js`

```bash
node ninox-export.js
```

Ergebnis: `strom_export_17.xml`

### 🧪 3. Gesamtverarbeitung

```bash
node process-xml.js strom_export_17.xml
```

Führt automatisch aus:

- ✅ `validate-xml.js`
- 📤 `upload.js`
- 🗃️ `archive.js`

---

## 🧰 Einzelne Werkzeuge

```bash
node validate-xml.js strom_export_17.xml   # Prüft XML-Syntax
node upload.js strom_export_17.xml         # Kopiert Datei nach ./outbox/
node archive.js strom_export_17.xml        # Verschiebt Datei in ./archiv/yyyy-mm-dd/
```

---

## 🔐 API-Konfiguration

In `ninox-export.js` / `ninox-import-obj.js`:

```js
const NINOX_TOKEN = 'eyJ...';       // von https://app.ninox.com/settings/token
const TEAM_ID = 'team_abc123xyz';
const DATABASE_ID = 'db_456def789ghi';
const TABLE_NAME = 'users_table';
```

---

## 🧪 Beispiel-XML

```xml
<StromzaehlerWechsel>
  <Zaehlernummer>1234567890</Zaehlernummer>
  ...
</StromzaehlerWechsel>
```

---

## 📂 Projektstruktur

```
stromschnittstelle/
├─ strom_export_17.xml
├─ ninox-export.js
├─ ninox-import-obj.js
├─ process-xml.js
├─ validate-xml.js
├─ upload.js
├─ archive.js
├─ setup.js
├─ outbox/
└─ archiv/yyyy-mm-dd/
```

---

## 🧑‍💻 Kontakt & Mitwirken

Erstellt mit ❤️ für den praktischen Einsatz im Zählermanagement.

Mitwirkende: [Matzelino84](https://github.com/Matzelino84)