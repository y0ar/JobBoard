using System.ComponentModel.DataAnnotations;

namespace JobBoard.Models
{
    public class Experience
    {
        public int Id { get; set; }

        [Required]
        public string Position { get; set; } = string.Empty;

        [Required]
        public string CompanyName { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string? Description { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
