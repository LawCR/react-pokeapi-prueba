import { Box, AppBar, Toolbar, Slide, Typography, CardMedia } from '@mui/material'
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useNavigate } from 'react-router-dom';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toogleModeAction } from '../redux/actions/ui';
import { getPokemonFavoritesAction } from '../redux/actions/pokemons';
import { useEffect } from 'react';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

const Navbar = () => {
    const {isDarkMode} = useAppSelector(state => state.ui)
    const {myPokemons} = useAppSelector(state => state.pokemons)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onToogleMode = () => {
        dispatch(toogleModeAction())
    }

    const onNavigateHome = () => {
        navigate(`/`)
        // dispatch(fetchAllPokemonsAction())
    }

    useEffect(() => {
        dispatch(getPokemonFavoritesAction())
    }, [])

    useEffect(() => {
        localStorage.setItem('favoritePokemons', JSON.stringify(myPokemons))
    }, [myPokemons])

   


    return (
        <Box sx={{ flexGrow: 1 }}>
            <HideOnScroll>
                <AppBar position="fixed" sx={{backgroundColor: 'secondary.main'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box display='flex' justifyContent='center' alignItems='center' columnGap={2}>
                            <CardMedia 
                                component="img"
                                height="50px"
                                width="50px"
                                image={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg' || 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'}
                                alt='Logo Pokemon'
                                sx={{padding: '2px', objectFit: 'contain', cursor: 'pointer',
                                    '&:hover': {
                                        opacity: [0.9, 0.8],
                                    },
                                }}
                                onClick={onNavigateHome}
                            />
                            <Typography onClick={onNavigateHome} variant="h5" fontWeight='light' component="h6" color='primary' sx={{cursor: 'pointer', display: {xs: 'none', md: 'block'}, '&:hover': {color: 'white'}}}>
                                Pokémon
                            </Typography>

                        </Box>
                        <Box >
                            <Box display='flex' justifyContent='center' alignItems='center' onClick={onToogleMode}>
                                {
                                    isDarkMode 
                                        ? <LightModeOutlinedIcon sx={{ cursor: 'pointer', color: 'primary.main','&:hover': {color: 'white'}}} /> 
                                        : <ModeNightOutlinedIcon sx={{ cursor: 'pointer', color: 'primary.main','&:hover': {color: 'white'}}}/>
                                }
                            </Box>
                        </Box>
                        <Box display='flex' columnGap={1}>
                            <Typography onClick={() => navigate(`/favoritos`)} variant="h6" fontWeight='light' component="h6" color='primary' sx={{cursor: 'pointer', '&:hover': {color: 'white'}}} noWrap>
                                Capturados
                            </Typography>
                            <Typography onClick={() => navigate(`/pokedex`)} variant="h6" fontWeight='light' component="h6" color='primary' sx={{cursor: 'pointer', '&:hover': {color: 'white'}}} noWrap>
                                Pokedex
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </Box>
    )
}

export default Navbar