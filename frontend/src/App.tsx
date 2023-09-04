import React, { useEffect, useState } from "react";
import PokemonWrapper from "./components/pokemon/PokemonWrapper";
import InvalidAuth from "./components/invalidAuth";
import Loading from "./components/loading/loadingPage";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const authenticationTimeout = setTimeout(() => {
			setIsAuthenticated(true);
			setIsLoading(false);
		}, 2000);

		// Limpieza del efecto cuando el componente se desmonta
		return () => clearTimeout(authenticationTimeout);
	}, []);

	// Renderizar el componente apropiado según el estado
	return <>{isLoading ? <Loading /> : isAuthenticated ? <PokemonWrapper /> : <InvalidAuth />}</>;
}

export default App;
