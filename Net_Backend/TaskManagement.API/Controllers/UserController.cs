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
                    Role = user.Role
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

            var user = new User
            {
                Id = Guid.NewGuid(),
                UserId = createUserDTO.UserId,
                Username = createUserDTO.Username,
                PasswordHash = createUserDTO.Password,
                Role = createUserDTO.Role
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetUserById), new { userId = user.UserId }, user);
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
    }
}