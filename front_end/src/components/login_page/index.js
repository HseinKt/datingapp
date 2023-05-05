import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Email_pattern=/[a-z0-9]+@[a-z0-9.-]+\.[a-z]{3,}$/;

    const handleSubmit = async(e)=> {
        e.preventDefault(); 
        if(email == "" || password == "") {
            alert("Please make sure you have field all the required fields");
            return;
        }
        else if(!Email_pattern.test(email)) {
            alert("Please enter a valid email");
            return;
        }
        else if(password.length < 6) {
            alert(" Password must be at least 6 characters");
            return;
        }
        const formData = new FormData();
        formData.append('email',email);
        formData.append('password',password);

        try {
            axios.post("http://localhost:8000/api/v0.0.1/login", formData)
            .then(response => {
                if(response.data.authorisation){
                    console.log(response.data);
                    localStorage.setItem('token', response.data.authorisation.token);
                    navigate("/");
                }
            })
            .catch(error => {
                console.log("axios error: " + error);
            })
        } catch (error) {
            console.log("catch error: " + error);
        }
    }

    return ( 
        <div className="lgn-container">
            <div className="box-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="form-text">
                    <div className="input-container">
                        <input 
                            type="text" 
                            id="email" 
                            className="input"
                            placeholder="Email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div> 
                    <div className="input-container">
                        <input 
                            type="password" 
                            id="password" 
                            className="input"
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />                    
                    </div> 
                    <div className="input-container forget-password">
                        <a href="#">Forget password?</a>
                    </div>
                    <button type="submit" className="btn-container input-container" id="btn-container" >Login</button>
                    <div className="register-link input-container">
                         <a href="/register">Don't have an account?</a>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default LoginPage;