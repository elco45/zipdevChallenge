import * as ActionContents from './constants';

export function loadPokemons(limit, offset) {
  return {
    type: ActionContents.LOAD_POKEMONS,
    limit,
    offset,
  };
}

export function pokemonsLoaded(pokemons) {
  return {
    type: ActionContents.LOAD_POKEMONS_SUCCESS,
    pokemons,
  };
}

export function pokemonLoadingError(error) {
  return {
    type: ActionContents.LOAD_POKEMONS_ERROR,
    error,
  };
}

export function loadPokemon(url) {
  return {
    type: ActionContents.LOAD_POKEMON,
    url,
  };
}

export function pokemonLoaded(pokemon) {
  return {
    type: ActionContents.LOAD_POKEMON_SUCCESS,
    pokemon,
  };
}
