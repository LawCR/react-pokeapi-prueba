import { Box, Grid, Typography } from '@mui/material'
import { PokemonCard } from '../components'
import { useAppSelector } from '../redux/hooks'

const Favorites = () => {

    const {myPokemons} = useAppSelector(state => state.pokemons)
    
    return (
        <Box paddingX={10}>
            <Box display='flex' justifyContent='center' marginBottom={2}>
                <Typography textAlign='center' color='primary' gutterBottom variant="h3" fontWeight='light' component="h1" textTransform='capitalize'>
                    Mis Pokemones
                </Typography>
            </Box>
            <Grid container spacing={{xs: 1, md: 2}}>
                {
                    myPokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.name} pokemon={pokemon} />
                    ))
                }
            </Grid>
        </Box>
    )
}

export default Favorites