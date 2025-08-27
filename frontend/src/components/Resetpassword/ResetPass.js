// ResetPassword.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import '../Forgetpass/ForgetPassword.css'; // reuse same CSS

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();
            alert(data.message);
            window.location.href = "/login";


        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="password-container">
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="Heading">Reset Password</h3>
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button className="send-btn" type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
