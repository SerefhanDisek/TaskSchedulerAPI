namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface ITaskDistributionService
    {
        Task DistributeTasksAsync();
    }
}
