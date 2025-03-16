using Backend.Persistence.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence;


public class BateauDbContext(DbContextOptions<BateauDbContext> opt) : IdentityDbContext<User>(opt);
