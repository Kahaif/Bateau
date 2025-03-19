using System.Security.Claims;
using Backend.Persistence;
using Backend.Persistence.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.EntityFrameworkCore;

namespace Backend.Endpoints.Ships;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize]
public class ShipsController(BateauDbContext context, INameNormalizer normalizer) : ControllerBase
{

    private string CurrentUserId => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;


    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShipDTO>>> GetAllAsync()
    {
        var myShips = await context.Ships
            .Where(s => s.UserId == CurrentUserId)
            .OrderByDescending(s => s.Id)
            .ToListAsync();


        return Ok(myShips!.Select(s => s.ToDTO()));

    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteAsync(int id)
    {
        var ship = await GetByIdAsync(id);
        if (ship is null)
        {
            return NotFound();
        }

        context.Ships.Remove(ship);
        await context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult<ShipDTO>> CreateAsync([FromBody] ShipMutationRequest req)
    {
        // check if  there's another entity with the given normalized name
        var otherEntity = await GetByNameAsync(req.Name);
        if (HasConflict(otherEntity))
        {
            return Conflict();
        }

        var ship = new Ship
        {
            Description = req.Description,
            NormalizedName = normalizer.Normalize(req.Name),
            Name = req.Name,
            UserId = CurrentUserId
        };
        var newShip = await context.Ships.AddAsync(ship);
        await context.SaveChangesAsync();
        return newShip.Entity.ToDTO();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ShipDTO>> UpdateAsync(int id, [FromBody] ShipMutationRequest req)
    {
        var ship = await GetByIdAsync(id);
        if (ship is null)
        {
            return NotFound();
        }

        // check if  there's another entity with the given normalized name
        var otherEntity = await GetByNameAsync(req.Name);
        if (HasConflict(otherEntity))
        {
            return Conflict();
        }


        ship.Name = req.Name;
        ship.Description = req.Description;
        ship.NormalizedName = normalizer.Normalize(req.Name);
        await context.SaveChangesAsync();
        return Ok(ship.ToDTO());
    }

    private async Task<Ship?> GetByNameAsync(string name)
    {
        var normalized = normalizer.Normalize(name);

        return await context.Ships.FirstOrDefaultAsync(s => s.NormalizedName == normalized);
    }

    private async Task<Ship?> GetByIdAsync(int id)
    {
        return await context.Ships.FirstOrDefaultAsync(s => s.Id == id);
    }

    private bool HasConflict(Ship? ship)
    {
        return ship is not null && ship.UserId == CurrentUserId;
    }


}
