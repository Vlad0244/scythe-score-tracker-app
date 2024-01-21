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
        <div className="md:w-1/2 w-full overflow-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Faction</th>
                        <th>Mat</th>
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                {
                    gameData.map(
                        (game_data, key) => (
                            <tr key={key}>
                                <td>{game_data.name}</td>
                                <td>{game_data.faction}</td>
                                <td>{game_data.mat}</td>
                                <td>{calculateTotalPoints(game_data)}</td>
                            </tr>
                    )
                )
            }
                </tbody>
            </table>
        </div>
    )
}

export default PlayerList;