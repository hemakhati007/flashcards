

import { Link } from 'react-router-dom'
import './flashcard.css'

//FontAwesome Icon................./
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useEffect } from 'react';
// import { application } from 'express';

const Deck = ({ id, title ,onDelete}) => {

  
    
    return (
         
        // <div className="deck-card">
            <div className='deck-card'>

                <Link to={`/deck/${id}`}>
                    <div >
                    <h3 className="title">{title}</h3>
                    </div>
                </Link>
                <button className='btn btn-primary' onClick={()=>onDelete(id)} style={{'width':'7rem'}}>
                    <span><FontAwesomeIcon icon={faTrash} /></span>
                </button>

            </div>
        //  </div>
     
    );
};

export default Deck;