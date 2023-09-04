import React, { useState } from "react";
import "./styles.css";
// import useHttpCaller from "../../../hooks/useHttpCaller";
// import { IDataSearchPokemon } from "../../../interfaces/pokemon";

function PokemonSearch({
	loadingPage,
	setLoadingPage,
	setErrorMessage,
	setSearchingPokemonResponse,
}: any) {
	const [pokemonName, setPokemonName] = useState("");

	const handleInputOnchange = (value: string) => {
		setPokemonName(value);
	};

	const handleOnClickSearchPokemon = () => {
		setLoadingPage(true);
		setTimeout(() => {
			setLoadingPage(false);
		}, 5000);
	};

	return (
		<div className="searchContainer">
			<div className="inputcontainer">
				<input
					className="customInput"
					type="text"
					placeholder="Search pokemon by name..."
					onChange={(e) => handleInputOnchange(e.target.value)}
				/>
			</div>
			<div className="btnContainerSearch">
				<button disabled={loadingPage || pokemonName === ""} onClick={handleOnClickSearchPokemon}>
					Go and find it!
				</button>
			</div>
		</div>
	);
}

export default PokemonSearch;
