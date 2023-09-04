type newObj = "addPokemonAsFavorite";

const newObjectToUpdate = (objectRef: newObj, document: any): any => {
	switch (objectRef) {
		case "addPokemonAsFavorite":
			return {
				...document.data,
				favorites: {
					...document.data.favorites,
					[document.newValue]: true,
				},
			};
		default:
			return;
	}
};

export default {
	newObjectToUpdate,
};
