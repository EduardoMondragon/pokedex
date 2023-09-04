import express from "express";
import pokemonController from "../controllers/pokemonController";

const router = express.Router();

router.post("/getPokemons", pokemonController.getPokemons);
router.post("/findOne", pokemonController.findOnePokemon);
router.post("/addPokemonToFavorites", pokemonController.addPokemonToFavorites);

export default router;
