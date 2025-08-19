
import './home.css'
import Content from '../../components/content/Content'

import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <div className="home-container">
        <div className='heading'>
          <h3 >Your Deck Of Cards</h3>
          <Link to="/generateDeck"><button className='btn btn-primary'>generate</button></Link>
        </div>
        <Content />
      </div>     
        
    )
}
export default Home;