namespace JobBoard.Models;

public class Recruiter : User
{
    public string Department { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public int CompanyId { get; set; }
    public Company? Company { get; set; }
}
