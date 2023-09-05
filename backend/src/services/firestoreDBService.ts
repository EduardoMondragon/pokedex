import { query, getDocs, where, addDoc, orderBy, limit, updateDoc } from "firebase/firestore";
import { PokemonCollection, UsersCollection } from "../config/firebase.config";

/**
 * Fetch paginated documents by id
 * @param lastRef  last document fetched.
 * @returns list of pokemons
 */
const getPokemonList = async (lastRef: string): Promise<any> => {
	try {
		const data: any = [];

		// query, find pokemons where id between ranges
		let customQuery = query(
			PokemonCollection,
			where("id", ">", parseInt(lastRef)),
			where("id", "<=", parseInt(lastRef) + 12),
			orderBy("id")
		);

		// exec query
		const querySnapshot = await getDocs(customQuery);

		if (!querySnapshot.empty) {
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
		}

		return data;
	} catch (error) {
		throw error;
	}
};

/**
 * Fetch a pokemon by name
 * @param pokemonName
 * @returns return pokemon object
 */
const getOnePokemon = async (pokemonName: string) => {
	try {
		let pokemon = null;

		// query, find pokemon by name
		const customQuery = query(PokemonCollection, where("name", "==", pokemonName), limit(1));

		// exec query
		const querySnapshot: any = await getDocs(customQuery);

		if (!querySnapshot.empty) {
			pokemon = querySnapshot.docs[0].data();
		}

		return pokemon;
	} catch (error) {
		throw error;
	}
};

/**
 *  Save pokemonList
 * @param pokemonList array of pokemons
 */
const savePokemonList = async (pokemonList: Array<any>): Promise<any> => {
	try {
		// loop pokemon list
		for (const element of pokemonList) {
			// insert each pokemon in db
			await addDoc(PokemonCollection, element);
		}
	} catch (error) {
		throw error;
	}
};

/**
 * Add or remove a pokemon id from user favorite pokemons dictionary
 * @param uuid unique user identifier
 * @param pokemonId
 */
const handleFavPokemon = async (uuid: string, pokemonId: number) => {
	try {
		// query to find user in db
		const customQuery = query(UsersCollection, where("uuid", "==", uuid), limit(1));

		// exec query
		const querySnapshot: any = await getDocs(customQuery);

		// if found user in db
		if (!querySnapshot.empty) {
			const userDoc = querySnapshot.docs[0];
			const user = querySnapshot.docs[0].data();

			// object with a new favorite
			let newUser = {
				...user,
				favorites: {
					...user.favorites,
					[pokemonId]: true,
				},
			};

			// if pokemon id as favorite exist ? then remove it from favorites
			if (user.favorites[pokemonId]) {
				let favorites = { ...user.favorites };
				delete favorites[pokemonId];
				newUser = { ...newUser, favorites };
			}

			// update the user in db
			await updateDoc(userDoc.ref, newUser);
		} else {
			// if user doesnt exist, add it into db with pokemon favorite dictionary
			const newUser = { uuid, favorites: { [pokemonId]: true } };
			await addDoc(UsersCollection, newUser);
		}
	} catch (error) {
		throw error;
	}
};

/**
 * Fetch a hash map of user favorite pokemons
 * @param uuid unique user identifier
 * @returns
 */
const getFavoriteUserPokemons = async (uuid: string) => {
	try {
		let favorites = null;

		// query, find user where id equals to uuid param
		const customQuery = query(UsersCollection, where("uuid", "==", uuid), limit(1));

		// exec query
		const querySnapshot: any = await getDocs(customQuery);

		if (!querySnapshot.empty) {
			favorites = querySnapshot.docs[0].data().favorites;
		}

		return favorites;
	} catch (error) {
		throw error;
	}
};

export default {
	getPokemonList,
	getOnePokemon,
	savePokemonList,
	handleFavPokemon,
	getFavoriteUserPokemons,
};
