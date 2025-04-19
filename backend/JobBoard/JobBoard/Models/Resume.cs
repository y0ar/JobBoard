namespace JobBoard.Models;

public class Resume
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string FileUrl { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;

    public User? User { get; set; }
    
    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public int? CompanyId { get; set; }
    public Company? Company { get; set; }
}