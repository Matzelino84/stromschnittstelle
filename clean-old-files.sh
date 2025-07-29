#!/bin/bash

echo "🧼 Entferne veraltete/unnötige Dateien ..."

# Liste der verdächtigen oder doppelt vorhandenen Dateien
TO_DELETE=(
  "archive 2.js"
  "process-xml 2.js"
  "upload 2.js"
  "validate-xml 2.js"
  "readme (1).md"
)

for file in "${TO_DELETE[@]}"; do
  if [ -f "$file" ]; then
    echo "❌ Lösche: $file"
    rm "$file"
  else
    echo "✅ Datei nicht gefunden (bereits entfernt?): $file"
  fi
done

echo "✅ Aufräumen abgeschlossen!"
