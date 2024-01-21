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
                        <div key={pscore.player_id} className="grid bg-dark_green border p-0.5 rounded-md shadow-md grid-cols-2">
                            <div>
                                <div className="bg-gray_green p-1 m-0.5 text-2xl">Name</div>
                                <div className="bg-gray_green p-1 m-0.5">Faction</div>
                                <div className="bg-gray_green p-1 m-0.5">Player Mat</div>
                                <div className="bg-gray_green p-1 m-0.5 text-2xl">Total Points</div>
                                <div className="bg-gray_green p-1 m-0.5">Popularity Bracket</div>
                                <div className="bg-gray_green p-1 m-0.5">Stars</div>
                                <div className="bg-gray_green p-1 m-0.5">Coins</div>
                                <div className="bg-gray_green p-1 m-0.5">Land</div>
                                <div className="bg-gray_green p-1 m-0.5">Resources</div>
                                <div className="bg-gray_green p-1 m-0.5">Bonus Points</div>
                            </div>
                            <div>
                                <div className="bg-gray_green p-1 m-0.5 text-2xl">{pscore.name}</div>
                                <div className="bg-gray_green p-1 m-0.5">{pscore.faction}</div>
                                <div className="bg-gray_green p-1 m-0.5">{pscore.mat}</div>
                                <div className="bg-gray_green p-1 m-0.5 text-2xl">{calculateTotalPoints(pscore)}</div>
                                <div className="bg-gray_green p-1 m-0.5">{pscore.popularity_bracket + 1}</div>
                                <div className="bg-gray_green p-1 m-0.5">{pscore.star_count}</div>
                                <div className="bg-gray_green p-1 m-0.5">{pscore.currency}</div>
                                <div className="bg-gray_green p-1 m-0.5">{pscore.land_count}</div>
                                <div className="bg-gray_green p-1 m-0.5">{pscore.total_resources_count}</div>
                                <div className="bg-gray_green p-1 m-0.5">{pscore.bonus_points}</div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );
}

export default PlayerScore;