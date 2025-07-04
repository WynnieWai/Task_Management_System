using System;

namespace TaskManagement.API.Models.Domain
{
    public class Notification
    {
        public int Id { get; set; }
        public string User { get; set; }         // Username of the user to notify
        public string Message { get; set; }
        public DateTime Time { get; set; } = DateTime.UtcNow;
        public bool Read { get; set; } = false;
        public string Link { get; set; }         // Optional: deep-link to comment/task/etc
    }
}