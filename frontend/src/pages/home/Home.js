
import './home.css'
import Content from '../../components/content/Content'

import { Link, useLocation } from 'react-router-dom';


const Home = () => {
  const location = useLocation(); //  use React Router's location
    return (
      <div className="home-container">
        <div className='heading'>
          <h3 >Your Deck Of Cards</h3>
          <Link to="/generateDeck"><button className='btn btn-primary'>generate</button></Link>
        </div>
        <Content key={location.key} />
      </div>     
        
    )
}
export default Home;