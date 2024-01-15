import React, {useEffect, useState} from "react";
import SessionList from "./SessionList";
import {GmInterface} from "../utils/interfaces";


function Main() {
    //
    const [gmData, setGmData] = useState<GmInterface[]>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/gm/${1}`)
            .then((res) => res.json())
            .then((response) => setGmData(response))
            .catch((error) => console.error('Error fetching gm data:', error));
    }, []);


    return (

        <div className="bg-light_gray_green text-green_black">
            THIS IS GM INFORMATION
            {
                gmData.map(
                    gm => (
                        <div key={gm.gm_id}>
                            <hr></hr>
                            <p>GM ID: {gm.gm_id}</p>
                            <p>Welcome User: {gm.name}</p>
                            <p>GM Password: {gm.password}</p>
                            <SessionList gmId={gm.gm_id} />
                        </div>
                    )
                )
            }

        </div>
    );
}

export default Main;