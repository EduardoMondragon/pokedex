import cors from "cors";

const corsConfig: cors.CorsOptions = {
	origin: ["http://localhost:3000"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type"],
	optionsSuccessStatus: 204,
};

export default corsConfig;
