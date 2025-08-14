
// import React from 'react'
//C:\Users\Admin\Desktop\project\Flashcards\frontend\src\components\Navbar.js
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Content from '../components/Content';
import Cards from '../components/Cards';
import Prompt from '../components/Prompt';

import '../App.css'


const Dashboard = () => {
    
    return (
        
            <div className="custom-container container-fluid">
                   {<Navbar/>}
                
            <div className="row" style={{ height: "80vh" }}> 
                 
                    <div className='col-4 col-md-3 border p-0 m-0'>
                        {<Profile/>}
                        {<Content />}
                    </div>
                 
                    <div className="col-8 col-md-9 border"> 
                        {<Cards/>}
                    </div>
                   
            </div>
            
                {<Prompt/>}
            </div>
        
    );
}
export default Dashboard;
