import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
// import useHttpCaller from "../../../hooks/useHttpCaller";

interface Pokemon {
	id: number;
	name: string;
	imageURL: string;
}

function PokemonListLogic() {
	const [list, setList] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null | any>(null);
	const [paginationParams, setPaginationParams] = useState({
		offSet: 0,
		limit: 12,
	});

	// const { responseData, loading, error } = useHttpCaller({
	// 	url: "http://localhost:8000/pokedex/getPokemons",
	// 	method: "POST",
	// 	data: paginationParams,
	// });

	useEffect(() => {
		console.log("EJECUTANDO LOGIC FILE");
		console.log("LOGIC RESPONSE DATA IF");
		callApi();
	}, []);

	const callApi = async () => {
		try {
			const response = await axios({
				method: "POST",
				url: "http://localhost:8000/pokedex/getPokemons",
				data: paginationParams,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});
			console.log(response.data);
		} catch (error: any) {
			setError(error);
		}
	};

	return { list, loading, error, setPaginationParams };
}

export default PokemonListLogic;
