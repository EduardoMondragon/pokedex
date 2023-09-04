import express from "express";
import authRoutes from "./authRoutes";
import pokemonRoutes from "./pokemonRoutes";

const router = express.Router();

// All app routes
router.use("/auth", authRoutes);
router.use("/pokedex", pokemonRoutes);

export default router;
