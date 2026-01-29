import { Hero, CharactersResponse } from "../types/heroes";

const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacters = async (): Promise<Hero[]> => {
    const res = await fetch(`${BASE_URL}/character`);
    const data: CharactersResponse = await res.json();
    return data.results;
};

export const getCharacterById = async (id: string): Promise<Hero> => {
    const res = await fetch(`${BASE_URL}/character/${id}`);
    return res.json();  
};