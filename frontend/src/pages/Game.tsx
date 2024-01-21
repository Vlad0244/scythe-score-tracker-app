import React, {useEffect, useState} from 'react';
import {GameTableAndGameViewInterface, GameViewInterface} from "../utils/interfaces";
import PlayerScore from "../components/PlayerScore";
import {useParams} from "react-router-dom";

function Game() {
    const { id } = useParams()
    const [gameData, setGameData] = useState<GameTableAndGameViewInterface | null>(null);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/game/${id}`)
            .then((res) => res.json())
            .then((response) => setGameData(response))
            .catch((error) => console.error('Error fetching game data:', error));
    }, [id]);

    if (!gameData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen">
            <p>THIS IS GAME ID:{gameData.game_info.game_id}</p>
            <p>Airships: {gameData.game_info.airships.toString()}</p>
            <p>Mad Tesla: {gameData.game_info.tesla.toString()}</p>
            <p>Fenris Or Vesna in Game: {gameData.game_info.fenris_or_vesna.toString()}</p>
            <p>Modular Board: {gameData.game_info.modular_board.toString()}</p>
            <div className="w-full overflow-auto">
                <table className="table table-sm table-pin-cols">
                    <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Faction</th>
                        <th>Player Mat</th>
                        <th>Pop. Bracket</th>
                        <th>Stars</th>
                        <th>Coins</th>
                        <th>Land</th>
                        <th>Resources</th>
                        <th>Bonus Points</th>
                        <th>Total Points</th>
                    </tr>
                    </thead>
                    {
                        gameData.game_view_info.map(
                            game => (
                                <PlayerScore gameId={game.game_id} playerId={game.player_id} key={game.player_id}/>
                            )
                        )
                    }
                </table>
            </div>
        </div>
);
}

export default Game;