import card from "../images/card.jpg"

const Profile = (props) => {
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
                        <h3>{props.address} {props.city}, {props.state}</h3>
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
                    <div className="messagebtn">
                        <button className="sendbtn " onClick={props.handleSubmit}>
                            send a message
                        </button>
                    </div> 
                </div>
            </div>
        </div>
     );
}
 
export default Profile;