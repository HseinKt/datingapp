import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    
    const handleSubmit = async(e)=> {
        e.preventDefault(); 
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