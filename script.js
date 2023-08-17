document.addEventListener("DOMContentLoaded", init);

const pokeContainer = document.getElementById('poke-container');
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


let pokemonID = 0;

async function showPokemon(pokemonArray) {

    let template = '';

    for (let pokemon of pokemonArray) {

        const pokemonImg = await getPokemon(pokemon.name);
        const types = await getPokemonTypes(pokemon.name);

        template += `
        <div class="col-12 col-sm-12 col-md-4 col-xxl-3">
        <div class="card pokemon-card" style="width: 18rem;">
            <div class="row">
                <div class="col-4">
                    <h5 class="pokemon-id">${pokemonID}</h5>
                </div>
                <div class="col-8">
                    <h5 class="card-title">${pokemon.name}</h5>
                </div>
            </div>
            
            
                <img class="card-img-top pokemon-image" src="${pokemonImg}" alt="Card image cap">
                <div class="card-body">
                    <p class="card-text">${types.join(', ')}</p>
                </div>
            </div>
        </div>
        `
    }

    return pokeContainer.innerHTML = template;

}


async function getPokemon(name) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`
    const response = await fetch(URL);
    const data = await response.json();
    const imagePokemon = data.sprites.front_default;
    pokemonID = data.id;
    return imagePokemon;
}

async function getPokemonTypes(name) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(URL);
    const data = await response.json();

    const types = data.types.map(typeObj => typeObj.type.name);
    return types;
}

// Pokemon search

document.addEventListener("DOMContentLoaded", init);

const pokeSearchInput = document.getElementById("poke-search");
const pokeSearchButton = document.getElementById("poke-btn");


function init() {
    getAllPokemons();
    pokeSearchButton.addEventListener("click", searchPokemon);
}

async function getAllPokemons() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`);
    const data = await response.json();
    const { results } = data;

    showPokemon(results);
}

async function searchPokemon() {
    const searchTerm = pokeSearchInput.value.toLowerCase();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    if (response.status === 200) {
        const data = await response.json();
        const pokemonArray = [data];
        showPokemon(pokemonArray);
    } else {
        alert("No se encontró ningún Pokémon con ese nombre o número.");
    }
}

// Reiniciar busqueda

const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", resetSearch);

function resetSearch() {
    getAllPokemons();
    pokeSearchInput.value = ''; // Limpiar el campo de búsqueda
}

// Pokemon random

const randomButton = document.getElementById("random-btn");
randomButton.addEventListener("click", showRandomPokemon);

async function showRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * 100);
    const randomPokemon = await getPokemonByIndex(randomIndex);
    showPokemon([randomPokemon]);
}

async function getPokemonByIndex(index) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
    const data = await response.json();
    return data;
}
