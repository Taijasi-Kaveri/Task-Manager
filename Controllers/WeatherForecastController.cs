using System.Collections.Concurrent;
using Microsoft.AspNetCore.Mvc;
using Task = Task_Manager_Backend.TaskManager;

namespace Task_Manager_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> GetWeatherForecast()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        private static readonly ConcurrentDictionary<int, Task> _tasks = new();
        private static int _nextId = 1;

        [HttpGet("tasks")]
        public ActionResult<IEnumerable<Task>> GetTasks()
        {
            return Ok(_tasks.Values);
        }

        [HttpPost("tasks")]
        public ActionResult<Task> PostTask([FromBody] Task newTask)
        {
            if (string.IsNullOrWhiteSpace(newTask.Title))
                return BadRequest("Title is required.");

            newTask.Id = _nextId++;
            _tasks[newTask.Id] = newTask;
            return CreatedAtAction(nameof(GetTasks), new { id = newTask.Id }, newTask);
        }
    }
}
