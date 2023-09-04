import { query, getDocs, where, addDoc, orderBy, limit, updateDoc } from "firebase/firestore";

/**
 * Allow to fecht multiple documents from firestore, in case of pokemons can be paginated
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

const updateOne = async (
	fieldName: string,
	value: string,
	pokemonId: number,
	collectionObj: any
) => {
	try {
		const customQuery = query(collectionObj, where(fieldName, "==", value), limit(1));
		const querySnapshot: any = await getDocs(customQuery);
		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			const elementFound = querySnapshot.docs[0].data();
			const newData = {
				...elementFound,
				favorites: {
					...elementFound.favorites,
					[pokemonId]: true,
				},
			};
			await updateDoc(doc.ref, newData);
		} else {
			const newUser = { uuid: value, favorites: { [pokemonId]: true } };
			await addDoc(collectionObj, newUser);
		}
	} catch (error) {
		throw error;
	}
};

export default {
	getList,
	getOne,
	saveData,
	updateOne,
};
