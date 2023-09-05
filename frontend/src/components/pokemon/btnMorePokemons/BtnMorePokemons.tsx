import "./styles.css";

// Component that show a button to load more pokemons or go back btn of previuos pokemon lookup
function BtnMorePokemons({
	setPaginationParams,
	loadingPage,
	setLoadingPage,
	setMorePokemonsLoading,
	searchingPokemonResponse,
	setSearchingPokemonResponse,
}: any) {
	// send the next search for paginated pokemon list
	const nextPagination = () => {
		setLoadingPage(true);
		setMorePokemonsLoading(true);
		setPaginationParams((prevState: any) => {
			return { offSet: prevState.offSet + 12, limit: prevState.limit };
		});
	};

	return (
		<div className="btnContainer">
			{searchingPokemonResponse && Object.keys(searchingPokemonResponse).length > 0 ? (
				<button
					className="btnRestore"
					disabled={loadingPage}
					onClick={() => {
						setSearchingPokemonResponse({});
					}}
				>
					<p>{loadingPage ? "loading..." : "Restore list"}</p>
				</button>
			) : (
				<button className="btnGetMore" disabled={loadingPage} onClick={nextPagination}>
					<p>{loadingPage ? "loading..." : "More Pokemons"}</p>
				</button>
			)}
		</div>
	);
}

export default BtnMorePokemons;
