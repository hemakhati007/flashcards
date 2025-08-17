

import  { useContext,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import './leftbar.css'
import userProfile from "../../assets/images/userProfile.jpeg";
import { useNavigate } from "react-router-dom";

const Leftbar = () => {

    
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null) {
            navigate("/login");
        }
    }, [user, navigate]);
    


  
    return (
        <>
            <div className='leftbar'>
                <div className="left-container">
                    <div className="menu">       
                        {user? (
                         <Link to={`/profile/${user._id}`}>
                            <div className="user">
                                <img src={userProfile} alt="userProfile" />
                                <h6>{user.name}</h6>
                                <h6>{user.email}</h6>
                            </div>
                        </Link> 
                        ) : (
                                <p>Loading...</p>
                        )}
                    </div>
                    <hr />
                    <div className='content-list'>

                        <h5>Your Flashcards</h5>
                        <hr />
                      
                        {/* js */}
                        {user?.decks && user.decks.length > 0 ? (
                            user.decks.map((deck) => (
                                <Link key={deck._id} to={`/deck/${deck._id}`}>
                                    <div className="deck-item">
                                        <h6>{deck.title}</h6>
                                        <hr />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No flashcards yet.</p>
                        )}

                    </div>
                </div>
                
           </div>
        </>
    )
}
export default Leftbar;