namespace JobBoard.Models;

public class Experience
{
    public int Id { get; set; }
    public string Position { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    public string Description { get; set; } = string.Empty;

    public int CandidateId { get; set; }
    public Candidate? Candidate { get; set; }
}
