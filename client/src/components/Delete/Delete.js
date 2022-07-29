import { useParams, useNavigate } from "react-router-dom";

import * as gameService from '../../services/gameService';

export const Delete = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();

    if(window.confirm('Are you sure you want to delete this game?')){
        gameService.deleteGame(gameId)
            .then(() => {
                navigate('/catalog');
            })
    } else {
        navigate(`/details/${gameId}`);
        return;
    }

};

export default Delete;