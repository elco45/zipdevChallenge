import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import Styled from 'styled-components';

import ReactPaginate from 'react-paginate';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as homeActions from './actions';


const PokeCard = Styled.button`
  padding: 20px 10px;
  text-align: center;
  background: gray;
  margin-bottom: 5px;
  cursor: pointer;
  border: 1px solid;

  &:hover {
    background: lightgray;
  }
`;

const SelectedCardContainer = Styled.div`
  background: CornflowerBlue;
  min-height: 200px;
  margin-bottom: 20px;
`;

const PokemonSpriteContainer = Styled.div`
  width: 50px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      limit: 20,
      offset: 0,
      pokemons: [],
      pokemon: {},
      loadingSelected: false,
      loading: false,
    };

    this.handleCheckPokemonClick = this.handleCheckPokemonClick.bind(this);
  }

  componentDidMount() {
    const { limit, offset } = this.state;
    this.props.actions.loadPokemons(limit, offset);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.homeStore.pokemons !== this.props.homeStore.pokemons) {
      this.setState({
        pokemons: nextProps.homeStore.pokemons,
        loading: false,
      });
    }
    if (nextProps.homeStore.pokemon !== this.props.homeStore.pokemon && !nextProps.homeStore.selectedLoading) {
      this.setState({
        pokemon: nextProps.homeStore.pokemon,
        loadingSelected: false,
      });
    }
  }

  handleCheckPokemonClick(pokemonUrl) {
    this.props.actions.loadPokemon(pokemonUrl);
    this.setState({ loadingSelected: true });
  }

  handlePageClick = (data) => {
    const selected = data.selected || 0;
    const offset = Math.ceil(selected * 20);
    const { limit } = this.state;

    this.props.actions.loadPokemons(limit, offset);
    this.setState({ offset, loading: true });
  };

  render() {
    const { loading, pokemons, pokemon, loadingSelected } = this.state;

    return (
      <div className="container">
        <SelectedCardContainer>
          {
            !loadingSelected && pokemon && pokemon.sprites ? ( // eslint-disable-line
              <div className="row">
                <PokemonSpriteContainer className="col-md-12 text-center" >
                  <img className="text-center" alt="poke" src={pokemon.sprites.front_default} />
                </PokemonSpriteContainer>
                <div className="col-md-12 text-center">
                  <p> {`Abilities: ${pokemon.abilities.length}`} </p>
                  <p> {`Base Experience: ${pokemon.base_experience}`} </p>
                  <p> {`Height: ${pokemon.height}`} </p>
                  <p> {`Weight: ${pokemon.weight}`} </p>
                </div>
              </div>
            ) : (
              loadingSelected ? (
                <div className="mx-auto">
                  {'Loading... APi too slow'}
                </div>
              ) : null
            )
          }
        </SelectedCardContainer>
        <div className="row">
          {
            !loading && pokemons && pokemons.results ? (
              <div>
                {
                  pokemons.results.map((poke, index) => (
                    <PokeCard
                      key={`poke-${index}`} // eslint-disable-line
                      className="col-md-3"
                      onClick={() => this.handleCheckPokemonClick(poke.url)}
                    >
                      {poke.name}
                    </PokeCard>
                  ))
                }
                <div style={{ marginTop: 20 }}>
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={<a href="">...</a>}
                    breakClassName={'break-me'}
                    pageCount={pokemons.count}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={20}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    pageClassName={'paginateLi'}
                    pageLinkClassName={'paginateLink'}
                  />
                </div>
              </div>
            ) : (
              'Loading...'
            )
          }
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.any.isRequired,
  homeStore: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homeStore: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ ...homeActions }, dispatch);
  return { actions };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
