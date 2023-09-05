import axios from "axios";
import {
	IPokemon,
	IPokemonApiResponse,
	IPokemonList,
	IPokemonApiResults,
} from "../interfaces/pokemon";

const baseApiPokemonUrl = "https://pokeapi.co/api/v2/pokemon";

/**
 * Fetch paginated pokemons from API
 * @offSet last item fetched from api.
 * @limit limit number of pokemons that will be fetch.
 * @returns list of pokemons (name, img, id)
 */
const getPokemonList = async (offSet: number, limit: number): Promise<IPokemonList> => {
	try {
		// Api based in pagination
		const apiCustomUrl = `${baseApiPokemonUrl}?offset=${offSet}&limit=${limit}`;

		// call api
		const response = await axios.get(apiCustomUrl);

		// get pokemon references
		const data: IPokemonApiResponse = await response.data;
		const nextUrl = data.next !== null ? true : false;

		// call individual pokemon reference to fetch requirements
		const pokemonList: IPokemon[] = await getPokemonData(data.results);

		return { pokemonList, next: nextUrl };
	} catch (error) {
		throw error;
	}
};

/**
 * Call each pokemon API reference (related with top fn)
 * @param results pokemons array, include own poke api url
 * @returns return required info from pokemon (name, img, id)
 */
const getPokemonData = async (results: IPokemonApiResults[]): Promise<IPokemon[]> => {
	try {
		const pokemonList: IPokemon[] = [];

		// loop results list and call each api
		for (const pokemonRef of results) {
			if (pokemonRef.hasOwnProperty("url")) {
				const pokemon: any = await axios.get(pokemonRef.url);

				// try to get art pokemon img , otherwise front sprite
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

/**
 * search in Api a pokemon by name
 * @param pokemonName
 * @returns
 */
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
