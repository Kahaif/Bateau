namespace Backend.Endpoints.Ships;

public class ShipDTO
{
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required long Id { get; init; }
}
