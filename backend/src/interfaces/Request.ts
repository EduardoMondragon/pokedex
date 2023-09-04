import { Request } from "express";
import { IPokemon } from "./pokemon";

export interface customRequest extends Request {
  paginatedPokemonList?: IPokemon[];
  uuid?: string;
}
