
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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

        const json =await response.json();
        if (json.success) {

            navigate("/Dashboard");
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
        <div className="d-flex justify-content-center align-items-center vh-100" >
            <div className="p-3 border rounded shadow-lg" style={{ width: "400px", height: "500px" }}>
                <h2 className="mb-4 text-center">Signup</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="UserName">Username</label>
                        <input type="text" className="form-control form-control-lg" id="UserName" name="name" value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="Email">Email</label>
                        <input type="email" className="form-control form-control-lg" id="Email" name="email" value={credentials.email} onChange={ onChange}  />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='Password'>Password</label>
                        <input type="password" className="form-control form-control-lg" id="Password" name="password" value={credentials.password} onChange={onChange}  />
                    </div>
                    <button className="btn btn-primary btn-lg w-100">Login</button>
                </form>
            </div>

        </div>
    );
}

export default Signup;