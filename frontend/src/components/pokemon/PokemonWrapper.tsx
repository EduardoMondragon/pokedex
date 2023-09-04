import { useState } from "react";
import PokemonList from "./list/pokemonList";
import BtnMorePokemons from "./btnMorePokemons/BtnMorePokemons";
import PokemonSearch from "./search/pokemonSearch";
import LoadingPage from "../loading/loadingPage";
import { IPokemon } from "../../interfaces/pokemon";
const PokemonWrapper = () => {
	const [list, setList] = useState<IPokemon[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [paginationParams, setPaginationParams] = useState({ offSet: 0, limit: 12 });
	return (
		<>
			{loading && <LoadingPage />}
			{list && (
				<>
					<PokemonSearch />
					<PokemonList
						list={list}
						setList={setList}
						setError={setError}
						setLoading={setLoading}
						paginationParams={paginationParams}
					/>
					<BtnMorePokemons
						setPaginationParams={setPaginationParams}
						loading={loading}
						setLoading={setLoading}
					/>
				</>
			)}
			{error && (
				<>
					<p>Error {error}</p>
				</>
			)}
		</>
	);
};

export default PokemonWrapper;
