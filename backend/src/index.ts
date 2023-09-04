import app from "./app";
import "colors";

const PORT = process.env.PORT;

function startApp() {
  app.listen(PORT, (): void => {
    console.log(`server running here: http://localhost:${PORT}`.green);
  });
}

startApp();
