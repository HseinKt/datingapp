import { useNavigate } from "react-router-dom";
import logo from "../../images/logo2.png"

const Header = () => {
    const navigate = useNavigate();
    const handleChange = () => {
        navigate("/")
    }
    return ( 
        <div>
            <div className="header-container">
                <div className="logo">
                    <img src={logo} alt="logo" className="logo" onClick={handleChange}/>
                </div>  
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
 
export default Header;