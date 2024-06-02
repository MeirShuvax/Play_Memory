

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import Play from "./components/Play";
import NotFound from "./components/NotFound";
import Leaderboard from './components/Leaderboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<Home />} />
                    <Route path="/play/:data/:gameData" element={<Play />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
