import { useState } from "react";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [repeat_password, setRepeat_password] = useState("");
    
    const handleSubmit = async(e)=> {
        e.preventDefault(); 
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