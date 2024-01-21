import React, {useEffect, useState} from 'react';
import {GameViewInterface} from "../utils/interfaces";
import {calculateTotalPoints} from "../utils/util";

interface PlayerProps {
    gameId: number;
    playerId: number;
}

function PlayerScore({gameId, playerId}: PlayerProps) {
    const [playerScoreData, setPlayerScoreData] = useState<GameViewInterface[]>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/player/${gameId}/${playerId}`)
            .then((res)=> res.json())
            .then((response) => setPlayerScoreData(response))
            .catch((error) => console.error('Error fetching player data:', error));
    }, [gameId, playerId]);
    return (
            <tbody>

            {
                playerScoreData.map(
                    pscore => (
                        <tr key={pscore.player_id}>
                            <td>{pscore.name}</td>
                            <td>{pscore.faction}</td>
                            <td>{pscore.mat}</td>
                            <td>{pscore.popularity_bracket + 1}</td>
                            <td>{pscore.star_count}</td>
                            <td>{pscore.currency}</td>
                            <td>{pscore.land_count}</td>
                            <td>{pscore.total_resources_count}</td>
                            <td>{pscore.bonus_points}</td>
                            <td>{calculateTotalPoints(pscore)}</td>
                        </tr>
                    )
                )
            }
            </tbody>
    );
}

export default PlayerScore;