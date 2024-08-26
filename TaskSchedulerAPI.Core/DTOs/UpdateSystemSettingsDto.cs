namespace TaskSchedulerAPI.Core.DTOs
{
    public class UpdateSystemSettingsDto
    {
        public string ApplicationName { get; set; }
        public string DefaultLanguage { get; set; }
        public bool MaintenanceMode { get; set; }
    }

}
