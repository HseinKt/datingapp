import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [repeat_password, setRepeat_password] = useState("");
    // const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // const upperCase = /[A-Z]/;
    const Email_pattern=/[a-z0-9]+@[a-z0-9.-]+\.[a-z]{3,}$/;

    const handleSubmit = async(e)=> {
        e.preventDefault(); 
        if( name == "" || email == "" || password == "" || repeat_password == "" ) {
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
        else if(password !== repeat_password) {
            alert('Please make sure to repeat the same password');
            return;
        }
        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        try {
            axios.post("http://localhost:8000/api/v0.0.1/register", formData)
            .then(response => {
                // console.log(response.data);
                navigate("/login");
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
                <h1>Register</h1>
                <form onSubmit={handleSubmit} className="form-text">
                <div className="input-container">
                        <input 
                            type="text" 
                            id="name" 
                            className="input"
                            placeholder="Name " 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="input-container">
                        <input 
                            type="text" 
                            id="email" 
                            className="input"
                            placeholder="email@gmail.com" 
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
                    <div className="input-container">
                        <input 
                            type="password" 
                            id="repeat_password" 
                            className="input"
                            placeholder="Repeat password" 
                            value={repeat_password}
                            onChange={(e) => setRepeat_password(e.target.value)} 
                        />                    
                    </div> 
                    <button type="submit" className="btn-container input-container" id="btn-container" >Register</button>
                    <div className="register-link input-container">
                         <a href="/login">Already have an account?</a>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default RegisterPage;