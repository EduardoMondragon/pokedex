import app from "./app";
import "colors";

function startApp() {
	app.listen(8000, (): void => {
		console.log("server running here: http://localhost:8000".green);
	});
}

startApp();
