export interface IPagination {
	offSet: number;
	limit: number;
}

export interface IPokemon {
	id: number;
	name: string;
	imageURL: string;
}

export interface IDataSearchPokemon {
	name: string;
}
