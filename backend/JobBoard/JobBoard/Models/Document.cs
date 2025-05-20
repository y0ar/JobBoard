namespace JobBoard.Models;

public class Document
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public DateTime UploadDate { get; set; }

    public int ApplicationId { get; set; }
    public Application? Application { get; set; }
}
