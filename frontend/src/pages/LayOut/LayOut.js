

import { Outlet ,BrowserRouter as Router, Routes, Route } from "react-router-dom";


//pages....
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Home from '../home/Home';
import Profile from '../profile/Profile';
import DeckViewer from "../Deck/Deckviewer";

//components....
import Nav from "../../components/navbar/Nav";
import Leftbar from "../../components/leftbar/Leftbar";
import GenerateDeck from "../../components/generateDeck/GenerateDeck";
import ForgetPassword from"../../components/Forgetpass/ForgetPassword";
import ResetPassword from '../../components/Resetpassword/ResetPass';
const LayOut = () => {

    const Feed=() => {
        return (
            <>
                <Nav/>
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
                    <Route path='/forgot-password' element={<ForgetPassword />}></Route>
                    <Route path='/reset-password/:token' element={<ResetPassword />}></Route>



                    {/* feed layout routes */}
                    <Route element={<Feed />}>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/profile/:id' element={<Profile />}></Route>
                        <Route path='/generateDeck' element={<GenerateDeck />}></Route>
                        <Route path='/deck/:deckId' element={<DeckViewer />} />

                    </Route>
                    {/* Deck viewer (no layout, full page) */}

                </Routes>
            </Router>
           
        </>
    )
}
export default LayOut;