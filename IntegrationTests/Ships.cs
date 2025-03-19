using System.Net.Http.Json;
using System.Net.Mail;
using System.Text;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Identity.Data;
using System.Text.Json;
using IdentityModel.Client;

namespace IntegrationTests;


internal static class HttpClientExtensions
{
    public static async Task Register(this HttpClient client, string mail, string password)
    {
        var req = new RegisterRequest
        {
            Password = password,
            Email = mail
        };
        var json = JsonSerializer.Serialize(req);
        await client.PostAsync("/api/register", new StringContent(json, Encoding.UTF8, "application/json"));
    }

    public static async Task<AccessTokenResponse> Login(this HttpClient client, string mail, string password)
    {
        var content = new LoginRequest
        {
            Password = password,
            Email = mail
        };
        var json = JsonSerializer.Serialize(content);
        var res =  await client.PostAsync("/api/login", new StringContent(json, Encoding.UTF8, "application/json"));
        res.EnsureSuccessStatusCode();
        return await res.Content.ReadFromJsonAsync<AccessTokenResponse>();
    }

    public static async Task<AccessTokenResponse> NewAccountAndLogin(this HttpClient c)
    {
        var mail = Guid.NewGuid() + "@mail";
        var pwd = Guid.NewGuid() + " $ l @ dasd DASD SD";
        await c.Register(mail, pwd);
        return await c.Login(mail, pwd);
    }

}

public class Ships
{
    [Fact]
    public async Task EndpointsAreSecured()
    {
        // Arrange
        var appHost = await DistributedApplicationTestingBuilder.CreateAsync<Projects.Bateau_AppHost>();
        appHost.Services.ConfigureHttpClientDefaults(c => {});

        await using var app = await appHost.BuildAsync();
        var resourceNotificationService = app.Services.GetRequiredService<ResourceNotificationService>();
        await app.StartAsync();

        // Act
        var httpClient = app.CreateHttpClient("backend");
        await resourceNotificationService.WaitForResourceAsync("backend", KnownResourceStates.Running).WaitAsync(TimeSpan.FromSeconds(30));

        var response = await httpClient.GetAsync("/api/v1/ships");
        var responseDelete = await httpClient.DeleteAsync("/api/v1/ships/10");
        var responseUpdate = await httpClient.PutAsync("/api/v1/ships/10", null);
        var responseCreation = await httpClient.PostAsync("/api/v1/ships", null);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        responseDelete.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        responseUpdate.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        responseCreation.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

   

    [Fact]
    public async Task GetAllShipsOfUser_ReturnsThem()
    {
        // Arrange
        var appHost = await DistributedApplicationTestingBuilder.CreateAsync<Projects.Bateau_AppHost>();
        appHost.Services.ConfigureHttpClientDefaults(c => {});

        await using var app = await appHost.BuildAsync();
        var resourceNotificationService = app.Services.GetRequiredService<ResourceNotificationService>();
        await app.StartAsync();

        var httpClient = app.CreateHttpClient("backend");
        await resourceNotificationService.WaitForResourceAsync("backend", KnownResourceStates.Running).WaitAsync(TimeSpan.FromSeconds(30));

        // Act
        var account = await httpClient.NewAccountAndLogin();
        httpClient.SetBearerToken(account.AccessToken);
        var response = await httpClient.GetAsync("/api/v1/ships");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

}
