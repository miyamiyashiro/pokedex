import { Pokemon } from "../model/PokemonModel.js";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export class PokemonService {
  static async getPokemonList(limit = 100) {
    const response = await fetch(`${BASE_URL}?limit=${limit}`);
    const data = await response.json();
    return data.results;
  }

  static async getPokemonByName(name) {
    const response = await fetch(`${BASE_URL}${name.toLowerCase()}`);
    if (!response.ok) throw new Error("Não tem esse Pokemon não");
    const data = await response.json();

    const types = data.types.map(t => t.type.name).join(", ");
    const stats = data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(", ");

    return new Pokemon(data.name, data.sprites.front_default, types, stats);
  }
}
