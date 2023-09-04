// import { useState } from "react";
import PokemonList from "./list/pokemonList";
import BtnMorePokemons from "./btnMorePokemons/BtnMorePokemons";
import PokemonSearch from "./search/pokemonSearch";
import LoadingPage from "../loading/loadingPage";
import PokemonWrapperLogic from "./PokemonWrapperLogic";
import { useEffect, useState } from "react";

const PokemonWrapper = () => {
	const [loadingPage, setLoadingPage] = useState<boolean>(true);
	const [morePokemonsLoading, setMorePokemonsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { list, loading, error, randomColors, setPaginationParams, setSearchingPokemonResponse } =
		PokemonWrapperLogic();

	useEffect(() => {
		if (loading) setLoadingPage(loading);
		if (error) setErrorMessage(error.message);
		if (list.length > 0) {
			setLoadingPage(loading);
			setMorePokemonsLoading(false);
		}
	}, [loading, error, list]);

	return (
		<>
			<PokemonSearch
				loadingPage={loadingPage}
				setLoadingPage={setLoadingPage}
				setErrorMessage={setErrorMessage}
				setSearchingPokemonResponse={setSearchingPokemonResponse}
			/>
			{loadingPage && !morePokemonsLoading && <LoadingPage />}
			{list.length > 0 && <PokemonList list={list} randomColors={randomColors} />}
			{list.length > 1 && (
				<BtnMorePokemons
					setPaginationParams={setPaginationParams}
					loadingPage={loadingPage}
					setLoadingPage={setLoadingPage}
					setMorePokemonsLoading={setMorePokemonsLoading}
				/>
			)}
			{errorMessage && (
				<>
					<p>Error : {errorMessage}</p>
				</>
			)}
		</>
	);
};

export default PokemonWrapper;
