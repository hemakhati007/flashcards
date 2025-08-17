

import { Link } from 'react-router-dom'
import './flashcard.css'

//FontAwesome Icon................./
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Flashcard = ({ id, title }) => {


    
    return (
        <div className='flashcard-deck'>
            <Link to={`/deck/${id}`}>
                <div className="content">
                    <h2>{title}</h2>
                </div>
            </Link>
            <button className='btn btn-red' /*onClick={handleDelete(deck._id)}*/>
                <span><FontAwesomeIcon icon={faTrash} /></span>
            </button>
          
          
        </div>
    );
};

export default Flashcard;