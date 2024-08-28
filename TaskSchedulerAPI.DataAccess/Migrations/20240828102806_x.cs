using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskSchedulerAPI.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class x : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2024, 8, 28, 5, 54, 40, 663, DateTimeKind.Utc).AddTicks(552), new DateTime(2024, 9, 4, 5, 54, 40, 663, DateTimeKind.Utc).AddTicks(545) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2024, 8, 28, 5, 54, 40, 663, DateTimeKind.Utc).AddTicks(555), new DateTime(2024, 9, 11, 5, 54, 40, 663, DateTimeKind.Utc).AddTicks(554) });
        }
    }
}
