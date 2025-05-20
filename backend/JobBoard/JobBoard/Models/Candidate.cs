namespace JobBoard.Models;

public class Candidate : User
{
    public ICollection<JobAlert> JobAlerts { get; set; } = new List<JobAlert>();
    public ICollection<Application> Applications { get; set; } = new List<Application>();
    public ICollection<Study> Studies { get; set; } = new List<Study>();
    public ICollection<Experience> Experiences { get; set; } = new List<Experience>();
    public ICollection<Skill> Skills { get; set; } = new List<Skill>();
    public ICollection<Language> Languages { get; set; } = new List<Language>();

    public Resume? Resume { get; set; }
}
