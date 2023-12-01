---
name: OSMfocus
shortDescription: Open source tool to examine
      [OpenStreetMap](https://www.openstreetmap.org/about) data on a map.
technologies:
  - Android
  - Kotlin
gitUrl: https://github.com/ubipo/osmfocus
siteUrl: https://play.google.com/store/apps/details?id=net.pfiers.osmfocus
image:
  href: osmfocus.webp
  alt: OSMfocus Reborn logo on OpenStreetMap map background
---

![Banner](osmfocus.webp)

[Michael Vittrup Larsen's](https://github.com/MichaelVL) OSMfocus was an
incredibly useful tool to investigate and debug OpenStreetMap data.
Unfortunately the app stopped working with the deprecation of the non-TLS
version of the [OpenStreetMap
API](https://wiki.openstreetmap.org/wiki/API_v0.6).

Michael no longer had the time to [maintain the
app](https://github.com/MichaelVL/osm-focus), so I decided to pick up the
project and released an new version from scratch, dubbed *OSMfocus Reborn*. This
new version uses [Kotlin](https://kotlinlang.org) and [Android
Jetpack](https://developer.android.com/jetpack) and has 100+ active users on
Google Play (I don't have usage numbers from F-Droid because the app has no
tracking).

You can download it on [Google
Play](https://play.google.com/store/apps/details?id=net.pfiers.osmfocus) or via
[F-Droid](http://fdroid.org/en/packages/net.pfiers.osmfocus).

![Screenshot of OSMfocus, showing how OpenStreetMap data for lakes and buildings
is revealed on a map](osmfocus-screenshot.webp "Boxes showing the
'tags' (underlying data) for OpenStreetMap elements")
