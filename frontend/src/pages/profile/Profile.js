

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { Link } from 'react-router-dom';

// import userProfile from "../../assets/images/userProfile.jpeg";
import './profile.css'

import { useState } from "react";

const Profile = () => {

    const { user, loading } = useContext(AuthContext);
    const [file, setFile] = useState(null);


    useEffect(() => {
        if (!loading) {   // wait until context finished fetching
            if (user === null) {
                console.log('declined ');
         
            }
        }

    }, [user, loading]);
    if (loading) return <p>Loading...</p>;




    const handleUpload = async () => {
        if (!file) return alert("Please select a file first");

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("http://localhost:5000/api/users/upload", {
                method: "POST",
                body: formData,
                credentials: "include", // 🔑 send cookie / JWT
            });

            const data = await res.json();

            if (data.success) {
                alert("Profile updated successfully!");
                // setUser(data.user); // update user state with new image
            } else {
                alert("Upload failed: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="profile-container">
            {user ? (
              
                <div className="user" >
                    <img src={`http://localhost:5000${user.image || "/uploads/default.png"}`} alt="userProfile" />
                        <h6>{user.name}</h6>
                       <h6>{user.email}</h6>
                    
                    {/* Upload new profile */}
                    <div className="upload"> 
                        <input className="upload-btn" type="file" accept="image/*" onChange={handleFileChange} />
                        <button className="upload-btn" onClick={handleUpload}>Upload  Profile</button>
                    </div>
                  
                </div>
            
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
export default Profile;