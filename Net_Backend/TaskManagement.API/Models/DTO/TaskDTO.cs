// // TaskManagement.API/Models/DTO/TaskDto.cs
// namespace TaskManagement.API.Models.DTO
// {
//     public class TaskDto
//     {
//         public int Id { get; set; }
//         public int ProjectId { get; set; }
//         public string Title { get; set; }
//         public string Description { get; set; }
//         public string[] Members { get; set; }
//         public DateTime StartDate { get; set; }
//         public DateTime DueDate { get; set; }
//         public string DueStatus { get; set; }
//         public string Priority { get; set; }
//         public string Status { get; set; }
//         public string File { get; set; }
//         public string FileUrl { get; set; }
//     }
// }


// TaskManagement.API/Models/DTO/TaskDto.cs
namespace TaskManagement.API.Models.DTO
{
    public class TaskDto
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string[] Members { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public string DueStatus { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public string File { get; set; }
        public string FileUrl { get; set; }

        public string SubmissionFileName { get; set; }
        public string SubmissionFileUrl { get; set; }
    }
}
