using System.ComponentModel.DataAnnotations;

namespace Backend.Endpoints.Ships;

public class ShipMutationRequest
{
    [Required(AllowEmptyStrings = false)]
    public required string Name { get; init; }
    public string? Description { get; init; }

}

