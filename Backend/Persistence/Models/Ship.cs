namespace Backend.Persistence.Models;

public class Ship
{
    public long Id { get; set; }

    public string Name { get; set; }

    public required string Description { get; init; }

}
