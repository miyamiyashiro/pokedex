import { PokemonService } from "./service/PokemonService.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const container = document.getElementById("pokemon-detail");

  if (!name) {
    container.innerHTML = "<p>Pokémon não encontrado!</p>";
    return;
  }

  try {
    const pokemon = await PokemonService.getPokemonByName(name);

    container.innerHTML = `
      <div class="pokemon-detail-card">
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h1>${pokemon.name}</h1>
        <p><strong>Tipo:</strong> ${pokemon.types}</p>
        <p><strong>Atributos:</strong></p>
        <p>${pokemon.stats}</p>
      </div>
    `;
  } catch (error) {
    container.innerHTML = "<p>Erro ao carregar informações do Pokémon.</p>";
  }


  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
