import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as gameService from '../src/services/gameService';
import { AuthContext } from './contexts/authContext';
import { GameContext } from './contexts/gameContext';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';

import { useLocalStorage } from './hooks/useLocalStorage';

import './App.css';

function App() {
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    const userLogin = (authData) => {
        setAuth(authData);
    }

    const userLogout = () => {
        setAuth({});
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

    const gameAdd = (gameData) => {
        setGames(state => [
            ...state,
            gameData
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
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div id="box">
                <Header />
                <GameContext.Provider value={{ games, gameAdd }}>
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/create" element={<Create />} />
                            <Route path="/edit/:gameId" element={<Edit />} />
                            <Route path="/details/:gameId" element={<Details addComment={addComment} />} />
                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </main>
                </GameContext.Provider>

            </div>
        </AuthContext.Provider>

    );
}

export default App;
