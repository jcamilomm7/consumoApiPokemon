import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  name!: string;
  urlImage!: string;
  urlTipo: string = '';
  listaPersonajes!: any;
  listaUrlPersonajes: any[] = [];
  caracteristicas: any[] = [];
  visibilidad = false;
  visibilidad2 = false;
  habilidadesUrl: any[] = [];
  habilidades: any[] = [];
  tipos: any[] = [];
  nombrePokemon: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.agregarUrl();
  }
  ordenarArray() {
    this.caracteristicas = this.caracteristicas.sort();
  }

  search() {
    this.visibilidad2 = true;
    this.pokemonService.getPokemon(this.name).subscribe((data: any) => {
      this.urlImage = data.sprites.front_default;
      this.nombrePokemon = data.forms[0].name;
      this.urlTipo = data.forms[0].url;

      this.habilidadesUrl.push(data.abilities[0].ability.url);
      this.habilidadesUrl.push(data.abilities[1].ability.url);

      this.habilidadesUrl.map((url) => {
        this.pokemonService.getEfectos(url).subscribe((data: any) => {
          this.habilidades.push(data.effect_entries[0].effect);
          this.habilidades.push(data.effect_entries[1].short_effect);
        });
      });

      this.pokemonService.getTipo(this.urlTipo).subscribe((data: any) => {
        this.tipos = data.types;
        console.log(this.tipos);
      });
    });
  }

  limpiar() {
    this.urlImage = '';
    this.habilidades = [];
    this.habilidadesUrl = [];
    this.visibilidad2 = false;
    this.nombrePokemon = '';
  }

  agregarUrl() {
    this.pokemonService.getUrlPersonajes().subscribe((data: any) => {
      this.listaPersonajes = data.results;
      this.listaPersonajes.map((personaje: any) => {
        this.listaUrlPersonajes.push(personaje.url);
      });
    });
  }

  buscarPersonajes() {
    this.visibilidad = true;
    this.listaUrlPersonajes.map((urlPersonaje: any) => {
      this.pokemonService.getPersonajes(urlPersonaje).subscribe((data: any) => {
        this.caracteristicas.push(data);
      });
    });
  }

  /*
    mostrarMasPersonajes(){

      this.pokemonService.setContador();
      this.listaPersonajes = []
      this.agregarUrl()
      this.buscarPersonajes()
      console.log(this.listaUrlPersonajes)

    }
   */
}
