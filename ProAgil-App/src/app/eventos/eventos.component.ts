import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  //eventos: any = [{
  //  EventoId: 1,
  //  Tema: 'Angular',
  //  Local: 'Belo Horizonte'
  //},
  //{
  //  EventoId: 1,
  //  Tema: '.Net Core',
  //  Local: 'São Paulo'
  //}]
  eventos: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.http.get('http://localhost:5000/evento').subscribe(response => 
    { 
      this.eventos = response; 
    }, error => {
      console.log(error);
    }
    
    );
  }

}
