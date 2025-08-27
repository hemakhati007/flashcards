
import { useState } from "react";
import './ForgetPassword.css';



const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/auth/forget-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        alert(data.message);
    };

    return (
        <div className="password-container">
            <form className="form" onSubmit={handleSubmit}>

                <h3 className="Heading">Forget Password ?</h3>
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="send-btn" type="submit">Send Reset Link</button>
            </form>
        </div>  
    );
};

export default ForgotPassword;
