using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JobBoard.Models;
using JobBoard.Data;
using Microsoft.AspNetCore.Identity.Data;
using System;

namespace JobBoard.Controllers.Authentication;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JobBoardContext _context;
    private readonly IConfiguration _config;

    public AuthController(JobBoardContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);

        if (user == null || user.Password != request.Password)
            return Unauthorized("Invalid credentials");

        var token = GenerateJwtToken(user);
        return Ok(new { token, user });
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(s: _config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var entry = _context.Entry(user);
        var userType = entry.Property("UserType").CurrentValue?.ToString();
        if (string.IsNullOrEmpty(userType))
            userType = "User";

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim("id", user.Id.ToString()),
            new Claim("role", userType),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: null,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(3),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
