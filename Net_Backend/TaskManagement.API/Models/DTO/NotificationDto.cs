using System;

namespace TaskManagement.API.Models.DTO
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string Message { get; set; }
        public DateTime Time { get; set; }
        public bool Read { get; set; }
        public string Link { get; set; }
    }
}