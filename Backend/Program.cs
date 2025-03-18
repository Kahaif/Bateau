using Backend.Endpoints.Identity;
using Backend.Persistence;
using Backend.Persistence.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

// configuring the DB access to use Postgres
builder.Services.AddDbContext<BateauDbContext>(
    options => options.UseNpgsql("Postgres"));


// Identity configuration
builder.Services.AddIdentityApiEndpoints<User>(opt =>
    {
        opt.Lockout.MaxFailedAccessAttempts = 20;
        opt.Password.RequiredLength = 8;
        opt.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<BateauDbContext>();

// ==========================================================
var app = builder.Build();


// Map identity presets endpoints
// This maps common endpoints, such as sign up, sign in and token refreshing endpoints.
// cf. https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-9.0
app.MapIdentityApi<User>()
    .WithTags("Identity");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors((policyBuilder) =>
{
    // enable CORS with all sources only in dev
    if (app.Environment.IsDevelopment())
    {
        policyBuilder.AllowAnyHeader()
            .AllowAnyOrigin()
            .AllowAnyMethod();
    }
    else
    {
        policyBuilder
            .WithOrigins(app.Configuration.GetValue<string[]>("Origins") ??
                         throw new Exception("Missing cors policy in settings"));
    }
});

app.UseHttpsRedirection();


app.MapPost("/validatePassword", PasswordValidator.PreviewPasswordValidation)
.WithName("Validate password")
.WithOpenApi();

app.Run();
