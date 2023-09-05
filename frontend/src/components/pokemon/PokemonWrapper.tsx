import PokemonList from "./list/pokemonList";
import BtnMorePokemons from "./btnMorePokemons/BtnMorePokemons";
import PokemonSearch from "./search/pokemonSearch";
import LoadingPage from "../loading/loadingPage";
import PokemonWrapperLogic from "./PokemonWrapperLogic";
import NotFound from "./notFound/NotFound";

const PokemonWrapper = () => {
	const {
		list,
		loadingPage,
		errorMessage,
		randomColors,
		morePokemonsLoading,
		searchingPokemonResponse,
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
			{loadingPage && !morePokemonsLoading && <LoadingPage customMessage="Fetching Pokemons..." />}
			{list.length > 0 && searchingPokemonResponse !== 404 && (
				<PokemonList
					list={list}
					randomColors={randomColors}
					searchingPokemonResponse={searchingPokemonResponse}
				/>
			)}
			{list.length > 1 && searchingPokemonResponse !== 404 && (
				<BtnMorePokemons
					setPaginationParams={setPaginationParams}
					loadingPage={loadingPage}
					setLoadingPage={setLoadingPage}
					setMorePokemonsLoading={setMorePokemonsLoading}
					searchingPokemonResponse={searchingPokemonResponse}
					setSearchingPokemonResponse={setSearchingPokemonResponse}
				/>
			)}
			{searchingPokemonResponse === 404 && (
				<NotFound setSearchingPokemonResponse={setSearchingPokemonResponse} />
			)}
			{errorMessage && <p>Error : {errorMessage}</p>}
		</>
	);
};

export default PokemonWrapper;
