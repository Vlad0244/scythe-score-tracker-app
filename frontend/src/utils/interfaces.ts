export interface GmInterface {
    gm_id: number;
    name: string;
    password: string;
}

export interface SessionListInterface {
    session_list_id: number;
    name: string;
    gm_id: number;
}

export interface GameInterface {
    game_id: number;
    airships: boolean;
    tesla: boolean;
    fenris_or_vesna: boolean;
    modular_board: boolean;
}

export interface GameViewInterface {
    player_id: number;
    name: string;
    session_list_id: number;
    game_id: number;
    airships: boolean;
    tesla: boolean;
    fenris_or_vesna: boolean;
    modular_board: boolean;
    faction: boolean;
    mat: string;
    popularity_bracket: number;
    currency: number;
    star_count: number;
    land_count: number;
    total_resources_count: number;
    bonus_points: number;
}

