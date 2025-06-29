using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.Data;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("admin-stats")]
    public IActionResult GetAdminStats()
    {
        var totalUsers = _context.Users.Count();
        var totalProjects = _context.Projects.Count();

        var projectsByStatus = _context.Projects
            .GroupBy(p => p.Status)
            .Select(g => new { status = g.Key, count = g.Count() })
            .ToList();

        var projectsByManager = _context.Projects
            .GroupBy(p => p.Manager)
            .Select(g => new { manager = g.Key, count = g.Count() })
            .ToList();

        return Ok(new
        {
            totalUsers,
            totalProjects,
            projectsByStatus,
            projectsByManager
        });
    }
}