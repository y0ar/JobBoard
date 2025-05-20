namespace JobBoard.Models;

public class Statistic
{
    public int Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public DateTime Period { get; set; }
    public string Data { get; set; } = string.Empty; // JSON file

    public int AdministratorId { get; set; }
    public Administrator? Administrator { get; set; }
}
