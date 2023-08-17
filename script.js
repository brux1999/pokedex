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

        template += `
        <div class="col-12 col-sm-12 col-md-4 col-xxl-3">
        <div class="card pokemon-card" style="width: 18rem;">
            <div class="row">
                <div class="col-4">
                    <h5>${pokemonID}</h5>
                </div>
                <div class="col-8">
                    <h5 class="card-title">${pokemon.name}</h5>
                </div>
            </div>
            
            
                <img class="card-img-top pokemon-image" src="${pokemonImg}" alt="Card image cap">
                <div class="card-body">
                    <p class="card-text"></p>
                    <a href="#" class="btn btn-primary">Ver info</a>
                </div>
            </div>
        </div>
        `
    }

    return pokeContainer.innerHTML = template;

    // const promises = pokemonArray.map(async element => {
    //     const imagePokemon = await getPokemon(element.name);
    //     return `<div class="card-container"><section class="pokemon-card">${element.name} <img class="pokemon-image"src="${imagePokemon}" alt=""></section>`;
    // });

    // const templateArray = await Promise.all(promises);
    // const template = templateArray.join('');

    // sectionPokemons.innerHTML = template;
}


async function getPokemon(name) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}`
    const response = await fetch(URL);
    const data = await response.json();
    const imagePokemon = data.sprites.front_default;
    pokemonID = data.id;
    return imagePokemon;
}