namespace TaskManagement.API.Models.Domain
{
    public class User
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
        public required string Role { get; set; }

        public string Status { get; set; } = "Active"; // "Active" or "Locked"

        public DateTime CreatedAt { get; set; }

    }
}