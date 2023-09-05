import PokemonCard from "../card/pokemonCard";
import "./styles.css";
import { IPokemon } from "../../../interfaces/pokemon";
import getRandomColor from "../../../helpers/randomColor";

function PokemonList({
	list,
	randomColors,
	searchingPokemonResponse,
	favorites,
	setFavorites,
}: any) {
	// render if list has something

	const listSelector: Array<IPokemon> =
		searchingPokemonResponse && Object.keys(searchingPokemonResponse).length > 0
			? [searchingPokemonResponse]
			: list;

	const renderListPokemons = listSelector?.map((pokemon: IPokemon) => (
		<PokemonCard
			pokemon={pokemon}
			key={pokemon.id}
			randomColor={listSelector.length === 1 ? getRandomColor() : randomColors[pokemon.id]}
			favorites={favorites}
			setFavorites={setFavorites}
		/>
	));

	return (
		<div className="mainContainer">
			<div className="childContainer">{renderListPokemons}</div>
		</div>
	);
}

export default PokemonList;
