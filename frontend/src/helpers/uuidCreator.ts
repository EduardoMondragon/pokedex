const createUuidRandomdly = () => {
	const uuid = "ed2045ff";
	window.localStorage.setItem("pokeUuid", uuid);
	return window.localStorage.getItem("pokeUuid");
};

const fetchExistingUuid = () => {
	const currentUuid = window.localStorage.getItem("pokeUuid");
	if (currentUuid) return currentUuid;
	return null;
};

const removeUuid = () => {
	window.localStorage.removeItem("pokeUuid");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { createUuidRandomdly, fetchExistingUuid, removeUuid };
