namespace TaskManagement.API.Models.DTO
{
    public class UpdateUserDTO
    {
        public required string Username { get; set; }
        public required string Role { get; set; }
    }
}