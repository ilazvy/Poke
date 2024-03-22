import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public pokemons: any[] = [];
  likes: boolean[] = JSON.parse(localStorage.getItem('likes') || '[]') || [];

  constructor(
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPokemons();
    this.updateLikes();
  }

  getPokemons(): void {
    this.httpService.getPokemon().subscribe((data: any) => {
      this.pokemons = data.results;
      // Obtener detalles de cada Pokémon
      this.pokemons.forEach((pokemon: any, index) => {
        this.httpService.getPokemonDetails(index + 1).subscribe((details: any) => {
          pokemon.sprites = details.sprites;
          pokemon.name = details.name;
        });
      });
    });
  }
  chunkArray(array: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  
  showPokemon(id: number): void {
    this.router.navigate(['/details', id]);
  }

  likePokemon(index: number, event: Event): void {
    event.stopPropagation();
    this.likes[index] = !this.likes[index];
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  updateLikes(): void {
    this.likes = JSON.parse(localStorage.getItem('likes') || '[]');
  }
}
