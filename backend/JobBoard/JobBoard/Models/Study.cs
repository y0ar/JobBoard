namespace JobBoard.Models;

public class Study
{
    public int Id { get; set; }
    public string Degree { get; set; } = string.Empty;
    public string Institution { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    public int CandidateId { get; set; }
    public Candidate? Candidate { get; set; }
}
