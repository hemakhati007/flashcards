
import { Link } from 'react-router-dom';

import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

import './login.css';
// import '../'

 
const Login = () => {

    const { fetchProfile } = useContext(AuthContext);

    const [credentials, setcredentials] = useState({
        email: "", password: ""
    });

    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault(); // stop default form action
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // credentials: "include",
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
            credentials: "include"
        });
        console.log("Submitting:",credentials);
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // localStorage.setItem('token', json.authtoken);
             

            //on navigating to home leftbar isnt able to get the user data bcz its getting it from authcontext which mount oce on page load only
            //so we arent getting loggined without refresh bcz we have page loaded already
            await fetchProfile();
            navigate("/");
            // showAlert("logged IN");
            console.log("loggedIN")
        }
        else {
            alert("failed to login");
            console.log("failed to login",json);
        }
    };




    //     If e.target.name is "email", your new state becomes:

    //     js
    //     Copy
    //     Edit
    //     { email: "something" }
    // 💥 The password field is gone — overwritten.


    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };





    return (
        <div className='login'>
            <div className="card">
                <div className="left">
                    <h2>-<br />Flashcards <br />-</h2>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <span>Don't Have An Account?</span>
                    <Link to='/signup'>
                        <button className="btn btn-primary">Signup</button>
                    </Link>
                </div>

                <form className="right" onSubmit={onSubmit} >
                    <input type="email" required placeholder="email" value={credentials.email} /*we show value that is in react state*/ onChange={onChange}/*change the state values of react by event */ id="Email" name="email" aria-describedby="emailHelp" />
                    <input type="password" required placeholder="password" id="Password" name="password" value={credentials.password} onChange={onChange} />
                    <button type="submit" className='btn'>Login</button>
                    <Link to="/forgot-password" style={{ color: 'grey', fontSize: '0.8rem', textDecoration: 'underline' }}>
                        forget password?
                    </Link>
                </form>
               


            </div>            
       </div>
     )
}
 
export default Login;