using Microsoft.EntityFrameworkCore;
using JobBoard.Models;

namespace JobBoard.Data;

public class JobBoardContext : DbContext
{
    public JobBoardContext(DbContextOptions<JobBoardContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Candidate> Candidates => Set<Candidate>();
    public DbSet<Administrator> Administrators => Set<Administrator>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Job> Jobs => Set<Job>();
    public DbSet<JobAlert> JobAlerts => Set<JobAlert>();
    public DbSet<Application> Applications => Set<Application>();
    public DbSet<Study> Studies => Set<Study>();
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<Language> Languages => Set<Language>();
    public DbSet<Document> Documents => Set<Document>();
    public DbSet<Evaluation> Evaluations => Set<Evaluation>();
    public DbSet<Interview> Interviews => Set<Interview>();
    public DbSet<Resume> Resumes => Set<Resume>();
    public DbSet<Statistic> Statistics => Set<Statistic>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().HasDiscriminator<string>("UserType")
            .HasValue<User>("User")
            .HasValue<Candidate>("Candidate")
            .HasValue<Administrator>("Administrator");

        modelBuilder.Entity<Candidate>()
            .HasOne(c => c.Resume)
            .WithOne(r => r.Candidate)
            .HasForeignKey<Resume>(r => r.CandidateId);

        modelBuilder.Entity<Application>()
            .HasMany(a => a.Evaluations)
            .WithOne(e => e.Application)
            .HasForeignKey(e => e.ApplicationId);

        modelBuilder.Entity<Application>()
            .HasMany(a => a.Interviews)
            .WithOne(i => i.Application)
            .HasForeignKey(i => i.ApplicationId);

        modelBuilder.Entity<Administrator>()
            .HasMany(a => a.Statistics)
            .WithOne(s => s.Administrator)
            .HasForeignKey(s => s.AdministratorId);
    }

public DbSet<JobBoard.Models.Recruiter> Recruiter { get; set; } = default!;
}
