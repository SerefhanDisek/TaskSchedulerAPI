using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskSchedulerAPI.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class LogTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedUserId",
                table: "Logs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignedUserName",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "AssignmentDate",
                table: "Logs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TaskId",
                table: "Logs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaskName",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2024, 8, 28, 12, 32, 49, 58, DateTimeKind.Utc).AddTicks(771), new DateTime(2024, 9, 4, 12, 32, 49, 58, DateTimeKind.Utc).AddTicks(764) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2024, 8, 28, 12, 32, 49, 58, DateTimeKind.Utc).AddTicks(773), new DateTime(2024, 9, 11, 12, 32, 49, 58, DateTimeKind.Utc).AddTicks(772) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignedUserId",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "AssignedUserName",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "AssignmentDate",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "TaskId",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "TaskName",
                table: "Logs");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2024, 8, 28, 10, 28, 5, 897, DateTimeKind.Utc).AddTicks(7478), new DateTime(2024, 9, 4, 10, 28, 5, 897, DateTimeKind.Utc).AddTicks(7472) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2024, 8, 28, 10, 28, 5, 897, DateTimeKind.Utc).AddTicks(7481), new DateTime(2024, 9, 11, 10, 28, 5, 897, DateTimeKind.Utc).AddTicks(7480) });
        }
    }
}
