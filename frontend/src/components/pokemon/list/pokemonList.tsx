import React, { useEffect, useState } from "react";
import useHttpCaller from "../../../hooks/useHttpCaller";
import PokemonCard from "../card/pokemonCard";
import "./styles.css";
import { IPokemon } from "../../../interfaces/pokemon";
import getRandomColor from "../../../herlpers/randomColor";

function PokemonList({ list, setList, setError, setLoading, paginationParams }: any) {
	const [randomColors, setRandomColors] = useState<{ [id: number]: string }>({});
	const { responseData, loading, error } = useHttpCaller({
		url: "http://localhost:8000/pokedex/getPokemons",
		method: "POST",
		data: paginationParams,
	});

	const assignRandomColors = (data: IPokemon[]) => {
		const colors: { [id: number]: string } = {};
		data.forEach((item: IPokemon) => {
			colors[item.id] = getRandomColor();
		});
		setRandomColors((prev) => ({ ...prev, ...colors }));
	};

	useEffect(() => {
		if (loading) setLoading(loading);
		if (responseData !== null) {
			assignRandomColors(responseData.data);
			setList((prevState: Array<any>) => [...prevState, ...responseData.data]);
			setLoading(false);
		}
		if (error) setError(error.message);
	}, [responseData, loading, error, setList, setLoading, setError]);

	const renderListPokemons = list?.map((pokemon: IPokemon) => (
		<PokemonCard pokemon={pokemon} key={pokemon.id} randomColor={randomColors[pokemon.id]} />
	));

	return (
		<div className="mainContainer">
			<div className="childContainer">{renderListPokemons}</div>
		</div>
	);
}

export default PokemonList;
