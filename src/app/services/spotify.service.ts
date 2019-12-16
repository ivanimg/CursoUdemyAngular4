import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log("Spotify service listo"); 
  }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = {
      'Authorization': 'Bearer BQAnaD_yZm2okpolejoyYNCDkbu85tTwZd_PknZkIAVdG9K8sJ20i7CXi5VIVhWOmjWODUSa31KQVcb1G9E'
    };
    return this.http.get(url,{headers});
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases')
      .pipe(map(data => data['albums'].items ));
    // this.http.get('browse/new-releases', {headers})
    //   .pipe(map(data => data['albums'].items ));
      // .pipe(map(data => {
      //   return data['albums'].items;
      // }));
      // .subscribe(data => {
      //   console.log("datos", data);
      // });
  }

  getArtistas(terminoBusqueda: string){
    return this.getQuery(`search?q=${terminoBusqueda}&type=artist&limit=15`)
      .pipe(map(data => data['artists'].items ));
  }

  getArtista(id: string){
    return this.getQuery(`artists/${id}`);
      // .pipe(map(data => data['artists'].items ));
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=es`)
      .pipe(map(data => data['tracks'] ));
  }
}
