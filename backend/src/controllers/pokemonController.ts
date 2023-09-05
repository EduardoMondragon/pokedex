import { Request, Response } from "express";
import firestoreService from "../services/firestoreDBService";
import pokemonApiService from "../services/apiPokemonService";
import { PokemonCollection, UsersCollection } from "../config/firebase.config";

/**
 * Search a paginated list of pokemons in db, otherwise in pokemon api
 * @param req  should include 'offSet' and 'limit' to paginate request
 */
const getPokemons = async (req: Request, res: Response) => {
	try {
		const { offSet, limit } = req.body;
		let foundPlace = "from db.";
		let nextVal = true;
		let data = await firestoreService.getList(offSet, PokemonCollection);
		if (data.length == 0) {
			const { pokemonList, next } = await pokemonApiService.getPokemonList(offSet, limit);
			await firestoreService.saveData(pokemonList, PokemonCollection);
			data = pokemonList;
			nextVal = next;
			foundPlace = "from pokemon api and saved in db.";
		}
		res.status(200).json({
			ok: true,
			message: `Data succesfully fetched ${foundPlace}`,
			data,
			next: nextVal,
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
 * Search a pokemon in db, otherwise in pokemon api
 * @param req  should include 'pokemonName'
 */
const findOnePokemon = async (req: Request, res: Response) => {
	try {
		const { pokemonName } = req.body;
		let foundPlace = "in db.";
		let pokemonFound = await firestoreService.getOne("name", pokemonName, PokemonCollection);
		if (!pokemonFound) {
			pokemonFound = await pokemonApiService.findPokemon(pokemonName);
			foundPlace = "in pokemon api.";
		}
		res
			.status(200)
			.json({ ok: true, message: `Pokemon found ${foundPlace}`, pokemon: pokemonFound });
	} catch (error) {
		res.status(404).json({ ok: false, message: "Pokemon not found." });
	}
};

/**
 * Add a pokemon to favorites
 * @param req  should include 'uuid' of the user and 'pokemonId'
 */
const addPokemonToFavorites = async (req: Request, res: Response) => {
	try {
		const { uuid, pokemonId } = req.body;
		await firestoreService.updateOne("uuid", uuid, parseInt(pokemonId), UsersCollection);
		res.status(200).json({ ok: true, message: "Pokemon added as a favorite." });
	} catch (error) {
		res
			.status(500)
			.json({ ok: false, message: "Error trying to add a pokemon to favorites.", error });
	}
};

export default {
	getPokemons,
	findOnePokemon,
	addPokemonToFavorites,
};
