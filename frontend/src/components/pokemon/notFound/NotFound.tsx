import notFoundImg from "../../../assets/notFound.png";
import "./styles.css";

const NotFound = ({ setSearchingPokemonResponse }: any) => {
	return (
		<div className="notFoundContainer">
			<img src={notFoundImg} alt="Not Found" />
			<h1>Pokemon Not Found</h1>
			<p onClick={() => setSearchingPokemonResponse({})}>Restore list</p>
		</div>
	);
};

export default NotFound;
