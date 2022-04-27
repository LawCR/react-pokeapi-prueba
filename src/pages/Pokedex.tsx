import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { PokemonCard, Search } from '../components'
import { PokemonType } from '../interfaces';
import { fetchAllPokemonsAction, getEvolutionPokemon } from '../redux/actions/pokemons'
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Pokedex = () => {

    const dispatch = useAppDispatch()
    const {pokemonList} = useAppSelector(state => state.pokemons)
    const [search, setSearch] = useState<string>('')
    const [evoluciones, setEvoluciones] = useState<PokemonType[]>([])
    
    useEffect(() => {
        dispatch(fetchAllPokemonsAction())
    }, [])
    
    const onSearch = async(search: string) => {
        if (search.trim().length === 0) {
            return
        }
        getEvolutionPokemon(search, setEvoluciones, pokemonList)
        setSearch('')
    }
    
    return (
        <Container>
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' marginBottom={2}>
                <Typography textAlign='center' color='primary' gutterBottom variant="h4" fontWeight='light' component="h1">
                    Descubre en la Pokedex las evoluciones de los Pokemons
                </Typography>
                <Search search={search} setSearch={setSearch} onSearch={onSearch} />
            </Box>
            <Grid container spacing={{xs: 1, md: 2}} marginBottom={1}>
                        {
                            evoluciones.length === 0 
                            ?  <Typography color='primary' gutterBottom variant="h6" fontWeight='light' marginTop={3} component="p">
                                    Busca algún pokémon en su fase inicial por su Id.
                                </Typography>
                            : evoluciones.map((evolucion) => (
                                <PokemonCard key={evolucion.name} pokemon={evolucion} />
                            ))
                        }
                </Grid>
        </Container>
    )
}

export default Pokedex