import { useNavigate } from "react-router-dom"
import card from "../../images/card.jpg"
import logo from "../../images/logo2.png"
import { useEffect, useState } from "react";
import axios from "axios";

const Cards = (props) => {
    const navigate  = useNavigate();
    const [token, setToken] = useState("");
    const [clicked, setClicked] = useState(false);
    const [clickedBlock, setClickedBlock] = useState(false);

    useEffect(() => {
        const myToken = localStorage.getItem('token');
        if(!myToken) {
            navigate("/login");
        }
        else {
            setToken(myToken);
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/message")
    }

    const handleCard = (e) => {
        const { id, name } = props.data;
        localStorage.setItem('user_id', id);
        localStorage.setItem('user_name', name);
        navigate("/profile");
    }

    const handleLove = () => {
        setClicked(!clicked);
        const { id } = props.data;
        
        try {
            axios.post("/add_favorite")
        } catch (error) {
            console.log("Catch error: " + error);
        }
    } 
    const handleBlock = () => {
        setClickedBlock(!clickedBlock);
    }
    return ( 
        <div className="user-container">
            <div className="card-container">
                <div className="image-container">
                    <img src={card} alt="card" className="card-image" onClick={handleCard}/>
                </div>
                <div className="details">
                    <h4 className="name">
                        <b>{props.data.name}</b>
                    </h4>
                    <h4 className="age">
                        {props.data.age && <b> {props.data.age} </b>}
                    </h4>
                    <h4 className="location">
                        {props.data.city && <b> {props.data.city} </b>}
                    </h4>
                </div>
                <div className="card-buttons">
                    <div className="love-block">
                        <img src={logo} alt="love" className={`love-card ${clicked ? 'clicked-card' : ''}`} onClick={handleLove} />
                        <button className={`block btn ${clickedBlock ? 'block-card' : ''}`} onClick={handleBlock} >
                            block
                        </button>
                    </div>
                    <div className="messagebtn">
                        <button className="sendbtn btn" onClick={handleSubmit}>
                            send a message
                        </button>
                    </div> 
                </div>
            </div>
        </div>
     );
}
 
export default Cards;