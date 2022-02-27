import Film from "./sw-film";
import HomeWorld from "./sw-homeworld";
import { Specie } from "./sw-specie";
import Starship from "./sw-starship";
import Vehicle from "./sw-vehicle";

export default interface MoreDetailResponse {
    homeWorld: HomeWorld;
    species?: Specie[];
    films?: Film[];
    starShips?: Starship[];
    vehicles?: Vehicle[];
}