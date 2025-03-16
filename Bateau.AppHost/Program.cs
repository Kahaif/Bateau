var builder = DistributedApplication.CreateBuilder(args);


var dbPassword = builder.AddParameter("dbPassword", "postgres");
var dbUsername = builder.AddParameter("dbUsername", "postgres");

var db = builder.AddPostgres("db", dbPassword, dbUsername, 5432)
    .WithPgWeb()
    .WithPgAdmin()
    .AddDatabase("pgdb", "bateau");

var backend = builder.AddProject<Projects.Backend>("backend")
    .WithReference(db)
    .WaitFor(db);

builder.AddNpmApp("angular", "../Frontend")
    .WithReference(backend)
    .WaitFor(backend)
    .WithHttpEndpoint(port: 4200,  isProxied: false, targetPort: 4200)
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
