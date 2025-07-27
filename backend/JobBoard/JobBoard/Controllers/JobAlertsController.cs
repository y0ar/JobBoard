using System;
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
    public class JobAlertsController : ControllerBase
    {
        private readonly JobBoardContext _context;

        public JobAlertsController(JobBoardContext context)
        {
            _context = context;
        }

        // GET: api/JobAlerts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobAlert>>> GetJobAlerts()
        {
            return await _context.JobAlerts.ToListAsync();
        }

        // GET: api/JobAlerts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobAlert>> GetJobAlert(int id)
        {
            var jobAlert = await _context.JobAlerts.FindAsync(id);

            if (jobAlert == null)
            {
                return NotFound();
            }

            return jobAlert;
        }

        // GET: api/JobAlerts/candidate/5
        [HttpGet("candidate/{candidateId}")]
        public async Task<ActionResult<IEnumerable<JobAlert>>> GetJobAlertsByCandidate(int candidateId)
        {
            var alerts = await _context.JobAlerts
                .Where(a => a.CandidateId == candidateId)
                .ToListAsync();

            return alerts;
        }

        // PUT: api/JobAlerts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobAlert(int id, JobAlert jobAlert)
        {
            if (id != jobAlert.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobAlert).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobAlertExists(id))
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

        // POST: api/JobAlerts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JobAlert>> PostJobAlert(JobAlert jobAlert)
        {
            _context.JobAlerts.Add(jobAlert);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobAlert", new { id = jobAlert.Id }, jobAlert);
        }

        // DELETE: api/JobAlerts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobAlert(int id)
        {
            var jobAlert = await _context.JobAlerts.FindAsync(id);
            if (jobAlert == null)
            {
                return NotFound();
            }

            _context.JobAlerts.Remove(jobAlert);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobAlertExists(int id)
        {
            return _context.JobAlerts.Any(e => e.Id == id);
        }
    }
}
