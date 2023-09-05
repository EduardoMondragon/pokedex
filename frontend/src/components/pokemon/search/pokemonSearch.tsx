import React, { useState } from "react";
import "./styles.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from "axios";

function PokemonSearch({
	loadingPage,
	setLoadingPage,
	setErrorMessage,
	setSearchingPokemonResponse,
}: any) {
	const [pokemonName, setPokemonName] = useState("");

	/**
	 * will change the state variable everytime user types in the keyboard
	 * @param value input value
	 */
	const handleInputOnchange = (value: string) => {
		setPokemonName(value);
	};

	/**
	 * Action to go and search a pokemon in the server
	 */
	const handleOnClickSearchPokemon = async () => {
		try {
			setLoadingPage(true);

			const data = new URLSearchParams({ pokemonName });
			const headers = { "Content-Type": "application/x-www-form-urlencoded" };
			// search in server and try to fetch from db otherwise from api
			const response: any = await axios.post("http://localhost:8000/pokedex/findOne", data, {
				headers,
			});

			if (response?.data?.ok) {
				setSearchingPokemonResponse(response.data.pokemon);
				setPokemonName("");
			}
		} catch (error: AxiosError | any) {
			if (error.response.status === 404) {
				setSearchingPokemonResponse(404);
			} else {
				setErrorMessage(error.message);
			}
		} finally {
			setLoadingPage(false);
		}
	};

	// Component return statement
	return (
		<div className="searchContainer">
			<div className="inputcontainer">
				<input
					value={pokemonName}
					className="customInput"
					type="text"
					placeholder="Search pokemon by name..."
					onChange={(e) => handleInputOnchange(e.target.value)}
				/>
			</div>
			<div className="btnContainerSearch">
				<button
					disabled={loadingPage || pokemonName.trim() === ""}
					onClick={handleOnClickSearchPokemon}
				>
					Go and find it!
				</button>
			</div>
		</div>
	);
}

export default PokemonSearch;
