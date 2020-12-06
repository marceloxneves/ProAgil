using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProAgil.API.Data;
using ProAgil.API.Model;

namespace ProAgil.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly DataContext _contexto;

        public WeatherForecastController(DataContext contexto)
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
            return _contexto.Eventos.ToList().FirstOrDefault(e => e.EventoId == id);
        }
    }
}
