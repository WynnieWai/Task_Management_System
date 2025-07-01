// // using Microsoft.AspNetCore.Mvc;
// // using Microsoft.EntityFrameworkCore;
// // using TaskManagement.API.Data;
// // using TaskManagement.API.Models.Domain;
// // using TaskManagement.API.Models.DTO;

// // [ApiController]
// // [Route("api/[controller]")]
// // public class TasksController : ControllerBase
// // {
// //     private readonly AppDbContext _context;
// //     public TasksController(AppDbContext context) { _context = context; }

// //     // GET: api/tasks/project/5
// //     [HttpGet("project/{projectId}")]
// //     public async Task<IActionResult> GetTasksByProject(int projectId)
// //     {
// //         var tasks = await _context.Tasks
// //             .Where(t => t.ProjectId == projectId)
// //             .ToListAsync();

// //         return Ok(tasks.Select(t => new TaskDto
// //         {
// //             Id = t.Id,
// //             ProjectId = t.ProjectId,
// //             Title = t.Title,
// //             Description = t.Description,
// //             Members = t.Members?.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(m => m.Trim()).ToArray() ?? new string[0],
// //             StartDate = t.StartDate,
// //             DueDate = t.DueDate,
// //             DueStatus = t.DueStatus,
// //             Priority = t.Priority,
// //             Status = t.Status,
// //             File = t.File,
// //             FileUrl = t.FileUrl
// //         }));
// //     }

// //     // POST: api/tasks
// //     [HttpPost]
// //     public async Task<IActionResult> CreateTask(TaskDto dto)
// //     {
// //         var task = new TaskManagement.API.Models.Domain.Task
// //         {
// //             ProjectId = dto.ProjectId,
// //             Title = dto.Title,
// //             Description = dto.Description,
// //             Members = string.Join(",", dto.Members ?? new string[0]),
// //             StartDate = dto.StartDate,
// //             DueDate = dto.DueDate,
// //             DueStatus = dto.DueStatus,
// //             Priority = dto.Priority,
// //             Status = dto.Status,
// //             File = dto.File,
// //             FileUrl = dto.FileUrl
// //         };
// //         _context.Tasks.Add(task);
// //         await _context.SaveChangesAsync();
// //         dto.Id = task.Id;
// //         return CreatedAtAction(nameof(GetTasksByProject), new { projectId = task.ProjectId }, dto);
// //     }

// //     // PUT: api/tasks/5
// //     [HttpPut("{id}")]
// //     public async Task<IActionResult> UpdateTask(int id, TaskDto dto)
// //     {
// //         var task = await _context.Tasks.FindAsync(id);
// //         if (task == null) return NotFound();

// //         task.Title = dto.Title;
// //         task.Description = dto.Description;
// //         task.Members = string.Join(",", dto.Members ?? new string[0]);
// //         task.StartDate = dto.StartDate;
// //         task.DueDate = dto.DueDate;
// //         task.DueStatus = dto.DueStatus;
// //         task.Priority = dto.Priority;
// //         task.Status = dto.Status;
// //         task.File = dto.File;
// //         task.FileUrl = dto.FileUrl;

// //         await _context.SaveChangesAsync();
// //         return NoContent();
// //     }

// //     // DELETE: api/tasks/5
// //     [HttpDelete("{id}")]
// //     public async Task<IActionResult> DeleteTask(int id)
// //     {
// //         var task = await _context.Tasks.FindAsync(id);
// //         if (task == null) return NotFound();

// //         _context.Tasks.Remove(task);
// //         await _context.SaveChangesAsync();
// //         return NoContent();
// //     }

// //     // POST: api/tasks/upload
// //     [HttpPost("upload")]
// //     public async Task<IActionResult> Upload([FromForm] IFormFile file)
// //     {
// //         if (file == null || file.Length == 0)
// //             return BadRequest("No file uploaded.");

// //         var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
// //         if (!Directory.Exists(uploadsFolder))
// //             Directory.CreateDirectory(uploadsFolder);

// //         var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
// //         var filePath = Path.Combine(uploadsFolder, uniqueFileName);

// //         using (var stream = new FileStream(filePath, FileMode.Create))
// //         {
// //             await file.CopyToAsync(stream);
// //         }
// //         // Don't modify file contents!
// //         var url = $"/uploads/{uniqueFileName}";
// //         return Ok(new { url, originalName = file.FileName });
// //     }

