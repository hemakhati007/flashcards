

import { Outlet ,BrowserRouter as Router, Routes, Route } from "react-router-dom";


//pages....
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Home from '../home/Home';
import Profile from '../profile/Profile';

//components....
import Nav from "../../components/navbar/Nav";
import Leftbar from "../../components/leftbar/Leftbar";


const LayOut = () => {

    const Feed=() => {
        return (
            <>
                <Nav>

                </Nav>
                <main>
                    <Leftbar/>
                    <div className="container">

                        <Outlet />
                        {/* child rotes */}

                    </div>
                </main>
            </>
         )
     }
    //feed....

    return (
        <> 
            <Router>
                <Routes>
                    {/* auth routes */}
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/signup' element={<Signup />}></Route>

                    {/* feed layout routes */}
                    <Route element={<Feed />}>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/profile/:id' element={<Profile />}></Route>
                    </Route>
                   

                </Routes>
            </Router>
           
        </>
    )
}
export default LayOut;