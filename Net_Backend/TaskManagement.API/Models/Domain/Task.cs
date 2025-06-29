// // TaskManagement.API/Models/Domain/Task.cs
// namespace TaskManagement.API.Models.Domain
// {
//     public class Task
//     {
//         public int Id { get; set; }
//         public int ProjectId { get; set; }           // Foreign key
//         public string Title { get; set; }
//         public string Description { get; set; }
//         public string Members { get; set; }          // "Alice,Bob"
//         public DateTime StartDate { get; set; }
//         public DateTime DueDate { get; set; }
//         public string DueStatus { get; set; }
//         public string Priority { get; set; }
//         public string Status { get; set; }
//         public string File { get; set; }
//         public string FileUrl { get; set; }   
//     }
// }

// TaskManagement.API/Models/Domain/Task.cs
namespace TaskManagement.API.Models.Domain
{
    public class Task
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }           // Foreign key
        public string Title { get; set; }
        public string Description { get; set; }
        public string Members { get; set; }          // "Alice,Bob"
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public string DueStatus { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public string File { get; set; }
        public string FileUrl { get; set; }   
        
        public string? SubmissionFileName { get; set; }
        public string? SubmissionFileUrl { get; set; }
    }
}
