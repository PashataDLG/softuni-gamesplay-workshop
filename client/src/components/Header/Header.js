import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/authContext';

const Header = () => {
    const { user } = useContext(AuthContext);

    return (<header>

        <h1>
            <Link className="home" to="/">
                GamesPlay
            </Link>
        </h1>
        <nav>
            <Link to="/catalog">All games</Link>
            
            {user.accessToken
                ? <div id="user">
                    <Link to="/create">Create Game</Link>
                    <Link to="/logout">Logout</Link>
                </div>
                : <div id="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>}

        </nav>
    </header>);
};

export default Header;