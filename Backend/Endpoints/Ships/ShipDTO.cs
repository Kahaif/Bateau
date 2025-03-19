using System.Net;
using System.Reflection.Metadata.Ecma335;
using Backend.Persistence.Models;

namespace Backend.Endpoints.Ships;

public class ShipDTO(Ship ship)
{
    public string Name { get;  } =  WebUtility.HtmlEncode(ship.Name);
    public string? Description { get;  } =  WebUtility.HtmlEncode(ship.Description);

    public long Id { get;  } = ship.Id;
}

public static class ModelExtensions 
{
    public static ShipDTO ToDto(this Ship ship)
    {
        return new ShipDTO(ship);
    }
}
