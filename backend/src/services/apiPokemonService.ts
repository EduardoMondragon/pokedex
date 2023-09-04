import axios from "axios";
import {
	IPokemon,
	IPokemonApiResponse,
	IPokemonList,
	IPokemonApiResults,
} from "../interfaces/pokemon";

const baseApiPokemonUrl = "https://pokeapi.co/api/v2/pokemon";

/**
 * It will fetch pokemon results by limit number
 * @offSet  the last item fetched from api.
 * @limit The limit number of pokemons that will be fetch.
 * @returns pokemonList like [{id:1,name:'pikachu, imageUrl:'url'}...]
 */
const getPokemonList = async (offSet: number, limit: number): Promise<IPokemonList> => {
	try {
		const apiCustomUrl = `${baseApiPokemonUrl}?offset=${offSet}&limit=${limit}`;
		const response = await axios.get(apiCustomUrl);
		const data: IPokemonApiResponse = await response.data;
		const pokemonList: IPokemon[] = await getPokemonData(data.results);
		const nextUrl = data.next !== null ? true : false;
		return { pokemonList, next: nextUrl };
	} catch (error) {
		throw error;
	}
};

/**
 * Fetch each pokemon API to get data and add it to the final pokemonList
 * @param results array of pokemons results, each one include a url to be call
 * @returns pokemonList like [{id:1,name:'pikachu, imageUrl:'url'}...]
 */
const getPokemonData = async (results: IPokemonApiResults[]): Promise<IPokemon[]> => {
	try {
		const pokemonList: IPokemon[] = [];
		for (const pokemonRef of results) {
			if (pokemonRef.hasOwnProperty("url")) {
				const pokemon: any = await axios.get(pokemonRef.url);
				const img =
					pokemon.data.sprites?.other?.["official-artwork"]?.front_default ||
					pokemon.data.sprites.front_default;

				pokemonList.push({
					id: parseInt(pokemon.data.id),
					name: pokemon.data.name,
					imageURL: img,
				});
			}
		}
		return pokemonList;
	} catch (error) {
		throw error;
	}
};

const findPokemon = async (pokemonName: string) => {
	const apiCustomUrl = `${baseApiPokemonUrl}/${pokemonName}`;
	const pokemon = await axios.get(apiCustomUrl);
	let pokemonFound = null;
	if (pokemon.data) {
		const img =
			pokemon.data.sprites?.other?.["official-artwork"]?.front_default ||
			pokemon.data.sprites.front_default;

		pokemonFound = {
			id: parseInt(pokemon.data.id),
			name: pokemon.data.name,
			imageURL: img,
		};
	}
	return pokemonFound;
};

export default {
	getPokemonList,
	findPokemon,
};
