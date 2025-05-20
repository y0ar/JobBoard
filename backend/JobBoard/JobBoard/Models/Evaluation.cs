namespace JobBoard.Models;

public class Evaluation
{
    public int Id { get; set; }
    public int Score { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime Date { get; set; }

    public int ApplicationId { get; set; }
    public Application? Application { get; set; }
}
