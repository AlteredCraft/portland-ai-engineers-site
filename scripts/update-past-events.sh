#!/usr/bin/env bash
# Fetches past events from the Luma API and writes data/past-events.json.
# Thin wrapper around update_past_events.py (the actual implementation).
# Usage: ./scripts/update-past-events.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec python3 "$SCRIPT_DIR/update_past_events.py"
