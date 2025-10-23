import { PokemonService } from "../service/PokemonService.js";

export class PokemonController {
  static async init() {
    this.addSearchEvent();
    this.loadPokemonList();
  }


  static async loadPokemonList() {
    const container = document.getElementById("pokemon-list");
    container.innerHTML = "";

    try {
      const list = await PokemonService.getPokemonList();
      for (const item of list) {
        const pokemon = await PokemonService.getPokemonByName(item.name);
        const card = this.createCard(pokemon);
        container.appendChild(card);
      }
    } catch (error) {
      console.error("Erro ao carregar pokémons:", error);
    }
  }

  static addSearchEvent() {
    const btn = document.getElementById("search-btn");
    const input = document.getElementById("pokemon-search");

    btn.addEventListener("click", () => this.searchPokemon());
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.searchPokemon();
    });
  }

  static async searchPokemon() {
    const container = document.getElementById("pokemon-list");
    const input = document.getElementById("pokemon-search");
    const name = input.value.trim().toLowerCase();

    if (!name) {
      alert("Digite o nome de um Pokémon!");
      return;
    }

    try {
      const pokemon = await PokemonService.getPokemonByName(name);
      container.innerHTML = "";
      container.appendChild(this.createCard(pokemon));
    } catch {
      alert("Pokémon não encontrado!");
    }
  }

  static createCard(pokemon) {
    const template = document.getElementById("pokemon-card-template");
    const card = template.content.cloneNode(true);
    const cardElement = card.querySelector(".pokemon-card");

    cardElement.querySelector(".pokemon-image").src = pokemon.image;
    cardElement.querySelector(".pokemon-name").textContent = pokemon.name;


    const type = cardElement.querySelector(".pokemon-type");
    const stats = cardElement.querySelector(".pokemon-stats");
    type.style.display = "none";
    stats.style.display = "none";


    cardElement.addEventListener("click", () => {
      const isHidden = type.style.display === "none";
      type.style.display = isHidden ? "block" : "none";
      stats.style.display = isHidden ? "block" : "none";
        window.location.href = `pokemon.html?name=${pokemon.name}`;
      });
      



    type.textContent = `Tipo: ${pokemon.types}`;
    stats.textContent = pokemon.stats;

    return cardElement;
  }
}

