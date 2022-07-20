import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';


import * as gameService from '../src/services/gameService';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';

import './App.css';

function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

    return (
        <div id="box">
            <Header />

            {/* Main Content */}
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home games={games} />} />
                    <Route path="/catalog" element={<Catalog games={games} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/details/:gameId" element={<Details games={games} />} />
                </Routes>
            </main>

            {/* Edit Page ( Only for the creator )*/}

        </div>

    );
}

export default App;
