using System.Security.Claims;
using Backend.Business;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Endpoints.Ships;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize]
public class ShipsController(IShipService service) : ControllerBase
{

    private string CurrentUserId => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;


    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShipDTO>>> GetAllAsync()
    {
        var myShips = await service.GetUserShipsAsync(CurrentUserId);
        return Ok(myShips!.Select(s => s.ToDto()));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteAsync(int id)
    {
        var ship = await service.GetByIdAsync(id);
        if (ship is null)
        {
            return NotFound();
        }

        await service.DeleteAsync(ship);
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult<ShipDTO>> CreateAsync([FromBody] ShipMutationRequest req)
    {
        // Ensure that there's no another ship with that name
        if (await service.ShipNameExistsAsync(CurrentUserId, req.Name))
        {
            return Conflict();
        }

        var newShip = await service.CreateAsync(req.Name, req.Description, CurrentUserId);
        return newShip.ToDto();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ShipDTO>> UpdateAsync(int id, [FromBody] ShipMutationRequest req)
    {
        var ship = await service.GetByIdAsync(id);
        if (ship is null)
        {
            return NotFound();
        }

        // it is expected from the front to always send the complete ship.
        // If the names are not the same, it's a change request so we ensure that there's no conflict too
        if (ship.Name != req.Name && await service.ShipNameExistsAsync(CurrentUserId, req.Name))
        {
            return Conflict();
        }

        ship = await service.UpdateAsync(ship, req.Name, req.Description);
        return Ok(ship.ToDto());
    }

}
