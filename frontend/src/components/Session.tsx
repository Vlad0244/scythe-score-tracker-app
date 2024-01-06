import {ReactElement, useEffect, useMemo, useState} from "react";
import PlayerList from "./PlayerList";
import {GameInterface} from "../util/interfaces";
import {isOem} from "../util/util";
import {Link} from "react-router-dom";
interface SessionProps {
     sessionId: number;
 }

// Uses destructuring for sessionId
 function Session({sessionId}: SessionProps) {

    const [gameData, setGameData] = useState<GameInterface[]>([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/sessionsList/${sessionId}`)
            .then((res) => res.json())
            .then((response) => setGameData(response))
            .catch((error) => console.error('Error fetching data:', error));
    }, [sessionId]);

    const determineGameState = useMemo((): ReactElement[] => {
        if (!gameData.length) return [];
        return gameData.map(game =>
            <Link to={`/game/${game.game_id}`} key={game.game_id}>
                <div className="border-black" >
                    <br></br>
                    <hr></hr>
                    {isOem(game) ? <div><p>THIS IS GAME ID:{game.game_id}</p><p>OEM</p></div> : <div>
                        <p>THIS IS GAME ID:{game.game_id}</p>
                        <p>Airships: {game.airships.toString()}</p>
                        <p>Mad Tesla: {game.tesla.toString()}</p>
                        <p>Fenris Or Vesna in Game: {game.fenris_or_vesna.toString()}</p>
                        <p>Modular Board: {game.modular_board.toString()}</p>
                    </div>}
                    <PlayerList gameId={game.game_id}/>
                </div>
            </Link>
        )
    }, [gameData])

     return (
         <div>
             <br></br>
             <hr></hr>
             THIS IS Session.tsx
             {determineGameState}
         </div>
     )
 }

export default Session;