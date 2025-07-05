// using Microsoft.AspNetCore.Mvc;
// using TaskManagement.API.Data;

// [ApiController]
// [Route("api/[controller]")]
// public class DashboardController : ControllerBase
// {
//     private readonly AppDbContext _context;

//     public DashboardController(AppDbContext context)
//     {
//         _context = context;
//     }

//     [HttpGet("admin-stats")]
//     public IActionResult GetAdminStats()
//     {
//         var totalUsers = _context.Users.Count();
//         var totalProjects = _context.Projects.Count();

//         var projectsByStatus = _context.Projects
//             .GroupBy(p => p.Status)
//             .Select(g => new { status = g.Key, count = g.Count() })
//             .ToList();

//         var projectsByManager = _context.Projects
//             .GroupBy(p => p.Manager)
//             .Select(g => new { manager = g.Key, count = g.Count() })
//             .ToList();

//         return Ok(new
//         {
//             totalUsers,
//             totalProjects,
//             projectsByStatus,
//             projectsByManager
//         });
//     }
// }

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    // [HttpGet("admin-stats")]
    // public async Task<IActionResult> GetAdminStats()
    // {
    //     var now = DateTime.UtcNow.Date;
    //     // 1. Basic counts
    //     var totalUsers = await _context.Users.CountAsync();
    //     var totalProjects = await _context.Projects.CountAsync();
    //     var totalTasks = await _context.Tasks.CountAsync();

    //     // 2. Users by Role (current total)
    //     var userByRoleData = await _context.Users
    //         .GroupBy(u => u.Role)
    //         .Select(g => new { name = g.Key, value = g.Count() })
    //         .ToListAsync();

    //     // 3. Projects by Manager
    //     var projectsByManager = await _context.Projects
    //         .GroupBy(p => p.Manager)
    //         .Select(g => new { manager = g.Key, projects = g.Count() })
    //         .ToListAsync();

    //     // 4. Projects by Status
    //     var adminProjectByStatus = await _context.Projects
    //         .GroupBy(p => p.Status)
    //         .Select(g => new { name = g.Key, value = g.Count() })
    //         .ToListAsync();

    //     // 5. Tasks by Status
    //     var adminTaskByStatus = await _context.Tasks
    //         .GroupBy(t => t.Status)
    //         .Select(g => new { name = g.Key, value = g.Count() })
    //         .ToListAsync();

    //     // 6. ACTIVITY REPORT (USERS ADDED by Role)
    //     // Weekly: last 4 weeks
    //     var weeks = Enumerable.Range(0, 4)
    //         .Select(i => now.AddDays(-(7 * (3 - i))))
    //         .ToList();

    //     var weekly = new List<object>();
    //     for (int i = 0; i < 4; i++)
    //     {
    //         var start = weeks[i];
    //         var end = start.AddDays(7);
    //         var admin = await _context.Users.CountAsync(u => u.Role == "Admin" && u.CreatedAt >= start && u.CreatedAt < end);
    //         var manager = await _context.Users.CountAsync(u => u.Role == "ProjectManager" && u.CreatedAt >= start && u.CreatedAt < end);
    //         var contributor = await _context.Users.CountAsync(u => u.Role == "Contributor" && u.CreatedAt >= start && u.CreatedAt < end);

    //         weekly.Add(new
    //         {
    //             period = $"Week {i + 1}",
    //             Admin = admin,
    //             Manager = manager,
    //             Contributor = contributor
    //         });
    //     }

    //     // Monthly: last 6 months
    //     var months = Enumerable.Range(0, 6)
    //         .Select(i => new DateTime(now.Year, now.Month, 1).AddMonths(-5 + i))
    //         .ToList();

    //     var monthly = new List<object>();
    //     for (int i = 0; i < 6; i++)
    //     {
    //         var start = months[i];
    //         var end = start.AddMonths(1);
    //         var admin = await _context.Users.CountAsync(u => u.Role == "Admin" && u.CreatedAt >= start && u.CreatedAt < end);
    //         var manager = await _context.Users.CountAsync(u => u.Role == "ProjectManager" && u.CreatedAt >= start && u.CreatedAt < end);
    //         var contributor = await _context.Users.CountAsync(u => u.Role == "Contributor" && u.CreatedAt >= start && u.CreatedAt < end);

    //         monthly.Add(new
    //         {
    //             period = start.ToString("MMM yyyy"),
    //             Admin = admin,
    //             Manager = manager,
    //             Contributor = contributor
    //         });
    //     }

    //     // Yearly: last 4 years
    //     var years = Enumerable.Range(0, 4)
    //         .Select(i => new DateTime(now.Year - 3 + i, 1, 1))
    //         .ToList();

    //     var yearly = new List<object>();
    //     for (int i = 0; i < 4; i++)
    //     {
    //         var start = years[i];
    //         var end = start.AddYears(1);
    //         var admin = await _context.Users.CountAsync(u => u.Role == "Admin" && u.CreatedAt >= start && u.CreatedAt < end);
    //         var manager = await _context.Users.CountAsync(u => u.Role == "ProjectManager" && u.CreatedAt >= start && u.CreatedAt < end);
    //         var contributor = await _context.Users.CountAsync(u => u.Role == "Contributor" && u.CreatedAt >= start && u.CreatedAt < end);

    //         yearly.Add(new
    //         {
    //             period = start.ToString("yyyy"),
    //             Admin = admin,
    //             Manager = manager,
    //             Contributor = contributor
    //         });
    //     }

    //     return Ok(new
    //     {
    //         totalUsers,
    //         totalProjects,
    //         totalTasks,
    //         userByRoleData,
    //         projectsByManager,
    //         adminProjectByStatus,
    //         adminTaskByStatus,
    //         adminActivityDataset = new
    //         {
    //             weekly,
    //             monthly,
    //             yearly
    //         }
    //     });
    // }
    [HttpGet("admin-stats")]
