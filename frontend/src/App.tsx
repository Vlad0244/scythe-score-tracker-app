import './App.css';
import Main from "./pages/Main";
import {Route, Routes} from "react-router-dom";
import Game from "./pages/Game";

function App() {

    return (
        <div className="bg-light_gray_green text-green_black">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/game/:id" element={<Game/>}/>
            </Routes>
        </div>
    );
}

export default App;
