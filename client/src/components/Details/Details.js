import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Details = ({ games, addComment }) => {
    const { gameId } = useParams();
    const game = games.find(x => x._id === gameId);

    const [comment, setComment] = useState({
        username: '',
        comment: '',
    });

    const addCommentHandler = (event) => {
        event.preventDefault();

        const result = `${comment.username}: ${comment.comment}`;

        addComment(gameId, result);
    };

    const onChange = (event) => {
        setComment(state => ({
            ...state,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: ${game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* list all comments for current game (If any) */}
                        <li className="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li className="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>
                    {/* Display paragraph: If there are no games in the database */}
                    <p className="no-comment">No comments.</p>
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <Link to={`/edit/${gameId}`} className="button">
                        Edit
                    </Link>
                    <a href={`/delete/${gameId}`} className="button">
                        Delete
                    </a>
                </div>
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input 
                    type="text" 
                    name="username" 
                    placeholder="John Doe"
                    onChange={onChange}
                    value={comment.username}
                    />

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
                    />

                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};

export default Details;