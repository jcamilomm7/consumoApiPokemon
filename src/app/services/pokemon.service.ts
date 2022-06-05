import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = "https://pokeapi.co/api/v2/pokemon";
  private url2: string = "https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0";

  constructor(private http: HttpClient) {}

  getPokemon(name: string) {
    return this.http.get(`${this.url}/${name}`)
  }

  getUrlPersonajes() {
    return this.http.get(`${this.url2}`)
  }

  getPersonajes(url: string) {
    return this.http.get(`${url}`)
  }


}
