#!/usr/bin/env python3
"""Fetch past events from the Luma API and write data/past-events.json.

The Luma endpoint occasionally returns an empty body, so the request is
retried until valid JSON is received. Non-Luma events (e.g. Meetup events,
which have no ``url`` field) already present in the output file are preserved.

Usage: ./scripts/update_past_events.py
"""
import json
import os
import sys
import time
import urllib.request

API_URL = (
    "https://api.lu.ma/calendar/get-items"
    "?calendar_api_id=cal-DfQe2kBQ7UiNr4y&period=past"
)
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT = os.path.join(ROOT_DIR, "data", "past-events.json")

# Luma rejects the default urllib User-Agent with a 403, so send a browser-like one.
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)


def fetch(url, attempts=5):
    """Fetch ``url`` and return parsed JSON, retrying on empty/invalid bodies."""
    last_err = None
    for attempt in range(1, attempts + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=30) as resp:
                body = resp.read().decode("utf-8")
            if body.strip():
                return json.loads(body)
            last_err = "empty response body"
        except Exception as err:  # noqa: BLE001 - retry on any transient error
            last_err = err
        print(
            f"Attempt {attempt}: {last_err}, retrying...", file=sys.stderr
        )
        time.sleep(attempt)
    raise SystemExit(
        f"Error: failed to fetch valid data from Luma after {attempts} attempts "
        f"({last_err})."
    )


def main():
    data = fetch(API_URL)

    events = []
    for entry in data.get("entries", []):
        evt = entry["event"]
        events.append(
            {
                "name": evt["name"],
                "start_at": evt["start_at"],
                "end_at": evt.get("end_at"),
                "timezone": evt.get("timezone", "America/Los_Angeles"),
                "url": evt["url"],
                "event_url": "https://lu.ma/" + evt["url"],
                "cover_url": evt.get("cover_url"),
                "location": evt.get("geo_address_info", {}).get("address", ""),
            }
        )

    # Preserve non-Luma (e.g. Meetup) events from the existing file.
    if os.path.exists(OUTPUT):
        with open(OUTPUT) as f:
            existing = json.load(f)
        non_luma = [e for e in existing if not e.get("url")]
        events.extend(non_luma)

    # Most recent first.
    events.sort(key=lambda e: e["start_at"], reverse=True)

    with open(OUTPUT, "w") as f:
        json.dump(events, f, indent=2)
        f.write("\n")

    print(f"Updated {OUTPUT} with {len(events)} past events.")


if __name__ == "__main__":
    main()
