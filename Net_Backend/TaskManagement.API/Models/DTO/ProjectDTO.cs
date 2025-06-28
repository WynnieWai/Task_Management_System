namespace TaskManagement.API.Models.DTO
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Goals { get; set; }
        public string Status { get; set; }
        public string Manager { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public string DueStatus { get; set; }
        public string[] Members { get; set; }
        public string[] Tasks { get; set; }
    }
}