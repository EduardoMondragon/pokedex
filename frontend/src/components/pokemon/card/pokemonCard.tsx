import React from "react";
import { IPokemon } from "../../../interfaces/pokemon";
import "./styles.css";
import noFav from "../../../assets/noFav.png";
import fav from "../../../assets/fav.png";

function PokemonCard({ pokemon, randomColor }: { pokemon: IPokemon; randomColor: string }) {
	const { id, name, imageURL } = pokemon;
	return (
		<div className="item" key={id}>
			<div className="cardContainer" style={{ backgroundColor: randomColor }}>
				<div className="imgContainer">
					<div className="favContainer">
						<img src={false ? fav : noFav} alt="favorite pokemon" />
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
