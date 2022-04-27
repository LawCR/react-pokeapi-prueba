import { Box, Button, Card, CardMedia, Container, Divider, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getPokemonAction, savePokemonAction } from '../redux/actions/pokemons';
import { PokemonType } from '../interfaces/pokemonList';


const PokemonPage = () => {

    const {name} = useParams<string>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPokemonAction(name!))
    }, [])

    const {pokemonSelected, myPokemons} = useAppSelector(state => state.pokemons)

    const onSaveFavorite = (pokemon: PokemonType) => {
        const PokemonSaved: PokemonType = {
            img: pokemon.sprites?.other?.dream_world.front_default,
            name: pokemon.name,
            abilities: pokemon.abilities,
            types: pokemon.types
        }
        dispatch(savePokemonAction(PokemonSaved))
    }

    const isFavoritePokemon = myPokemons.some(mypokemon => mypokemon.name === pokemonSelected.name)

    if (!pokemonSelected.sprites) {
        return <p>Cargando</p>
    }
    return (
        <Container>
            <Grid container spacing={{xs: 1, md: 2}} marginBottom={1}>
                <Grid xs={12} sm={5} item>
                    <Card elevation={24}  >
                        <CardMedia 
                            component="img"
                            height="450"
                            image={pokemonSelected.sprites?.other?.dream_world.front_default || 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'}
                            alt={pokemonSelected.name}
                            sx={{padding: '2px', objectFit: 'contain', cursor: 'pointer',
                                '&:hover': {
                                    opacity: [0.9, 0.8],
                                },
                            }}
                        />
                    </Card>
                </Grid>
                <Grid xs={12} sm={7} item>
                    <Box display='flex' flexDirection='column' >
                    {/* <Box sx={{backgroundColor: '#121212', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'}}> */}
                        <Typography textAlign='center' color='primary' gutterBottom variant="h3" fontWeight='light' component="h1" textTransform='capitalize' sx={{cursor: 'pointer'}}>
                            {pokemonSelected.name}
                        </Typography>
                        <Divider variant='middle'>
                            <Typography variant="h6" fontWeight='light' color='primary' component="h2" textTransform='capitalize'>
                                Habilidades
                            </Typography>
                        </Divider>
                        <Box display='flex' marginY={2} justifyContent='space-around'>
                            {
                                pokemonSelected?.abilities!.map(({ability}, index) => (
                                    <Typography 
                                        key={ability.name + index} 
                                        variant="h6" fontWeight='light' component="h3" textTransform='capitalize' 
                                        sx={{cursor: 'pointer', backgroundColor: 'info.main', paddingY: '0.2rem', paddingX: '1.5rem', borderRadius: '10px'}}
                                    >
                                        {ability.name}
                                    </Typography>
                                ))
                            }
                        </Box>
                        <Divider variant='middle'>
                            <Typography variant="h6" fontWeight='light' color='primary' component="h2" textTransform='capitalize'>
                                Tipo
                            </Typography>
                        </Divider>
                        <Box display='flex' marginY={2} justifyContent='space-around'>
                            {
                                pokemonSelected?.types!.map(({type}, index) => (
                                    <Typography 
                                        key={type.name + index} 
                                        variant="h6" fontWeight='light' component="h3" textTransform='capitalize' 
                                        sx={{cursor: 'pointer', backgroundColor: 'info.main', paddingY: '0.2rem', paddingX: '1.5rem', borderRadius: '10px'}}
                                    >
                                        {type.name}
                                    </Typography>
                                ))
                            }
                        </Box>
                        <Box width='100%' display='flex' marginY={5} justifyContent='center' alignItems='center' >
                            <Button onClick={ () => onSaveFavorite(pokemonSelected)} variant='contained' size='large' color={isFavoritePokemon ? 'success' : 'error'} sx={{width: '60%', fontWeight: '400', color: '#FFF'}}>
                                {
                                    isFavoritePokemon ? 'Pokemon Capturado' : 'Capturar Pokemon'
                                } 
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={{xs: 4, md: 2}} marginBottom={2}>
                <Grid xs={12} item>
                    <Divider>
                        <Typography variant="h5" fontWeight='light' color='primary' component="h2" textTransform='capitalize'>
                            Sprites
                        </Typography>
                    </Divider>
                </Grid>
                <Grid xs={12} sm={6} md={3} item>
                    <CardMedia 
                        component="img"
                        height="160"
                        image={pokemonSelected.sprites?.front_default || 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'}
                        alt={pokemonSelected.name}
                        sx={{ objectFit: 'contain', cursor: 'pointer', transition: 'all 0.3s ease-out',
                            '&:hover': {
                                opacity: [0.9, 0.8],
                                transform: 'scale(1.25,1.25)'
                            },
                        }}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3} item>
                    <CardMedia 
                        component="img"
                        height="160"
                        image={pokemonSelected.sprites?.back_default || 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'}
                        alt={pokemonSelected.name}
                        sx={{objectFit: 'contain', cursor: 'pointer', transition: 'all 0.3s ease-out',
                            '&:hover': {
                                opacity: [0.9, 0.8],
                                transform: 'scale(1.25,1.25)'
                            },
                        }}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3} item>
                    <CardMedia 
                        component="img"
                        height="160"
                        image={pokemonSelected.sprites?.front_shiny || 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'}
                        alt={pokemonSelected.name}
                        sx={{objectFit: 'contain', cursor: 'pointer', transition: 'all 0.3s ease-out',
                            '&:hover': {
                                opacity: [0.9, 0.8],
                                transform: 'scale(1.25,1.25)'
                            },
                        }}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3} item>
                {/* spacing={{xs: 1, md: 2}} */}
                    <CardMedia 
                        component="img"
                        height="160"
                        image={pokemonSelected.sprites?.back_shiny || 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'}
                        alt={pokemonSelected.name}
                        sx={{objectFit: 'contain', cursor: 'pointer', transition: 'all 0.3s ease-out',
                            '&:hover': {
                                opacity: [0.9, 0.8],
                                transform: 'scale(1.25,1.25)'
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default PokemonPage