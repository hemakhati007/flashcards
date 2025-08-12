 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
     
    const [ credentials, setcredentials ] = useState({
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
            credentials: "include", 
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // localStorage.setItem('token', json.authtoken);
            navigate("/Dashboard");
            // showAlert("logged IN");
            console.log("loggedIN")
        }
        else {
            // showAlert()
            console.log("failed");
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
        //jsx
       
        <div className="d-flex justify-content-center align-items-center vh-100" >
            <div className="p-3 border rounded shadow-lg" style={{ width: "400px",height:"500px" }}>
                <h2 className="mb-4 text-center">Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="Email">Email</label>
                        {/* accesing input data */}
                        <input type="email" className="form-control form-control-lg" value={credentials.email} /*we show value that is in react state*/ onChange={onChange}/*change the state values of react by event */ id="Email" name="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="Password">Password</label>
                        <input type="password" className="form-control form-control-lg" id="Password" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <button className="btn btn-primary btn-lg w-100">Login</button>

                    {/* <button className="btn btn-primary btn-lg w-100">Signup</button> */}

                </form>
            </div>
           
        </div>

    );
}
export default Login;