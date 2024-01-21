import {useEffect, useState} from "react";
import {GameViewInterface} from "../utils/interfaces";
import {calculateTotalPoints} from "../utils/util";
interface PlayerListProps {
    gameId: number;
}

// Uses destructuring for sessionId
function PlayerList({gameId}: PlayerListProps) {
    // Game Information

    const [gameData, setGameData] = useState<GameViewInterface[]>([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/playerList/${gameId}`)
            .then((res) => res.json())
            .then((response) => setGameData(response))
            .catch((error) => console.error('Error fetching game data:', error));
    }, [gameId]);

    // TO DO sort the players by score
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:w-3/5 gap-0.5 text-dark_green font-extrabold overflow-x-auto">

            {
                gameData.map(
                    (game_data, key) => (
                            <div key={key} className="grid bg-dark_green border p-0.5 rounded-md shadow-md grid-cols-2">
                                <div>
                                    <div className="bg-gray_green p-1 m-0.5">Player Name</div>
                                    <div className="bg-gray_green p-1 m-0.5">Faction</div>
                                    <div className="bg-gray_green p-1 m-0.5">Mat</div>
                                    <div className="bg-gray_green p-1 m-0.5">Total Points</div>
                                </div>
                                <div>
                                    <div className="bg-gray_green p-1 m-0.5">{game_data.name}</div>
                                    <div className="bg-gray_green p-1 m-0.5">{game_data.faction}</div>
                                    <div className="bg-gray_green p-1 m-0.5">{game_data.mat}</div>
                                    <div className="bg-gray_green p-1 m-0.5">{calculateTotalPoints(game_data)}</div>
                                </div>
                            </div>
                    )
                )
            }
        </div>
    )
}

export default PlayerList;