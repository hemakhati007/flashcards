
import './content.css';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

import Deck from './Deck'

const Content = () => {
 
    const { user, loading } = useContext(AuthContext);
    const [decks, setDecks] = useState([]);
  
    useEffect(() => {
        if (!loading && user) {
            setDecks(user.decks || []);
        }
    }, [user, loading]);



    const handleDelete = async (id) => {
        console.log("hii");
        try {

            const response = await fetch(
                ` http://localhost:5000/api/users/deck/${id}/delete`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },

                },
            );
            const data = await response.json(); // ✅ parse JSON
            if (!response.ok) {
                console.log("Failed to delete:", data.message || "Unknown error");
            } else {
                console.log("Deleted:", data.message || "Deck deleted successfully");
                // ✅ remove deck from state so UI updates automatically
                setDecks(prevDecks => prevDecks.filter(deck => deck._id !== id));
            }

        } catch (err) {
            console.log("Failed:", err);
        }
    };

    if (loading) return <p>Loading...</p>;


    return (
        
        <div className='decks-container'>
            {/* Flashcard */}
            
            {decks.length > 0 ? (
                decks.map((deck) => (
                    <Deck title={deck.title} key={deck._id} id={deck._id} onDelete={handleDelete} />
                ))//implicit return ()
            ) : (
                <p className='text'>No Flashcards</p>
            )}
  
        </div>
    );
};
export default Content;