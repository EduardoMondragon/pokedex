import { Request, Response } from "express";
import dbService from "../services/firestoreDBService";
import apiService from "../services/apiPokemonService";

/**
 * Search a paginated list of pokemons in db, otherwise in pokemon api
 * @param req  should include 'offSet' and 'limit' to paginate
 */
const getPokemons = async (req: Request, res: Response) => {
	try {
		const { offSet, limit, uuid } = req.body;

		let collectedFrom = "from db.";
		let nextVal = true;
		let favorites = null;

		// fetch pokemons from db in case of exist.
		let data = await dbService.getPokemonList(offSet);

		// if found pokemons from db, fetch favorites for current user
		if (data.length !== 0) {
			favorites = await dbService.getFavoriteUserPokemons(uuid);
		}
		// if not pokemons in db, fetch from API
		else {
			// fetch from api
			const { pokemonList, next } = await apiService.getPokemonList(offSet, limit);

			// then save api pokemonList in db
			await dbService.savePokemonList(pokemonList);
			data = pokemonList;
			nextVal = next;
			collectedFrom = "from pokemon api and saved in db.";
		}

		res.status(200).json({
			ok: true,
			message: `Data succesfully fetched ${collectedFrom}`,
			data,
			next: nextVal,
			favorites,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: "Error fetching data.",
			error,
		});
	}
};

/**
 * Find one pokemon in db, otherwise in pokemon api (should be used for pokemon name lookup)
 * @param req  should include 'pokemonName'
 */
const findOnePokemon = async (req: Request, res: Response) => {
	try {
		const { pokemonName } = req.body;
		let collectedFrom = "in db.";

		let pokemonFound = await dbService.getOnePokemon(pokemonName);
		if (!pokemonFound) {
			pokemonFound = await apiService.findPokemon(pokemonName);
			collectedFrom = "in pokemon api.";
		}

		res
			.status(200)
			.json({ ok: true, message: `Pokemon found ${collectedFrom}`, pokemon: pokemonFound });
	} catch (error) {
		res.status(404).json({ ok: false, message: "Pokemon not found." });
	}
};

/**
 * Add or remove a favorite pokemon in db
 * @param req  should include 'uuid' and 'pokemonId'
 */
const addPokemonToFavorites = async (req: Request, res: Response) => {
	try {
		const { uuid, pokemonId } = req.body;

		// add or remove fav. pokemon from db
		await dbService.handleFavPokemon(uuid, parseInt(pokemonId));

		res.status(200).json({ ok: true, message: "Saved as favorite." });
	} catch (error) {
		res.status(500).json({ ok: false, message: "Error saving as favorite.", error });
	}
};

export default {
	getPokemons,
	findOnePokemon,
	addPokemonToFavorites,
};
