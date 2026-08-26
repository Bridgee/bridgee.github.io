# Analytics and Search Verification

## Google Search Console

The repository preserves the URL-prefix ownership verification file at:

`public/googleb988f0ae90c1aeb8.html`

Astro copies this file to the root of the production build. The content and build validators fail if the file is removed, which protects the existing verification path during future maintenance.

Search Console is not a general visitor analytics service. It reports Google Search performance such as impressions, clicks, queries, and indexing status. Access to those reports must be checked in the Google Search Console account that owns the property.

## Google Analytics

No Google Analytics or Google Tag Manager tag is configured. The source contains no `gtag`, Tag Manager container, Universal Analytics ID, or GA4 measurement ID. The site therefore does not currently send general page-view or visitor-location data to Google Analytics.

## Historical Visitor Map

The maintained build no longer contains third-party ClustrMaps scripts, the visitor-map icon, or a `/visitor_stats` page. That integration was removed because:

- the provider and its current privacy documentation could not be reliably verified;
- the embedded scripts process visitor network/location information, so the old statement `No personal data collected` was not supportable; and
- the provider endpoints were not reliable enough to treat the widget as a maintained site feature.

The site does not currently collect or display visitor-location statistics.

## Adding Analytics Later

Before adding a replacement, decide which metrics are actually needed and document the provider, data collected, retention, geographic processing, and opt-out behavior. Add a truthful privacy notice before enabling any visitor-location or behavioral tracking.
