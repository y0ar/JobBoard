namespace JobBoard.Models;

public class Application
{
    public int Id { get; set; }
    public int JobId { get; set; }
    public Job? Job { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public string CoverLetter { get; set; } = string.Empty;
    public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
}