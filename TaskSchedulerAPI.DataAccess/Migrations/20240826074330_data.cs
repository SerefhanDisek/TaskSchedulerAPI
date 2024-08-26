using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskSchedulerAPI.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "CreatedAt", "Description", "DueDate", "IsCompleted", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3584), "Complete the first task", new DateTime(2024, 9, 2, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3578), false, "Task 1" },
                    { 2, new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3587), "Start the second task", new DateTime(2024, 9, 9, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3586), false, "Task 2" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "IsActive", "LastLogin", "LastName", "PasswordHash", "PasswordSalt", "UserName" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3411), "johndoe@example.com", "John", true, new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3413), "Doe", "hashed_password_1", "salt_1", "johndoe" },
                    { 2, new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3418), "janedoe@example.com", "Jane", true, new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3418), "Doe", "hashed_password_2", "salt_2", "janedoe" }
                });

            migrationBuilder.InsertData(
                table: "UserTasks",
                columns: new[] { "TaskId", "UserId", "AssignedAt", "IsCompleted" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 2, 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserTasks",
                keyColumns: new[] { "TaskId", "UserId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "UserTasks",
                keyColumns: new[] { "TaskId", "UserId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
