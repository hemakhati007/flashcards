

import  { useContext,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import './leftbar.css'
import userProfile from "../../assets/images/userProfile.jpeg";
import { useNavigate } from "react-router-dom";

const Leftbar = () => {

     
    const { user,loading } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!loading) {   // wait until context finished fetching
            if (user === null) {
                console.log('declined ');
                navigate("/login");
            }
        }
       
    }, [user, navigate, loading]);
    if (loading) return <p>Loading...</p>;
    


  
    return (
        
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
           
                <div style={{ 'background':'white','marginTop':'10px'} }><h5 className="Heading">Your Flashcards</h5></div> 
                    <div className='content-list'>

                        
                     
                      
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
        
    )
}
export default Leftbar;