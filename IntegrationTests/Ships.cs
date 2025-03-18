using FluentAssertions;

namespace IntegrationTests;

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

}
