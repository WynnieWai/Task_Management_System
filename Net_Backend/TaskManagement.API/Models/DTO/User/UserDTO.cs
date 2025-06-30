namespace TaskManagement.API.Models.DTO
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public required string Username { get; set; }
        public required string Role { get; set; }

        public string Status { get; set; } = "Active";

    }
}