var builder = DistributedApplication.CreateBuilder(args);


var dbPassword = builder.AddParameter("dbPassword", "postgres");
var dbUsername = builder.AddParameter("dbUsername", "postgres");

var db = builder.AddPostgres("Postgres", dbPassword, dbUsername, 5432)
    .WithDataBindMount("./data", isReadOnly: false)
    .WithPgWeb()
    .AddDatabase("pgdb", "bateau");


var backend = builder.AddProject<Projects.Backend>("backend")
    //.WithHttpEndpoint(7042, 443)
    .PublishAsDockerFile()
    .WithReference(db)
    .WaitFor(db);

builder.AddContainer("mailSink", "haravich/fake-smtp-server")
    .WithHttpEndpoint(1080, 1080)
    .WithEndpoint(1025, 1025);

builder.AddNpmApp("angular", "../Frontend")
    .WithReference(backend)
    .WaitFor(backend)
    .WithHttpEndpoint(port: 4200,  isProxied: false, targetPort: 4200)
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
