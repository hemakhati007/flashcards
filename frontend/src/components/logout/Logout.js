// import { useState } from "react";
import './logout.css';
// import { useNavigation } from "react-router-dom";

export default function Logout() {


    // const [open, setOpen] = useState(false);
    // const navigate = useNavigation();

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) return;

        await fetch("http://localhost:5000/api/users/logout", {
            method: "POST",
            credentials: "include",
        });
        // navigate("/login");//works only if routers
        window.location.href = "/login";

    };
    return (
        <div className="logout-container">
           
                <div >
                    <button
                    onClick={handleLogout}
                        className="btn-logout"
                    >
                        Logout
                    </button>
                </div>
           
        </div>
    );
}
