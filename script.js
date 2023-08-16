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


function showPokemon(pokemonArray) {

    let template = '';

    pokemonArray.forEach(element => {
        const imagePokemon = getPokemon(element.name);
        template += `<div><p>${element.name}</p> <img src=${imagePokemon} alt=""></div>`;
    })

    return sectionPokemons.innerHTML = template;
}

async function getPokemon(name) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`
    const response = await fetch(URL);
    const data = await response.json();
    const imagePokemon = data.sprites.back_default;
    return imagePokemon;
}