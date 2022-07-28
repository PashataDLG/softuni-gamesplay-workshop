import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';


import * as gameService from '../src/services/gameService';
import { AuthContext } from './contexts/authContext';
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
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();

    const userLogin = (authData) => {
        setAuth(authData);
    }

    const addComment = (gameId, comment) => {
        setGames(state => {
            const game = state.find(games => games._id === gameId);

            const comments = game.comments || [];
            comments.push(comment)

            return [
                ...state.filter(games => games._id !== gameId),
                { ...game, comments }
            ]
        });

        navigate(`/details/${gameId}`);
    };

    const addGameHandler = (gameData) => {
        setGames(state => [
            ...state,
            {
                ...gameData,
                _id: uniqid(),
            }
        ]);

        navigate('/catalog');
    };

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

    return (
        <AuthContext.Provider value={{user: auth, userLogin}}>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home games={games} />} />
                        <Route path="/catalog" element={<Catalog games={games} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/create" element={<Create addGameHandler={addGameHandler} />} />
                        <Route path="/edit" element={<Edit />} />
                        <Route path="/details/:gameId" element={<Details games={games} addComment={addComment} />} />
                    </Routes>
                </main>

            </div>
        </AuthContext.Provider>

    );
}

export default App;
