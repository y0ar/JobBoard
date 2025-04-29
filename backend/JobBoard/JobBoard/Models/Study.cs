using System.ComponentModel.DataAnnotations;

namespace JobBoard.Models
{
    public class Study
    {
        public int Id { get; set; }

        [Required]
        public string Degree { get; set; } = string.Empty;

        [Required]
        public string Institution { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
