import React, {useEffect, useState} from 'react';
import {GameViewInterface} from "../utils/interfaces";
import PlayerScore from "../components/PlayerScore";
import {useParams} from "react-router-dom";

function Game() {
    const { id } = useParams()
    const [gameData, setGameData] = useState<GameViewInterface[]>([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/game/${id}`)
            .then((res) => res.json())
            .then((response) => setGameData(response))
            .catch((error) => console.error('Error fetching game data:', error));
    }, [id]);

    if (!gameData || gameData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div >
            <p>THIS IS GAME ID:{gameData[0].game_id}</p>
            <p>Airships: {gameData[0].airships.toString()}</p>
            <p>Mad Tesla: {gameData[0].tesla.toString()}</p>
            <p>Fenris Or Vesna in Game: {gameData[0].fenris_or_vesna.toString()}</p>
            <p>Modular Board: {gameData[0].modular_board.toString()}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 md:w-3/5 gap-0.5 text-dark_green font-extrabold overflow-x-auto">
            {
                gameData.map(
                    game => (
                        <div key={game.player_id}>
                            <PlayerScore gameId={game.game_id} playerId={game.player_id}/>
                        </div>
                    )
                )
            }
            </div>
        </div>
    );
}

export default Game;