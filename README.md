# Bateau

Simple CRUD app using a postgres DB, an angular frontend, and an ASP.NET Core 8 backend.

## Running the app

.NET Aspire has has been used to spin up the containers and orchestrate the dependencies, but you may also use docker compose by simply running `docker compose up` in the project's root.

Once the containers are orchestrated, the frontend will be available here : `http://localhost:9084`

Be aware that the database is deleted and created between runs.
