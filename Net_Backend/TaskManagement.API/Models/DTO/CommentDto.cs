namespace TaskManagement.API.Models.DTO
{
    public class CommentDto
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
        public string FileUrl { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}