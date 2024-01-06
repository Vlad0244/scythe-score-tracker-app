import {GameInterface, GameViewInterface} from "./interfaces";

export const isOem = ({airships, tesla, fenris_or_vesna, modular_board}: GameInterface) => {
    return !airships && !tesla && !fenris_or_vesna && !modular_board
}

export const calculateTotalPoints = ({popularity_bracket, currency, star_count, land_count, total_resources_count, bonus_points}: GameViewInterface) => {
    const starPoints = star_count * (3 + popularity_bracket);
    const landPoints = land_count * (2 + popularity_bracket);
    const resourcesPoints = Math.floor(total_resources_count / 2) * (1 + popularity_bracket);
    return starPoints + landPoints + resourcesPoints + currency + bonus_points;
}