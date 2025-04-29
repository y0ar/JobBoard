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
    public class StudiesController : ControllerBase
    {
        private readonly JobBoardContext _context;

        public StudiesController(JobBoardContext context)
        {
            _context = context;
        }

        // GET: api/Studies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Study>>> GetStudies()
        {
            return await _context.Studies.ToListAsync();
        }

        // GET: api/Studies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Study>> GetStudy(int id)
        {
            var study = await _context.Studies.FindAsync(id);

            if (study == null)
            {
                return NotFound();
            }

            return study;
        }

        // PUT: api/Studies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudy(int id, Study study)
        {
            if (id != study.Id)
            {
                return BadRequest();
            }

            _context.Entry(study).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudyExists(id))
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

        // POST: api/Studies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Study>> PostStudy(Study study)
        {
            _context.Studies.Add(study);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudy", new { id = study.Id }, study);
        }

        // DELETE: api/Studies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudy(int id)
        {
            var study = await _context.Studies.FindAsync(id);
            if (study == null)
            {
                return NotFound();
            }

            _context.Studies.Remove(study);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudyExists(int id)
        {
            return _context.Studies.Any(e => e.Id == id);
        }
    }
}
