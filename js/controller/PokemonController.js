import { PokemonService } from "../service/PokemonService.js";

export class PokemonController {
  static async init() {
    this.loadPokemonList();
    this.addSearchEvent();
  }

  static async loadPokemonList() {
    const container = document.getElementById("pokemon-list");
    container.innerHTML = "";

    const list = await PokemonService.getPokemonList();
    for (const item of list) {
      const pokemon = await PokemonService.getPokemonByName(item.name);
      container.appendChild(this.createCard(pokemon));
    }
  }

  static async searchPokemon() {
    const input = document.getElementById("pokemon-search");
    const name = input.value.trim();
    if (!name) return alert("Digite o nome de um Pokémon!");

    try {
      const pokemon = await PokemonService.getPokemonByName(name);
      const container = document.getElementById("pokemon-list");
      container.innerHTML = "";
      container.appendChild(this.createCard(pokemon));
    } catch {
      alert("Pokémon não encontrado!");
    }
  }

  static addSearchEvent() {
    document.getElementById("search-btn").addEventListener("click", () => {
      this.searchPokemon();
    });
  }

  static createCard(pokemon) {
    const template = document.getElementById("pokemon-card-template");
    const card = template.content.cloneNode(true);

    card.querySelector(".pokemon-image").src = pokemon.image;
    card.querySelector(".pokemon-name").textContent = pokemon.name;
    card.querySelector(".pokemon-type").textContent = `Tipo: ${pokemon.types}`;
    card.querySelector(".pokemon-stats").textContent = pokemon.stats;

    return card;
  }
}
