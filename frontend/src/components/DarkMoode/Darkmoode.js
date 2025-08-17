 
import './darkMood.css'

//FontAwesome Icon...
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLightbulb } from '@fortawesome/free-solid-svg-icons';  // <-- import icons


const Darkmood = () => {

    const darkHandle = () => {
        document.querySelector('body').classList.toggle('darkmood');///*** */
     }

    return (
        <div className='dark-mood-icon'>    
            <FontAwesomeIcon icon={ faLightbulb} onClick={darkHandle} />

        </div>
    )
}
export default Darkmood;
 