// //     // GET: api/tasks/files/{fileName}
// //     [HttpGet("files/{fileName}")]
// //     public IActionResult GetFile(string fileName)
// //     {
// //         var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", fileName);
// //         if (!System.IO.File.Exists(filePath))
// //             return NotFound("File not found");

// //         var fileBytes = System.IO.File.ReadAllBytes(filePath);
// //         var contentType = GetContentType(fileName);

// //         return File(fileBytes, contentType, fileName);
// //     }

// //     private string GetContentType(string fileName)
// //     {
// //         var extension = Path.GetExtension(fileName).ToLowerInvariant();
// //         return extension switch
// //         {
// //             ".pdf" => "application/pdf",
// //             ".jpg" or ".jpeg" => "image/jpeg",
// //             ".png" => "image/png",
// //             ".txt" => "text/plain",
// //             ".doc" => "application/msword",
// //             ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// //             _ => "application/octet-stream"
// //         };
// //     }
// // }


// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using TaskManagement.API.Data;
// using TaskManagement.API.Models.Domain;
// using TaskManagement.API.Models.DTO;

// [ApiController]
// [Route("api/[controller]")]
// public class TasksController : ControllerBase
// {
//     private readonly AppDbContext _context;
//     public TasksController(AppDbContext context) { _context = context; }

//     // GET: api/tasks/project/5
//     [HttpGet("project/{projectId}")]
//     public async Task<IActionResult> GetTasksByProject(int projectId)
//     {
//         var tasks = await _context.Tasks
//             .Where(t => t.ProjectId == projectId)
//             .ToListAsync();

//         return Ok(tasks.Select(t => new TaskDto
//         {
//             Id = t.Id,
//             ProjectId = t.ProjectId,
//             Title = t.Title,
//             Description = t.Description,
//             Members = t.Members?.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(m => m.Trim()).ToArray() ?? new string[0],
//             StartDate = t.StartDate,
//             DueDate = t.DueDate,
//             DueStatus = t.DueStatus,
//             Priority = t.Priority,
//             Status = t.Status,
//             File = t.File,
//             FileUrl = t.FileUrl,
//             SubmissionFileName = t.SubmissionFileName,
//             SubmissionFileUrl = t.SubmissionFileUrl
//         }));
//     }

//     // POST: api/tasks
//     [HttpPost]
//     public async Task<IActionResult> CreateTask(TaskDto dto)
//     {
//         var task = new TaskManagement.API.Models.Domain.Task
//         {
//             ProjectId = dto.ProjectId,
//             Title = dto.Title,
//             Description = dto.Description,
//             Members = string.Join(",", dto.Members ?? new string[0]),
//             StartDate = dto.StartDate,
//             DueDate = dto.DueDate,
//             DueStatus = dto.DueStatus,
//             Priority = dto.Priority,
//             Status = dto.Status,
//             File = dto.File,
//             FileUrl = dto.FileUrl
//         };
//         _context.Tasks.Add(task);
//         await _context.SaveChangesAsync();
//         dto.Id = task.Id;
//         return CreatedAtAction(nameof(GetTasksByProject), new { projectId = task.ProjectId }, dto);
//     }

//     // PUT: api/tasks/5
//     [HttpPut("{id}")]
//     public async Task<IActionResult> UpdateTask(int id, TaskDto dto)
//     {
//         var task = await _context.Tasks.FindAsync(id);
//         if (task == null) return NotFound();

//         task.Title = dto.Title;
//         task.Description = dto.Description;
//         task.Members = string.Join(",", dto.Members ?? new string[0]);
//         task.StartDate = dto.StartDate;
//         task.DueDate = dto.DueDate;
//         task.DueStatus = dto.DueStatus;
//         task.Priority = dto.Priority;
//         task.Status = dto.Status;
//         task.File = dto.File;
//         task.FileUrl = dto.FileUrl;
//         task.SubmissionFileName = dto.SubmissionFileName;
//         task.SubmissionFileUrl = dto.SubmissionFileUrl;

//         await _context.SaveChangesAsync();

