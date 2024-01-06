import {useEffect, useState} from "react";
import {GameViewInterface} from "../util/interfaces";
import {calculateTotalPoints} from "../util/util";
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
    return(
        <div>
            {
                gameData.map(

                    (gamedata, key) => (
                        <div key={key}>
                            <p>{gamedata.name}</p>
                            <p>{gamedata.faction}</p>
                            <p>{gamedata.mat}</p>
                            <p>Total Points: {calculateTotalPoints(gamedata)}</p>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default PlayerList;