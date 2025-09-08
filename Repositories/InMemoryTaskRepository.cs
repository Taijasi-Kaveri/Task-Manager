using Microsoft.Build.Utilities;
using static Task_Manager_Backend.TaskManager;
using System.Collections.Generic;

namespace Task_Manager_Backend.Repositories
{
    public class InMemoryTaskRepository : ITaskRepository
    {
        private readonly List<TaskItem> _tasks = new();
        private int _nextId = 1;

        public IEnumerable<TaskItem> GetAll() => _tasks;

        public TaskItem? GetById(int id)
        {
            return _tasks.FirstOrDefault(t => GetTaskId(t) == id);
        }

        public TaskItem Add(TaskItem task)
        {
            SetTaskId(task, _nextId++);
            _tasks.Add(task);
            return task;
        }

        public void Update(TaskItem task)
        {
            var index = _tasks.FindIndex(t => GetTaskId(t) == GetTaskId(task));
            if (index != -1)
            {
                _tasks[index] = task;
            }
        }

        public void Delete(int id)
        {
            var task = GetById(id);
            if (task != null)
            {
                _tasks.Remove(task);
            }
        }

        private int GetTaskId(TaskItem task)
        {
            if (int.TryParse(task.GetMetadata("Id"), out var id))
            {
                return id;
            }
            return -1; // Return -1 if the Id metadata is not set or invalid
        }

        private void SetTaskId(TaskItem task, int id)
        {
            task.SetMetadata("Id", id.ToString());
        }
    }
}


