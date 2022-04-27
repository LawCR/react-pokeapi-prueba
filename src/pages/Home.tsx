import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchAllPokemonsAction, searchPokemonAction } from '../redux/actions/pokemons';
import { PokemonCard, Search } from '../components';

const Home = () => {
  
  const dispatch = useAppDispatch()
  const {pokemonList} = useAppSelector(state => state.pokemons)
  const [search, setSearch] = useState<string>('')

  const onSearch = (search: string) => {
    if (search.trim().length === 0) {
        dispatch(fetchAllPokemonsAction())
        return
    }
    dispatch(searchPokemonAction(search.toLowerCase()))
    setSearch('')
  }

  useEffect(() => {
    dispatch(fetchAllPokemonsAction())
  }, [])

  return (
    <Box paddingX={10}>
      <Box display='flex' justifyContent='center' marginBottom={2}>
        <Search search={search} setSearch={setSearch} onSearch={onSearch} />
      </Box>
      <Grid container spacing={{xs: 1, md: 2}}>
        {
          pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </Grid>
    </Box>
  )
}

export default Home