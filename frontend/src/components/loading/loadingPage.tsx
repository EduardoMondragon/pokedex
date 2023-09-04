import "./styles.css";
import loadingGif from "../../assets/loading.gif";

const LoadingPage = ({ customMessage }: { customMessage: string }) => {
	return (
		<div className="loadingContainer">
			<img src={loadingGif} alt="loadingGif" />
			<h3>{customMessage ? customMessage : "Loading page..."}</h3>
		</div>
	);
};

export default LoadingPage;
