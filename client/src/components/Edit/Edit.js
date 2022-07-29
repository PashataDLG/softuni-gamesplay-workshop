import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { GameContext } from '../../contexts/gameContext';

const Edit = () => {
    const { games } = useContext(GameContext);
    const { gameId } = useParams();

    const game = games.find(x => x._id === gameId);

    const editHandler = (event) => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.target));
        console.log(formData);
    };

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={editHandler}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" defaultValue={game.title} />
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" defaultValue={game.category} />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        defaultValue={game.maxLevel}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={game.imageUrl} />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={game.summary} />
                    <input className="btn submit" type="submit" defaultValue="Edit Game" />
                </div>
            </form>
        </section>
    );
};

export default Edit; 