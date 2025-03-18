using Microsoft.AspNetCore.Identity;

namespace Backend.Persistence.Models;

public class User : IdentityUser
{

    public ICollection<Ship> Ships { get; set; } = [];

}
