using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Models;


[Index(nameof(NormalizedName), nameof(UserId), IsUnique = true)]
public class Ship
{

    public int  Id { get; set; }

    public string NormalizedName { get; set; }
    public string Name { get; set; }

    public string? Description { get; set; }

    public User User { get; set; }
    public string UserId { get; set; }


}
