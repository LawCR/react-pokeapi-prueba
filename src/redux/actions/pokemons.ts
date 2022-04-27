import axios from "axios";
import { Pokemon } from "../../interfaces";
import { PokemonListResponse, PokemonType } from '../../interfaces/pokemonList';
import { deletePokemon, getPokemon, getPokemonFavorites, getPokemonList, savePokemon, searchPokemon } from "../slices/pokemons";
import { AppDispatch } from "../store";

const pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});

export const fetchAllPokemonsAction = () => async(dispatch: AppDispatch) => {
    try {
        const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=100')
        const pokemons: PokemonType[] = data.results.map((pokemon, i) => (
            {
                ...pokemon,
                id: i + 1,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
            }
        ))
        dispatch(getPokemonList((pokemons)))
    } catch (error) {
        console.log(error)
    }
}

export const getPokemonAction = (namePokemon: string) => async(dispatch: AppDispatch) => {
    try {
        const {data} = await pokeApi.get<Pokemon>(`/pokemon/${namePokemon}`)
        const {id, name, abilities, sprites, types}: Pokemon = data
        const pokemon: PokemonType = {id, name, abilities, sprites, types}
        dispatch(getPokemon((pokemon)))
    } catch (error) {
        console.log(error)
    }
}

export const searchPokemonAction = (namePokemon: string) => async(dispatch: AppDispatch) => {
    try {
        const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=120') 
        const pokemons: PokemonType[] = data.results.map((pokemon, i) => (
            {
                ...pokemon,
                id: i + 1,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
            }
        ))
        dispatch(getPokemonList((pokemons)))
        dispatch(searchPokemon((namePokemon)))
    } catch (error) {
        console.log(error)
    }
}

export const getPokemonFavoritesAction = () => async(dispatch: AppDispatch) => {
    try {
        const myPokemons = JSON.parse(localStorage.getItem('favoritePokemons') || '[]')
        dispatch(getPokemonFavorites((myPokemons)))
    } catch (error) {
        console.log(error)
    }
}
export const savePokemonAction = (pokemon: PokemonType) => async(dispatch: AppDispatch) => {
    try {
        const myPokemons: PokemonType[] = JSON.parse(localStorage.getItem('favoritePokemons') || '[]')
        const existPokemon = myPokemons.some(mypokemon => mypokemon.name === pokemon.name)
        if (existPokemon) {
            dispatch(deletePokemon((pokemon)))
            return
        }
        dispatch(savePokemon((pokemon)))
    } catch (error) {
        console.log(error)
    }
}

export const getEvolutionPokemon = async(idPokemon: string, setEvoluciones: React.Dispatch<React.SetStateAction<PokemonType[]>>, pokemonList: PokemonType[]) => {
    try {
        pokeApi.get<any>(`evolution-chain/${idPokemon}/`)
            .then(({data}) => {

                let evoluciones = [
                    data.chain.species.name,
                    data.chain.evolves_to[0].species.name
                ]
        
                if (data.chain.evolves_to[0].evolves_to.length === 0) {
                    setEvoluciones(pokemonList.filter(pokemon => evoluciones.includes(pokemon.name!)))
                    return 
                }
                evoluciones.push(data.chain.evolves_to[0].evolves_to[0].species.name)
                setEvoluciones(pokemonList.filter(pokemon => evoluciones.includes(pokemon.name!)))
            })
    } catch (error) {
        console.log(error)
    }
}


