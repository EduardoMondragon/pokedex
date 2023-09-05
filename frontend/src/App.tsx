import React, { useEffect, useState } from "react";
import PokemonWrapper from "./components/pokemon/PokemonWrapper";
import Loading from "./components/loading/loadingPage";
import uuid from "./helpers/uuidCreator";
import axios from "axios";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// VERIFY UUID
		async function checkUser() {
			try {
				const currentUuid = uuid.fetchExistingUuid() || uuid.createUuidRandomdly();
				const data = new URLSearchParams({ uuid: currentUuid || "" });
				const headers = { "Content-Type": "application/x-www-form-urlencoded" };
				const response = await axios.post("http://localhost:8000/auth/login", data, { headers });

				if (response?.data?.ok) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
					uuid.removeUuid();
				}
			} catch (error) {
				console.error("Error:", error);
				setIsAuthenticated(false);
				uuid.removeUuid();
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 1500);
			}
		}

		checkUser();
	}, []);

	return (
		<>
			{isLoading ? (
				<Loading customMessage="Authenticating UUID..." />
			) : isAuthenticated ? (
				<PokemonWrapper />
			) : (
				<h2>No Authenticated</h2>
			)}
		</>
	);
}

export default App;
