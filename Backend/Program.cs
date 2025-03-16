using Backend.Persistence;
using Backend.Persistence.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BateauDbContext>(
    options => options.UseNpgsql("Postgres"));
builder.Services.AddIdentityApiEndpoints<User>(opt =>
    {
        opt.Lockout.MaxFailedAccessAttempts = 20;
        opt.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<BateauDbContext>();





var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapGet("/weatherforecast", () =>
{

})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();
