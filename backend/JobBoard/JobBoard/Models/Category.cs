namespace JobBoard.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public ICollection<Job>? Jobs { get; set; }
}