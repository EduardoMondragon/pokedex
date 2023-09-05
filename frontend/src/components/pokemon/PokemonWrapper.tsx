import PokemonList from "./list/pokemonList";
import BtnMorePokemons from "./btnMorePokemons/BtnMorePokemons";
import PokemonSearch from "./search/pokemonSearch";
import LoadingPage from "../loading/loadingPage";
import PokemonWrapperLogic from "./PokemonWrapperLogic";
import NotFound from "./notFound/NotFound";

const PokemonWrapper = () => {
	// get all logic from PokemonWrapperLogic
	const {
		list,
		favorites,
		loadingPage,
		errorMessage,
		randomColors,
		morePokemonsLoading,
		searchingPokemonResponse,
		setFavorites,
		setLoadingPage,
		setMorePokemonsLoading,
		setErrorMessage,
		setPaginationParams,
		setSearchingPokemonResponse,
	} = PokemonWrapperLogic();

	// Component return depending validators (search , list, 404 , btnMorePokemons, Loading or Error) Pages
	return (
		<>
			{/* Alway show Search Input */}
			<PokemonSearch
				loadingPage={loadingPage}
				setLoadingPage={setLoadingPage}
				setErrorMessage={setErrorMessage}
				setSearchingPokemonResponse={setSearchingPokemonResponse}
			/>

			{/* If loading action is active show LoadingPage */}
			{loadingPage && !morePokemonsLoading && <LoadingPage customMessage="Fetching Pokemons..." />}

			{/* If list array has something and didnt search an unexisting pokemon in input */}
			{list.length > 0 && searchingPokemonResponse !== 404 && (
				<PokemonList
					list={list}
					favorites={favorites}
					setFavorites={setFavorites}
					randomColors={randomColors}
					searchingPokemonResponse={searchingPokemonResponse}
				/>
			)}

			{/* If list has at leat 1 pokemon and didnt search an unexisting pokemon in input, show load more pokemons button*/}
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

			{/* If searched an unexisting pokemon in input return 404Page */}
			{searchingPokemonResponse === 404 && (
				<NotFound setSearchingPokemonResponse={setSearchingPokemonResponse} />
			)}

			{/* if catch some errors calling any endpoint show the Error */}
			{errorMessage && <p>Error : {errorMessage}</p>}
		</>
	);
};

export default PokemonWrapper;
