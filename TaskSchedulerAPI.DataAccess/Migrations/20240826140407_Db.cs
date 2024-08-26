using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskSchedulerAPI.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Db : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastLogin",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "PasswordSalt",
                table: "Users",
                newName: "Password");

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

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Email", "FirstName", "LastName", "Password", "UserName" },
                values: new object[] { "serefhan@example.com", "Seref", "Disek", "Password1", "Serefhan" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Email", "FirstName", "LastName", "Password", "UserName" },
                values: new object[] { "yusuf@example.com", "Yusuf", "Kaya", "Password2", "Yusuf" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "PasswordSalt");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastLogin",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3584), new DateTime(2024, 9, 2, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3578) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3587), new DateTime(2024, 9, 9, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3586) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Email", "FirstName", "IsActive", "LastLogin", "LastName", "PasswordHash", "PasswordSalt", "UserName" },
                values: new object[] { new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3411), "johndoe@example.com", "John", true, new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3413), "Doe", "hashed_password_1", "salt_1", "johndoe" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Email", "FirstName", "IsActive", "LastLogin", "LastName", "PasswordHash", "PasswordSalt", "UserName" },
                values: new object[] { new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3418), "janedoe@example.com", "Jane", true, new DateTime(2024, 8, 26, 7, 43, 29, 713, DateTimeKind.Utc).AddTicks(3418), "Doe", "hashed_password_2", "salt_2", "janedoe" });
        }
    }
}
