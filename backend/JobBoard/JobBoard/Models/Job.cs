namespace JobBoard.Models;

public class Job
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public float Salary { get; set; }
    public string WorkMode { get; set; } = string.Empty;
    public string JobType { get; set; } = string.Empty;
    public string RequiredEducationLevel { get; set; } = string.Empty;
    public string RequiredSkills { get; set; } = string.Empty;

    public DateTime PublicationDate { get; set; }
    public DateTime ExpirationDate { get; set; }

    public int CompanyId { get; set; }
    public Company? Company { get; set; }

    public ICollection<Application> Applications { get; set; } = new List<Application>();
}
