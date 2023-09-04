import PokemonList from "./list/pokemonList";
import BtnMorePokemons from "./btnMorePokemons/BtnMorePokemons";
import PokemonSearch from "./search/pokemonSearch";
import LoadingPage from "../loading/loadingPage";
import PokemonWrapperLogic from "./PokemonWrapperLogic";

const PokemonWrapper = () => {
	const {
		list,
		loadingPage,
		errorMessage,
		randomColors,
		morePokemonsLoading,
		setLoadingPage,
		setMorePokemonsLoading,
		setErrorMessage,
		setPaginationParams,
		setSearchingPokemonResponse,
	} = PokemonWrapperLogic();

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
