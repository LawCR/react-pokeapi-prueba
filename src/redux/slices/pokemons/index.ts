import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PokemonType } from '../../../interfaces'

interface pokemonStateType {
    pokemonList: PokemonType[],
    pokemonSelected: PokemonType,
    myPokemons: PokemonType[]
}

const initialState: pokemonStateType = {
    pokemonList: [],
    pokemonSelected: {
        id: 1,
        img: '',
        name: '',
        url: ''
    },
    myPokemons: []
}


//* Nuestro Slice
export const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        getPokemonList: (state, action: PayloadAction<PokemonType[]>) => {
            state.pokemonList = action.payload
        },
        getPokemon: (state, action: PayloadAction<PokemonType>) => {
            state.pokemonSelected = action.payload
        },
        searchPokemon: (state, action: PayloadAction<string>) => {
            state.pokemonList = state.pokemonList.filter((pokemon) => pokemon.name?.includes(action.payload) )
        },
        savePokemon: (state, action: PayloadAction<PokemonType>) => {
            state.myPokemons = [...state.myPokemons, action.payload]
        },
        deletePokemon: (state, action: PayloadAction<PokemonType>) => {
            state.myPokemons = state.myPokemons.filter(pokemon => pokemon.name !== action.payload.name)
        },
        getPokemonFavorites: (state, action: PayloadAction<PokemonType[]>) => {
            state.myPokemons = action.payload
        },
    }
})

//* exportamos las actions de nuestro slice
export const { getPokemonList, getPokemon, searchPokemon, savePokemon, deletePokemon, getPokemonFavorites } = pokemonSlice.actions

//* exportamos el reducer
export default pokemonSlice.reducer

