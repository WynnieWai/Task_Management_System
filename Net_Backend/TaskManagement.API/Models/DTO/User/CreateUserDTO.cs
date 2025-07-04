namespace TaskManagement.API.Models.DTO
{
    public class CreateUserDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
    }
}