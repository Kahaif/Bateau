using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Models;


[Index(nameof(Id), nameof(NormalizedName), IsUnique = true)]
public class Ship
{

    public Ship(string name, string description)
    {
        Name = name;
        NormalizedName = name.ToUpperInvariant();
        Description = description;
    }

    public Ship()
    {
        
    }

    public int  Id { get; set; }

    private string NormalizedName { get; set; }
    public string Name { get; set; }

    public required string Description { get; init; }

}
