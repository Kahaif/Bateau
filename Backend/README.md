# Backend

This folder contains the backend of this repo.

It uses EF Core for the persistence layer modeling, ASP.NET Core as the web server, and ASP.NET Core Identity to manage identities (such as creating endpoints and handling everything that's DB related).


## Authentication / Authorization

All identity related endpoints are mapped using [MapIdentityApi](https://learn.microsoft.com/fr-fr/dotnet/api/microsoft.aspnetcore.routing.identityapiendpointroutebuilderextensions.mapidentityapi?view=aspnetcore-9.0).

A simple (non-JWT) bearer token is used to handle authorization.

## Ships endpoints

The controller mapping every action related to ships can be found in the `Controllers` folder.

