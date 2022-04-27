import { Ability, Sprites, Type } from "./pokemonDetails";

export interface PokemonListResponse {
    count:    number;
    next?:     string;
    previous?: string;
    results:  PokemonType[];
}

export interface PokemonType {
    id?: number;
    name?: string;
    url?:  string;
    img?: string;
    abilities?: Ability[];
    sprites?: Sprites;
    types?: Type[];
}
