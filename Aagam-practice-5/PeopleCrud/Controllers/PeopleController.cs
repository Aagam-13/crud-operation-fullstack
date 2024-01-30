using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeopleCrud.Data;
using PeopleCrud.Model;
using Microsoft.AspNetCore.Authorization;

namespace PeopleCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PeopleController : ControllerBase
    {
        private readonly PeopleCrudContext _context;

        public PeopleController(PeopleCrudContext context)
        {
            _context = context;
        }

        // GET: api/People
        [HttpGet]
        [Authorize(Roles = "Admin,Contributor,Reader")]
        public async Task<ActionResult<IEnumerable<People>>> GetPeople()
        {
          if (_context.People == null)
          {
              return NotFound();
          }
            return await _context.People.ToListAsync();
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Contributor,Reader")]
        public async Task<ActionResult<People>> GetPeople(Guid id)
        {
          if (_context.People == null)
          {
              return NotFound();
          }
            var people = await _context.People.FindAsync(id);

            if (people == null)
            {
                return NotFound();
            }

            return people;
        }

        // PUT: api/People/5
        [Authorize(Roles = "Admin,Contributor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPeople(Guid id, People people)
        {
            if (id != people.Id)
            {
                return BadRequest();
            }

            _context.Entry(people).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PeopleExists(id))
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

        // POST: api/People
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin,Contributor")]
        public async Task<ActionResult<People>> PostPeople(People people)
        {
          if (_context.People == null)
          {
              return Problem("Entity set 'PeopleCrudContext.People'  is null.");
          }
            _context.People.Add(people);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPeople", new { id = people.Id }, people);
        }

        // DELETE: api/People/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePeople(Guid id)
        {
            if (_context.People == null)
            {
                return NotFound();
            }
            var people = await _context.People.FindAsync(id);
            if (people == null)
            {
                return NotFound();
            }

            _context.People.Remove(people);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PeopleExists(Guid id)
        {
            return (_context.People?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
