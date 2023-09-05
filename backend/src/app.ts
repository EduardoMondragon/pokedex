import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); //for env variables in case to require
import requestApiLimiter from "./services/requestApiRateLimitService"; // block many request in a row
// imported routes
import appRoutes from "./routes/appRoutes";
import corsConfig from "./config/cors.config";

const app: Application = express();
// Middleware to transform req.body in json format
app.use(express.json());
// Middleware allow and check URL-encoded requests
app.use(express.urlencoded({ extended: true }));
// Cors will allow access for selected domains to use the endpoints
app.use(cors(corsConfig));
// apply midleware to rate and limited API calls  100 requests per 15 minutes or less
app.use(requestApiLimiter.commonAPILimiter);
// use app routes
app.use(appRoutes);

export default app;
