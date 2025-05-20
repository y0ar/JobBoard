namespace JobBoard.Models;

public class Resume
{
    public int Id { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public DateTime UploadDate { get; set; }

    public int CandidateId { get; set; }
    public Candidate? Candidate { get; set; }
}
