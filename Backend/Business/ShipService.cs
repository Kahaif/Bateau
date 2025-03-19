using Backend.Persistence;
using Backend.Persistence.Models;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

namespace Backend.Business;

public interface IShipService
{
    Task<IEnumerable<Ship>> GetUserShipsAsync(string userId);
    Task DeleteAsync(Ship ship);
    Task<Ship?> GetByIdAsync(int id);
    Task<Ship> UpdateAsync(Ship ship, string newName, string? newDescription);
    Task<bool> ShipNameExistsAsync(string userId, string name);
    Task<Ship> CreateAsync(string shipName, string? description, string userId);
}

internal class ShipService(BateauDbContext context, INameNormalizer normalizer) : IShipService
{
    public async Task<IEnumerable<Ship>> GetUserShipsAsync(string userId) =>
        await context.Ships
            .Where(s => s.UserId == userId)
            .OrderByDescending(s => s.Id)
            .ToListAsync();


    public async Task<Ship?> GetByIdAsync(int id)
    {
        return await context.Ships.FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Ship> UpdateAsync(Ship ship, string newName, string? newDescription)
    { 
        ship.Name = newName;
        ship.Description = newDescription;
        ship.NormalizedName = normalizer.Normalize(newName);
        await context.SaveChangesAsync();
        return ship;
    }

    public async Task<Ship> CreateAsync(string shipName, string? description, string userId)
    {
        var ship = new Ship
        {
            Description = description,
            NormalizedName = normalizer.Normalize(shipName),
            Name = shipName,
            UserId = userId
        };

        var newShip = await context.Ships.AddAsync(ship);
        await context.SaveChangesAsync();
        return newShip.Entity;
    }

    public async Task DeleteAsync(Ship ship)
    {
        context.Ships.Remove(ship);
        await context.SaveChangesAsync();
    }

    public async Task<bool> ShipNameExistsAsync(string userId, string name)
    {
        var normalizedName = normalizer.Normalize(name);
        return await context.Ships.AnyAsync(c => c.UserId == userId && c.NormalizedName == normalizedName);
    }
}
