using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.Models.Domain;
using TaskManagement.API.Models.DTO;
using TaskManagement.API.Data;
using Microsoft.EntityFrameworkCore;

namespace TaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Notification?user=username
        [HttpGet]
        public async Task<IActionResult> GetNotifications([FromQuery] string user)
        {
            if (string.IsNullOrEmpty(user))
                return BadRequest("User required");

            var notifications = await _context.Notifications
                .Where(n => n.User == user)
                .OrderByDescending(n => n.Time)
                .ToListAsync();

            return Ok(notifications);
        }

        // POST: api/Notification
        [HttpPost]
        public async Task<IActionResult> CreateNotification([FromBody] NotificationDto dto)
        {
            Console.WriteLine($"[NotificationController] POST received: {dto.User} - {dto.Message}");
            var notif = new Notification
            {
                User = dto.User,
                Message = dto.Message,
                Time = DateTime.UtcNow,
                Read = false,
                Link = dto.Link
            };

            _context.Notifications.Add(notif);
            await _context.SaveChangesAsync();

            dto.Id = notif.Id;
            dto.Time = notif.Time;
            dto.Read = notif.Read;

            return Ok(dto);
        }

        // PATCH: api/Notification/{id}/read
        [HttpPatch("{id}/read")]
        public async Task<IActionResult> MarkAsRead([FromRoute] int id)
        {
            var notif = await _context.Notifications.FindAsync(id);
            if (notif == null) return NotFound();
            notif.Read = true;
            await _context.SaveChangesAsync();
            return Ok(notif);
        }

        // DELETE: api/Notification/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification([FromRoute] int id)
        {
            var notif = await _context.Notifications.FindAsync(id);
            if (notif == null) return NotFound();
            _context.Notifications.Remove(notif);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
