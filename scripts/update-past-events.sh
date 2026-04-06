#!/usr/bin/env bash
# Fetches past events from the Luma API and writes data/past-events.json
# Usage: ./scripts/update-past-events.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT="$ROOT_DIR/data/past-events.json"

curl -sL 'https://api.lu.ma/calendar/get-items?calendar_api_id=cal-DfQe2kBQ7UiNr4y&period=past' \
  | python3 -c "
import json, sys
data = json.load(sys.stdin)
events = []
for entry in data.get('entries', []):
    evt = entry['event']
    events.append({
        'name': evt['name'],
        'start_at': evt['start_at'],
        'end_at': evt.get('end_at'),
        'timezone': evt.get('timezone', 'America/Los_Angeles'),
        'url': evt['url'],
        'cover_url': evt.get('cover_url'),
        'location': evt.get('geo_address_info', {}).get('address', '')
    })
# Most recent first
events.sort(key=lambda e: e['start_at'], reverse=True)
print(json.dumps(events, indent=2))
" > "$OUTPUT"

echo "Updated $OUTPUT with $(python3 -c "import json; print(len(json.load(open('$OUTPUT'))))" ) past events."
