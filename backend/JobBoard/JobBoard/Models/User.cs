namespace JobBoard.Models;

public class User
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = "Employer"; // Or "JobSeeker"

    public ICollection<Job>? Jobs { get; set; }
    public List<Study> Studies { get; set; } = [];
    public List<Experience> Experiences { get; set; } = [];
}