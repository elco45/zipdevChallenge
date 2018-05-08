import 'whatwg-fetch';

import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_POKEMONS, LOAD_POKEMON } from 'containers/HomePage/constants';
import { pokemonsLoaded, pokemonLoadingError, pokemonLoaded } from './actions';

const backendUrl = 'http://pokeapi.salestock.net/api/v2';

export function* fetchPokemons(action) {
  try {
    console.log(action.offset)
    const pokemons = yield call(request, `${backendUrl}/pokemon/?limit=${action.limit}&offset=${action.offset}`);
    console.log(pokemons);
    yield put(pokemonsLoaded(pokemons));
  } catch (err) {
    yield put(pokemonLoadingError(err));
  }
}

export function* fetchPokemon(action) {
  try {
    const pokemon = yield call(request, action.url);
    yield put(pokemonLoaded(pokemon));
  } catch (err) {
    yield put(pokemonLoadingError(err));
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(LOAD_POKEMONS, fetchPokemons),
    takeLatest(LOAD_POKEMON, fetchPokemon),
  ];
}
