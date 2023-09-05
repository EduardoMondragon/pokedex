import { useEffect, useState } from "react";
import "./styles.css";

const Header = () => {
	const [currentUuid, setCurrentUuid] = useState("");
	useEffect(() => {
		setCurrentUuid(window.localStorage.getItem("pokeUuid") || "");
	}, []);

	return (
		<div className="headerContainer">
			<p>
				uuid :<span className="myUuid">{currentUuid}</span>
			</p>
		</div>
	);
};

export default Header;
