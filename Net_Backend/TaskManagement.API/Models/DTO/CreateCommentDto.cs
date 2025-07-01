namespace TaskManagement.API.Models.DTO
{
    public class CreateCommentDto
    {
        public int TaskId { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
        public string FileUrl { get; set; }
    }
}