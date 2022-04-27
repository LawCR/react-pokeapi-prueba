import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Favorites, Home, Pokedex, PokemonPage } from '../pages';
import { Navbar } from '../components';
import { lightTheme, darkTheme } from '../themes';
import { useAppSelector } from '../redux/hooks';



const AppRoute = () => {

    const {isDarkMode} = useAppSelector(state => state.ui)

    return (
        <ThemeProvider theme={ isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <BrowserRouter>
                <Navbar />
                    {/* <Container maxWidth='xl'> */}
                        <Box marginTop={2}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/pokemon/:name" element={<PokemonPage />} />
                                <Route path="/favoritos" element={<Favorites />} />
                                <Route path="/pokedex" element={<Pokedex />} />
                            </Routes>
                        </Box>
                    {/* </Container> */}
            </BrowserRouter>
        </ThemeProvider>
        
    )
}

export default AppRoute