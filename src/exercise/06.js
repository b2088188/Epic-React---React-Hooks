// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useState, useEffect} from 'react'
import {ErrorBoundary} from 'react-error-boundary';
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'




function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        <button onClick = {resetErrorBoundary}>Try Again</button>
      </div>
    )
}

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState({
    data: {},
    status: 'idle',
    error: null
  });


  useEffect(() => {    
    if(pokemonName)
    fetchData()
    async function fetchData() {
      try {
      setPokemon({
        ...pokemon,
        status: 'pending'
      });
      const res = await fetchPokemon(pokemonName);
       setPokemon({
        ...pokemon,
        status: 'resolved',
        data: res
      }); 
      }
      catch(err) {
        setPokemon({
          status: 'rejected',
          error: err
        })
      }          
    }
  }, [pokemonName])

  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
  if(!pokemonName)
    return <p>Submit a Pokemon</p>
  if(pokemon.status === 'idle' || pokemon.status === 'pending')
    return <PokemonInfoFallback name={pokemonName} />
  if(pokemon.status === 'rejected')
    throw pokemon.error
  if(pokemon.status === 'resolved')
  return <PokemonDataView pokemon={pokemon.data} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('');
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary resetKeys = {[/*If the dependency change, reset the error*/pokemonName]} FallbackComponent = {ErrorFallback} onReset = {/*Reset the pokemon name when error reset*/handleReset}>          
        <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
