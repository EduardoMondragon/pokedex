import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import requestApiLimiter from "./services/requestApiRateLimitService";
// imported routes
import appRoutes from "./routes/appRoutes";
import corsConfig from "./config/cors.config";

const app: Application = express();
// Middleware que transforma req.body en json
app.use(express.json());
// Middleware para analizar solicitudes URL-encoded
app.use(express.urlencoded({ extended: true }));
// Cors will allow access for selected domains to use the endpoints
app.use(cors(corsConfig));
// apply midleware to rate and limited API calls   100 requests per 15 minutes
app.use(requestApiLimiter.commonAPILimiter);
// use app routes
app.use(appRoutes);

export default app;
