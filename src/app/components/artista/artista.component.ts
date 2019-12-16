import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
})
export class ArtistaComponent {

  artista:any = {};
  loading: boolean;
  topTracks:any[] = [];

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService) { 
    this.loading = true;
    this.router.params.subscribe( params => {
      this.getArtista(params['id']);      
      this.getTopTracks(params['id']);      
      this.loading = false;
    })
  }

  getArtista(id){
    this.loading = true;
    this.spotify.getArtista(id)
      .subscribe( artista =>{
        console.log("artista", artista);
        this.artista = artista;
      });
  }

  getTopTracks(id:string){
    this.spotify.getTopTracks(id)
      .subscribe(topTracks => {
        console.log("topTracks", topTracks);
        this.topTracks = topTracks;
      });
  }


}
