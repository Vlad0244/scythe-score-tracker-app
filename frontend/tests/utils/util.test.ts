import { isOem, calculateTotalPoints } from '../../src/utils/util';
import { GameInterface, GameViewInterface } from '../../src/utils/interfaces';


describe('isOem function', () => {
    test('returns true when all properties are falsy', () => {
        const game: GameInterface = {
            game_id: 1,
            airships: false,
            tesla: false,
            fenris_or_vesna: false,
            modular_board: false,
        };

        const result = isOem(game);

        expect(result).toBeTruthy();
    });

    test('returns false when at least one property is truthy', () => {
        const game: GameInterface = {
            game_id: 1,
            airships: false,
            tesla: false,
            fenris_or_vesna: true,
            modular_board: false,
        };

        const result = isOem(game);

        expect(result).toBeFalsy();
    });
});

describe('calculateTotalPoints function', () => {
    test('calculates total points correctly', () => {
        const gameView: GameViewInterface = {
            player_id: 1,
            name: 'Player 1',
            session_list_id: 1,
            game_id: 1,
            airships: false,
            tesla: false,
            fenris_or_vesna: false,
            modular_board: false,
            faction: false,
            mat: 'Mat 1',
            popularity_bracket: 2,
            currency: 10,
            star_count: 5,
            land_count: 3,
            total_resources_count: 15,
            bonus_points: 8,
        };

        const result = calculateTotalPoints(gameView);

        //10 currency
        // +
        // 5 * (3+2) stars * (points + pop brack.)
        // +
        // 3 * (2+2) land * (points + pop brack.)
        // +
        // floor(15/2) = 7 * (1 + 2) resources * (points + pop brack.)
        // + 8
        const expected = 76;

        expect(result).toEqual(expected);
    });
});