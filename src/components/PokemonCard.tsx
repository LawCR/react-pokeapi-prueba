import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { PokemonType } from '../interfaces'

interface Props {
    pokemon: PokemonType
}

const PokemonCard: FC<Props> = ({pokemon}) => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate(`/pokemon/${pokemon.name}`)
    }
    return (
        <Grid item xs={12} sm={6} md={3} lg={3} xl={2} key={pokemon.name} >
            <Card  elevation={24}  >
                <CardMedia 
                    component="img"
                    onClick={onClick}
                    height="160"
                    image={pokemon.img}
                    alt={pokemon.name}
                    sx={{padding: '2px', objectFit: 'contain', cursor: 'pointer', transition: 'all 0.3s ease-out',
                        '&:hover': {
                            opacity: [0.9, 0.8],
                            transform: 'scale(1.1,1.1)'
                        },
                    }}
                />
                <CardContent sx={{display: 'flex', justifyContent: 'space-around', paddingX: '10px', backgroundColor: 'secondary.main'}}>
                    <Typography variant="h5" component="p" fontStyle='oblique' fontWeight='light' textTransform='capitalize'>
                    {pokemon.name}
                    </Typography>
                    {
                        pokemon.id ?
                        <Typography variant="h5" component="p" fontStyle='oblique'>
                        #{pokemon.id}
                        </Typography>
                        : null
                    }
                </CardContent>
                <CardActions sx={{backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={onClick} sx={{fontWeight:'light'}} variant='contained' fullWidth color='info'>Ver Detalles</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default PokemonCard