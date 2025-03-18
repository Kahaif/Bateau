using Backend.Endpoints.Identity;
using Backend.Persistence;
using Backend.Persistence.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddAuthorization();
builder.Services.AddAuthentication();

builder.Services.AddSwaggerGen(o =>
{
    o.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme (Example: 'Bearer 12345abcdef')",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
});

// configuring the DB access to use Postgres
builder.Services.AddDbContext<BateauDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("pgdb")));
    

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
app
    .MapGroup("/api")
    .MapIdentityApi<User>()
    .WithTags("Identity");


app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();



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


// ensure the database exists, creating it if necessary.
// This is only used here for demo purposes, obviously.
if (app.Environment.IsDevelopment())
{
    using var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
    var ctx = serviceScope.ServiceProvider.GetRequiredService<BateauDbContext>();
    await ctx.Database.EnsureCreatedAsync();
}

app.Run();
