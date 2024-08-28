using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskSchedulerAPI.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddAssignedUserIdToTasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedUserId",
                table: "Tasks",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AssignedUserId", "CreatedAt", "DueDate" },
                values: new object[] { null, new DateTime(2024, 8, 28, 5, 54, 40, 663, DateTimeKind.Utc).AddTicks(552), new DateTime(2024, 9, 4, 5, 54, 40, 663, DateTimeKind.Utc).AddTicks(545) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AssignedUserId", "CreatedAt", "DueDate" },
                values: new object[] { null, new DateTime(2024, 8, 28, 5, 54, 40, 663, DateTimeKind.Utc).AddTicks(555), new DateTime(2024, 9, 11, 5, 54, 40, 663, DateTimeKind.Utc).AddTicks(554) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignedUserId",
                table: "Tasks");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2024, 8, 26, 14, 4, 6, 619, DateTimeKind.Utc).AddTicks(6701), new DateTime(2024, 9, 2, 14, 4, 6, 619, DateTimeKind.Utc).AddTicks(6691) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2024, 8, 26, 14, 4, 6, 619, DateTimeKind.Utc).AddTicks(6704), new DateTime(2024, 9, 9, 14, 4, 6, 619, DateTimeKind.Utc).AddTicks(6703) });
        }
    }
}
