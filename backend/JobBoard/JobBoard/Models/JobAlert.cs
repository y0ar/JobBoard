namespace JobBoard.Models;

public class JobAlert
{
    public int Id { get; set; }
    public string Keywords { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string AlertType { get; set; } = string.Empty;
    public string Frequency { get; set; } = string.Empty;

    public int CandidateId { get; set; }
    public Candidate? Candidate { get; set; }
}
