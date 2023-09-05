import { v4 as uuidv4 } from "uuid";

// Create unique universal identifier
const generateUUID = () => {
	const randomUUID = uuidv4();
	console.log(randomUUID);
	return randomUUID;
};

/**
 * Create a random uuid string
 * @returns local storage pokeUuid
 */
const createUuidRandomdly = () => {
	const uuid = generateUUID();
	window.localStorage.setItem("pokeUuid", uuid);
	// could return direclty the uuid but will be sure that was save in local storage
	return window.localStorage.getItem("pokeUuid");
};

/**
 * If local storage has a pokeUuid item saved , then will use it and wont create new one
 * @returns current local storage pokeUuid
 */
const fetchExistingUuid = () => {
	const currentUuid = window.localStorage.getItem("pokeUuid");
	if (currentUuid) return currentUuid;
	return null;
};

/**
 * Remove the current uuid from local storage
 */
const removeUuid = () => {
	window.localStorage.removeItem("pokeUuid");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { createUuidRandomdly, fetchExistingUuid, removeUuid };
