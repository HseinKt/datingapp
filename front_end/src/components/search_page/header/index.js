import { useNavigate } from "react-router-dom";
import Logo from "../logo";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleChange = () => {
        navigate("/")
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    if(token) {
        return (
            <div>
                <div className="header-container">
                    <Logo handleChange={handleChange}/>

                    <div className="title">
                        <h1>Dating <span className="titleApp">App</span></h1>
                    </div>
                    <div className="lgn-reg">
                        <button className="register btn logout" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return ( 
            <div>
                <div className="header-container">
                    <Logo handleChange={handleChange}/>
                     
                    <div className="title">
                        <h1>Dating <span className="titleApp">App</span></h1>
                    </div>
                    <div className="lgn-reg">
                        <button className="login btn" onClick={() => navigate("/login")}>Login</button>
                        <button className="register btn" onClick={() => navigate("/register")}>Register</button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Header;