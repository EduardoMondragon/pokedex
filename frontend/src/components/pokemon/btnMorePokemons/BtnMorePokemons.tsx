import "./styles.css";

function BtnMorePokemons({ setPaginationParams, loading, setLoading }: any) {
	const nextPagination = () => {
		setLoading(true);
		setPaginationParams((prevState: any) => {
			return { offSet: prevState.offSet + 12, limit: prevState.limit };
		});
	};

	return (
		<div className="btnContainer">
			<button className="btnSearch" disabled={loading} onClick={nextPagination}>
				<p>More Pokemons</p>
			</button>
		</div>
	);
}

export default BtnMorePokemons;
