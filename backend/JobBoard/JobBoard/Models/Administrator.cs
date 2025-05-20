using Microsoft.CodeAnalysis.Elfie.Diagnostics;

namespace JobBoard.Models;

public class Administrator : User
{
    public string Role { get; set; } = "Admin";

    public ICollection<Statistic> Statistics { get; set; } = new List<Statistic>();
}
