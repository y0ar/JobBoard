namespace JobBoard.Models;

public class Skill
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;

    public int CandidateId { get; set; }
    public Candidate? Candidate { get; set; }
}
