using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskSchedulerAPI.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Priority",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "DueDate", "Priority" },
                values: new object[] { new DateTime(2024, 10, 22, 8, 28, 20, 585, DateTimeKind.Utc).AddTicks(2908), new DateTime(2024, 10, 29, 8, 28, 20, 585, DateTimeKind.Utc).AddTicks(2899), "Oncelikli" });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "DueDate", "Priority" },
                values: new object[] { new DateTime(2024, 10, 22, 8, 28, 20, 585, DateTimeKind.Utc).AddTicks(2911), new DateTime(2024, 11, 5, 8, 28, 20, 585, DateTimeKind.Utc).AddTicks(2911), "Oncelikli" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Tasks");

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
    }
}
