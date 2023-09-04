import "./styles.css";

function BtnMorePokemons({
	setPaginationParams,
	loadingPage,
	setLoadingPage,
	setMorePokemonsLoading,
}: any) {
	const nextPagination = () => {
		setLoadingPage(true);
		setMorePokemonsLoading(true);
		setPaginationParams((prevState: any) => {
			return { offSet: prevState.offSet + 12, limit: prevState.limit };
		});
	};

	return (
		<div className="btnContainer">
			<button className="btnGetMore" disabled={loadingPage} onClick={nextPagination}>
				<p>{loadingPage ? "loading..." : "More Pokemons"}</p>
			</button>
		</div>
	);
}

export default BtnMorePokemons;
