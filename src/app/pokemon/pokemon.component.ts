import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  name!: string
  urlImage!: string
  listaPersonajes!: any
  listaUrlPersonajes: any[] = [];
  caracteristicas: any[] = [];




  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
    this.agregarUrl();
  }

  search() {
    this.pokemonService.getPokemon(this.name).subscribe((data: any) => {
      this.urlImage = data.sprites.front_default
    })
  }

  agregarUrl() {
    this.pokemonService.getUrlPersonajes().subscribe((data: any) => {
      this.listaPersonajes = data.results
      this.listaPersonajes.map((personaje: any) => {
        /* console.log(personaje.url) */
        this.listaUrlPersonajes.push(personaje.url)

      })

    })
  }

  buscarPersonajes() {
    this.listaUrlPersonajes.map((urlPersonaje: any) => {
      this.pokemonService.getPersonajes(urlPersonaje).subscribe((data: any) => {
        this.caracteristicas.push(data)
        console.log(this.caracteristicas)
      })

    })


  }


}




