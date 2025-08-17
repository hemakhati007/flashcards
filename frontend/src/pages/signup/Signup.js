
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './signup.css';
const Signup = () => {

    //define credentials
    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();//to navigate to dashbard  after authentication


    const onSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password
                })
            }
        );

        const json = await response.json();
        if (json.success) {

            navigate("/");
            console.log("signedUp");
        } else {
            console.log("failed");
        }
    };


    //to assign inputed values to credentials
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });//name of input important shuld corresposnd to credentials key
    }

    return (
        <div className='signup' onSubmit={onSubmit}>
            <div className="card">
                <div className="left">
                    <h2>-<br />Flashcards Signup<br />-</h2>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <span> Have An Account?</span>
                    <Link to='/login'>
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>

                <form className="right">
                    <input type="text" required placeholder="username" id="UserName" name="name" value={credentials.name} onChange={onChange} />
                    <input type="email" required placeholder="email" id="Email" name="email" value={credentials.email} onChange={onChange} />
                    <input type="password" required placeholder="password" id="Password" name="password" value={credentials.password} onChange={onChange} />
                    <button type="submit" className='btn'>Register</button>

                </form>


            </div>
        </div>
    )
}
export default Signup;