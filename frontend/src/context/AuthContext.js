

import { useState, useEffect, createContext } from "react";

// import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
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
                    setUser(null);   // just clear user
                    return;
                }

                const data = await response.json();
                setUser(data);
            }
            catch (err) {

                console.log("profile load error", err);

            }
        };
        fetchProfile();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}