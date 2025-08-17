
import './content.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import Flashcard from './Flashcard'

const Content = () => {
 
    const { user } = useContext(AuthContext);


    return (
        <div className='content'>
            {/* Flashcard */}

            {user ? (
                user.decks.map((deck) => (
                    <Flashcard title={deck.title} key={deck._id} id={deck._id} />
                ))//implicit return ()
            ) : (
                <p>Loading...</p>
            )}

        </div>
    )
}
export default Content;