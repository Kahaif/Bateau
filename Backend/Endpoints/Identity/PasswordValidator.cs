using Backend.Persistence.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Endpoints.Identity;


public static class PasswordValidator
{
    public record Request(string Password);

    public static async Task<IdentityResult> PreviewPasswordValidation(Request request, UserManager<User> userManager)
    {
        var validator = userManager.PasswordValidators.First();
        var result = await validator.ValidateAsync(userManager, null, request.Password);
        return result;
    }
}
