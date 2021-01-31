import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  
  eventos: any = [];
  eventosFiltrados: any = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  
  _filtroLista: string;

  get filtroLista(): string{
    return this._filtroLista;
  }

  set filtroLista(value: string){
    this._filtroLista = value;

    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  _filtroListaLocal: string;

  get filtroListaLocal(): string {
    return this._filtroListaLocal;
  }

  set filtroListaLocal(value: string) {
      this._filtroListaLocal = value;
      this.eventosFiltrados = this.filtroListaLocal ? this.filtrarEventosLocal(this.filtroListaLocal) : this.eventos;
  }

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.getEventos();
  }
  
  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }
  
  getEventos() {
    this.http.get('http://localhost:5000/Evento/').subscribe(
    response => { this.eventos = response; }, error => { console.log(error); });
  }

filtrarEventos(filtrarPor: string): any {
  filtrarPor = filtrarPor.toLocaleLowerCase();
  return this.eventos.filter(evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
}

filtrarEventosLocal(filtrarPor: string): any {
  filtrarPor = filtrarPor.toLocaleLowerCase();
  return this.eventos.filter(evento => evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
}
  
}
