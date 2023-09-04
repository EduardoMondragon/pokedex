import { useEffect, useState } from "react";
import useHttpCaller from "../../hooks/useHttpCaller";
import { IPokemon } from "../../interfaces/pokemon";
import getRandomColor from "../../helpers/randomColor";

const PokemonWrapperLogic = () => {
	// ALL STATES RELATED WITH SEARCH, LIST AND BTN MORE POKEMONS COMPONENTS
	const [list, setList] = useState<IPokemon[]>([]);
	const [paginationParams, setPaginationParams] = useState({ offSet: 0, limit: 12 });
	const [loadingPage, setLoadingPage] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [searchingPokemonResponse, setSearchingPokemonResponse] = useState<IPokemon | {}>({});
	const [morePokemonsLoading, setMorePokemonsLoading] = useState<boolean>(false);
	const [randomColors, setRandomColors] = useState<{ [id: number]: string }>({});

	// AUTO CALL CUSTOMHOOK TO FETCH THE FIRST GROUP OF POKEMONS
	const { responseData, loading, error } = useHttpCaller({
		url: "http://localhost:8000/pokedex/getPokemons",
		method: "POST",
		data: paginationParams,
	});

	// HANDLE STATES WITH THE RECIEVED PARAMS FROM CUSTOMHOOK useHttpCaller()
	useEffect(() => {
		if (loading) setLoadingPage(loading);
		if (error) setErrorMessage(error.message);
		if (!list.includes(responseData?.data[0]) && responseData !== null) {
			assignRandomColors(responseData.data);
			setList((prevState: Array<any>) => [...prevState, ...responseData.data]);
			setLoadingPage(false);
			setMorePokemonsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		responseData,
		loading,
		error,
		loadingPage,
		morePokemonsLoading,
		searchingPokemonResponse,
		errorMessage,
	]);

	// ASSIGN A RANDOM COLOR FOR EACH POKEMON FOUND AND SAVE IN COLORS DICTIONARY
	const assignRandomColors = (data: IPokemon[]) => {
		const colors: { [id: number]: string } = {};
		data.forEach((item: IPokemon) => {
			colors[item.id] = getRandomColor();
		});
		setRandomColors((prev) => ({ ...prev, ...colors }));
	};

	// AVAILABLE STATES
	return {
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
	};
};

export default PokemonWrapperLogic;
