import { fromJS } from 'immutable';
import * as Actions from './constants';

const initialState = fromJS({
  loading: false,
  pokemonError: '',
  pokemons: [],
  selectedLoading: false,
  pokemonSelected: {},
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.LOAD_POKEMONS_ERROR:
      return state
      .set('pokemonError', action.error)
      .set('loading', false);

    case Actions.LOAD_POKEMONS:
      return state.set('loading', true);

    case Actions.LOAD_POKEMONS_SUCCESS:
      return state
      .set('pokemons', action.pokemons)
      .set('loading', false);


    case Actions.LOAD_POKEMON:
      return state.set('selectedLoading', true);
    case Actions.LOAD_POKEMON_SUCCESS:
      return state
      .set('pokemon', action.pokemon)
      .set('selectedLoading', false);

    default:
      return state;
  }
}

export default homeReducer;
