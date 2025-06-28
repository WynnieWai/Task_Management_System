namespace TaskManagement.API.Models.Domain
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Goals { get; set; }
        public string Status { get; set; }
        public string Manager { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public string DueStatus { get; set; }
        public string Members { get; set; } // Comma-separated: "manager,student"
        public string Tasks { get; set; }   // Comma-separated: "Design UI,Setup Backend"
    }
}