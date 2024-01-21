import './App.css';
import Main from "./pages/Main";
import {Route, Routes} from "react-router-dom";
import Game from "./pages/Game";

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/game/:id" element={<Game/>}/>
            </Routes>
        </div>
    );
}

export default App;
