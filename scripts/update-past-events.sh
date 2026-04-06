#!/usr/bin/env bash
# Fetches past events from the Luma API and writes data/past-events.json
# Usage: ./scripts/update-past-events.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT="$ROOT_DIR/data/past-events.json"
export OUTPUT_FILE="$OUTPUT"

curl -sL 'https://api.lu.ma/calendar/get-items?calendar_api_id=cal-DfQe2kBQ7UiNr4y&period=past' \
  | python3 -c "
import json, sys, os

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
        'event_url': 'https://lu.ma/' + evt['url'],
        'cover_url': evt.get('cover_url'),
        'location': evt.get('geo_address_info', {}).get('address', '')
    })

# Preserve non-Luma (e.g. Meetup) events from existing file
output_path = os.environ.get('OUTPUT_FILE', '')
if output_path and os.path.exists(output_path):
    with open(output_path) as f:
        existing = json.load(f)
    non_luma = [e for e in existing if not e.get('url')]
    events.extend(non_luma)

# Most recent first
events.sort(key=lambda e: e['start_at'], reverse=True)
print(json.dumps(events, indent=2))
" > "$OUTPUT"

echo "Updated $OUTPUT with $(python3 -c "import json; print(len(json.load(open('$OUTPUT'))))" ) past events."
