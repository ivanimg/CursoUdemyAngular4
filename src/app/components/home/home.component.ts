import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  // paises: any[] = [];
  nuevasCanciones: any[] = [];
  loading: boolean;

  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) { 
    this.loading = true;
    this.error = false;
    this.spotify.getNewReleases()
      .subscribe((data: any) => {
        console.log("data",data);
        this.nuevasCanciones = data;  
        this.loading = false;
      }, (errorServicio)=> {
        this.loading = false;
        this.error = true;
        console.log(errorServicio);
        console.log(errorServicio.error.error.message);
      });
  }
  // constructor( private http: HttpClient ) { 
  //   this.http.get('https://restcountries.eu/rest/v2/lang/es').subscribe( (paises: any) => {
  //     this.paises = paises;
  //     console.log("paises", paises);
  //   })
  // }

}
