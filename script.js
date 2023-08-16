document.addEventListener("DOMContentLoaded", init);

const sectionPokemons = document.getElementById("pokemon-list");

function init() {
    getAllPokemons();
}

async function getAllPokemons() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`);
    const data = await response.json();
    const { results } = data

    showPokemon(results)
}


async function showPokemon(pokemonArray) {
    const promises = pokemonArray.map(async element => {
        const imagePokemon = await getPokemon(element.name);
        return `<div class="card-container"><section class="pokemon-card">${element.name}</p> <img class="pokemon-image"src="${imagePokemon}" alt=""></section>`;
    });

    const templateArray = await Promise.all(promises);
    const template = templateArray.join('');

    sectionPokemons.innerHTML = template;
}


async function getPokemon(name) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`
    const response = await fetch(URL);
    const data = await response.json();
    const imagePokemon = data.sprites.front_default;
    return imagePokemon;
}