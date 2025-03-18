using Backend.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Endpoints.Ships;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize]
public class ShipsController(BateauDbContext context) : ControllerBase
{
    private readonly BateauDbContext _context = context;


    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShipDTO>>> GetAllAsync()
    {
        return null;
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<IEnumerable<ShipDTO>>> DeleteAsync(int id)
    {
        return null;
    }

    [HttpPost]
    public async Task<ActionResult<IEnumerable<ShipDTO>>> CreateAsync(int id)
    {
        return null;
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<IEnumerable<ShipDTO>>> UpdateAsync(int id)
    {
        return null;
    }

}
