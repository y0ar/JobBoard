namespace JobBoard.Models;
public class Language
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ProficiencyLevel { get; set; } = string.Empty;

    public int CandidateId { get; set; }
    public Candidate? Candidate { get; set; }
}
