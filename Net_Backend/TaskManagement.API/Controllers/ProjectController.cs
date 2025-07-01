using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.Models.Domain;
using TaskManagement.API.Models.DTO;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _context;
    public ProjectsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var projects = await _context.Projects
            .Include(p => p.Tasks)
            .ToListAsync();

        return Ok(projects.Select(p => new ProjectDto
        {
            Id = p.Id,
            Title = p.Title,
            Goals = p.Goals,
            Status = p.Status,
            Manager = p.Manager,
            StartDate = p.StartDate,
            DueDate = p.DueDate,
            DueStatus = p.DueStatus,
            Members = p.Members?.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(m => m.Trim()).ToArray() ?? new string[0],
            Tasks = p.Tasks?.Select(t => t.Title).ToArray() ?? new string[0]
        }));
    }

    // *** Get one project by ID  ***
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProject(int id)
    {
        var project = await _context.Projects
            .Include(p => p.Tasks)
            .FirstOrDefaultAsync(p => p.Id == id);
        if (project == null) return NotFound();

        var result = new ProjectDto
        {
            Id = project.Id,
            Title = project.Title,
            Goals = project.Goals,
            Status = project.Status,
            Manager = project.Manager,
            StartDate = project.StartDate,
            DueDate = project.DueDate,
            DueStatus = project.DueStatus,
            Members = project.Members?.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(m => m.Trim()).ToArray() ?? new string[0],
            Tasks = project.Tasks?.Select(t => t.Title).ToArray() ?? new string[0]
        };
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject(ProjectDto dto)
    {
        var project = new Project
        {
            Title = dto.Title,
            Goals = dto.Goals,
            Status = dto.Status,
            Manager = dto.Manager,
            StartDate = dto.StartDate,
            DueDate = dto.DueDate,
            DueStatus = dto.DueStatus,
            Members = string.Join(",", dto.Members ?? new string[0]),
        };
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        dto.Id = project.Id;
        return CreatedAtAction(nameof(GetProjects), new { id = project.Id }, dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProject(int id, ProjectDto dto)
    {
        var project = await _context.Projects
            .Include(p => p.Tasks)
            .FirstOrDefaultAsync(p => p.Id == id);
        if (project == null) return NotFound();

        project.Title = dto.Title;
        project.Goals = dto.Goals;
        project.Status = dto.Status;
        project.Manager = dto.Manager;
        project.StartDate = dto.StartDate;
        project.DueDate = dto.DueDate;
        project.DueStatus = dto.DueStatus;
        project.Members = string.Join(",", dto.Members ?? new string[0]);
        // project.Tasks = string.Join(",", dto.Tasks ?? new string[0]);

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await _context.Projects
            .Include(p => p.Tasks)
            .FirstOrDefaultAsync(p => p.Id == id);
        if (project == null) return NotFound();

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}