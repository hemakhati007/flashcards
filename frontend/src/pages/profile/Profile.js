

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';

import userProfile from "../../assets/images/userProfile.jpeg";
;

const Profile = () => {

    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!loading) {   // wait until context finished fetching
            if (user === null) {
                console.log('declined ');
         
            }
        }

    }, [user, loading]);
    if (loading) return <p>Loading...</p>;


    return (
        <div className="profile-container">
            {user ? (
              
                <div className="user" >
                    <img src={userProfile} alt="userProfile" />
                        <h6>{user.name}</h6>
                        <h6>{user.email}</h6>
                    </div>
            
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
export default Profile;