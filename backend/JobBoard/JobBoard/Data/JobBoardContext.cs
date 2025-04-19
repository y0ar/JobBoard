using Microsoft.EntityFrameworkCore;
using JobBoard.Models;

namespace JobBoard.Data;

public class JobBoardContext : DbContext
{
    public JobBoardContext(DbContextOptions<JobBoardContext> options)
        : base(options) {}

    public DbSet<Job> Jobs => Set<Job>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Application> Applications => Set<Application>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Resume> Resumes => Set<Resume>();
    public DbSet<Company> Companies => Set<Company>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Application: User - Job many-to-many via Applications
        modelBuilder.Entity<Application>()
            .HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Application>()
            .HasOne(a => a.Job)
            .WithMany()
            .HasForeignKey(a => a.JobId)
            .OnDelete(DeleteBehavior.Cascade);

        // Job - Category
        modelBuilder.Entity<Job>()
            .HasOne(j => j.Category)
            .WithMany(c => c.Jobs)
            .HasForeignKey(j => j.CategoryId);

        // Job - Company
        modelBuilder.Entity<Job>()
            .HasOne(j => j.Company)
            .WithMany(c => c.Jobs)
            .HasForeignKey(j => j.CompanyId)
            .OnDelete(DeleteBehavior.SetNull);

        // User - Resume (1-to-1)
        modelBuilder.Entity<Resume>()
            .HasOne(r => r.User)
            .WithOne()
            .HasForeignKey<Resume>(r => r.UserId);
    }
}