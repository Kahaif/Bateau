var builder = DistributedApplication.CreateBuilder(args);


var dbPassword = builder.AddParameter("dbPassword", "postgres");
var dbUsername = builder.AddParameter("dbUsername", "postgres");

var db = builder.AddPostgres("Postgres", dbPassword, dbUsername, 5432)
    .WithDataBindMount("./data", isReadOnly: false)
    .PublishAsContainer()
    .AddDatabase("pgdb", "bateau");


var backend = builder.AddProject<Projects.Backend>("backend")
    .PublishAsDockerFile()
    .WithEnvironment("ASPNETCORE_ENVIRONMENT", "Development")
    .WithReference(db)
    .WaitFor(db);

builder.AddNpmApp("angular", "../Frontend")
    .WithReference(backend)
    .WaitFor(backend)
    .WithHttpEndpoint(port: 4200,  isProxied: false, targetPort: 4200)
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
