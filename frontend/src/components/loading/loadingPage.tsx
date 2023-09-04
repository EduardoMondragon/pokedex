import "./styles.css";
import loadingGif from "../../assets/loading.gif";

const LoadingPage = () => {
	return (
		<div className="loadingContainer">
			<img src={loadingGif} alt="loadingGif" />
			<h3>Loading page...</h3>
		</div>
	);
};

export default LoadingPage;
