

import { useState, useEffect, createContext } from "react";

// import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {

            try {
                const response = await fetch(
                    'http://localhost:5000/api/users/profile',
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",

                    }
                );
                

                if (!response.ok) {
                    console.log('cant authenticate');
                    setUser(null);   // just clear user
                    return;
                }
                const data = await response.json();

                // Now check if the JSON has an _id (your user object)
                if (!data || !data._id) {
                    console.warn("No user found in JSON:", data);
                    setUser(null);
                    return;
                }
                console.log(data);
                setUser(data);

            }
            catch (err) {

                console.log("profile load error", err);

            }
            finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, setUser,loading }}>
            {children}
        </AuthContext.Provider>
    )
}