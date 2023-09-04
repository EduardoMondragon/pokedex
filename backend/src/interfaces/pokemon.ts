export interface IPokemonApiResults {
	name: string;
	url: string;
}
export interface IPokemonApiResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: IPokemonApiResults[];
}

export interface IPokemon {
	id: number;
	name: string;
	imageURL: string;
}

export interface IPokemonList {
	pokemonList: IPokemon[];
	next: boolean;
}
