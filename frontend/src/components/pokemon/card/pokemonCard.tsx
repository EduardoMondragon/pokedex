import { IPokemon } from "../../../interfaces/pokemon";
import "./styles.css";
import noFav from "../../../assets/noFav.png";
import fav from "../../../assets/fav.png";
import axios from "axios";

function PokemonCard({
	pokemon,
	randomColor,
	favorites,
	setFavorites,
}: {
	pokemon: IPokemon;
	randomColor: string;
	favorites: any;
	setFavorites: any;
}) {
	const uuid = window.localStorage.getItem("pokeUuid") || "";
	const handleFavorite = async (id: number) => {
		if (favorites[id]) {
			let newFav = { ...favorites };
			delete newFav[id];
			setFavorites(newFav);
		} else {
			setFavorites((prevState: object) => ({ ...prevState, [id]: true }));
		}

		const data = new URLSearchParams({ uuid, pokemonId: id.toString() });
		const headers = { "Content-Type": "application/x-www-form-urlencoded" };
		await axios.post("http://localhost:8000/pokedex/addPokemonToFavorites", data, {
			headers,
		});
	};

	const { id, name, imageURL } = pokemon;
	return (
		<div className="item" key={id}>
			<div className="cardContainer" style={{ backgroundColor: randomColor }}>
				<div className="imgContainer">
					<div className="favContainer">
						<img
							src={favorites[id] ? fav : noFav}
							alt="favorite pokemon"
							onClick={() => {
								handleFavorite(id);
							}}
						/>
					</div>
					<div className="img" style={{ backgroundImage: `url('${imageURL}')` }}></div>
				</div>
				<div className="name">
					<p>{name}</p>
				</div>
			</div>
		</div>
	);
}

export default PokemonCard;