//         // Fetch and return the updated task as TaskDto (important!)
//         var updatedTask = await _context.Tasks.FindAsync(id);
//         var result = new TaskDto
//         {
//             Id = updatedTask.Id,
//             ProjectId = updatedTask.ProjectId,
//             Title = updatedTask.Title,
//             Description = updatedTask.Description,
//             Members = updatedTask.Members?.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(m => m.Trim()).ToArray() ?? new string[0],
//             StartDate = updatedTask.StartDate,
//             DueDate = updatedTask.DueDate,
//             DueStatus = updatedTask.DueStatus,
//             Priority = updatedTask.Priority,
//             Status = updatedTask.Status,
//             File = updatedTask.File,
//             FileUrl = updatedTask.FileUrl,
//             SubmissionFileName = updatedTask.SubmissionFileName,
//             SubmissionFileUrl = updatedTask.SubmissionFileUrl
//         };
        
//         return Ok(result);
//     }

//     // DELETE: api/tasks/5
//     [HttpDelete("{id}")]
//     public async Task<IActionResult> DeleteTask(int id)
//     {
//         var task = await _context.Tasks.FindAsync(id);
//         if (task == null) return NotFound();

//         _context.Tasks.Remove(task);
//         await _context.SaveChangesAsync();
//         return NoContent();
//     }

//     // POST: api/tasks/upload
//     [HttpPost("upload")]
//     public async Task<IActionResult> Upload([FromForm] IFormFile file)
//     {
//         if (file == null || file.Length == 0)
//             return BadRequest("No file uploaded.");

//         var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
//         if (!Directory.Exists(uploadsFolder))
//             Directory.CreateDirectory(uploadsFolder);

//         var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
//         var filePath = Path.Combine(uploadsFolder, uniqueFileName);

//         using (var stream = new FileStream(filePath, FileMode.Create))
//         {
//             await file.CopyToAsync(stream);
//         }
//         // Don't modify file contents!
//         var url = $"/uploads/{uniqueFileName}";
//         return Ok(new { url, originalName = file.FileName });
//     }

//     // GET: api/tasks/files/{fileName}
//     [HttpGet("files/{fileName}")]
//     public IActionResult GetFile(string fileName)
//     {
//         var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", fileName);
//         if (!System.IO.File.Exists(filePath))
//             return NotFound("File not found");

//         var fileBytes = System.IO.File.ReadAllBytes(filePath);
//         var contentType = GetContentType(fileName);

//         return File(fileBytes, contentType, fileName);
//     }

//     private string GetContentType(string fileName)
//     {
//         var extension = Path.GetExtension(fileName).ToLowerInvariant();
//         return extension switch
//         {
//             ".pdf" => "application/pdf",
//             ".jpg" or ".jpeg" => "image/jpeg",
//             ".png" => "image/png",
//             ".txt" => "text/plain",
//             ".doc" => "application/msword",
//             ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             _ => "application/octet-stream"
//         };
//     }

// [HttpGet("projects-with-tasks")]
// public async Task<IActionResult> GetAllProjectsWithTasks()
// {
//     var projects = await _context.Projects
//         .Include(p => p.Tasks)
//         .ToListAsync();

//     var result = projects.Select(p => new
//     {
//         id = p.Id,
//         name = p.Title,
//         tasks = (p.Tasks ?? new List<TaskManagement.API.Models.Domain.Task>()).Select(t => new
//         {
//             id = t.Id,
//             title = t.Title,
//             description = t.Description,
//             timeline = $"{t.StartDate:yyyy-MM-dd} - {t.DueDate:yyyy-MM-dd}",
//             startDate = t.StartDate,
//             dueDate = t.DueDate,
//             priority = t.Priority,
//             status = t.Status,
//             file = t.File,
//             fileUrl = t.FileUrl,
//             submissionFileName = t.SubmissionFileName,
//             submissionFileUrl = t.SubmissionFileUrl,
//             members = t.Members?.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(m => m.Trim()).ToArray() ?? new string[0],

//             //comments = new List<object>()
//         }).ToList()
//     });

//     return Ok(result);
// }