public async Task<IActionResult> GetAdminStats()
{
    var now = DateTime.UtcNow.Date;

    // Only count ACTIVE users and ACTIVE projects
    var totalUsers = await _context.Users.CountAsync(u => u.Status == "Active");
    var totalProjects = await _context.Projects.CountAsync(p => p.Status == "Active");
    var totalTasks = await (
        from t in _context.Tasks
        join p in _context.Projects on t.ProjectId equals p.Id
        where p.Status == "Active"
        select t
    ).CountAsync();
    // Users by Role (ACTIVE users only)
    var userByRoleData = await _context.Users
        .Where(u => u.Status == "Active")
        .GroupBy(u => u.Role)
        .Select(g => new { name = g.Key, value = g.Count() })
        .ToListAsync();

    // Projects by Manager (ACTIVE projects only)
    var projectsByManager = await _context.Projects
        .Where(p => p.Status == "Active")
        .GroupBy(p => p.Manager)
        .Select(g => new { manager = g.Key, projects = g.Count() })
        .ToListAsync();

    // Projects by Status (all projects for donut/pie chart)
    var adminProjectByStatus = await _context.Projects
        .GroupBy(p => p.Status)
        .Select(g => new { name = g.Key, value = g.Count() })
        .ToListAsync();

    // Tasks by Status (in ACTIVE projects only)
    var adminTaskByStatus = await (
        from t in _context.Tasks
        join p in _context.Projects on t.ProjectId equals p.Id
        where p.Status == "Active"
        group t by t.Status into g
        select new { name = g.Key, value = g.Count() }
        ).ToListAsync();

    // ACTIVITY REPORT (USERS ADDED by Role, only ACTIVE users)
    var weeks = Enumerable.Range(0, 4)
        .Select(i => now.AddDays(-(7 * (3 - i))))
        .ToList();

    var weekly = new List<object>();
    for (int i = 0; i < 4; i++)
    {
        var start = weeks[i];
        var end = start.AddDays(7);
        var admin = await _context.Users.CountAsync(u => u.Role == "Admin" && u.Status == "Active" && u.CreatedAt >= start && u.CreatedAt < end);
        var manager = await _context.Users.CountAsync(u => u.Role == "ProjectManager" && u.Status == "Active" && u.CreatedAt >= start && u.CreatedAt < end);
        var contributor = await _context.Users.CountAsync(u => u.Role == "Contributor" && u.Status == "Active" && u.CreatedAt >= start && u.CreatedAt < end);

        weekly.Add(new
        {
            period = $"Week {i + 1}",
            Admin = admin,
            Manager = manager,
            Contributor = contributor
        });
    }

    var months = Enumerable.Range(0, 6)
        .Select(i => new DateTime(now.Year, now.Month, 1).AddMonths(-5 + i))
        .ToList();

    var monthly = new List<object>();
    for (int i = 0; i < 6; i++)
    {
        var start = months[i];
        var end = start.AddMonths(1);
        var admin = await _context.Users.CountAsync(u => u.Role == "Admin" && u.Status == "Active" && u.CreatedAt >= start && u.CreatedAt < end);
        var manager = await _context.Users.CountAsync(u => u.Role == "ProjectManager" && u.Status == "Active" && u.CreatedAt >= start && u.CreatedAt < end);
        var contributor = await _context.Users.CountAsync(u => u.Role == "Contributor" && u.Status == "Active" && u.CreatedAt >= start && u.CreatedAt < end);

        monthly.Add(new
        {
            period = start.ToString("MMM yyyy"),
            Admin = admin,
            Manager = manager,
            Contributor = contributor
        });
    }

    var years = Enumerable.Range(0, 4)
        .Select(i => new DateTime(now.Year - 3 + i, 1, 1))
        .ToList();

    var yearly = new List<object>();
    for (int i = 0; i < 4; i++)
    {
        var start = years[i];
        var end = start.AddYears(1);
        var admin = await _context.Users.CountAsync(u => u.Role == "Admin" && u.Status == "Active" && u.CreatedAt >= start && u.CreatedAt < end);
        var manager = await _context.Users.CountAsync(u => u.Role == "ProjectManager" && u.Status == "Active" && u.CreatedAt >= start && u.CreatedAt < end);
        var contributor = await _context.Users.CountAsync(u => u.Role == "Contributor" && u.Status == "Active" && u.CreatedAt >= start && u.CreatedAt < end);

        yearly.Add(new
        {
            period = start.ToString("yyyy"),
            Admin = admin,
            Manager = manager,
            Contributor = contributor
        });
    }

    return Ok(new
    {
        totalUsers,
        totalProjects,
        totalTasks,
        userByRoleData,
        projectsByManager,
        adminProjectByStatus,
        adminTaskByStatus,
        adminActivityDataset = new
        {
            weekly,
            monthly,
            yearly
        }
    });
}


    

    [HttpGet("contributor-stats/{username}")]
    public async Task<IActionResult> GetContributorStats(string username)
    {
        Console.WriteLine("ContributorStats called for username: " + username);
        // Load all tasks where this user is a member
        // var allTasks = await _context.Tasks
        //     .Where(t => t.Members != null)
        //     .ToListAsync();
        // allTasks = allTasks
        //     .Where(t => t.Members.Split(',').Any(m => m.Trim().Equals(username, StringComparison.OrdinalIgnoreCase)))
        //     .ToList();

        // First get all valid projects (active projects with active managers)
        var validProjectIds = await _context.Projects
            .Where(p => p.Status == "Active")
            .Join(_context.Users,
                p => p.Manager,
                u => u.Username,
                (p, u) => new { Project = p, Manager = u })
            .Where(x => x.Manager.Status == "Active" && x.Manager.Role == "Manager")
            .Select(x => x.Project.Id)
            .ToListAsync();

        // Then get all tasks from these projects where the user is a member
        // Note: We have to handle the member check differently for EF translation
        var allTasks = await _context.Tasks
            .Where(t => validProjectIds.Contains(t.ProjectId))
            .Where(t => t.Members != null && t.Members.Contains(username))
            .ToListAsync();

        // Now filter in memory for tasks where the user is a member
        allTasks = allTasks
            .Where(t => t.Members != null && 
                    t.Members.Split(',')
                                .Select(m => m.Trim())
                                .Any(m => m.Equals(username, StringComparison.OrdinalIgnoreCase)))
            .ToList();

        var totalTasks = allTasks.Count;
        var toDoTasks = allTasks.Count(t => t.Status == "To-Do");
        var inProgressTasks = allTasks.Count(t => t.Status == "In Progress");
        var doneTasks = allTasks.Count(t => t.Status == "Done");

        var priorities = new[] { "High", "Medium", "Low" };
        var taskPriority = priorities.Select(p => new
        {
            name = p,
            value = allTasks.Count(t => t.Priority == p)
        }).ToList();

        var now = DateTime.UtcNow.Date;
        var upcomingTasks = allTasks
            .Where(t => t.DueDate >= now)
            .OrderBy(t => t.DueDate)
            .Take(5)
            .Select(t => new
            {
                id = t.Id,
                title = t.Title,
                status = t.Status,
                dueDate = t.DueDate.ToString("yyyy-MM-dd"),
                priority = t.Priority,
                description = t.Description
            })
            .ToList();

        var overdueTasks = allTasks
            .Where(t => t.DueDate < now && t.Status != "Done")
            .OrderBy(t => t.DueDate)
            .Take(5)
            .Select(t => new
            {
                id = t.Id,
                title = t.Title,
                description = t.Description,
                status = t.Status,
                dueDate = t.DueDate.ToString("yyyy-MM-dd"),
                dueStatus = "Overdue",
                priority = t.Priority
            })
            .ToList();

        // Real comments
        var userTaskIds = allTasks.Select(t => t.Id).ToList();
        var newComments = await _context.Comments
            .Where(c => userTaskIds.Contains(c.TaskId))
            .OrderByDescending(c => c.CreatedAt)
            .Take(5)
            .Select(c => new
            {
                user = c.Author,
                comment = c.Text,
                date = c.CreatedAt.ToString("dd MMM yyyy")
            })
            .ToListAsync();

        // Recently visited: most recently due tasks
        var recentlyVisited = allTasks
            .OrderByDescending(t => t.DueDate)
            .Take(3)
            .Select(t => new
            {
                id = t.Id,
                title = t.Title,
                description = t.Description,
                status = t.Status,
                dueDate = t.DueDate.ToString("yyyy-MM-dd"),
                priority = t.Priority
            })
            .ToList();

        // ACTIVITY DATA (real stats)
        var today = DateTime.UtcNow.Date;

        var daily = Enumerable.Range(0, 24).Select(hour =>
        {
            var from = today.AddHours(hour);
            var to = from.AddHours(1);
            return new
            {
                time = from.ToString("htt"),
                tasks = allTasks.Count(t =>
                    t.Status == "Done" &&
                    t.DueDate >= from && t.DueDate < to
                )
            };
        }).ToList();

        var weekly = Enumerable.Range(0, 7).Select(offset =>
        {
            var date = today.AddDays(-offset);
            return new
            {
                day = date.ToString("ddd"),
                tasks = allTasks.Count(t =>
                    t.Status == "Done" &&
                    t.DueDate.Date == date
                )
            };
        }).Reverse().ToList();

        var startOfMonth = new DateTime(today.Year, today.Month, 1);
        var monthly = Enumerable.Range(0, 4).Select(week =>
        {
            var from = startOfMonth.AddDays(week * 7);
            var to = from.AddDays(7);
            return new
            {
                week = $"Week {week + 1}",
                tasks = allTasks.Count(t =>
                    t.Status == "Done" &&
                    t.DueDate >= from && t.DueDate < to
                )
            };
        }).ToList();

        var yearly = Enumerable.Range(1, 12).Select(month =>
        {
            var from = new DateTime(today.Year, month, 1);
            var to = from.AddMonths(1);
            return new
            {
                month = from.ToString("MMM"),
                tasks = allTasks.Count(t =>
                    t.Status == "Done" &&
                    t.DueDate >= from && t.DueDate < to
                )
            };
        }).ToList();

        var activityDataset = new
        {
            daily,
            weekly,
            monthly,
            yearly
        };

        return Ok(new
        {
            totalTasks,
            toDoTasks,
            inProgressTasks,
            doneTasks,
            taskPriority,
            upcomingTasks,
            overdueTasks,
            newComments,
            recentlyVisited,
            activityDataset
        });
    }
    
    [HttpGet("manager-stats/{username}")]
    public async Task<IActionResult> GetManagerStats(string username)
    {
        // Only projects managed by this manager
        var projects = await _context.Projects
            .Include(p => p.Tasks)
            .Where(p => p.Manager.ToLower() == username.ToLower())
            .ToListAsync();

        var totalProjects = projects.Count;
        var activeProjects = projects.Count(p => p.Status == "Active");
        var archivedProjects = projects.Count(p => p.Status == "Archived");
        var activeProjectsList = projects.Where(p => p.Status == "Active").ToList();

        var managerTotalTasks = activeProjectsList.SelectMany(p => p.Tasks ?? new List<TaskManagement.API.Models.Domain.Task>()).Count();

        // Project by Status for Pie Chart
        var projectByStatus = projects.GroupBy(p => p.Status)
            .Select(g => new { name = g.Key, value = g.Count() }).ToList();

        // Task by Status for Pie Chart
        var taskByStatus = activeProjectsList
            .SelectMany(p => p.Tasks ?? new List<TaskManagement.API.Models.Domain.Task>())
            .GroupBy(t => t.Status)
            .Select(g => new { name = g.Key, value = g.Count() }).ToList();

        // Project Progress (vertical bar)
        var projectProgress = activeProjectsList.Select(p => new
        {
            name = p.Title,
            percent = (p.Tasks != null && p.Tasks.Any()) ?
                (int)Math.Round(100.0 * p.Tasks.Count(t => t.Status == "Done") / p.Tasks.Count()) : 0
        }).ToList();

        // Upcoming Deadlines (nearest 5 due dates, not Done)
        var upcomingDeadlines = activeProjectsList.SelectMany(p => p.Tasks ?? new List<TaskManagement.API.Models.Domain.Task>())
            .Where(t => t.Status != "Done" && t.DueDate >= DateTime.UtcNow.Date)
            .OrderBy(t => t.DueDate)
            .Take(5)
            .Select(t => new
            {
                employee = (t.Members ?? "").Split(',').FirstOrDefault() ?? "",
                project = projects.FirstOrDefault(p => p.Id == t.ProjectId)?.Title ?? "",
                dueDate = t.DueDate.ToString("yyyy-MM-dd"),
                progress = t.Status == "Done" ? 100 :
                        t.Status == "In Progress" ? 50 :
                        t.Status == "To-Do" ? 0 : 0
            }).ToList();

        // Overdue Tasks
        var now = DateTime.UtcNow.Date;
        var managerOverdueTasks = activeProjectsList.SelectMany(p => p.Tasks ?? new List<TaskManagement.API.Models.Domain.Task>())
            .Where(t => t.DueDate < now && t.Status != "Done")
            .OrderBy(t => t.DueDate)
            .Take(5)
            .Select(t => new
            {
                overdue = ((now - t.DueDate.Date).Days) + " Days",
                task = t.Title,
                dueDate = t.DueDate.ToString("yyyy-MM-dd"),
                member = (t.Members ?? "").Split(',').FirstOrDefault() ?? ""
            }).ToList();

        // Number of Tasks per Project
        var tasksPerProject = activeProjectsList.Select(p => new
        {
            project = p.Title,
            tasks = (p.Tasks ?? new List<TaskManagement.API.Models.Domain.Task>()).Count()
        }).ToList();

        // New Comments
        var projectTaskIds = projects.SelectMany(p => p.Tasks ?? new List<TaskManagement.API.Models.Domain.Task>()).Select(t => t.Id).ToList();
        var newComments = await _context.Comments
            .Where(c => projectTaskIds.Contains(c.TaskId))
            .OrderByDescending(c => c.CreatedAt)
            .Take(5)
            .Select(c => new
            {
                user = c.Author,
                comment = c.Text,
                date = c.CreatedAt.ToString("dd MMM yyyy")
            })
            .ToListAsync();

        // Recently Visited (last 3 tasks changed)
        var recentlyVisited = projects.SelectMany(p => p.Tasks ?? new List<TaskManagement.API.Models.Domain.Task>())
            .OrderByDescending(t => t.DueDate)
            .Take(3)
            .Select(t => new
            {
                title = t.Title,
                description = t.Description,
                status = t.Status,
                dueDate = t.DueDate.ToString("yyyy-MM-dd"),
                priority = t.Priority
            }).ToList();

        // Activity Dataset (reuse contributor method, but on all manager's tasks)
        var allTasks = projects.SelectMany(p => p.Tasks ?? new List<TaskManagement.API.Models.Domain.Task>()).ToList();
        var today = DateTime.UtcNow.Date;

        var daily = Enumerable.Range(0, 24).Select(hour =>
        {
            var from = today.AddHours(hour);
            var to = from.AddHours(1);
            return new
            {
                time = from.ToString("htt"),
                tasks = allTasks.Count(t =>
                    t.Status == "Done" &&
                    t.DueDate >= from && t.DueDate < to
                )
            };
        }).ToList();

        var weekly = Enumerable.Range(0, 7).Select(offset =>
        {
            var date = today.AddDays(-offset);
            return new
            {
                day = date.ToString("ddd"),
                tasks = allTasks.Count(t =>
                    t.Status == "Done" &&
                    t.DueDate.Date == date
                )
            };
        }).Reverse().ToList();

        var startOfMonth = new DateTime(today.Year, today.Month, 1);
        var monthly = Enumerable.Range(0, 4).Select(week =>
        {
            var from = startOfMonth.AddDays(week * 7);
            var to = from.AddDays(7);
            return new
            {
                week = $"Week {week + 1}",
                tasks = allTasks.Count(t =>
                    t.Status == "Done" &&
                    t.DueDate >= from && t.DueDate < to
                )
            };
        }).ToList();

        var yearly = Enumerable.Range(1, 12).Select(month =>
        {
            var from = new DateTime(today.Year, month, 1);
            var to = from.AddMonths(1);
            return new
            {
                month = from.ToString("MMM"),
                tasks = allTasks.Count(t =>
                    t.Status == "Done" &&
                    t.DueDate >= from && t.DueDate < to
                )
            };
        }).ToList();

        var activityDataset = new
        {
            daily,
            weekly,
            monthly,
            yearly
        };

        return Ok(new
        {
            totalProjects,
            activeProjects,
            archivedProjects,
            managerTotalTasks,
            projectByStatus,
            taskByStatus,
            projectProgress,
            upcomingDeadlines,
            managerOverdueTasks,
            tasksPerProject,
            newComments,
            recentlyVisited,
            activityDataset
        });
    }

}