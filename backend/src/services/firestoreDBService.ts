import { query, getDocs, where, addDoc, orderBy, limit, updateDoc } from "firebase/firestore";
import { UsersCollection } from "../config/firebase.config";

/**
 * Allow to fecht multiple documents paginated by id from firestore,like Pokemon collection
 * @param lastRef  refers to the las document fetched.
 * @param end    will be the limit document reference to be fetch.
 * @param collectionObj the firestore collection object
 * @returns array of elements found in collection
 */
const getList = async (lastRef: string, collectionObj: any): Promise<any> => {
	try {
		let customQuery = query(
			collectionObj,
			where("id", ">", parseInt(lastRef)),
			where("id", "<=", parseInt(lastRef) + 12),
			orderBy("id")
		);
		const data: any = [];
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
 * Can fetch a document where any field be == any value
 * @param fieldName fieldName for query
 * @param value  value of the fieldName
 * @param collectionObj the firestore collection object
 * @returns return a object (element found)
 */
const getOne = async (fieldName: string, value: string, collectionObj: any) => {
	try {
		let elementFound = null;
		const customQuery = query(collectionObj, where(fieldName, "==", value), limit(1));
		const querySnapshot: any = await getDocs(customQuery);
		if (!querySnapshot.empty) {
			elementFound = querySnapshot.docs[0].data();
		}
		return elementFound;
	} catch (error) {
		throw error;
	}
};

/**
 *  Can save documents into any firestore collection
 * @param data can be array of objects or just a object
 * @param collectionObj the firestore collection object
 */
const saveData = async (data: Array<any> | object, collectionObj: any): Promise<any> => {
	try {
		if (Array.isArray(data)) {
			for (const element of data) {
				await addDoc(collectionObj, element);
			}
		} else {
			await addDoc(collectionObj, data);
		}
	} catch (error) {
		throw error;
	}
};

const addOrRemoveFavoritePokemonToCurrentUser = async (uuid: string, pokemonId: number) => {
	try {
		// query to find the user in db
		const customQuery = query(UsersCollection, where("uuid", "==", uuid), limit(1));
		// exc query
		const querySnapshot: any = await getDocs(customQuery);
		// if found user in db
		if (!querySnapshot.empty) {
			const userDoc = querySnapshot.docs[0];
			const user = querySnapshot.docs[0].data();

			let newUser = {
				...user,
				favorites: {
					...user.favorites,
					[pokemonId]: true,
				},
			};
			// if exist pokemon id as favorite for this user then remove from favorites
			if (user.favorites[pokemonId]) {
				let favorites = { ...user.favorites };
				delete favorites[pokemonId];
				newUser = { ...newUser, favorites };
			}
			// update the user in db
			await updateDoc(userDoc.ref, newUser);
		} else {
			// if doesnt exist then create that user in db
			const newUser = { uuid, favorites: { [pokemonId]: true } };
			await addDoc(UsersCollection, newUser);
		}
	} catch (error) {
		throw error;
	}
};

const getFavorites = async (uuid: string, collectionObj: any) => {
	try {
		let favorites = null;
		const customQuery = query(collectionObj, where("uuid", "==", uuid), limit(1));
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
	getList,
	getOne,
	saveData,
	addOrRemoveFavoritePokemonToCurrentUser,
	getFavorites,
};
