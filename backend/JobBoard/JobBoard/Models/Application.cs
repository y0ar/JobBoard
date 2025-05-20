namespace JobBoard.Models;

public class Application
{
    public int Id { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime ApplicationDate { get; set; }

    public int CandidateId { get; set; }
    public Candidate? Candidate { get; set; }

    public int JobId { get; set; }
    public Job? Job { get; set; }

    public ICollection<Document> Documents { get; set; } = new List<Document>();
    public ICollection<Evaluation> Evaluations { get; set; } = new List<Evaluation>();
    public ICollection<Interview> Interviews { get; set; } = new List<Interview>();
}
