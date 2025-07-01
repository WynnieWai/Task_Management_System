using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.Models;
using TaskManagement.API.Models.DTO;
using TaskManagement.API.Data;
using System.Linq;
using TaskManagement.API.Models.Domain; 

namespace TaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CommentsController(AppDbContext context) { _context = context; }

        [HttpGet]
        public IActionResult GetByTaskId([FromQuery] int taskId)
        {
            var comments = _context.Comments
                .Where(c => c.TaskId == taskId)
                .OrderBy(c => c.CreatedAt)
                .Select(c => new CommentDto
                {
                    Id = c.Id,
                    TaskId = c.TaskId,
                    Author = c.Author,
                    Text = c.Text,
                    FileUrl = c.FileUrl,
                    CreatedAt = c.CreatedAt
                })
                .ToList();
            return Ok(comments);
        }

        [HttpPost]
        public IActionResult Add([FromBody] CreateCommentDto dto)
        {
            var comment = new Comment
            {
                TaskId = dto.TaskId,
                Author = dto.Author,
                Text = dto.Text,
                FileUrl = dto.FileUrl,
                CreatedAt = DateTime.UtcNow
            };
            _context.Comments.Add(comment);
            _context.SaveChanges();

            var commentDto = new CommentDto
            {
                Id = comment.Id,
                TaskId = comment.TaskId,
                Author = comment.Author,
                Text = comment.Text,
                FileUrl = comment.FileUrl,
                CreatedAt = comment.CreatedAt
            };
            return Ok(commentDto);
        }

        // [HttpPost("upload")]
        // public async Task<IActionResult> UploadCommentFile([FromForm] IFormFile file)
        // {
        //     // Make sure the folder exists
        //     var uploadsRoot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "Comments");
        //     if (!Directory.Exists(uploadsRoot))
        //         Directory.CreateDirectory(uploadsRoot);

        //     var filePath = Path.Combine(uploadsRoot, file.FileName);
        //     using (var stream = new FileStream(filePath, FileMode.Create))
        //     {
        //         await file.CopyToAsync(stream);
        //     }
        //     // URL must match UseStaticFiles RequestPath
        //     var url = "/uploads/Comments/" + file.FileName;
        //     return Ok(new { url });
        // }
    }
}
