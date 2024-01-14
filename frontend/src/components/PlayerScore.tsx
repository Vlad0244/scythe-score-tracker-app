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
        <div>
            {
                playerScoreData.map(
                    pscore => (
                        <div key={pscore.player_id}>
                            <p className="font-extrabold text-2xl">Name: {pscore.name}</p>
                            <p>Faction: {pscore.faction}</p>
                            <p>Player Mat: {pscore.mat}</p>
                            <p className="font-bold">Total Points: {calculateTotalPoints(pscore)}</p>
                            <p>pop bracket: {pscore.popularity_bracket + 1}</p>
                            <p>stars: {pscore.star_count}</p>
                            <p>coins: {pscore.currency}</p>
                            <p>land: {pscore.land_count}</p>
                            <p>resources: {pscore.total_resources_count}</p>
                            <p>bonus points: {pscore.bonus_points}</p>
                        </div>
                    )
                )
            }
        </div>
    );
}

export default PlayerScore;