// }


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.Models.Domain;
using TaskManagement.API.Models.DTO;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;
    public TasksController(AppDbContext context) { _context = context; }

    // GET: api/tasks/project/5
    [HttpGet("project/{projectId}")]
    public async Task<IActionResult> GetTasksByProject(int projectId)
    {
        var tasks = await _context.Tasks
            .Where(t => t.ProjectId == projectId)
            .ToListAsync();

        return Ok(tasks.Select(t => new TaskDto
        {
            Id = t.Id,
            ProjectId = t.ProjectId,
            Title = t.Title,
            Description = t.Description,
            Members = t.Members?.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(m => m.Trim()).ToArray() ?? new string[0],
            StartDate = t.StartDate,
            DueDate = t.DueDate,
            DueStatus = t.DueStatus,
            Priority = t.Priority,
            Status = t.Status,
            File = t.File,
            FileUrl = t.FileUrl,
            SubmissionFileName = t.SubmissionFileName,
            SubmissionFileUrl = t.SubmissionFileUrl
        }));
    }

    // POST: api/tasks
    [HttpPost]
    public async Task<IActionResult> CreateTask(TaskDto dto)
    {
        var task = new TaskManagement.API.Models.Domain.Task
        {
            ProjectId = dto.ProjectId,
            Title = dto.Title,
            Description = dto.Description,
            Members = string.Join(",", dto.Members ?? new string[0]),
            StartDate = dto.StartDate,
            DueDate = dto.DueDate,
            DueStatus = dto.DueStatus,
            Priority = dto.Priority,
            Status = dto.Status,
            File = dto.File,
            FileUrl = dto.FileUrl
        };
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        dto.Id = task.Id;
        return CreatedAtAction(nameof(GetTasksByProject), new { projectId = task.ProjectId }, dto);
    }

    // PUT: api/tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, TaskDto dto)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Members = string.Join(",", dto.Members ?? new string[0]);
        task.StartDate = dto.StartDate;
        task.DueDate = dto.DueDate;
        task.DueStatus = dto.DueStatus;
        task.Priority = dto.Priority;
        task.Status = dto.Status;
        task.File = dto.File;
        task.FileUrl = dto.FileUrl;
        task.SubmissionFileName = dto.SubmissionFileName;
        task.SubmissionFileUrl = dto.SubmissionFileUrl;

        await _context.SaveChangesAsync();

        // Fetch and return the updated task as TaskDto (important!)
        var updatedTask = await _context.Tasks.FindAsync(id);
        var result = new TaskDto
        {
            Id = updatedTask.Id,
            ProjectId = updatedTask.ProjectId,
            Title = updatedTask.Title,
            Description = updatedTask.Description,
            Members = updatedTask.Members?.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(m => m.Trim()).ToArray() ?? new string[0],
            StartDate = updatedTask.StartDate,
            DueDate = updatedTask.DueDate,
            DueStatus = updatedTask.DueStatus,
            Priority = updatedTask.Priority,
            Status = updatedTask.Status,
            File = updatedTask.File,
            FileUrl = updatedTask.FileUrl,
            SubmissionFileName = updatedTask.SubmissionFileName,
            SubmissionFileUrl = updatedTask.SubmissionFileUrl
        };

        return Ok(result);
    }

    // DELETE: api/tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // POST: api/tasks/upload
    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        // Don't modify file contents!
        var url = $"/uploads/{uniqueFileName}";
        return Ok(new { url, originalName = file.FileName });
    }

    // GET: api/tasks/files/{fileName}
    [HttpGet("files/{fileName}")]
    public IActionResult GetFile(string fileName)
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", fileName);
        if (!System.IO.File.Exists(filePath))
            return NotFound("File not found");

        var fileBytes = System.IO.File.ReadAllBytes(filePath);
        var contentType = GetContentType(fileName);

        return File(fileBytes, contentType, fileName);
    }

    private string GetContentType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        return extension switch
        {
            ".pdf" => "application/pdf",
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".txt" => "text/plain",
            ".doc" => "application/msword",
            ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            _ => "application/octet-stream"
        };
    }

    [HttpGet("projects-with-tasks")]
    public async Task<IActionResult> GetAllProjectsWithTasks()
    {
        var projects = await _context.Projects
            .Include(p => p.Tasks)
            .ToListAsync();

        var result = projects.Select(p => new
        {
            id = p.Id,
            name = p.Title,
            tasks = (p.Tasks ?? new List<TaskManagement.API.Models.Domain.Task>()).Select(t => new
            {
                id = t.Id,
                title = t.Title,
                description = t.Description,
                timeline = $"{t.StartDate:yyyy-MM-dd} - {t.DueDate:yyyy-MM-dd}",
                startDate = t.StartDate,
                dueDate = t.DueDate,
                priority = t.Priority,
                status = t.Status,
                file = t.File,
                fileUrl = t.FileUrl,
                submissionFileName = t.SubmissionFileName,
                submissionFileUrl = t.SubmissionFileUrl,
                members = t.Members?.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(m => m.Trim()).ToArray() ?? new string[0],

                //comments = new List<object>()
            }).ToList()
        });

        return Ok(result);
    }


}
