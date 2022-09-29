---
name: Andin
shortDescription: An indoor map for android, with navigation and search.
technologies:
  - Android
  - GraphQL
  - Go
  - Kotlin
  - Python
gitUrl: https://github.com/ubipo/andin-api
siteUrl: https://andin.pfiers.net
image:
  url: c:projects/andin-new.webp
  alt: Two screenshots of the Andin android application, showing a map of rooms in a building
---

Andin helps you navigate complicated buildings by providing a map of the
building's floors, a 3D view of its rooms, and interactive navigation
directions. I'm no longer actively working on this app. For an Android app that
I do actively maintain, see [OsmFocus](/projects/osmfocus).

![Two screenshots of the Andin android application, showing a map of rooms in a building](c:projects/andin-new.png)

Andin's core idea is something I had on my mind for a while; a good mobile app
to view [the indoor mapping
data](https://wiki.openstreetmap.org/wiki/Simple_Indoor_Tagging) that's already
available in [OpenStreetMap](https://www.openstreetmap.org/). A big part of that
is the navgraph generator/routing engine I created. This generator creates a
navigation graph from the room and corridor polygons of the building in
OpenStreetMap.

![Graph (points connected by lines) showing possible paths through a corridor in a building.](c:projects/andin-navgraph.png "Navgraph for a simple building")

Beacause I created multiple parts of Andin as school assignments there are three
parts with corresponding git repositories:

[The database repository](https://github.com/ubipo/andin-db) contains migrations
for the [PostgreSQL](https://www.postgresql.org/) backend DB. That database
stores the processed building and room data from OpenStreetMap (physical rooms,
not the android framework). The OpenStreetMap data processing scripts are
written in Python and use shapely for topology stuff.

[The API](https://github.com/ubipo/andin-api) is served by a Graphql server
written in [Go](/technologies/go) that interacts with the PostgreSQL database. I
used [graphql-go](https://github.com/graphql-go/graphql) to handle
[GraphQL](https://graphql.org/) queries and
 [squirrel](https://github.com/Masterminds/squirrel) +
[sqlx](https://github.com/jmoiron/sqlx) for the object relation model.

[The Android app](https://github.com/ubipo/andin-android) uses [Android
Jetpack](https://developer.android.com/jetpack) and
[Room](https://developer.android.com/reference/kotlin/androidx/room/).
