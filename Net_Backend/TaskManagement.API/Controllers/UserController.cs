using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.Models.Domain;
using TaskManagement.API.Models.DTO;
using TaskManagement.API.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace TaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _context.Users.ToList();
            var usersDto = new List<UserDTO>();

            foreach (var user in users)
            {
                usersDto.Add(new UserDTO
                {
                    Id = user.Id,
                    UserId = user.UserId,
                    Username = user.Username,
                    Role = user.Role,
                    Status = user.Status
                });
            }
            return Ok(usersDto);
        }

        // POST: api/User
        // [HttpPost]
        // public async Task<ActionResult<UserDTO>> Create([FromBody] CreateUserDTO dto)
        // {
        //     string passwordHash = HashPassword(dto.Password);

        //     var user = new User
        //     {
        //         Id = Guid.NewGuid(),
        //         Username = dto.Username,
        //         PasswordHash = passwordHash,
        //         Role = Enum.Parse<UserRole>(dto.Role, true)
        //     };

        //     _dbContext.Users.Add(user);
        //     await _dbContext.SaveChangesAsync();

        //     var userDto = new UserDTO
        //     {
        //         Id = user.Id,
        //         UserId = user.UserId,
        //         Username = user.Username,
        //         Role = user.Role.ToString()
        //     };

        //     return CreatedAtAction(nameof(GetAllUsers), new { id = user.Id }, userDto);
        // }

        [HttpGet]
        [Route("{userId:int}")]
        public IActionResult GetUserById([FromRoute] int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);

            if (user == null)
            {
                return NotFound();
            }

            var userDTO = new UserDTO
            {
                Id = user.Id,
                UserId = user.UserId,
                Username = user.Username,
                Role = user.Role
            };

            return Ok(userDTO);
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] CreateUserDTO createUserDTO)
        {
            if (createUserDTO == null)
            {
                return BadRequest("User data is null.");
            }

            // Get the next available UserId
            var maxUserId = _context.Users.Any() 
                ? _context.Users.Max(u => u.UserId) 
                : 0;
            var nextUserId = maxUserId + 1;

            var user = new User
            {
                Id = Guid.NewGuid(),
                UserId = nextUserId,
                Username = createUserDTO.Username,
                PasswordHash = createUserDTO.Password,
                Role = createUserDTO.Role,
                CreatedAt = DateTime.UtcNow
            };
            Console.WriteLine("User CreatedAt: " + user.CreatedAt);
            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetUserById), new { userId = user.UserId }, user);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO loginDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == loginDto.Username);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            // For demo: compare plain password (in production, use hashing)
            if (user.PasswordHash != loginDto.Password)
                return Unauthorized(new { message = "Invalid username or password" });

            if (user.Status == "Locked")
                return Unauthorized(new { message = "Your account has been locked." });

            // Return user info (without password)
            return Ok(new
            {
                id = user.Id,
                userId = user.UserId,
                username = user.Username,
                role = user.Role
            });
        }

        // PUT: api/User/{id}
        [HttpPut("{userId:int}")]
        public IActionResult UpdateUserById([FromRoute] int userId, [FromBody] UpdateUserDTO updateUserDTO)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user == null)
                return NotFound();

            // Update properties
            user.Username = updateUserDTO.Username;
            user.Role = updateUserDTO.Role;
            _context.SaveChanges();

            var userDto = new UserDTO
            {
                Id = user.Id,
                UserId = user.UserId,
                Username = user.Username,
                Role = user.Role
            };

            return Ok(userDto);
        }

        // DELETE: api/User/{id}
        [HttpDelete("{userId:int}")]
        public IActionResult DeleteUserById([FromRoute] int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPut("lock/{userId:int}")]
        public IActionResult LockUserById([FromRoute] int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user == null) return NotFound();

            user.Status = "Locked";
            _context.SaveChanges();

            return Ok(new { message = $"User {user.Username} has been locked." });
        }

        [HttpPut("unlock/{userId:int}")]
        public IActionResult UnlockUserById([FromRoute] int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user == null) return NotFound();

            user.Status = "Active";
            _context.SaveChanges();

            return Ok(new { message = $"User {user.Username} has been unlocked." });
        }
    }
}