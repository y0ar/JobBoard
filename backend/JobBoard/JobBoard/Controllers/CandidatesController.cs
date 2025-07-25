﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobBoard.Data;
using JobBoard.Models;

namespace JobBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private readonly JobBoardContext _context;

        public CandidatesController(JobBoardContext context)
        {
            _context = context;
        }

        // GET: api/Candidates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Candidate>>> GetCandidates()
        {
            return await _context.Candidates.ToListAsync();
        }

        // GET: api/Candidates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Candidate>> GetCandidate(int id)
        {
            var candidate = await _context.Candidates
                .Include(c => c.Resume)
                .Select(c => new Candidate
                {
                    Id = c.Id,
                    LastName = c.LastName,
                    FirstName = c.FirstName,
                    Email = c.Email,
                    Password = c.Password,
                    RegistrationDate = c.RegistrationDate,
                    Applications = c.Applications,
                    Experiences = c.Experiences,
                    JobAlerts = c.JobAlerts,
                    Studies = c.Studies,
                    Resume = c.Resume != null ? new Resume
                    {
                        Id = c.Resume.Id,
                        FileName = c.Resume.FileName,
                        FileType = c.Resume.FileType,
                        UploadDate = c.Resume.UploadDate,
                    } : null
                })
                .FirstOrDefaultAsync(c => c.Id == id);

            if (candidate == null)
            {
                return NotFound();
            }

            return candidate;
        }

        [HttpGet("{id}/experiences")]
        public async Task<ActionResult<IEnumerable<Experience>>> GetExperiencesByCandidateId(int id)
        {
            return await _context.Experiences.Where(e => e.CandidateId == id).ToListAsync();
        }

        // GET: api/Candidates/5/studies
        [HttpGet("{id}/studies")]
        public async Task<ActionResult<IEnumerable<Study>>> GetStudiesByCandidateId(int id)
        {
            return await _context.Studies.Where(s => s.CandidateId == id).ToListAsync();
        }

        // GET: api/Candidates/5/applications
        [HttpGet("{id}/applications")]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplicationsByCandidateId(int id)
        {
            var applications = await _context.Applications
                .Include(a => a.Job)
                .Include(a => a.Candidate)
                .Select(a => new Application
                {
                    Id = a.Id,
                    Status = a.Status,
                    ApplicationDate = a.ApplicationDate,
                    CandidateId = a.CandidateId,
                    JobId = a.JobId,
                    Candidate = a.Candidate != null ? new Candidate
                    {
                        Id = a.Candidate.Id,
                        FirstName = a.Candidate.FirstName,
                        LastName = a.Candidate.LastName
                    } : null,
                    Job = a.Job != null ? new Job
                    {
                        Id = a.Job.Id,
                        Title = a.Job.Title,
                        CompanyId = a.Job.CompanyId
                    } : null
                })
                .ToListAsync();

            return applications;
        }

        // PUT: api/Candidates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCandidate(int id, Candidate candidate)
        {
            if (id != candidate.Id)
            {
                return BadRequest();
            }

            _context.Entry(candidate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CandidateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Candidates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Candidate>> PostCandidate(Candidate candidate)
        {
            _context.Candidates.Add(candidate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCandidate", new { id = candidate.Id }, candidate);
        }

        // DELETE: api/Candidates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCandidate(int id)
        {
            var candidate = await _context.Candidates.FindAsync(id);
            if (candidate == null)
            {
                return NotFound();
            }

            _context.Candidates.Remove(candidate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CandidateExists(int id)
        {
            return _context.Candidates.Any(e => e.Id == id);
        }
    }
}
