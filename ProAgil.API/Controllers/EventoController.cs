using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProAgil.Domain.Model;
using ProAgil.Repository.Data;

namespace ProAgil.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly ProAgilContext _contexto;

        public EventoController(ProAgilContext contexto)
        {
            _contexto = contexto;            
        }

        [HttpGet]
        //public IEnumerable<Evento> Get()
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _contexto.Eventos.ToListAsync();
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou");
            }            
        }

        [HttpGet("Buscar/{id}")]
        public Evento Get(int id)
        {
            return _contexto.Eventos.ToList().FirstOrDefault(e => e.Id == id);
        }
    }
}
