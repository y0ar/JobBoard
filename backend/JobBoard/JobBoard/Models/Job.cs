namespace JobBoard.Models;

public class Job
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    
    public string EmploymentType { get; set; } = string.Empty; // e.g., Full-Time, Part-Time
    public DateTime PostedDate { get; set; } = DateTime.UtcNow;

    public int? UserId { get; set; } // Poster (optional for now)
    public User? User { get; set; }
    
    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public int? CompanyId { get; set; }
    public Company? Company { get; set; }
}