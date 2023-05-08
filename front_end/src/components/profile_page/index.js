import { useNavigate } from "react-router-dom";
import card from "../images/card.jpg"
import logo from "../images/logo2.png"

const Profile = (props) => {
    const navigate = useNavigate();

    return ( 
        <div className="profile-box">
            <div className="profile-container">
                <div className="profile-img">
                    <img src={card} alt="profile" />
                </div>
                <div className="profile-details">
                    <div className="name">
                        <h1>{props.name}</h1>
                    </div>
                    <div className="line"></div>
                    <div className="location">
                        <p>{props.address} {props.city}, {props.state}</p>
                    </div>
                    <div className="age">
                        {props.age} years old {props.gender}
                    </div>
                    <div className="about">
                        <h3>About Me</h3>
                        <p>
                            {props.about}                        
                        </p>
                    </div>
                    <div className="card-buttons profile-buttons">
                        <div className="love-block">
                            <img src={logo} alt="love" className="love-card" />
                            <button className="block btn">
                                block
                            </button>
                            <button className="sendbtn btn message-btn" onClick={() => navigate("/message")}>
                                Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Profile;