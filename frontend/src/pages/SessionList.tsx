import {useEffect, useState} from "react";
import Session from "../components/Session";
import {SessionListInterface} from "../util/interfaces";

interface GmProps {
    gmId: number;
}
function SessionList({gmId}: GmProps) {

    const [sessionListData, setSessionListData] = useState<SessionListInterface[]>([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/gmSessions/${gmId}`)
            .then((res) => res.json())
            .then((response) => setSessionListData(response))
            .catch((error) => console.error('Error fetching sessions list', error));
    }, [gmId]);


    return (
        <>
            <br></br><hr></hr>
            <div>
                THIS IS SessionList.tsx
                {
                    sessionListData.map(
                        (sessionlist, key) => (
                            <div key={key}>
                                Game List ID: {sessionlist.session_list_id}
                                <p>Session Name: {sessionlist.name}</p>
                                <Session sessionId={sessionlist.session_list_id}/>
                            </div>
                        )
                    )
                }
            </div>
            <div>

            </div>
        </>
    )

}

export default SessionList;