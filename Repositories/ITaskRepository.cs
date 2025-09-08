using static Task_Manager_Backend.TaskManager;
using System.Collections.Generic;

using Microsoft.Build.Utilities;

namespace Task_Manager_Backend.Repositories
{
    public interface ITaskRepository
    {
        IEnumerable<TaskItem> GetAll();
        TaskItem? GetById(int id);
        TaskItem Add(TaskItem task);
        void Update(TaskItem task);
        void Delete(int id);
    }
}
