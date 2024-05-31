// import logo from './logo.svg';
// import './App.css';
// import Home from "./components/Home";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Settings from "./components/Settings";
// import Play from "./components/Play";
// import NotFound from "./components/NotFound";
// import Menu from "./components/Menu";
// import {useState} from "react";
// //
// // function App() {
// //     const [inputs, setInputs] = useState({});
// //
// //     return (
// //         <>
// //             <BrowserRouter>
// //                 <Routes>
// //                     <Route path="/" element={<Header/>}>
// //                         <Route index element={<Home/>}/>
// //                         {/*<Route path="/setting" element={<Settings/>}/>*/}
// //                         <Route path="/play/:data" element={<Play/>} />
// //
// //                         {/*<Route path="/play" element={<Play/>}/>*/}
// //                         {/*<Route path={"*"} element={<NotFound/>}/>*/}
// //                     </Route>
// //                 </Routes>
// //             </BrowserRouter>
// //         </>
// //     );
// // }
// //
// // export default App;
// // import React from 'react';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import Header from './Header';
// // import Home from './Home';
// // import Play from './Play';
// // import NotFound from './NotFound';

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Header/>}>
//                     <Route index element={<Home/>}/>
//                     {/*<Route path="/setting" element={<Settings/>}/>*/}
//                     <Route path="/play/:data" element={<Play/>} />
//                     {/*<Route path="/play" element={<Play/>}/>*/}
//                     {/*<Route path={"*"} element={<NotFound/>}/>*/}
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;


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
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
