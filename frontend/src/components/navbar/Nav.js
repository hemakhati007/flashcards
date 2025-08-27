import { Link } from "react-router-dom";


import './nav.css';

//FontAwesome Icon...
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';  // <-- import icons




//componnet
import Logout from '../logout/Logout';

const Nav = () => {
    // const navigate = useNavigate();
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     navigate(0); // 🔄 re-runs the route & all useEffects
    // };
    return (
        <nav>
            <div className="nav-container">

                <div className='nav-left'>

                    <Link to='/'>
                        <h3 className="logo">Flashcards</h3>
                    </Link>
                    <Link to='/'>
                        <img
                            src={require("../../assets/icons/logo.png")}
                            alt="Logo"
                            className="nav-icon"
                        />
                    </Link>

                </div>
               
                <div className='nav-right'>
                    
                    <Link to='/'>
                        <FontAwesomeIcon icon={faHome} size='lg' />{/* // xs, sm, lg, 2x, 3x, 4x, etc. */}
                    </Link>
                    {/* <Darkmood/> */}
                    <Logout/>
                    <Link to='/profile/id '>
                        <FontAwesomeIcon icon={faUser} size='lg' />
                    </Link>
                </div>
                
            </div>
        </nav>

        
    )
}
export default Nav;