namespace JobBoard.Models;

public class User
{
    public int Id { get; set; }
    public string LastName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public DateTime RegistrationDate { get; set; }
    public string UserType { get; set; } = "User";
}
