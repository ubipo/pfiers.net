This is something I've had on my mind for a while; a good mobile app to view [the indoor mapping data](https://wiki.openstreetmap.org/wiki/Simple_Indoor_Tagging) that's already in [OpenStreetMap](https://www.openstreetmap.org/).
I plan to release the app publicly, so I'm working towards a fully functional, usueful version (not an mvp or tech demo).
A big part of that will be the routing engine I'm currently working on. See a sneak peek of the navgraph generation below.

![Graph (points connected by lines) showing possible paths through a corridor in a building.](c:andin-navgraph.png "Navgraph for a simple building")

Beacause I created multiple parts of Andin as school assignments there are three git repositories:
- Database: [andin-db](https://github.com/ubipo/andin-db)
- API: [andin-api](https://github.com/ubipo/andin-api)
- Android app: not published yet, but you can [download a preview apk](https://drive.google.com/open?id=1Ai1lHnd0jt4swu2FdFH-H_mlOKL2R0w3)!

The database repo contains:  
Pure SQL database migrations for the [PostgreSQL](https://www.postgresql.org/) backend DB. That database contains the building and room data (physical rooms, not the android framework).
The OpenStreetMap data processing scripts are written in Python and use shapely for topology stuff.

The API repo:  
Graphql server that interacts with the PostgreSQL DB. The GraphQL library is [graphql-go](https://github.com/graphql-go/graphql), the query builder is [squirrel](https://github.com/Masterminds/squirrel) and the sql interface is [sqlx](https://github.com/jmoiron/sqlx).

The Android app:
Uses the Jetpack and room frameworks. Written in kotlin. [Download a preview apk](https://drive.google.com/open?id=1Ai1lHnd0jt4swu2FdFH-H_mlOKL2R0w3).

![Two screenshots of the Andin android application, showing a building and a room.](c:andin.jpg "Andin slippy map")
