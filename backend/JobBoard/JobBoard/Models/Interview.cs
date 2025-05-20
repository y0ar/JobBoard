namespace JobBoard.Models;

public class Interview
{
    public int Id { get; set; }
    public DateTime DateTime { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Interviewer { get; set; } = string.Empty;
    public string Result { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;

    public int ApplicationId { get; set; }
    public Application? Application { get; set; }
}
