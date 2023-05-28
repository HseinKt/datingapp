import { useNavigate } from "react-router-dom";
import card from "../images/card.jpg"
import logo from "../images/logo2.png"
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = (props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState("")
    const [clicked, setClicked] = useState(0);
    const [clickedBlock, setClickedBlock] = useState(0);
    const id = localStorage.getItem('user_id');

    useEffect(() => {
        const myToken = localStorage.getItem('token');
        if(!myToken) {
            navigate("/login");
        }
        else {
            setToken(myToken);
            console.log(id);

        }
    })

    const handleLove = () => {
        // const id = localStorage.getItem('user_id');
        console.log(id);
        if(clicked == 0) {
            if(clickedBlock == 2){
                setClickedBlock(0)
            }
            setClicked(1);
            try {
                axios.get(`http://localhost:8000/api/v0.0.1/add_favorite/${id}`, {
                    headers : {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch (err => console.log("axios error: " + err.message))
            } catch (error) {
                console.log("Catch error: " + error);
            }
        } else {
            setClicked(0);
            try {
                axios.get(`http://localhost:8000/api/v0.0.1/remove_favorite_Or_Block/${id}`, {
                    headers : {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch (err => console.log("axios error: " + err.message))
            } catch (error) {
                console.log("Catch error: " + error);
            }
        }
    }  
    
    const handleBlock = () => {
        // const id = localStorage.getItem('user_id');

        if (clickedBlock == 0) {
            if(clicked == 1) {
                setClicked(0)
            }
            setClickedBlock(2);
            try {
                axios.get(`http://localhost:8000/api/v0.0.1/add_block/${id}`, {
                    headers : {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch (err => console.log("axios error: " + err.message))
            } catch (error) {
                console.log("Catch error: " + error);
            }
        } else {
            setClickedBlock(0);
            try {
                axios.get(`http://localhost:8000/api/v0.0.1/remove_favorite_Or_Block/${id}`, {
                    headers : {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch (err => console.log("axios error: " + err.message))
            } catch (error) {
                console.log("Catch error: " + error);
            }
        } 
    }

    const handleSubmit = () => {
        navigate("/message")
    }
    
    return ( 
        <div className="profile-box">
            <div className="profile-container">
                <div className="profile-img">
                    { props.image && (<img src={props.image} alt="profile" />) }
                    { !props.image && (<img src={card} alt="profile" />) }   
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
                        {id != 0 ? <div className="love-block">
                            <img src={logo} alt="love" className={`love-card ${clicked ? 'clicked-card' : ''}`} onClick={handleLove} />
                            <button className={`block btn ${clickedBlock ? 'block-card' : ''}`} onClick={handleBlock} >
                                block
                            </button>
                            <button className="sendbtn btn message-btn" onClick={handleSubmit} >
                                Message
                            </button>
                        </div>
                        : <p></p>}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Profile;