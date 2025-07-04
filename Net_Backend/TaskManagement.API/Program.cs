using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.Models.Domain;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TaskManagementConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithExposedHeaders("Content-Disposition"));
});

var app = builder.Build();

// Seed users if not present
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!db.Users.Any())
    {
        db.Users.AddRange(
            new User { Id = Guid.NewGuid(), UserId = 1, Username = "admin", PasswordHash = "admin123", Role = "Admin", Status = "Active", CreatedAt =  DateTime.UtcNow},
            new User { Id = Guid.NewGuid(), UserId = 2, Username = "manager", PasswordHash = "manager123", Role = "Manager", Status = "Active", CreatedAt =  DateTime.UtcNow},
            new User { Id = Guid.NewGuid(), UserId = 3, Username = "student", PasswordHash = "student123", Role = "Contributor", Status = "Active", CreatedAt =  DateTime.UtcNow}
        );
        db.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseStaticFiles(); // For wwwroot

// Serve /uploads
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads")),
    RequestPath = "/uploads"
});

app.UseAuthorization();

app.UseCors("AllowAll");

app.MapControllers();

app.Run();
